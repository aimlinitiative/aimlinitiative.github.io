import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

const UNITS = [
    { wk: "01–02", title: "What is intelligence?", text: "Framing AI vs. ML vs. deep learning. Where these systems already shape students' lives — and where they fail." },
    { wk: "03", title: "Data & representation", text: "How the world becomes numbers. Features, labels, bias-in / bias-out, and why data choices are ethical choices." },
    { wk: "04–05", title: "Your first model", text: "Classification from scratch. Decision boundaries, train/test splits, and the intuition behind 'learning'." },
    { wk: "06", title: "How models learn", text: "Loss, gradients, and gradient descent — taught visually before any calculus, then connected to the code." },
    { wk: "07–08", title: "Neural networks", text: "Neurons, layers, and activation. Students train a real network in the browser (the demo on this site)." },
    { wk: "09", title: "Language & LLMs", text: "Tokens, embeddings, and what a chatbot actually does. Prompt literacy and where LLMs mislead." },
    { wk: "10", title: "Computer vision", text: "How machines 'see' — convolutions, image classifiers, and a hands-on build." },
    { wk: "11", title: "AI ethics & society", text: "Fairness, surveillance, labor, and misinformation. Students argue real cases, not abstractions." },
    { wk: "12", title: "Capstone project", text: "Each student ships an AI project of their own — from idea to working demo — and presents it." },
];

export default function Program() {
    return (
        <div className="container-page py-16 sm:py-20">
            <Reveal className="mx-auto max-w-3xl text-center">
                <span className="eyebrow">The program</span>
                <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                    A 12-week journey from <span className="text-gradient">curious</span> to{" "}
                    <span className="text-gradient">capable</span>.
                </h1>
                <p className="mt-5 text-lg text-white/60">
                    Our curriculum takes a student with zero background and walks them, week by week,
                    to shipping their own AI project. Every unit pairs a plain-language concept primer
                    with a hands-on Google Colab notebook, a teacher guide, and a check for understanding.
                </p>
            </Reveal>

            {/* Design principles */}
            <div className="mt-14 grid gap-6 md:grid-cols-3">
                {[
                    { title: "No-code to real-code", text: "Students start by manipulating models visually, then graduate to Python — nobody gets left at the door." },
                    { title: "Ethics woven in", text: "Every unit connects the tech to its human stakes. We're training citizens, not just coders." },
                    { title: "Teacher-ready", text: "Answer keys, pacing guides, and slide decks mean a non-CS teacher can run it with confidence." },
                ].map((p, i) => (
                    <Reveal key={p.title} delay={i * 90} className="glass glass-hover p-7">
                        <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/60">{p.text}</p>
                    </Reveal>
                ))}
            </div>

            {/* Curriculum timeline */}
            <Reveal className="mt-20">
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">The 12-week arc</h2>
                <p className="mt-2 text-white/50">16+ units of Colab notebooks and lesson kits — released open-source.</p>
            </Reveal>

            <div className="mt-10 space-y-3">
                {UNITS.map((u, i) => (
                    <Reveal
                        key={u.title}
                        delay={Math.min(i * 40, 240)}
                        className="glass glass-hover flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:gap-6"
                    >
                        <div className="flex-shrink-0 sm:w-24">
                            <span className="font-mono text-sm font-semibold text-brand-300">Wk {u.wk}</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-display text-lg font-semibold text-white">{u.title}</h3>
                            <p className="mt-1 text-sm text-white/55">{u.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* CTA */}
            <Reveal className="mt-16 glass flex flex-col items-center gap-5 p-10 text-center">
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    Want the full curriculum for your classroom?
                </h2>
                <p className="max-w-xl text-white/60">
                    It's free and open-source. Reach out and we'll help you get it running — and
                    train your teachers to deliver it.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link to="/contact" className="btn-primary">Bring AIML-LI to your school</Link>
                    <Link to="/demo" className="btn-ghost">Try the live demo</Link>
                </div>
            </Reveal>
        </div>
    );
}
