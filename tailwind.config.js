/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#0a0a0b",
                surface: "#111114",
                ink: "#f6f6f5",     // primary text
                muted: "#d7d7dd",   // secondary text (clearly legible on dark)
                line: "rgba(255,255,255,0.10)",
                accent: "#3ecf8e",  // emerald
                accentdk: "#2fb579",
            },
            fontFamily: {
                display: ["'Space Grotesk'", "system-ui", "sans-serif"],
                sans: ["'Hanken Grotesk'", "system-ui", "-apple-system", "sans-serif"],
                mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
            },
            maxWidth: { "6xl": "72rem" },
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
