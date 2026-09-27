import { useEffect, useId, useRef, useState } from "react";
import { animate, motion as Motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import UnitViz from "./viz/UnitViz";
import useMediaQuery, { FINE_POINTER } from "./fx/useMediaQuery";
import { COLORS } from "../lib/palette";

/* Horizontal curved-arc coverflow on the dark stage: the active card faces you
 * and lifts; neighbors rotate on the Y-axis, recede in Z, dip along an arc and
 * soften with distance. Everything hangs off one spring-driven motion value
 * (`pos`, a fractional card index), so dragging, momentum, snapping, arrows,
 * dots and keys all move the same physical system.
 * Cards are dark surfaces (DESIGN.md card-dark): stage-1 with a hairline and a
 * light top edge; the card facing you lifts to stage-2 with an accent hairline.
 * Drag left/right (flick for momentum), click the left/right side to step,
 * arrows/dots, or the keyboard. Each unit carries its own live mini-chart. */

const UNITS = [
    { r: "1-2",   t: "Foundations",       s: "How machines learn from data.",            k: "data" },
    { r: "3-4",   t: "Building models",    s: "Your first model that actually works.",    k: "classify" },
    { r: "5-6",   t: "Prediction & error", s: "Getting predictions right, and honest.",   k: "fit" },
    { r: "7-8",   t: "Neural networks",    s: "Built from scratch, not magic.",           k: "net" },
    { r: "9-10",  t: "Language & bias",    s: "Where models work, and where they break.", k: "tokens" },
    { r: "11-12", t: "Capstone",           s: "Students ship a project of their own.",    k: "ship" },
];

const STEPX = 208;  // px between cards
const ANGLE = 42;   // deg of Y-rotation per step
const DEPTH = 150;  // px pushed back per step
const ARCY = 26;    // px arc dip per step
const LIFT = 10;    // px the active card rises
const SNAP = { type: "spring", stiffness: 190, damping: 27, mass: 1 };
const DOT = 22;     // px between indicator dots

// The facing card: a light top edge plus an accent hairline in place of the border.
const LIFTED = `inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px ${COLORS.accentDark}73`;
const RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentdark";
const ICON_BTN = `flex h-11 w-11 items-center justify-center rounded-full border border-stageline bg-stage1 text-ondark transition-[background-color,border-color,transform] duration-200 hover:border-white/15 hover:bg-stage2 motion-safe:active:scale-[0.96] disabled:pointer-events-none disabled:opacity-30 ${RING}`;

function Card({ u, i, n, id, pos, spread, tiltX, tiltY, active, play, soften }) {
    const o = useTransform(pos, (p) => i - p);
    const ao = useTransform(o, (v) => Math.abs(v));
    const near = useTransform(ao, (a) => Math.max(0, 1 - a * 1.6)); // 1 = dead center
    // `spread` fans the deck out along the arc (0 = stacked, 1 = full arc).
    const x = useTransform([o, spread], ([v, s]) => v * STEPX * s);
    const y = useTransform([ao, spread, near], ([a, s, nr]) => a * ARCY * s - LIFT * nr);
    const z = useTransform(ao, (a) => -a * DEPTH);
    const rotateY = useTransform([o, spread, tiltY, near], ([v, s, t, nr]) => -v * ANGLE * s + t * nr);
    const rotateX = useTransform([tiltX, near], ([t, nr]) => t * nr);
    const scale = useTransform(ao, (a) => Math.max(0.8, 1 - a * 0.06));
    const opacity = useTransform(ao, (a) => (a > 2.7 ? 0 : Math.max(0, 1 - a * 0.3)));
    const zIndex = useTransform(ao, (a) => 100 - Math.round(a * 10));
    const filter = useTransform(ao, (a) => (soften ? `blur(${Math.min(2.2, Math.max(0, a - 0.5) * 1.2).toFixed(2)}px)` : "none"));
    const dimText = useTransform(near, (v) => 0.55 + v * 0.45);

    return (
        <Motion.div
            id={id}
            className="absolute left-1/2 top-1/2 w-[min(80vw,19rem)]"
            style={{ x, y, z, rotateX, rotateY, scale, opacity, zIndex, filter, pointerEvents: "none" }}
            transformTemplate={(_, t) => `translate(-50%, -50%) ${t}`}
            role="option"
            aria-selected={active}
        >
            {/* keyboard focus on the deck shows on the card that faces you */}
            {active && (
                <span aria-hidden="true" className="pointer-events-none absolute -inset-[5px] rounded-[25px] border-2 border-accentdark opacity-0 group-focus-visible:opacity-100" />
            )}
            <div className="relative rounded-card border border-stageline bg-stage1 text-ondark shadow-edge">
                {/* lift to stage-2 with an accent hairline as the card centers */}
                <Motion.div aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-card bg-stage2"
                    style={{ opacity: near, boxShadow: LIFTED }} />
                <div className="relative p-2">
                    <div className="h-32 overflow-hidden rounded-xl border border-stageline bg-stage px-3 pb-1.5 pt-3">
                        <UnitViz k={u.k} play={play} />
                    </div>
                </div>
                <Motion.div className="relative px-6 pb-6 pt-3" style={{ opacity: dimText }}>
                    <div className="flex items-center justify-between gap-4">
                        <span className="eyebrow text-ondarkmuted">Weeks {u.r}</span>
                        <span aria-hidden="true" className="eyebrow tabular-nums text-ondarkmuted/70">
                            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                        </span>
                    </div>
                    <h3 className="mt-4 font-display text-title text-ondark">{u.t}</h3>
                    <p className="mt-1.5 text-body-sm text-ondarkmuted">{u.s}</p>
                </Motion.div>
            </div>
        </Motion.div>
    );
}

function Chevron({ d }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={d} />
        </svg>
    );
}

export default function Curriculum() {
    const n = UNITS.length;
    const uid = useId();
    const optionId = (i) => `${uid}-unit-${i}`;
    const reduced = useReducedMotion();
    const soften = useMediaQuery("(min-width: 768px)") && !reduced;
    const [active, setActive] = useState(0);
    const pos = useMotionValue(0);
    const anim = useRef(null);
    const stageRef = useRef(null);
    const inView = useInView(stageRef, { amount: 0.35 });
    const fine = useMediaQuery(FINE_POINTER) && !reduced;

    // Entrance: the deck deals out from a stack the first time it comes into view.
    const spread = useMotionValue(reduced ? 1 : 0);
    useEffect(() => {
        if (!inView || spread.get() === 1) return;
        const c = animate(spread, 1, { type: "spring", stiffness: 60, damping: 16, mass: 1.1, delay: 0.15 });
        return () => c.stop();
    }, [inView, spread]);

    // Hover tilt for the active card (fine pointers only).
    const tiltX = useSpring(0, { stiffness: 150, damping: 18 });
    const tiltY = useSpring(0, { stiffness: 150, damping: 18 });
    const onHover = (e) => {
        if (!fine || drag.current.on || !stageRef.current) return;
        const r = stageRef.current.getBoundingClientRect();
        const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 180));
        const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 140));
        tiltY.set(nx * 9);
        tiltX.set(-ny * 7);
    };
    const onHoverEnd = () => { tiltX.set(0); tiltY.set(0); };
    const drag = useRef({ on: false, x: 0, p: 0, moved: false });

    const clamp = (v) => Math.max(0, Math.min(n - 1, v));

    const settle = (target, velocity = pos.getVelocity()) => {
        const t = clamp(target);
        setActive(t);
        anim.current?.stop();
        anim.current = reduced ? (pos.set(t), null) : animate(pos, t, { ...SNAP, velocity });
    };
    const go = (dir) => settle(active + dir);
    useEffect(() => () => anim.current?.stop(), []);

    // Indicator: follows `pos` continuously and stretches with speed.
    const dotX = useTransform(pos, (p) => clamp(p) * DOT);
    const dotStretch = useTransform(pos, () => (reduced ? 1 : 1 + Math.min(0.9, Math.abs(pos.getVelocity()) * 0.12)));

    const onDown = (e) => {
        anim.current?.stop();
        onHoverEnd();
        drag.current = { on: true, x: e.clientX, p: pos.get(), moved: false };
        try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch { /* no-op */ }
    };
    const onMove = (e) => {
        const d = drag.current;
        if (!d.on) return onHover(e);
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > 4) d.moved = true;
        let p = d.p - dx / STEPX;
        if (p < 0) p *= 0.3; // rubber-band past the ends
        if (p > n - 1) p = n - 1 + (p - (n - 1)) * 0.3;
        pos.set(p);
    };
    const release = (e, cancelled) => {
        const d = drag.current;
        if (!d.on) return;
        d.on = false;
        if (d.moved) {
            const v = pos.getVelocity(); // cards per second
            settle(Math.round(pos.get() + v * 0.22), v);
        } else if (!cancelled && stageRef.current) {
            // light click: left half steps back, right half steps forward
            const rect = stageRef.current.getBoundingClientRect();
            go(e.clientX < rect.left + rect.width / 2 ? -1 : 1);
        } else {
            settle(Math.round(pos.get()));
        }
    };
    const onKey = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(1); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(-1); }
        if (e.key === "Home") { e.preventDefault(); settle(0); }
        if (e.key === "End") { e.preventDefault(); settle(n - 1); }
    };

    return (
        <div className="mt-14 flex flex-col items-center sm:mt-16">
            <div
                ref={stageRef}
                className="group relative w-full cursor-grab select-none overflow-hidden outline-none active:cursor-grabbing"
                style={{ height: 390, perspective: "1500px", touchAction: "pan-y", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent)" }}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={(e) => release(e, false)}
                onPointerCancel={(e) => release(e, true)}
                onPointerLeave={onHoverEnd}
                onLostPointerCapture={(e) => release(e, true)}
                onKeyDown={onKey}
                tabIndex={0}
                role="listbox"
                aria-label="Curriculum units"
                aria-activedescendant={optionId(active)}
            >
                <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                    {UNITS.map((u, i) => (
                        <Card key={u.k} u={u} i={i} n={n} id={optionId(i)} pos={pos} spread={spread} tiltX={tiltX} tiltY={tiltY} active={i === active}
                            play={i === active && inView && !reduced} soften={soften} />
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center gap-4">
                <button type="button" onClick={() => go(-1)} disabled={active === 0} aria-label="Previous unit" className={ICON_BTN}>
                    <Chevron d="m15 18-6-6 6-6" />
                </button>
                <div className="relative flex items-center">
                    <Motion.span aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 -mt-[3px] ml-px h-1.5 w-5 rounded-full bg-accentdark"
                        style={{ x: dotX, scaleX: dotStretch }} />
                    {UNITS.map((u, i) => (
                        <button key={u.k} type="button" onClick={() => settle(i)} aria-label={`Unit ${i + 1}`} aria-current={i === active ? "true" : undefined}
                            className={`group/dot flex h-11 items-center justify-center rounded-full ${RING}`} style={{ width: DOT }}>
                            <span className="block h-1.5 w-1.5 rounded-full bg-white/25 transition-colors group-hover/dot:bg-white/50" />
                        </button>
                    ))}
                </div>
                <button type="button" onClick={() => go(1)} disabled={active === n - 1} aria-label="Next unit" className={ICON_BTN}>
                    <Chevron d="m9 18 6-6-6-6" />
                </button>
            </div>
        </div>
    );
}
