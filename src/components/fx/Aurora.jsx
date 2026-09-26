import { useRef } from "react";
import { useInView } from "motion/react";
import { RGB } from "./palette";
import "./fx.css";

const FIELDS = [
    { rgb: RGB.accent, size: "70vmax", left: "-18%", top: "-30%", a: 0.55 },
    { rgb: RGB.violet, size: "62vmax", left: "42%", top: "-10%", a: 0.5 },
    { rgb: RGB.cyan, size: "54vmax", left: "8%", top: "38%", a: 0.32 },
];

/* Aurora: a slow, drifting mesh of blue / violet / cyan light for dark
 * "stage" sections. Absolutely fills its (relative, overflow-hidden) parent
 * and sits behind content. Transform-only CSS loops, paused off screen,
 * static with reduced motion.
 *   className  extra classes on the layer (e.g. opacity)
 *   grid       true: add a faint grid that fades out toward the edges */
export default function Aurora({ className = "", grid = true }) {
    const ref = useRef(null);
    const inView = useInView(ref);
    return (
        <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
            <div className="fx-aurora absolute inset-0" data-paused={!inView}>
                {FIELDS.map((f) => (
                    <span
                        key={f.rgb}
                        className="absolute rounded-full mix-blend-screen"
                        style={{
                            width: f.size, height: f.size, left: f.left, top: f.top,
                            background: `radial-gradient(circle at center, rgba(${f.rgb},${f.a}), rgba(${f.rgb},0) 62%)`,
                        }}
                    />
                ))}
            </div>
            {grid && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000, transparent 75%)",
                        maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000, transparent 75%)",
                    }}
                />
            )}
        </div>
    );
}
