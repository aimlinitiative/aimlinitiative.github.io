import { useEffect, useRef, useState } from "react";
import { animate, motion as Motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import UnitViz from "./viz/UnitViz";
import useMediaQuery, { FINE_POINTER } from "./fx/useMediaQuery";
import { GLOW } from "./viz/palette";

/* Horizontal curved-arc coverflow on the dark stage: the active card faces you,
 * lifted and glowing; neighbors rotate on the Y-axis, recede in Z, dip along an
 * arc and soften with distance. Everything hangs off one spring-driven motion
 * value (`pos`, a fractional card index), so dragging, momentum, snapping,
 * arrows, dots and keys all move the same physical system.
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

function Card({ u, i, n, pos, spread, tiltX, tiltY, active, play, soften }) {
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
            className="absolute left-1/2 top-1/2 w-[min(80vw,19rem)]"
            style={{ x, y, z, rotateX, rotateY, scale, opacity, zIndex, filter, pointerEvents: "none" }}
            transformTemplate={(_, t) => `translate(-50%, -50%) ${t}`}
            role="option"
            aria-selected={active}
        >
            {/* glow behind the active card */}
            <Motion.div aria-hidden="true" className="absolute -inset-6 rounded-[2.25rem]"
                style={{ opacity: near, background: `radial-gradient(60% 55% at 50% 45%, ${GLOW.violet}55, ${GLOW.blue}22 55%, transparent 75%)` }} />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D0F17] text-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
                {/* luminous hairline + top sheen, fades in as the card centers */}
                <Motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{ opacity: near, boxShadow: `inset 0 0 0 1px ${GLOW.violet}66`, background: `radial-gradient(120% 70% at 50% 0%, ${GLOW.blue}26, transparent 60%)` }} />
                <div className="relative h-32 border-b border-white/[0.07] bg-white/[0.02] px-3 pb-1.5 pt-3">
                    <UnitViz k={u.k} play={play} />
                </div>
                <Motion.div className="relative px-6 py-5" style={{ opacity: dimText }}>
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Weeks {u.r}</span>
                        <span className="font-mono text-[11px] text-white/40">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
                    </div>
                    <h3 className="display mt-3 text-xl font-bold tracking-tight">{u.t}</h3>
                    <p className="mt-1.5 text-[15px] text-white/65">{u.s}</p>
                </Motion.div>
            </div>
        </Motion.div>
    );
}

export default function Curriculum() {
    const n = UNITS.length;
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
        <div className="mt-12 flex flex-col items-center">
            <div className="relative w-full">
                {/* floor glow under the active card */}
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[88%] h-24 w-[min(90vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
                    style={{ background: `radial-gradient(50% 50% at 50% 50%, ${GLOW.blue}40, ${GLOW.violet}18 50%, transparent 72%)` }} />
                <div
                    ref={stageRef}
                    className="focusable relative w-full cursor-grab select-none overflow-hidden active:cursor-grabbing"
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
                >
                    <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                        {UNITS.map((u, i) => (
                            <Card key={u.k} u={u} i={i} n={n} pos={pos} spread={spread} tiltX={tiltX} tiltY={tiltY} active={i === active}
                                play={i === active && inView && !reduced} soften={soften} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center gap-5">
                <button onClick={() => go(-1)} disabled={active === 0} aria-label="Previous unit"
                    className="focusable flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/5 disabled:pointer-events-none disabled:opacity-25">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <div className="relative flex items-center">
                    <Motion.span aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 -mt-[3px] h-1.5 w-5 rounded-full"
                        style={{ x: dotX, scaleX: dotStretch, background: `linear-gradient(90deg, ${GLOW.blue}, ${GLOW.violet}, ${GLOW.cyan})`, boxShadow: `0 0 12px ${GLOW.violet}99`, marginLeft: 1 }} />
                    {UNITS.map((u, i) => (
                        <button key={i} onClick={() => settle(i)} aria-label={`Unit ${i + 1}`} aria-current={i === active ? "true" : undefined}
                            className="focusable group flex h-6 items-center justify-center" style={{ width: DOT }}>
                            <span className="block h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-white/45" />
                        </button>
                    ))}
                </div>
                <button onClick={() => go(1)} disabled={active === n - 1} aria-label="Next unit"
                    className="focusable flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/5 disabled:pointer-events-none disabled:opacity-25">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                </button>
            </div>
        </div>
    );
}
