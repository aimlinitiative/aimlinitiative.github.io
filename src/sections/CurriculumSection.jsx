import Section from "../components/Section";

const UNITS = [
    { n: 1, weeks: "1–2", t: "Foundations", d: "How machines learn from data, and the difference between automation and learning." },
    { n: 2, weeks: "3–4", t: "Building models", d: "Train, test and score a first classifier." },
    { n: 3, weeks: "5–6", t: "Prediction and error", d: "Accuracy, precision and recall, and who a model's mistakes land on." },
    { n: 4, weeks: "7–8", t: "Neural networks", d: "A small network built step by step." },
    { n: 5, weeks: "9–10", t: "Language and bias", d: "How language models work, and where they break." },
    { n: 6, weeks: "11–12", t: "Capstone", d: "A project on a problem from the student's own school or neighborhood." },
];

// The template every lesson notebook follows.
const PARTS = [
    ["Primer", "The idea in plain language, before any code."],
    ["Predict before you run", "Students write down what they expect, then check."],
    ["Guided activities", "Python on real or simulated data."],
    ["Self-checks", "Cells that test the student's own answers."],
    ["Ethics reflection", "Who the result helps, and who it could hurt."],
    ["Teacher key", "Answers and notes, hidden from the student view."],
];

export default function CurriculumSection() {
    return (
        <Section id="course" tag="The course" title="Twelve weeks, from how a model learns to a project of their own."
            intro="No coding background needed. Each unit is two weeks of Jupyter notebooks a teacher can run as written.">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {UNITS.map((u) => (
                    <li key={u.n} className={`card p-6 ${u.n === 6 ? "bg-sky" : ""}`}>
                        <div className="flex items-center justify-between">
                            <span className="grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-ink font-display text-[1.125rem] font-extrabold">{u.n}</span>
                            <span className="tag">Weeks {u.weeks}</span>
                        </div>
                        <h3 className="mt-5 font-display text-h3">{u.t}</h3>
                        <p className="mt-2 text-pretty text-body text-dim">{u.d}</p>
                    </li>
                ))}
            </ol>

            <div className="mt-16 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <h3 className="font-display text-h3">Every lesson has the same six parts.</h3>
                    <p className="mt-3 text-pretty text-body text-dim">
                        A teacher who has run one lesson can run the next. Lesson 1 maps to California computer
                        science standards <span className="whitespace-nowrap">3A-IC-26</span>, <span className="whitespace-nowrap">3A-DA-09</span> and <span className="whitespace-nowrap">3B-AP-14</span>.
                    </p>
                </div>
                <dl className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
                    {PARTS.map(([t, d], k) => (
                        <div key={t} className="flex gap-4 border-t-[1.5px] border-ink py-4">
                            <span className="font-mono text-small font-semibold text-blue">{String(k + 1).padStart(2, "0")}</span>
                            <div>
                                <dt className="font-bold">{t}</dt>
                                <dd className="mt-0.5 text-small text-dim">{d}</dd>
                            </div>
                        </div>
                    ))}
                </dl>
            </div>
        </Section>
    );
}
