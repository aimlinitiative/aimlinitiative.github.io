/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: {
                    950: "#050505",
                    900: "#0a0a0a",
                    850: "#101012",
                    800: "#161619",
                    700: "#1f1f24",
                    600: "#26262b",
                },
                plasma: "#b302e8",   // Micron purple
                violet2: "#7b2ff7",
                coral: "#ff5147",    // Micron coral
            },
            fontFamily: {
                display: ["'Space Grotesk'", "system-ui", "sans-serif"],
                sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
                mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
            },
            maxWidth: { "7xl": "80rem", "8xl": "88rem" },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(26px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "gradient-shift": {
                    "0%,100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                "float-slow": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
                marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
                "pulse-glow": {
                    "0%,100%": { opacity: "0.55" },
                    "50%": { opacity: "1" },
                },
                scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
            },
            animation: {
                "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
                "gradient-shift": "gradient-shift 8s ease infinite",
                "float-slow": "float-slow 7s ease-in-out infinite",
                marquee: "marquee 30s linear infinite",
                "pulse-glow": "pulse-glow 3.5s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
