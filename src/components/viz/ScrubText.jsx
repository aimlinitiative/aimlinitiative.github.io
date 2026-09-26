import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/* A heading whose characters are scrubbed in by scroll: each glyph tips up out
 * of depth, rises and brightens in sequence as the heading travels up the
 * viewport (and reverses on the way back). Screen readers get the plain text;
 * the animated glyphs are aria-hidden. Reduced motion: plain static text. */

function Glyph({ ch, p, from, to }) {
    const opacity = useTransform(p, [from, to], [0.08, 1]);
    const y = useTransform(p, [from, to], [22, 0]);
    const rotateX = useTransform(p, [from, to], [-70, 0]);
    const scale = useTransform(p, [from, to], [0.82, 1]);
    return (
        <Motion.span className="inline-block origin-bottom" style={{ opacity, y, rotateX, scale, transformPerspective: 600 }}>
            {ch}
        </Motion.span>
    );
}

export default function ScrubText({ text, as = "h2", className = "", offset = ["start 0.95", "start 0.5"] }) {
    const Tag = as;
    const ref = useRef(null);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset });
    const p = useSpring(scrollYProgress, { stiffness: 150, damping: 30, restDelta: 0.001 });

    if (reduced) return <Tag ref={ref} className={className}>{text}</Tag>;

    const words = text.split(" ");
    const total = text.replace(/ /g, "").length;
    const span = 0.35; // share of the scroll range each glyph takes to settle
    let idx = 0;
    return (
        <Tag ref={ref} className={className}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {words.map((w, wi) => (
                    <span key={wi} className="inline-block whitespace-nowrap">
                        {[...w].map((ch, ci) => {
                            const from = (idx++ / total) * (1 - span);
                            return <Glyph key={ci} ch={ch} p={p} from={from} to={from + span} />;
                        })}
                        {wi < words.length - 1 && " "}
                    </span>
                ))}
            </span>
        </Tag>
    );
}
