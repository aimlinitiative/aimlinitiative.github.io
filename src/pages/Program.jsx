import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

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
                <span className="label">The program</span>
                <h1 className="display mt-5 text-5xl text-white sm:text-7xl">
                    From <span className="text-gradient">curious</span> to capable in 12 weeks.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-white/60">
                    Our curriculum takes a student with zero background and walks them, week by week, to
                    shipping their own AI project. Every unit pairs a plain-language concept primer with
                    a hands-on Colab notebook, a teacher guide, and a check for understanding.
                </p>
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
                {[
                    { title: "No-code → real-code", text: "Students start by manipulating models visually, then graduate to Python — nobody gets left at the door." },
                    { title: "Ethics woven in", text: "Every unit connects the tech to its human stakes. We train citizens, not just coders." },
                    { title: "Teacher-ready", text: "Answer keys, pacing guides, and slide decks let a non-CS teacher run it with confidence." },
                ].map((p, i) => (
                    <Reveal key={p.title} delay={i * 90}>
                        <div className="panel ring-grad panel-hover h-full p-7">
                            <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                            <p className="mt-3 text-sm text-white/60">{p.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>

            <section className="mt-24">
                <Reveal>
                    <h2 className="display text-3xl text-white sm:text-5xl">The 12-week arc</h2>
                    <p className="mono mt-3 text-xs uppercase tracking-wider text-white/45">16+ units of Colab notebooks & lesson kits — open-source</p>
                </Reveal>
                <div className="mt-10 space-y-3">
                    {UNITS.map((u, i) => (
                        <Reveal key={u.title} delay={Math.min(i * 40, 240)}>
                            <div className="panel panel-hover flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:gap-8">
                                <span className="mono text-sm text-gradient font-semibold sm:w-24">Wk {u.wk}</span>
                                <h3 className="font-display text-lg font-semibold text-white sm:w-64">{u.title}</h3>
                                <p className="flex-1 text-sm text-white/55">{u.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <Reveal className="mt-24 text-center">
                <h2 className="display text-3xl text-white sm:text-5xl">Want it for your classroom?</h2>
                <p className="mx-auto mt-4 max-w-xl text-white/60">It's free and open-source. We'll help you get it running — and train your teachers to deliver it.</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link to="/contact" className="btn-primary">Bring AIML-LI to your school</Link>
                    <Link to="/demo" className="btn-ghost">Try the live demo</Link>
                </div>
            </Reveal>
        </div>
    );
}
