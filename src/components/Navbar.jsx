import { useEffect, useState } from "react";
import { SECTION_LINKS } from "../lib/site";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    // Close the menu on Escape or when the window grows past the breakpoint.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        const mq = window.matchMedia("(min-width: 768px)");
        const onMq = () => mq.matches && setOpen(false);
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onMq);
        return () => {
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onMq);
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
            <nav className="page flex h-16 items-center justify-between" aria-label="Main">
                <a href="/#top" className="flex items-center gap-2.5">
                    <img src="/logo.jpg" alt="" className="h-9 w-9 mix-blend-multiply" />
                    <span className="font-display text-[1.1875rem] font-extrabold tracking-tight">AIML-LI</span>
                </a>

                <div className="hidden items-center gap-1 md:flex">
                    {SECTION_LINKS.map((l) => (
                        <a key={l.href} href={l.href} className="rounded-full px-3.5 py-2 font-display text-[0.9375rem] font-bold hover:bg-sky">{l.label}</a>
                    ))}
                    <a href="/#involved" className="btn-ink ml-2 h-10 px-5 text-[0.9375rem]">Get involved</a>
                </div>

                <button type="button" className="font-display font-bold md:hidden"
                    onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu">
                    {open ? "Close" : "Menu"}
                </button>
            </nav>

            {open && (
                <div id="mobile-menu" className="border-t border-line bg-white md:hidden">
                    <ul className="page py-2">
                        {[...SECTION_LINKS, { href: "/#involved", label: "Get involved" }, { href: "/#contact", label: "Contact" }].map((l) => (
                            <li key={l.href}>
                                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-[1.125rem] font-bold">{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
