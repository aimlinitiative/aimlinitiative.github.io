import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

const Bar = motion.div;

/* 2px reading-progress bar pinned to the very top: Action Blue on light
 * grounds, accent-on-dark over the stages (the navbar publishes its tone as
 * <html data-chrome-tone>). Pure transform (scaleX), springs lightly so it
 * never jitters. */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const reduce = useReducedMotion();
    const eased = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4, restDelta: 0.0005 });

    return (
        <Bar
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent transition-colors duration-500 [[data-chrome-tone=dark]_&]:bg-accentdark"
            style={{ scaleX: reduce ? scrollYProgress : eased }}
        />
    );
}
