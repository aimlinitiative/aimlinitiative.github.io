import { useId, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { DUR, EASE, SPRING } from "../lib/motion";
import { mailto } from "../content/site";
import { Item, Stagger } from "../components/fx/Stagger";

const ASKS = [
    {
        t: "A venue for the summit",
        chip: "Most needed",
        d: "One Saturday, 8am to 8pm, with room for at least 200 students plus mentors, tables and chairs, power, and Wi-Fi that holds a few hundred devices. It's our biggest open item, and it sets the date.",
        subject: "A venue for the LA Student AI Summit",
    },
    {
        t: "Speakers, judges, demos and mentors",
        d: "Give a twenty-minute talk on what you build, aimed at a 15-year-old. Judge pitches for an hour. Bring a hands-on demo, hardware especially. Or mentor a table for an afternoon. Each takes half a day or less.",
        subject: "Speaking, judging or mentoring at the summit",
    },
    {
        t: "Sponsors and funders",
        d: "Cash or in kind: hardware, platform credits, swag, or a prize track. Every dollar goes through our 501(c)(3) fiscal sponsor, with a receipt for every expense.",
        subject: "Sponsoring the LA Student AI Summit",
    },
    {
        t: "Schools and educators",
        d: "Bring students to the summit, or teach the free course in your classroom. We'll help you get set up.",
        subject: "Bringing students or teaching the course",
    },
    {
        t: "Introductions",
        d: "Venue operators, community and education giving teams, and anyone else who should be in the room. An introduction from you gets further than an email from us.",
        subject: "An introduction for AIML-LI",
    },
];

const PANEL = {
    closed: { height: 0, opacity: 0, transition: { ...SPRING.layout, opacity: { duration: DUR.fast, ease: EASE.out } } },
    open: { height: "auto", opacity: 1, transition: { ...SPRING.layout, opacity: { duration: DUR.base, ease: EASE.out, delay: 0.05 } } },
};

function Chevron({ open }) {
    return (
        <Motion.svg
            aria-hidden
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-ink2"
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={SPRING.ui}
        >
            <path d="m5 7.5 5 5 5-5" />
        </Motion.svg>
    );
}

function Ask({ a, open, onToggle }) {
    const id = useId();
    const btnId = `${id}-btn`;
    const panelId = `${id}-panel`;
    return (
        <Item as="li" className="border-b border-linestrong">
            <h3>
                <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={onToggle}
                    className="group flex min-h-[44px] w-full items-center justify-between gap-6 py-6 text-left"
                >
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="text-h4 text-ink transition-colors duration-base ease-out group-hover:text-accent">{a.t}</span>
                        {a.chip && (
                            <span className="rounded-pill bg-accent-soft px-2.5 py-0.5 text-caption font-medium text-accent">{a.chip}</span>
                        )}
                    </span>
                    <Chevron open={open} />
                </button>
            </h3>
            <AnimatePresence initial={false}>
                {open && (
                    <Motion.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        variants={PANEL}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden"
                    >
                        <div className="max-w-prose pb-7 pr-10">
                            <p className="text-base text-ink2">{a.d}</p>
                            <a href={mailto(a.subject)} className="link mt-4 inline-flex min-h-[44px] items-center text-sm font-medium">
                                Email us about this <span aria-hidden className="ml-1">→</span>
                            </a>
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </Item>
    );
}

export default function Involved() {
    const [open, setOpen] = useState(0);
    return (
        <section id="involved" aria-labelledby="involved-title" className="bg-surface py-22 md:py-30">
            <div className="container-page grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
                <div>
                    <Stagger className="md:sticky md:top-28">
                        <Item as="h2" id="involved-title" className="text-h2 text-ink">
                            What we need right now
                        </Item>
                        <Item as="p" className="mt-4 max-w-md text-lead text-ink2">
                            Five things would help most, starting with a place to hold the summit.
                        </Item>
                    </Stagger>
                </div>
                <Stagger as="ul" each={0.06} className="border-t border-linestrong">
                    {ASKS.map((a, i) => (
                        <Ask key={a.t} a={a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
