import Reveal from "../components/Reveal";
import Typewriter from "../components/Typewriter";
import Curriculum from "../components/Curriculum";
import Summit from "../components/Summit";
import Supporters from "../components/Supporters";
import SectionLabel from "../components/SectionLabel";
import { SOCIALS } from "../components/Footer";

const EMAIL = "aimlinitiative@gmail.com";

// Blue-tint steps for the numbers (deep -> light)
const WORK_TINT = ["#22508F", "#2C63B0", "#4C82D2"];
const LOOKING_TINT = ["#1B3F73", "#22508F", "#2C63B0", "#3D77C9", "#5A8DD6"];

const WORK = [
    { n: "01", t: "We build the curriculum", d: "A 12-week course for high-schoolers with no background. Plain-language lessons, real notebooks, aligned to state standards." },
    { n: "02", t: "We run it in classrooms", d: "We work with public-school teachers to teach it for real, then fix whatever doesn't land. Our first pilot is with LAUSD." },
    { n: "03", t: "We keep it free", d: "Every lesson is open-source. No school pays, and cost never decides who gets to learn this." },
];

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-founder", initials: "AE" },
    { name: "Michael Tarekegn", role: "Co-founder", initials: "MT" },
    { name: "Ibrahim Piri", role: "Engineering", initials: "IP" },
];

const LOOKING = [
    { t: "A venue for the summit", tag: "Most needed", d: "One Saturday, 8am to 8pm, with room for at least 200 students plus mentors, tables and chairs, power, and Wi-Fi that holds a few hundred devices. It's our biggest open item, and it unlocks the date." },
    { t: "Speakers, judges, demos & mentors", d: "Twenty minutes on what you build, aimed at a 15-year-old. An hour judging pitches. A demo students can get their hands on, hardware especially. Or an afternoon mentoring a table. Each takes a half-day or less." },
    { t: "Sponsors & funders", d: "Cash or in kind: hardware, platform credits, swag, or a prize track in your area. Every dollar runs through our 501(c)(3) fiscal sponsor, with a receipt for every expense." },
    { t: "Schools & educators", d: "Want to bring students to the summit, or teach the free course in your classroom? Tell us and we'll help you get set up." },
    { t: "Introductions", d: "Venue operators, community and education giving teams, and anyone who should be in the room. Warm intros have been worth far more to us than cold email." },
];

export default function Home() {
    return (
        <div id="top">
            {/* ===================== HERO ===================== */}
            <section className="container-page pt-20 pb-20 sm:pt-28 sm:pb-28">
                <div className="mx-auto max-w-3xl text-center">
                    <a href="#summit" className="focusable group mb-8 inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-white/70 py-1 pl-1 pr-3.5 text-[13px] font-medium text-muted opacity-0 animate-fade-up transition-colors hover:border-ink/15 hover:text-ink sm:text-sm" style={{ animationDelay: "0ms" }}>
                        <span className="shrink-0 rounded-full bg-accentsoft px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-accent">Late 2026</span>
                        <span className="min-w-0 truncate">
                            <span className="sm:hidden">LA Student AI Summit</span>
                            <span className="hidden sm:inline">LA Student AI Summit and Hackathon</span>
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                    <h1 className="display text-balance text-[2.6rem] font-bold leading-[1.02] tracking-tightest text-ink opacity-0 animate-fade-up sm:text-6xl" style={{ animationDelay: "60ms" }}>
                        AI literacy for <span className="text-accent">everyone</span>, everywhere.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted opacity-0 animate-fade-up" style={{ animationDelay: "160ms" }}>
                        We build free, open-source AI courses and bring them into public schools.
                        We're starting with LAUSD, the second-largest district in the country.
                    </p>
                    <p className="mt-7 text-base text-muted opacity-0 animate-fade-up" style={{ animationDelay: "220ms" }}>
                        Students learn to{" "}
                        <Typewriter className="display font-semibold text-accent" words={["train their first model", "question the tools they use", "explain how an LLM works", "spot AI bias", "build a working classifier", "solve a real-world problem"]} />
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 opacity-0 animate-fade-up sm:flex-row" style={{ animationDelay: "300ms" }}>
                        <a href="#involved" className="btn-accent w-full sm:w-auto">Get involved</a>
                        <a href="#about" className="btn-ghost w-full sm:w-auto">Learn more</a>
                    </div>
                    <p className="mt-9 text-[13px] uppercase tracking-[0.14em] text-faint opacity-0 animate-fade-up" style={{ animationDelay: "360ms" }}>
                        Advised by people from Google&nbsp;DeepMind &amp; Y&nbsp;Combinator
                    </p>
                </div>
            </section>

            {/* ===================== ABOUT ===================== */}
            <section id="about" className="container-page border-t border-line py-24 sm:py-32">
                <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    <Reveal>
                        <SectionLabel n="01">Who we are</SectionLabel>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem] sm:leading-[1.08]">
                            A small team going after a real gap.
                        </h2>
                    </Reveal>
                    <Reveal>
                        <div className="space-y-5 text-lg leading-relaxed text-muted">
                            <p>
                                AI already touches most jobs, but the students who'd gain the most from
                                understanding it get the least chance to learn it. Well-off schools have
                                machine-learning electives and private tutors. Most public schools have nothing.
                            </p>
                            <p>
                                So we started AIML-LI. We write the curriculum, test it in real classrooms,
                                and give it away for free. People from{" "}
                                <span className="font-medium text-ink">Google DeepMind</span> and{" "}
                                <span className="font-medium text-ink">Y Combinator</span> advise us, and
                                we've shown the work at the LAUSD Innovation Expo.
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* Team */}
                <Reveal className="mt-16 border-t border-line pt-10">
                    <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-faint">The team</p>
                    <div className="mt-7 grid gap-8 sm:grid-cols-3">
                        {TEAM.map((m) => (
                            <div key={m.name} className="flex items-center gap-4">
                                {/* Swap the initials avatar for a headshot / the YC photo when ready */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-sm font-semibold text-ink">
                                    {m.initials}
                                </div>
                                <div>
                                    <div className="display text-base font-semibold text-ink">{m.name}</div>
                                    <div className="text-sm text-muted">{m.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* ===================== WHAT WE DO ===================== */}
            <section id="work" className="border-y border-line bg-surface">
                <div className="container-page py-24 sm:py-32">
                    <Reveal className="max-w-2xl">
                        <SectionLabel n="02">What we do</SectionLabel>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                            How it works.
                        </h2>
                    </Reveal>
                    <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
                        {WORK.map((w, i) => (
                            <Reveal key={w.n} delay={i * 80} className="relative">
                                {i < WORK.length - 1 && (
                                    <div className="absolute left-10 top-5 hidden h-px bg-line md:block" style={{ width: "calc(100% - 0.5rem)" }} />
                                )}
                                {i < WORK.length - 1 && (
                                    <div className="absolute left-5 w-px bg-line md:hidden" style={{ top: "3rem", bottom: "-2.5rem" }} />
                                )}
                                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg font-mono text-sm font-bold shadow-soft" style={{ color: WORK_TINT[i] }}>
                                    {w.n}
                                </div>
                                <h3 className="display mt-6 text-xl font-semibold text-ink">{w.t}</h3>
                                <p className="mt-3 max-w-sm leading-relaxed text-muted">{w.d}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== CURRICULUM ===================== */}
            <section id="curriculum" className="container-page py-24 sm:py-32">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <SectionLabel n="03" className="justify-center">The curriculum</SectionLabel>
                    <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                        Six units over twelve weeks.
                    </h2>
                    <p className="mt-4 text-lg text-muted">
                        It starts from the basics and ends with a project students ship. Drag to look through it.
                    </p>
                </Reveal>
                <Curriculum />
            </section>

            {/* ===================== SUMMIT ===================== */}
            <section id="summit" className="border-y border-line bg-surface">
                <div className="container-page py-24 sm:py-32">
                    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                        <Reveal>
                            <SectionLabel n="04">The summit</SectionLabel>
                            <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem] sm:leading-[1.08]">
                                LA Student AI Summit and Hackathon
                            </h2>
                        </Reveal>
                        <Reveal>
                            <p className="text-lg leading-relaxed text-muted">
                                Most students use AI outside school every day, but few are taught how it works or where it
                                fails. The summit is one free, supervised day where Los Angeles public school students hear
                                from people who build AI, see how the tools they already use actually work, and build
                                something of their own.
                            </p>
                        </Reveal>
                    </div>
                    <Summit />
                </div>
            </section>

            {/* ===================== SUPPORTERS ===================== */}
            <section id="supporters" className="container-page py-24 sm:py-32">
                <Reveal className="max-w-2xl">
                    <SectionLabel n="05">Supporters</SectionLabel>
                    <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                        Who's already in.
                    </h2>
                    <p className="mt-4 text-lg text-muted">
                        Nine partners have committed to the summit so far.
                    </p>
                </Reveal>
                <Supporters />
            </section>

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

            {/* ===================== CONTACT ===================== */}
            <section id="contact" className="container-page py-28 text-center sm:py-36">
                <Reveal>
                    <SectionLabel n="07" className="justify-center">Contact</SectionLabel>
                    <h2 className="display mx-auto mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tightest text-ink sm:text-5xl">
                        Let's talk.
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg text-lg text-muted">
                        Partner, fund, teach, or just say hi. We answer every message.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <a href={`mailto:${EMAIL}`} className="btn-accent text-base">Contact us</a>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-3">
                        {SOCIALS.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:bg-accentsoft hover:text-accent">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                            </a>
                        ))}
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
