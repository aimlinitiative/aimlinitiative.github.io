/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: {
                    950: "#050506",
                    900: "#0a0a0b",
                    850: "#0f0f11",
                    800: "#141417",
                    700: "#1c1c20",
                    600: "#26262b",
                },
                brand: {
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6",
                    600: "#2563eb",
                },
                cyan: { 300: "#67e8f9", 400: "#22d3ee" },
                amber: { 400: "#ffb020", 500: "#f59e0b" },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
                display: ["Inter", "system-ui", "sans-serif"],
                mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
            },
            maxWidth: { "7xl": "80rem", "8xl": "88rem" },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(22px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
                "gradient-shift": {
                    "0%,100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                blink: { "0%,50%": { opacity: "1" }, "50.01%,100%": { opacity: "0" } },
            },
            animation: {
                "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
                marquee: "marquee 32s linear infinite",
                "gradient-shift": "gradient-shift 14s ease infinite",
            },
        },
    },
    plugins: [],
};
