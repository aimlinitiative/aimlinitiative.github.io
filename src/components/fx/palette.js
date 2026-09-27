import { COLORS } from "../../lib/palette";

/* Brand colors for inline gradients and motion templates (Tailwind classes
 * can't reach inside a motion value). Values come from src/lib/palette.js. */
export const C = {
    accent: COLORS.accent,
    accentDark: COLORS.accentDark,
    violet: COLORS.violet,
    cyan: COLORS.cyan,
    stage: COLORS.stage,
    ink: COLORS.ink,
};

// Same colors as "r,g,b" for rgba() strings.
export const RGB = {
    accent: "0,102,204",
    accentDark: "41,151,255",
    violet: "124,92,255",
    cyan: "34,211,238",
};

// Spotlight gradient: reserved for the contact spotlight card (DESIGN.md §2).
export const GRADIENT = `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.violet}, ${COLORS.cyan})`;
