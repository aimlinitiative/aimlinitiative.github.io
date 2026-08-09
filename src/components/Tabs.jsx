import { useState } from "react";

/* Micron-style interactive tabbed panel.
 * items: [{ key, tab, title, body, stat, statLabel }] */
export default function Tabs({ items }) {
    const [active, setActive] = useState(0);
    const it = items[active];

    return (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* Tab rail */}
            <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                {items.map((t, i) => {
                    const on = i === active;
                    return (
                        <button
                            key={t.key}
                            onClick={() => setActive(i)}
                            className={`group relative shrink-0 rounded-xl border px-5 py-4 text-left transition lg:shrink ${
                                on ? "border-white/25 bg-ink-800/80" : "border-white/10 hover:border-white/20 hover:bg-white/5"
                            }`}
                        >
                            {on && <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full" style={{ backgroundImage: "linear-gradient(#b302e8,#ff5147)" }} />}
                            <div className="flex items-center gap-3">
                                <span className={`mono text-xs ${on ? "text-gradient" : "text-white/40"}`}>0{i + 1}</span>
                                <span className={`font-display text-sm font-semibold ${on ? "text-white" : "text-white/60"}`}>{t.tab}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Panel */}
            <div className="panel ring-grad p-7 sm:p-9">
                <div key={active} className="animate-fade-up">
                    <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{it.title}</h3>
                    <p className="mt-4 max-w-2xl text-white/60">{it.body}</p>
                    {it.stat && (
                        <div className="mt-8 flex items-end gap-4 border-t border-white/10 pt-6">
                            <span className="display text-5xl font-bold text-gradient sm:text-6xl">{it.stat}</span>
                            <span className="mono pb-2 text-xs uppercase tracking-wider text-white/45">{it.statLabel}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
