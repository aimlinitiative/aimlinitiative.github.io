import { useEffect, useState } from "react";

/* Cycles through phrases with a type / delete effect. */
export default function Typewriter({ words, className = "" }) {
    const [i, setI] = useState(0);
    const [text, setText] = useState("");
    const [del, setDel] = useState(false);

    useEffect(() => {
        const full = words[i % words.length];
        let t;
        if (!del && text === full) {
            t = setTimeout(() => setDel(true), 1400);
        } else if (del && text === "") {
            setDel(false);
            setI((v) => (v + 1) % words.length);
        } else {
            t = setTimeout(() => {
                setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
            }, del ? 45 : 80);
        }
        return () => clearTimeout(t);
    }, [text, del, i, words]);

    return (
        <span className={className}>
            {text}
            <span className="font-normal text-brand/50">|</span>
        </span>
    );
}
