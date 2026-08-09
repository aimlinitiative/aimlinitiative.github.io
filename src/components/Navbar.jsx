import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const LINKS = [
    { to: "/program", label: "Program" },
    { to: "/demo", label: "Playground" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => setOpen(false), [pathname]);

    return (
        <header className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? "border-b border-white/[0.08] bg-ink-900/70 backdrop-blur-xl" : "border-b border-transparent"}`}>
            <nav className="container-wide flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5">
                    <img src="/logo.jpg" alt="AIML-LI" className="logo-tile h-9 w-9 object-cover" />
                    <span className="font-display text-[15px] font-bold tracking-tight text-white">AIML-LI</span>
                </Link>

                <div className="hidden items-center gap-1 md:flex">
                    {LINKS.map((l) => (
                        <NavLink key={l.to} to={l.to}
                            className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "text-white" : "text-white/55 hover:text-white"}`}>
                            {l.label}
                        </NavLink>
                    ))}
                    <div className="mx-2 h-5 w-px bg-white/10" />
                    <a href="https://github.com/aimlinitiative" target="_blank" rel="noreferrer" className="rounded-lg px-3 py-2 text-sm font-medium text-white/55 transition hover:text-white">GitHub ↗</a>
                    <Link to="/contact" className="btn-primary ml-1 !py-2">Partner with us</Link>
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
                    onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
                    </svg>
                </button>
            </nav>

            {open && (
                <div className="border-t border-white/[0.08] bg-ink-900/95 px-5 py-4 backdrop-blur-xl md:hidden">
                    <div className="flex flex-col gap-1">
                        {LINKS.map((l) => (
                            <NavLink key={l.to} to={l.to} className={({ isActive }) => `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-white/10 text-white" : "text-white/70"}`}>
                                {l.label}
                            </NavLink>
                        ))}
                        <Link to="/contact" className="btn-brand mt-2 justify-center">Partner with us</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
