import { useState } from "react";

/* Interactive 12-week syllabus explorer (Linear-style product tour).
 * Click a week on the left; its detail expands on the right (desktop)
 * or inline below it (mobile). Weeks are grouped into four color-coded phases. */

const PHASES = {
    found:  { label: "Foundations",         dot: "bg-brand-blue",   text: "text-brand-blue",   soft: "bg-brand-blue/10" },
    ml:     { label: "Machine learning",    dot: "bg-brand-teal",   text: "text-brand-teal",   soft: "bg-brand-teal/10" },
    deep:   { label: "Neural nets & LLMs",  dot: "bg-brand-violet", text: "text-brand-violet", soft: "bg-brand-violet/10" },
    ethics: { label: "Ethics & capstone",   dot: "bg-brand-amber",  text: "text-brand-amber",  soft: "bg-brand-amber/10" },
};

const WEEKS = [
    { p: "found",  t: "What is AI, really?",        d: "Cut through the hype: where AI already shapes daily life, and the real difference between AI, machine learning, and plain automation.", build: ["An “AI in your day” audit", "A shared class glossary"] },
    { p: "found",  t: "Thinking in data",           d: "Models learn from examples. Features, labels, and why messy or skewed data quietly decides everything downstream.", build: ["Collect and clean a small dataset", "Spot where bias sneaks in"] },
    { p: "found",  t: "Your first model",           d: "How a model turns examples into predictions — and why we split data into training and testing.", build: ["Train a simple classifier", "Compare hand-written rules vs. learned behavior"] },
    { p: "ml",     t: "Teaching machines to sort",  d: "Classification from the inside: decision boundaries, and what “accuracy” actually measures.", build: ["A working image or text classifier", "A confusion-matrix read-out"] },
    { p: "ml",     t: "Predicting numbers",         d: "Regression, trends, and the twin traps of over- and under-fitting.", build: ["Predict a real-world value from data", "Tune a model to fit, not memorize"] },
    { p: "ml",     t: "Is the model any good?",     d: "Accuracy isn’t enough. Precision, recall, and honest error analysis.", build: ["Audit a model’s mistakes", "Write a one-page model report"] },
    { p: "deep",   t: "Neural networks",            d: "Neurons, layers, and weights — what “deep learning” really means, minus the mysticism.", build: ["Train a tiny neural net in the browser", "Watch it learn a boundary live"] },
    { p: "deep",   t: "How machines see",           d: "Computer-vision intuition: from pixels to features to recognition.", build: ["Build an image recognizer", "Break it on purpose to find its limits"] },
    { p: "deep",   t: "Language & LLMs",            d: "Tokens, next-word prediction, and prompting — how tools like ChatGPT actually work.", build: ["Prompt and probe a language model", "Map where it’s confident vs. guessing"] },
    { p: "ethics", t: "Bias & fairness",            d: "Where bias comes from, who it harms, and how to test for it.", build: ["Find and document bias in a model", "Draft a fairness checklist"] },
    { p: "ethics", t: "AI in society",              d: "Jobs, privacy, misinformation, and the policy debates shaping AI’s future.", build: ["A stance memo on a real AI issue", "A structured class debate"] },
    { p: "ethics", t: "Capstone project",          d: "Design, build, and present your own AI project to peers and mentors.", build: ["Ship an original AI project", "Present it at demo day"] },
];

const num = (i) => String(i + 1).padStart(2, "0");

function Detail({ i }) {
    const w = WEEKS[i];
    const ph = PHASES[w.p];
    return (
        <div className="card">
            <div className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em]">
                <span className={`h-1.5 w-1.5 rounded-full ${ph.dot}`} />
                <span className={ph.text}>{ph.label}</span>
                <span className="text-faint">· Week {num(i)}</span>
            </div>
            <h3 className="display mt-4 text-2xl font-bold tracking-tight text-ink">{w.t}</h3>
            <p className="mt-3 leading-relaxed text-muted">{w.d}</p>
            <div className="mt-6 border-t border-line pt-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-faint">What you'll build</p>
                <ul className="mt-3 space-y-2.5">
                    {w.build.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-muted">
                            <svg className={`mt-1 h-4 w-4 shrink-0 ${ph.text}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function Curriculum() {
    const [active, setActive] = useState(0);

    return (
        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
            {/* Week list */}
            <div className="flex flex-col gap-1">
                {WEEKS.map((w, i) => {
                    const ph = PHASES[w.p];
                    const on = i === active;
                    return (
                        <div key={i}>
                            <div className={`rounded-xl transition-colors duration-200 ${on ? ph.soft : "hover:bg-black/[0.035]"}`}>
                                <button
                                    onClick={() => setActive(i)}
                                    aria-expanded={on}
                                    className="focusable flex w-full items-center gap-3 px-3.5 py-3 text-left"
                                >
                                    <span className={`h-2 w-2 shrink-0 rounded-full ${ph.dot} ${on ? "" : "opacity-40"}`} />
                                    <span className="font-mono text-xs text-faint">W{num(i)}</span>
                                    <span className={`text-[15px] font-medium ${on ? "text-ink" : "text-muted"}`}>{w.t}</span>
                                </button>
                            </div>
                            {/* Mobile inline detail */}
                            {on && (
                                <div className="mt-2 mb-3 lg:hidden">
                                    <Detail i={i} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Desktop detail pane */}
            <div className="hidden lg:block">
                <div className="sticky top-24">
                    <Detail i={active} />
                </div>
            </div>
        </div>
    );
}
