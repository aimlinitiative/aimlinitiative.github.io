import { useState, useEffect } from "react";

const LINKS = [
    { href: "#about", label: "Who we are" },
    { href: "#work", label: "What we do" },
    { href: "#curriculum", label: "Curriculum" },
    { href: "#involved", label: "Get involved" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent"}`}>
            <nav className="container-page flex h-16 items-center justify-between">
                <a href="#top" className="focusable flex items-center gap-2.5">
                    <img src="/logo.jpg" alt="AIML-LI" className="h-8 w-8 rounded-lg object-cover ring-1 ring-line" />
                    <span className="display text-[15px] font-semibold tracking-tight text-ink">AIML-LI</span>
                </a>

                <div className="hidden items-center gap-9 md:flex">
                    {LINKS.map((l) => (
                        <a key={l.href} href={l.href} className="focusable text-sm font-medium text-muted transition-colors hover:text-ink">{l.label}</a>
                    ))}
                    <a href="#involved" className="btn-accent !px-4 !py-2 text-sm">Partner with us</a>
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink md:hidden"
                    onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
                    </svg>
                </button>
            </nav>

            {open && (
                <div className="border-t border-line bg-bg px-6 py-3 md:hidden">
                    <div className="flex flex-col">
                        {LINKS.map((l) => (
                            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3 text-sm font-medium text-ink last:border-0">{l.label}</a>
                        ))}
                        <a href="#involved" onClick={() => setOpen(false)} className="btn-accent mt-3 justify-center">Partner with us</a>
                    </div>
                </div>
            )}
        </header>
    );
}
