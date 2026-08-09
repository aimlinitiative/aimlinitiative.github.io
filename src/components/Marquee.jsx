/* Infinite horizontal marquee. Duplicates its items so the loop is seamless. */
export default function Marquee({ items, className = "" }) {
    const row = [...items, ...items];
    return (
        <div className={`group relative flex overflow-hidden ${className}`}>
            <div className="marquee-track flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
                {row.map((it, i) => (
                    <span key={i} className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-white/45">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/70" />
                        {it}
                    </span>
                ))}
            </div>
        </div>
    );
}
