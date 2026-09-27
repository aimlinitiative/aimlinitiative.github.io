import { useReducedMotion } from "motion/react";
import { EASE, DUR, SPRING } from "../../lib/motion";

/* Entrance presets for motion `variants` (states "hidden" -> "show").
 * Each `show` accepts an optional `custom` delay in seconds; without one, a
 * parent's staggerChildren decides the timing. Blur is cleared to `none` at
 * the end so finished elements don't keep a filter layer around. */

const withDelay = (t, d) => (d ? { ...t, delay: d } : t);

// Rise + un-blur + fade: the default content entrance.
export const RISE = {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    show: (d) => ({
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: withDelay({ duration: DUR.slow, ease: EASE.out }, d),
        transitionEnd: { filter: "none" },
    }),
};

// Soft pop for small things (chips, pills, icons): scale 0.92 -> 1.
export const POP = {
    hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
    show: (d) => ({
        opacity: 1, scale: 1, filter: "blur(0px)",
        transition: withDelay({ duration: DUR.base, ease: EASE.out }, d),
        transitionEnd: { filter: "none" },
    }),
};

// Spring in for cards: scale 0.96 -> 1 on a no-bounce spring, blur -> sharp.
export const SPRING_IN = {
    hidden: { opacity: 0, scale: 0.96, y: 14, filter: "blur(8px)" },
    show: (d) => ({
        opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
        transition: withDelay({
            ...SPRING.soft,
            opacity: withDelay({ duration: DUR.slow, ease: EASE.out }, d),
            filter: withDelay({ duration: DUR.slow, ease: EASE.out }, d),
        }, d),
        transitionEnd: { filter: "none" },
    }),
};

// Masked line: text slides up from behind an overflow-hidden parent.
export const LINE = {
    hidden: { y: "110%" },
    show: (d) => ({ y: "0%", transition: withDelay({ duration: 1.1, ease: EASE.out }, d) }),
};

// Hairline that draws left -> right (pair with an origin-left class).
export const DRAW_X = {
    hidden: { scaleX: 0 },
    show: (d) => ({ scaleX: 1, transition: withDelay({ duration: DUR.draw, ease: EASE.out }, d) }),
};

// Reduced motion: both states identical, so everything simply renders.
export const STILL = { hidden: {}, show: {} };

/* useVariants(v): returns `v`, or STILL when the user prefers reduced motion. */
export function useVariants(v) {
    return useReducedMotion() ? STILL : v;
}
