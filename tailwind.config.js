/** @type {import('tailwindcss').Config} */
// Tokens mirror DESIGN.md. Monochrome: one background, one text color, one
// secondary text color, one hairline. No accent hue.
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#08090A",       // page background
                fg: "#F7F8F8",       // headings, primary text, primary button fill
                dim: "#A8ADB5",      // body copy and secondary text (8.7:1 on bg)
                line: "#23252A",     // hairlines
                raise: "#0F1011",    // hover row / pressed surface
            },
            fontFamily: {
                sans: ["'Geist Variable'", "Geist", "system-ui", "-apple-system", "sans-serif"],
            },
            fontSize: {
                hero: ["clamp(3rem, 1.4rem + 6.8vw, 7.5rem)", { lineHeight: "0.96", letterSpacing: "-0.05em", fontWeight: "600" }],
                h2: ["clamp(2.25rem, 1.5rem + 3vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.04em", fontWeight: "600" }],
                statement: ["clamp(1.5rem, 1.15rem + 1.5vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "500" }],
                h3: ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "500" }],
                body: ["1.0625rem", { lineHeight: "1.55", letterSpacing: "-0.01em" }],
                small: ["0.875rem", { lineHeight: "1.5" }],
            },
            maxWidth: { page: "90rem", measure: "60ch" },
        },
    },
    plugins: [],
};
