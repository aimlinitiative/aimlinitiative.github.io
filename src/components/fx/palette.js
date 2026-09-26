/* Brand colors for inline gradients and motion templates (Tailwind classes
 * can't reach inside a motion value). Mirrors the tailwind tokens:
 * accent (electric blue), brand.violet, brand.cyan, stage (near-black). */
export const C = {
    accent: "#2F6BFF",
    violet: "#7C5CFF",
    cyan: "#22D3EE",
    stage: "#07080C",
    ink: "#0B0D12",
};

// Same colors as "r,g,b" for rgba() strings.
export const RGB = {
    accent: "47,107,255",
    violet: "124,92,255",
    cyan: "34,211,238",
};

export const GRADIENT = `linear-gradient(90deg, ${C.accent}, ${C.violet}, ${C.cyan})`;
