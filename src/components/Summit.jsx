import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion as Motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { EASE, stagger } from "../lib/motion";
import SpotlightCard from "./fx/SpotlightCard";
import { Item, Stagger } from "./fx/Stagger";
import { DRAW_X, POP, RISE, STILL } from "./fx/variants";
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
        tint: "#22508F",
        items: [
            "Keynotes from Google DeepMind, Microsoft, Google, and Snap",
            "A careers panel",
            "Live demos, including physical AI",
        ],
    },
    {
        when: "Midday",
        t: "Lunch",
        tint: "#5A8DD6",
        items: ["Free for students", "Partner tables around the room"],
    },
    {
        when: "Afternoon · 3 hours",
        t: "Hackathon",
        tint: "#2C63B0",
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

function Kicker({ children }) {
    return <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-faint">{children}</p>;
}

// Bullet rows. `play` hands control to a parent (e.g. the timeline); without it
// the list staggers in on its own when scrolled into view.
function Bullets({ items, play }) {
    const reduce = useReducedMotion();
    const trigger = play === undefined
        ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } }
        : { initial: "hidden", animate: play ? "show" : "hidden" };
    return (
        <Motion.ul className="mt-4 space-y-2.5" variants={stagger(0.09, 0.05)} {...trigger}>
            {items.map((it) => (
                <Motion.li key={it} variants={reduce ? STILL : BULLET} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <Motion.span variants={reduce ? STILL : TICK} className="mt-[0.8em] h-px w-3 shrink-0 origin-left bg-ink/30" />
                    <span>{it}</span>
                </Motion.li>
            ))}
        </Motion.ul>
    );
}

const BULLET = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE.out }, transitionEnd: { filter: "none" } },
};
const TICK = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.8, ease: EASE.out, delay: 0.1 } },
};

/* ---------- The day: a timeline drawn by scroll ---------- */

// A node on the timeline. It lights (ring fills with the block's tint, soft
// halo, one quiet ping) when the drawn line reaches it.
function Node({ lit, tint, nodeRef }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.6, ease: EASE.out };
    return (
        <span ref={nodeRef} aria-hidden className="relative block h-[15px] w-[15px]">
            <Motion.span
                className="absolute -inset-[5px] rounded-full"
                style={{ backgroundColor: tint }}
                initial={false}
                animate={{ opacity: lit ? 0.14 : 0, scale: lit ? 1 : 0.4 }}
                transition={t}
            />
            {!reduce && (
                <Motion.span
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: tint }}
                    initial={false}
                    animate={lit ? { opacity: [0.6, 0], scale: [1, 2.6] } : { opacity: 0, scale: 1 }}
                    transition={{ duration: 1.2, ease: EASE.out }}
                />
            )}
            <span className="absolute inset-0 rounded-full border border-ink/15 bg-white" />
            <Motion.span
                className="absolute inset-[3px] rounded-full"
                style={{ backgroundColor: tint }}
                initial={false}
                animate={{ scale: lit ? 1 : 0, opacity: lit ? 1 : 0 }}
                transition={t}
            />
        </span>
    );
}

function DayBlock({ b, progress, frac, nodeRef }) {
    const [lit, setLit] = useState(false);
    const [reached, setReached] = useState(false);
    useMotionValueEvent(progress, "change", (v) => {
        const on = v >= frac - 0.001;
        setLit(on);
        if (on) setReached(true);
    });
    // Sync on mount and whenever the node moves (reduced motion starts at 1).
    useEffect(() => {
        const on = progress.get() >= frac - 0.001;
        setLit(on);
        if (on) setReached(true);
    }, [progress, frac]);

    return (
        <Item className="relative h-full pl-9 lg:pl-0">
            <div className="absolute left-0 top-[26px] lg:static lg:mb-6 lg:ml-[24.5px] lg:w-[15px] sm:top-[30px]">
                <Node lit={lit} tint={b.tint} nodeRef={nodeRef} />
            </div>
            <SpotlightCard className={`h-full lg:h-[calc(100%-39px)] ${CARD}`}>
                <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: b.tint }} />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">{b.when}</span>
                </div>
                <h3 className="display mt-4 text-xl font-semibold text-ink">{b.t}</h3>
                <Bullets items={b.items} play={reached} />
            </SpotlightCard>
        </Item>
    );
}

// Horizontal on desktop, vertical on mobile; remounted when that flips so the
// scroll offsets and measurements start clean.
function Timeline({ horizontal }) {
    const reduce = useReducedMotion();
    const trackRef = useRef(null);
    const nodeRefs = useRef([]);
    const [fracs, setFracs] = useState([0, 0.4, 0.7]);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: horizontal ? ["start 85%", "end 50%"] : ["start 72%", "end 72%"],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });
    const full = useMotionValue(1);
    const progress = reduce ? full : smooth;

    // Where each node sits along the track, as a 0-1 fraction.
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
    }, [horizontal]);

    const trackCls = horizontal
        ? "left-[32px] right-0 top-[7px] h-px"
        : "left-[7px] top-[33px] bottom-0 w-px sm:top-[37px]";

    return (
        <Stagger className="relative mt-7 grid gap-4 lg:grid-cols-[1fr_0.7fr_1fr]" amount={0.1}>
            <div ref={trackRef} aria-hidden className={`pointer-events-none absolute bg-ink/10 ${trackCls}`}>
                <Motion.div
                    className={`absolute inset-0 ${horizontal ? "origin-left bg-gradient-to-r" : "origin-top bg-gradient-to-b"} from-[#1B3F73] via-accent to-[#5A8DD6]`}
                    style={horizontal ? { scaleX: progress } : { scaleY: progress }}
                />
            </div>
            {DAY.map((b, i) => (
                <DayBlock
                    key={b.t}
                    b={b}
                    progress={progress}
                    frac={fracs[i]}
                    nodeRef={(el) => { nodeRefs.current[i] = el; }}
                />
            ))}
        </Stagger>
    );
}

export default function Summit() {
    const horizontal = useMediaQuery(DESKTOP);
    return (
        <>
            {/* Key facts: the cells stay put (they form the hairline grid); their
                contents rise in sequence. */}
            <Stagger each={0.09} className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-[1.4fr_1.15fr_1.15fr_0.9fr_1fr]">
                {FACTS.map((f) => (
                    <div key={f.k} className={`bg-white p-5 sm:p-6 ${f.wide ? "col-span-2 lg:col-span-1" : ""}`}>
                        <Item>
                            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">{f.k}</p>
                            <p className="display mt-2 text-base font-semibold leading-snug tracking-tight text-ink sm:text-[17px]">{f.v}</p>
                        </Item>
                    </div>
                ))}
            </Stagger>

            {/* The day */}
            <div className="mt-16">
                <Kicker>The day</Kicker>
                <Timeline key={horizontal ? "h" : "v"} horizontal={horizontal} />
            </div>

            {/* Safety and money */}
            <div className="mt-16">
                <Kicker>Safety and money</Kicker>
                <Stagger each={0.1} amount={0.15} className="mt-7 grid gap-4 md:grid-cols-2">
                    <Item className="h-full">
                        <SpotlightCard className={`h-full ${CARD}`}>
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
                        <SpotlightCard className={`flex h-full flex-col ${CARD}`}>
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
            </div>

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
        </>
    );
}
