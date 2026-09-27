import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { DIST, DUR, EASE, SPRING, STAGGER, group } from "../lib/motion";
import { NAV } from "../content/site";

// "Get involved" is the button, so it isn't repeated as a text link.
const CTA = { id: "involved", label: "Get involved" };
const LINKS = NAV.filter((l) => l.id !== CTA.id);
const IDS = NAV.map((l) => l.id);

// Which linked section spans a reading line ~35% down the viewport.
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

// Only the Summit band opts into a dark nav, via data-nav-theme="dark".
function toneUnderNav() {
    for (const el of document.elementsFromPoint(window.innerWidth / 2, 28)) {
        if (el.closest("header, #mobile-menu")) continue;
        return el.closest('[data-nav-theme="dark"]') ? "dark" : "light";
    }
    return "light";
}

const sheet = {
    hidden: { y: "-100%" },
    show: { y: "0%", transition: { duration: 0.5, ease: EASE.drawer } },
    exit: { y: "-100%", transition: { duration: DUR.base, ease: EASE.drawer } },
};
const sheetList = group(STAGGER.base, 0.12);
const sheetItem = {
    hidden: { opacity: 0, y: DIST.rise },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE.out } },
};

export default function Navbar() {
    const { pathname } = useLocation();
    const base = pathname === "/" ? "" : "/"; // off the home page, anchors go back home first
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [active, setActive] = useState(null);
    const [tone, setTone] = useState("light");
    const dir = useRef({ last: 0, anchor: 0, sign: 0 });
    const frame = useRef(0);
    const headerRef = useRef(null);
    const btnRef = useRef(null);
    const sheetRef = useRef(null);
    const { scrollY } = useScroll();

    // Layout reads (active section, tone) at most once per frame.
    const measure = useCallback(() => {
        if (frame.current) return;
        frame.current = requestAnimationFrame(() => {
            frame.current = 0;
            setActive(currentSection());
            setTone(toneUnderNav());
        });
    }, []);

    const onScroll = useCallback((y) => {
        const d = dir.current;
        const sign = Math.sign(y - d.last);
        if (sign && sign !== d.sign) { d.sign = sign; d.anchor = d.last; }
        d.last = y;
        setScrolled(y > 8);
        // Hide after a deliberate scroll down past the top, reveal on any real scroll up.
        if (y < 140) setHidden(false);
        else if (d.sign > 0 && y - d.anchor > 28) setHidden(true);
        else if (d.sign < 0 && d.anchor - y > 12) setHidden(false);
        measure();
    }, [measure]);

    useMotionValueEvent(scrollY, "change", onScroll);
    useLayoutEffect(() => { onScroll(window.scrollY); }, [onScroll, pathname]);
    useEffect(() => {
        window.addEventListener("resize", measure);
        return () => { window.removeEventListener("resize", measure); cancelAnimationFrame(frame.current); };
    }, [measure]);

    // Open menu: lock scroll, move focus in, trap Tab, close on Escape or on growing past the breakpoint.
    useEffect(() => {
        if (!open) return;
        const root = document.documentElement;
        const prevOverflow = root.style.overflow;
        root.style.overflow = "hidden";
        sheetRef.current?.querySelector("a")?.focus({ preventScroll: true });

        const focusables = () => [...headerRef.current.querySelectorAll("a, button"), ...(sheetRef.current?.querySelectorAll("a, button") ?? [])]
            .filter((el) => el.offsetParent !== null);
        const onKey = (e) => {
            if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); return; }
            if (e.key !== "Tab") return;
            const items = focusables();
            const i = items.indexOf(document.activeElement);
            if (e.shiftKey && i <= 0) { e.preventDefault(); items.at(-1)?.focus(); }
            else if (!e.shiftKey && (i === -1 || i === items.length - 1)) { e.preventDefault(); items[0]?.focus(); }
        };
        const mq = window.matchMedia("(min-width: 1024px)");
        const onMq = () => mq.matches && setOpen(false);
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onMq);
        return () => {
            root.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onMq);
        };
    }, [open]);

    const dark = tone === "dark" && !open;
    const concealed = hidden && !open && !reduce;
    const surface = open
        ? "border-transparent bg-bg"
        : scrolled
            ? dark ? "border-dark-line bg-dark/80 backdrop-blur-md" : "border-line bg-bg/80 backdrop-blur-md"
            : "border-transparent bg-transparent";
    // Links are 36px to sit quietly in a 56px bar; the ::before stretches the hit area to 44px.
    const hit = "relative before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']";

    return (
        <>
            <Motion.header
                ref={headerRef}
                className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-base ease-out ${surface}`}
                initial={false}
                animate={{ y: concealed ? "-100%" : "0%" }}
                transition={{ duration: 0.3, ease: EASE.out }}
                onFocusCapture={() => setHidden(false)}
            >
                <nav className="container-page flex h-14 items-center justify-between gap-6" aria-label="Main">
                    <a href={`${base}#top`} onClick={() => setOpen(false)}
                        className={`-mx-2 inline-flex min-h-[44px] items-center px-2 text-[17px] font-semibold transition-colors duration-base ${dark ? "text-dark-ink" : "text-ink"}`}>
                        AIML-LI
                    </a>

                    <div className="hidden items-center gap-1 lg:flex">
                        <ul className="flex items-center gap-1">
                            {LINKS.map((l) => {
                                const isActive = active === l.id;
                                return (
                                    <li key={l.id}>
                                        <a href={`${base}#${l.id}`} aria-current={isActive ? "location" : undefined}
                                            className={`${hit} flex h-9 items-center rounded-pill px-3.5 text-[15px] font-medium transition-colors duration-base ${dark
                                                ? isActive ? "text-dark-ink" : "text-dark-ink2 hover:text-dark-ink"
                                                : isActive ? "text-ink" : "text-ink2 hover:text-ink"}`}>
                                            <AnimatePresence initial={false}>
                                                {isActive && (
                                                    <Motion.span layoutId="nav-pill" aria-hidden="true"
                                                        className={`absolute inset-0 rounded-pill transition-colors duration-base ${dark ? "bg-white/10" : "bg-ink/5"}`}
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                        transition={{ ...SPRING.ui, opacity: { duration: DUR.fast } }} />
                                                )}
                                            </AnimatePresence>
                                            <span className="relative">{l.label}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <a href={`${base}#${CTA.id}`} className={`${dark ? "btn-ondark" : "btn-primary"} ${hit} ml-3 !min-h-[36px] !px-4`}>
                            {CTA.label}
                        </a>
                    </div>

                    <button ref={btnRef} type="button"
                        className={`-mr-2.5 flex h-11 w-11 items-center justify-center rounded-pill transition-colors duration-base lg:hidden ${dark ? "text-dark-ink hover:bg-white/10" : "text-ink hover:bg-ink/5"}`}
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu">
                        <span className="relative block h-4 w-[18px]" aria-hidden="true">
                            {[-1, 1].map((k) => (
                                <Motion.span key={k}
                                    className="absolute left-0 top-1/2 -mt-[0.75px] h-[1.5px] w-full rounded-full bg-current"
                                    initial={false}
                                    animate={open ? { y: 0, rotate: k * 45 } : { y: k * 3.5, rotate: 0 }}
                                    transition={SPRING.ui} />
                            ))}
                        </span>
                    </button>
                </nav>
            </Motion.header>

            <AnimatePresence>
                {open && (
                    <Motion.div key="scrim" aria-hidden="true" onClick={() => setOpen(false)}
                        className="fixed inset-0 z-30 bg-ink/20 lg:hidden"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: DUR.base, ease: EASE.out }} />
                )}
                {open && (
                    <Motion.div key="menu" id="mobile-menu" ref={sheetRef}
                        className="fixed inset-x-0 top-0 z-40 max-h-[100svh] overflow-y-auto overscroll-contain rounded-b-xl bg-bg pt-14 shadow-float lg:hidden"
                        variants={sheet} initial="hidden" animate="show" exit="exit">
                        <Motion.ul className="container-page pb-8 pt-4" variants={sheetList}>
                            {LINKS.map((l) => (
                                <Motion.li key={l.id} variants={sheetItem}>
                                    <a href={`${base}#${l.id}`} onClick={() => setOpen(false)}
                                        aria-current={active === l.id ? "location" : undefined}
                                        className="flex min-h-[52px] items-center text-h4 text-ink transition-colors duration-base hover:text-accent">
                                        {l.label}
                                    </a>
                                </Motion.li>
                            ))}
                            <Motion.li variants={sheetItem} className="mt-6">
                                <a href={`${base}#${CTA.id}`} onClick={() => setOpen(false)} className="btn-primary w-full">
                                    {CTA.label}
                                </a>
                            </Motion.li>
                        </Motion.ul>
                    </Motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
