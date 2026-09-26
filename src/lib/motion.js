/* Shared motion tokens. Every animation on the site should pull its easing and
 * timing from here so the whole page moves like one system (Apple / Framer feel:
 * fast start, long soft settle, no bounce on content). */

// Cubic-bezier curves, usable by motion (`ease: EASE.out`) and CSS (`cubic-bezier(...)`).
export const EASE = {
    out: [0.16, 1, 0.3, 1],       // default for entrances: quick start, long glide
    inOut: [0.65, 0, 0.35, 1],    // for things that move between two resting states
    snappy: [0.2, 0.9, 0.1, 1],   // small UI (hover, pills, indicators)
};

export const css = (e) => `cubic-bezier(${e.join(",")})`;

export const DUR = { fast: 0.25, base: 0.6, slow: 0.9, draw: 1.4 };

// Gentle springs for interactive things (tilt, magnetic hover, nav indicator).
export const SPRING = {
    soft: { type: "spring", stiffness: 140, damping: 22, mass: 0.9 },
    snappy: { type: "spring", stiffness: 380, damping: 32 },
};

// Standard entrance: rise + un-blur + fade.
export const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: DUR.slow, ease: EASE.out } },
};

export const stagger = (each = 0.08, delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: each, delayChildren: delay } },
});

// Default viewport trigger for whileInView.
export const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" };
