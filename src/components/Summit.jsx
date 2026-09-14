import Reveal from "./Reveal";

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

function Kicker({ children }) {
    return <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-faint">{children}</p>;
}

function Bullets({ items }) {
    return (
        <ul className="mt-4 space-y-2.5">
            {items.map((it) => (
                <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span className="mt-[0.8em] h-px w-3 shrink-0 bg-ink/30" />
                    <span>{it}</span>
                </li>
            ))}
        </ul>
    );
}

export default function Summit() {
    return (
        <>
            {/* Key facts */}
            <Reveal className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-[1.4fr_1.15fr_1.15fr_0.9fr_1fr]">
                {FACTS.map((f) => (
                    <div key={f.k} className={`bg-white p-5 sm:p-6 ${f.wide ? "col-span-2 lg:col-span-1" : ""}`}>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">{f.k}</p>
                        <p className="display mt-2 text-base font-semibold leading-snug tracking-tight text-ink sm:text-[17px]">{f.v}</p>
                    </div>
                ))}
            </Reveal>

            {/* The day */}
            <div className="mt-16">
                <Kicker>The day</Kicker>
                <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_0.7fr_1fr]">
                    {DAY.map((b, i) => (
                        <Reveal key={b.t} delay={i * 80} className="h-full">
                            <div className="h-full rounded-2xl border border-line bg-white p-6 sm:p-7">
                                <div className="flex items-center gap-2.5">
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: b.tint }} />
                                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">{b.when}</span>
                                </div>
                                <h3 className="display mt-4 text-xl font-semibold text-ink">{b.t}</h3>
                                <Bullets items={b.items} />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Safety and money */}
            <div className="mt-16">
                <Kicker>Safety and money</Kicker>
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                    <Reveal className="h-full">
                        <div className="h-full rounded-2xl border border-line bg-white p-6 sm:p-7">
                            <h3 className="display text-xl font-semibold text-ink">Student safety</h3>
                            <Bullets items={SAFETY} />
                            <p className="mt-5 text-[15px] leading-relaxed text-muted">
                                Students use a short, fixed list of browser tools, submitted for review with each participating school:
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {TOOLS.map((t) => (
                                    <span key={t} className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-ink/80">{t}</span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={80} className="h-full">
                        <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 sm:p-7">
                            <h3 className="display text-xl font-semibold text-ink">Money</h3>
                            <p className="mt-4 text-[15px] leading-relaxed text-muted">
                                All sponsorship goes to <span className="font-medium text-ink">The Hack Foundation (Hack Club)</span>, a 501(c)(3)
                                nonprofit and our fiscal sponsor. It holds the funds and pays for lunch, printing, and prizes directly, with a
                                receipt for every expense.
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-muted">Students pay nothing, and no student handles money.</p>
                            <p className="mt-5 font-mono text-[12px] text-faint">EIN 81-2908499</p>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* What comes after */}
            <Reveal className="mt-16 flex flex-col gap-8 border-t border-line pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                <p className="max-w-2xl text-lg leading-relaxed text-muted">
                    <span className="font-medium text-ink">The summit is one day. The course is the durable part.</span>{" "}
                    We've taught the 4-week version at LACES and built a 12-week version, and our goal is for them to become the
                    foundation of a standing LAUSD AI literacy elective.
                </p>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                    <a href="#involved" className="btn-accent">How you can help</a>
                    <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("LA Student AI Summit")}`} className="btn-ghost">Email us</a>
                </div>
            </Reveal>
        </>
    );
}
