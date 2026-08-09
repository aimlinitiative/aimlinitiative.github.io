import { Link } from "react-router-dom";
import NeuralPlayground from "../components/NeuralPlayground";
import Reveal from "../components/Reveal";
import Stat from "../components/Stat";
import TiltCard from "../components/TiltCard";
import Marquee from "../components/Marquee";
import Typewriter from "../components/Typewriter";

const MARQUEE = [
    "LAUSD Pilot", "Google DeepMind", "Data Herald · YC W21", "LAUSD Innovation Expo",
    "Open-source curriculum", "12-week program", "Free for every school", "Est. 2023",
];

export default function Home() {
    return (
        <div className="overflow-hidden">
            {/* ============================ HERO ============================ */}
            <section className="container-page relative pb-10 pt-14 sm:pt-20">
                <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                    {/* Left: copy */}
                    <div>
                        <div className="animate-fade-up">
                            <span className="eyebrow">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px] shadow-cyan-400" />
                                Nonprofit · AI literacy · public schools
                            </span>
                        </div>

                        <h1 className="display-xl mt-6 text-white opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
                            Closing the{" "}
                            <span className="text-gradient">AI opportunity gap.</span>
                        </h1>

                        <div className="mono mt-5 text-sm text-white/55 opacity-0 animate-fade-up sm:text-base" style={{ animationDelay: "150ms" }}>
                            <span className="text-cyan-400">$</span> teaching students to{" "}
                            <Typewriter
                                className="text-white"
                                words={["train real models", "read an LLM", "spot AI bias", "ship their own AI"]}
                            />
                        </div>

                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 opacity-0 animate-fade-up" style={{ animationDelay: "220ms" }}>
                            We build open-source AI curriculum and put it straight into public-school
                            classrooms — starting with the nation's second-largest district. The
                            students most likely to be <em>governed</em> by AI, learning to{" "}
                            <em>build</em> it.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 opacity-0 animate-fade-up sm:flex-row" style={{ animationDelay: "300ms" }}>
                            <Link to="/demo" className="btn-primary">Train a neural net live →</Link>
                            <Link to="/contact" className="btn-ghost">Partner or fund us</Link>
                        </div>

                        <div className="mono mt-9 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40 opacity-0 animate-fade-up" style={{ animationDelay: "360ms" }}>
                            <span><span className="text-brand-300">12</span> weeks</span>
                            <span><span className="text-brand-300">16+</span> units</span>
                            <span><span className="text-brand-300">100%</span> open-source</span>
                            <span><span className="text-brand-300">LAUSD</span> pilot</span>
                        </div>
                    </div>

                    {/* Right: live demo, front and center */}
                    <div className="opacity-0 animate-fade-up" style={{ animationDelay: "260ms" }}>
                        <TiltCard max={6}>
                            <div className="tile p-3 sm:p-4">
                                <div className="mb-3 flex items-center justify-between px-1">
                                    <span className="mono flex items-center gap-2 text-xs text-white/55">
                                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                                        live · training in your browser
                                    </span>
                                    <span className="mono text-[10px] text-white/30">no server · plain JS</span>
                                </div>
                                <NeuralPlayground compact />
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="relative my-8 border-y border-white/10 py-4">
                <Marquee items={MARQUEE} />
            </div>

            {/* ============================ BENTO ============================ */}
            <section className="container-page py-14">
                <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <span className="eyebrow">The mission, by the numbers</span>
                        <h2 className="display-xl mt-4 !text-3xl text-white sm:!text-5xl">Small team. Big swing.</h2>
                    </div>
                    <p className="max-w-sm text-sm text-white/50">
                        Everything below is real today or clearly on our roadmap — no smoke, no mirrors.
                    </p>
                </Reveal>

                <div className="grid auto-rows-[168px] grid-cols-2 gap-4 lg:grid-cols-4">
                    {/* Problem — big tile */}
                    <Reveal className="col-span-2 row-span-2">
                        <TiltCard max={5} className="h-full">
                            <div className="tile flex h-full flex-col justify-between p-7">
                                <div>
                                    <span className="mono text-xs uppercase tracking-widest text-cyan-400">The problem</span>
                                    <p className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">
                                        AI is reshaping every career — but AI education reaches the
                                        students who need it <span className="text-gradient">least</span>.
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-end justify-between">
                                        <span className="font-display text-4xl font-bold text-gradient">1 in 5</span>
                                        <span className="mono text-xs text-white/45">K-12 schools offer<br />any AI / CS pathway</span>
                                    </div>
                                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full w-1/5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" />
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </Reveal>

                    <BentoStat value={16} suffix="+" label="Curriculum units" sub="Colab + lesson kits" />
                    <BentoStat value={12} label="Week program" sub="beginner → capstone" />

                    {/* Terminal tile */}
                    <Reveal className="col-span-2">
                        <TiltCard max={5} className="h-full">
                            <div className="tile h-full p-5">
                                <div className="mb-3 flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                                    <span className="mono ml-2 text-[11px] text-white/40">lesson_07_neural_nets.py</span>
                                </div>
                                <div className="mono space-y-1 text-[12px] leading-relaxed text-white/70">
                                    <div><span className="text-brand-300">model</span> = NeuralNet(layers=[2, <span className="text-cyan-300">8</span>, <span className="text-cyan-300">8</span>, <span className="text-cyan-300">1</span>])</div>
                                    <div><span className="text-brand-300">model</span>.train(data, epochs=<span className="text-cyan-300">400</span>)</div>
                                    <div className="text-white/35"># students watch it learn, live</div>
                                    <div><span className="text-green-300">accuracy</span> = <Typewriter className="text-green-300" words={["0.97", "0.98", "0.96"]} /></div>
                                </div>
                            </div>
                        </TiltCard>
                    </Reveal>

                    <BentoStat value={100} suffix="%" label="Free & open-source" sub="forever, for schools" />

                    {/* LAUSD tile */}
                    <Reveal>
                        <TiltCard max={6} className="h-full">
                            <div className="tile flex h-full flex-col justify-center p-6 text-center">
                                <div className="font-display text-3xl font-bold text-white">2<span className="text-gradient">nd</span></div>
                                <div className="mt-1 text-sm font-semibold text-white/85">largest US district</div>
                                <div className="mono mt-1 text-[11px] text-white/45">LAUSD · our first pilot</div>
                            </div>
                        </TiltCard>
                    </Reveal>
                </div>
            </section>

            {/* ============================ WHAT WE DO ============================ */}
            <section className="container-page py-14">
                <Reveal className="mb-10 max-w-2xl">
                    <span className="eyebrow">What we do</span>
                    <h2 className="display-xl mt-4 !text-3xl text-white sm:!text-5xl">A full stack for AI literacy.</h2>
                    <p className="mt-4 text-white/55">Not a worksheet. A curriculum, a classroom pilot, and tools students actually build with.</p>
                </Reveal>
                <div className="grid gap-5 md:grid-cols-3">
                    {[
                        { icon: "📚", title: "Real curriculum", text: "A 12-week, 16+ unit sequence — from what a neural network is to training one — with Colab notebooks, teacher guides, and assessments." },
                        { icon: "🏫", title: "In real classrooms", text: "We pilot directly with public-school teachers, gather feedback, and iterate. Starting with LAUSD — not a slide deck, a program." },
                        { icon: "🧪", title: "Learn by building", text: "Students train real models on real data — like the demo on this site — so AI stops feeling like magic and becomes something they can do." },
                    ].map((p, i) => (
                        <Reveal key={p.title} delay={i * 100}>
                            <TiltCard className="h-full">
                                <div className="tile tile-hover h-full p-7">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/15 text-2xl ring-1 ring-brand-500/25">{p.icon}</div>
                                    <h3 className="mt-5 font-display text-lg font-bold text-white">{p.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-white/60">{p.text}</p>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============================ ROADMAP ============================ */}
            <section className="container-page py-14">
                <Reveal className="mb-10 max-w-2xl">
                    <span className="eyebrow">Where we're going</span>
                    <h2 className="display-xl mt-4 !text-3xl text-white sm:!text-5xl">One district → a movement.</h2>
                </Reveal>
                <div className="grid gap-5 md:grid-cols-3">
                    {[
                        { tag: "Today", tone: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10", items: ["12-week curriculum, open-sourced", "LAUSD classroom pilot underway", "Advisors from DeepMind & Data Herald", "Presented at LAUSD Innovation Expo"] },
                        { tag: "By 2026", tone: "text-brand-300 border-brand-400/30 bg-brand-400/10", items: ["10 partner schools across LA", "1,000+ students reached", "Full teacher-training toolkit", "Formal impact evaluation"] },
                        { tag: "The vision", tone: "text-white/70 border-white/20 bg-white/5", items: ["Statewide adoption in California", "A national open-source standard", "Free forever for public schools", "Students shipping their own AI"] },
                    ].map((col, i) => (
                        <Reveal key={col.tag} delay={i * 100}>
                            <div className="tile h-full p-7">
                                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${col.tone}`}>{col.tag}</span>
                                <ul className="mt-5 space-y-3">
                                    {col.items.map((it) => (
                                        <li key={it} className="flex items-start gap-2.5 text-sm text-white/70">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400/70" />
                                            {it}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============================ CTA ============================ */}
            <section className="container-page py-16">
                <Reveal>
                    <TiltCard max={4}>
                        <div className="tile relative overflow-hidden px-8 py-16 text-center sm:px-16">
                            <div className="absolute inset-0 -z-10" style={{ backgroundImage: "radial-gradient(38rem 18rem at 50% -20%, rgba(99,102,241,0.4), transparent 70%), radial-gradient(28rem 18rem at 82% 120%, rgba(34,211,238,0.3), transparent 70%)" }} />
                            <h2 className="display-xl mx-auto max-w-2xl !text-3xl text-white sm:!text-5xl">Put AI within reach of every student.</h2>
                            <p className="mx-auto mt-5 max-w-xl text-white/65">We're seeking grant partners, schools, and mentors to scale a program that's already in classrooms. Every dollar goes straight into free curriculum and teacher support.</p>
                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link to="/contact" className="btn-primary w-full sm:w-auto">Become a partner</Link>
                                <Link to="/program" className="btn-ghost w-full sm:w-auto">See the program</Link>
                            </div>
                        </div>
                    </TiltCard>
                </Reveal>
            </section>
        </div>
    );
}

function BentoStat({ value, suffix, label, sub }) {
    return (
        <Reveal>
            <TiltCard max={6} className="h-full">
                <div className="tile flex h-full flex-col justify-center p-6">
                    <Stat value={value} suffix={suffix} label={label} sub={sub} />
                </div>
            </TiltCard>
        </Reveal>
    );
}
