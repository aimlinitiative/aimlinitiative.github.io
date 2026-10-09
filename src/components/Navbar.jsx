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
        <header className="sticky top-0 z-50 border-b border-line bg-bg">
            <nav className="page flex h-16 items-center justify-between" aria-label="Main">
                <a href="/#top" className="flex items-center gap-3">
                    <img src="/logo.jpg" alt="" className="h-7 w-7 rounded" />
                    <span className="text-small font-semibold tracking-tight">AIML-LI</span>
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    {SECTION_LINKS.map((l) => (
                        <a key={l.href} href={l.href} className="text-small text-dim transition-colors hover:text-fg">{l.label}</a>
                    ))}
                    <a href="/#contact" className="btn-primary h-8 px-3">Contact</a>
                </div>

                <button type="button" className="text-small font-medium md:hidden"
                    onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu">
                    {open ? "Close" : "Menu"}
                </button>
            </nav>

            {open && (
                <div id="mobile-menu" className="border-t border-line md:hidden">
                    <ul className="page py-2">
                        {[...SECTION_LINKS, { href: "/#contact", label: "Contact" }].map((l) => (
                            <li key={l.href}>
                                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-body">{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
