import { motion as Motion, animate, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { EASE } from "../../lib/motion";

const RING_MASK = "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)";

/* SpotlightCard: a card with a soft radial highlight that follows the pointer
 * and a matching glow on its 1px border (brand blue, very subtle). Pointer
 * position lives in motion values, so moving the mouse never re-renders React.
 *   as        element tag, default "div" (renders a motion element, so motion
 *             props like variants/initial/whileInView pass straight through)
 *   className the card's own look: radius, border, background, padding
 *   color     glow color as "r,g,b" (default brand blue 31,95,191)
 *   size      highlight radius in px (360)
 *   strength  alpha of the fill highlight (0.07); the border glow is stronger
 *   lift      true: also fade in a soft drop shadow on hover (opacity only)
 * Off for touch input and prefers-reduced-motion. Give it a 1px border to glow.
 * It sets `relative isolate`; the glow layers sit under the content (-z-10). */
export default function SpotlightCard({
    as = "div", className = "", color = "31,95,191", size = 360, strength = 0.07, lift = false,
    children, onPointerMove, onPointerEnter, onPointerLeave, ...rest
}) {
    const M = Motion[as] ?? Motion.div;
    const reduce = useReducedMotion();
    const x = useMotionValue(-1000);
    const y = useMotionValue(-1000);
    const o = useMotionValue(0);

    const fill = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgba(${color},${strength}), transparent 70%)`;
    const ring = useMotionTemplate`radial-gradient(${Math.round(size * 0.75)}px circle at ${x}px ${y}px, rgba(${color},${Math.min(strength * 6, 0.55)}), transparent 70%)`;

    const track = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
    };

    return (
        <M
            {...rest}
            className={`group/spot relative isolate ${className}`}
            onPointerEnter={(e) => {
                onPointerEnter?.(e);
                if (reduce || e.pointerType === "touch") return;
                track(e);
                animate(o, 1, { duration: 0.5, ease: EASE.out });
            }}
            onPointerMove={(e) => {
                onPointerMove?.(e);
                if (reduce || e.pointerType === "touch") return;
                track(e);
            }}
            onPointerLeave={(e) => {
                onPointerLeave?.(e);
                animate(o, 0, { duration: 0.8, ease: EASE.out });
            }}
        >
            {lift && (
                <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 shadow-lift transition-opacity duration-500 [@media(hover:hover)]:group-hover/spot:opacity-100" />
            )}
            <Motion.span aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]" style={{ background: fill, opacity: o }} />
            <Motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] p-px"
                style={{
                    background: ring, opacity: o,
                    WebkitMask: RING_MASK, WebkitMaskComposite: "xor",
                    mask: RING_MASK, maskComposite: "exclude",
                }}
            />
            {children}
        </M>
    );
}
