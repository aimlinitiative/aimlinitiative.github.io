import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/* Desktop cursor companion: a precise dot plus a soft ring that trails on a
 * spring and swells into a blue lens over links and buttons. The native cursor
 * stays as-is. Only mounts for a fine pointer with hover and no reduced-motion
 * preference, so touch devices never see it. */

const Dot = motion.div;
const Ring = motion.div;
const INTERACTIVE = "a, button, [role='button'], summary, label, select, [data-cursor]";
const TEXT = "input, textarea, [contenteditable='true']";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function useEnabled() {
    const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(QUERY).matches);
    useEffect(() => {
        const mq = window.matchMedia(QUERY);
        const f = () => setOn(mq.matches);
        mq.addEventListener("change", f);
        return () => mq.removeEventListener("change", f);
    }, []);
    return on;
}

function CursorLayer() {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
    const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
    const [state, setState] = useState({ visible: false, hover: false, text: false, down: false });

    useEffect(() => {
        const set = (patch) => setState((s) => {
            for (const k in patch) if (s[k] !== patch[k]) return { ...s, ...patch };
            return s;
        });
        const move = (e) => {
            if (e.pointerType && e.pointerType !== "mouse") return;
            x.set(e.clientX);
            y.set(e.clientY);
            set({ visible: true });
        };
        const over = (e) => {
            const t = e.target instanceof Element ? e.target : null;
            set({ hover: !!t?.closest(INTERACTIVE), text: !!t?.closest(TEXT) });
        };
        const leave = () => set({ visible: false });
        const down = () => set({ down: true });
        const up = () => set({ down: false });
        window.addEventListener("pointermove", move, { passive: true });
        document.addEventListener("pointerover", over, { passive: true });
        document.documentElement.addEventListener("pointerleave", leave);
        window.addEventListener("pointerdown", down, { passive: true });
        window.addEventListener("pointerup", up, { passive: true });
        return () => {
            window.removeEventListener("pointermove", move);
            document.removeEventListener("pointerover", over);
            document.documentElement.removeEventListener("pointerleave", leave);
            window.removeEventListener("pointerdown", down);
            window.removeEventListener("pointerup", up);
        };
    }, [x, y]);

    const { visible, hover, text, down } = state;
    const ringScale = text ? 0.4 : hover ? (down ? 1.5 : 1.8) : down ? 0.8 : 1;
    const ease = { type: "spring", stiffness: 300, damping: 26 };

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
            <Ring
                className="absolute left-0 top-0 -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border"
                style={{ x: rx, y: ry }}
                animate={{
                    scale: ringScale,
                    opacity: visible && !text ? 1 : 0,
                    backgroundColor: hover ? "rgba(47,107,255,0.12)" : "rgba(47,107,255,0)",
                    borderColor: hover ? "rgba(47,107,255,0.6)" : "rgba(138,146,165,0.6)", // mid-gray reads on light and dark stages
                }}
                transition={{ scale: ease, opacity: { duration: 0.25 }, default: { duration: 0.35 } }}
            />
            <Dot
                className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
                style={{ x, y }}
                animate={{ scale: hover ? 0 : 1, opacity: visible && !text ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
}

export default function Cursor() {
    return useEnabled() ? <CursorLayer /> : null;
}
