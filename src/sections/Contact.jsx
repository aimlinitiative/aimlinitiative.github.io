import { useRef } from "react";
import { motion as Motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import SectionLabel from "../components/SectionLabel";
import { SOCIALS } from "../components/Footer";
import { EASE } from "../lib/motion";
import Aurora from "../components/fx/Aurora";
import Magnetic from "../components/fx/Magnetic";
import { Item, Stagger } from "../components/fx/Stagger";
import { POP } from "../components/fx/variants";
import { C } from "../components/fx/palette";
import "../components/fx/fx.css";

const EMAIL = "aimlinitiative@gmail.com";

// Each word carries its own slice of one continuous white -> periwinkle -> violet -> cyan ramp.
const WORDS = [
    { w: "Let's", g: "linear-gradient(100deg, #FFFFFF 10%, #DCE3FF 60%, #B8C6FF)" },
    { w: "talk.", g: `linear-gradient(100deg, #B8C6FF, #9A8BFF 45%, ${C.cyan})` },
];

const WORD = {
    hidden: { y: "112%", rotate: 5 },
    show: { y: "0%", rotate: 0, transition: { duration: 1.2, ease: EASE.out } },
};

const TEXT_CLIP = { WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" };

// "Let's talk.": masked word-by-word rise, gentle scale with scroll, and a
// slow light sheen once it has landed.
function Headline() {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.5 });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);

    return (
        <Motion.div ref={ref} style={reduce ? undefined : { scale }} className="mt-6">
            <h2 className="display text-[clamp(4rem,15vw,11.5rem)] font-bold leading-[0.95] tracking-tightest">
                <Stagger inherit each={0.12} as="span" className="fx-sheen relative inline-block px-[0.04em]" data-play={inView && !reduce}>
                    {WORDS.map((x, i) => (
                        <span key={x.w}>
                            {i > 0 && " "}
                            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
                                <Item as="span" variants={WORD} className="inline-block origin-bottom-left" style={{ backgroundImage: x.g, ...TEXT_CLIP }}>
                                    {x.w}
                                </Item>
                            </span>
                        </span>
                    ))}
                    {!reduce && (
                        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                            <span
                                className="fx-sheen-window absolute inset-y-0 left-0 w-[40%] overflow-hidden"
                                style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, #000 50%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 50%, transparent)" }}
                            >
                                <span className="fx-sheen-copy absolute inset-y-0 left-0 w-[250%] whitespace-nowrap px-[0.04em] text-white/80">
                                    {WORDS.map((x) => x.w).join(" ")}
                                </span>
                            </span>
                        </span>
                    )}
                </Stagger>
            </h2>
        </Motion.div>
    );
}

export default function Contact() {
    return (
        <>
            {/* ===================== CONTACT ===================== */}
            {/* A dark "stage" finale: drifting aurora, huge gradient headline. */}
            <section id="contact" className="relative isolate overflow-hidden text-center text-white" style={{ backgroundColor: C.stage }}>
                <Aurora />
                <span aria-hidden className="absolute inset-x-0 top-0 h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${C.accent}, ${C.violet}, ${C.cyan}, transparent)` }} />
                <Stagger each={0.12} amount={0.3} className="container-page py-32 sm:py-44">
                    <Item>
                        <SectionLabel n="07" className="justify-center [&>span:first-child]:!text-[#8FB0FF] [&>span:last-child]:!text-white/70">Contact</SectionLabel>
                    </Item>
                    <Headline />
                    <Item as="p" className="mx-auto mt-8 max-w-lg text-lg text-white/65">
                        Partner, fund, teach, or just say hi. We answer every message.
                    </Item>
                    <Item className="mt-12 flex justify-center">
                        <Magnetic strength={0.35} max={10} reach={20}>
                            <span className="group relative inline-block">
                                <span
                                    aria-hidden
                                    className="fx-glow pointer-events-none absolute -inset-4 rounded-full blur-2xl transition-opacity duration-500 group-hover:!opacity-100"
                                    style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.violet}, ${C.cyan})` }}
                                />
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="btn-accent relative px-8 py-3.5 text-base ring-1 ring-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-lg"
                                >
                                    Contact us
                                </a>
                            </span>
                        </Magnetic>
                    </Item>
                    <Stagger inherit each={0.07} className="mt-12 flex items-center justify-center gap-3">
                        {SOCIALS.map((s) => (
                            <Item key={s.label} as="span" variants={POP} className="inline-block">
                                <Magnetic strength={0.4} max={8} reach={6}>
                                    <a
                                        href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/70 transition-colors duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                                    </a>
                                </Magnetic>
                            </Item>
                        ))}
                    </Stagger>
                </Stagger>
            </section>
        </>
    );
}
