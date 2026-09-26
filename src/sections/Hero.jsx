import { useLayoutEffect, useRef, useState } from "react";
import { motion, transform, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import Typewriter from "../components/Typewriter";
import HeroBackdrop from "../components/hero/HeroBackdrop";
import { DUR, EASE } from "../lib/motion";
import "../components/hero/hero.css";

const MDiv = motion.div;
const MSpan = motion.span;
const MA = motion.a;
const MP = motion.p;
const MH1 = motion.h1;

const STAGE = "#07080C";

// Clamped linear map between two ranges.
const map = (input, output) => transform(input, output, { clamp: true });

// Headline, split into words for the masked rise. `accent` words get the
// gradient treatment; `tail` is punctuation that stays white but rides along.
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

/* The hero is a dark, pinned "stage". While it is pinned, scrolling flies the
 * camera through the 3D network (see components/hero/HeroScene), the copy
 * swells, blurs and dissolves, and at the end the stage settles into a
 * rounded card that scrolls away into the light page. */
export default function Hero() {
    const ref = useRef(null);
    const reduce = useReducedMotion();

    // Mapper functions (not range arrays) on purpose: motion would otherwise try
    // to hand opacity to a native ScrollTimeline, whose range does not match
    // this pinned layout. These run on motion's frame loop; no React renders.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const copyScale = useTransform(scrollYProgress, map([0, 0.4], [1, 1.3]));
    const copyY = useTransform(scrollYProgress, map([0, 0.4], [0, -36]));
    const copyOpacity = useTransform(scrollYProgress, map([0.1, 0.36], [1, 0]));
    const copyBlurPx = useTransform(scrollYProgress, map([0.04, 0.36], [0, 16]));
    const copyFilter = useMotionTemplate`blur(${copyBlurPx}px)`;
    const copyPointer = useTransform(scrollYProgress, (v) => (v > 0.3 ? "none" : "auto"));
    const cueOpacity = useTransform(scrollYProgress, map([0, 0.08], [1, 0]));
    const stageScale = useTransform(scrollYProgress, map([0.7, 1], [1, 0.9]));
    const stageRadius = useTransform(scrollYProgress, map([0.7, 1], [0, 40]));

    const initial = reduce ? false : "hidden";

    // Tuck the stage up under the sticky navbar (its exact height, border included).
    const [navH, setNavH] = useState(65);
    useLayoutEffect(() => {
        const header = document.querySelector("header");
        if (!header) return;
        const measure = () => setNavH(header.offsetHeight);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(header);
        return () => ro.disconnect();
    }, []);

    return (
        <>
            {/* ===================== HERO ===================== */}
            <section
                ref={ref}
                aria-label="Introduction"
                style={{ marginTop: -navH }}
                className={`relative ${reduce ? "" : "h-[170svh] sm:h-[200svh]"}`}
            >
                <MDiv
                    data-nav-theme="dark"
                    className="sticky top-0 isolate flex min-h-[100svh] items-center overflow-hidden text-white"
                    style={reduce ? { backgroundColor: STAGE } : { backgroundColor: STAGE, scale: stageScale, borderRadius: stageRadius }}
                >
                    <HeroBackdrop watchRef={ref} progress={scrollYProgress} reduced={!!reduce} />

                    <MDiv
                        className="container-page relative z-10 origin-center pb-20 pt-32 sm:pb-24 sm:pt-36"
                        style={reduce ? undefined : { scale: copyScale, y: copyY, opacity: copyOpacity, filter: copyFilter, pointerEvents: copyPointer }}
                        // Keyboard users tabbing into the copy mid-flight: bring it back into view.
                        onFocusCapture={() => {
                            if (reduce || scrollYProgress.get() < 0.08 || !ref.current) return;
                            window.scrollTo({ top: ref.current.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
                        }}
                    >
                        <MDiv className="mx-auto max-w-3xl text-center" initial={initial} animate="show" variants={cascade}>
                            <MA
                                href="#summit"
                                initial={initial}
                                animate="show"
                                variants={pill}
                                className="focusable group relative mb-8 inline-flex max-w-full rounded-full p-px text-[13px] font-medium text-white/70 shadow-[0_0_24px_-6px_rgba(47,107,255,0.45)] transition-[color,box-shadow] duration-300 hover:text-white hover:shadow-[0_0_32px_-4px_rgba(47,107,255,0.65)] sm:text-sm"
                            >
                                <span aria-hidden="true" className="hero-pill-clip">
                                    <span className="hero-pill-ring" />
                                </span>
                                <span className="relative inline-flex min-w-0 items-center gap-2.5 rounded-full bg-[#0C0E15] py-1 pl-1 pr-3.5">
                                    <span aria-hidden="true" className="hero-pill-sheen" />
                                    <span className="relative shrink-0 rounded-full bg-[#2F6BFF]/[0.16] px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#9DBBFF]">Late 2026</span>
                                    <span className="relative min-w-0 truncate">
                                        <span className="sm:hidden">LA Student AI Summit</span>
                                        <span className="hidden sm:inline">LA Student AI Summit and Hackathon</span>
                                    </span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                                </span>
                            </MA>

                            <MH1
                                className="display text-balance text-[2.75rem] font-bold leading-[1.02] tracking-tightest text-white [text-shadow:0_2px_30px_rgba(7,8,12,0.6)] sm:text-7xl"
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
                                                {item.accent ? <span className="hero-gradient-text [text-shadow:none]">{item.w}</span> : item.w}
                                                {item.tail}
                                            </MSpan>
                                        </span>
                                        {i < HEADLINE.length - 1 ? " " : null}
                                    </span>
                                ))}
                            </MH1>

                            <MP variants={rise} className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/[0.68]">
                                We build free, open-source AI courses and bring them into public schools.
                                We're starting with LAUSD, the second-largest district in the country.
                            </MP>
                            <MP variants={rise} className="mt-7 text-base text-white/[0.68]">
                                Students learn to{" "}
                                <Typewriter className="display font-semibold text-[#8FB0FF]" words={["train their first model", "question the tools they use", "explain how an LLM works", "spot AI bias", "build a working classifier", "solve a real-world problem"]} />
                            </MP>
                            <MDiv variants={rise} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <a href="#involved" className="btn-accent w-full shadow-[0_8px_30px_-8px_rgba(47,107,255,0.7)] sm:w-auto">Get involved</a>
                                <a href="#about" className="btn focusable w-full border border-white/15 bg-white/[0.05] text-white backdrop-blur-md hover:border-white/30 hover:bg-white/[0.1] sm:w-auto">Learn more</a>
                            </MDiv>
                            <MP variants={rise} className="mt-9 text-[13px] uppercase tracking-[0.14em] text-white/50">
                                Advised by people from Google&nbsp;DeepMind &amp; Y&nbsp;Combinator
                            </MP>
                        </MDiv>
                    </MDiv>

                    {!reduce && (
                        <MDiv
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-2 sm:flex"
                            style={{ opacity: cueOpacity }}
                        >
                            <MDiv
                                className="flex flex-col items-center gap-2"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: BODY_DELAY + 0.9, duration: DUR.slow, ease: EASE.out }}
                            >
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
                                <span className="relative block h-9 w-px overflow-hidden bg-white/10">
                                    <MSpan
                                        className="absolute inset-x-0 top-0 block h-3 bg-gradient-to-b from-transparent to-[#8FB0FF]"
                                        animate={{ y: ["-100%", "300%"] }}
                                        transition={{ duration: 1.8, ease: EASE.inOut, repeat: Infinity, repeatDelay: 0.4 }}
                                    />
                                </span>
                            </MDiv>
                        </MDiv>
                    )}
                </MDiv>
            </section>
        </>
    );
}
