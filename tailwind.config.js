/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: {
                    950: "#06060f",
                    900: "#0a0a1a",
                    800: "#111127",
                    700: "#191933",
                    600: "#232347",
                },
                brand: {
                    50: "#eef2ff",
                    100: "#e0e7ff",
                    300: "#a5b4fc",
                    400: "#818cf8",
                    500: "#6366f1",
                    600: "#4f46e5",
                    700: "#4338ca",
                },
                cyan: {
                    300: "#67e8f9",
                    400: "#22d3ee",
                    500: "#06b6d4",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
                display: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
            },
            maxWidth: {
                "7xl": "80rem",
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "float-slow": {
                    "0%,100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "200% 50%" },
                },
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
                "float-slow": "float-slow 6s ease-in-out infinite",
                shimmer: "shimmer 6s linear infinite",
                marquee: "marquee 28s linear infinite",
            },
        },
    },
    plugins: [],
};
