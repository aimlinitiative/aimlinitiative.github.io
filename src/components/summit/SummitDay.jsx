import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll } from "motion/react";
import { DUR, EASE, DIST, VIEWPORT } from "../../lib/motion";

/* "The day" as a vertical timeline. A line draws down the rail with scroll
 * progress, and each block fades up as the reader reaches it. Normal flow,
 * nothing pinned. */

const DAY = [
    {
        when: "Morning · 3 hours",
        title: "Talks, a panel and demos",
        items: [
            "Keynotes from Google DeepMind, Microsoft, Google and Snap",
            "A careers panel",
            "Live demos, including physical AI",
        ],
    },
    {
        when: "Midday",
        title: "Lunch",
        items: ["Free for students", "Partner tables around the room"],
    },
    {
        when: "Afternoon · 3 hours",
        title: "Hackathon",
        items: [
            "Teams of 3 or 4 pick a problem from their own school or neighborhood",
            "Mentors are on the floor, and halfway through, teams swap and try to break each other's projects",
            "Three-minute pitches, judging and prizes",
        ],
    },
];

const BLOCK = {
    hidden: { opacity: 0, y: DIST.rise },
    show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.out } },
};
const DOT = {
    hidden: { scale: 0 },
    show: { scale: 1, transition: { duration: DUR.base, ease: EASE.out, delay: 0.1 } },
};
const STILL = { hidden: {}, show: {} };

// A block counts as "reached" once its top passes about 60% of the viewport.
const REACHED = { ...VIEWPORT, margin: "0px 0px -40% 0px" };

export default function SummitDay() {
    const listRef = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });

    return (
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <h3 className="text-h3 text-dark-ink">The day</h3>

            <div ref={listRef} className="relative">
                {/* Rail and the line that draws down it. */}
                <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-dark-line" />
                <Motion.span
                    aria-hidden
                    className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent-ondark"
                    style={{ scaleY: reduce ? 1 : scrollYProgress }}
                />

                <ol className="space-y-12 md:space-y-14">
                    {DAY.map((b) => (
                        <Motion.li
                            key={b.title}
                            className="relative pl-10 sm:pl-12"
                            variants={reduce ? STILL : BLOCK}
                            initial="hidden"
                            whileInView="show"
                            viewport={REACHED}
                        >
                            <span aria-hidden className="absolute left-0 top-[5px] h-[11px] w-[11px] rounded-full border border-dark-ink2 bg-dark">
                                <Motion.span
                                    className="absolute -inset-px rounded-full bg-accent-ondark"
                                    variants={reduce ? STILL : DOT}
                                />
                            </span>
                            <p className="text-sm font-medium text-dark-ink2">{b.when}</p>
                            <h4 className="mt-1.5 text-h4 text-dark-ink">{b.title}</h4>
                            <ul className="mt-4 max-w-prose space-y-2 text-base text-dark-ink2">
                                {b.items.map((it) => (
                                    <li key={it} className="flex gap-3">
                                        <span aria-hidden className="mt-[0.78em] h-px w-3 shrink-0 bg-dark-ink2" />
                                        <span>{it}</span>
                                    </li>
                                ))}
                            </ul>
                        </Motion.li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
