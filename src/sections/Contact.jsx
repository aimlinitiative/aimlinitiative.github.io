import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import SectionLabel from "../components/SectionLabel";
import { SOCIALS } from "../components/Footer";
import { EASE } from "../lib/motion";
import Aurora from "../components/fx/Aurora";
import Magnetic from "../components/fx/Magnetic";
import SpotlightCard from "../components/fx/SpotlightCard";
import { Item, Stagger } from "../components/fx/Stagger";
import { POP } from "../components/fx/variants";
import { C, deep } from "../components/fx/palette";

const EMAIL = "aimlinitiative@gmail.com";

// The spotlight card's ground (DESIGN.md §4): blue -> violet -> cyan sunk deep
// into the stage color, so white type passes AA anywhere on it. The drifting
// Aurora inside the card supplies the light. Plain stage is the fallback.
const GROUND = {
    backgroundColor: C.stage,
    backgroundImage: `linear-gradient(125deg, ${deep(C.blue, 46)} 0%, ${deep(C.violet, 42)} 55%, ${deep(C.cyan, 36)} 100%)`,
};

const WORDS = ["Let's", "talk."];

const WORD = {
    hidden: { y: "112%", rotate: 5 },
    show: { y: "0%", rotate: 0, transition: { duration: 1.2, ease: EASE.out } },
};

// "Let's talk.": a masked word-by-word rise, then a gentle scale with scroll.
function Headline() {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

    return (
        <Motion.div ref={ref} style={reduce ? undefined : { scale }} className="mt-7">
            <h2 className="display text-balance text-display-2xl text-white">
                <Stagger inherit each={0.12} as="span" className="inline-block">
                    {WORDS.map((w, i) => (
                        <span key={w}>
                            {i > 0 && " "}
                            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                                <Item as="span" variants={WORD} className="inline-block origin-bottom-left">{w}</Item>
                            </span>
                        </span>
                    ))}
                </Stagger>
            </h2>
        </Motion.div>
    );
}

export default function Contact() {
    return (
        <>
            {/* ===================== CONTACT ===================== */}
            {/* The page's one spotlight card, on the dark stage. */}
            <section id="contact" data-nav-theme="dark" className="section-y bg-stage">
                <div className="container-page">
                    <SpotlightCard tone="dark" size={720} className="rounded-panel border border-white/10 text-center text-white" style={GROUND}>
                        {/* The aurora drifts inside the card only (clipped to its corners). */}
                        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden rounded-[inherit]">
                            <Aurora />
                        </div>
                        <Stagger each={0.12} amount={0.3} className="px-6 py-20 sm:px-12 md:py-28 lg:py-32">
                            <Item>
                                {/* On the colored ground the accent number and gray label fall under
                                    AA, so the label goes white: number, rule and text. */}
                                <SectionLabel
                                    n="07" tone="dark"
                                    className="justify-center [&>span:first-child>span]:!text-white [&>span:last-child]:!text-white/85 [&>span:nth-child(2)]:!bg-white/50"
                                >
                                    Contact
                                </SectionLabel>
                            </Item>
                            <Headline />
                            <Item as="p" className="mx-auto mt-6 max-w-measure text-pretty text-lead text-white/80">
                                Partner, fund, teach, or just say hi. We answer every message.
                            </Item>
                            <Item className="mt-10 flex justify-center">
                                <Magnetic strength={0.35} max={10} reach={20}>
                                    <a href={`mailto:${EMAIL}`} className="btn-light focus-visible:outline-white">
                                        Contact us
                                    </a>
                                </Magnetic>
                            </Item>
                            <Stagger inherit each={0.07} className="mt-10 flex items-center justify-center gap-3">
                                {SOCIALS.map((s) => (
                                    <Item key={s.label} as="span" variants={POP} className="inline-block">
                                        <Magnetic strength={0.4} max={8} reach={6}>
                                            <a
                                                href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                                            </a>
                                        </Magnetic>
                                    </Item>
                                ))}
                            </Stagger>
                        </Stagger>
                    </SpotlightCard>
                </div>
            </section>
        </>
    );
}
