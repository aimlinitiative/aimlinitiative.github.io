import { motion as Motion, animate, useMotionTemplate, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { EASE } from "../../lib/motion";
import { C, RGB } from "./palette";

const SOLID = "linear-gradient(#000 0 0)";
const RING_MASK = `${SOLID} content-box, ${SOLID}`;
const RING_GRADIENT = `linear-gradient(135deg, ${C.accent}, ${C.violet} 50%, ${C.cyan})`;

/* SpotlightCard: a card with a soft radial highlight that follows the pointer
 * and a matching glow on its 1px border. Pointer position lives in motion
 * values, so moving the mouse never re-renders React.
 *   as        element tag, default "div" (renders a motion element, so motion
 *             props like variants/initial/whileInView pass straight through)
 *   className the card's own look: radius, border, background, padding
 *   glow      "blue" (default): border glow in the accent color
 *             "gradient": border lights up in the blue/violet/cyan gradient
 *             around the pointer, with a faint full gradient ring on hover
 *   color     fill color as "r,g,b" (default accent)
 *   size      highlight radius in px (360)
 *   strength  alpha of the fill highlight (0.07); the border glow is stronger
 *   lift      true: also fade in a soft drop shadow on hover (opacity only)
 * Off for touch input and prefers-reduced-motion. Give it a 1px border to glow.
 * It sets `relative isolate`; the glow layers sit under the content (-z-10). */
export default function SpotlightCard({
    as = "div", className = "", glow = "blue", color = RGB.accent, size = 360, strength = 0.07, lift = false,
    children, onPointerMove, onPointerEnter, onPointerLeave, ...rest
}) {
    const M = Motion[as] ?? Motion.div;
    const reduce = useReducedMotion();
    const x = useMotionValue(-1000);
    const y = useMotionValue(-1000);
    const o = useMotionValue(0);
    const faint = useTransform(o, (v) => v * 0.35);
    const r = Math.round(size * 0.75);

    const fill = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgba(${color},${strength}), transparent 70%)`;
    const ring = useMotionTemplate`radial-gradient(${r}px circle at ${x}px ${y}px, rgba(${color},${Math.min(strength * 6, 0.55)}), transparent 70%)`;
    // Gradient mode: pointer spot intersected with the ring shape.
    const spotMask = useMotionTemplate`radial-gradient(${r}px circle at ${x}px ${y}px, #000, transparent 72%), ${SOLID}, ${SOLID}`;

    const track = (e) => {
        const b = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - b.left);
        y.set(e.clientY - b.top);
    };

    const ringLayer = "pointer-events-none absolute -inset-px -z-10 rounded-[inherit] p-px";
    const maskStyle = { WebkitMask: RING_MASK, WebkitMaskComposite: "xor", mask: RING_MASK, maskComposite: "exclude" };

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
            {glow === "gradient" ? (
                <>
                    {/* faint full ring */}
                    <Motion.span aria-hidden className={ringLayer} style={{ background: RING_GRADIENT, opacity: faint, ...maskStyle }} />
                    {/* bright arc near the pointer */}
                    <Motion.span
                        aria-hidden
                        className={ringLayer}
                        style={{
                            background: RING_GRADIENT, opacity: o,
                            WebkitMaskImage: spotMask, maskImage: spotMask,
                            WebkitMaskClip: "border-box, content-box, border-box", maskClip: "border-box, content-box, border-box",
                            WebkitMaskOrigin: "border-box, content-box, border-box", maskOrigin: "border-box, content-box, border-box",
                            WebkitMaskComposite: "source-in, xor, source-over", maskComposite: "intersect, exclude, add",
                            padding: 1.5,
                        }}
                    />
                </>
            ) : (
                <Motion.span aria-hidden className={ringLayer} style={{ background: ring, opacity: o, ...maskStyle }} />
            )}
            {children}
        </M>
    );
}
