import Section from "../components/Section";

const UNITS = [
    { n: 1, t: "Foundations", d: "How machines learn from data." },
    { n: 2, t: "Building models", d: "Train, test and score a first classifier." },
    { n: 3, t: "Prediction and error", d: "Accuracy, precision, recall, and who the mistakes land on." },
    { n: 4, t: "Neural networks", d: "A small network, built step by step." },
    { n: 5, t: "Language and bias", d: "How language models work, and where they break." },
    { n: 6, t: "Capstone", d: "A project on a problem from the student's own neighborhood." },
];

// The template every lesson notebook follows.
const PARTS = ["Primer", "Predict before you run", "Guided activities", "Self-checks", "Ethics reflection", "Teacher key"];

export default function CurriculumSection() {
    return (
        <Section id="course" tag="The course" title="Twelve weeks, from how a model learns to a project of their own."
            intro="No coding background needed. Each unit is two weeks of Jupyter notebooks a teacher can run as written, for free.">
            <ol className="grid gap-px overflow-hidden rounded-card bg-line shadow-[0_0_0_1px_rgba(16,20,24,0.07)] sm:grid-cols-2 lg:grid-cols-3">
                {UNITS.map((u) => (
                    <li key={u.n} className={`p-6 lg:p-7 ${u.n === 6 ? "bg-sky" : "bg-white"}`}>
                        <div className="flex items-baseline justify-between">
                            <span className="font-mono text-tag font-semibold uppercase tracking-[0.06em] text-blue">Unit {u.n}</span>
                            <span className="font-mono text-tag text-dim">Weeks {2 * u.n - 1}–{2 * u.n}</span>
                        </div>
                        <h3 className="mt-4 font-display text-h3">{u.t}</h3>
                        <p className="mt-1.5 text-pretty text-small text-dim">{u.d}</p>
                    </li>
                ))}
            </ol>
            <div className="mx-auto mt-10 max-w-[52rem] text-center">
                <p className="text-small text-dim">Every lesson has the same six parts, so a teacher who has run one can run the next.</p>
                <ul className="mt-4 flex flex-wrap justify-center gap-2">
                    {PARTS.map((p, k) => (
                        <li key={p} className="glass rounded-full px-4 py-2 text-small font-medium">
                            <span className="mr-2 font-mono text-tag text-blue">{String(k + 1).padStart(2, "0")}</span>{p}
                        </li>
                    ))}
                </ul>
                <p className="mt-5 font-mono text-tag uppercase tracking-[0.06em] text-dim">Lesson 1 maps to CA CS standards 3A-IC-26 · 3A-DA-09 · 3B-AP-14</p>
            </div>
        </Section>
    );
}
