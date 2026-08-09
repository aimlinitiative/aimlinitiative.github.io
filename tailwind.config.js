/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: "#14161a",     // near-black text
                muted: "#5b6270",   // secondary text
                line: "#e7e8ec",    // hairline borders
                paper: "#ffffff",
                paper2: "#f7f8fa",  // subtle section tint
                brand: "#1f5fbf",   // logo blue
                branddk: "#184b98",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
            },
            maxWidth: { "6xl": "72rem" },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
            },
        },
    },
    plugins: [],
};
