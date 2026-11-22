import { SECTION_LINKS } from "../lib/site";

// The mark, the sections as outlined pills, and the ask.
export default function Navbar() {
    return (
        <header className="bar">
            <a className="logo" href="/" aria-label="AIML-LI, home">
                <img src="/logo.jpg" alt="" width="30" height="30" />
                AIML-LI
            </a>
            <nav className="pills" aria-label="Sections">
                {SECTION_LINKS.map((l) => (
                    <a key={l.href} href={l.href}>{l.label}</a>
                ))}
            </nav>
            <div className="right"><a href="/#signup">Sign up →</a></div>
        </header>
    );
}
