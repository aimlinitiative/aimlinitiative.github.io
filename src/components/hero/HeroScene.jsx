/* The hero's real-time 3D scene: a luminous feed-forward network on the dark
 * stage, with forward-pass signals racing along its edges. Lazy-loaded (this
 * file pulls in three + @react-three/fiber, which land in their own chunk).
 *
 * Scroll drives a fly-through: `progress` (a motion value, 0..1 across the
 * pinned hero) is read inside useFrame, so scrolling never re-renders React. */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AddEquation, BufferAttribute, BufferGeometry, CustomBlending, OneFactor, ShaderMaterial } from "three";
import { buildNetwork, hex, NET_LENGTH } from "./network";
import * as S from "./shaders";

const FOV = 38;
const CAM_START = 15;
const CAM_END = 2.4;
const YAW_START = -1.05; // radians from the view axis: side-on with perspective
const YAW_END = -0.08; // nearly end-on: we fly down the network
const VEC3 = new Set(["position", "aColor", "aWaves", "aEnd"]);

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const damp = (current, target, lambda, dt) => lerp(current, target, 1 - Math.exp(-lambda * dt));

function makeGeometry(attrs) {
    const g = new BufferGeometry();
    for (const [name, arr] of Object.entries(attrs)) g.setAttribute(name, new BufferAttribute(arr, VEC3.has(name) ? 3 : 1));
    return g;
}

function makeMaterial(vertexShader, fragmentShader, uniforms) {
    // Additive light; alpha tracks brightness so the canvas stays valid
    // premultiplied output over whatever sits behind it.
    return new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
        blendSrcAlpha: OneFactor,
        blendDstAlpha: OneFactor,
    });
}

function Network({ small, reduced, progress, onFirstFrame }) {
    const { gl } = useThree();
    const parallax = useRef(null);
    const orient = useRef(null);
    const view = useRef(null);
    const spin = useRef(null);
    const state = useRef({ t: reduced ? 4.2 : 0, p: 0, px: 0, py: 0, tx: 0, ty: 0, first: true });

    const data = useMemo(
        () =>
            buildNetwork(
                small
                    ? { layers: [16, 24, 28, 24, 16], waves: 3, startsPerWave: 2, dust: 70 }
                    : { layers: [26, 40, 50, 50, 40, 26], waves: 3, startsPerWave: 3, dust: 160 },
            ),
        [small],
    );

    const objects = useMemo(() => {
        const shared = {
            uTime: { value: 0 },
            uPeriod: { value: small ? 8.5 : 9.5 },
            uLayers: { value: data.layers },
            uWaves: { value: data.waves },
            uPixelRatio: { value: 1 },
            uSizeScale: { value: 12 },
            uFadeNear: { value: 11 },
            uFadeFar: { value: 26 },
            uIntensity: { value: 1 },
            uVeil: { value: 0.75 },
            uVeilSize: { value: [0.52, 0.5] },
            uWave0: { value: hex(0x3d7bff) },
            uWave1: { value: hex(0x9272ff) },
            uWave2: { value: hex(0x33dbf2) },
        };
        return {
            shared,
            nodes: { geometry: makeGeometry(data.nodes), material: makeMaterial(S.nodeVert, S.nodeFrag, shared) },
            edges: {
                geometry: makeGeometry(data.edges),
                material: makeMaterial(S.edgeVert, S.edgeFrag, { ...shared, uColor: { value: hex(0x4d7dff) }, uOpacity: { value: small ? 0.26 : 0.2 } }),
            },
            pulseLines: { geometry: makeGeometry(data.pulseLines), material: makeMaterial(S.pulseLineVert, S.pulseLineFrag, shared) },
            heads: { geometry: makeGeometry(data.heads), material: makeMaterial(S.headVert, S.headFrag, shared) },
        };
    }, [data, small]);

    useEffect(
        () => () => {
            for (const key of ["nodes", "edges", "pulseLines", "heads"]) {
                objects[key].geometry.dispose();
                objects[key].material.dispose();
            }
        },
        [objects],
    );

    // Pointer parallax (mouse / pen only: touch scrolling should not tilt the scene).
    useEffect(() => {
        if (reduced) return;
        const onMove = (e) => {
            if (e.pointerType === "touch") return;
            state.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
            state.current.ty = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [reduced]);

    useFrame(({ camera, size }, delta) => {
        const s = state.current;
        const dt = Math.min(delta, 1 / 20); // no jump after a pause
        if (!reduced) s.t += dt;

        const u = objects.shared;
        u.uTime.value = s.t;
        u.uPixelRatio.value = gl.getPixelRatio();

        // Scroll progress, lightly damped so touch / keyboard scrolling glides too.
        const target = reduced || !progress ? 0 : clamp01(progress.get());
        s.p = s.first ? target : damp(s.p, target, 7, dt);
        s.px = damp(s.px, s.tx, 2.4, dt);
        s.py = damp(s.py, s.ty, 2.4, dt);

        const fly = easeInOut(clamp01(s.p / 0.92));
        const turn = easeInOut(clamp01(s.p / 0.8));

        // Fit the network to the frame at the start of the flight.
        const aspect = size.width / Math.max(size.height, 1);
        const portrait = aspect < 0.9;
        const visH = 2 * CAM_START * Math.tan(((FOV / 2) * Math.PI) / 180);
        const span = NET_LENGTH * Math.sin(-YAW_START);
        const fit = Math.min(1.6, Math.max(0.62, ((portrait ? visH : visH * aspect) * (portrait ? 0.98 : 0.92)) / span));

        // Headline veil lifts as the copy blurs away and we fly in.
        u.uVeil.value = 0.78 * (1 - clamp01(s.p / 0.32));
        u.uVeilSize.value[0] = portrait ? 1.05 : 0.5;
        u.uVeilSize.value[1] = portrait ? 0.46 : 0.5;

        orient.current.rotation.z = portrait ? Math.PI / 2 - 0.3 : 0.2;
        orient.current.scale.setScalar(fit);
        view.current.rotation.y = lerp(YAW_START, YAW_END, turn);
        view.current.rotation.x = lerp(0.34, 0.05, turn);
        spin.current.rotation.x = s.t * 0.05 + fly * 0.9;

        parallax.current.rotation.y = s.px * 0.14;
        parallax.current.rotation.x = s.py * 0.09;
        camera.position.set(s.px * 0.6, -s.py * 0.35, lerp(CAM_START, CAM_END, fly));
        camera.lookAt(s.px * 0.2, -s.py * 0.1, camera.position.z - 20);

        if (s.first) {
            s.first = false;
            onFirstFrame?.();
        }
    });

    return (
        <group ref={parallax}>
            <group ref={orient}>
                <group ref={view}>
                    {/* network is built along x; turn it so its layers stack along z */}
                    <group rotation={[0, Math.PI / 2, 0]}>
                        <group ref={spin}>
                            <lineSegments geometry={objects.edges.geometry} material={objects.edges.material} frustumCulled={false} />
                            <lineSegments geometry={objects.pulseLines.geometry} material={objects.pulseLines.material} frustumCulled={false} />
                            <points geometry={objects.nodes.geometry} material={objects.nodes.material} frustumCulled={false} />
                            <points geometry={objects.heads.geometry} material={objects.heads.material} frustumCulled={false} />
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}

export default function HeroScene({ active = true, reduced = false, small = false, progress, onReady }) {
    return (
        <Canvas
            aria-hidden="true"
            dpr={[1, small ? 1.5 : 1.75]}
            flat
            linear
            frameloop={reduced ? "demand" : active ? "always" : "never"}
            // offsetSize: measure layout size, not the transformed box, so the
            // stage's scroll-linked scale doesn't shrink the drawing buffer.
            resize={{ offsetSize: true, scroll: false }}
            gl={{ antialias: true, alpha: true, stencil: false, depth: false, powerPreference: "default" }}
            camera={{ fov: FOV, near: 0.1, far: 80, position: [0, 0, CAM_START] }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
            <Network small={small} reduced={reduced} progress={progress} onFirstFrame={onReady} />
        </Canvas>
    );
}
