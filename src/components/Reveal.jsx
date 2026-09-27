import { motion, useReducedMotion } from "motion/react";
import { fadeUp, VIEWPORT } from "../lib/motion";

/* Wraps children and lets them rise and fade in once they scroll into
 * view. `delay` is in ms; `as` picks the element (a tag name or a component).
 * Reduced motion: renders visible immediately, no transition. */

const created = new Map();
function motionTag(as) {
    if (typeof as === "string") return motion[as] ?? motion.div;
    if (!created.has(as)) created.set(as, motion.create(as));
    return created.get(as);
}

export default function Reveal({ children, delay = 0, as = "div", className = "" }) {
    const reduce = useReducedMotion();
    const Tag = motionTag(as);

    if (reduce) return <Tag className={className}>{children}</Tag>;

    const variants = {
        hidden: fadeUp.hidden,
        show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay: delay / 1000 } },
    };

    return (
        <Tag className={className} variants={variants} initial="hidden" whileInView="show" viewport={VIEWPORT}>
            {children}
        </Tag>
    );
}
