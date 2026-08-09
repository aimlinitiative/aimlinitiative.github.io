import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const LINKS = [
    { to: "/program", label: "Program" },
    { to: "/demo", label: "Live Demo" },
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
        <header
            className={`sticky top-0 z-50 transition-colors duration-300 ${
                scrolled ? "border-b border-white/10 bg-ink-900/80 backdrop-blur-xl" : "border-b border-transparent"
            }`}
        >
            <nav className="container-wide flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white" style={{ backgroundImage: "linear-gradient(135deg,#b302e8,#ff5147)" }}>Λ</span>
                    <span className="font-display text-lg font-bold tracking-tight text-white">AIML<span className="text-gradient">·</span>LI</span>
                </Link>

                <div className="hidden items-center gap-1 md:flex">
                    {LINKS.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) =>
                                `rounded-lg px-3.5 py-2 text-sm font-medium transition ${isActive ? "text-white" : "text-white/60 hover:text-white"}`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <Link to="/contact" className="btn-primary ml-2 !px-4 !py-2 !text-xs">Partner with us</Link>
                </div>

                <button
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu" aria-expanded={open}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
                    </svg>
                </button>
            </nav>

            {open && (
                <div className="border-t border-white/10 bg-ink-900/95 px-5 py-4 backdrop-blur-xl md:hidden">
                    <div className="flex flex-col gap-1">
                        {LINKS.map((l) => (
                            <NavLink key={l.to} to={l.to} className={({ isActive }) => `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-white/10 text-white" : "text-white/70"}`}>
                                {l.label}
                            </NavLink>
                        ))}
                        <Link to="/contact" className="btn-primary mt-2 justify-center">Partner with us</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
