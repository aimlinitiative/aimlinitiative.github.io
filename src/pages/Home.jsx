import { Link } from "react-router-dom";
import NeuralPlayground from "../components/NeuralPlayground";
import Reveal from "../components/Reveal";
import Stat from "../components/Stat";
import Marquee from "../components/Marquee";
import Magnetic from "../components/Magnetic";
import Typewriter from "../components/Typewriter";

const MARQUEE = [
    "LAUSD Pilot", "Google DeepMind", "Data Herald", "Innovation Expo",
    "Open-source", "Free for schools",
];

function SectionHead({ n, label, title, className = "" }) {
    return (
        <div className={className}>
            <div className="flex items-center gap-3">
                <span className="index-num">({n})</span>
                <span className="label">{label}</span>
            </div>
            <h2 className="display mt-5 text-4xl text-ink sm:text-6xl">{title}</h2>
        </div>
    );
}

export default function Home() {
    return (
        <div className="overflow-hidden">
            {/* ============================ HERO ============================ */}
            <section className="container-wide flex min-h-[86vh] flex-col justify-center py-16">
                <Reveal className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="label">AI/ML Literacy Initiative</span>
                    <span className="label !text-ink/40">Est. 2023 — Los Angeles</span>
                </Reveal>

                <h1 className="display-xl mt-8 text-ink">
                    <span className="block overflow-hidden"><span className="block animate-fade-up">Closing the</span></span>
                    <span className="block overflow-hidden">
                        <span className="block animate-fade-up italic text-accent" style={{ animationDelay: "90ms" }}>AI opportunity</span>
                    </span>
                    <span className="block overflow-hidden"><span className="block animate-fade-up" style={{ animationDelay: "180ms" }}>gap.</span></span>
                </h1>

                <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-[1fr_1fr] md:items-end">
                    <div className="mono text-sm text-ink2">
                        <span className="text-accent">$</span> teaching students to{" "}
                        <Typewriter className="text-ink" words={["train real models", "read an LLM", "spot AI bias", "ship their own AI"]} />
                    </div>
                    <div className="md:justify-self-end md:text-right">
                        <p className="max-w-md text-base leading-relaxed text-ink2">
                            We build open-source AI curriculum and put it straight into public-school
                            classrooms — starting with the nation's second-largest district.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3 md:justify-end">
                            <Magnetic strength={0.4}><Link to="/demo" className="btn-primary" data-cursor>Train a neural net live →</Link></Magnetic>
                            <Magnetic strength={0.4}><Link to="/contact" className="btn-ghost" data-cursor>Partner or fund us</Link></Magnetic>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="border-y border-ink/15 py-6">
                <Marquee items={MARQUEE} />
            </div>

            {/* ================= (01) THE PROBLEM ================= */}
            <section className="container-wide py-24">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <Reveal>
                        <SectionHead
                            n="01"
                            label="The problem"
                            title={<>AI is reshaping<br />every career.</>}
                        />
                    </Reveal>
                    <Reveal delay={120} className="lg:pt-2">
                        <p className="serif text-2xl font-medium leading-snug text-ink sm:text-3xl">
                            But AI education reaches the students who need it{" "}
                            <span className="italic text-accent">least</span>.
                        </p>
                        <p className="mt-6 max-w-xl text-ink2">
                            Well-resourced schools already run machine-learning electives and pricey
                            summer programs. Under-resourced public schools — where most students learn
                            — are left behind exactly as AI fluency becomes a prerequisite for
                            opportunity. We think that gap is the civil-rights issue of this decade.
                        </p>
                        <div className="mt-10 flex items-end gap-6 border-t border-ink/15 pt-8">
                            <div className="serif text-7xl font-medium leading-none text-ink sm:text-8xl">1<span className="text-accent">/</span>5</div>
                            <p className="mono pb-2 text-xs uppercase tracking-wider text-ink2">
                                K-12 schools offer<br />any AI or CS pathway
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ================= (02) LIVE DEMO ================= */}
            <section className="container-wide border-t border-ink/15 py-24">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <Reveal className="lg:sticky lg:top-28">
                        <SectionHead n="02" label="See it work" title={<>A neural net,<br />trained by you.</>} />
                        <p className="mt-6 max-w-sm text-ink2">
                            This is the kind of tool our students learn with — a real multi-layer
                            network doing backpropagation in plain JavaScript. No server, no
                            libraries. Pick a dataset, tune it, watch it learn.
                        </p>
                        <Magnetic strength={0.35}>
                            <Link to="/demo" className="btn-ghost mt-8" data-cursor>Open full playground →</Link>
                        </Magnetic>
                    </Reveal>
                    <Reveal delay={120}>
                        <NeuralPlayground compact />
                    </Reveal>
                </div>
            </section>

            {/* ================= (03) WHAT WE DO ================= */}
            <section className="container-wide border-t border-ink/15 py-24">
                <Reveal>
                    <SectionHead n="03" label="What we do" title="A full stack for AI literacy." className="max-w-2xl" />
                </Reveal>
                <div className="mt-16 divide-y divide-ink/15 border-y border-ink/15">
                    {[
                        { k: "A", title: "Real curriculum", text: "A 12-week, 16+ unit sequence — from what a neural network is to training one — with Colab notebooks, teacher guides, and assessments." },
                        { k: "B", title: "In real classrooms", text: "We pilot directly with public-school teachers, gather feedback, and iterate. Starting with LAUSD — a program, not a slide deck." },
                        { k: "C", title: "Learn by building", text: "Students train real models on real data — like the demo above — so AI stops feeling like magic and becomes something they can do." },
                    ].map((row, i) => (
                        <Reveal key={row.k} delay={i * 90}>
                            <div className="group grid grid-cols-[auto_1fr] gap-6 py-8 transition-colors sm:grid-cols-[3rem_1fr_1.4fr] sm:gap-10">
                                <span className="serif text-2xl italic text-accent">{row.k}</span>
                                <h3 className="serif text-2xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">{row.title}</h3>
                                <p className="col-span-2 text-ink2 sm:col-span-1">{row.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ================= (04) BY THE NUMBERS ================= */}
            <section className="container-wide border-t border-ink/15 py-24">
                <Reveal><SectionHead n="04" label="By the numbers" title="Small team. Big swing." className="max-w-2xl" /></Reveal>
                <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
                    <Reveal><Stat value={12} label="Week program" sub="beginner → capstone" /></Reveal>
                    <Reveal delay={80}><Stat value={16} suffix="+" label="Curriculum units" sub="Colab + lesson kits" /></Reveal>
                    <Reveal delay={160}><Stat value={100} suffix="%" label="Free & open-source" sub="forever, for schools" /></Reveal>
                    <Reveal delay={240}><Stat value={2} suffix="nd" label="Largest US district" sub="LAUSD, our first pilot" /></Reveal>
                </div>
            </section>

            {/* ================= (05) ROADMAP ================= */}
            <section className="container-wide border-t border-ink/15 py-24">
                <Reveal><SectionHead n="05" label="Where we're going" title="One district → a movement." className="max-w-2xl" /></Reveal>
                <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/15 bg-ink/15 md:grid-cols-3">
                    {[
                        { tag: "Today", items: ["12-week curriculum, open-sourced", "LAUSD classroom pilot underway", "Advisors from DeepMind & Data Herald", "Presented at LAUSD Innovation Expo"] },
                        { tag: "By 2026", items: ["10 partner schools across LA", "1,000+ students reached", "Full teacher-training toolkit", "Formal impact evaluation"] },
                        { tag: "The vision", items: ["Statewide adoption in California", "A national open-source standard", "Free forever for public schools", "Students shipping their own AI"] },
                    ].map((col) => (
                        <div key={col.tag} className="bg-paper p-8">
                            <span className="label text-accent">{col.tag}</span>
                            <ul className="mt-6 space-y-4">
                                {col.items.map((it) => (
                                    <li key={it} className="flex items-start gap-3 text-sm text-ink">
                                        <span className="mono mt-0.5 text-ink2">→</span>{it}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= CLOSING ================= */}
            <section className="container-wide border-t border-ink/15 py-28 text-center">
                <Reveal>
                    <p className="index-num">(06)</p>
                    <h2 className="display mx-auto mt-6 max-w-4xl text-4xl text-ink sm:text-7xl">
                        Put AI within reach of <span className="italic text-accent">every</span> student.
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-ink2">
                        We're seeking grant partners, schools, and mentors to scale a program that's
                        already in classrooms. Every dollar goes into free curriculum and teacher support.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Magnetic strength={0.4}><Link to="/contact" className="btn-primary" data-cursor>Become a partner</Link></Magnetic>
                        <Magnetic strength={0.4}><Link to="/program" className="btn-ghost" data-cursor>See the program</Link></Magnetic>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
