import { useEffect, useRef, useState } from "react";

// A hand-written note with a pencil arrow that draws itself in, after
// Hivemind's notes.tsx. Decorative: whatever a note says is also said in the
// page's real text, so it is hidden from screen readers.
const PATHS = {
    left: { stem: "M46 17c-9-7-22 8-40 2", head: "M12 13L5 19l8 4" },
    down: { stem: "M44 5C30 3 14 11 8 30", head: "M3 22l5 9 7-6" },
    up: { stem: "M44 31C30 33 14 25 8 6", head: "M3 14l5-9 7 6" },
};

export default function Note({ children, dir = "left", flip = false, className = "", tone = "text-ink/75" }) {
    const ref = useRef(null);
    const [on, setOn] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.6 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    const p = PATHS[dir];
    const arrow = (
        <svg viewBox="0 0 48 36" className={`h-7 w-9 shrink-0 overflow-visible ${flip ? "-scale-x-100" : ""}`} fill="none">
            <path d={p.stem} pathLength="1" className={`draw ${on ? "on" : ""}`} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d={p.head} pathLength="1" className={`draw draw-late ${on ? "on" : ""}`} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    return (
        <span ref={ref} aria-hidden="true" className={`pointer-events-none flex items-center gap-1 ${tone} ${className}`}>
            {!flip && arrow}
            <span className={`note transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}>{children}</span>
            {flip && arrow}
        </span>
    );
}
