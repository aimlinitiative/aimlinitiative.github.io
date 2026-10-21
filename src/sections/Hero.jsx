import Note from "../components/Note";
import { PARTNERS } from "../lib/partners";
import Logo from "../components/Logo";

const HEAD = "AI class for every LA public school student.";


export default function Hero() {
    const words = HEAD.split(" ");
    return (
        <section id="top" className="px-4 pt-32 sm:pt-40">
            <div className="mx-auto max-w-[62rem] text-center">
                <a href="#summit" className="glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[0.8125rem] font-medium">
                    <span className="rounded-full bg-blue px-2.5 py-0.5 text-white">New</span>
                    LA Student AI Summit<span className="hidden sm:inline"> · LACES · Feb 6, 2027</span> <span aria-hidden="true">→</span>
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
                    <Note dir="up" className="absolute left-[56%] top-1">sponsors and mentors: start here</Note>
                </div>
            </div>

            <div className="mx-auto mt-12 max-w-[70rem] sm:mt-6">
                <p className="text-center tag">Committed to the summit</p>
                <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                    {PARTNERS.map((p) => (
                        <li key={p.name}><Logo p={p} scale={0.85} /></li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
