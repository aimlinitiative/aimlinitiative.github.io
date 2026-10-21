import Note from "../components/Note";
import { PARTNERS } from "../lib/partners";

const HEAD = "AI class for every LA public school student.";

// What AIML-LI does, in the three things a visitor should leave knowing.
const THREE = [
    { k: "01", n: "12 weeks", t: "A free AI course", d: "Six units of notebooks a teacher can run as written. A four-week version ran at LACES; now piloting with LAUSD.", href: "#course" },
    { k: "02", n: "500+", t: "The LA Student AI Summit", d: "One free Saturday of keynotes and a hackathon for LA public school students, late Nov or early Dec 2026.", href: "#summit" },
    { k: "03", n: "9", t: "Committed partners", d: "Google DeepMind, Microsoft, Google, Snap, Jane Street, MongoDB, Confluent, Discovery Education and Hacker Fund.", href: "#partners" },
];

export default function Hero() {
    const words = HEAD.split(" ");
    return (
        <section id="top" className="px-4 pt-32 sm:pt-40">
            <div className="mx-auto max-w-[62rem] text-center">
                <a href="#summit" className="glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[0.8125rem] font-medium">
                    <span className="rounded-full bg-blue px-2.5 py-0.5 text-white">New</span>
                    LA Student AI Summit<span className="hidden sm:inline"> · 500+ students · this fall</span> <span aria-hidden="true">→</span>
                </a>
                <h1 className="mt-7 text-balance font-display text-hero">
                    {words.map((w, i) => (
                        <span key={i}><span className="rise" style={{ animationDelay: `${i * 60}ms` }}>
                            {w === "every" ? <span className="font-hand font-semibold tracking-[-0.02em] text-blue">every</span> : w}
                        </span>{i < words.length - 1 ? " " : ""}</span>
                    ))}
                </h1>
                <p className="mx-auto mt-6 max-w-[38rem] text-pretty text-lead text-dim">
                    AIML-LI is a student-run nonprofit in Los Angeles. We wrote a free course on how AI works, and we're
                    bringing 500+ students together to learn from the people who build it.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a href="#summit" className="btn-primary">See the summit</a>
                    <a href="#involved" className="btn-outline">Partner with us</a>
                </div>
                <div className="relative mx-auto mt-3 hidden h-10 max-w-[30rem] sm:block">
                    <Note dir="up" className="absolute left-[56%] top-1">sponsors, venues, mentors: start here</Note>
                </div>
            </div>

            <div className="mx-auto mt-12 max-w-[70rem] sm:mt-6">
                <p className="text-center tag">Committed to the summit</p>
                <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                    {PARTNERS.map((p) => (
                        <li key={p.name}><img src={p.logo} alt={p.name} style={{ height: Math.round(p.h * 0.85) }} className="w-auto opacity-85 transition-opacity hover:opacity-100" decoding="async" /></li>
                    ))}
                </ul>
            </div>

            <ol className="mx-auto mt-20 grid max-w-[70rem] gap-4 md:grid-cols-3">
                {THREE.map((x) => (
                    <li key={x.k}>
                        <a href={x.href} className="card group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 lg:p-7">
                            <span className="font-mono text-tag text-dim">{x.k}</span>
                            <span className="mt-4 font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] text-blue">{x.n}</span>
                            <span className="mt-3 font-display text-h3">{x.t}</span>
                            <span className="mt-2 flex-1 text-pretty text-small text-dim">{x.d}</span>
                            <span className="mt-5 text-small font-semibold text-ink group-hover:text-blue">Read more →</span>
                        </a>
                    </li>
                ))}
            </ol>
        </section>
    );
}
