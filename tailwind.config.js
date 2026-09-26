/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#F6F7F9",        // cool, crisp off-white
                surface: "#EEF0F4",   // alt sections / cards
                ink: "#0B0D12",       // primary text
                muted: "#505665",     // secondary text (~7:1 on bg)
                faint: "#868C9B",     // tertiary / captions
                line: "rgba(11,13,18,0.08)",
                accent: "#2F6BFF",    // electric brand blue
                accentdk: "#1F4FD8",
                accentsoft: "#E8EEFF",
                stage: "#07080C",     // near-black for dark cinematic sections
                stageline: "rgba(255,255,255,0.08)",
                brand: {
                    blue: "#2F6BFF",
                    violet: "#7C5CFF",
                    cyan: "#22D3EE",
                    teal: "#0E9E8E",
                    amber: "#E0872F",
                },
            },
            fontFamily: {
                display: ["'Space Grotesk'", "system-ui", "sans-serif"],
                sans: ["'Hanken Grotesk'", "system-ui", "-apple-system", "sans-serif"],
                mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
            },
            maxWidth: { "6xl": "72rem", "7xl": "80rem" },
            letterSpacing: { tightest: "-0.04em" },
            boxShadow: {
                soft: "0 1px 2px rgba(11,13,18,0.04), 0 10px 30px -14px rgba(11,13,18,0.14)",
                lift: "0 2px 4px rgba(11,13,18,0.05), 0 18px 44px -18px rgba(11,13,18,0.22)",
                glow: "0 0 0 1px rgba(47,107,255,0.25), 0 12px 40px -12px rgba(47,107,255,0.55)",
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
