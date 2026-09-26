import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const pick = (s) => s[(Math.random() * s.length) | 0];
const glyph = (ch) => (/[0-9]/.test(ch) ? pick(DIGIT) : /[A-Z]/.test(ch) ? pick(UPPER) : /[a-z]/.test(ch) ? pick(LOWER) : ch);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// One frame: resolved text up to the cursor, a short band of scrambled glyphs
// ahead of it, nothing after that.
function frame(text, t, band) {
    const cursor = easeOut(t) * (text.length + band);
    let out = "";
    for (let i = 0; i < text.length; i++) {
        if (i < cursor - band) out += text[i];
        else if (i < cursor) out += glyph(text[i]);
        else break;
    }
    return out;
}

/* DecodeText: text that resolves out of scrambled glyphs, left to right, when
 * it scrolls into view (letters stay letters, digits stay digits, spaces and
 * punctuation hold). The real text reserves the layout, so nothing reflows,
 * and screen readers only ever get the real text.
 *   text      the string to show
 *   duration  seconds for the full decode (1.1)
 *   delay     seconds before it starts (0)
 *   band      how many scrambled glyphs run ahead of the cursor (8)
 *   className classes on the wrapper (it is a relative block)
 * Reduced motion: plain text. */
export default function DecodeText({ text, duration = 1.1, delay = 0, band = 8, className = "" }) {
    const wrap = useRef(null);
    const live = useRef(null);
    const reduce = useReducedMotion();
    const inView = useInView(wrap, { once: true, amount: 0.6 });

    useEffect(() => {
        if (reduce || !inView || !live.current) return;
        const el = live.current;
        const start = performance.now() + delay * 1000;
        let raf = 0;
        let last = 0;
        const tick = (now) => {
            const t = Math.min(1, Math.max(0, (now - start) / (duration * 1000)));
            // Swap glyphs ~30 times a second so the scramble stays legible.
            if (t === 1 || now - last > 33) {
                el.textContent = t === 1 ? text : frame(text, t, band);
                last = now;
            }
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, reduce, text, duration, delay, band]);

    if (reduce) return <span className={`block ${className}`}>{text}</span>;
    return (
        <span ref={wrap} className={`relative block ${className}`}>
            <span className="sr-only">{text}</span>
            <span aria-hidden className="invisible">{text}</span>
            <span aria-hidden ref={live} className="absolute inset-0" />
        </span>
    );
}
