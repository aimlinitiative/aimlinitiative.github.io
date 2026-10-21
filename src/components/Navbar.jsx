import { useEffect, useState } from "react";
import { SECTION_LINKS } from "../lib/site";

// Three floating pills, after Hivemind's nav: the mark, the sections, the ask.
export default function Navbar() {
    const [open, setOpen] = useState(false);

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
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
            <nav className="mx-auto flex max-w-[70rem] items-center justify-between gap-3" aria-label="Main">
                <a href="/#top" className="glass flex h-11 items-center gap-2 rounded-full pl-1.5 pr-4">
                    <img src="/logo.jpg" alt="" className="h-8 w-8 rounded-full mix-blend-multiply" />
                    <span className="font-display text-[1.0625rem] font-bold tracking-tight">AIML-LI</span>
                </a>

                <div className="glass hidden items-center gap-1 rounded-full p-1 md:flex">
                    {SECTION_LINKS.map((l) => (
                        <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-[0.875rem] font-medium text-ink/80 transition-colors hover:bg-white hover:text-ink">{l.label}</a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <a href="/#involved" className="btn-primary hidden sm:inline-flex">Partner with us</a>
                    <button type="button" className="glass h-11 rounded-full px-4 text-[0.9375rem] font-semibold md:hidden"
                        onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu">
                        {open ? "Close" : "Menu"}
                    </button>
                </div>
            </nav>

            {open && (
                <div id="mobile-menu" className="glass mx-auto mt-2 max-w-[70rem] rounded-card md:hidden">
                    <ul className="px-5 py-2">
                        {[...SECTION_LINKS, { href: "/#involved", label: "Partner with us" }, { href: "/#contact", label: "Contact" }].map((l) => (
                            <li key={l.href}>
                                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-[1.125rem] font-semibold">{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
