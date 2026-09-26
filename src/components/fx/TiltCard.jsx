import { motion as Motion, useReducedMotion, useSpring } from "motion/react";
import { SPRING } from "../../lib/motion";
import useMediaQuery, { FINE_POINTER } from "./useMediaQuery";

const { stiffness, damping, mass } = SPRING.soft;
const SPRING_CFG = { stiffness, damping, mass };

/* TiltCard: gentle 3D tilt toward the pointer, springing back on leave.
 *   max              max rotation in degrees on each axis (6)
 *   perspective      px of the 3D perspective (1000)
 *   hoverScale       scale while hovered (1 = none; try 1.01)
 *   className        classes on the tilting element
 *   wrapperClassName classes on the static wrapper (it carries the perspective
 *                    and receives the pointer, so its rect never wobbles)
 * Motion values only (no re-render per mousemove). Off on touch / coarse
 * pointers and when the user prefers reduced motion. */
export default function TiltCard({ max = 6, perspective = 1000, hoverScale = 1, className = "", wrapperClassName = "", children }) {
    const reduce = useReducedMotion();
    const fine = useMediaQuery(FINE_POINTER);
    const on = fine && !reduce;
    const rx = useSpring(0, SPRING_CFG);
    const ry = useSpring(0, SPRING_CFG);
    const s = useSpring(1, SPRING_CFG);

    const move = (e) => {
        if (!on || e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 2 * max);
        rx.set(-py * 2 * max);
        s.set(hoverScale);
    };
    const leave = () => { rx.set(0); ry.set(0); s.set(1); };

    return (
        <div className={wrapperClassName} style={{ perspective }} onPointerMove={move} onPointerLeave={leave}>
            <Motion.div className={className} style={{ rotateX: rx, rotateY: ry, scale: s }}>
                {children}
            </Motion.div>
        </div>
    );
}
