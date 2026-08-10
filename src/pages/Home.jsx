import Reveal from "../components/Reveal";
import Typewriter from "../components/Typewriter";
import Marquee from "../components/Marquee";
import Curriculum from "../components/Curriculum";
import { SOCIALS } from "../components/Footer";

const EMAIL = "aimlinitiative@gmail.com";

const MARQUEE = ["Train a model", "Read an LLM", "Spot AI bias", "Ship real AI", "Think critically", "Question the algorithm"];

const FACTS = [
    { n: "2023", l: "Founded" },
    { n: "12-week", l: "Curriculum" },
    { n: "16+", l: "Lesson units" },
    { n: "LAUSD", l: "Pilot district" },
];

const WORK = [
    { n: "01", t: "We build the curriculum", d: "A 12-week, standards-aligned AI course — plain-language lessons and hands-on notebooks — designed for high-school students with no background." },
    { n: "02", t: "We bring it to classrooms", d: "We partner directly with public-school teachers to run the program, gather feedback, and improve it. Our first pilot is with LAUSD." },
    { n: "03", t: "We keep it open and free", d: "The entire curriculum is open-source and free to any school. Cost should never be the reason a student misses out on AI literacy." },
];

const LOOKING = [
    { t: "Schools & educators", d: "Bring the curriculum to your classroom — free, with support to get started." },
    { t: "Funders & grant partners", d: "Help us scale a program that's already reaching students in public schools." },
    { t: "Mentors & volunteers", d: "Share your expertise — help build lessons, mentor students, or run a workshop." },
    { t: "Advisors", d: "Guide our curriculum and growth. We're advised by people from Google DeepMind and Y Combinator." },
];

export default function Home() {
    return (
        <div id="top">
            {/* ===================== HERO ===================== */}
            <section className="container-page pt-24 pb-20 sm:pt-32 sm:pb-28">
                <div className="mx-auto max-w-3xl text-center">
                    <img src="/logo.jpg" alt="AIML-LI" className="mx-auto mb-9 h-16 w-16 rounded-2xl object-cover shadow-soft ring-1 ring-line opacity-0 animate-fade-up" />
                    <p className="eyebrow opacity-0 animate-fade-up" style={{ animationDelay: "60ms" }}>Nonprofit · AI literacy in public schools</p>
                    <h1 className="display mt-5 text-balance text-[2.6rem] font-bold leading-[1.02] tracking-tightest text-ink opacity-0 animate-fade-up sm:text-6xl" style={{ animationDelay: "120ms" }}>
                        AI literacy for <span className="text-accent">everyone</span>, everywhere.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted opacity-0 animate-fade-up" style={{ animationDelay: "200ms" }}>
                        AIML-LI makes open-source AI education free and accessible — not just in
                        public-school classrooms, but anywhere. We're starting with LAUSD, the
                        nation's second-largest district.
                    </p>
                    <p className="mt-7 text-base text-muted opacity-0 animate-fade-up" style={{ animationDelay: "260ms" }}>
                        Students learn to{" "}
                        <Typewriter className="display font-semibold text-accent" words={["train their first model", "build an image classifier", "talk to an LLM", "spot AI bias", "question the algorithm", "ship their own AI"]} />
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 opacity-0 animate-fade-up sm:flex-row" style={{ animationDelay: "320ms" }}>
                        <a href="#involved" className="btn-accent w-full sm:w-auto">Get involved</a>
                        <a href="#about" className="btn-ghost w-full sm:w-auto">Learn more</a>
                    </div>
                    <p className="mt-9 text-[13px] uppercase tracking-[0.14em] text-faint opacity-0 animate-fade-up" style={{ animationDelay: "380ms" }}>
                        Advised by practitioners from Google&nbsp;DeepMind &amp; Y&nbsp;Combinator
                    </p>
                </div>
            </section>

            {/* ===================== MARQUEE ===================== */}
            <div className="rule border-b border-line">
                <Marquee items={MARQUEE} />
            </div>

            {/* ===================== ABOUT ===================== */}
            <section id="about" className="container-page py-24 sm:py-32">
                <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    <Reveal>
                        <p className="eyebrow">Who we are</p>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem] sm:leading-[1.08]">
                            A small team closing the AI opportunity gap.
                        </h2>
                    </Reveal>
                    <Reveal>
                        <div className="space-y-5 text-lg leading-relaxed text-muted">
                            <p>
                                AI is reshaping nearly every career — yet quality AI education still reaches
                                the students who need it least. Well-resourced schools offer machine-learning
                                electives and private tutoring; most public schools offer nothing.
                            </p>
                            <p>
                                We founded AIML-LI to change that. We build a genuinely excellent AI
                                curriculum, prove it in real classrooms, and release it free so any school
                                can teach it. We're advised by practitioners from{" "}
                                <span className="font-medium text-ink">Google DeepMind</span> and{" "}
                                <span className="font-medium text-ink">Y Combinator</span>, and presented our
                                work at the LAUSD Innovation Expo.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                            {FACTS.map((f) => (
                                <div key={f.l} className="bg-bg px-5 py-6">
                                    <div className="display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{f.n}</div>
                                    <div className="mt-1.5 text-sm text-faint">{f.l}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===================== WHAT WE DO ===================== */}
            <section id="work" className="border-y border-line bg-surface">
                <div className="container-page py-24 sm:py-32">
                    <Reveal className="max-w-2xl">
                        <p className="eyebrow">What we do</p>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                            Curriculum, classrooms, and open access.
                        </h2>
                    </Reveal>
                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {WORK.map((w, i) => {
                            const chip = ["bg-brand-blue/10 text-brand-blue", "bg-brand-teal/10 text-brand-teal", "bg-brand-amber/10 text-brand-amber"][i];
                            return (
                                <Reveal key={w.n}>
                                    <div className="card card-hover h-full">
                                        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-semibold ${chip}`}>{w.n}</div>
                                        <h3 className="display mt-5 text-xl font-semibold text-ink">{w.t}</h3>
                                        <p className="mt-3 leading-relaxed text-muted">{w.d}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== CURRICULUM ===================== */}
            <section id="curriculum" className="container-page py-24 sm:py-32">
                <Reveal className="max-w-2xl">
                    <p className="eyebrow">The curriculum</p>
                    <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                        Twelve weeks, from “what is AI?” to shipping your own.
                    </h2>
                    <p className="mt-4 text-lg text-muted">
                        Standards-aligned, no background required. Click any week to see what students learn and build.
                    </p>
                </Reveal>
                <Curriculum />
            </section>

            {/* ===================== GALLERY ===================== */}
            <section className="container-page py-24 sm:py-32">
                <Reveal className="max-w-2xl">
                    <p className="eyebrow">In the classroom</p>
                    <h2 className="display mt-5 text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">Photos from our workshops.</h2>
                    <p className="mt-4 text-lg text-muted">Snapshots from AIML-LI sessions with students and educators.</p>
                </Reveal>
                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                        <Reveal key={i}>
                            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-line bg-surface">
                                <img src="/logo.jpg" alt="" className="h-12 w-12 rounded-xl object-cover opacity-25" />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ===================== GET INVOLVED ===================== */}
            <section id="involved" className="border-y border-line bg-surface">
                <div className="container-page py-24 sm:py-32">
                    <Reveal className="max-w-2xl">
                        <p className="eyebrow">Get involved</p>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">What we're looking for.</h2>
                        <p className="mt-4 text-lg text-muted">We're growing — and we'd love your help. Here's who we're hoping to hear from.</p>
                    </Reveal>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2">
                        {LOOKING.map((l, i) => {
                            const dot = ["bg-brand-blue", "bg-brand-teal", "bg-brand-amber", "bg-brand-violet"][i];
                            return (
                                <Reveal key={l.t}>
                                    <div className="card card-hover h-full bg-bg">
                                        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot}`} />
                                        <h3 className="display mt-4 text-lg font-semibold text-ink">{l.t}</h3>
                                        <p className="mt-2.5 leading-relaxed text-muted">{l.d}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== CONTACT ===================== */}
            <section id="contact" className="container-page py-28 text-center sm:py-36">
                <Reveal>
                    <p className="eyebrow justify-center">Contact</p>
                    <h2 className="display mx-auto mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tightest text-ink sm:text-5xl">
                        Let's make AI literacy universal.
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg text-lg text-muted">
                        Partner, fund, teach, or just say hello. We reply to every message.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <a href={`mailto:${EMAIL}`} className="btn-accent text-base">{EMAIL}</a>
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
