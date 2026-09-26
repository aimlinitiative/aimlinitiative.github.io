import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
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

/* Light or dark content under the bar? Sections can say so explicitly with
 * data-nav-theme="dark|light"; otherwise the first opaque background up the
 * tree decides. Chrome layers are pointer-events: none, so hit-testing skips them. */
function themeUnderNav() {
    const els = document.elementsFromPoint(window.innerWidth / 2, 40);
    const el = els.find((e) => !e.closest("header, #mobile-menu"));
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const t = n.getAttribute("data-nav-theme");
        if (t) return t;
        const m = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
        if (m && (m[3] === undefined || +m[3] > 0.5)) {
            const lum = (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
            return lum < 0.4 ? "dark" : "light";
        }
    }
    return "light";
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
    const [tone, setTone] = useState("light");
    const toneAt = useRef(0);
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
    const dark = tone === "dark" && !open;
    const reduce = useReducedMotion();
    const concealed = hidden && !open && !reduce; // no sliding chrome for reduced motion

    return (
        <>
            <Header
                className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${frosted ? (dark ? "border-stageline bg-stage/60 backdrop-blur-xl backdrop-saturate-150" : "border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150") : "border-transparent bg-transparent"}`}
                initial={false}
                animate={{ y: concealed ? "-100%" : "0%", opacity: concealed ? 0 : 1 }}
                transition={{ duration: concealed ? 0.45 : 0.55, ease: concealed ? EASE.inOut : EASE.out }}
                onFocusCapture={() => setHidden(false)}
            >
                <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
                    <a href="#top" className="focusable group flex items-center gap-2.5">
                        <img src="/logo.jpg" alt="AIML-LI" className={`h-8 w-8 rounded-lg object-cover ring-1 transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] ${dark ? "ring-white/15" : "ring-line"}`} />
                        <span className={`display text-[15px] font-semibold tracking-tight transition-colors duration-500 ${dark ? "text-white" : "text-ink"}`}>AIML-LI</span>
                    </a>

                    <LayoutGroup id="nav">
                        <div className="hidden items-center gap-2 lg:flex">
                            {LINKS.map((l) => {
                                const isActive = active === l.href.slice(1);
                                return (
                                    <a key={l.href} href={l.href} data-active={isActive} aria-current={isActive ? "true" : undefined}
                                        className={`focusable relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${dark ? (isActive ? "text-white" : "text-white/60 hover:text-white") : (isActive ? "text-ink" : "text-muted hover:text-ink")}`}>
                                        <AnimatePresence>
                                            {isActive && (
                                                <Pill layoutId="nav-pill" aria-hidden="true"
                                                    className={`absolute inset-0 rounded-full ring-1 ring-inset transition-colors duration-500 ${dark ? "bg-white/10 shadow-[0_0_24px_-6px_rgba(47,107,255,0.7)] ring-white/15" : "bg-white shadow-[0_1px_2px_rgba(11,13,18,0.06),0_6px_18px_-8px_rgba(47,107,255,0.45)] ring-ink/[0.06]"}`}
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
                        className={`focusable relative flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-500 lg:hidden ${dark ? "border-white/15 text-white hover:border-white/30" : "border-line text-ink hover:border-ink/20"}`}
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
