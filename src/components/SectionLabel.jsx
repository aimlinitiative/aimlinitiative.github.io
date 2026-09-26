/* Section kicker: a numbered index in a sleek blue tint + the label in the
 * display font (Space Grotesk), uppercase and spaced. Replaces the old dot eyebrow. */

// Electric blue family, deep -> bright (sleek, single-hue)
export const BLUE = ["#1F4FD8", "#2F6BFF", "#3F63F5", "#5B5CFF", "#4C8DFF", "#22A3E6"];

export default function SectionLabel({ n, children, className = "" }) {
    const idx = Math.max(0, parseInt(n, 10) - 1) % BLUE.length;
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <span className="font-mono text-[13px] font-bold tabular-nums" style={{ color: BLUE[idx] }}>{n}</span>
            <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-ink/75">{children}</span>
        </div>
    );
}
