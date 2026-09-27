import { motion as Motion, useReducedMotion, useSpring } from "motion/react";
import useMediaQuery, { FINE_POINTER } from "./useMediaQuery";

const SPRING_CFG = { stiffness: 260, damping: 26, mass: 0.6 };

/* Magnetic: its child drifts a few px toward the pointer and springs home.
 *   strength  fraction of the pointer's offset from center to follow (0.3)
 *   max       cap on the drift in px (6)
 *   reach     extra px of invisible catch area around the child (12)
 *   className classes on the inline-block wrapper
 * Wrap a button/link; the child keeps its own focus and hover styles.
 * Off on touch / coarse pointers and with reduced motion. */
export default function Magnetic({ strength = 0.3, max = 6, reach = 12, className = "", children }) {
    const reduce = useReducedMotion();
    const fine = useMediaQuery(FINE_POINTER);
    const x = useSpring(0, SPRING_CFG);
    const y = useSpring(0, SPRING_CFG);
    const clamp = (v) => Math.max(-max, Math.min(max, v));

    const move = (e) => {
        if (reduce || !fine || e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
        y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
    };
    const leave = () => { x.set(0); y.set(0); };

    return (
        <span className={`inline-block ${className}`} style={{ padding: reach, margin: -reach }} onPointerMove={move} onPointerLeave={leave}>
            <Motion.span className="inline-block" style={{ x, y }}>
                {children}
            </Motion.span>
        </span>
    );
}
