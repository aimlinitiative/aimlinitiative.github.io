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
const Panel = motion.div;
const Scrim = motion.div;
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

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: -6, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE.out } },
    exit: { opacity: 0, y: -4, filter: "blur(4px)", transition: { duration: 0.18, ease: EASE.inOut } },
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [active, setActive] = useState(null);
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
    }, []);

    useMotionValueEvent(scrollY, "change", sync);
    useEffect(() => { sync(window.scrollY); }, [sync]);

    // Close the mobile menu on Escape or when the viewport grows past the breakpoint.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        const mq = window.matchMedia("(min-width: 1024px)");
        const onMq = () => mq.matches && setOpen(false);
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onMq);
        return () => { window.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); };
    }, [open]);

    const frosted = scrolled || open;
    const reduce = useReducedMotion();
    const concealed = hidden && !open && !reduce; // no sliding chrome for reduced motion

    return (
        <>
            <Header
                className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${frosted ? "border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent"}`}
                initial={false}
                animate={{ y: concealed ? "-100%" : "0%" }}
                transition={{ duration: concealed ? 0.45 : 0.55, ease: concealed ? EASE.inOut : EASE.out }}
                onFocusCapture={() => setHidden(false)}
            >
                <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
                    <a href="#top" className="focusable group flex items-center gap-2.5">
                        <img src="/logo.jpg" alt="AIML-LI" className="h-8 w-8 rounded-lg object-cover ring-1 ring-line transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]" />
                        <span className="display text-[15px] font-semibold tracking-tight text-ink">AIML-LI</span>
                    </a>

                    <LayoutGroup id="nav">
                        <div className="hidden items-center gap-2 lg:flex">
                            {LINKS.map((l) => {
                                const isActive = active === l.href.slice(1);
                                return (
                                    <a key={l.href} href={l.href} data-active={isActive} aria-current={isActive ? "true" : undefined}
                                        className={`focusable relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${isActive ? "text-ink" : "text-muted hover:text-ink"}`}>
                                        <AnimatePresence>
                                            {isActive && (
                                                <Pill layoutId="nav-pill" aria-hidden="true"
                                                    className="absolute inset-0 rounded-full bg-ink/[0.055] ring-1 ring-inset ring-ink/[0.04]"
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
                        className="focusable relative flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-ink/20 lg:hidden"
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
                    <Scrim key="scrim" aria-hidden="true" onClick={() => setOpen(false)}
                        className="fixed inset-0 top-16 z-40 bg-ink/10 backdrop-blur-[2px] lg:hidden"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE.out }} />
                )}
                {open && (
                    <Panel key="menu" id="mobile-menu"
                        className="fixed inset-x-0 top-16 z-50 border-b border-line bg-bg/90 shadow-lift backdrop-blur-xl backdrop-saturate-150 lg:hidden"
                        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)", transition: { duration: 0.55, ease: EASE.out } }}
                        exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)", transition: { duration: 0.32, ease: EASE.inOut, delay: 0.05 } }}>
                        <List className="container-page flex flex-col py-3" variants={listVariants} initial="hidden" animate="show" exit="exit">
                            {LINKS.map((l) => {
                                const isActive = active === l.href.slice(1);
                                return (
                                    <Item key={l.href} href={l.href} variants={itemVariants} onClick={() => setOpen(false)}
                                        aria-current={isActive ? "true" : undefined}
                                        className={`focusable flex items-center justify-between border-b border-line py-3 text-sm font-medium last:border-0 ${isActive ? "text-accent" : "text-ink"}`}>
                                        {l.label}
                                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                                    </Item>
                                );
                            })}
                            <Wrap variants={itemVariants} className="mb-1 mt-3 flex">
                                <a href="#involved" onClick={() => setOpen(false)} className="btn-accent flex-1 justify-center">Partner with us</a>
                            </Wrap>
                        </List>
                    </Panel>
                )}
            </AnimatePresence>
        </>
    );
}
