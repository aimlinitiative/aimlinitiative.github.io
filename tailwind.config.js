/** @type {import('tailwindcss').Config} */
// Tokens mirror DESIGN.md: white page, ink text and borders, one blue, one
// orange for the thing that goes wrong, a warm band for the summit.
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#FFFFFF",
                ink: "#101418",      // text, card borders, primary button
                dim: "#525B66",      // secondary text (7.0:1 on white)
                line: "#E2E5EA",     // hairlines inside cards
                blue: "#1F5FBF",     // brand, links, the accuracy bar
                sky: "#EAF1FC",      // blue tint
                ora: "#E2592A",      // what the model misses
                warm: "#FFF6EB",     // summit band
            },
            fontFamily: {
                display: ["'Bricolage Grotesque Variable'", "system-ui", "sans-serif"],
                sans: ["'Public Sans Variable'", "system-ui", "-apple-system", "sans-serif"],
                mono: ["'JetBrains Mono Variable'", "ui-monospace", "monospace"],
            },
            fontSize: {
                hero: ["clamp(2.6rem, 1.6rem + 3.4vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "800" }],
                h2: ["clamp(2rem, 1.4rem + 2.4vw, 3.5rem)", { lineHeight: "1.04", letterSpacing: "-0.03em", fontWeight: "800" }],
                h3: ["1.375rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
                lead: ["1.1875rem", { lineHeight: "1.55" }],
                body: ["1.0625rem", { lineHeight: "1.6" }],
                small: ["0.9375rem", { lineHeight: "1.5" }],
                tag: ["0.75rem", { lineHeight: "1.4" }],
            },
            maxWidth: { page: "78rem", measure: "36rem" },
            borderRadius: { card: "14px" },
        },
    },
    plugins: [],
};
