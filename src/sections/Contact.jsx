import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { DUR, EASE, SPRING } from "../lib/motion";
import { EMAIL, mailto } from "../content/site";
import { Item, Stagger } from "../components/fx/Stagger";

// Label swap for the copy button: the old label lifts out, the new one rises in.
const LABEL = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: DUR.fast, ease: EASE.out } },
    exit: { opacity: 0, y: -8, transition: { duration: DUR.instant, ease: EASE.out } },
};

function CopyIcon() {
    return (
        <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3.5 8.5 3 3 6-7" />
        </svg>
    );
}

function CopyButton() {
    const [copied, setCopied] = useState(false);
    const timer = useRef(0);
    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
        } catch {
            return; // Clipboard blocked: the address is still on screen to select.
        }
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Motion.button
            type="button"
            onClick={copy}
            whileTap={{ scale: 0.98 }}
            transition={SPRING.press}
            aria-label={copied ? "Email address copied" : "Copy email address"}
            className="btn-secondary w-[7.5rem] overflow-hidden"
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <Motion.span key={copied ? "done" : "copy"} variants={LABEL} initial="initial" animate="animate" exit="exit" className="inline-flex items-center gap-2">
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? "Copied" : "Copy"}
                </Motion.span>
            </AnimatePresence>
            <span className="sr-only" aria-live="polite">{copied ? "Copied to clipboard" : ""}</span>
        </Motion.button>
    );
}

export default function Contact() {
    return (
        <section id="contact" aria-labelledby="contact-title" className="bg-bg py-22 md:py-30">
            <Stagger className="container-page">
                <Item as="h2" id="contact-title" className="text-h2 text-ink">
                    Get in touch
                </Item>
                <Item as="p" className="mt-4 max-w-prose text-lead text-ink2">
                    Partner, fund, teach, or ask a question. We reply to every email.
                </Item>
                <Item className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <a
                        href={mailto()}
                        className="break-all text-h4 text-ink underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors duration-base ease-out hover:decoration-ink sm:text-h3"
                    >
                        {EMAIL}
                    </a>
                    <CopyButton />
                </Item>
            </Stagger>
        </section>
    );
}
