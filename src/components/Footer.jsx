import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT_ANY } from "../lib/motion";
import { SECTION_LINKS } from "./chrome/links";

const EMAIL = "aimlinitiative@gmail.com";

export const SOCIALS = [
    { label: "Instagram", href: "https://instagram.com/", icon: (
        <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>
    ) },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: (
        <><rect x="2" y="2" width="20" height="20" rx="3" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" /></>
    ) },
    { label: "GitHub", href: "https://github.com/aimlinitiative", icon: (
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.7 2.3 5.6 2.6 5.6 2.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    ) },
];

/* Footer (DESIGN.md "footer"): the parchment room after the dark contact
 * stage. Apple-style: a brand block, two link columns (the page's sections;
 * email and socials) and a legal row. The only dense area on the page. */

const Group = motion.div;
const Part = motion.div;
const group = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const part = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE.out } },
};

const link = "focusable group inline-flex items-center gap-1 text-muted transition-colors duration-300 hover:text-ink";

// Small "opens elsewhere" arrow; nudges toward its corner on hover.
function OutArrow() {
    return (
        <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
            className="text-faint transition-transform duration-300 ease-out-expo group-hover:-translate-y-px group-hover:translate-x-px">
            <path d="M3 7 7 3M3.75 3H7v3.25" />
        </svg>
    );
}

function Column({ title, children }) {
    return (
        <Part variants={part}>
            <h2 className="eyebrow">{title}</h2>
            <ul className="mt-5 space-y-3">{children}</ul>
        </Part>
    );
}

export default function Footer() {
    const reduce = useReducedMotion();
    return (
        <footer className="bg-parchment text-body-sm text-faint">
            <Group className="container-page pb-10 pt-16" variants={group} initial={reduce ? false : "hidden"} whileInView="show" viewport={VIEWPORT_ANY}>
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <Part variants={part} className="flex items-center gap-3 self-start lg:col-span-5">
                        <img src="/logo.jpg" alt="" width="36" height="36" className="h-9 w-9 rounded-[10px] object-cover ring-1 ring-line" />
                        <div>
                            <div className="font-display text-body font-semibold tracking-tight text-ink">AIML-LI</div>
                            <div className="text-muted">AI/ML Literacy Initiative</div>
                        </div>
                    </Part>

                    <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-7">
                        <Column title="Explore">
                            {SECTION_LINKS.map((l) => (
                                <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>
                            ))}
                        </Column>
                        <Column title="Connect">
                            <li>
                                <a href={`mailto:${EMAIL}`} className={link}>
                                    <span className="sm:hidden">Email</span>
                                    <span className="hidden sm:inline">{EMAIL}</span>
                                </a>
                            </li>
                            {SOCIALS.map((s) => (
                                <li key={s.label}>
                                    <a href={s.href} target="_blank" rel="noreferrer" className={link}>{s.label}<OutArrow /></a>
                                </li>
                            ))}
                        </Column>
                    </nav>
                </div>

                <Part variants={part} className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-caption font-normal lg:flex-row lg:items-end lg:justify-between lg:gap-10">
                    <div className="space-y-1">
                        <p>© {new Date().getFullYear()} AI/ML Literacy Initiative. Free, open-source AI curriculum for public schools.</p>
                        <p>Fiscally sponsored by The Hack Foundation (Hack Club), a 501(c)(3) nonprofit, EIN 81-2908499.</p>
                    </div>
                    <p className="lg:shrink-0">Founded by Adrian Erlikhman & Michael Tarekegn · Los Angeles</p>
                </Part>
            </Group>
        </footer>
    );
}
