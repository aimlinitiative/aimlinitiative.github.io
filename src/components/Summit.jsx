import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    motion as Motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform,
} from "motion/react";
import { EASE, stagger } from "../lib/motion";
import SpotlightCard from "./fx/SpotlightCard";
import DecodeText from "./fx/DecodeText";
import { Item, Stagger } from "./fx/Stagger";
import { DRAW_X, POP, RISE, STILL } from "./fx/variants";
import { C, GRADIENT } from "./fx/palette";
import useMediaQuery, { DESKTOP } from "./fx/useMediaQuery";

const EMAIL = "aimlinitiative@gmail.com";

/* The LA Student AI Summit and Hackathon: key facts, how the day runs, and how
 * safety and money work. Wording follows the partner brief (14 Sept 2026), so
 * update it here once the date and venue are set. */

const FACTS = [
    { k: "When", v: "A Saturday in late November or early December 2026", wide: true },
    { k: "Where", v: "Los Angeles, venue being finalized" },
    { k: "Who", v: "LA middle and high school students" },
    { k: "Cost", v: "Free, lunch included" },
    { k: "Size", v: "200+ students, depending on the venue" },
];

const DAY = [
    {
        when: "Morning · 3 hours",
        t: "Talks, a panel, and demos",
        tint: C.accent,
        wide: true,
        items: [
            "Keynotes from Google DeepMind, Microsoft, Google, and Snap",
            "A careers panel",
            "Live demos, including physical AI",
        ],
    },
    {
        when: "Midday",
        t: "Lunch",
        tint: C.violet,
        items: ["Free for students", "Partner tables around the room"],
    },
    {
        when: "Afternoon · 3 hours",
        t: "Hackathon",
        tint: C.cyan,
        wide: true,
        items: [
            "Teams of 3 or 4 pick a problem from their own school or neighborhood",
            "Mentors work the floor, and halfway through, teams swap and try to break each other's projects",
            "Three-minute pitches, judging, and prizes",
        ],
    },
];

const SAFETY = [
    "Signed parent consent for every student under 18, covering AI tool use",
    "Teachers come with their students, and partner mentors are on the floor all day",
    "Generative AI only during the afternoon build, for a set block of time, with a mentor at each table",
];

const TOOLS = ["Teachable Machine", "Google Colab", "GitHub Student Developer Pack", "MongoDB Atlas", "Google Forms", "Devpost"];

const CARD = "rounded-2xl border border-line bg-white p-6 sm:p-7";

function Kicker({ children, className = "" }) {
    return <p className={`font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-faint ${className}`}>{children}</p>;
}

const BULLET = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE.out }, transitionEnd: { filter: "none" } },
};
const TICK = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.8, ease: EASE.out, delay: 0.1 } },
};

// Bullet rows. `play` hands control to a parent (the timeline); without it the
// list staggers in on its own when scrolled into view.
function Bullets({ items, play, className = "mt-4" }) {
    const reduce = useReducedMotion();
    const trigger = play === undefined
        ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } }
        : { initial: "hidden", animate: play ? "show" : "hidden" };
    return (
        <Motion.ul className={`space-y-2.5 ${className}`} variants={stagger(0.09, 0.05)} {...trigger}>
            {items.map((it) => (
                <Motion.li key={it} variants={reduce ? STILL : BULLET} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <Motion.span variants={reduce ? STILL : TICK} className="mt-[0.8em] h-px w-3 shrink-0 origin-left bg-ink/30" />
                    <span>{it}</span>
                </Motion.li>
            ))}
        </Motion.ul>
    );
}

/* ---------- The day ---------- */

// A timeline node: ignites (tinted core, glow, one ping) when the line reaches it.
function Node({ lit, tint, nodeRef }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.6, ease: EASE.out };
    return (
        <span ref={nodeRef} aria-hidden className="relative block h-[15px] w-[15px]">
            <Motion.span
                className="absolute -inset-[7px] rounded-full"
                style={{ background: `radial-gradient(circle, ${tint}55, transparent 70%)` }}
                initial={false}
                animate={{ opacity: lit ? 1 : 0, scale: lit ? 1 : 0.3 }}
                transition={t}
            />
            {!reduce && (
                <Motion.span
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: tint }}
                    initial={false}
                    animate={lit ? { opacity: [0.7, 0], scale: [1, 3] } : { opacity: 0, scale: 1 }}
                    transition={{ duration: 1.3, ease: EASE.out }}
                />
            )}
            <span className="absolute inset-0 rounded-full border border-ink/15 bg-white" />
            <Motion.span
                className="absolute inset-[3px] rounded-full"
                style={{ backgroundColor: tint, boxShadow: `0 0 12px 2px ${tint}` }}
                initial={false}
                animate={{ scale: lit ? 1 : 0, opacity: lit ? 1 : 0 }}
                transition={t}
            />
        </span>
    );
}

// Lit/reached state for a node at `frac` along a 0-1 progress value. Only
// re-renders when the line crosses the node.
function useLit(progress, frac) {
    const [lit, setLit] = useState(false);
    const [reached, setReached] = useState(false);
    useMotionValueEvent(progress, "change", (v) => {
        const on = v >= frac - 0.001;
        setLit(on);
        if (on) setReached(true);
    });
    useEffect(() => {
        const on = progress.get() >= frac - 0.001;
        setLit(on);
        if (on) setReached(true);
    }, [progress, frac]);
    return [lit, reached];
}

// Fractions along the track where each node sits, kept up to date on resize.
function useNodeFracs(trackRef, nodeRefs, horizontal, deps = []) {
    const [fracs, setFracs] = useState([0, 0.4, 0.7]);
    useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const measure = () => {
            const t = track.getBoundingClientRect();
            const next = nodeRefs.current.map((n) => {
                if (!n) return 0;
                const r = n.getBoundingClientRect();
                const f = horizontal
                    ? (r.left + r.width / 2 - t.left) / t.width
                    : (r.top + r.height / 2 - t.top) / t.height;
                return Math.max(0, Math.min(1, Math.round(f * 1000) / 1000));
            });
            setFracs((prev) => (prev.join() === next.join() ? prev : next));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(track);
        return () => ro.disconnect();
    }, [trackRef, nodeRefs, horizontal, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
    return fracs;
}

function DayCard({ b, i, reached, big = false, className = "" }) {
    return (
        <SpotlightCard glow="gradient" className={`overflow-hidden ${CARD} ${big ? "sm:p-9" : ""} ${className}`}>
            <span
                aria-hidden
                className={`display pointer-events-none absolute right-5 top-2 -z-10 select-none font-bold leading-none text-transparent ${big ? "text-[7.5rem]" : "text-[3.5rem] sm:text-[4.5rem]"}`}
                style={{ WebkitTextStroke: `1px ${b.tint}40` }}
            >
                {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: b.tint, boxShadow: `0 0 10px ${b.tint}` }} />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">{b.when}</span>
            </div>
            <h3 className={`display mt-4 font-semibold tracking-tight text-ink ${big ? "text-3xl xl:text-[2.1rem]" : "text-xl"}`}>{b.t}</h3>
            <Bullets items={b.items} play={reached} className={big ? "mt-6" : "mt-4"} />
        </SpotlightCard>
    );
}

// The drawn line: a crisp gradient hairline, a blurred copy for glow, a bright tip.
function GlowLine({ progress, horizontal, length }) {
    const tipX = useTransform(progress, (v) => v * length);
    return (
        <>
            <Motion.div
                className={`absolute inset-0 ${horizontal ? "origin-left" : "origin-top"}`}
                style={{ background: horizontal ? GRADIENT : GRADIENT.replace("90deg", "180deg"), ...(horizontal ? { scaleX: progress } : { scaleY: progress }) }}
            />
            <Motion.div
                className={`absolute ${horizontal ? "-inset-y-[3px] inset-x-0 origin-left" : "-inset-x-[3px] inset-y-0 origin-top"} opacity-70 blur-[6px]`}
                style={{ background: horizontal ? GRADIENT : GRADIENT.replace("90deg", "180deg"), ...(horizontal ? { scaleX: progress } : { scaleY: progress }) }}
            />
            {horizontal && length > 0 && (
                <Motion.span
                    className="absolute -top-[4px] left-0 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-white"
                    style={{ x: tipX, boxShadow: `0 0 0 2px ${C.violet}66, 0 0 18px 4px ${C.accent}` }}
                />
            )}
        </>
    );
}

// Mobile / tablet / reduced motion: the blocks stack (or sit in a row on lg),
// and a line draws down (or across) them as you scroll.
function DayStatic({ horizontal }) {
    const reduce = useReducedMotion();
    const trackRef = useRef(null);
    const nodeRefs = useRef([]);
    const fracs = useNodeFracs(trackRef, nodeRefs, horizontal);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: horizontal ? ["start 85%", "end 50%"] : ["start 72%", "end 72%"],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });
    const full = useMotionValue(1);
    const progress = reduce ? full : smooth;

    const trackCls = horizontal
        ? "left-[32px] right-0 top-[7px] h-px"
        : "left-[7px] top-[33px] bottom-0 w-px sm:top-[37px]";

    return (
        <div className="container-page">
            <Kicker>The day</Kicker>
            <Stagger className="relative mt-7 grid gap-4 lg:grid-cols-[1fr_0.7fr_1fr]" amount={0.1}>
                <div ref={trackRef} aria-hidden className={`pointer-events-none absolute bg-ink/10 ${trackCls}`}>
                    <GlowLine progress={progress} horizontal={horizontal} length={0} />
                </div>
                {DAY.map((b, i) => (
                    <StaticBlock key={b.t} b={b} i={i} progress={progress} frac={fracs[i]} nodeRef={(el) => { nodeRefs.current[i] = el; }} />
                ))}
            </Stagger>
        </div>
    );
}

function StaticBlock({ b, i, progress, frac, nodeRef }) {
    const [lit, reached] = useLit(progress, frac);
    return (
        <Item className="relative h-full pl-9 lg:pl-0">
            <div className="absolute left-0 top-[26px] sm:top-[30px] lg:static lg:mb-6 lg:ml-[24.5px] lg:w-[15px]">
                <Node lit={lit} tint={b.tint} nodeRef={nodeRef} />
            </div>
            <DayCard b={b} i={i} reached={reached} className="h-full lg:h-[calc(100%-39px)]" />
        </Item>
    );
}

/* Desktop: the section pins, and vertical scroll slides the three blocks
 * sideways while a glowing line draws through them and each node ignites. */
function DayPinned() {
    const outerRef = useRef(null);
    const stripRef = useRef(null);
    const trackRef = useRef(null);
    const nodeRefs = useRef([]);
    const [travel, setTravel] = useState(0);
    const [lineW, setLineW] = useState(0);

    useLayoutEffect(() => {
        const strip = stripRef.current;
        const track = trackRef.current;
        if (!strip || !track) return;
        const measure = () => {
            setTravel(Math.max(0, strip.scrollWidth - document.documentElement.clientWidth));
            setLineW(track.offsetWidth);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(strip);
        ro.observe(document.documentElement);
        return () => ro.disconnect();
    }, []);
    const fracs = useNodeFracs(trackRef, nodeRefs, true, [lineW]);

    const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
    const p = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0002 });
    const x = useTransform(p, [0.1, 0.9], [0, -travel]);
    const line = useTransform(p, [0.02, 0.86], [0, 1]);
    const bar = useTransform(p, [0.1, 0.9], [0, 1]);

    const [active, setActive] = useState(0);
    useMotionValueEvent(line, "change", (v) => {
        let a = 0;
        fracs.forEach((f, i) => { if (v >= f - 0.001) a = i; });
        setActive(a);
    });

    return (
        <div ref={outerRef} className="relative -mb-24 -mt-40" style={{ height: `calc(130vh + ${Math.round(travel * 1.35)}px)` }}>
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
                <div className="container-page flex items-end justify-between">
                    <Kicker>The day</Kicker>
                    <div aria-hidden className="flex items-center gap-4 font-mono text-[12px] font-semibold tabular-nums text-faint">
                        <span className="relative inline-block h-[1.2em] w-[2ch] overflow-hidden text-ink">
                            {DAY.map((_, i) => (
                                <Motion.span
                                    key={i}
                                    className="absolute inset-0"
                                    initial={false}
                                    animate={{ y: `${(i - active) * 110}%`, opacity: i === active ? 1 : 0 }}
                                    transition={{ duration: 0.6, ease: EASE.out }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </Motion.span>
                            ))}
                        </span>
                        <span className="relative h-px w-24 bg-ink/10">
                            <Motion.span className="absolute inset-0 origin-left" style={{ background: GRADIENT, scaleX: bar }} />
                        </span>
                        <span>{String(DAY.length).padStart(2, "0")}</span>
                    </div>
                </div>

                <Motion.div
                    ref={stripRef}
                    className="mt-10 flex w-max pl-[max(2rem,calc((100vw-72rem)/2+2rem))] pr-[max(2rem,calc((100vw-72rem)/2+2rem))]"
                    style={{ x }}
                >
                    <div className="relative flex gap-8">
                        <div ref={trackRef} aria-hidden className="pointer-events-none absolute left-[32px] right-0 top-[7px] h-px bg-ink/10">
                            <GlowLine progress={line} horizontal length={lineW} />
                        </div>
                        {DAY.map((b, i) => (
                            <PinnedBlock
                                key={b.t}
                                b={b}
                                i={i}
                                progress={line}
                                frac={fracs[i]}
                                nodeRef={(el) => { nodeRefs.current[i] = el; }}
                            />
                        ))}
                    </div>
                </Motion.div>
            </div>
        </div>
    );
}

function PinnedBlock({ b, i, progress, frac, nodeRef }) {
    const [lit, reached] = useLit(progress, frac);
    return (
        <div className={`flex flex-col ${b.wide ? "w-[min(36rem,44vw)]" : "w-[min(24rem,30vw)]"}`}>
            <div className="mb-8 ml-[32.5px]">
                <Node lit={lit} tint={b.tint} nodeRef={nodeRef} />
            </div>
            <Motion.div
                className="flex-1"
                initial={false}
                animate={{ opacity: lit ? 1 : 0.4, scale: lit ? 1 : 0.96, y: lit ? 0 : 12 }}
                transition={{ duration: 0.9, ease: EASE.out }}
            >
                <DayCard b={b} i={i} reached={reached} big className="h-full" />
            </Motion.div>
        </div>
    );
}

function SummitDay() {
    const desktop = useMediaQuery(DESKTOP);
    const reduce = useReducedMotion();
    if (desktop && !reduce) return <DayPinned />;
    return <div className="py-16"><DayStatic key={desktop ? "h" : "v"} horizontal={desktop} /></div>;
}

export default function Summit() {
    return (
        <>
            {/* Key facts: cells hold the hairline grid; their contents decode in sequence. */}
            <div className="container-page">
                <Stagger each={0.09} className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-[1.4fr_1.15fr_1.15fr_0.9fr_1fr]">
                    {FACTS.map((f, i) => (
                        <div key={f.k} className={`bg-white p-5 sm:p-6 ${f.wide ? "col-span-2 lg:col-span-1" : ""}`}>
                            <Item>
                                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">{f.k}</p>
                                <DecodeText
                                    text={f.v}
                                    delay={0.15 + i * 0.12}
                                    duration={0.9 + f.v.length * 0.012}
                                    className="display mt-2 text-base font-semibold leading-snug tracking-tight text-ink sm:text-[17px]"
                                />
                            </Item>
                        </div>
                    ))}
                </Stagger>
            </div>

            <SummitDay />

            <div className="container-page">
                {/* Safety and money */}
                <Kicker>Safety and money</Kicker>
                <Stagger each={0.1} amount={0.15} className="mt-7 grid gap-4 md:grid-cols-2">
                    <Item className="h-full">
                        <SpotlightCard glow="gradient" className={`h-full ${CARD}`}>
                            <h3 className="display text-xl font-semibold text-ink">Student safety</h3>
                            <Bullets items={SAFETY} />
                            <p className="mt-5 text-[15px] leading-relaxed text-muted">
                                Students use a short, fixed list of browser tools, submitted for review with each participating school:
                            </p>
                            <Stagger each={0.06} delay={0.1} amount={0.5} className="mt-3 flex flex-wrap gap-2">
                                {TOOLS.map((t) => (
                                    <Item as="span" key={t} variants={POP} className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-ink/80">{t}</Item>
                                ))}
                            </Stagger>
                        </SpotlightCard>
                    </Item>
                    <Item className="h-full">
                        <SpotlightCard glow="gradient" className={`flex h-full flex-col ${CARD}`}>
                            <h3 className="display text-xl font-semibold text-ink">Money</h3>
                            <p className="mt-4 text-[15px] leading-relaxed text-muted">
                                All sponsorship goes to <span className="font-medium text-ink">The Hack Foundation (Hack Club)</span>, a 501(c)(3)
                                nonprofit and our fiscal sponsor. It holds the funds and pays for lunch, printing, and prizes directly, with a
                                receipt for every expense.
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-muted">Students pay nothing, and no student handles money.</p>
                            <p className="mt-5 font-mono text-[12px] text-faint">EIN 81-2908499</p>
                        </SpotlightCard>
                    </Item>
                </Stagger>

                {/* What comes after */}
                <Stagger each={0.12} className="relative mt-16 flex flex-col gap-8 pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    <Item variants={DRAW_X} aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
                    <Item as="p" variants={RISE} className="max-w-2xl text-lg leading-relaxed text-muted">
                        <span className="font-medium text-ink">The summit is one day. The course is the durable part.</span>{" "}
                        We've taught the 4-week version at LACES and built a 12-week version, and our goal is for them to become the
                        foundation of a standing LAUSD AI literacy elective.
                    </Item>
                    <Item className="flex shrink-0 flex-col gap-3 sm:flex-row">
                        <a href="#involved" className="btn-accent">How you can help</a>
                        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("LA Student AI Summit")}`} className="btn-ghost">Email us</a>
                    </Item>
                </Stagger>
            </div>
        </>
    );
}
