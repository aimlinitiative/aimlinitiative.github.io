import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const linkBase =
        "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100";
    const linkActive = "text-blue-600";
    const linkInactive = "text-gray-700";

    const NavItem = ({ to, end, children }) => (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
            onClick={() => setOpen(false)}
        >
            {children}
        </NavLink>
    );

    return (
        <nav className="border-b bg-white">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="text-lg font-bold tracking-tight">
                        AIML Initiative
                    </Link>

                    <button
                        className="inline-flex items-center rounded-md p-2 lg:hidden"
                        aria-label="Toggle menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            {open ? (
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    <div className="hidden items-center gap-1 lg:flex">
                        <NavItem to="/" end>
                            Home
                        </NavItem>
                        <NavItem to="/about">About</NavItem>
                        <NavItem to="/resources">Resources</NavItem>
                    </div>
                </div>
            </div>

            {open && (
                <div className="border-t lg:hidden">
                    <div className="mx-auto max-w-6xl px-4 py-2">
                        <div className="flex flex-col gap-1">
                            <NavItem to="/" end>
                                Home
                            </NavItem>
                            <NavItem to="/about">About</NavItem>
                            <NavItem to="/resources">Resources</NavItem>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
