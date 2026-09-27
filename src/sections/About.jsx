import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import SectionLabel from "../components/SectionLabel";
import { EASE, VIEWPORT_ANY } from "../lib/motion";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-founder", initials: "AE" },
    { name: "Michael Tarekegn", role: "Co-founder", initials: "MT" },
    { name: "Ibrahim Piri", role: "Engineering", initials: "IP" },
];

const HEADING = "A small team going after a real gap.";

// Body copy as segments; `em` marks the names that were emphasized before.
const PARAGRAPHS = [
    [{ t: "AI already touches most jobs, but the students who'd gain the most from understanding it get the least chance to learn it. Well-off schools have machine-learning electives and private tutors. Most public schools have nothing." }],
    [
        { t: "So we started AIML-LI. We write the curriculum, test it in real classrooms, and give it away for free. People from " },
        { t: "Google DeepMind", em: true },
        { t: " and " },
        { t: "Y Combinator", em: true },
        { t: " advise us, and we've shown the work at the LAUSD Innovation Expo." },
    ],
];

const M = { h2: motion.h2, p: motion.p, span: motion.span, div: motion.div, ul: motion.ul, li: motion.li };

const headingWord = {
    hidden: { opacity: 0, y: "0.45em", filter: "blur(10px)" },
    show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 1, ease: EASE.out } },
};

// One word whose brightness is scrubbed by scroll progress.
function ScrubWord({ children, progress, range, em }) {
    const opacity = useTransform(progress, range, [0.14, 1]);
    return (
        <M.span style={{ opacity }} className={em ? "text-accent" : undefined}>
            {children}
        </M.span>
    );
}

function ScrubText({ reduce }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

    // Flatten to words, remembering paragraph and emphasis.
    const words = [];
    PARAGRAPHS.forEach((segs, p) => segs.forEach((s) => s.t.split(/(\s+)/).forEach((w) => {
        if (w) words.push({ w, p, em: !!s.em, space: /^\s+$/.test(w) });
    })));
    const total = words.filter((x) => !x.space).length;
    let k = 0;

    return (
        <div ref={ref} className="space-y-8">
            {PARAGRAPHS.map((_, p) => (
                <p key={p} className="display text-pretty text-[1.4rem] font-medium leading-[1.35] tracking-tight text-ink sm:text-[1.9rem] lg:text-[2.2rem]">
                    {words.filter((x) => x.p === p).map((x, i) => {
                        if (x.space) return x.w;
                        if (reduce) return <span key={i} className={x.em ? "text-accent" : undefined}>{x.w}</span>;
                        const start = k / total;
                        const end = Math.min(1, (k + 6) / total); // a soft band of words lights up together
                        k += 1;
                        return <ScrubWord key={i} progress={scrollYProgress} range={[start, end]} em={x.em}>{x.w}</ScrubWord>;
                    })}
                </p>
            ))}
        </div>
    );
}

export default function About() {
    const reduce = useReducedMotion();
    const anim = !reduce;

    return (
        <>
            {/* ===================== ABOUT ===================== */}
            <section id="about" className="container-page py-24 sm:py-36">
                <SectionLabel n="01">Who we are</SectionLabel>

                <M.h2 className="display mt-6 max-w-4xl text-balance text-[2.6rem] font-bold leading-[1.02] tracking-tightest text-ink sm:text-6xl lg:text-7xl"
                    aria-label={HEADING}
                    initial={anim ? "hidden" : false} whileInView="show" viewport={VIEWPORT_ANY}
                    transition={{ staggerChildren: 0.06 }}>
                    {HEADING.split(" ").map((w, i, arr) => (
                        <span key={i} aria-hidden="true">
                            <M.span className={`inline-block ${w === "real" || w === "gap." ? "text-gradient" : ""}`} variants={headingWord}>{w}</M.span>
                            {i < arr.length - 1 ? " " : ""}
                        </span>
                    ))}
                </M.h2>

                <div className="mt-14 max-w-4xl sm:mt-20">
                    <ScrubText reduce={reduce} />
                </div>

                {/* Team */}
                <M.div className="mt-20 border-t border-line pt-10 sm:mt-28"
                    initial={anim ? "hidden" : false} whileInView="show" viewport={VIEWPORT_ANY}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}>
                    <M.p className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-faint"
                        variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE.out } } }}>
                        The team
                    </M.p>
                    <M.ul className="mt-7 grid gap-8 sm:grid-cols-3">
                        {TEAM.map((m) => (
                            <M.li key={m.name} className="group flex items-center gap-4"
                                variants={{
                                    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE.out } },
                                }}>
                                {/* Swap the initials avatar for a headshot / the YC photo when ready */}
                                <div className="relative h-14 w-14 shrink-0">
                                    {/* gradient ring: fades + slowly spins in on hover */}
                                    <span aria-hidden="true"
                                        className="avatar-ring absolute -inset-[3px] rounded-full opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100" />
                                    <div className="relative flex h-full w-full items-center justify-center rounded-full border border-line bg-surface font-mono text-sm font-semibold text-ink transition-transform duration-500 ease-out-expo group-hover:scale-[0.94]">
                                        {m.initials}
                                    </div>
                                </div>
                                <div className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                                    <div className="display text-base font-semibold text-ink">{m.name}</div>
                                    <div className="text-sm text-muted">{m.role}</div>
                                </div>
                            </M.li>
                        ))}
                    </M.ul>
                </M.div>
            </section>
        </>
    );
}
