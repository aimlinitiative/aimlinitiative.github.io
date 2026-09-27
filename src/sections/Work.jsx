import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion as Motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import StepTrack from "../components/viz/StepTrack";
import useAnchors from "../components/viz/useAnchors";
import useMediaQuery from "../components/fx/useMediaQuery";
import { EASE, DUR } from "../lib/motion";

const WORK = [
    { n: "01", t: "We build the curriculum", d: "A 12-week course for high-schoolers with no background. Plain-language lessons, real notebooks, aligned to state standards." },
    { n: "02", t: "We run it in classrooms", d: "We work with public-school teachers to teach it for real, then fix whatever doesn't land. Our first pilot is with LAUSD." },
    { n: "03", t: "We keep it free", d: "Every lesson is open-source. No school pays, and cost never decides who gets to learn this." },
];

// Hairline for a number that hasn't been reached yet: ink at a whisper.
const OUTLINE = "rgba(29,29,31,0.2)";
// Spacing that tightens on short desktop screens so the pinned frame always fits.
const GAP = "mt-[clamp(1.25rem,3.5vh,2rem)]";

function Heading({ aside = null }) {
    return (
        <div className="flex items-end justify-between gap-8">
            <Reveal>
                <SectionLabel n="02">What we do</SectionLabel>
                <h2 className="mt-6 text-balance font-display text-display-xl text-ink">How it works.</h2>
            </Reveal>
            {aside}
        </div>
    );
}

/* A big Geist step number. At rest it's a hairline outline; `fill` (0..1) wipes
 * a solid accent copy up over it, bottom to top. The wipe is transform-only: a
 * clipping window rises while the copy inside counter-moves, so the glyphs stay
 * put. `lit` fades the solid copy back out once the story has moved on. */
function StepNumber({ n, fill, lit = 1 }) {
    const windowY = useTransform(fill, (v) => `${(1 - v) * 100}%`);
    const copyY = useTransform(fill, (v) => `${(v - 1) * 100}%`);
    return (
        <div aria-hidden="true" className="relative -my-[0.08em] select-none font-display text-display-2xl">
            <span className="block py-[0.08em] text-transparent" style={{ WebkitTextStroke: `1.25px ${OUTLINE}` }}>{n}</span>
            <Motion.span className="absolute inset-0 block overflow-hidden" style={{ y: windowY, opacity: lit }}>
                <Motion.span className="block py-[0.08em] text-accent" style={{ y: copyY }}>{n}</Motion.span>
            </Motion.span>
        </div>
    );
}

/* A node on the connector (also the anchor the line is drawn through). `on` is
 * a 0..1 MotionValue: the accent dot grows in as the line arrives. */
function RailNode({ anchorRef, on, className = "" }) {
    return (
        <div ref={anchorRef} className={`relative z-10 h-3 w-3 ${className}`}>
            <span className="absolute inset-0 rounded-full border border-linestrong bg-parchment" />
            <Motion.span className="absolute inset-0 rounded-full bg-accent" style={{ scale: on, opacity: on }} />
        </div>
    );
}

/* "01 ——— 03": the current step rolls like an odometer while the hairline fills
 * with the whole story's progress. Decorative; the list itself is the content. */
function Counter({ step, progress }) {
    return (
        <div aria-hidden="true" className="eyebrow flex shrink-0 items-center gap-3 pb-3 tabular-nums">
            <span className="block h-3 overflow-hidden text-ink">
                <Motion.span className="block" initial={false} animate={{ y: -(step - 1) * 12 }} transition={{ duration: DUR.base, ease: EASE.out }}>
                    {WORK.map((w) => <span key={w.n} className="block h-3">{w.n}</span>)}
                </Motion.span>
            </span>
            <span className="relative block h-px w-16 bg-linestrong">
                <Motion.span className="absolute inset-0 origin-left bg-accent" style={{ scaleX: progress }} />
            </span>
            <span>{WORK[WORK.length - 1].n}</span>
        </div>
    );
}

/* ------------------------------------------------------------------ *
 * Desktop: pinned scrollytelling. The section pins while scrolling    *
 * advances through the steps: the accent line draws from node to      *
 * node, each number fills with accent as it takes the stage, its copy *
 * slides in, and the step before settles back to an outline.          *
 * ------------------------------------------------------------------ */
const AT = [0.1, 0.43, 0.76]; // progress at which each step takes the stage

function PinnedStep({ w, i, p, anchorRef }) {
    const next = AT[i + 1] ?? 2;
    const fill = useTransform(p, [AT[i] - 0.1, AT[i]], [0, 1]);
    const lit = useTransform(p, [next - 0.02, next + 0.08], [1, 0]);
    const scale = useTransform(p, [AT[i] - 0.1, AT[i], next - 0.02, next + 0.08], [0.9, 1, 1, 0.94]);
    const node = useTransform(p, [AT[i] - 0.1, AT[i] - 0.02], [0, 1]);
    const textOpacity = useTransform(p, [AT[i] - 0.06, AT[i] + 0.04, next - 0.02, next + 0.08], [0, 1, 1, 0.4]);
    const textX = useTransform(p, [AT[i] - 0.06, AT[i] + 0.06], [32, 0]);
    return (
        <li className="relative">
            <Motion.div className="origin-bottom-left" style={{ scale }}>
                <StepNumber n={w.n} fill={fill} lit={lit} />
            </Motion.div>
            <RailNode anchorRef={anchorRef} on={node} className={GAP} />
            <Motion.div className={GAP} style={{ opacity: textOpacity, x: textX }}>
                <h3 className="text-balance font-display text-display-md text-ink">{w.t}</h3>
                <p className="mt-4 max-w-measure text-pretty text-body text-muted">{w.d}</p>
            </Motion.div>
        </li>
    );
}

function Pinned() {
    const wrapRef = useRef(null);
    const rowRef = useRef(null);
    const anchorRefs = useRef([]);
    const points = useAnchors(rowRef, anchorRefs);
    const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 0.35", "end end"] });
    const p = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0005 });
    const rail = useTransform(p, [AT[0] - 0.08, AT[2]], [0, 1]);
    const [step, setStep] = useState(1);
    useMotionValueEvent(p, "change", (v) => setStep(v < AT[1] - 0.04 ? 1 : v < AT[2] - 0.04 ? 2 : 3));

    return (
        <div ref={wrapRef} className="relative" style={{ height: "300vh" }}>
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="container-page">
                    <Heading aside={<Counter step={step} progress={rail} />} />
                    <div ref={rowRef} className="relative mt-[clamp(2.5rem,8vh,5rem)]">
                        <StepTrack points={points} progress={rail} />
                        <ol className="grid grid-cols-3 gap-8 xl:gap-12">
                            {WORK.map((w, i) => (
                                <PinnedStep key={w.n} w={w} i={i} p={p} anchorRef={(el) => { anchorRefs.current[i] = el; }} />
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ *
 * Below lg, short screens and reduced motion: the steps stack (three  *
 * columns again from lg), a line drawn by scroll runs through the     *
 * nodes, and each number fills with accent as the line reaches it.   *
 * ------------------------------------------------------------------ */

// 0..1 MotionValue that eases to `on` (jumps under reduced motion).
function useLatch(on, reduced) {
    const k = useMotionValue(on ? 1 : 0);
    useEffect(() => {
        if (reduced) { k.set(on ? 1 : 0); return; }
        const c = animate(k, on ? 1 : 0, { duration: DUR.slow, ease: EASE.out });
        return () => c.stop();
    }, [on, reduced, k]);
    return k;
}

function StackedStep({ w, on, reduced, anchorRef }) {
    const k = useLatch(on, reduced);
    return (
        <li className="grid grid-cols-[0.75rem_minmax(0,1fr)] items-center gap-x-5 lg:block">
            <div className="col-start-2 row-start-1">
                <StepNumber n={w.n} fill={k} />
            </div>
            <RailNode anchorRef={anchorRef} on={k} className="col-start-1 row-start-1 lg:mt-8" />
            <Motion.div
                className="col-start-2 row-start-2 mt-5 lg:mt-8"
                initial={false}
                animate={on ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                transition={{ duration: DUR.slow, ease: EASE.out, delay: on && !reduced ? 0.18 : 0 }}
            >
                <h3 className="text-balance font-display text-display-md text-ink">{w.t}</h3>
                <p className="mt-3 max-w-measure text-pretty text-body text-muted">{w.d}</p>
            </Motion.div>
        </li>
    );
}

function Stacked() {
    const reduced = useReducedMotion();
    const listRef = useRef(null);
    const anchorRefs = useRef([]);
    const points = useAnchors(listRef, anchorRefs);
    const [reached, setReached] = useState(-1);
    const onReach = useCallback((i) => setReached((r) => (i > r ? i : r)), []);

    // Line progress follows the scroll through the step list, springed so it glides.
    const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.82", "end 0.62"] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6, restDelta: 0.0005 });

    return (
        <div className="section-y">
            <div className="container-page">
                <Heading />
                <div ref={listRef} className="relative mt-14 lg:mt-20">
                    <StepTrack points={points} progress={progress} onReach={onReach} reduced={reduced} />
                    <ol className="grid gap-14 lg:grid-cols-3 lg:gap-8 xl:gap-12">
                        {WORK.map((w, i) => (
                            <StackedStep key={w.n} w={w} on={reduced || reached >= i} reduced={reduced}
                                anchorRef={(el) => { anchorRefs.current[i] = el; }} />
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default function Work() {
    const reduced = useReducedMotion();
    // DESIGN.md §8: pinned sections stack below lg; the pinned frame also needs height.
    const wide = useMediaQuery("(min-width: 1024px) and (min-height: 640px)");
    return (
        <>
            {/* ===================== WHAT WE DO ===================== */}
            <section id="work" className="relative overflow-x-clip bg-parchment">
                {wide && !reduced ? <Pinned /> : <Stacked />}
            </section>
        </>
    );
}
