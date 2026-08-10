/* A quiet, refined keyword ticker — small caps, muted, separated by accent dots. */
export default function Marquee({ items }) {
    const row = [...items, ...items];
    return (
        <div className="marquee-mask group flex overflow-hidden py-5">
            <div className="marquee-track flex shrink-0 items-center group-hover:[animation-play-state:paused]">
                {row.map((it, i) => (
                    <span key={i} className="flex shrink-0 items-center">
                        <span className="font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-muted">{it}</span>
                        <span className="mx-8 h-1 w-1 shrink-0 rounded-full bg-accent sm:mx-10" />
                    </span>
                ))}
            </div>
        </div>
    );
}
