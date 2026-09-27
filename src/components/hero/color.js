/* The spotlight family (DESIGN.md §2) for the hero's scene and stage glow,
 * derived from src/lib/palette.js so the WebGL never drifts from the tokens. */
import { COLORS } from "../../lib/palette";

// "#RRGGBB" -> [r, g, b] in 0..1. The shaders output unmanaged sRGB (the canvas
// is `flat` + `linear`), so these land on screen as the same colors CSS draws.
export function rgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// "#RRGGBB" + alpha -> "rgba(r, g, b, a)" for CSS gradients.
export function rgba(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

export const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
export const dim = (a, k) => a.map((v) => v * k);

export const WHITE = [1, 1, 1];
export const SPOT = { blue: rgb(COLORS.blue), violet: rgb(COLORS.violet), cyan: rgb(COLORS.cyan) };
