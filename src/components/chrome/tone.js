/* Is the content at an element light or dark? Used by the navbar (what sits
 * under the bar) and the cursor (what sits under the pointer).
 *
 * Sections say so explicitly with data-nav-theme="dark|light" (the hero stage,
 * curriculum, contact, and the navbar itself, which mirrors its current tone);
 * otherwise the first mostly-opaque background up the tree decides. Only
 * grounds count: icons, strokes, chips and pills (under 64px) are skipped. */
const isGround = (n) => n.offsetWidth >= 64 && n.offsetHeight >= 64;

export function toneOf(el) {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const t = n.getAttribute("data-nav-theme");
        if (t) return t;
        const m = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
        if (m && (m[3] === undefined || +m[3] > 0.5) && isGround(n)) {
            const lum = (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
            return lum < 0.4 ? "dark" : "light";
        }
    }
    return "light";
}

// "#RRGGBB" + alpha -> "rgba(r,g,b,a)", for motion values and inline styles.
export function rgba(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
