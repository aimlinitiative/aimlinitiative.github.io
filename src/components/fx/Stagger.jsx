import { motion as Motion, useReducedMotion } from "motion/react";
import { stagger, VIEWPORT } from "../../lib/motion";
import { RISE, STILL } from "./variants";

/* Stagger: a container that reveals its <Item> descendants in sequence when it
 * scrolls into view (once).
 *   as        element tag, default "div" (any motion tag: "ul", "section"...)
 *   each      seconds between children (0.08)
 *   delay     seconds before the first child (0)
 *   amount    how much must be visible to trigger (VIEWPORT.amount)
 *   inherit   true: don't self-trigger, follow a parent Stagger instead
 *   ...rest   any motion/DOM props (className, style...)
 * Items can sit at any depth below it; variant state flows through plain elements. */
export function Stagger({ as = "div", each = 0.08, delay = 0, amount, inherit = false, children, ...rest }) {
    const M = Motion[as] ?? Motion.div;
    const trigger = inherit
        ? {}
        : { initial: "hidden", whileInView: "show", viewport: amount ? { ...VIEWPORT, amount } : VIEWPORT };
    return (
        <M variants={stagger(each, delay)} {...trigger} {...rest}>
            {children}
        </M>
    );
}

/* Item: one staggered child.
 *   as        element tag, default "div"
 *   variants  entrance preset from ./variants (RISE default; POP, SPRING_IN...)
 *   delay     optional explicit delay (s); overrides the parent's stagger slot
 *   self      true: trigger on its own when scrolled into view (no parent needed)
 * With prefers-reduced-motion it renders in its final state. */
export function Item({ as = "div", variants = RISE, delay, self = false, children, ...rest }) {
    const reduce = useReducedMotion();
    const M = Motion[as] ?? Motion.div;
    const trigger = self ? { initial: "hidden", whileInView: "show", viewport: VIEWPORT } : {};
    return (
        <M variants={reduce ? STILL : variants} custom={delay} {...trigger} {...rest}>
            {children}
        </M>
    );
}
