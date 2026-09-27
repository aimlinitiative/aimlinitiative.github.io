/** @type {import('tailwindcss').Config} */
// Tokens mirror DESIGN.md (the source of truth for colors, type, radii and spacing).
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                canvas: "#FFFFFF",      // default light section
                parchment: "#F5F5F7",   // alternate light section, footer, cards on white
                bg: "#FFFFFF",          // alias of canvas (older code)
                surface: "#F5F5F7",     // alias of parchment (older code)
                ink: "#1D1D1F",         // headlines and strong body
                muted: "#55555A",       // paragraphs, secondary text (7.4:1 on white)
                faint: "#6E6E73",       // captions, meta, labels (AA on white and parchment)
                line: "rgba(0,0,0,0.08)",
                linestrong: "rgba(0,0,0,0.14)",
                accent: "#0066CC",      // Action Blue: every click on light
                accentdk: "#0071E3",    // hover fill / focus ring
                accentsoft: "#E8F0FB",  // tint behind accent text
                accentdark: "#2997FF",  // accent on dark sections
                stage: "#07080C",       // dark sections
                stage1: "#121216",      // cards on stage
                stage2: "#1B1B20",      // featured card on stage
                stageline: "rgba(255,255,255,0.08)",
                ondark: "#F5F5F7",
                ondarkmuted: "#A1A1A6",
                brand: {
                    // Spotlight family: hero network, contact spotlight card, data-viz series.
                    blue: "#2997FF",
                    violet: "#7C5CFF",
                    cyan: "#22D3EE",
                    teal: "#0E9E8E",
                    amber: "#E0872F",
                },
            },
            fontFamily: {
                display: ["'Geist Variable'", "Geist", "'Inter Variable'", "system-ui", "-apple-system", "sans-serif"],
                sans: ["'Inter Variable'", "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
                mono: ["'Geist Mono Variable'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
            },
            fontSize: {
                "display-2xl": ["clamp(3.25rem, 1.6rem + 6.4vw, 7rem)", { lineHeight: "0.92", letterSpacing: "-0.05em", fontWeight: "600" }],
                "display-xl": ["clamp(2.5rem, 1.3rem + 4.4vw, 5rem)", { lineHeight: "0.98", letterSpacing: "-0.045em", fontWeight: "600" }],
                "display-lg": ["clamp(2rem, 1.2rem + 3vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.04em", fontWeight: "600" }],
                "display-md": ["clamp(1.5rem, 1.1rem + 1.4vw, 2.25rem)", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "600" }],
                title: ["1.375rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
                lead: ["clamp(1.1875rem, 1rem + 0.6vw, 1.5rem)", { lineHeight: "1.4", letterSpacing: "-0.015em" }],
                body: ["1.0625rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
                "body-sm": ["0.9375rem", { lineHeight: "1.5", letterSpacing: "-0.006em" }],
                caption: ["0.8125rem", { lineHeight: "1.35", fontWeight: "500" }],
            },
            maxWidth: { "6xl": "72rem", "7xl": "80rem", page: "75rem", reading: "61.25rem", measure: "62ch" },
            borderRadius: { chip: "8px", card: "20px", panel: "28px" },
            letterSpacing: { tightest: "-0.045em" },
            boxShadow: {
                // Light surfaces stay flat (DESIGN.md §6); these are kept subtle for older code.
                soft: "0 1px 2px rgba(0,0,0,0.04)",
                lift: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.12)",
                glow: "0 0 0 1px rgba(0,113,227,0.35)",
                edge: "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.25)", // cards on stage
            },
            transitionTimingFunction: {
                "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",   // EASE.out in src/lib/motion.js
                "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)", // EASE.inOut
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
            },
            animation: {
                "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
            },
        },
    },
    plugins: [],
};
