import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/* Cinematic section entrance, scrubbed by scroll: as a section rises into view
 * it opens from an inset, rounded card (clip-path) and settles from a slight
 * scale-down to full bleed. Transform + clip-path only; no layout change.
 *
 * Usage (Home.jsx):  <SectionTransition><Summit /></SectionTransition>
 * Props: `radius` (px, corner radius at the start, default 40), `inset` (% of
 * width clipped at each side at the start, default 4), `className`.
 * Caveat: the wrapper is transformed while entering, so don't wrap content that
 * relies on position: sticky/fixed across the whole section. */

const Wrap = motion.div;

export default function SectionTransition({ children, radius = 40, inset = 4, className = "" }) {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
    const p = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.5, restDelta: 0.0005 });

    const scale = useTransform(p, [0, 1], [0.94, 1]);
    const y = useTransform(p, [0, 1], [60, 0]);
    const clipPath = useTransform(p, (v) => {
        if (v >= 0.999) return "none";
        const k = 1 - Math.max(0, v);
        return `inset(${(k * inset * 0.6).toFixed(2)}% ${(k * inset).toFixed(2)}% 0% ${(k * inset).toFixed(2)}% round ${(k * radius).toFixed(1)}px)`;
    });

    if (reduce) return <div className={className}>{children}</div>;

    return (
        <Wrap ref={ref} className={`origin-top ${className}`} style={{ scale, y, clipPath }}>
            {children}
        </Wrap>
    );
}
