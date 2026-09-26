import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE } from "../lib/motion";

/* Section kicker: a numbered index in the electric-blue tint + the label in the
 * display font, uppercase and spaced. On first view the number rolls up, a short
 * accent line draws, and the label decodes out of scrambled glyphs. The label's
 * box is sized by the real text, so nothing shifts while it decodes. */

// Electric blue family, deep -> bright (sleek, single-hue)
export const BLUE = ["#1F4FD8", "#2F6BFF", "#3F63F5", "#5B5CFF", "#4C8DFF", "#22A3E6"];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#%*+=";
const Num = motion.span;
const Rule = motion.span;

function scramble(text, revealed) {
    let out = "";
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        out += i < revealed || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    return out;
}

function Decode({ text, run }) {
    const [shown, setShown] = useState(text);
    useEffect(() => {
        if (!run) return;
        let raf;
        const t0 = performance.now();
        const dur = Math.min(1100, 380 + text.length * 45);
        const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            // hold a beat of pure noise, then resolve left to right
            const revealed = Math.floor(Math.max(0, (p - 0.15) / 0.85) * text.length);
            setShown(p >= 1 ? text : scramble(text, revealed));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [run, text]);

    return (
        <span className="relative inline-block">
            <span aria-hidden="true" className="invisible">{text}</span>
            <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">{run ? shown : ""}</span>
            <span className="sr-only">{text}</span>
        </span>
    );
}

export default function SectionLabel({ n, children, className = "" }) {
    const idx = Math.max(0, parseInt(n, 10) - 1) % BLUE.length;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
    const reduce = useReducedMotion();
    const color = BLUE[idx];
    const on = reduce || inView;

    const label = <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-ink/75">
        {typeof children === "string" && !reduce ? <Decode text={children} run={inView} /> : children}
    </span>;

    return (
        <div ref={ref} className={`flex items-center gap-2.5 ${className}`}>
            <span className="inline-flex overflow-hidden">
                <Num className="inline-block font-mono text-[13px] font-bold tabular-nums" style={{ color }}
                    initial={reduce ? false : { y: "110%", opacity: 0 }}
                    animate={on ? { y: "0%", opacity: 1 } : undefined}
                    transition={{ duration: 0.8, ease: EASE.out }}>
                    {n}
                </Num>
            </span>
            <Rule aria-hidden="true" className="h-px w-6 origin-left" style={{ backgroundColor: color }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={on ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.9, ease: EASE.out, delay: 0.1 }} />
            {label}
        </div>
    );
}
