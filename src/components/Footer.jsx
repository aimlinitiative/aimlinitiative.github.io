import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT_ANY } from "../lib/motion";

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

const Group = motion.div;
const Part = motion.div;
const group = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const part = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE.out } },
};
const iconBtn = "flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-[color,background-color,border-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent hover:bg-accentsoft hover:text-accent";

export default function Footer() {
    const reduce = useReducedMotion();
    return (
        <footer className="relative border-t border-line bg-bg">
            {/* signature hairline glow along the top edge */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <Group className="container-page py-12" variants={group} initial={reduce ? false : "hidden"} whileInView="show" viewport={VIEWPORT_ANY}>
                <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
                    <Part variants={part} className="flex items-center gap-3">
                        <img src="/logo.jpg" alt="AIML-LI" className="h-9 w-9 rounded-lg object-cover ring-1 ring-black/10" />
                        <div>
                            <div className="display font-semibold text-ink">AIML-LI</div>
                            <div className="text-sm text-muted">AI/ML Literacy Initiative</div>
                        </div>
                    </Part>

                    <Part variants={part} className="flex items-center gap-3">
                        {SOCIALS.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className={iconBtn}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                            </a>
                        ))}
                        <a href={`mailto:${EMAIL}`} aria-label="Email" className={iconBtn}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                        </a>
                    </Part>
                </div>

                <Part variants={part} className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-end">
                    <div className="space-y-1">
                        <p>© {new Date().getFullYear()} AI/ML Literacy Initiative. Free, open-source AI curriculum for public schools.</p>
                        <p>Fiscally sponsored by The Hack Foundation (Hack Club), a 501(c)(3) nonprofit, EIN 81-2908499.</p>
                    </div>
                    <p>Founded by Adrian Erlikhman & Michael Tarekegn · Los Angeles</p>
                </Part>
            </Group>
        </footer>
    );
}
