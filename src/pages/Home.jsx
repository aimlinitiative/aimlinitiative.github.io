import { Link } from "react-router-dom";
import NeuralPlayground from "../components/NeuralPlayground";
import Reveal from "../components/Reveal";
import Stat from "../components/Stat";
import Marquee from "../components/Marquee";
import Typewriter from "../components/Typewriter";
import Tabs from "../components/Tabs";

const MARQUEE = ["LAUSD Pilot", "Google DeepMind", "Data Herald", "Innovation Expo", "Open-source", "Free for schools"];

const TABS = [
    { key: "curriculum", tab: "Curriculum", title: "A 12-week, 16+ unit AI course", body: "From what a neural network is to training one — plain-language primers, Google Colab notebooks, teacher guides, and assessments. Beginner to capstone, no prerequisites.", stat: "16+", statLabel: "units, open-source" },
    { key: "classrooms", tab: "Classrooms", title: "Piloted in real public schools", body: "We don't publish and hope. We run the program with public-school teachers, gather feedback, and iterate — starting with LAUSD, the nation's second-largest district.", stat: "2nd", statLabel: "largest US district" },
    { key: "opensource", tab: "Open-source", title: "Free, forever, for every school", body: "Cost is the barrier we exist to remove. The entire curriculum is released open-source so any educator can adopt it without budget standing in the way.", stat: "100%", statLabel: "free & open" },
    { key: "handson", tab: "Hands-on", title: "Students train real models", body: "Learners build and train real neural networks in the browser — like the live demo on this page — so AI stops feeling like magic and becomes something they can do.", stat: "0.97", statLabel: "acc, trained live" },
];

export default function Home() {
    return (
        <div className="overflow-hidden">
            {/* ============================ HERO ============================ */}
            <section className="container-wide relative pt-16 pb-12 sm:pt-24">
                <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <div className="animate-fade-up">
                            <span className="eyebrow">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "linear-gradient(#b302e8,#ff5147)" }} />
                                Nonprofit · AI literacy · public education
                            </span>
                        </div>
                        <h1 className="display-xl mt-6 text-white opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
                            The critical layer<br />powering{" "}
                            <span className="text-gradient">AI literacy.</span>
                        </h1>
                        <div className="mono mt-6 text-sm text-white/50 opacity-0 animate-fade-up" style={{ animationDelay: "150ms" }}>
                            <span className="text-[#c76bff]">&gt;</span> teaching students to{" "}
                            <Typewriter className="text-white" words={["train real models", "read an LLM", "spot AI bias", "ship their own AI"]} />
                        </div>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 opacity-0 animate-fade-up" style={{ animationDelay: "220ms" }}>
                            AIML-LI builds open-source AI curriculum and puts it straight into
                            public-school classrooms — starting with the nation's second-largest
                            district. The students most likely to be governed by AI, learning to build it.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 opacity-0 animate-fade-up sm:flex-row" style={{ animationDelay: "300ms" }}>
                            <Link to="/demo" className="btn-primary">Train a neural net live →</Link>
                            <Link to="/contact" className="btn-ghost">Partner or fund us</Link>
                        </div>
                        <div className="mono mt-9 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40 opacity-0 animate-fade-up" style={{ animationDelay: "360ms" }}>
                            <span className="text-gradient font-semibold">12 weeks</span>
                            <span>·</span><span>16+ units</span>
                            <span>·</span><span>100% open-source</span>
                            <span>·</span><span>LAUSD pilot</span>
                        </div>
                    </div>

                    {/* Hero demo panel */}
                    <div className="opacity-0 animate-fade-up" style={{ animationDelay: "260ms" }}>
                        <div className="relative">
                            <div className="absolute -inset-4 -z-10 rounded-[2rem] opacity-60 blur-2xl" style={{ background: "radial-gradient(60% 60% at 30% 20%, rgba(179,2,232,0.35), transparent), radial-gradient(60% 60% at 80% 90%, rgba(255,81,71,0.28), transparent)" }} />
                            <div className="mb-3 flex items-center justify-between px-1">
                                <span className="mono flex items-center gap-2 text-xs text-white/55">
                                    <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "linear-gradient(#b302e8,#ff5147)" }} />
                                    live · training in your browser
                                </span>
                                <span className="mono text-[10px] text-white/30">no server · plain JS</span>
                            </div>
                            <NeuralPlayground compact />
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="border-y border-white/10 py-5">
                <Marquee items={MARQUEE} />
            </div>

            {/* ============================ STATS ============================ */}
            <section className="container-wide py-20">
                <Reveal className="panel grid grid-cols-2 gap-8 p-8 sm:p-12 lg:grid-cols-4">
                    <Stat value={12} label="Week program" sub="beginner → capstone" />
                    <Stat value={16} suffix="+" label="Curriculum units" sub="Colab + lesson kits" />
                    <Stat value={100} suffix="%" label="Open-source & free" sub="forever, for schools" />
                    <Stat value={2} suffix="nd" label="Largest US district" sub="LAUSD pilot" />
                </Reveal>
            </section>

            {/* ============================ PROBLEM ============================ */}
            <section className="container-wide py-20">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <Reveal>
                        <span className="label">The problem</span>
                        <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                            AI is reshaping every career — but AI education reaches the students who need it{" "}
                            <span className="text-gradient">least</span>.
                        </h2>
                    </Reveal>
                    <Reveal delay={120}>
                        <p className="text-white/60">
                            Well-resourced schools already run machine-learning electives and pricey
                            summer programs. Under-resourced public schools — where most students learn —
                            are left behind exactly as AI fluency becomes a prerequisite for opportunity.
                            We think that gap is the civil-rights issue of this decade.
                        </p>
                        <div className="mt-8 flex items-end gap-5 border-t border-white/10 pt-6">
                            <span className="display text-7xl font-bold text-gradient">1/5</span>
                            <span className="mono pb-2 text-xs uppercase tracking-wider text-white/45">K-12 schools offer<br />any AI or CS pathway</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ============================ INTERACTIVE TABS ============================ */}
            <section className="container-wide py-20">
                <Reveal className="mb-12 max-w-2xl">
                    <span className="label">How it works</span>
                    <h2 className="display mt-5 text-4xl text-white sm:text-5xl">A full stack for AI literacy.</h2>
                    <p className="mt-4 text-white/55">Not a worksheet — a curriculum, a classroom pilot, and tools students actually build with. Click through.</p>
                </Reveal>
                <Reveal>
                    <Tabs items={TABS} />
                </Reveal>
            </section>

            {/* ============================ FEATURE CARDS ============================ */}
            <section className="container-wide py-20">
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { icon: "◆", title: "Real curriculum", text: "12 weeks, 16+ units, Colab notebooks, teacher guides and assessments — from zero to a shipped AI project." },
                        { icon: "▲", title: "In real classrooms", text: "Piloted directly with public-school teachers. A program that's measured and iterated, not a slide deck." },
                        { icon: "●", title: "Learn by building", text: "Students train real models on real data — like the demo above — so AI becomes something they can do." },
                    ].map((c, i) => (
                        <Reveal key={c.title} delay={i * 100}>
                            <div className="panel ring-grad panel-hover h-full p-7">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl text-lg text-white" style={{ backgroundImage: "linear-gradient(135deg,#b302e8,#ff5147)" }}>{c.icon}</div>
                                <h3 className="mt-5 font-display text-lg font-bold text-white">{c.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/60">{c.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============================ ROADMAP ============================ */}
            <section className="container-wide py-20">
                <Reveal className="mb-12 max-w-2xl">
                    <span className="label">Where we're going</span>
                    <h2 className="display mt-5 text-4xl text-white sm:text-5xl">One district → a movement.</h2>
                </Reveal>
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { tag: "Today", items: ["12-week curriculum, open-sourced", "LAUSD classroom pilot underway", "Advisors from DeepMind & Data Herald", "Presented at LAUSD Innovation Expo"] },
                        { tag: "By 2026", items: ["10 partner schools across LA", "1,000+ students reached", "Full teacher-training toolkit", "Formal impact evaluation"] },
                        { tag: "The vision", items: ["Statewide adoption in California", "A national open-source standard", "Free forever for public schools", "Students shipping their own AI"] },
                    ].map((col, i) => (
                        <Reveal key={col.tag} delay={i * 100}>
                            <div className="panel h-full p-7">
                                <span className="label text-gradient">{col.tag}</span>
                                <ul className="mt-5 space-y-3">
                                    {col.items.map((it) => (
                                        <li key={it} className="flex items-start gap-2.5 text-sm text-white/70">
                                            <span className="mono mt-0.5 text-[#c76bff]">→</span>{it}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============================ CTA ============================ */}
            <section className="container-wide py-20">
                <Reveal className="panel ring-grad relative overflow-hidden px-8 py-16 text-center sm:px-16">
                    <div className="absolute inset-0 -z-10" style={{ backgroundImage: "radial-gradient(40rem 18rem at 50% -10%, rgba(179,2,232,0.4), transparent 70%), radial-gradient(30rem 18rem at 82% 120%, rgba(255,81,71,0.3), transparent 70%)" }} />
                    <h2 className="display mx-auto max-w-3xl text-4xl text-white sm:text-6xl">
                        Put AI within reach of <span className="text-gradient">every</span> student.
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-white/60">
                        We're seeking grant partners, schools, and mentors to scale a program that's
                        already in classrooms. Every dollar goes into free curriculum and teacher support.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link to="/contact" className="btn-primary w-full sm:w-auto">Become a partner</Link>
                        <Link to="/program" className="btn-ghost w-full sm:w-auto">See the program</Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
