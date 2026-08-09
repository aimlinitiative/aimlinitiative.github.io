import { useRef } from "react";

/* Card that tilts in 3D toward the cursor and shows a glow that
 * follows the pointer. Falls back to a plain box on touch. */
export default function TiltCard({ children, className = "", max = 8 }) {
    const ref = useRef(null);

    function onMove(e) {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) translateZ(0)`;
        el.style.setProperty("--gx", `${px * 100}%`);
        el.style.setProperty("--gy", `${py * 100}%`);
    }
    function reset() {
        const el = ref.current;
        if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
    }

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className={`ring-glow group relative transition-transform duration-200 ease-out ${className}`}
            style={{ transformStyle: "preserve-3d" }}
        >
            <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(16rem 16rem at var(--gx,50%) var(--gy,50%), rgba(129,140,248,0.16), transparent 70%)" }}
            />
            <div className="relative">{children}</div>
        </div>
    );
}
