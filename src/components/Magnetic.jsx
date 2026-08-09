import { useRef } from "react";

/* Wraps a child and nudges it toward the cursor on hover (magnetic effect). */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
    const ref = useRef(null);

    function onMove(e) {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }
    function reset() {
        const el = ref.current;
        if (el) el.style.transform = "translate(0, 0)";
    }

    return (
        <span
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className={`inline-block transition-transform duration-300 ease-out ${className}`}
        >
            {children}
        </span>
    );
}
