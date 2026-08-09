/* The one spicy element: a big, outlined, auto-scrolling statement band.
 * Pauses on hover. */
export default function Marquee({ items }) {
    const row = [...items, ...items];
    return (
        <div className="marquee-mask group flex overflow-hidden py-8 sm:py-10">
            <div className="marquee-track flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused] sm:gap-16 sm:pr-16">
                {row.map((it, i) => (
                    <span key={i} className="flex shrink-0 items-center gap-10 sm:gap-16">
                        <span className={`display text-4xl font-bold tracking-tight sm:text-6xl ${i % 2 ? "text-outline" : "text-ink"}`}>{it}</span>
                        <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                    </span>
                ))}
            </div>
        </div>
    );
}
