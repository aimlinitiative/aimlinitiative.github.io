/* One motion system for the whole site. Every animation pulls its curve,
 * timing and distance from here. Ease-out for anything entering or reacting,
 * in-out only for things moving between two resting spots, springs for
 * anything the user can interrupt. See DESIGN.md "Motion". */
import { stagger as mStagger } from "motion/react";

export const EASE = {
    out: [0.22, 1, 0.36, 1],      // default for entrances and UI
    outExpo: [0.16, 1, 0.3, 1],   // longer glide, hero only
    drawer: [0.32, 0.72, 0, 1],   // iOS sheet curve: mobile menu, sheets
    inOut: [0.65, 0, 0.35, 1],    // between two resting states
    in: [0.55, 0, 1, 0.45],       // short exits only
};

export const cssEase = (e) => `cubic-bezier(${e.join(",")})`;

export const DUR = {
    instant: 0.12, // press, hover color
    fast: 0.2,     // small fades, exits
    base: 0.32,    // popovers, accordions, tabs
    slow: 0.6,     // section content
    hero: 0.9,     // hero lines, the longest thing on the page
};

export const SPRING = {
    press: { type: "spring", visualDuration: 0.18, bounce: 0 },
    ui: { type: "spring", visualDuration: 0.3, bounce: 0.1 },
    layout: { type: "spring", visualDuration: 0.4, bounce: 0 },
    gentle: { type: "spring", visualDuration: 0.6, bounce: 0 },
};

export const DIST = { rise: 12, riseHero: 20, press: 0.98, hover: 1.015 };

export const STAGGER = { tight: 0.04, base: 0.06, loose: 0.1 };

// Container transition that staggers its children (staggerChildren is deprecated).
export const staggerChildren = (each = STAGGER.base, startDelay = 0) => ({
    delayChildren: mStagger(each, { startDelay }),
});

export const group = (each = STAGGER.base, startDelay = 0) => ({
    hidden: {},
    show: { transition: staggerChildren(each, startDelay) },
});

// No blur on reveals: animated blur is the most expensive thing on integrated GPUs.
export const fadeUp = {
    hidden: { opacity: 0, y: DIST.rise },
    show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE.out } },
};

// Masked line: the parent needs overflow-hidden (and a little bottom padding for descenders).
export const lineUp = {
    hidden: { y: "105%" },
    show: { y: "0%", transition: { duration: DUR.hero, ease: EASE.outExpo } },
};

// Fire once, as soon as a sliver is on screen.
export const VIEWPORT = { once: true, amount: "some", margin: "0px 0px -10% 0px" };
