import { COLORS } from "../../lib/palette";

/* Chart palette for the data-viz pieces (DESIGN.md §2): on the dark stage the
 * spotlight family works as categorical series. Blue is the primary series,
 * violet and cyan the secondary ones. */
export const SERIES = { blue: COLORS.blue, violet: COLORS.violet, cyan: COLORS.cyan };
export const BLUES = [SERIES.blue, SERIES.violet, SERIES.cyan];
export const GLOW = SERIES; // older name for the same series colors
export const INK = COLORS.ink;
export const STAGE = COLORS.stage;
