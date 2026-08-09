import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-Founder · Curriculum", initials: "AE" },
    { name: "Michael Tarekegn", role: "Co-Founder · Curriculum", initials: "MT" },
    { name: "Ibrahim Piri", role: "Engineering · Platform", initials: "IP" },
];

const VALUES = [
    { t: "Free, forever", d: "Cost is the barrier we exist to remove. Our curriculum is open-source and always free to public schools." },
    { t: "Rigor without gatekeeping", d: "Real ML concepts, taught so any motivated student can follow — no elite prerequisites." },
    { t: "Evidence over hype", d: "We pilot, measure, and iterate in real classrooms instead of shipping slides and assuming impact." },
    { t: "Ethics as core content", d: "Understanding AI's power and its harms isn't an add-on — it's woven through every unit." },
];

export default function About() {
    return (
        <div className="container-wide py-16 sm:py-24">
            {/* Mission */}
            <Reveal className="max-w-4xl">
                <div className="flex items-center gap-3">
                    <span className="index-num">(03)</span>
                    <span className="label">Our mission</span>
                </div>
                <h1 className="display mt-6 text-4xl text-ink sm:text-7xl">
                    Equip the next generation to <span className="italic text-accent">build</span> AI — not just be shaped by it.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-ink2">
                    The AI/ML Literacy Initiative (AIML-LI) is a nonprofit closing the AI opportunity
                    gap in public education. We build open-source, standards-aligned AI curriculum and
                    put it directly into classrooms — starting with the nation's second-largest
                    district, LAUSD.
                </p>
            </Reveal>

            {/* Theory of change */}
            <section className="mt-24">
                <Reveal><h2 className="display text-3xl text-ink sm:text-5xl">How change actually happens</h2></Reveal>
                <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/15 bg-ink/15 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { n: "01", t: "Build great curriculum", d: "Design a genuinely excellent, ethics-forward AI course that works for beginners." },
                        { n: "02", t: "Prove it in classrooms", d: "Pilot with real public-school teachers and students; gather evidence; iterate." },
                        { n: "03", t: "Open-source everything", d: "Release it free so any school can adopt it without budget as a barrier." },
                        { n: "04", t: "Scale through partners", d: "Train teachers and grow district by district into a national standard." },
                    ].map((s) => (
                        <Reveal key={s.n} className="bg-paper p-8">
                            <div className="index-num">{s.n}</div>
                            <h3 className="serif mt-3 text-xl font-medium text-ink">{s.t}</h3>
                            <p className="mt-2 text-sm text-ink2">{s.d}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="mt-24">
                <Reveal><h2 className="display text-3xl text-ink sm:text-5xl">Principles we won't compromise</h2></Reveal>
                <div className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
                    {VALUES.map((v) => (
                        <Reveal key={v.t}>
                            <div className="group grid grid-cols-1 gap-3 py-8 sm:grid-cols-[1fr_1.4fr] sm:gap-10">
                                <h3 className="serif text-2xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-2">{v.t}</h3>
                                <p className="text-ink2">{v.d}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="mt-24">
                <Reveal><h2 className="display text-3xl text-ink sm:text-5xl">Built by people who teach it</h2></Reveal>
                <div className="mt-12 grid gap-8 sm:grid-cols-3">
                    {TEAM.map((m) => (
                        <Reveal key={m.name}>
                            <div className="border-t border-ink/15 pt-6">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-ink/20 serif text-2xl font-medium text-ink">{m.initials}</div>
                                <h3 className="serif mt-5 text-xl font-medium text-ink">{m.name}</h3>
                                <p className="mono mt-1 text-xs uppercase tracking-wider text-accent">{m.role}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Advisors */}
            <Reveal className="mt-24 border-t border-ink/15 pt-16">
                <span className="label">Advisors & recognition</span>
                <p className="serif mt-6 max-w-3xl text-2xl font-medium leading-snug text-ink sm:text-3xl">
                    Advised by practitioners from <span className="italic">Google DeepMind</span> and{" "}
                    <span className="italic">Data Herald (YC W21)</span>. We presented the program at the
                    LAUSD Innovation Expo, and have built in the open since 2023.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    {["Google DeepMind", "Data Herald · YC W21", "LAUSD Pilot", "Innovation Expo", "Est. 2023"].map((b) => (
                        <span key={b} className="mono rounded-full border border-ink/25 px-4 py-1.5 text-xs text-ink">{b}</span>
                    ))}
                </div>
            </Reveal>

            <Reveal className="mt-24 text-center">
                <h2 className="display text-3xl text-ink sm:text-5xl">We're just getting started.</h2>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Magnetic strength={0.4}><Link to="/contact" className="btn-primary" data-cursor>Get in touch</Link></Magnetic>
                    <Magnetic strength={0.4}><Link to="/program" className="btn-ghost" data-cursor>See the program</Link></Magnetic>
                </div>
            </Reveal>
        </div>
    );
}
