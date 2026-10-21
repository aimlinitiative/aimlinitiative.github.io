import { useState } from "react";
import { RUNS } from "../lib/minilab";

const pct = (x) => `${(x * 100).toFixed(1)}%`;

function Bar({ label, value, color }) {
    return (
        <div>
            <div className="flex items-baseline justify-between font-mono text-[0.8125rem]">
                <span>{label}</span>
                <span className="font-semibold tabular-nums">{pct(value)}</span>
            </div>
            <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-elev">
                <div className={`h-full ${color} transition-[width] duration-500 ease-out`} style={{ width: pct(value) }} />
            </div>
        </div>
    );
}

/* Unit 1's ethics lab, one cell of it: pick how rare a scholarship winner is
 * and see what the notebook's model does. Every number is the notebook's own
 * output (see lib/minilab.js). */
export default function Lab() {
    const [i, setI] = useState(RUNS.length - 1);
    const run = RUNS[i];
    const base = RUNS[0];

    return (
        <figure className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="tag">Unit 1 · Lesson 1 · Ethics lab</span>
                <span className="tag text-blue">Try it</span>
            </div>
            <div className="p-5 sm:p-6">
                <h3 className="font-display text-h3">The scholarship screener</h3>

                <fieldset className="mt-5">
                    <legend className="text-small font-bold">How many applicants win?</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {RUNS.map((r, k) => (
                            <button key={r.label} type="button" onClick={() => setI(k)} aria-pressed={k === i}
                                className={`h-9 rounded-full border px-3.5 font-mono text-[0.8125rem] font-medium transition-colors ${k === i ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}>
                                {r.label}
                            </button>
                        ))}
                    </div>
                </fieldset>

                <pre className="mt-5 overflow-x-auto rounded-lg bg-ink px-4 py-3 font-mono text-[0.8125rem] leading-relaxed text-[#D8E1EC]">
                    <span className="text-[#8A97A8]"># fewer scholarships available</span>{"\n"}
                    new_positive_weight = <span className="text-[#F7A26B]">{run.weight}</span>
                </pre>

                <div className="mt-5 space-y-4" aria-live="polite">
                    <Bar label="Accuracy" value={run.accuracy} color="bg-blue" />
                    <Bar label="Real winners found" value={run.recall} color="bg-ora" />
                </div>

                <p className="mt-5 text-pretty text-body">
                    {i === 0
                        ? <>The model missed {run.missed} of {run.winners.toLocaleString()} real winners. Now make winning rarer.</>
                        : <>Accuracy went <b>up</b>, from {pct(base.accuracy)}. The model missed {run.missed} of {run.winners.toLocaleString()} real winners.</>}
                </p>
            </div>
        </figure>
    );
}
