import { motion as Motion, animate, useMotionTemplate, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { EASE } from "../../lib/motion";
import { C, RGB } from "./palette";

const SOLID = "linear-gradient(#000 0 0)";
const RING_MASK = `${SOLID} content-box, ${SOLID}`;
const RING_GRADIENT = `linear-gradient(135deg, ${C.accent}, ${C.violet} 50%, ${C.cyan})`;

// Flat look (DESIGN.md §4): neutral highlight, hairline that firms up under the
// pointer. `edge` peaks near the pointer and keeps `floor` of it everywhere else
// while hovered, so over a `line` border the edge reads about `linestrong`.
const FLAT = {
    light: { color: "0,0,0", strength: 0.022, edge: "0,0,0", peak: 0.1, floor: 0.35 },
    dark: { color: "255,255,255", strength: 0.045, edge: "255,255,255", peak: 0.24, floor: 0.3 },
};

/* SpotlightCard: a card that answers the pointer with a soft radial highlight
 * and a brighter border near it. Pointer position lives in motion values, so
 * moving the mouse never re-renders React.
 *   as        element tag, default "div" (renders a motion element, so motion
 *             props like variants/initial/whileInView pass straight through)
 *   className the card's own look: radius, border, background, padding
 *   glow      "line" (default): flat. The hairline border firms up toward
 *             `linestrong` under the pointer, with a barely-there neutral
 *             highlight. No color, no glow.
 *             "none": the highlight only, border untouched
 *             "blue": legacy; border glow in the accent color
 *             "gradient": legacy; border lights up in the blue/violet/cyan
 *             gradient around the pointer, with a faint full ring on hover
 *   tone      "light" (default) or "dark": which way the flat look brightens
 *             (use "dark" for stage cards with a `stageline` border)
 *   color     highlight color as "r,g,b" (neutral for the flat look, accent
 *             for the legacy glows)
 *   size      highlight radius in px (360)
 *   strength  alpha of the highlight (0.022 flat, 0.045 flat dark, 0.07 legacy)
 *   lift      true: also fade in a soft drop shadow on hover (opacity only)
 * Off for touch input and prefers-reduced-motion. Give it a 1px border for the
 * edge to follow; the edge draws over that border, so it is clipped away if
 * the card itself is overflow-hidden (clip an inner wrapper instead).
 * It sets `relative isolate`; the layers sit under the content (-z-10). */
export default function SpotlightCard({
    as = "div", className = "", glow = "line", tone = "light", color, size = 360, strength, lift = false,
    children, onPointerMove, onPointerEnter, onPointerLeave, ...rest
}) {
    const M = Motion[as] ?? Motion.div;
    const reduce = useReducedMotion();
    const x = useMotionValue(-1000);
    const y = useMotionValue(-1000);
    const o = useMotionValue(0);
    const faint = useTransform(o, (v) => v * 0.35);
    const r = Math.round(size * 0.75);

    const legacy = glow === "blue" || glow === "gradient";
    const flat = FLAT[tone] ?? FLAT.light;
    const rgb = color ?? (legacy ? RGB.accent : flat.color);
    const alpha = strength ?? (legacy ? 0.07 : flat.strength);
    const edge = legacy ? rgb : color ?? flat.edge;
    const peak = legacy ? Math.min(alpha * 6, 0.55) : flat.peak;
    const floor = legacy ? 0 : +(peak * flat.floor).toFixed(3);

    const fill = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgba(${rgb},${alpha}), transparent 70%)`;
    const ring = useMotionTemplate`radial-gradient(${r}px circle at ${x}px ${y}px, rgba(${edge},${peak}), rgba(${edge},${floor}) 70%)`;
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
            ) : glow !== "none" && (
                <Motion.span aria-hidden className={ringLayer} style={{ background: ring, opacity: o, ...maskStyle }} />
            )}
            {children}
        </M>
    );
}
