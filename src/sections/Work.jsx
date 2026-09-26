import { useCallback, useRef, useState } from "react";
import { motion as Motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import StepTrack from "../components/viz/StepTrack";
import useAnchors from "../components/viz/useAnchors";
import { EASE, DUR } from "../lib/motion";

const WORK_TINT = ["#22508F", "#2C63B0", "#4C82D2"];

const WORK = [
    { n: "01", t: "We build the curriculum", d: "A 12-week course for high-schoolers with no background. Plain-language lessons, real notebooks, aligned to state standards." },
    { n: "02", t: "We run it in classrooms", d: "We work with public-school teachers to teach it for real, then fix whatever doesn't land. Our first pilot is with LAUSD." },
    { n: "03", t: "We keep it free", d: "Every lesson is open-source. No school pays, and cost never decides who gets to learn this." },
];

/* Badge with a progress ring that draws once the connector's tip reaches it. */
function Badge({ n, tint, on, reduced, badgeRef }) {
    return (
        <div ref={badgeRef} className="relative z-10 h-10 w-10">
            <svg aria-hidden="true" viewBox="0 0 52 52" className="pointer-events-none absolute -inset-1.5 h-[52px] w-[52px] -rotate-90 overflow-visible">
                <circle cx="26" cy="26" r="24" fill="none" stroke="rgba(21,21,26,0.08)" strokeWidth="1" />
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

export default function Work() {
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
        <>
            {/* ===================== WHAT WE DO ===================== */}
            <section id="work" className="border-y border-line bg-surface">
                <div className="container-page py-24 sm:py-32">
                    <Reveal className="max-w-2xl">
                        <SectionLabel n="02">What we do</SectionLabel>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                            How it works.
                        </h2>
                    </Reveal>
                    <div ref={gridRef} className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
                        <StepTrack points={points} progress={progress} onReach={onReach} reduced={reduced} />
                        {WORK.map((w, i) => {
                            const on = reduced || reached >= i;
                            return (
                                <div key={w.n} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 md:block">
                                    <Badge n={w.n} tint={WORK_TINT[i]} on={on} reduced={reduced} badgeRef={(el) => (badgeRefs.current[i] = el)} />
                                    <Motion.div
                                        initial={false}
                                        animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                                        transition={{ duration: DUR.slow, ease: EASE.out, delay: on && !reduced ? 0.18 : 0 }}
                                    >
                                        <h3 className="display mt-1.5 text-xl md:mt-6 font-semibold text-ink">{w.t}</h3>
                                        <p className="mt-3 max-w-sm leading-relaxed text-muted">{w.d}</p>
                                    </Motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
