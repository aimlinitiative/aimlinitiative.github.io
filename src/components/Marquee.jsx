/* Infinite horizontal marquee. Duplicates its items so the loop is seamless. */
export default function Marquee({ items, className = "" }) {
    const row = [...items, ...items];
    return (
        <div className={`group relative flex overflow-hidden ${className}`}>
            <div className="marquee-track flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
                {row.map((it, i) => (
                    <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-medium text-white/45">
                        {it}
                        <span className="text-brand-500">/</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
