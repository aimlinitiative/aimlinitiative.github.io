import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

const LOOKING_TINT = ["#1B3F73", "#22508F", "#2C63B0", "#3D77C9", "#5A8DD6"];

const LOOKING = [
    { t: "A venue for the summit", tag: "Most needed", d: "One Saturday, 8am to 8pm, with room for at least 200 students plus mentors, tables and chairs, power, and Wi-Fi that holds a few hundred devices. It's our biggest open item, and it unlocks the date." },
    { t: "Speakers, judges, demos & mentors", d: "Twenty minutes on what you build, aimed at a 15-year-old. An hour judging pitches. A demo students can get their hands on, hardware especially. Or an afternoon mentoring a table. Each takes a half-day or less." },
    { t: "Sponsors & funders", d: "Cash or in kind: hardware, platform credits, swag, or a prize track in your area. Every dollar runs through our 501(c)(3) fiscal sponsor, with a receipt for every expense." },
    { t: "Schools & educators", d: "Want to bring students to the summit, or teach the free course in your classroom? Tell us and we'll help you get set up." },
    { t: "Introductions", d: "Venue operators, community and education giving teams, and anyone who should be in the room. Warm intros have been worth far more to us than cold email." },
];

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
                    <div className="mt-14 border-t border-line">
                        {LOOKING.map((l, i) => (
                            <Reveal
                                key={l.t}
                                delay={i * 60}
                                className="group grid grid-cols-1 gap-x-10 gap-y-2 border-b border-line py-8 transition-colors duration-300 hover:bg-black/[0.015] md:grid-cols-[2.5rem_14rem_1fr] md:items-baseline"
                            >
                                <span className="font-mono text-sm font-bold tabular-nums" style={{ color: LOOKING_TINT[i] }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 className="display text-xl font-semibold tracking-tight text-ink">{l.t}</h3>
                                    {l.tag && (
                                        <span className="mt-2 inline-block rounded-full bg-accentsoft px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent">{l.tag}</span>
                                    )}
                                </div>
                                <p className="max-w-xl leading-relaxed text-muted">{l.d}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
