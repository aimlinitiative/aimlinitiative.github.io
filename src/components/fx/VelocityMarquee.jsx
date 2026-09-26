import { useLayoutEffect, useRef, useState } from "react";
import {
    motion as Motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useSpring,
    useTransform, useVelocity,
} from "motion/react";

const EDGE_MASK = "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)";

/* VelocityMarquee: an endless band that drifts on its own, then speeds up and
 * leans (skewX) with scroll velocity, easing back when scrolling stops.
 *   speed      base drift in px per second (40)
 *   boost      extra speed multiplier per 1000px/s of scroll velocity (4)
 *   skew       max lean in degrees at fast scroll (5)
 *   gap        px between items, also used between the two copies (56)
 *   className  classes on the outer band (it clips and fades its edges)
 *   children   ONE copy of the row's items; it is rendered twice to loop
 * Only runs while on screen. Reduced motion: a static, centered, wrapping row.
 * The duplicate copy is aria-hidden. */
export default function VelocityMarquee({ speed = 40, boost = 4, skew = 5, gap = 56, className = "", children }) {
    const reduce = useReducedMotion();
    const band = useRef(null);
    const copy = useRef(null);
    const [w, setW] = useState(0);
    const inView = useInView(band);

    const { scrollY } = useScroll();
    const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
    const skewX = useTransform(vel, [-3000, 0, 3000], [skew, 0, -skew]);
    const x = useMotionValue(0);

    useLayoutEffect(() => {
        const el = copy.current;
        if (!el) return;
        const measure = () => setW(el.offsetWidth);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [reduce]);

    useAnimationFrame((_, delta) => {
        if (reduce || !w || !inView) return;
        const dt = Math.min(delta, 64) / 1000;
        const f = 1 + (Math.abs(vel.get()) / 1000) * boost;
        let next = x.get() - speed * f * dt;
        if (next <= -w) next += w;
        x.set(next);
    });

    if (reduce) {
        return (
            <div className={className}>
                <div className="flex flex-wrap items-center justify-center px-6" style={{ gap: `24px ${gap}px` }}>{children}</div>
            </div>
        );
    }

    return (
        <div ref={band} className={`overflow-hidden ${className}`} style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}>
            <Motion.div className="flex w-max" style={{ x, skewX }}>
                <div ref={copy} className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }}>{children}</div>
                <div aria-hidden className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }}>{children}</div>
            </Motion.div>
        </div>
    );
}
