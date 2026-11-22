// Facts and links used in more than one place.
export const EMAIL = "aimlinitiative@gmail.com";
export const GITHUB = "https://github.com/aimlinitiative";

export const mailto = (subject, body) =>
    `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

// Summit sign-up. These open an email until the Google Form exists; then put
// the form's link in both (or one link per role) and nothing else changes.
export const SIGNUP = {
    student: mailto(
        "Summit sign-up: student",
        "Name:\nSchool:\nGrade:\nTeacher coming with you:\nDo you need a loaner laptop?:\nParent's email (for the consent form):\n",
    ),
    teacher: mailto(
        "Summit sign-up: teacher",
        "Name:\nSchool:\nSubject:\nAbout how many students are you bringing?:\n",
    ),
};

// Absolute hashes so the links also work from the 404 page.
export const SECTION_LINKS = [
    { href: "/#summit", label: "About" },
    { href: "/#schedule", label: "Schedule" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#course", label: "Course" },
];
