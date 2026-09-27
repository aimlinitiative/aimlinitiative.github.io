import { useCallback, useRef, useState } from "react";
import { motion as Motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import StepTrack from "../components/viz/StepTrack";
import useAnchors from "../components/viz/useAnchors";
import useMediaQuery from "../components/fx/useMediaQuery";
import { BLUES } from "../components/viz/palette";
import { EASE, DUR } from "../lib/motion";

// Readable tints for the small badges (the cyan is deepened for contrast on light).
const WORK_TINT = ["#2F6BFF", "#7C5CFF", "#0891B2"];
const GRAD = `linear-gradient(100deg, ${BLUES[0]}, ${BLUES[1]} 55%, ${BLUES[2]})`;
// Each big number carries its own slice of the blue -> violet -> cyan ramp.
const NUM_GRAD = [
    `linear-gradient(100deg, ${BLUES[0]}, ${BLUES[1]})`,
    `linear-gradient(100deg, ${BLUES[1]}, ${BLUES[0]})`,
    `linear-gradient(100deg, ${BLUES[0]}, #0EA5E9 60%, ${BLUES[2]})`,
];

const WORK = [
    { n: "01", t: "We build the curriculum", d: "A 12-week course for high-schoolers with no background. Plain-language lessons, real notebooks, aligned to state standards." },
    { n: "02", t: "We run it in classrooms", d: "We work with public-school teachers to teach it for real, then fix whatever doesn't land. Our first pilot is with LAUSD." },
    { n: "03", t: "We keep it free", d: "Every lesson is open-source. No school pays, and cost never decides who gets to learn this." },
];

function Heading() {
    return (
        <Reveal className="max-w-2xl">
            <SectionLabel n="02">What we do</SectionLabel>
            <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                How it works.
            </h2>
        </Reveal>
    );
}

/* ------------------------------------------------------------------ *
 * Desktop: pinned scrollytelling. The section pins while scrolling    *
 * advances through the steps: the gradient rail draws, each huge      *
 * number scales up and lights, its copy slides in, the previous dims. *
 * ------------------------------------------------------------------ */
const AT = [0.1, 0.43, 0.76]; // progress at which each step takes the stage

function PinnedStep({ w, i, p, anchorRef }) {
    const next = AT[i + 1] ?? 2;
    const inAt = [AT[i] - 0.1, AT[i]];
    const lit = useTransform(p, [...inAt, next - 0.02, next + 0.08], [0, 1, 1, 0]);
    const scale = useTransform(p, [...inAt, next - 0.02, next + 0.08], [0.82, 1.08, 1.08, 0.9]);
    const numOpacity = useTransform(p, [...inAt, next - 0.02, next + 0.08], [0.35, 1, 1, 0.55]);
    const textOpacity = useTransform(p, [AT[i] - 0.06, AT[i] + 0.04, next - 0.02, next + 0.08], [0, 1, 1, 0.38]);
    const textX = useTransform(p, [AT[i] - 0.06, AT[i] + 0.06], [48, 0]);
    const node = useTransform(p, [AT[i] - 0.1, AT[i] - 0.02], [0, 1]);
    return (
        <div className="relative">
            <Motion.div className="relative origin-bottom-left select-none" style={{ scale, opacity: numOpacity }}>
                <span className="display block text-[clamp(5.5rem,10vw,9.5rem)] font-bold leading-[0.85] tracking-tightest text-transparent"
                    style={{ WebkitTextStroke: "1.5px rgba(11,13,18,0.16)" }}>
                    {w.n}
                </span>
                <Motion.span aria-hidden="true" className="display absolute inset-0 block text-[clamp(5.5rem,10vw,9.5rem)] font-bold leading-[0.85] tracking-tightest text-transparent"
                    style={{ opacity: lit, backgroundImage: NUM_GRAD[i], WebkitBackgroundClip: "text", backgroundClip: "text", filter: "drop-shadow(0 10px 30px rgba(124,92,255,0.25))" }}>
                    {w.n}
                </Motion.span>
            </Motion.div>
            {/* rail node (anchor for the drawn line) */}
            <div ref={anchorRef} className="relative z-10 mt-8 h-3 w-3">
                <div className="absolute inset-0 rounded-full border border-ink/15 bg-bg" />
                <Motion.div className="absolute -inset-1 rounded-full" style={{ opacity: node, background: GRAD, boxShadow: "0 0 14px rgba(124,92,255,0.55)" }} />
            </div>
            <Motion.div className="mt-8 max-w-sm" style={{ opacity: textOpacity, x: textX }}>
                <h3 className="display text-2xl font-semibold text-ink">{w.t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{w.d}</p>
            </Motion.div>
        </div>
    );
}

function Pinned() {
    const wrapRef = useRef(null);
    const rowRef = useRef(null);
    const anchorRefs = useRef([]);
    const counter = useRef(null);
    const points = useAnchors(rowRef, anchorRefs);
    const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 0.35", "end end"] });
    const p = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0005 });
    const rail = useTransform(p, [AT[0] - 0.08, AT[2]], [0, 1]);
    const glowX = useTransform(p, AT, ["0%", "100%", "200%"]);
    useMotionValueEvent(p, "change", (v) => {
        const s = v < AT[1] - 0.04 ? 1 : v < AT[2] - 0.04 ? 2 : 3;
        if (counter.current && counter.current.dataset.s !== String(s)) {
            counter.current.dataset.s = String(s);
            counter.current.textContent = `0${s}`;
        }
    });

    return (
        <div ref={wrapRef} className="relative" style={{ height: "300vh" }}>
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="container-page w-full">
                    <div className="flex items-end justify-between gap-8">
                        <Heading />
                        <div aria-hidden="true" className="hidden pb-2 font-mono text-sm tabular-nums text-faint lg:block">
                            <span ref={counter} className="text-ink">01</span> / 03
                        </div>
                    </div>
                    <div ref={rowRef} className="relative mt-14 grid grid-cols-3 gap-8">
                        {/* soft light that travels with the active step */}
                        <Motion.div aria-hidden="true" className="pointer-events-none absolute -top-16 left-0 h-72 w-1/3"
                            style={{ x: glowX, background: "radial-gradient(50% 50% at 35% 45%, rgba(47,107,255,0.14), rgba(124,92,255,0.08) 45%, transparent 72%)" }} />
                        <StepTrack points={points} progress={rail} />
                        {WORK.map((w, i) => (
                            <PinnedStep key={w.n} w={w} i={i} p={p} anchorRef={(el) => (anchorRefs.current[i] = el)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ *
 * Mobile / reduced motion: stacked steps, a vertical line drawn by    *
 * scroll, and ring badges that complete as the tip reaches them.      *
 * ------------------------------------------------------------------ */
function Badge({ n, tint, on, reduced, badgeRef }) {
    return (
        <div ref={badgeRef} className="relative z-10 h-10 w-10">
            <svg aria-hidden="true" viewBox="0 0 52 52" className="pointer-events-none absolute -inset-1.5 h-[52px] w-[52px] -rotate-90 overflow-visible">
                <circle cx="26" cy="26" r="24" fill="none" stroke="rgba(11,13,18,0.08)" strokeWidth="1" />
                <Motion.circle
                    cx="26" cy="26" r="24" fill="none" stroke={tint} strokeWidth="1.75" strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: on || reduced ? 1 : 0, opacity: on || reduced ? 1 : 0 }}
                    transition={{ pathLength: { duration: DUR.slow, ease: EASE.out }, opacity: { duration: DUR.fast } }}
                />
            </svg>
            <Motion.div
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg font-mono text-sm font-bold shadow-soft"
                style={{ color: tint }}
                initial={false}
                animate={{ scale: on || reduced ? 1 : 0.92 }}
                transition={{ duration: DUR.base, ease: EASE.out }}
            >
                {n}
            </Motion.div>
        </div>
    );
}

function Stacked() {
    const reduced = useReducedMotion();
    const gridRef = useRef(null);
    const badgeRefs = useRef([]);
    const points = useAnchors(gridRef, badgeRefs);
    const [reached, setReached] = useState(-1);
    const onReach = useCallback((i) => setReached((r) => (i > r ? i : r)), []);

    // Line progress follows the scroll through the step list, springed so it glides.
    const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start 0.82", "end 0.62"] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6, restDelta: 0.0005 });

    return (
        <div className="container-page py-24 sm:py-32">
            <Heading />
            <div ref={gridRef} className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
                <StepTrack points={points} progress={progress} onReach={onReach} reduced={reduced} />
                {WORK.map((w, i) => {
                    const on = reduced || reached >= i;
                    return (
                        <div key={w.n} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 md:block">
                            <Badge n={w.n} tint={WORK_TINT[i]} on={on} reduced={reduced} badgeRef={(el) => (badgeRefs.current[i] = el)} />
                            <Motion.div
                                initial={false}
                                animate={on ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                                transition={{ duration: DUR.slow, ease: EASE.out, delay: on && !reduced ? 0.18 : 0 }}
                            >
                                <h3 className="display mt-1.5 text-xl font-semibold text-ink md:mt-6">{w.t}</h3>
                                <p className="mt-3 max-w-sm leading-relaxed text-muted">{w.d}</p>
                            </Motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function Work() {
    const reduced = useReducedMotion();
    const wide = useMediaQuery("(min-width: 768px) and (min-height: 600px)");
    return (
        <>
            {/* ===================== WHAT WE DO ===================== */}
            <section id="work" className="relative border-y border-line bg-surface">
                {wide && !reduced ? <Pinned /> : <Stacked />}
            </section>
        </>
    );
}
