import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion as Motion, useInView, useReducedMotion } from "motion/react";
import UnitViz from "./viz/UnitViz";
import { DIST, DUR, EASE, SPRING } from "../lib/motion";

/* Unit explorer: a tab list of the six units and one panel showing the
 * selected unit with its diagram. Desktop: list left, panel right. Mobile: a
 * horizontal scroll-snap row of units above the panel. The selected tab is
 * marked by a shared-layout pill; the panel content swaps with a short fade
 * and slide, and the diagram draws itself in once per selection. */

const UNITS = [
    {
        weeks: "1–2", title: "Foundations", k: "data",
        line: "How machines learn from data.",
        fig: "A new point takes the label most of its three nearest neighbors share.",
    },
    {
        weeks: "3–4", title: "Building models", k: "classify",
        line: "Students build their first model that works.",
        fig: "The model learns where one group ends and the other begins.",
    },
    {
        weeks: "5–6", title: "Prediction & error", k: "fit",
        line: "Getting predictions right, and being honest about error.",
        fig: "The line is the prediction. The gaps are the error, and students learn to measure them.",
    },
    {
        weeks: "7–8", title: "Neural networks", k: "net",
        line: "Students build one from scratch, one piece at a time.",
        fig: "A small network. Training is watching the loss go down.",
    },
    {
        weeks: "9–10", title: "Language & bias", k: "tokens",
        line: "Where language models work, and where they break.",
        fig: "How much the word “sat” pays attention to each other word in the sentence.",
    },
    {
        weeks: "11–12", title: "Capstone", k: "ship",
        line: "Students build a project of their own.",
        fig: "Ten weeks of skills, then two weeks to build something that is theirs.",
    },
];

export default function Curriculum() {
    const [active, setActive] = useState(0);
    const tabs = useRef([]);
    const listRef = useRef(null);
    const panelRef = useRef(null);
    const reduce = useReducedMotion();
    const seen = useInView(panelRef, { once: true, amount: 0.35 });
    const id = useId();
    const n = UNITS.length;
    const u = UNITS[active];

    // Mobile: keep the selected chip in view inside the horizontal row (never scrolls the page).
    useEffect(() => {
        const list = listRef.current, tab = tabs.current[active];
        if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
        const pad = parseFloat(getComputedStyle(list).paddingLeft) || 0;
        list.scrollTo({ left: tab.offsetLeft - pad, behavior: reduce ? "auto" : "smooth" });
    }, [active, reduce]);

    const select = (i) => {
        const next = (i + n) % n;
        setActive(next);
        tabs.current[next]?.focus();
    };

    const onKey = (e) => {
        const keys = {
            ArrowDown: active + 1, ArrowRight: active + 1,
            ArrowUp: active - 1, ArrowLeft: active - 1,
            Home: 0, End: n - 1,
        };
        if (!(e.key in keys)) return;
        e.preventDefault();
        select(keys[e.key]);
    };

    return (
        <div className="grid gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] md:gap-8 lg:gap-12">
            <div
                ref={listRef}
                role="tablist"
                aria-label="Curriculum units"
                aria-orientation="vertical"
                onKeyDown={onKey}
                className="relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-1.5 overflow-x-auto px-5 py-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0 md:py-0 [&::-webkit-scrollbar]:hidden"
            >
                {UNITS.map((x, i) => {
                    const on = i === active;
                    return (
                        <Motion.button
                            key={x.k}
                            ref={(el) => { tabs.current[i] = el; }}
                            type="button"
                            role="tab"
                            id={`${id}-tab-${i}`}
                            aria-selected={on}
                            aria-controls={`${id}-panel`}
                            tabIndex={on ? 0 : -1}
                            onClick={() => setActive(i)}
                            whileTap={{ scale: DIST.press }}
                            transition={SPRING.press}
                            className={`relative flex min-h-[44px] shrink-0 snap-start flex-col items-start justify-center rounded-lg md:w-full md:justify-start px-4 py-2.5 text-left transition-colors duration-base md:flex-row md:items-baseline md:gap-4 md:px-5 md:py-4 ${on ? "" : "hover:bg-card/60"}`}
                        >
                            {on && (
                                <Motion.span
                                    layoutId={`${id}-pill`}
                                    transition={SPRING.ui}
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-lg bg-card shadow-float"
                                />
                            )}
                            <span className="relative whitespace-nowrap text-caption text-ink3 tabular md:w-24 md:shrink-0 md:text-sm">
                                Weeks {x.weeks}
                            </span>
                            <span className="relative whitespace-nowrap text-sm font-medium text-ink md:text-base">{x.title}</span>
                        </Motion.button>
                    );
                })}
            </div>

            <div
                ref={panelRef}
                role="tabpanel"
                id={`${id}-panel`}
                aria-labelledby={`${id}-tab-${active}`}
                tabIndex={0}
                className="overflow-hidden rounded-xl bg-card p-5 sm:p-8 lg:p-10"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <Motion.div
                        key={active}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE.out } }}
                        exit={{ opacity: 0, y: -8, transition: { duration: DUR.fast, ease: EASE.in } }}
                    >
                        <p className="text-caption text-ink3 tabular">
                            Unit {active + 1} of {n} · Weeks {u.weeks}
                        </p>
                        <h3 className="mt-2 text-h4 md:text-h3">{u.title}</h3>
                        <p className="mt-2 max-w-prose text-base text-ink2 md:text-lead">{u.line}</p>
                        <figure className="mt-6 border-t border-line pt-6 md:mt-8 md:pt-8">
                            <div className="mx-auto max-w-[34rem]">
                                <UnitViz k={u.k} play={seen} />
                            </div>
                            <figcaption className="mt-4 text-sm text-ink3">{u.fig}</figcaption>
                        </figure>
                    </Motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
