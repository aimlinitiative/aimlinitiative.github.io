import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { EASE, SPRING } from "../lib/motion";

const LINKS = [
    { href: "#about", label: "Who we are" },
    { href: "#curriculum", label: "Curriculum" },
    { href: "#summit", label: "Summit" },
    { href: "#supporters", label: "Supporters" },
    { href: "#involved", label: "Get involved" },
    { href: "#contact", label: "Contact" },
];
const IDS = LINKS.map((l) => l.href.slice(1));

const Header = motion.header;
const Pill = motion.span;
const Line = motion.span;
const Overlay = motion.div;
const List = motion.div;
const Item = motion.a;
const Wrap = motion.div;

// Which linked section sits under a reading line ~35% down the viewport.
function currentSection() {
    const line = window.innerHeight * 0.35;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    let found = null;
    for (const id of IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) found = id;
        if (atBottom && r.top < window.innerHeight * 0.8) found = id; // short last section
    }
    return found;
}

// True while a dark element (data-nav-theme="dark") sits under the whole bar.
// The rect includes transforms, so the hero stage shrinking away counts.
function overDark() {
    for (const el of document.querySelectorAll('[data-nav-theme="dark"]')) {
        const r = el.getBoundingClientRect();
        if (r.top <= 32 && r.bottom >= 64) return true;
    }
    return false;
}

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
    exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: "60%", filter: "blur(10px)" },
    show: { opacity: 1, y: "0%", filter: "blur(0px)", transition: { duration: 0.9, ease: EASE.out } },
    exit: { opacity: 0, y: "-30%", filter: "blur(6px)", transition: { duration: 0.25, ease: EASE.inOut } },
};
// The overlay opens as a circle growing out of the menu button (top right).
const ORIGIN = "calc(100% - 44px) 32px";
const overlayVariants = {
    hidden: { clipPath: `circle(0px at ${ORIGIN})` },
    show: { clipPath: `circle(150% at ${ORIGIN})`, transition: { duration: 0.9, ease: EASE.inOut } },
    exit: { clipPath: `circle(0px at ${ORIGIN})`, transition: { duration: 0.6, ease: EASE.inOut, delay: 0.12 } },
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [active, setActive] = useState(null);
    const [dark, setDark] = useState(false);
    const { scrollY } = useScroll();
    const dir = useRef({ last: 0, anchor: 0, sign: 0 });

    const sync = useCallback((y) => {
        const d = dir.current;
        const sign = Math.sign(y - d.last);
        if (sign && sign !== d.sign) { d.sign = sign; d.anchor = d.last; }
        d.last = y;
        setScrolled(y > 8);
        // Hide after a deliberate scroll down past the hero, reveal on any real scroll up.
        if (y < 140) setHidden(false);
        else if (d.sign > 0 && y - d.anchor > 28) setHidden(true);
        else if (d.sign < 0 && d.anchor - y > 12) setHidden(false);
        setActive(currentSection());
        setDark(overDark());
    }, []);

    useMotionValueEvent(scrollY, "change", sync);
    useEffect(() => { sync(window.scrollY); }, [sync]);

    // Close the mobile menu on Escape or when the viewport grows past the breakpoint.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        const mq = window.matchMedia("(min-width: 1024px)");
        const onMq = () => mq.matches && setOpen(false);
        const root = document.documentElement;
        const prevOverflow = root.style.overflow;
        root.style.overflow = "hidden"; // page behind the full-screen menu stays put
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onMq);
        return () => {
            root.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onMq);
        };
    }, [open]);

    const frosted = scrolled && !open;
    const onDark = dark && !open; // the full-screen menu is light
    const reduce = useReducedMotion();
    const concealed = hidden && !open && !reduce; // no sliding chrome for reduced motion

    return (
        <>
            <Header
                className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${frosted ? (onDark ? "border-white/10 bg-stage/60 backdrop-blur-xl backdrop-saturate-150" : "border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150") : "border-transparent bg-transparent"}`}
                initial={false}
                animate={{ y: concealed ? "-100%" : "0%", opacity: concealed ? 0 : 1 }}
                transition={{ duration: concealed ? 0.45 : 0.55, ease: concealed ? EASE.inOut : EASE.out }}
                onFocusCapture={() => setHidden(false)}
            >
                <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
                    <a href="#top" className="focusable group flex items-center gap-2.5">
                        <img src="/logo.jpg" alt="AIML-LI" className={`h-8 w-8 rounded-lg object-cover ring-1 ${onDark ? "ring-white/15" : "ring-line"} transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]`} />
                        <span className={`display text-[15px] font-semibold tracking-tight transition-colors duration-500 ${onDark ? "text-white" : "text-ink"}`}>AIML-LI</span>
                    </a>

                    <LayoutGroup id="nav">
                        <div className="hidden items-center gap-2 lg:flex">
                            {LINKS.map((l) => {
                                const isActive = active === l.href.slice(1);
                                return (
                                    <a key={l.href} href={l.href} data-active={isActive} aria-current={isActive ? "true" : undefined}
                                        className={`focusable relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${isActive ? "text-ink" : onDark ? "text-white/70 hover:text-white" : "text-muted hover:text-ink"}`}>
                                        <AnimatePresence>
                                            {isActive && (
                                                <Pill layoutId="nav-pill" aria-hidden="true"
                                                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(11,13,18,0.06),0_6px_18px_-8px_rgba(47,107,255,0.45)] ring-1 ring-inset ring-ink/[0.06]"
                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                    transition={{ ...SPRING.snappy, opacity: { duration: 0.3 } }} />
                                            )}
                                        </AnimatePresence>
                                        <span className="relative">{l.label}</span>
                                    </a>
                                );
                            })}
                            <a href="#involved" className="btn-accent ml-4 !px-4 !py-2 text-sm">Partner with us</a>
                        </div>
                    </LayoutGroup>

                    <button type="button"
                        className={`focusable relative flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-500 lg:hidden ${onDark ? "border-white/15 text-white hover:border-white/30" : "border-line text-ink hover:border-ink/20"}`}
                        onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu">
                        <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
                            {[-1, 0, 1].map((k) => (
                                <Line key={k} className="absolute left-0 top-1/2 -mt-[0.75px] h-[1.5px] w-full rounded-full bg-current"
                                    initial={false}
                                    animate={open
                                        ? { y: 0, rotate: k * 45, opacity: k === 0 ? 0 : 1, scaleX: k === 0 ? 0.4 : 1 }
                                        : { y: k * 6, rotate: 0, opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.42, ease: EASE.inOut }} />
                            ))}
                        </span>
                    </button>
                </nav>
            </Header>

            <AnimatePresence>
                {open && (
                    <Overlay key="menu" id="mobile-menu" data-lenis-prevent
                        className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-bg/[0.98] backdrop-blur-2xl lg:hidden"
                        variants={overlayVariants} initial="hidden" animate="show" exit="exit">
                        {/* soft signature glow in the corner the menu grows from */}
                        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(47,107,255,0.22),rgba(124,92,255,0.12),transparent)]" />
                        <List className="container-page relative flex flex-1 flex-col justify-center pb-10 pt-24" variants={listVariants} initial="hidden" animate="show" exit="exit">
                            {LINKS.map((l, i) => {
                                const isActive = active === l.href.slice(1);
                                return (
                                    <div key={l.href} className="overflow-hidden border-b border-line py-1 last:border-0">
                                        <Item href={l.href} variants={itemVariants} onClick={() => setOpen(false)}
                                            aria-current={isActive ? "true" : undefined}
                                            className="focusable group flex items-baseline gap-4 py-2.5">
                                            <span className="w-6 font-mono text-[11px] font-semibold tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
                                            <span className={`display text-[2.1rem] font-semibold leading-none tracking-tightest transition-colors duration-300 ${isActive ? "text-gradient" : "text-ink group-active:text-accent"}`}>
                                                {l.label}
                                            </span>
                                        </Item>
                                    </div>
                                );
                            })}
                            <Wrap variants={itemVariants} className="mt-8 flex">
                                <a href="#involved" onClick={() => setOpen(false)} className="btn-accent flex-1 justify-center py-3.5 text-base">Partner with us</a>
                            </Wrap>
                        </List>
                    </Overlay>
                )}
            </AnimatePresence>
        </>
    );
}
