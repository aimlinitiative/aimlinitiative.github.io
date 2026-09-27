import { useEffect, useRef } from "react";
import { animate, motion as Motion, useInView, useReducedMotion } from "motion/react";
import SectionLabel from "../components/SectionLabel";
import { EASE, VIEWPORT } from "../lib/motion";
import { Item, Stagger } from "../components/fx/Stagger";
import { DRAW_X, STILL } from "../components/fx/variants";

const LOOKING = [
    { t: "A venue for the summit", tag: "Most needed", d: "One Saturday, 8am to 8pm, with room for at least 200 students plus mentors, tables and chairs, power, and Wi-Fi that holds a few hundred devices. It's our biggest open item, and it unlocks the date." },
    { t: "Speakers, judges, demos & mentors", d: "Twenty minutes on what you build, aimed at a 15-year-old. An hour judging pitches. A demo students can get their hands on, hardware especially. Or an afternoon mentoring a table. Each takes a half-day or less." },
    { t: "Sponsors & funders", d: "Cash or in kind: hardware, platform credits, swag, or a prize track in your area. Every dollar runs through our 501(c)(3) fiscal sponsor, with a receipt for every expense." },
    { t: "Schools & educators", d: "Want to bring students to the summit, or teach the free course in your classroom? Tell us and we'll help you get set up." },
    { t: "Introductions", d: "Venue operators, community and education giving teams, and anyone who should be in the room. Warm intros have been worth far more to us than cold email." },
];

// One grid for the header and the rows, so the lead lines up with the
// descriptions: [number | title | description | arrow].
const GRID = "lg:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.2fr)_3rem] lg:gap-x-10";

// Hover effects are gated on (hover: hover), so a tap never leaves a row stuck
// in its hover state. Class names are spelled out in full for Tailwind.
const EASE_OUT = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const WASH_ON = "[@media(hover:hover)]:group-hover:opacity-100";
const NUM_ON = "[@media(hover:hover)]:group-hover:translate-x-1 [@media(hover:hover)]:group-hover:text-ink";
const ARROW_ON = "[@media(hover:hover)]:group-hover:translate-x-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100";

// Row entrance: a left-to-right clip wipe; cleared afterwards so the hover wash can bleed.
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
function Count({ n }) {
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
    return <span ref={ref}>{pad(n)}</span>;
}

// "Most needed": the standard chip, with a small live dot that softly pings.
function Tag({ children }) {
    const reduce = useReducedMotion();
    return (
        <span className="chip mt-4 gap-2">
            <span aria-hidden className="relative flex h-1.5 w-1.5">
                {!reduce && (
                    <Motion.span
                        className="absolute inset-0 rounded-full bg-accent"
                        animate={{ scale: [1, 2.6], opacity: [0.45, 0] }}
                        transition={{ duration: 1.8, ease: EASE.out, repeat: Infinity, repeatDelay: 1.2 }}
                    />
                )}
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {children}
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
                className={`group relative isolate grid grid-cols-1 gap-y-3 py-10 sm:py-12 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.2fr)] md:items-start md:gap-x-8 ${GRID}`}
                variants={reduce ? STILL : WIPE}
            >
                {/* hover wash: a soft parchment tile between the hairlines */}
                <span
                    aria-hidden
                    className={`pointer-events-none absolute -inset-x-4 inset-y-2 -z-10 rounded-card bg-parchment opacity-0 transition-opacity duration-500 ${EASE_OUT} ${WASH_ON} sm:-inset-x-6`}
                />
                {/* resting hairline, drawn in */}
                <Motion.span aria-hidden variants={reduce ? STILL : DRAW_X} className="absolute inset-x-0 bottom-0 h-px origin-left bg-line" />

                <Item variants={RISE_X} className="font-mono text-[12px] font-medium tabular-nums tracking-[0.08em] md:pt-3">
                    <span className={`inline-block text-faint transition duration-500 ${EASE_OUT} ${NUM_ON} motion-reduce:transform-none`}>
                        <Count n={i + 1} />
                    </span>
                </Item>
                <Item variants={RISE_X}>
                    <h3 className="display text-balance text-display-md text-ink">{l.t}</h3>
                    {l.tag && <Tag>{l.tag}</Tag>}
                </Item>
                <Item as="p" variants={RISE_X} className="max-w-measure text-pretty text-body text-muted md:pt-1">{l.d}</Item>
                <span aria-hidden className="hidden justify-end pt-1 lg:flex">
                    <svg
                        width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        className={`-translate-x-4 translate-y-4 text-accent opacity-0 transition duration-500 ${EASE_OUT} ${ARROW_ON} motion-reduce:transform-none`}
                    >
                        <path d="M7 17 17 7M8 7h9v9" />
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
            <section id="involved" className="section-y bg-canvas">
                <div className="container-page">
                    <Stagger each={0.1} className={`lg:grid lg:items-end ${GRID}`}>
                        <div className="lg:col-span-2">
                            <Item><SectionLabel n="06">Get involved</SectionLabel></Item>
                            <Item as="h2" className="display mt-6 text-balance text-display-xl text-ink">What we're looking for.</Item>
                        </div>
                        <Item as="p" className="mt-6 max-w-measure text-pretty text-lead text-muted lg:col-span-2 lg:mt-0">
                            The summit is planned for late November or early December. Here's what would help most right now.
                        </Item>
                    </Stagger>
                    <Item self aria-hidden variants={DRAW_X} className="mt-14 h-px origin-left bg-line sm:mt-20" />
                    <div>
                        {LOOKING.map((l, i) => <Row key={l.t} l={l} i={i} />)}
                    </div>
                </div>
            </section>
        </>
    );
}
