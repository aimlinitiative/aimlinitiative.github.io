/* Chart palette for the SVG diagrams, mirroring the Pine tokens in
 * tailwind.config.js. Ink for structure, one accent for the key element. */
export const INK = "#1A1C1A";
export const INK2 = "#484B47";
export const INK3 = "#5E615C";
export const LINE = "#C9CBC5";   // linestrong: marks that must stay visible
export const HAIR = "#E3E4DF";   // line: axes and quiet edges
export const CARD = "#FFFFFF";
export const ACCENT = "#1F5C45";
export const ACCENT_SOFT = "#E6F0EA";

// Legacy: StepTrack.jsx and Work.jsx still import BLUES. Mapped onto Pine so they keep building.
export const BLUES = [ACCENT, INK2, INK3];
