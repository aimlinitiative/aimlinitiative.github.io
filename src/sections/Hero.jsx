import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { DIST, DUR, EASE, STAGGER, fadeUp, group, lineUp } from "../lib/motion";

const MH1 = motion.h1;
const MSpan = motion.span;
const MDiv = motion.div;
const MP = motion.p;

const HEADLINE = "Free AI classes for LA public schools.";
const WORDS = HEADLINE.split(" ");

// Timeline: headline words first, then the copy underneath, then the panel.
const WORD_EACH = 0.08;
const HEAD_START = 0.1;
const BODY_START = HEAD_START + WORD_EACH * WORDS.length + 0.05;
const PANEL_START = BODY_START + 0.35;

const FACTS = [
    { value: "12", label: "weeks, from the first lesson to a finished project" },
    { value: "6", label: "units, from the basics to neural networks and bias" },
    { value: "Free", label: "for every school, and every lesson is open-source" },
    { value: "LAUSD", label: "is where our first classroom pilot runs" },
];

function FactPanel({ reduce }) {
    const ref = useRef(null);
    // The panel settles from 0.94 to full size as it scrolls up into view.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.4"] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

    return (
        <MDiv
            initial={reduce ? false : { opacity: 0, y: DIST.rise }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE.out, delay: PANEL_START }}
            className="mt-18 md:mt-22"
        >
            <MDiv
                ref={ref}
                style={reduce ? undefined : { scale }}
                className="rounded-xl bg-surface px-6 py-10 sm:px-10 md:px-12 md:py-14"
            >
                <p className="text-sm font-medium text-ink2">The course at a glance</p>
                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-12 md:grid-cols-4 md:gap-0">
                    {FACTS.map((f, i) => (
                        <li
                            key={f.value}
                            className={`min-w-0 md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l md:border-linestrong"} ${i === FACTS.length - 1 ? "md:pr-0" : ""}`}
                        >
                            <p className="tabular text-h2 text-ink">{f.value}</p>
                            <p className="mt-3 max-w-[16rem] text-sm text-ink2">{f.label}</p>
                        </li>
                    ))}
                </ul>
            </MDiv>
        </MDiv>
    );
}

export default function Hero() {
    const reduce = useReducedMotion();
    const initial = reduce ? false : "hidden";

    return (
        <section aria-labelledby="hero-title" className="container-page pb-4 pt-20 md:pb-8 md:pt-28">
            <MDiv initial={initial} animate="show" variants={group(STAGGER.loose, 0)}>
                <MDiv variants={fadeUp}>
                    <a
                        href="#summit"
                        className="group inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-line bg-card px-4 text-caption text-ink2 sm:text-sm transition-colors duration-base hover:border-linestrong hover:text-ink"
                    >
                        <span>LA Student AI Summit &amp; Hackathon · Late&nbsp;2026</span>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-base ease-out group-hover:translate-x-0.5">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </a>
                </MDiv>
            </MDiv>

            <MH1
                id="hero-title"
                aria-label={HEADLINE}
                className="mt-8 max-w-4xl text-h1 text-ink md:mt-10"
                initial={initial}
                animate="show"
                variants={group(WORD_EACH, HEAD_START)}
            >
                {WORDS.map((w, i) => (
                    <span key={i} aria-hidden="true">
                        <span className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                            <MSpan className="inline-block" variants={lineUp}>{w}</MSpan>
                        </span>
                        {i < WORDS.length - 1 ? " " : null}
                    </span>
                ))}
            </MH1>

            <MDiv initial={initial} animate="show" variants={group(STAGGER.loose, BODY_START)}>
                <MP variants={fadeUp} className="mt-6 max-w-prose text-lead text-ink2 md:mt-8">
                    We write a free, open-source AI course and teach it in public high schools.
                    We&rsquo;re starting with LAUSD, the second-largest school district in the country.
                </MP>
                <MDiv variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
                    <a href="#involved" className="btn-primary">Get involved</a>
                    <a href="#curriculum" className="btn-secondary">See the curriculum</a>
                </MDiv>
                <MP variants={fadeUp} className="mt-8 text-sm text-ink3">
                    Advised by people from Google DeepMind and Y&nbsp;Combinator
                </MP>
            </MDiv>

            <FactPanel reduce={reduce} />
        </section>
    );
}
