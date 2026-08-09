import { useEffect, useRef } from "react";

/* Obys-style custom cursor: a small accent dot + a trailing ring that
 * enlarges over interactive elements. Fine-pointer devices only. */
export default function Cursor() {
    const dot = useRef(null);
    const ring = useRef(null);

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const d = dot.current, r = ring.current;
        let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
        let mx = rx, my = ry, raf = 0;

        const move = (e) => {
            mx = e.clientX; my = e.clientY;
            if (d) d.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
            const t = e.target;
            const interactive = t.closest && t.closest('a, button, [data-cursor], input, textarea, select, label');
            if (r) r.classList.toggle("is-hover", !!interactive);
        };
        const loop = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            if (r) r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            raf = requestAnimationFrame(loop);
        };
        window.addEventListener("pointermove", move);
        loop();
        return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
    }, []);

    return (
        <>
            <div ref={ring} className="cursor-ring" aria-hidden="true" />
            <div ref={dot} className="cursor-dot" aria-hidden="true" />
        </>
    );
}
