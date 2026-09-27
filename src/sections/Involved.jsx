import { useEffect, useRef } from "react";
import { animate, motion as Motion, useInView, useReducedMotion } from "motion/react";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import { EASE, VIEWPORT } from "../lib/motion";
import { Item } from "../components/fx/Stagger";
import { DRAW_X, STILL } from "../components/fx/variants";
import { C, GRADIENT } from "../components/fx/palette";

// Electric blue -> violet -> cyan, deepened where needed for contrast on the light surface.
const LOOKING_TINT = ["#2F6BFF", "#5A63FF", "#7C5CFF", "#3F7FF0", "#0E9DC0"];

const LOOKING = [
    { t: "A venue for the summit", tag: "Most needed", d: "One Saturday, 8am to 8pm, with room for at least 200 students plus mentors, tables and chairs, power, and Wi-Fi that holds a few hundred devices. It's our biggest open item, and it unlocks the date." },
    { t: "Speakers, judges, demos & mentors", d: "Twenty minutes on what you build, aimed at a 15-year-old. An hour judging pitches. A demo students can get their hands on, hardware especially. Or an afternoon mentoring a table. Each takes a half-day or less." },
    { t: "Sponsors & funders", d: "Cash or in kind: hardware, platform credits, swag, or a prize track in your area. Every dollar runs through our 501(c)(3) fiscal sponsor, with a receipt for every expense." },
    { t: "Schools & educators", d: "Want to bring students to the summit, or teach the free course in your classroom? Tell us and we'll help you get set up." },
    { t: "Introductions", d: "Venue operators, community and education giving teams, and anyone who should be in the room. Warm intros have been worth far more to us than cold email." },
];

const OUT = "ease-[cubic-bezier(0.16,1,0.3,1)]";

// Row entrance: a left-to-right clip wipe; cleared afterwards so hover layers can bleed.
const WIPE = {
    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
    show: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.2, ease: EASE.out, staggerChildren: 0.08, delayChildren: 0.12 },
        transitionEnd: { clipPath: "none" },
    },
};
const RISE_X = {
    hidden: { opacity: 0, x: -24, filter: "blur(6px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE.out }, transitionEnd: { filter: "none" } },
};

// Row number that counts up from 00 when it comes into view.
function Count({ n, color }) {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const inView = useInView(ref, { once: true, amount: 0.8 });
    const pad = (v) => String(v).padStart(2, "0");
    useEffect(() => {
        if (!inView || reduce || !ref.current) return;
        const el = ref.current;
        const c = animate(0, n, { duration: 0.9, ease: EASE.out, onUpdate: (v) => { el.textContent = pad(Math.round(v)); } });
        return () => c.stop();
    }, [inView, reduce, n]);
    return <span ref={ref} style={{ color }}>{pad(n)}</span>;
}

// "Most needed": a pill with a slow, soft halo.
function Tag({ children }) {
    const reduce = useReducedMotion();
    return (
        <span className="relative mt-3 inline-block">
            {!reduce && (
                <Motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.violet})` }}
                    animate={{ scale: [1, 1.22], opacity: [0.35, 0] }}
                    transition={{ duration: 2.2, ease: EASE.out, repeat: Infinity, repeatDelay: 0.9 }}
                />
            )}
            <span className="relative inline-block rounded-full bg-accentsoft px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent ring-1 ring-accent/15">
                {children}
            </span>
        </span>
    );
}

function Row({ l, i }) {
    const reduce = useReducedMotion();
    return (
        // The outer wrapper watches the viewport (a fully clipped element never
        // counts as intersecting); the inner row does the wipe.
        <Motion.div initial="hidden" whileInView="show" viewport={VIEWPORT}>
            <Motion.div
                className="group relative isolate grid grid-cols-1 gap-x-10 gap-y-3 py-9 sm:py-11 md:grid-cols-[3.5rem_minmax(0,1.05fr)_minmax(0,1fr)_3.5rem] md:items-start"
                variants={reduce ? STILL : WIPE}
            >
                {/* hover wash */}
                <span
                    aria-hidden
                    className={`pointer-events-none absolute -inset-x-3 inset-y-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-700 ${OUT} group-hover:opacity-100 sm:-inset-x-5`}
                    style={{ background: `linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35) 60%, transparent)` }}
                />
                {/* resting rule, drawn in */}
                <Motion.span aria-hidden variants={reduce ? STILL : DRAW_X} className="absolute inset-x-0 bottom-0 h-px origin-left bg-ink/10" />
                {/* hover rule: gradient, expands from the left */}
                <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 transition-transform duration-[900ms] ${OUT} group-hover:scale-x-100 motion-reduce:transition-none`}
                    style={{ background: GRADIENT }}
                />

                <Item variants={RISE_X} className="font-mono text-sm font-bold tabular-nums md:pt-2.5">
                    <span className={`inline-block transition-transform duration-700 ${OUT} group-hover:translate-x-2 motion-reduce:transform-none`}>
                        <Count n={i + 1} color={LOOKING_TINT[i]} />
                    </span>
                </Item>
                <Item variants={RISE_X}>
                    <h3 className="display text-2xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-3xl lg:text-[2.25rem]">{l.t}</h3>
                    {l.tag && <Tag>{l.tag}</Tag>}
                </Item>
                <Item as="p" variants={RISE_X} className="max-w-xl leading-relaxed text-muted md:pt-1.5">{l.d}</Item>
                <span aria-hidden className="hidden justify-end md:flex md:pt-1">
                    <svg
                        width="52" height="52" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        className={`-translate-x-6 translate-y-6 opacity-0 transition duration-700 ${OUT} group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transform-none`}
                    >
                        <defs>
                            <linearGradient id={`arrow-g-${i}`} x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0" stopColor={C.accent} />
                                <stop offset="0.55" stopColor={C.violet} />
                                <stop offset="1" stopColor={C.cyan} />
                            </linearGradient>
                        </defs>
                        <path d="M7 17 17 7M8 7h9v9" stroke={`url(#arrow-g-${i})`} />
                    </svg>
                </span>
            </Motion.div>
        </Motion.div>
    );
}

export default function Involved() {
    return (
        <>
            {/* ===================== GET INVOLVED ===================== */}
            <section id="involved" className="border-y border-line bg-surface">
                <div className="container-page py-24 sm:py-32">
                    <Reveal className="max-w-2xl">
                        <SectionLabel n="06">Get involved</SectionLabel>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">What we're looking for.</h2>
                        <p className="mt-4 text-lg text-muted">The summit is planned for late November or early December. Here's what would help most right now.</p>
                    </Reveal>
                    <Item self aria-hidden variants={DRAW_X} className="mt-14 h-px origin-left bg-ink/10" />
                    <div>
                        {LOOKING.map((l, i) => <Row key={l.t} l={l} i={i} />)}
                    </div>
                </div>
            </section>
        </>
    );
}
