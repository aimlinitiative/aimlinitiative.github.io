import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Item, Stagger } from "../components/fx/Stagger";

const MSpan = motion.span;

const STEPS = [
    {
        title: "We build the curriculum",
        body: "A 12-week course for high schoolers with no background. The lessons are in plain language, students work in real notebooks, and it lines up with state standards.",
    },
    {
        title: "We teach it in real classrooms",
        body: "We work with public school teachers to teach it for real, then fix whatever doesn't land. Our first pilot is with LAUSD.",
    },
    {
        title: "We keep it free",
        body: "Every lesson is open-source and no school pays for it. Cost shouldn't decide which students get to learn this.",
    },
];

/* Desktop: the heading and a progress rail stay pinned on the left while the
 * three steps scroll past on the right. The step under the reading line is ink,
 * the others ink3. Mobile: a plain stacked list with a thin left rule. */
export default function Work() {
    const reduce = useReducedMotion();
    const listRef = useRef(null);
    const stepRefs = useRef([]);
    const [active, setActive] = useState(0);

    // The rail fills from the first step reaching the reading line to the list's end reaching the fold.
    const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end end"] });
    // The active step is the last one whose top has crossed the reading line (60% down).
    // At the very end the last step wins, even if it's short.
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const line = window.innerHeight * 0.6;
        let i = 0;
        stepRefs.current.forEach((el, k) => {
            if (el && el.getBoundingClientRect().top <= line) i = k;
        });
        if (v >= 0.999) i = STEPS.length - 1;
        setActive((a) => (a === i ? a : i));
    });

    return (
        <section id="work" aria-labelledby="work-title" className="bg-surface py-22 md:py-30">
            <div className="container-page md:grid md:grid-cols-12 md:gap-8">
                <div className="md:sticky md:top-28 md:col-span-5 md:self-start">
                    <Stagger>
                        <Item as="h2" id="work-title" className="text-h2 text-ink">How it works</Item>
                    </Stagger>

                    {/* Progress rail with a short index of the steps (desktop only; the list itself carries the content). */}
                    <div aria-hidden="true" className="relative mt-12 hidden md:flex">
                        <span className="relative w-px shrink-0 bg-linestrong">
                            <MSpan
                                className="absolute inset-0 origin-top bg-accent"
                                style={{ scaleY: reduce ? 1 : scrollYProgress }}
                            />
                        </span>
                        <ol className="space-y-5 py-1 pl-6">
                            {STEPS.map((s, i) => (
                                <li
                                    key={s.title}
                                    className={`text-sm transition-colors duration-base ${i === active ? "font-medium text-ink" : "text-ink3"}`}
                                >
                                    {s.title}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <ol ref={listRef} className="mt-12 space-y-12 border-l border-linestrong pl-6 md:col-span-6 md:col-start-7 md:mt-0 md:space-y-0 md:border-l-0 md:pl-0">
                    {STEPS.map((s, i) => {
                        const on = i === active;
                        return (
                            <li
                                key={s.title}
                                ref={(el) => (stepRefs.current[i] = el)}
                                className={i < STEPS.length - 1 ? "md:min-h-[55vh] md:pb-16" : ""}
                            >
                                <Stagger each={0.06}>
                                    <Item as="p" className="text-caption text-ink3">Step {i + 1}</Item>
                                    <Item
                                        as="h3"
                                        className={`mt-2 text-h4 transition-colors duration-slow md:text-h3 ${on ? "text-ink" : "text-ink md:text-ink3"}`}
                                    >
                                        {s.title}
                                    </Item>
                                    <Item
                                        as="p"
                                        className={`mt-4 max-w-md text-base transition-colors duration-slow md:text-lead ${on ? "text-ink2" : "text-ink2 md:text-ink3"}`}
                                    >
                                        {s.body}
                                    </Item>
                                </Stagger>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
