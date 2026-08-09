import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

const UNITS = [
    { wk: "01–02", title: "What is intelligence?", text: "AI vs. ML vs. deep learning. Where these systems already shape students' lives — and where they fail." },
    { wk: "03", title: "Data & representation", text: "How the world becomes numbers. Features, labels, bias-in / bias-out, and why data choices are ethical choices." },
    { wk: "04–05", title: "Your first model", text: "Classification from scratch. Decision boundaries, train/test splits, and the intuition behind 'learning'." },
    { wk: "06", title: "How models learn", text: "Loss, gradients, and gradient descent — taught visually before any calculus, then connected to code." },
    { wk: "07–08", title: "Neural networks", text: "Neurons, layers, and activation. Students train a real network in the browser (the demo on this site)." },
    { wk: "09", title: "Language & LLMs", text: "Tokens, embeddings, and what a chatbot actually does. Prompt literacy and where LLMs mislead." },
    { wk: "10", title: "Computer vision", text: "How machines 'see' — convolutions, image classifiers, and a hands-on build." },
    { wk: "11", title: "AI ethics & society", text: "Fairness, surveillance, labor, and misinformation. Students argue real cases, not abstractions." },
    { wk: "12", title: "Capstone project", text: "Each student ships an AI project of their own — from idea to working demo — and presents it." },
];

export default function Program() {
    return (
        <div className="container-wide py-16 sm:py-24">
            <Reveal className="max-w-4xl">
                <div className="flex items-center gap-3">
                    <span className="index-num">(01)</span>
                    <span className="label">The program</span>
                </div>
                <h1 className="display mt-6 text-5xl text-ink sm:text-7xl">
                    From <span className="italic text-accent">curious</span> to capable in 12 weeks.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-ink2">
                    Our curriculum takes a student with zero background and walks them, week by week, to
                    shipping their own AI project. Every unit pairs a plain-language concept primer with
                    a hands-on Colab notebook, a teacher guide, and a check for understanding.
                </p>
            </Reveal>

            {/* Principles */}
            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/15 bg-ink/15 md:grid-cols-3">
                {[
                    { title: "No-code → real-code", text: "Students start by manipulating models visually, then graduate to Python — nobody gets left at the door." },
                    { title: "Ethics woven in", text: "Every unit connects the tech to its human stakes. We train citizens, not just coders." },
                    { title: "Teacher-ready", text: "Answer keys, pacing guides, and slide decks let a non-CS teacher run it with confidence." },
                ].map((p) => (
                    <Reveal key={p.title} className="bg-paper p-8">
                        <h3 className="serif text-xl font-medium text-ink">{p.title}</h3>
                        <p className="mt-3 text-sm text-ink2">{p.text}</p>
                    </Reveal>
                ))}
            </div>

            {/* Timeline */}
            <section className="mt-24">
                <Reveal>
                    <h2 className="display text-3xl text-ink sm:text-5xl">The 12-week arc</h2>
                    <p className="mono mt-3 text-xs uppercase tracking-wider text-ink2">16+ units of Colab notebooks & lesson kits — open-source</p>
                </Reveal>
                <div className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
                    {UNITS.map((u) => (
                        <Reveal key={u.title}>
                            <div className="group grid grid-cols-[4rem_1fr] gap-5 py-7 sm:grid-cols-[6rem_1fr_1.5fr] sm:gap-10">
                                <span className="mono text-sm text-accent">Wk {u.wk}</span>
                                <h3 className="serif text-xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl">{u.title}</h3>
                                <p className="col-span-2 text-sm text-ink2 sm:col-span-1">{u.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <Reveal className="mt-24 text-center">
                <h2 className="display text-3xl text-ink sm:text-5xl">Want it for your classroom?</h2>
                <p className="mx-auto mt-4 max-w-xl text-ink2">It's free and open-source. We'll help you get it running — and train your teachers to deliver it.</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Magnetic strength={0.4}><Link to="/contact" className="btn-primary" data-cursor>Bring AIML-LI to your school</Link></Magnetic>
                    <Magnetic strength={0.4}><Link to="/demo" className="btn-ghost" data-cursor>Try the live demo</Link></Magnetic>
                </div>
            </Reveal>
        </div>
    );
}
