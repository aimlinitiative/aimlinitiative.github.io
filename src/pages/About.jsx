import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

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
            <Reveal className="max-w-4xl">
                <span className="label">Our mission</span>
                <h1 className="display mt-5 text-4xl text-white sm:text-7xl">
                    Equip the next generation to <span className="text-gradient">build</span> AI — not just be shaped by it.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-white/60">
                    The AI/ML Literacy Initiative (AIML-LI) is a nonprofit closing the AI opportunity
                    gap in public education. We build open-source, standards-aligned AI curriculum and
                    put it directly into classrooms — starting with the nation's second-largest
                    district, LAUSD.
                </p>
            </Reveal>

            <section className="mt-24">
                <Reveal><h2 className="display text-3xl text-white sm:text-5xl">How change actually happens</h2></Reveal>
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { n: "01", t: "Build great curriculum", d: "Design a genuinely excellent, ethics-forward AI course that works for beginners." },
                        { n: "02", t: "Prove it in classrooms", d: "Pilot with real public-school teachers and students; gather evidence; iterate." },
                        { n: "03", t: "Open-source everything", d: "Release it free so any school can adopt it without budget as a barrier." },
                        { n: "04", t: "Scale through partners", d: "Train teachers and grow district by district into a national standard." },
                    ].map((s, i) => (
                        <Reveal key={s.n} delay={i * 90}>
                            <div className="panel h-full p-6">
                                <div className="index-num text-lg">{s.n}</div>
                                <h3 className="mt-3 font-display text-lg font-bold text-white">{s.t}</h3>
                                <p className="mt-2 text-sm text-white/55">{s.d}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mt-24">
                <Reveal><h2 className="display text-3xl text-white sm:text-5xl">Principles we won't compromise</h2></Reveal>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    {VALUES.map((v, i) => (
                        <Reveal key={v.t} delay={i * 80}>
                            <div className="panel ring-grad panel-hover h-full p-7">
                                <h3 className="font-display text-lg font-bold text-white">{v.t}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/60">{v.d}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mt-24">
                <Reveal><h2 className="display text-3xl text-white sm:text-5xl">Built by people who teach it</h2></Reveal>
                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                    {TEAM.map((m, i) => (
                        <Reveal key={m.name} delay={i * 100}>
                            <div className="panel h-full p-7 text-center">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl font-display text-2xl font-bold text-white" style={{ backgroundImage: "linear-gradient(135deg,#b302e8,#ff5147)" }}>{m.initials}</div>
                                <h3 className="mt-5 font-display text-lg font-bold text-white">{m.name}</h3>
                                <p className="mono mt-1 text-xs uppercase tracking-wider text-[#c76bff]">{m.role}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <Reveal className="mt-24 panel ring-grad p-8 sm:p-10">
                <span className="label">Advisors & recognition</span>
                <p className="mt-5 max-w-3xl text-2xl font-medium leading-snug text-white sm:text-3xl">
                    Advised by practitioners from <span className="text-gradient">Google DeepMind</span> and{" "}
                    <span className="text-gradient">Data Herald (YC W21)</span>. We presented the program at the
                    LAUSD Innovation Expo, and have built in the open since 2023.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    {["Google DeepMind", "Data Herald · YC W21", "LAUSD Pilot", "Innovation Expo", "Est. 2023"].map((b) => (
                        <span key={b} className="mono rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/75">{b}</span>
                    ))}
                </div>
            </Reveal>

            <Reveal className="mt-24 text-center">
                <h2 className="display text-3xl text-white sm:text-5xl">We're just getting started.</h2>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link to="/contact" className="btn-primary">Get in touch</Link>
                    <Link to="/program" className="btn-ghost">See the program</Link>
                </div>
            </Reveal>
        </div>
    );
}
