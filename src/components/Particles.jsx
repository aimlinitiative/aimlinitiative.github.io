import { useEffect, useRef } from "react";

/* Site-wide animated "compute field": drifting nodes wired together,
 * tinted purple->coral, reacting subtly to the cursor. Fixed behind content. */
export default function Particles() {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        let w = 0, h = 0, nodes = [], raf = 0;
        const mouse = { x: -9999, y: -9999 };

        function resize() {
            w = window.innerWidth; h = window.innerHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.min(90, Math.floor((w * h) / 17000));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.26, vy: (Math.random() - 0.5) * 0.26,
                r: Math.random() * 1.5 + 0.6,
                c: Math.random(), // 0=purple, 1=coral
            }));
        }

        const LINK = 128, MOUSE_R = 200;
        const mix = (t) => `rgba(${Math.round(179 + (255 - 179) * t)}, ${Math.round(2 + (81 - 2) * t)}, ${Math.round(232 + (71 - 232) * t)}`;

        function frame() {
            ctx.clearRect(0, 0, w, h);
            for (const n of nodes) {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
            }
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i], b = nodes[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < LINK) {
                        ctx.strokeStyle = `${mix((a.c + b.c) / 2)}, ${(1 - d / LINK) * 0.22})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                    }
                }
            }
            for (const n of nodes) {
                const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
                const near = dm < MOUSE_R;
                if (near) {
                    const t = 1 - dm / MOUSE_R;
                    ctx.strokeStyle = `${mix(n.c)}, ${t * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                    n.vx += ((mouse.x - n.x) / dm) * 0.006 * t;
                    n.vy += ((mouse.y - n.y) / dm) * 0.006 * t;
                }
                if (Math.hypot(n.vx, n.vy) > 0.6) { n.vx *= 0.96; n.vy *= 0.96; }
                ctx.beginPath();
                ctx.arc(n.x, n.y, near ? n.r + 1 : n.r, 0, Math.PI * 2);
                ctx.fillStyle = `${mix(n.c)}, ${near ? 1 : 0.8})`;
                ctx.fill();
            }
            raf = requestAnimationFrame(frame);
        }

        const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

        resize();
        frame();
        if (reduce) cancelAnimationFrame(raf);
        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerleave", onLeave);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70" aria-hidden="true" />;
}
