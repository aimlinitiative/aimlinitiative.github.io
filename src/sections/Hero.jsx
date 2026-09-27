import { useLayoutEffect, useRef, useState } from "react";
import { motion, transform, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import Typewriter from "../components/Typewriter";
import HeroBackdrop from "../components/hero/HeroBackdrop";
import { DUR, EASE } from "../lib/motion";
import { COLORS } from "../lib/palette";
import "../components/hero/hero.css";

const MDiv = motion.div;
const MSpan = motion.span;
const MA = motion.a;
const MP = motion.p;
const MH1 = motion.h1;

const STAGE = COLORS.stage;

// The page's one gradient word (DESIGN.md §2): the spotlight family, drifting
// slowly through "everyone" (animation in hero.css).
const KEYWORD_GRADIENT = `linear-gradient(100deg, ${COLORS.blue} 0%, ${COLORS.violet} 30%, ${COLORS.cyan} 56%, ${COLORS.violet} 80%, ${COLORS.blue} 100%)`;

// The summit pill's travelling border light: a short accent comet, dark elsewhere.
const PILL_LIGHT = `conic-gradient(from 0deg, transparent 0deg 225deg, ${COLORS.accentDark} 335deg, transparent 360deg)`;

// Clamped linear map between two ranges.
const map = (input, output) => transform(input, output, { clamp: true });

// Headline, split into words for the masked rise. `accent` words get the
// gradient treatment; `tail` is punctuation that stays white but rides along;
// `br` ends the first line on desktop ("AI literacy for / everyone, everywhere."),
// which is also where text-wrap: balance lands on its own.
const HEADLINE = [
    { w: "AI" },
    { w: "literacy" },
    { w: "for", br: true },
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
    // Ends as a card with the panel radius (DESIGN.md: 28px).
    const stageRadius = useTransform(scrollYProgress, map([0.7, 1], [0, 28]));

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
                    className="sticky top-0 isolate flex min-h-[100svh] items-center overflow-hidden text-ondark"
                    style={reduce ? { backgroundColor: STAGE } : { backgroundColor: STAGE, scale: stageScale, borderRadius: stageRadius }}
                >
                    <HeroBackdrop watchRef={ref} progress={scrollYProgress} reduced={!!reduce} />

                    <MDiv
                        className="hero-copy container-page relative z-10 origin-center"
                        style={reduce ? undefined : { scale: copyScale, y: copyY, opacity: copyOpacity, filter: copyFilter, pointerEvents: copyPointer }}
                        // Keyboard users tabbing into the copy mid-flight: bring it back into view.
                        onFocusCapture={() => {
                            if (reduce || scrollYProgress.get() < 0.08 || !ref.current) return;
                            window.scrollTo({ top: ref.current.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
                        }}
                    >
                        {/* One vertical rhythm for the whole stack (hero.css): --hero-s between
                            related lines, --hero-m between groups, --hero-l before the actions;
                            24/32/40px on roomy screens, 16/24/32px on phones and short screens. */}
                        <MDiv className="text-center" initial={initial} animate="show" variants={cascade}>
                            {/* Summit pill: translucent hairline pill, mono date chip, and a
                                faint accent light travelling along the border (hero.css).
                                The ::before pads the hit area to 44px without growing the pill. */}
                            <MA
                                href="#summit"
                                initial={initial}
                                animate="show"
                                variants={pill}
                                className="group relative mb-[var(--hero-m)] inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] py-1 pl-1 pr-3.5 text-caption text-ondark/85 outline-none transition-colors duration-300 before:absolute before:-inset-y-[7px] before:inset-x-0 before:content-[''] hover:border-white/[0.16] hover:bg-white/[0.09] hover:text-ondark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accentdk sm:text-[14px]"
                            >
                                <span aria-hidden="true" className="hero-pill-light">
                                    <span className="hero-pill-comet" style={{ backgroundImage: PILL_LIGHT }} />
                                </span>
                                <span className="eyebrow relative shrink-0 rounded-full bg-accentdark/[0.14] px-2.5 py-[5px] text-accentdark">Late 2026</span>
                                <span className="relative min-w-0 truncate">
                                    <span className="sm:hidden">LA Student AI Summit</span>
                                    <span className="hidden sm:inline">LA Student AI Summit and Hackathon</span>
                                </span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="relative shrink-0 text-ondarkmuted transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-ondark"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                            </MA>

                            {/* Poster headline: Geist 600 at display-2xl (-0.05em, 0.92 leading). */}
                            <MH1
                                className="display text-balance text-display-2xl text-ondark [text-shadow:0_2px_30px_rgba(7,8,12,0.6)]"
                                initial={initial}
                                animate="show"
                                variants={container}
                            >
                                {HEADLINE.map((item, i) => (
                                    <span key={item.w}>
                                        {/* Mask: the word rises out of its own line box. Padding + negative
                                            margin leave room for descenders (they drop 0.15em below the
                                            baseline, past the 0.92 line box) without shifting layout. */}
                                        <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                                            <MSpan className="inline-block will-change-transform" variants={word}>
                                                {item.accent ? (
                                                    <span className="hero-keyword" style={{ backgroundImage: KEYWORD_GRADIENT }}>
                                                        {item.w}
                                                    </span>
                                                ) : (
                                                    item.w
                                                )}
                                                {item.tail}
                                            </MSpan>
                                        </span>
                                        {i < HEADLINE.length - 1 ? " " : null}
                                        {item.br ? <br className="hidden lg:inline" /> : null}
                                    </span>
                                ))}
                            </MH1>

                            <MP variants={rise} className="hero-lead mx-auto mt-[var(--hero-m)] max-w-[34rem] text-balance text-lead text-ondarkmuted">
                                We build free, open-source AI courses and bring them into public schools.
                                We're starting with LAUSD, the second-largest district in the country.
                            </MP>
                            {/* The phrase gets its own line on phones so typing never rewraps the stack. */}
                            <MP variants={rise} className="mt-[var(--hero-s)] text-body text-ondarkmuted">
                                Students learn to{" "}
                                <Typewriter
                                    className="block font-display font-semibold text-ondark sm:inline [&>[aria-hidden]]:text-accentdark"
                                    words={["train their first model", "question the tools they use", "explain how an LLM works", "spot AI bias", "build a working classifier", "solve a real-world problem"]}
                                />
                            </MP>
                            {/* Stage pills (DESIGN.md §4): white primary, translucent secondary.
                                Side by side at every width; they fit down to 320px. */}
                            <MDiv variants={rise} className="mt-[var(--hero-l)] flex flex-wrap items-center justify-center gap-3">
                                <a href="#involved" className="btn-light">Get involved</a>
                                <a href="#about" className="btn-dark">Learn more</a>
                            </MDiv>
                            <MP variants={rise} className="eyebrow mx-auto mt-[var(--hero-m)] max-w-[22rem] text-balance leading-[1.7] text-ondarkmuted sm:max-w-none">
                                Advised by people from Google&nbsp;DeepMind &amp; Y&nbsp;Combinator
                            </MP>
                        </MDiv>
                    </MDiv>

                    {!reduce && (
                        <MDiv
                            aria-hidden="true"
                            className="hero-cue pointer-events-none absolute inset-x-0 bottom-6 z-10 flex-col items-center"
                            style={{ opacity: cueOpacity }}
                        >
                            <MDiv
                                className="flex flex-col items-center gap-2.5"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: BODY_DELAY + 0.9, duration: DUR.slow, ease: EASE.out }}
                            >
                                {/* Chrome, not copy: dimmer than the advisors line above it. */}
                                <span className="eyebrow text-white/40">Scroll</span>
                                {/* 1px hairline with a soft drop of light running down it */}
                                <span className="relative block h-8 w-px overflow-hidden bg-white/30">
                                    <MSpan
                                        className="absolute inset-x-0 top-0 block h-1/2 bg-gradient-to-b from-transparent to-white"
                                        animate={{ y: ["-100%", "200%"] }}
                                        transition={{ duration: 2, ease: EASE.inOut, repeat: Infinity, repeatDelay: 0.6 }}
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
