import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Typewriter from "../components/Typewriter";
import { DUR, EASE } from "../lib/motion";
import "../components/hero/hero.css";

const MDiv = motion.div;
const MSpan = motion.span;
const MA = motion.a;
const MP = motion.p;
const MH1 = motion.h1;

// Headline, split into words for the masked rise. `accent` words take the brand
// colour; `tail` is punctuation that stays ink-coloured but rides with the word.
const HEADLINE = [
    { w: "AI" },
    { w: "literacy" },
    { w: "for" },
    { w: "everyone", accent: true, tail: "," },
    { w: "everywhere." },
];

const WORD_STAGGER = 0.075;
const HEAD_DELAY = 0.18;
// When the supporting copy starts: just as the last headline word settles in.
const BODY_DELAY = HEAD_DELAY + WORD_STAGGER * HEADLINE.length + 0.22;

const container = {
    hidden: {},
    show: { transition: { staggerChildren: WORD_STAGGER, delayChildren: HEAD_DELAY } },
};

const word = {
    hidden: { y: "105%", opacity: 0, filter: "blur(10px)" },
    show: {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: DUR.draw, ease: EASE.out, opacity: { duration: DUR.slow, ease: EASE.out } },
    },
};

const cascade = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: BODY_DELAY } },
};

const rise = {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: DUR.slow + 0.2, ease: EASE.out } },
};

const pill = {
    hidden: { opacity: 0, y: 10, scale: 0.96, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: DUR.slow, ease: EASE.out } },
};

export default function Hero() {
    const ref = useRef(null);
    const reduce = useReducedMotion();

    // Scroll hand-off: as the hero leaves, the copy drifts up, shrinks a touch
    // and fades, so the next section slides in under a settling hero.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

    const initial = reduce ? false : "hidden";

    return (
        <>
            {/* ===================== HERO ===================== */}
            <section ref={ref} className="relative isolate overflow-hidden">
                <MDiv
                    className="container-page relative z-10 pt-20 pb-20 sm:pt-28 sm:pb-28"
                    style={reduce ? undefined : { y: contentY, scale: contentScale, opacity: contentOpacity }}
                >
                    <MDiv className="mx-auto max-w-3xl text-center" initial={initial} animate="show" variants={cascade}>
                        <MA
                            href="#summit"
                            initial={initial}
                            animate="show"
                            variants={pill}
                            className="focusable group relative mb-8 inline-flex max-w-full overflow-hidden rounded-full p-px text-[13px] font-medium text-muted shadow-[0_1px_2px_rgba(21,21,26,0.04)] transition-[color,box-shadow] duration-300 hover:text-ink hover:shadow-soft sm:text-sm"
                        >
                            <span aria-hidden="true" className="hero-pill-ring" />
                            <span className="relative inline-flex min-w-0 items-center gap-2.5 rounded-full bg-white/90 py-1 pl-1 pr-3.5 backdrop-blur-sm">
                                <span className="shrink-0 rounded-full bg-accentsoft px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent">Late 2026</span>
                                <span className="min-w-0 truncate">
                                    <span className="sm:hidden">LA Student AI Summit</span>
                                    <span className="hidden sm:inline">LA Student AI Summit and Hackathon</span>
                                </span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                                <span aria-hidden="true" className="hero-pill-sheen" />
                            </span>
                        </MA>

                        <MH1
                            className="display text-balance text-[2.6rem] font-bold leading-[1.02] tracking-tightest text-ink sm:text-6xl"
                            initial={initial}
                            animate="show"
                            variants={container}
                        >
                            {HEADLINE.map((item, i) => (
                                <span key={item.w}>
                                    {/* Mask: the word rises out of its own line box. Padding + negative
                                        margin leave room for descenders without shifting layout. */}
                                    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                                        <MSpan className="inline-block will-change-transform" variants={word}>
                                            {item.accent ? <span className="text-accent">{item.w}</span> : item.w}
                                            {item.tail}
                                        </MSpan>
                                    </span>
                                    {i < HEADLINE.length - 1 ? " " : null}
                                </span>
                            ))}
                        </MH1>

                        <MP variants={rise} className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                            We build free, open-source AI courses and bring them into public schools.
                            We're starting with LAUSD, the second-largest district in the country.
                        </MP>
                        <MP variants={rise} className="mt-7 text-base text-muted">
                            Students learn to{" "}
                            <Typewriter className="display font-semibold text-accent" words={["train their first model", "question the tools they use", "explain how an LLM works", "spot AI bias", "build a working classifier", "solve a real-world problem"]} />
                        </MP>
                        <MDiv variants={rise} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <a href="#involved" className="btn-accent w-full sm:w-auto">Get involved</a>
                            <a href="#about" className="btn-ghost w-full sm:w-auto">Learn more</a>
                        </MDiv>
                        <MP variants={rise} className="mt-9 text-[13px] uppercase tracking-[0.14em] text-faint">
                            Advised by people from Google&nbsp;DeepMind &amp; Y&nbsp;Combinator
                        </MP>
                    </MDiv>
                </MDiv>
            </section>
        </>
    );
}
