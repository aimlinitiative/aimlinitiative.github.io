/* Section kicker: a numbered index in a sleek blue tint + the label in the
 * display font (Space Grotesk), uppercase and spaced. Replaces the old dot eyebrow. */

// Deep -> light blue tint scale (sleek, single-hue)
export const BLUE = ["#1B3F73", "#22508F", "#2C63B0", "#3D77C9", "#5A8DD6", "#84A9E0"];

export default function SectionLabel({ n, children, className = "" }) {
    const idx = Math.max(0, parseInt(n, 10) - 1) % BLUE.length;
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <span className="font-mono text-[13px] font-bold tabular-nums" style={{ color: BLUE[idx] }}>{n}</span>
            <span className="display text-[12px] font-semibold uppercase tracking-[0.22em] text-ink/75">{children}</span>
        </div>
    );
}
