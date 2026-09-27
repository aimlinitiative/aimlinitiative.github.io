/* Everything behind the hero copy: the dark stage glow (always there, and the
 * whole fallback when WebGL is missing) plus the lazily-loaded 3D network.
 *
 * - The scene chunk is requested only after the headline has started animating
 *   and the browser is idle, so text paints first.
 * - The canvas fades in once its first frame has rendered.
 * - Rendering pauses when the hero is offscreen or the tab is hidden. */
import { Component, lazy, Suspense, useEffect, useState } from "react";
import { css, EASE } from "../../lib/motion";
import { COLORS } from "../../lib/palette";
import { rgba } from "./color";

const HeroScene = lazy(() => import("./HeroScene"));

// Stage lighting, kept low so the headline owns the room: one soft blue pool
// behind the copy, a faint violet accent low on the right, and a wash from above.
const STAGE_GLOW = [
    `radial-gradient(58% 48% at 50% 40%, ${rgba(COLORS.blue, 0.12)}, transparent 72%)`,
    `radial-gradient(36% 40% at 80% 76%, ${rgba(COLORS.violet, 0.09)}, transparent 70%)`,
    `radial-gradient(120% 80% at 50% 0%, ${rgba(COLORS.blue, 0.05)}, transparent 60%)`,
].join(",");

function hasWebGL() {
    try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return false;
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return true;
    } catch {
        return false;
    }
}

// If the chunk fails to load or WebGL throws, quietly keep the static stage.
class SceneBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }
    static getDerivedStateFromError() {
        return { failed: true };
    }
    componentDidCatch() {}
    render() {
        return this.state.failed ? null : this.props.children;
    }
}

export default function HeroBackdrop({ watchRef, progress, reduced }) {
    const [load, setLoad] = useState(false);
    const [ready, setReady] = useState(false);
    const [inView, setInView] = useState(true);
    const [tabVisible, setTabVisible] = useState(() => typeof document === "undefined" || document.visibilityState !== "hidden");
    const [small] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches);

    // Load the scene once the page has settled.
    useEffect(() => {
        if (!hasWebGL()) return;
        let idle = 0;
        const timer = setTimeout(() => {
            const go = () => setLoad(true);
            idle = window.requestIdleCallback ? window.requestIdleCallback(go, { timeout: 900 }) : setTimeout(go, 60);
        }, 450);
        return () => {
            clearTimeout(timer);
            if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle);
            else clearTimeout(idle);
        };
    }, []);

    useEffect(() => {
        const el = watchRef?.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "80px 0px" });
        io.observe(el);
        return () => io.disconnect();
    }, [watchRef]);

    useEffect(() => {
        const onVis = () => setTabVisible(document.visibilityState !== "hidden");
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0" style={{ backgroundImage: STAGE_GLOW }} />
            {load && (
                <div
                    className="absolute inset-0"
                    style={{
                        opacity: ready ? 1 : 0,
                        transform: ready || reduced ? "none" : "scale(1.04)",
                        transition: `opacity 1.8s ${css(EASE.out)}, transform 2.4s ${css(EASE.out)}`,
                    }}
                >
                    <SceneBoundary>
                        <Suspense fallback={null}>
                            <HeroScene active={inView && tabVisible} reduced={reduced} small={small} progress={progress} onReady={() => setReady(true)} />
                        </Suspense>
                    </SceneBoundary>
                </div>
            )}
        </div>
    );
}
