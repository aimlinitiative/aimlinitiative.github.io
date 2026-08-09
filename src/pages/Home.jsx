import Reveal from "../components/Reveal";
import Typewriter from "../components/Typewriter";
import Marquee from "../components/Marquee";
import { SOCIALS } from "../components/Footer";

const EMAIL = "aimlinitiative@gmail.com";

const MARQUEE = ["Train a model", "Read an LLM", "Spot AI bias", "Ship real AI", "Think critically"];

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
    { t: "Advisors", d: "Guide our curriculum and growth. We're advised by people from DeepMind and Data Herald." },
];

export default function Home() {
    return (
        <div id="top">
            {/* ===================== HERO ===================== */}
            <section className="container-page pt-20 pb-16 sm:pt-28">
                <div className="mx-auto max-w-3xl text-center">
                    <img src="/logo.jpg" alt="AIML-LI" className="mx-auto mb-8 h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10 opacity-0 animate-fade-up" />
                    <p className="eyebrow opacity-0 animate-fade-up" style={{ animationDelay: "60ms" }}>AI/ML Literacy Initiative</p>
                    <h1 className="display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-ink opacity-0 animate-fade-up sm:text-6xl" style={{ animationDelay: "120ms" }}>
                        Making AI literacy accessible to every student.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted opacity-0 animate-fade-up" style={{ animationDelay: "200ms" }}>
                        AIML-LI is a nonprofit bringing open-source AI education into public-school
                        classrooms — starting with LAUSD, the nation's second-largest district.
                    </p>
                    <p className="mt-6 text-base text-ink opacity-0 animate-fade-up" style={{ animationDelay: "260ms" }}>
                        Students learn to train{" "}
                        <Typewriter className="display font-semibold text-accent" words={["a first model", "an image classifier", "a chatbot", "their own AI"]} />
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 opacity-0 animate-fade-up sm:flex-row" style={{ animationDelay: "320ms" }}>
                        <a href="#involved" className="btn-accent w-full sm:w-auto">Get involved</a>
                        <a href="#about" className="btn-ghost w-full sm:w-auto">Learn more</a>
                    </div>
                </div>
            </section>

            {/* ===================== MARQUEE (spicy) ===================== */}
            <div className="border-y border-white/10">
                <Marquee items={MARQUEE} />
            </div>

            {/* ===================== ABOUT ===================== */}
            <section id="about" className="container-page py-20 sm:py-24">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                    <Reveal>
                        <p className="eyebrow">Who we are</p>
                        <h2 className="display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">A small team closing the AI opportunity gap.</h2>
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
                                <span className="font-medium text-ink">Data Herald</span>, and presented our
                                work at the LAUSD Innovation Expo.
                            </p>
                        </div>
                        <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4">
                            {FACTS.map((f) => (
                                <div key={f.l}>
                                    <div className="display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{f.n}</div>
                                    <div className="mt-1 text-sm text-muted">{f.l}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===================== WHAT WE DO ===================== */}
            <section id="work" className="border-t border-white/10 bg-surface">
                <div className="container-page py-20 sm:py-24">
                    <Reveal className="max-w-2xl">
                        <p className="eyebrow">What we do</p>
                        <h2 className="display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Curriculum, classrooms, and open access.</h2>
                    </Reveal>
                    <div className="mt-14 grid gap-10 md:grid-cols-3">
                        {WORK.map((w) => (
                            <Reveal key={w.n}>
                                <div className="font-mono text-sm text-accent">{w.n}</div>
                                <h3 className="display mt-4 text-xl font-semibold text-ink">{w.t}</h3>
                                <p className="mt-3 leading-relaxed text-muted">{w.d}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== GALLERY ===================== */}
            <section className="container-page py-20 sm:py-24">
                <Reveal className="max-w-2xl">
                    <p className="eyebrow">In the classroom</p>
                    <h2 className="display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Photos from our workshops.</h2>
                    <p className="mt-3 text-muted">Snapshots from AIML-LI sessions with students and educators.</p>
                </Reveal>
                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                        <Reveal key={i}>
                            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/10 bg-surface">
                                <img src="/logo.jpg" alt="" className="h-14 w-14 rounded-xl object-cover opacity-20" />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ===================== GET INVOLVED ===================== */}
            <section id="involved" className="border-t border-white/10 bg-surface">
                <div className="container-page py-20 sm:py-24">
                    <Reveal className="max-w-2xl">
                        <p className="eyebrow">Get involved</p>
                        <h2 className="display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">What we're looking for.</h2>
                        <p className="mt-3 text-muted">We're growing — and we'd love your help. Here's who we're hoping to hear from.</p>
                    </Reveal>
                    <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
                        {LOOKING.map((l) => (
                            <Reveal key={l.t}>
                                <div className="border-t border-white/10 pt-6">
                                    <h3 className="display text-lg font-semibold text-ink">{l.t}</h3>
                                    <p className="mt-2 leading-relaxed text-muted">{l.d}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== CONTACT ===================== */}
            <section id="contact" className="container-page py-20 text-center sm:py-28">
                <Reveal>
                    <p className="eyebrow">Contact</p>
                    <h2 className="display mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-5xl">
                        Let's make AI literacy universal.
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg text-muted">
                        Partner, fund, teach, or just say hello. We reply to every message.
                    </p>
                    <div className="mt-9 flex justify-center">
                        <a href={`mailto:${EMAIL}`} className="btn-accent">{EMAIL}</a>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-3">
                        {SOCIALS.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent hover:text-accent">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                            </a>
                        ))}
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
