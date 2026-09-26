import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/* Cycles through phrases with a type / delete effect and a softly breathing
 * caret. Reduced motion: shows the first phrase, still. */
export default function Typewriter({ words, className = "" }) {
    const reduce = useReducedMotion();
    const [i, setI] = useState(0);
    const [text, setText] = useState("");
    const [del, setDel] = useState(false);

    useEffect(() => {
        if (reduce) return;
        const full = words[i % words.length];
        let t;
        if (!del && text === full) {
            t = setTimeout(() => setDel(true), 1600);
        } else if (del && text === "") {
            t = setTimeout(() => {
                setDel(false);
                setI((v) => (v + 1) % words.length);
            }, 180);
        } else {
            t = setTimeout(() => {
                setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
            }, del ? 38 : 70 + Math.random() * 40);
        }
        return () => clearTimeout(t);
    }, [text, del, i, words, reduce]);

    const idle = !del && text === words[i % words.length];

    return (
        <span className={className}>
            {reduce ? words[0] : text}
            <span aria-hidden="true" className={`font-normal text-accent/70 ${idle && !reduce ? "caret-soft" : ""}`}>|</span>
        </span>
    );
}
