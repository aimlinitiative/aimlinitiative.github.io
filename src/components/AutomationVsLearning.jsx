import { useMemo, useState } from "react";

/* Interactive version of the real Unit 1 lesson
 * (u01_l01_foundations_intro_ai): rule-based automation (a thermostat)
 * vs a model that LEARNS pass/fail from study hours (logistic regression). */

// --- learning side: fit 1-D logistic regression on the lesson's data ---
const HRS = [1, 2, 3, 4, 5, 6];
const PASSED = [0, 0, 0, 1, 1, 1];
function fitLogReg() {
    let w = 0, b = 0;
    const lr = 0.5;
    for (let it = 0; it < 6000; it++) {
        let gw = 0, gb = 0;
        for (let i = 0; i < HRS.length; i++) {
            const p = 1 / (1 + Math.exp(-(w * HRS[i] + b)));
            gw += (p - PASSED[i]) * HRS[i];
            gb += p - PASSED[i];
        }
        w -= (lr * gw) / HRS.length;
        b -= (lr * gb) / HRS.length;
    }
    return { w, b };
}

export default function AutomationVsLearning() {
    const [temp, setTemp] = useState(64);
    const [hours, setHours] = useState(4.5);
    const { w, b } = useMemo(fitLogReg, []);

    // rule-based branch
    const branch = temp < 68 ? 0 : temp > 75 ? 2 : 1;
    const RULES = [
        { cond: "temp_f < 68", out: "Turn heater ON", color: "text-brand-400" },
        { cond: "68 ≤ temp_f ≤ 75", out: "Stay steady", color: "text-white/70" },
        { cond: "temp_f > 75", out: "Turn cooler ON", color: "text-amber-400" },
    ];

    // learned prediction
    const prob = 1 / (1 + Math.exp(-(w * hours + b)));
    const boundary = -b / w;

    // sigmoid path for svg (x: 0..8 hours -> 0..W, y: prob 1..0 -> 0..H)
    const W = 300, H = 120, PAD = 10;
    const xTo = (h) => PAD + (h / 8) * (W - 2 * PAD);
    const yTo = (p) => H - PAD - p * (H - 2 * PAD);
    const path = Array.from({ length: 81 }, (_, i) => {
        const h = (i / 80) * 8;
        const p = 1 / (1 + Math.exp(-(w * h + b)));
        return `${i === 0 ? "M" : "L"}${xTo(h).toFixed(1)},${yTo(p).toFixed(1)}`;
    }).join(" ");

    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {/* RULE-BASED */}
            <div className="panel overflow-hidden">
                <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
                    <span className="rounded-md bg-white/[0.06] px-2 py-0.5 mono text-[10px] uppercase tracking-wider text-white/60">Automation</span>
                    <span className="mono text-xs text-white/50">rules a human wrote</span>
                </div>
                <div className="p-5">
                    <h4 className="font-display font-semibold text-white">Thermostat</h4>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className="mono text-4xl font-bold text-white">{temp}</span>
                        <span className="mono text-sm text-white/40">°F</span>
                    </div>
                    <input type="range" min={55} max={85} value={temp} onChange={(e) => setTemp(+e.target.value)}
                        className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-500" />
                    <div className="mt-5 space-y-1.5">
                        {RULES.map((r, i) => (
                            <div key={i} className={`flex items-center justify-between rounded-lg border px-3 py-2 mono text-xs transition ${
                                branch === i ? "border-brand-500/50 bg-brand-500/10" : "border-white/[0.06] opacity-50"}`}>
                                <span className="text-white/60">if {r.cond}</span>
                                <span className={r.color}>{r.out}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-white/40">Every output was decided in advance by a person. No data, no learning.</p>
                </div>
            </div>

            {/* LEARNING-BASED */}
            <div className="panel overflow-hidden ring-grad">
                <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
                    <span className="rounded-md px-2 py-0.5 mono text-[10px] uppercase tracking-wider text-white" style={{ backgroundImage: "linear-gradient(100deg,#2563eb,#22d3ee)" }}>Learning</span>
                    <span className="mono text-xs text-white/50">fit from data · LogisticRegression</span>
                </div>
                <div className="p-5">
                    <h4 className="font-display font-semibold text-white">Will they pass?</h4>
                    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full">
                        <line x1={xTo(boundary)} y1={PAD} x2={xTo(boundary)} y2={H - PAD} stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
                        <path d={path} fill="none" stroke="#3b82f6" strokeWidth="2" />
                        {HRS.map((h, i) => (
                            <circle key={i} cx={xTo(h)} cy={yTo(PASSED[i])} r="4" fill={PASSED[i] ? "#22d3ee" : "#ffb020"} />
                        ))}
                        <line x1={xTo(hours)} y1={PAD} x2={xTo(hours)} y2={H - PAD} stroke="#fff" strokeWidth="1" />
                        <circle cx={xTo(hours)} cy={yTo(prob)} r="5" fill="#fff" />
                    </svg>
                    <div className="mt-1 flex justify-between mono text-[10px] text-white/30"><span>0 hrs</span><span>study time</span><span>8 hrs</span></div>
                    <input type="range" min={0} max={8} step={0.1} value={hours} onChange={(e) => setHours(+e.target.value)}
                        className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-500" />
                    <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                        <div>
                            <div className="mono text-xs text-white/40">{hours.toFixed(1)} hrs studied →</div>
                            <div className={`font-display text-lg font-bold ${prob > 0.5 ? "text-cyan-300" : "text-amber-400"}`}>{prob > 0.5 ? "PASS" : "FAIL"}</div>
                        </div>
                        <div className="text-right">
                            <div className="mono text-2xl font-bold text-gradient">{(prob * 100).toFixed(0)}%</div>
                            <div className="mono text-[10px] text-white/30">P(pass)</div>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-white/40">Nobody wrote this rule — the model <span className="text-brand-300">learned</span> the boundary (~{boundary.toFixed(1)} hrs) from six examples.</p>
                </div>
            </div>
        </div>
    );
}
