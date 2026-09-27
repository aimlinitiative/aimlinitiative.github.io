import { useReducedMotion } from "motion/react";
import { EASE, DUR, DIST, SPRING } from "../../lib/motion";

/* Entrance presets for motion `variants` (states "hidden" -> "show").
 * Each `show` takes an optional `custom` delay in seconds; without one, the
 * parent's stagger decides the timing. No blur: it's costly on integrated GPUs. */

const withDelay = (t, d) => (d ? { ...t, delay: d } : t);

// Short rise + fade: the default content entrance.
export const RISE = {
    hidden: { opacity: 0, y: DIST.rise },
    show: (d) => ({ opacity: 1, y: 0, transition: withDelay({ duration: DUR.slow, ease: EASE.out }, d) }),
};

// Small things (chips, pills): scale 0.96 -> 1.
export const POP = {
    hidden: { opacity: 0, scale: 0.96 },
    show: (d) => ({ opacity: 1, scale: 1, transition: withDelay({ duration: DUR.base, ease: EASE.out }, d) }),
};

// Cards: settle in on a no-bounce spring.
export const SPRING_IN = {
    hidden: { opacity: 0, y: DIST.rise, scale: 0.98 },
    show: (d) => ({
        opacity: 1, y: 0, scale: 1,
        transition: withDelay({ ...SPRING.gentle, opacity: withDelay({ duration: DUR.slow, ease: EASE.out }, d) }, d),
    }),
};

// Masked line: text slides up from behind an overflow-hidden parent.
export const LINE = {
    hidden: { y: "105%" },
    show: (d) => ({ y: "0%", transition: withDelay({ duration: DUR.hero, ease: EASE.outExpo }, d) }),
};

// Hairline that draws left -> right (pair with origin-left).
export const DRAW_X = {
    hidden: { scaleX: 0 },
    show: (d) => ({ scaleX: 1, transition: withDelay({ duration: 1, ease: EASE.out }, d) }),
};

// Reduced motion: both states identical, so everything simply renders.
export const STILL = { hidden: {}, show: {} };

export function useVariants(v) {
    return useReducedMotion() ? STILL : v;
}
