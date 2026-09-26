import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

const Bar = motion.div;

/* Hairline reading-progress bar pinned to the very top, in the brand blue.
 * Pure transform (scaleX), springs lightly so it never jitters. */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const reduce = useReducedMotion();
    const eased = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4, restDelta: 0.0005 });

    return (
        <Bar
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
            style={{ scaleX: reduce ? scrollYProgress : eased }}
        />
    );
}
