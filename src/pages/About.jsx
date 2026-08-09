import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-Founder · Curriculum", initials: "AE" },
    { name: "Michael Tarekegn", role: "Co-Founder · Curriculum", initials: "MT" },
    { name: "Ibrahim Piri", role: "Engineering · Platform", initials: "IP" },
];

const VALUES = [
    { t: "Free, forever", d: "Cost is the barrier we exist to remove. Our curriculum is open-source and will always be free to public schools." },
    { t: "Rigor without gatekeeping", d: "Real ML concepts, taught so any motivated student can follow — no elite prerequisites." },
    { t: "Evidence over hype", d: "We pilot, measure, and iterate in real classrooms instead of shipping slides and assuming impact." },
    { t: "Ethics as core content", d: "Understanding AI's power and its harms is not an add-on — it's woven through every unit." },
];

export default function About() {
    return (
        <div className="container-page py-16 sm:py-20">
            {/* Mission */}
            <Reveal className="mx-auto max-w-3xl text-center">
                <span className="eyebrow">Our mission</span>
                <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                    Equip the next generation to build AI — not just be shaped by it.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-white/65">
                    The AI/ML Literacy Initiative (AIML-LI) is a nonprofit closing the AI opportunity
                    gap in public education. We build open-source, standards-aligned AI curriculum and
                    put it directly into classrooms — starting with the nation's second-largest
                    district, LAUSD.
                </p>
            </Reveal>

            {/* Theory of change */}
            <div className="mx-auto mt-20 max-w-5xl">
                <Reveal>
                    <span className="eyebrow">Theory of change</span>
                    <h2 className="mt-5 font-display text-3xl font-bold text-white">How change actually happens</h2>
                </Reveal>
                <div className="mt-10 grid gap-6 md:grid-cols-4">
                    {[
                        { n: "01", t: "Build great curriculum", d: "Design a genuinely excellent, ethics-forward AI course that works for beginners." },
                        { n: "02", t: "Prove it in classrooms", d: "Pilot with real public-school teachers and students; gather evidence; iterate." },
                        { n: "03", t: "Open-source everything", d: "Release it free so any school can adopt it without budget as a barrier." },
                        { n: "04", t: "Scale through partners", d: "Train teachers and grow district by district into a national standard." },
                    ].map((s, i) => (
                        <Reveal key={s.t} delay={i * 90} className="glass p-6">
                            <div className="font-mono text-sm font-bold text-brand-300">{s.n}</div>
                            <h3 className="mt-3 font-semibold text-white">{s.t}</h3>
                            <p className="mt-2 text-sm text-white/55">{s.d}</p>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Values */}
            <div className="mx-auto mt-20 max-w-5xl">
                <Reveal>
                    <span className="eyebrow">What we believe</span>
                    <h2 className="mt-5 font-display text-3xl font-bold text-white">Principles we won't compromise</h2>
                </Reveal>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    {VALUES.map((v, i) => (
                        <Reveal key={v.t} delay={i * 80} className="glass glass-hover p-7">
                            <h3 className="font-display text-lg font-bold text-white">{v.t}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/60">{v.d}</p>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Team */}
            <div className="mx-auto mt-20 max-w-5xl">
                <Reveal>
                    <span className="eyebrow">The team</span>
                    <h2 className="mt-5 font-display text-3xl font-bold text-white">Built by people who teach it</h2>
                </Reveal>
                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                    {TEAM.map((m, i) => (
                        <Reveal key={m.name} delay={i * 100} className="glass glass-hover p-7 text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-cyan-500 font-display text-2xl font-bold text-white">
                                {m.initials}
                            </div>
                            <h3 className="mt-5 font-display text-lg font-bold text-white">{m.name}</h3>
                            <p className="mt-1 text-sm text-brand-300">{m.role}</p>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Advisors / credibility */}
            <Reveal className="mx-auto mt-20 max-w-5xl glass p-8 sm:p-10">
                <span className="eyebrow">Advisors & recognition</span>
                <h2 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">
                    Guided by practitioners at the frontier
                </h2>
                <p className="mt-4 max-w-2xl text-white/60">
                    Our work is advised by practitioners from <strong className="text-white/85">Google
                    DeepMind</strong> and <strong className="text-white/85">Data Herald (YC W21)</strong>,
                    and we presented the program at the <strong className="text-white/85">LAUSD
                    Innovation Expo</strong>. We founded AIML-LI in 2023 and have been building in the
                    open ever since.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    {["Google DeepMind", "Data Herald · YC W21", "LAUSD Pilot", "LAUSD Innovation Expo", "Est. 2023"].map((b) => (
                        <span key={b} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                            {b}
                        </span>
                    ))}
                </div>
            </Reveal>

            <Reveal className="mt-16 text-center">
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    We're just getting started.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-white/60">
                    If you fund education, run a school, or want to help teach — let's talk.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link to="/contact" className="btn-primary">Get in touch</Link>
                    <Link to="/program" className="btn-ghost">See the program</Link>
                </div>
            </Reveal>
        </div>
    );
}
