import { useId, useMemo } from "react";
import { motion as Motion, useMotionValueEvent, useTransform } from "motion/react";
import { BLUES } from "./palette";

/* A connector that draws itself through a set of anchor points (the step badges).
 * Anchors are measured from the DOM (offset-based, so transforms never skew
 * them), which lets the same component draw a horizontal line on desktop and a
 * vertical one on mobile. `progress` is a 0..1 MotionValue (scroll-linked).
 * A dashed track shows the whole route; the gradient stroke draws over it with a
 * soft glowing dot riding the tip. `onReach(i)` fires as the tip passes anchor i. */

export default function StepTrack({ points, progress, onReach, reduced }) {
    const gid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

    const geo = useMemo(() => {
        if (points.length < 2) return null;
        const cum = [0];
        for (let i = 1; i < points.length; i++) {
            const [x0, y0] = points[i - 1], [x1, y1] = points[i];
            cum.push(cum[i - 1] + Math.hypot(x1 - x0, y1 - y0));
        }
        const total = cum[cum.length - 1] || 1;
        const d = points.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
        const at = (t) => {
            const L = Math.min(1, Math.max(0, t)) * total;
            let i = 1;
            while (i < cum.length - 1 && cum[i] < L) i++;
            const seg = cum[i] - cum[i - 1] || 1;
            const k = (L - cum[i - 1]) / seg;
            const [x0, y0] = points[i - 1], [x1, y1] = points[i];
            return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
        };
        return { d, at, fracs: cum.map((c) => c / total), first: points[0], last: points[points.length - 1] };
    }, [points]);

    // Tip position for the traveling dot (transform only).
    const tipX = useTransform(progress, (p) => (geo ? geo.at(p)[0] : 0));
    const tipY = useTransform(progress, (p) => (geo ? geo.at(p)[1] : 0));
    const tipO = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

    useMotionValueEvent(progress, "change", (p) => {
        if (!geo || !onReach) return;
        geo.fracs.forEach((f, i) => { if (p > 0.01 && p >= f - 0.04) onReach(i); });
    });

    if (!geo) return null;
    const [ax, ay] = geo.first, [bx, by] = geo.last;

    return (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <defs>
                <linearGradient id={`st-g-${gid}`} gradientUnits="userSpaceOnUse" x1={ax} y1={ay} x2={bx} y2={by}>
                    <stop offset="0" stopColor={BLUES[0]} />
                    <stop offset="0.5" stopColor={BLUES[1]} />
                    <stop offset="1" stopColor={BLUES[2]} />
                </linearGradient>
                <radialGradient id={`st-h-${gid}`}>
                    <stop offset="0" stopColor="#5A8DD6" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#5A8DD6" stopOpacity="0" />
                </radialGradient>
            </defs>
            {/* the full route, quiet */}
            <path d={geo.d} fill="none" stroke="rgba(21,21,26,0.12)" strokeWidth="1" strokeDasharray="2 5" />
            {/* the drawn line */}
            <Motion.path
                d={geo.d}
                fill="none"
                stroke={`url(#st-g-${gid})`}
                strokeWidth="1.75"
                strokeLinecap="round"
                style={{ pathLength: reduced ? 1 : progress }}
            />
            {!reduced && (
                <Motion.g style={{ x: tipX, y: tipY, opacity: tipO }}>
                    <circle r="14" fill={`url(#st-h-${gid})`} />
                    <circle r="3" fill="#fff" stroke="#2C63B0" strokeWidth="1.5" />
                </Motion.g>
            )}
        </svg>
    );
}
