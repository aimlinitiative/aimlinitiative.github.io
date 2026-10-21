import { useState } from "react";
import Section from "../components/Section";

// The six units as the notebook files they are. Picking one shows what it covers.
const UNITS = [
    ["unit_01_foundations.ipynb", "Foundations", "How machines learn from data, and the difference between automation and learning."],
    ["unit_02_building_models.ipynb", "Building models", "Train, test and score a first classifier."],
    ["unit_03_prediction_error.ipynb", "Prediction and error", "Accuracy, precision and recall, and who a model's mistakes land on."],
    ["unit_04_neural_networks.ipynb", "Neural networks", "A small network, built step by step."],
    ["unit_05_language_bias.ipynb", "Language and bias", "How language models work, and where they break."],
    ["unit_06_capstone.ipynb", "Capstone", "A project on a problem from the student's own school or neighborhood."],
];

// Where the course stands on the way into LAUSD.
const PATH = [
    ["Taught at LACES", "4-week version", "done"],
    ["Working with LAUSD", "toward district-wide", "now"],
    ["Every LAUSD high school", "a standing elective", "next"],
];

export default function CurriculumSection() {
    const [u, setU] = useState(0);
    return (
        <Section id="course" tag="The course" title="A free AI course, headed into every LAUSD high school."
            intro="Twelve weeks of Jupyter notebooks a teacher can run as written. No coding background needed.">
            <ol className="mx-auto flex max-w-[52rem] items-start">
                {PATH.map(([t, d, s], k) => (
                    <li key={t} className="relative flex-1 text-center">
                        {k > 0 && <span aria-hidden="true" className={`absolute right-1/2 top-[0.6875rem] h-[2px] w-full ${s === "next" ? "border-t-2 border-dashed border-line" : "bg-blue"}`} />}
                        <span className={`relative mx-auto block h-6 w-6 rounded-full ${s === "next" ? "border-2 border-line bg-bg" : "bg-blue"}`}>
                            {s === "now" && <span className="absolute inset-0 animate-ping rounded-full bg-blue/40" />}
                        </span>
                        <p className="mt-3 font-display text-[1.0625rem] font-semibold leading-tight">{t}</p>
                        <p className="mt-0.5 text-small text-dim">{d}</p>
                    </li>
                ))}
            </ol>

            <div className="mx-auto mt-14 max-w-[64rem] overflow-hidden rounded-[18px] bg-[#0F1420] text-[#D8E1EC] shadow-[0_30px_60px_-30px_rgba(16,20,24,0.45)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F57]" /><span className="h-3 w-3 rounded-full bg-[#FEBC2E]" /><span className="h-3 w-3 rounded-full bg-[#28C840]" />
                    <span className="ml-3 font-mono text-[0.8125rem] text-white/50">aiml-li / course</span>
                </div>
                <div className="grid md:grid-cols-[18rem_1fr]">
                    <ul className="border-b border-white/10 py-2 md:border-b-0 md:border-r" role="tablist" aria-label="Units">
                        {UNITS.map(([f], k) => (
                            <li key={f}>
                                <button type="button" role="tab" aria-selected={k === u} onClick={() => setU(k)}
                                    className={`flex w-full items-center gap-2 px-4 py-2 text-left font-mono text-[0.8125rem] transition-colors ${k === u ? "bg-white/10 text-white" : "text-white/55 hover:text-white"}`}>
                                    <span className="text-[#F7A26B]">◆</span>{f}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div key={u} className="sched-in p-6 sm:p-8" role="tabpanel">
                        <p className="font-mono text-[0.8125rem] text-white/45">Unit {u + 1} · weeks {2 * u + 1}–{2 * u + 2}</p>
                        <h3 className="mt-2 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-white">{UNITS[u][1]}</h3>
                        <p className="mt-4 max-w-[30rem] text-pretty text-lead text-white/75">{UNITS[u][2]}</p>
                        <p className="mt-8 font-mono text-[0.8125rem] text-white/45">
                            primer → predict before you run → activities → self-checks → ethics → teacher key
                        </p>
                    </div>
                </div>
            </div>
            <p className="mx-auto mt-5 max-w-[64rem] text-center text-small text-dim">Lesson 1 maps to California CS standards 3A-IC-26, 3A-DA-09 and 3B-AP-14.</p>
        </Section>
    );
}
