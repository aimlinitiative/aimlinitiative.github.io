import { useState, useEffect } from "react";

/* Fixed side index rail (dossier). Shows section numbers and tracks scroll,
 * highlighting the section crossing the viewport middle. Label reveals on hover. */

const SECTIONS = [
    { id: "about", n: "01", label: "Who we are" },
    { id: "work", n: "02", label: "What we do" },
    { id: "curriculum", n: "03", label: "Curriculum" },
    { id: "involved", n: "04", label: "Get involved" },
    { id: "contact", n: "05", label: "Contact" },
];

export default function SideRail() {
    const [active, setActive] = useState("about");

    useEffect(() => {
        const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
        if (!els.length) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <nav aria-label="Section index" className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
            <ul className="flex flex-col gap-4">
                {SECTIONS.map((s) => {
                    const on = active === s.id;
                    return (
                        <li key={s.id}>
                            <a href={`#${s.id}`} className="group relative flex items-center gap-3">
                                <span className="h-px rounded-full transition-all duration-300" style={{ width: on ? 24 : 12, backgroundColor: on ? "#2C63B0" : "rgba(21,21,26,0.22)" }} />
                                <span className={`font-mono text-[11px] tabular-nums transition-colors duration-300 ${on ? "text-ink" : "text-faint"}`}>{s.n}</span>
                                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.14em] text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    {s.label}
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
