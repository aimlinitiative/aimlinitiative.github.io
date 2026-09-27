import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import SectionLabel from "../components/SectionLabel";
import { rgba } from "../components/chrome/tone";
import { EASE, VIEWPORT_ANY } from "../lib/motion";
import { COLORS } from "../lib/palette";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-founder", initials: "AE" },
    { name: "Michael Tarekegn", role: "Co-founder", initials: "MT" },
    { name: "Ibrahim Piri", role: "Engineering", initials: "IP" },
];

const HEADING = "A small team going after a real gap.";
// Two-tone headline (DESIGN.md §2): the lead clause in ink, the rest in faint.
const LEAD_WORDS = 3; // "A small team"

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

// Scroll-lit copy: words wait in the faint tone and light to full ink as the
// reader scrolls. Ink at this opacity over white renders as `faint` (#6E6E73),
// so the scrub stays opacity-only and every state still passes AA.
const UNLIT = 0.64;

// Avatar hover ring: one accent sweep with a fading tail, slowly turning.
const RING = `conic-gradient(from var(--ring-angle), ${COLORS.accent}, ${rgba(COLORS.accent, 0.1)} 70%, ${COLORS.accent})`;

const M = { h2: motion.h2, p: motion.p, span: motion.span, div: motion.div, ul: motion.ul, li: motion.li };

const headline = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const headingWord = {
    hidden: { opacity: 0, y: "0.45em", filter: "blur(10px)" },
    show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 1, ease: EASE.out } },
};
const team = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const kicker = { hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE.out } } };
const card = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE.out } },
};

// One word whose brightness is scrubbed by scroll progress.
function ScrubWord({ children, progress, range, em }) {
    const opacity = useTransform(progress, range, [UNLIT, 1]);
    return (
        <M.span style={{ opacity }} className={em ? "font-medium" : undefined}>
            {children}
        </M.span>
    );
}

function ScrubText({ reduce }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

    // Flatten to words, remembering paragraph and emphasis.
    const words = [];
    PARAGRAPHS.forEach((segs, p) => segs.forEach((s) => s.t.split(/(\s+)/).forEach((w) => {
        if (w) words.push({ w, p, em: !!s.em, space: /^\s+$/.test(w) });
    })));
    const total = words.filter((x) => !x.space).length;
    let k = 0;

    return (
        <div ref={ref} className="max-w-measure space-y-6 sm:space-y-8">
            {PARAGRAPHS.map((_, p) => (
                <p key={p} className="text-pretty text-lead text-ink">
                    {words.filter((x) => x.p === p).map((x, i) => {
                        if (x.space) return x.w;
                        if (reduce) return <span key={i} className={x.em ? "font-medium" : undefined}>{x.w}</span>;
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

// Team card: parchment on the white room, an initials avatar (ink on a white
// circle) that gains a turning accent ring on hover.
function Member({ name, role, initials }) {
    const [first, ...last] = name.split(" ");
    return (
        <M.li variants={card}
            className="card-muted group flex items-center gap-5 transition-colors duration-500 hover:border-linestrong sm:flex-col sm:items-start sm:gap-12">
            {/* Swap the initials avatar for a headshot / the YC photo when ready */}
            <div className="relative h-14 w-14 shrink-0">
                <span aria-hidden="true" style={{ background: RING }}
                    className="avatar-ring absolute -inset-[3px] rounded-full opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full border border-line bg-canvas font-display text-body font-semibold tracking-tight text-ink transition-transform duration-500 ease-out-expo group-hover:scale-[0.94]">
                    {initials}
                </div>
            </div>
            <div className="min-w-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                {/* in the narrow three-up cards (sm–md) every surname takes its own line */}
                <div className="display text-title text-ink">
                    {first} <span className="sm:block lg:inline">{last.join(" ")}</span>
                </div>
                <div className="mt-1 text-body-sm text-faint">{role}</div>
            </div>
        </M.li>
    );
}

export default function About() {
    const reduce = useReducedMotion();
    const anim = !reduce;

    return (
        <>
            {/* ===================== ABOUT ===================== */}
            <section id="about" className="section-y bg-canvas">
                <div className="container-page">
                    <SectionLabel n="01">Who we are</SectionLabel>

                    {/* 5/7 split on desktop: the headline holds the left, the copy lights up on the right */}
                    <div className="mt-6 grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
                        <M.h2 className="display text-balance text-display-xl lg:col-span-5"
                            aria-label={HEADING}
                            variants={headline} initial={anim ? "hidden" : false} whileInView="show" viewport={VIEWPORT_ANY}>
                            {HEADING.split(" ").map((w, i, arr) => (
                                <span key={i} aria-hidden="true">
                                    <M.span className={`inline-block ${i < LEAD_WORDS ? "text-ink" : "text-faint"}`} variants={headingWord}>{w}</M.span>
                                    {i < arr.length - 1 ? " " : ""}
                                </span>
                            ))}
                        </M.h2>

                        <div className="lg:col-span-7 lg:pt-1">
                            <ScrubText reduce={reduce} />
                        </div>
                    </div>

                    {/* Team */}
                    <M.div className="mt-24 sm:mt-32" variants={team} initial={anim ? "hidden" : false} whileInView="show" viewport={VIEWPORT_ANY}>
                        <M.p className="eyebrow" variants={kicker}>The team</M.p>
                        <M.ul className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
                            {TEAM.map((m) => <Member key={m.name} {...m} />)}
                        </M.ul>
                    </M.div>
                </div>
            </section>
        </>
    );
}
