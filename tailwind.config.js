/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#FAFAF8",        // soft off-white (calm, not stark)
                surface: "#F2F1EC",   // alt sections / cards
                ink: "#15151A",       // primary text (~16:1 on bg)
                muted: "#54545E",     // secondary text (~7.5:1 on bg)
                faint: "#8A8A93",     // tertiary / captions (~4.6:1)
                line: "rgba(21,21,26,0.09)",
                accent: "#1F5FBF",    // brand blue (from logo)
                accentdk: "#184E9E",
                accentsoft: "#EAF1FB",
                brand: {
                    blue: "#1F5FBF",
                    teal: "#0E9E8E",
                    amber: "#E0872F",
                    violet: "#6D5DE6",
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
                soft: "0 1px 2px rgba(21,21,26,0.04), 0 10px 30px -14px rgba(21,21,26,0.14)",
                lift: "0 2px 4px rgba(21,21,26,0.05), 0 18px 44px -18px rgba(21,21,26,0.22)",
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
