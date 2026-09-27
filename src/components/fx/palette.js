import { COLORS } from "../../lib/palette";

/* Brand colors for inline gradients and motion templates (Tailwind classes
 * can't reach inside a motion value). Values come from src/lib/palette.js. */
export const C = {
    accent: COLORS.accent,
    accentDark: COLORS.accentDark,
    blue: COLORS.blue,
    violet: COLORS.violet,
    cyan: COLORS.cyan,
    stage: COLORS.stage,
    ink: COLORS.ink,
};

// "#RRGGBB" -> "r,g,b", for rgba() strings.
const triple = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(",");

// Same colors as "r,g,b" for rgba() strings.
export const RGB = {
    accent: triple(COLORS.accent),
    accentDark: triple(COLORS.accentDark),
    blue: triple(COLORS.blue),
    violet: triple(COLORS.violet),
    cyan: triple(COLORS.cyan),
    stage: triple(COLORS.stage),
};

// Spotlight gradient: reserved for the contact spotlight card (DESIGN.md §2).
export const GRADIENT = `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.violet}, ${COLORS.cyan})`;

/* deep(hex, pct): a spotlight hue sunk into the stage color, for grounds that
 * carry white text (pct = how much of the hue survives). CSS color-mix, so
 * give the element a plain `stage` background-color as the fallback. */
export const deep = (hex, pct) => `color-mix(in oklab, ${hex} ${pct}%, ${COLORS.stage})`;
