import { useRef } from "react";
import { useInView } from "motion/react";
import { RGB } from "./palette";
import "./fx.css";

/* The spotlight family (DESIGN.md §2): blue, violet, cyan. x / y place each
 * field's center as a % of the box; k is its diameter as a fraction of the
 * box's longer side; a is its peak alpha. */
const FIELDS = [
    { rgb: RGB.blue, x: "10%", y: "8%", k: 1.05, a: 0.62 },
    { rgb: RGB.violet, x: "92%", y: "30%", k: 0.95, a: 0.58 },
    { rgb: RGB.cyan, x: "62%", y: "100%", k: 0.85, a: 0.5 },
];

/* Aurora: a slow, drifting mesh of blue / violet / cyan light. It absolutely
 * fills its positioned parent (clip the parent with overflow-hidden) and sits
 * behind content (-z-10). Fields are sized from the Aurora's own box, not the
 * viewport, so it works in a card as well as across a full section.
 * Transform-only CSS loops, paused off screen, static with reduced motion.
 *   className  extra classes on the layer (e.g. opacity)
 *   intensity  multiplier on every field's alpha (1)
 *   grid       true: add a faint grid that fades out toward the edges (false) */
export default function Aurora({ className = "", intensity = 1, grid = false }) {
    const ref = useRef(null);
    const inView = useInView(ref);
    return (
        <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
            <div className="fx-aurora absolute inset-0" data-paused={!inView}>
                {FIELDS.map((f) => (
                    <span
                        key={f.rgb}
                        className="mix-blend-screen"
                        style={{
                            "--k": f.k, left: f.x, top: f.y,
                            background: `radial-gradient(circle at center, rgba(${f.rgb},${Math.min(1, f.a * intensity)}), rgba(${f.rgb},0) 62%)`,
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
