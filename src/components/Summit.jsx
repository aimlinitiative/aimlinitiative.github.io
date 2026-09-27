import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    motion as Motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform,
} from "motion/react";
import { EASE, stagger } from "../lib/motion";
import DecodeText from "./fx/DecodeText";
import { Item, Stagger } from "./fx/Stagger";
import { DRAW_X, POP, RISE, STILL } from "./fx/variants";
import useMediaQuery, { DESKTOP } from "./fx/useMediaQuery";

const EMAIL = "aimlinitiative@gmail.com";

/* The LA Student AI Summit and Hackathon: key facts, how the day runs, and how
 * safety and money work. Wording follows the partner brief (14 Sept 2026), so
 * update it here once the date and venue are set. Looks follow DESIGN.md:
 * parchment panels on the canvas ground, one accent for the timeline. */

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
        items: ["Free for students", "Partner tables around the room"],
    },
    {
        when: "Afternoon · 3 hours",
        t: "Hackathon",
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

// The day pins only where it fits: desktop width and enough height for the cards.
const TALL = "(min-height: 600px)";
// Space between the key facts and "The day" (and between the day and what follows) on desktop.
const GAP = 128;

const pad2 = (n) => String(n).padStart(2, "0");

function Kicker({ children, className = "" }) {
    return <p className={`eyebrow ${className}`}>{children}</p>;
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
function Bullets({ items, play, className = "mt-6" }) {
    const reduce = useReducedMotion();
    const trigger = play === undefined
        ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } }
        : { initial: "hidden", animate: play ? "show" : "hidden" };
    return (
        <Motion.ul className={`space-y-2.5 ${className}`} variants={stagger(0.09, 0.05)} {...trigger}>
            {items.map((it) => (
                <Motion.li key={it} variants={reduce ? STILL : BULLET} className="flex gap-3 text-body-sm text-muted">
                    <Motion.span variants={reduce ? STILL : TICK} className="mt-[0.75em] h-px w-3 shrink-0 origin-left bg-ink/25" />
                    <span className="text-pretty">{it}</span>
                </Motion.li>
            ))}
        </Motion.ul>
    );
}

/* ---------- The day ---------- */

// A timeline node: a hollow dot that fills with the accent (and sends out one
// thin ring) when the line reaches it.
function Node({ lit, nodeRef }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.6, ease: EASE.out };
    return (
        <span ref={nodeRef} aria-hidden className="relative block h-[13px] w-[13px]">
            {!reduce && (
                <Motion.span
                    className="absolute inset-0 rounded-full border border-accent"
                    initial={false}
                    animate={lit ? { opacity: [0.6, 0], scale: [1, 2.6] } : { opacity: 0, scale: 1 }}
                    transition={{ duration: 1.2, ease: EASE.out }}
                />
            )}
            <span className="absolute inset-0 rounded-full border border-linestrong bg-canvas" />
            <Motion.span
                className="absolute inset-0 rounded-full border border-accent"
                initial={false}
                animate={{ opacity: lit ? 1 : 0 }}
                transition={t}
            />
            <Motion.span
                className="absolute inset-[3px] rounded-full bg-accent"
                initial={false}
                animate={{ scale: lit ? 1 : 0 }}
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

// Layout offset of `el` inside `root`. Offsets ignore transforms, so the
// entrance animations can't skew the measurement.
function offsetIn(el, root) {
    let x = 0;
    let y = 0;
    for (let n = el; n && n !== root; n = n.offsetParent) {
        x += n.offsetLeft;
        y += n.offsetTop;
    }
    return { x, y };
}

// The track's length and where each node sits along it (0-1), kept up to date on resize.
function useTrack(trackRef, nodeRefs, horizontal, size) {
    const [track, setTrack] = useState({ fracs: [0, 0.4, 0.7], length: 0 });
    useLayoutEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const measure = () => {
            const root = el.offsetParent;
            const length = horizontal ? el.offsetWidth : el.offsetHeight;
            const start = horizontal ? el.offsetLeft : el.offsetTop;
            const fracs = nodeRefs.current.map((n) => {
                if (!n || !length) return 0;
                const o = offsetIn(n, root);
                const mid = horizontal ? o.x + n.offsetWidth / 2 : o.y + n.offsetHeight / 2;
                return Math.max(0, Math.min(1, Math.round(((mid - start) / length) * 1000) / 1000));
            });
            setTrack((prev) => (prev.length === length && prev.fracs.join() === fracs.join() ? prev : { fracs, length }));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [trackRef, nodeRefs, horizontal, size]);
    return track;
}

function DayCard({ b, i, reached, className = "" }) {
    return (
        <div className={`card-muted ${className}`}>
            <div className="flex items-center justify-between gap-4">
                <Kicker>{b.when}</Kicker>
                <span aria-hidden className="font-mono text-[12px] font-medium leading-none tabular-nums text-faint">{pad2(i + 1)}</span>
            </div>
            <h3 className="display mt-5 text-balance text-display-md text-ink">{b.t}</h3>
            <Bullets items={b.items} play={reached} />
        </div>
    );
}

// The drawn line: a solid accent hairline with a small accent tip riding its end.
function Line({ progress, horizontal, length }) {
    const tip = useTransform(progress, (v) => v * length);
    return (
        <>
            <Motion.div
                className={`absolute inset-0 bg-accent ${horizontal ? "origin-left" : "origin-top"}`}
                style={horizontal ? { scaleX: progress } : { scaleY: progress }}
            />
            {length > 0 && (
                <Motion.span
                    className={`absolute h-[7px] w-[7px] rounded-full bg-accent ring-[3px] ring-canvas ${horizontal ? "-left-[3.5px] -top-[3px]" : "-left-[3px] -top-[3.5px]"}`}
                    style={horizontal ? { x: tip } : { y: tip }}
                />
            )}
        </>
    );
}

// Mobile / tablet / reduced motion: the blocks stack (or sit in a row on lg),
// and the line draws down (or across) them as you scroll.
function DayStatic({ horizontal }) {
    const reduce = useReducedMotion();
    const trackRef = useRef(null);
    const nodeRefs = useRef([]);
    const { fracs, length } = useTrack(trackRef, nodeRefs, horizontal);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: horizontal ? ["start 85%", "end 50%"] : ["start 72%", "end 72%"],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });
    const full = useMotionValue(1);
    const progress = reduce ? full : smooth;

    // The track starts at the first node's center (see Node and StaticBlock).
    const trackCls = horizontal
        ? "left-[38.5px] right-0 top-[6px] h-px"
        : "bottom-0 left-[6px] top-[30px] w-px sm:top-[38px]";

    return (
        <div className="container-page mt-24 lg:mt-32">
            <Kicker>The day</Kicker>
            <Stagger className="relative mt-8 grid gap-4 lg:grid-cols-[1fr_0.7fr_1fr]" amount={0.1}>
                <div ref={trackRef} aria-hidden className={`pointer-events-none absolute bg-line ${trackCls}`}>
                    <Line progress={progress} horizontal={horizontal} length={reduce ? 0 : length} />
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
        <Item className="relative h-full pl-8 lg:pl-0">
            {/* The node lines up with the card's kicker (card padding + half the kicker). */}
            <div className="absolute left-0 top-[23.5px] sm:top-[31.5px] lg:static lg:mb-8 lg:ml-8 lg:w-[13px]">
                <Node lit={lit} nodeRef={nodeRef} />
            </div>
            <DayCard b={b} i={i} reached={reached} className="h-full lg:h-[calc(100%-45px)]" />
        </Item>
    );
}

// "01 —— 03": which block the line has reached, with a bar for the whole run.
function Counter({ active, bar }) {
    return (
        <div aria-hidden className="flex items-center gap-4 font-mono text-[12px] font-medium leading-none tabular-nums text-faint">
            <span className="relative inline-block h-[1.2em] w-[2ch] overflow-hidden text-ink">
                {DAY.map((_, i) => (
                    <Motion.span
                        key={i}
                        className="absolute inset-0 flex items-center"
                        initial={false}
                        animate={{ y: `${(i - active) * 110}%`, opacity: i === active ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: EASE.out }}
                    >
                        {pad2(i + 1)}
                    </Motion.span>
                ))}
            </span>
            <span className="relative h-px w-24 bg-line">
                <Motion.span className="absolute inset-0 origin-left bg-accent" style={{ scaleX: bar }} />
            </span>
            <span>{pad2(DAY.length)}</span>
        </div>
    );
}

/* Desktop: the day pins, and vertical scroll slides the three blocks sideways
 * while the accent line draws through them and each node fills. The pinned
 * layer is a full screen tall with its content centered, so its margins are
 * measured to keep a GAP-sized space to the blocks around it. */
function DayPinned() {
    const outerRef = useRef(null);
    const stickyRef = useRef(null);
    const contentRef = useRef(null);
    const stripRef = useRef(null);
    const trackRef = useRef(null);
    const nodeRefs = useRef([]);
    const [box, setBox] = useState({ travel: 0, lineW: 0, above: 0, below: 0 });

    useLayoutEffect(() => {
        const strip = stripRef.current;
        const track = trackRef.current;
        const sticky = stickyRef.current;
        const content = contentRef.current;
        if (!strip || !track || !sticky || !content) return;
        const measure = () => {
            const next = {
                travel: Math.max(0, strip.scrollWidth - document.documentElement.clientWidth),
                lineW: track.offsetWidth,
                above: content.offsetTop,
                below: Math.max(0, sticky.clientHeight - content.offsetTop - content.offsetHeight),
            };
            setBox((prev) => (Object.keys(next).every((k) => prev[k] === next[k]) ? prev : next));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(strip);
        ro.observe(content);
        ro.observe(document.documentElement);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);
    const { fracs } = useTrack(trackRef, nodeRefs, true, box.lineW);

    const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
    const p = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0002 });
    const x = useTransform(p, [0.1, 0.9], [0, -box.travel]);
    const line = useTransform(p, [0.02, 0.86], [0, 1]);
    const bar = useTransform(p, [0.1, 0.9], [0, 1]);

    const [active, setActive] = useState(0);
    useMotionValueEvent(line, "change", (v) => {
        let a = 0;
        fracs.forEach((f, i) => { if (v >= f - 0.001) a = i; });
        setActive(a);
    });

    return (
        // Transparent to the pointer: its margins overlap the blocks around it.
        <div
            ref={outerRef}
            className="pointer-events-none relative"
            style={{
                height: `calc(130vh + ${Math.round(box.travel * 1.35)}px)`,
                marginTop: GAP - box.above,
                marginBottom: -box.below,
            }}
        >
            <div ref={stickyRef} className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
                <div ref={contentRef} className="pointer-events-auto">
                    <div className="container-page flex items-center justify-between">
                        <Kicker>The day</Kicker>
                        <Counter active={active} bar={bar} />
                    </div>

                    {/* Side padding lines the first and last card up with the page container. */}
                    <Motion.div
                        ref={stripRef}
                        className="mt-10 flex w-max px-[max(2.5rem,calc((100%-75rem)/2+2.5rem))]"
                        style={{ x }}
                    >
                        <div className="relative flex gap-8">
                            <div ref={trackRef} aria-hidden className="pointer-events-none absolute left-[38.5px] right-0 top-[6px] h-px bg-line">
                                <Line progress={line} horizontal length={box.lineW} />
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
        </div>
    );
}

function PinnedBlock({ b, i, progress, frac, nodeRef }) {
    const [lit, reached] = useLit(progress, frac);
    return (
        <div className={`flex flex-col ${b.wide ? "w-[min(36rem,44vw)]" : "w-[min(24rem,30vw)]"}`}>
            <div className="mb-8 ml-8">
                <Node lit={lit} nodeRef={nodeRef} />
            </div>
            <Motion.div
                className="flex-1"
                initial={false}
                animate={{ opacity: lit ? 1 : 0.45, scale: lit ? 1 : 0.97, y: lit ? 0 : 10 }}
                transition={{ duration: 0.9, ease: EASE.out }}
            >
                <DayCard b={b} i={i} reached={reached} className="h-full" />
            </Motion.div>
        </div>
    );
}

function SummitDay() {
    const desktop = useMediaQuery(DESKTOP);
    const tall = useMediaQuery(TALL);
    const reduce = useReducedMotion();
    if (desktop && tall && !reduce) return <DayPinned />;
    return <DayStatic key={desktop ? "h" : "v"} horizontal={desktop} />;
}

export default function Summit() {
    return (
        <>
            {/* Key facts: one parchment spec panel with hairline dividers (the grid's
                -1px margin tucks the outer cell borders under the panel's own border).
                Values decode in sequence. */}
            <div className="container-page mt-16 lg:mt-24">
                <div className="overflow-hidden rounded-card border border-line bg-parchment">
                    <Stagger as="dl" each={0.06} className="-m-px grid sm:grid-cols-2 lg:grid-cols-3">
                        {FACTS.map((f, i) => (
                            <div key={f.k} className={`border-l border-t border-line p-6 sm:p-8 ${f.wide ? "sm:col-span-2" : ""}`}>
                                <Item as="dt" className="eyebrow">{f.k}</Item>
                                <Item as="dd" className="mt-3">
                                    <DecodeText
                                        text={f.v}
                                        delay={0.2 + i * 0.1}
                                        duration={0.9 + f.v.length * 0.012}
                                        className="display text-title text-ink"
                                    />
                                </Item>
                            </div>
                        ))}
                    </Stagger>
                </div>
            </div>

            <SummitDay />

            <div className="container-page mt-24 lg:mt-32">
                {/* Safety and money */}
                <Kicker>Safety and money</Kicker>
                <Stagger each={0.1} amount={0.15} className="mt-8 grid gap-4 md:grid-cols-2">
                    <Item className="h-full">
                        <div className="card-muted h-full">
                            <h3 className="display text-display-md text-ink">Student safety</h3>
                            <Bullets items={SAFETY} />
                            <p className="mt-6 text-pretty text-body-sm text-muted">
                                Students use a short, fixed list of browser tools, submitted for review with each participating school:
                            </p>
                            <Stagger as="ul" each={0.06} delay={0.1} amount={0.5} className="mt-4 flex flex-wrap gap-2">
                                {TOOLS.map((t) => (
                                    <Item as="li" key={t} variants={POP} className="rounded-full border border-line bg-canvas px-3 py-1.5 text-caption text-ink">
                                        {t}
                                    </Item>
                                ))}
                            </Stagger>
                        </div>
                    </Item>
                    <Item className="h-full">
                        <div className="card-muted flex h-full flex-col">
                            <h3 className="display text-display-md text-ink">Money</h3>
                            <p className="mt-6 text-pretty text-body-sm text-muted">
                                All sponsorship goes to <span className="font-medium text-ink">The Hack Foundation (Hack Club)</span>, a{" "}
                                <span className="whitespace-nowrap">501(c)(3)</span> nonprofit and our fiscal sponsor. It holds the funds and
                                pays for lunch, printing, and prizes directly, with a receipt for every expense.
                            </p>
                            <p className="mt-3 text-pretty text-body-sm text-muted">Students pay nothing, and no student handles money.</p>
                            {/* The EIN as a spec row, pinned to the card's foot. */}
                            <div className="mt-auto pt-8">
                                <p className="flex items-baseline justify-between gap-4 border-t border-line pt-5">
                                    <span className="eyebrow">EIN</span>{" "}
                                    <span className="font-mono text-[13px] tabular-nums tracking-[0.02em] text-ink">81-2908499</span>
                                </p>
                            </div>
                        </div>
                    </Item>
                </Stagger>

                {/* What comes after */}
                <Stagger each={0.12} className="relative mt-20 flex flex-col gap-8 pt-10 lg:mt-24 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                    <Item variants={DRAW_X} aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
                    <Item as="p" variants={RISE} className="max-w-[44rem] text-pretty text-lead text-muted">
                        <span className="text-ink">The summit is one day. The course is the durable part.</span>{" "}
                        We've taught the <span className="whitespace-nowrap">4-week</span> version at LACES and built
                        a <span className="whitespace-nowrap">12-week</span> version, and our goal is for them to become the
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
