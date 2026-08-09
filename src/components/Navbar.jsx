import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Magnetic from "./Magnetic";

const LINKS = [
    { to: "/program", label: "Program", n: "01" },
    { to: "/demo", label: "Live Demo", n: "02" },
    { to: "/about", label: "About", n: "03" },
    { to: "/contact", label: "Contact", n: "04" },
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
                scrolled ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
            }`}
        >
            <nav className="container-wide flex h-20 items-center justify-between">
                <Magnetic strength={0.25}>
                    <Link to="/" className="serif text-2xl font-semibold tracking-tight text-ink" data-cursor>
                        AIML<span className="text-accent">·</span>LI
                    </Link>
                </Magnetic>

                <div className="hidden items-center gap-8 md:flex">
                    {LINKS.map((l) => (
                        <Magnetic key={l.to} strength={0.3}>
                            <NavLink
                                to={l.to}
                                className={({ isActive }) =>
                                    `label ulink flex items-center gap-1.5 !text-[12px] ${isActive ? "text-ink" : "text-ink2"}`
                                }
                            >
                                <span className="index-num">{l.n}</span>
                                {l.label}
                            </NavLink>
                        </Magnetic>
                    ))}
                    <Magnetic strength={0.4}>
                        <Link to="/contact" className="btn-primary !px-5 !py-2.5 !text-xs" data-cursor>
                            Partner with us
                        </Link>
                    </Magnetic>
                </div>

                <button
                    className="flex h-10 w-10 items-center justify-center md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
                    </svg>
                </button>
            </nav>

            {open && (
                <div className="border-t border-ink/10 bg-paper px-5 py-5 md:hidden">
                    <div className="flex flex-col divide-y divide-ink/10">
                        {LINKS.map((l) => (
                            <NavLink key={l.to} to={l.to} className="label flex items-center gap-2 py-4 !text-sm text-ink">
                                <span className="index-num">{l.n}</span>
                                {l.label}
                            </NavLink>
                        ))}
                        <Link to="/contact" className="btn-primary mt-4 justify-center">Partner with us</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
