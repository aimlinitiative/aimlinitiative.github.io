/* Facts used in more than one place. Change them here, not in the sections. */

export const EMAIL = "aimlinitiative@gmail.com";
export const mailto = (subject) => `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const ORG = {
    name: "AI/ML Literacy Initiative",
    short: "AIML-LI",
    city: "Los Angeles",
    founders: ["Adrian Erlikhman", "Michael Tarekegn"],
    fiscalSponsor: "The Hack Foundation (Hack Club)",
    ein: "81-2908499",
};

// Only real profiles belong here. Instagram and LinkedIn had placeholder URLs, so they're left out until there are handles.
export const SOCIALS = [
    { label: "GitHub", href: "https://github.com/aimlinitiative" },
];

// Section anchors. The navbar and in-page links depend on these ids staying stable.
export const NAV = [
    { id: "about", label: "About" },
    { id: "curriculum", label: "Curriculum" },
    { id: "summit", label: "Summit" },
    { id: "supporters", label: "Partners" },
    { id: "involved", label: "Get involved" },
];
