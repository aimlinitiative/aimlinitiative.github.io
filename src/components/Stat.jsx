import { useEffect, useRef, useState } from "react";

// Animated count-up number that triggers when scrolled into view.
export default function Stat({ value, suffix = "", prefix = "", label, sub, decimals = 0 }) {
    const ref = useRef(null);
    const [display, setDisplay] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting && !started.current) {
                    started.current = true;
                    const duration = 1400;
                    const start = performance.now();
                    const tick = (now) => {
                        const t = Math.min(1, (now - start) / duration);
                        const eased = 1 - Math.pow(1 - t, 3);
                        setDisplay(value * eased);
                        if (t < 1) requestAnimationFrame(tick);
                        else setDisplay(value);
                    };
                    requestAnimationFrame(tick);
                }
            });
        }, { threshold: 0.5 });
        io.observe(el);
        return () => io.disconnect();
    }, [value]);

    const shown = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();

    return (
        <div ref={ref} className="text-center">
            <div className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {prefix}
                <span className="text-gradient">{shown}</span>
                {suffix}
            </div>
            <div className="mt-2 text-sm font-semibold text-white/90">{label}</div>
            {sub && <div className="mt-0.5 text-xs text-white/50">{sub}</div>}
        </div>
    );
}
