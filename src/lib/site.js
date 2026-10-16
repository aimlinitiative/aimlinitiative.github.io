// Facts and links used in more than one place.
export const EMAIL = "aimlinitiative@gmail.com";
export const GITHUB = "https://github.com/aimlinitiative";

export const mailto = (subject) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

// Absolute hashes so the links also work from the 404 page.
export const SECTION_LINKS = [
    { href: "/#mission", label: "Mission" },
    { href: "/#summit", label: "Summit" },
    { href: "/#course", label: "Course" },
    { href: "/#partners", label: "Partners" },
    { href: "/#about", label: "About" },
];
