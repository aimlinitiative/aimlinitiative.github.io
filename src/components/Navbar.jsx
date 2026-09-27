import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { EASE, SPRING } from "../lib/motion";
import { toneOf } from "./chrome/tone";

/* Navbar (DESIGN.md "nav"): a 56px bar, clear over the hero, frosted once the
 * page scrolls (canvas/80 on light grounds, stage/60 over the dark stages). It
 * hides on a deliberate scroll down and returns on any scroll up; the section
 * being read wears a quiet pill. Below lg the links live in a full-screen menu
 * that grows out of the menu button. */

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
const List = motion.nav;
const Row = motion.span;
const Wrap = motion.div;

// Focus ring that keeps the element's own radius (pills stay pills).
const RING = "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentdk";

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

// Light or dark content under the middle of the bar (the bar and the menu
// themselves excluded; chrome layers are pointer-events: none, so hit-testing skips them).
function themeUnderNav() {
    const el = document.elementsFromPoint(window.innerWidth / 2, 28).find((e) => !e.closest("header, #mobile-menu"));
    return toneOf(el);
}

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
    exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
// Each row rises out of its own mask, un-blurring as it lands.
const itemVariants = {
    hidden: { opacity: 0, y: "60%", filter: "blur(10px)" },
    show: { opacity: 1, y: "0%", filter: "blur(0px)", transition: { duration: 0.9, ease: EASE.out } },
    exit: { opacity: 0, y: "-30%", filter: "blur(6px)", transition: { duration: 0.25, ease: EASE.inOut } },
};
// The menu opens as a circle growing out of the menu button; `o` is its center.
const overlayVariants = {
    hidden: (o) => ({ clipPath: `circle(0px at ${o})` }),
    show: (o) => ({ clipPath: `circle(150% at ${o})`, transition: { duration: 0.9, ease: EASE.inOut } }),
    exit: (o) => ({ clipPath: `circle(0px at ${o})`, transition: { duration: 0.6, ease: EASE.inOut, delay: 0.12 } }),
};
// Reduced motion: the menu and its rows simply fade.
const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [active, setActive] = useState(null);
    const [tone, setTone] = useState("light");
    const [origin, setOrigin] = useState("calc(100% - 36px) 28px");
    const toneAt = useRef(0);
    const button = useRef(null);
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
        const now = performance.now();
        if (now - toneAt.current > 90) { toneAt.current = now; setTone(themeUnderNav()); }
    }, []);

    useMotionValueEvent(scrollY, "change", sync);
    useLayoutEffect(() => { sync(window.scrollY); }, [sync]);
    // Trailing check so the tone is right once scrolling settles.
    useMotionValueEvent(scrollY, "change", () => {
        clearTimeout(toneAt.timer);
        toneAt.timer = setTimeout(() => setTone(themeUnderNav()), 140);
    });
    useEffect(() => () => clearTimeout(toneAt.timer), []);

    // While the menu is open: Escape closes it (focus back on the button), growing
    // past the breakpoint closes it, and the page behind stays put and out of reach.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key !== "Escape") return;
            setOpen(false);
            button.current?.focus();
        };
        const mq = window.matchMedia("(min-width: 1024px)");
        const onMq = () => mq.matches && setOpen(false);
        const root = document.documentElement;
        const prevOverflow = root.style.overflow;
        root.style.overflow = "hidden";
        const behind = [...document.querySelectorAll("main, body > #root footer")];
        behind.forEach((el) => { el.inert = true; });
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onMq);
        return () => {
            root.style.overflow = prevOverflow;
            behind.forEach((el) => { el.inert = false; });
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onMq);
        };
    }, [open]);

    const frosted = scrolled && !open;
    const dark = tone === "dark" && !open;
    const reduce = useReducedMotion();
    const concealed = hidden && !open && !reduce; // no sliding chrome for reduced motion

    // Other chrome (the reading-progress bar) follows the bar's tone.
    useEffect(() => {
        document.documentElement.dataset.chromeTone = dark ? "dark" : "light";
    }, [dark]);

    const toggle = () => {
        const r = button.current?.getBoundingClientRect();
        if (r) setOrigin(`${Math.round(r.left + r.width / 2)}px ${Math.round(r.top + r.height / 2)}px`);
        setOpen((v) => !v);
    };

    const bar = frosted
        ? dark
            ? "border-stageline bg-stage/60 backdrop-blur-xl backdrop-saturate-150"
            : "border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
        : "border-transparent bg-transparent";

    return (
        <>
            <Header
                data-nav-theme={dark ? "dark" : "light"}
                className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${bar}`}
                initial={false}
                animate={{ y: concealed ? "-100%" : "0%", opacity: concealed ? 0 : 1 }}
                transition={{ duration: concealed ? 0.45 : 0.55, ease: concealed ? EASE.inOut : EASE.out }}
                onFocusCapture={() => setHidden(false)}
            >
                <nav className="container-page flex h-14 items-center justify-between" aria-label="Main">
                    <a href="#top" onClick={() => setOpen(false)} className={`${RING} group -ml-1 flex items-center gap-2.5 rounded-lg p-1`}>
                        <img src="/logo.jpg" alt="" width="28" height="28"
                            className={`h-7 w-7 rounded-lg object-cover ring-1 transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] ${dark ? "ring-white/15" : "ring-line"}`} />
                        <span className={`font-display text-body-sm font-semibold tracking-tight transition-colors duration-500 ${dark ? "text-white" : "text-ink"}`}>AIML-LI</span>
                    </a>

                    <LayoutGroup id="nav">
                        <div className="hidden items-center gap-1 lg:flex">
                            {LINKS.map((l) => {
                                const isActive = active === l.href.slice(1);
                                return (
                                    <a key={l.href} href={l.href} data-active={isActive} aria-current={isActive ? "true" : undefined}
                                        className={`${RING} relative rounded-full px-3 py-1.5 text-body-sm transition-colors duration-300 ${dark ? (isActive ? "text-white" : "text-ondarkmuted hover:text-white") : (isActive ? "text-ink" : "text-muted hover:text-ink")}`}>
                                        <AnimatePresence>
                                            {isActive && (
                                                <Pill layoutId="nav-pill" aria-hidden="true"
                                                    className={`absolute inset-0 rounded-full transition-colors duration-500 ${dark ? "bg-white/10" : "bg-black/[0.05]"}`}
                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                    transition={{ ...SPRING.snappy, opacity: { duration: 0.3 } }} />
                                            )}
                                        </AnimatePresence>
                                        <span className="relative">{l.label}</span>
                                    </a>
                                );
                            })}
                            <a href="#involved" className={`${dark ? "btn-light" : "btn-accent"} btn-sm ml-4`}>Partner with us</a>
                        </div>
                    </LayoutGroup>

                    {/* hover tint only where hover exists, so it never sticks after a tap */}
                    <button ref={button} type="button"
                        className={`${RING} -mr-2.5 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${dark ? "text-white [@media(hover:hover)]:hover:bg-white/10" : "text-ink [@media(hover:hover)]:hover:bg-black/[0.05]"}`}
                        onClick={toggle} aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu">
                        <span className="relative block h-3 w-[18px]" aria-hidden="true">
                            {[-1, 1].map((k) => (
                                <Line key={k} className="absolute left-0 top-1/2 -mt-[0.75px] h-[1.5px] w-full rounded-full bg-current"
                                    initial={false}
                                    animate={open ? { y: 0, rotate: k * 45 } : { y: k * 3.5, rotate: 0 }}
                                    transition={{ duration: 0.42, ease: EASE.inOut }} />
                            ))}
                        </span>
                    </button>
                </nav>
            </Header>

            <AnimatePresence custom={origin}>
                {open && (
                    <Overlay key="menu" id="mobile-menu" data-lenis-prevent
                        className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-canvas lg:hidden"
                        custom={origin} variants={reduce ? fade : overlayVariants} initial="hidden" animate="show" exit="exit">
                        {/* An index of big Geist rows (numbered in mono) under the bar; the CTA
                            sits at the bottom, within thumb reach. */}
                        <List aria-label="Menu" className="container-page flex flex-1 flex-col pb-8 pt-20"
                            variants={listVariants} initial="hidden" animate="show" exit="exit">
                            {LINKS.map((l, i) => {
                                const isActive = active === l.href.slice(1);
                                return (
                                    <div key={l.href} className="border-b border-line">
                                        <a href={l.href} onClick={() => setOpen(false)} aria-current={isActive ? "true" : undefined}
                                            className={`${RING} group block rounded-lg`}>
                                            {/* mask: the row rises out of its own line */}
                                            <span className="block overflow-hidden py-3.5">
                                                <Row variants={reduce ? fade : itemVariants} className="flex items-baseline gap-4">
                                                    <span className={`eyebrow w-6 shrink-0 tabular-nums ${isActive ? "text-accent" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                                                    <span className={`display text-display-lg transition-[color,transform] duration-500 ease-out-expo [@media(hover:hover)]:group-hover:translate-x-1 ${isActive ? "text-accent" : "text-ink"}`}>
                                                        {l.label}
                                                    </span>
                                                </Row>
                                            </span>
                                        </a>
                                    </div>
                                );
                            })}
                            <Wrap variants={reduce ? fade : itemVariants} className="mt-auto pt-10">
                                <a href="#involved" onClick={() => setOpen(false)} className="btn-accent w-full">Partner with us</a>
                            </Wrap>
                        </List>
                    </Overlay>
                )}
            </AnimatePresence>
        </>
    );
}
