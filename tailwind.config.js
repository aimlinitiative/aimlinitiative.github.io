/** @type {import('tailwindcss').Config} */
/* Design tokens. See DESIGN.md at the repo root for the rules behind them:
 * one family, one ink, one accent that means "clickable", flat surfaces. */
export default {
    content: { relative: true, files: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"] },
    theme: {
        extend: {
            colors: {
                bg: "#FBFBF9",          // page canvas
                surface: "#F2F2EE",     // alternate band, cards, input fills
                card: "#FFFFFF",        // raised card on surface
                ink: "#1A1C1A",         // all headings and body (16.6:1 on bg)
                ink2: "#484B47",        // secondary text (8.5:1 on bg)
                ink3: "#5E615C",        // captions and meta only (6.1:1 on bg)
                line: "#E3E4DF",        // hairlines
                linestrong: "#C9CBC5",  // input borders, table rules
                accent: {
                    DEFAULT: "#1F5C45", // links, primary button, focus (7.6:1 on bg)
                    hover: "#17483A",
                    soft: "#E6F0EA",    // selected chip / tint
                    ondark: "#8FD1B0",  // accent on the dark band
                },
                dark: {
                    DEFAULT: "#13201B", // the one dark band per page (pine-black, not navy)
                    raised: "#1B2B24",
                    ink: "#F3F4F1",
                    ink2: "#AEB8B2",
                    line: "rgba(243,244,241,0.12)",
                },
            },
            fontFamily: {
                // Apple devices get SF; everyone else gets Inter Variable with optical sizing.
                sans: [
                    "-apple-system", "BlinkMacSystemFont", "'SF Pro Text'", "'SF Pro Display'",
                    "'Inter Variable'", "Inter", "'Segoe UI'", "Roboto", "system-ui", "sans-serif",
                ],
                mono: ["ui-monospace", "'SF Mono'", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
            },
            fontSize: {
                caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0" }],
                sm: ["0.9375rem", { lineHeight: "1.45", letterSpacing: "-0.006em" }],
                base: ["1.0625rem", { lineHeight: "1.55", letterSpacing: "-0.011em" }],
                lead: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.014em" }],
                h4: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.017em", fontWeight: "600" }],
                h3: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
                h2: ["clamp(2.25rem, 1.6rem + 2.4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.022em", fontWeight: "600" }],
                h1: ["clamp(2.75rem, 1.6rem + 4.6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "600" }],
            },
            fontWeight: { normal: "400", medium: "500", semibold: "600" },
            maxWidth: { prose: "40rem", page: "76rem" },
            spacing: { 18: "4.5rem", 22: "5.5rem", 30: "7.5rem" },
            borderRadius: { sm: "6px", DEFAULT: "10px", lg: "14px", xl: "20px", "2xl": "28px", pill: "9999px" },
            boxShadow: {
                float: "0 0 0 1px rgba(26,28,26,0.04), 0 2px 6px rgba(26,28,26,0.05), 0 8px 24px -8px rgba(26,28,26,0.12)",
                photo: "0 5px 30px rgba(26,28,26,0.18)",
            },
            transitionTimingFunction: {
                out: "cubic-bezier(0.22, 1, 0.36, 1)",
                inout: "cubic-bezier(0.65, 0, 0.35, 1)",
            },
            transitionDuration: { fast: "150ms", base: "220ms", slow: "400ms" },
        },
    },
    future: { hoverOnlyWhenSupported: true },
    plugins: [],
};
