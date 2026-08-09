import { Link } from "react-router-dom";
import NeuralBackground from "../components/NeuralBackground";
import NeuralPlayground from "../components/NeuralPlayground";
import Reveal from "../components/Reveal";
import Stat from "../components/Stat";

const PARTNERS = ["LAUSD", "Google DeepMind", "Data Herald (YC W21)", "LAUSD Innovation Expo"];

export default function Home() {
    return (
        <div>
            {/* ============================ HERO ============================ */}
            <section className="relative overflow-hidden">
                <NeuralBackground />
                <div className="container-page relative pb-20 pt-20 sm:pt-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="animate-fade-up">
                            <span className="eyebrow">Nonprofit · AI literacy · Public education</span>
                        </div>
                        <h1
                            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white opacity-0 animate-fade-up sm:text-6xl"
                            style={{ animationDelay: "80ms" }}
                        >
                            Closing the{" "}
                            <span className="text-gradient">AI opportunity gap</span>{" "}
                            in public schools.
                        </h1>
                        <p
                            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65 opacity-0 animate-fade-up"
                            style={{ animationDelay: "160ms" }}
                        >
                            AIML-LI builds open-source, standards-aligned AI curriculum and puts it
                            directly into classrooms — starting with the nation's second-largest
                            district. So the students most likely to be <em>governed</em> by AI are
                            equipped to <em>build</em> it.
                        </p>
                        <div
                            className="mt-9 flex flex-col items-center justify-center gap-3 opacity-0 animate-fade-up sm:flex-row"
                            style={{ animationDelay: "240ms" }}
                        >
                            <Link to="/demo" className="btn-primary w-full sm:w-auto">
                                Try the live demo →
                            </Link>
                            <Link to="/contact" className="btn-ghost w-full sm:w-auto">
                                Partner or fund us
                            </Link>
                        </div>
                    </div>

                    {/* Trust bar */}
                    <div className="mx-auto mt-16 max-w-4xl opacity-0 animate-fade-up" style={{ animationDelay: "320ms" }}>
                        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                            Piloting & advised with people from
                        </p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                            {PARTNERS.map((p) => (
                                <span key={p} className="text-sm font-semibold text-white/55">{p}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================ STATS ============================ */}
            <section className="container-page py-16">
                <Reveal className="glass grid grid-cols-2 gap-8 px-6 py-10 sm:px-10 lg:grid-cols-4">
                    <Stat value={12} label="Week program" sub="structured, sequential" />
                    <Stat value={16} suffix="+" label="Curriculum units" sub="Colab + lesson kits" />
                    <Stat value={100} suffix="%" label="Open-source & free" sub="for any educator" />
                    <Stat value={2} suffix="nd" label="Largest US district" sub="LAUSD pilot" />
                </Reveal>
            </section>

            {/* ============================ PROBLEM ============================ */}
            <section className="container-page py-16">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <Reveal>
                        <span className="eyebrow">The problem</span>
                        <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                            AI is reshaping every career — but AI education is reaching the
                            students who need it <span className="text-gradient">least</span>.
                        </h2>
                        <p className="mt-5 text-white/60">
                            Well-resourced schools already offer machine-learning electives, private
                            tutoring, and expensive summer programs. Under-resourced public schools —
                            where most students learn — are being left behind at the exact moment AI
                            fluency becomes a prerequisite for opportunity.
                        </p>
                        <p className="mt-4 text-white/60">
                            We think that gap is the civil-rights issue of this decade. AIML-LI exists
                            to close it — with curriculum good enough for any student, free enough for
                            every school.
                        </p>
                    </Reveal>

                    <Reveal delay={120} className="grid gap-4 sm:grid-cols-2">
                        {[
                            { stat: "1 in 5", text: "K-12 schools offer any AI or CS pathway" },
                            { stat: "$0", text: "cost of our curriculum to schools — permanently" },
                            { stat: "9–12", text: "grade band our lessons are designed for" },
                            { stat: "No-code → code", text: "on-ramp so any student can start" },
                        ].map((c) => (
                            <div key={c.text} className="glass glass-hover p-5">
                                <div className="font-display text-2xl font-bold text-gradient">{c.stat}</div>
                                <p className="mt-2 text-sm text-white/60">{c.text}</p>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>

            {/* ============================ PILLARS ============================ */}
            <section className="container-page py-16">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <span className="eyebrow">What we do</span>
                    <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
                        A full stack for AI literacy — not just a lesson plan.
                    </h2>
                </Reveal>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: "📚",
                            title: "Standards-aligned curriculum",
                            text: "A 12-week, 16+ unit sequence — from what a neural network is, to training one — with Colab notebooks, lesson kits, teacher guides, and assessments.",
                        },
                        {
                            icon: "🏫",
                            title: "In real classrooms",
                            text: "We don't just publish and hope. We pilot directly with public-school teachers, gather feedback, and iterate — starting with LAUSD.",
                        },
                        {
                            icon: "🧪",
                            title: "Learn by building",
                            text: "Students train real models on real data in the browser — like the live demo on this site — so AI stops feeling like magic and starts feeling like something they can do.",
                        },
                    ].map((p, i) => (
                        <Reveal key={p.title} delay={i * 100} className="glass glass-hover p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/15 text-2xl ring-1 ring-brand-500/25">
                                {p.icon}
                            </div>
                            <h3 className="mt-5 font-display text-lg font-bold text-white">{p.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/60">{p.text}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============================ DEMO TEASER ============================ */}
            <section className="container-page py-16">
                <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
                    <Reveal>
                        <span className="eyebrow">See it work</span>
                        <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
                            A neural network, training live — right in your browser.
                        </h2>
                        <p className="mt-5 text-white/60">
                            This is the kind of hands-on tool our students learn with. It's a real
                            multi-layer network doing real backpropagation in plain JavaScript — no
                            server, no libraries. Pick a dataset, tune the model, and watch it learn to
                            separate the classes.
                        </p>
                        <ul className="mt-6 space-y-2.5 text-sm text-white/70">
                            {["Four datasets, from easy to genuinely hard", "Adjustable learning rate, width, and depth", "Live loss & accuracy as it trains"].map((t) => (
                                <li key={t} className="flex items-start gap-2.5">
                                    <span className="mt-0.5 text-cyan-400">✦</span>
                                    {t}
                                </li>
                            ))}
                        </ul>
                        <Link to="/demo" className="btn-ghost mt-8">
                            Open the full playground →
                        </Link>
                    </Reveal>
                    <Reveal delay={120}>
                        <NeuralPlayground compact />
                    </Reveal>
                </div>
            </section>

            {/* ============================ ROADMAP ============================ */}
            <section className="container-page py-16">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <span className="eyebrow">Where we're going</span>
                    <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
                        From one district to a movement.
                    </h2>
                    <p className="mt-4 text-white/55">
                        Here's our honest trajectory — what's live today, and what your support helps us reach.
                    </p>
                </Reveal>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {[
                        {
                            tag: "Today",
                            tone: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
                            items: ["12-week curriculum built & open-sourced", "LAUSD classroom pilot underway", "Advisors from DeepMind & Data Herald", "Presented at the LAUSD Innovation Expo"],
                        },
                        {
                            tag: "By 2026",
                            tone: "text-brand-300 border-brand-400/30 bg-brand-400/10",
                            items: ["10 partner schools across LA", "1,000+ students reached", "Full teacher-training toolkit", "Formal impact evaluation"],
                        },
                        {
                            tag: "The vision",
                            tone: "text-white/70 border-white/20 bg-white/5",
                            items: ["Statewide adoption in California", "A national open-source standard", "Free forever for public schools", "Students shipping their own AI"],
                        },
                    ].map((col, i) => (
                        <Reveal key={col.tag} delay={i * 100} className="glass p-7">
                            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${col.tone}`}>
                                {col.tag}
                            </span>
                            <ul className="mt-5 space-y-3">
                                {col.items.map((it) => (
                                    <li key={it} className="flex items-start gap-2.5 text-sm text-white/70">
                                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/40" />
                                        {it}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============================ CTA ============================ */}
            <section className="container-page py-16">
                <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-14 text-center sm:px-16"
                    as="div">
                    <div
                        className="absolute inset-0 -z-10"
                        style={{
                            backgroundImage:
                                "radial-gradient(40rem 20rem at 50% -20%, rgba(99,102,241,0.35), transparent 70%), radial-gradient(30rem 20rem at 80% 120%, rgba(34,211,238,0.25), transparent 70%)",
                        }}
                    />
                    <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
                        Help us put AI within reach of every public-school student.
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-white/65">
                        We're seeking grant partners, schools, and mentors to scale a program that's
                        already in classrooms. Every dollar goes straight into free curriculum and teacher support.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link to="/contact" className="btn-primary w-full sm:w-auto">Become a partner</Link>
                        <Link to="/program" className="btn-ghost w-full sm:w-auto">See the program</Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
