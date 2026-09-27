import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { COLORS } from "../../lib/palette";
import { rgba, toneOf } from "./tone";

/* Desktop cursor companion, kept quiet (DESIGN.md: chrome stays flat, motion
 * is the only ornament): a small dot plus a hairline ring that trails on a
 * spring. Neutral, never blue: ink/25 on light grounds, white/35 over the dark
 * stages. Over links and buttons it shrinks into the pointer and fades, and
 * lets the control's own hover state speak, so it never frames a control like
 * a focus ring. The native cursor stays as-is. Only mounts for a fine pointer
 * with hover and no reduced-motion preference, so touch devices never see it. */

const Dot = motion.div;
const Ring = motion.div;
const INTERACTIVE = "a, button, [role='button'], summary, label, select, [data-cursor]";
const TEXT = "input, textarea, [contenteditable='true']";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const TONE = {
    light: { ring: rgba(COLORS.ink, 0.25), dot: COLORS.ink },
    dark: { ring: rgba(COLORS.canvas, 0.35), dot: COLORS.canvas },
};

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
    const [state, setState] = useState({ visible: false, hover: false, text: false, down: false, dark: false });

    useEffect(() => {
        const set = (patch) => setState((s) => {
            for (const k in patch) if (s[k] !== patch[k]) return { ...s, ...patch };
            return s;
        });
        let px = -1;
        let py = -1;
        let last = 0;
        let timer;
        // What is under the pointer: a control, a text field, a dark stage?
        const probe = (t) => {
            if (!(t instanceof Element)) return;
            set({ hover: !!t.closest(INTERACTIVE), text: !!t.closest(TEXT), dark: toneOf(t) === "dark" });
        };
        const move = (e) => {
            if (e.pointerType && e.pointerType !== "mouse") return;
            px = e.clientX;
            py = e.clientY;
            x.set(px);
            y.set(py);
            set({ visible: true });
        };
        const over = (e) => probe(e.target);
        // Content also scrolls under a resting pointer: re-probe (throttled, plus a trailing check).
        const scroll = () => {
            if (px < 0) return;
            const run = () => { last = performance.now(); probe(document.elementFromPoint(px, py)); };
            clearTimeout(timer);
            if (performance.now() - last > 100) run();
            timer = setTimeout(run, 120);
        };
        const leave = () => set({ visible: false });
        const down = () => set({ down: true });
        const up = () => set({ down: false });
        window.addEventListener("pointermove", move, { passive: true });
        document.addEventListener("pointerover", over, { passive: true });
        document.documentElement.addEventListener("pointerleave", leave);
        window.addEventListener("pointerdown", down, { passive: true });
        window.addEventListener("pointerup", up, { passive: true });
        window.addEventListener("scroll", scroll, { passive: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener("pointermove", move);
            document.removeEventListener("pointerover", over);
            document.documentElement.removeEventListener("pointerleave", leave);
            window.removeEventListener("pointerdown", down);
            window.removeEventListener("pointerup", up);
            window.removeEventListener("scroll", scroll);
        };
    }, [x, y]);

    const { visible, hover, text, down, dark } = state;
    const tone = dark ? TONE.dark : TONE.light;
    const ringScale = hover ? 0.5 : down ? 0.86 : 1;
    const spring = { type: "spring", stiffness: 300, damping: 26 };
    const shown = visible && !text && !hover ? 1 : 0;

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
            <Ring
                className="absolute left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border"
                style={{ x: rx, y: ry }}
                initial={false}
                animate={{ scale: ringScale, opacity: shown, borderColor: tone.ring }}
                transition={{ scale: spring, opacity: { duration: 0.25 }, default: { duration: 0.35 } }}
            />
            <Dot
                className="absolute left-0 top-0 -ml-0.5 -mt-0.5 h-1 w-1 rounded-full"
                style={{ x, y }}
                initial={false}
                animate={{ scale: hover ? 0 : 1, opacity: shown, backgroundColor: tone.dot }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
}

export default function Cursor() {
    return useEnabled() ? <CursorLayer /> : null;
}
