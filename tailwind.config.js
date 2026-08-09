/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                paper: "#f3f2ed",
                paper2: "#e9e7df",
                ink: "#121110",
                ink2: "#4a4842",
                accent: "#ff3d23",
            },
            fontFamily: {
                serif: ["Fraunces", "Georgia", "serif"],
                sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
                mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
            },
            maxWidth: { "7xl": "80rem", "8xl": "88rem" },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
            },
            animation: {
                "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
            },
        },
    },
    plugins: [],
};
