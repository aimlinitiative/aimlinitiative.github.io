import { COLORS } from "../../lib/palette";

/* Chart palette for the data-viz pieces (see DESIGN.md): the spotlight family
 * as categorical series, plus ink and the dark stage. */
export const BLUES = [COLORS.blue, COLORS.violet, COLORS.cyan];
export const INK = COLORS.ink;
export const STAGE = COLORS.stage;
// Luminous variants for strokes and points on the dark stage.
export const GLOW = { blue: "#5AB0FF", violet: "#9D85FF", cyan: "#3BE0F5" };
