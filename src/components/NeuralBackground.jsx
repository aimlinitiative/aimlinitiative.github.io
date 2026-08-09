import { useEffect, useRef } from "react";

// Lightweight animated "neural network" of drifting nodes + connecting synapses.
// Purely decorative; sits behind the hero.
export default function NeuralBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
        let nodes = [];
        let raf = 0;

        function resize() {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const target = Math.min(70, Math.floor((width * height) / 16000));
            nodes = Array.from({ length: target }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.8,
            }));
        }

        const LINK_DIST = 130;

        function frame() {
            ctx.clearRect(0, 0, width, height);

            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > width) n.vx *= -1;
                if (n.y < 0 || n.y > height) n.vy *= -1;
            }

            // synapses
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i], b = nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < LINK_DIST) {
                        const alpha = (1 - dist / LINK_DIST) * 0.5;
                        ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            // nodes
            for (const n of nodes) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(165, 180, 252, 0.9)";
                ctx.fill();
            }

            raf = requestAnimationFrame(frame);
        }

        resize();
        if (reduce) {
            frame();
            cancelAnimationFrame(raf);
        } else {
            frame();
        }
        window.addEventListener("resize", resize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
            aria-hidden="true"
        />
    );
}
