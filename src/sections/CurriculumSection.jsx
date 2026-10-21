import Section from "../components/Section";

const UNITS = [
    ["Foundations", "How machines learn from data."],
    ["Building models", "Train, test and score a first classifier."],
    ["Prediction and error", "Accuracy, precision, recall, and who the mistakes land on."],
    ["Neural networks", "A small network, built step by step."],
    ["Language and bias", "How language models work, and where they break."],
    ["Capstone", "A project on a problem from the student's own neighborhood."],
];

// Where the course stands on the way to every LAUSD high school.
const PATH = [
    ["Done", "Taught at LACES", "A four-week version, in a real LAUSD classroom."],
    ["Now", "Working with LAUSD", "With the district's Ed Tech & Innovation office, toward district-wide implementation."],
    ["Next", "A standing elective", "AI literacy on the schedule at LAUSD high schools, every year."],
];

export default function CurriculumSection() {
    return (
        <Section id="course" tag="The course" title="A free twelve-week AI course, headed into every LAUSD high school."
            intro="No coding background needed. Six two-week units of notebooks a teacher can run as written, each with a teacher key.">
            <ol className="mx-auto grid max-w-[64rem] gap-4 md:grid-cols-3">
                {PATH.map(([s, t, d], k) => (
                    <li key={t} className={`rounded-card p-6 lg:p-7 ${k === 1 ? "bg-blue text-white" : "card"}`}>
                        <p className={`text-small font-semibold ${k === 1 ? "text-white/80" : "text-blue"}`}>{s}</p>
                        <h3 className="mt-2 font-display text-h3">{t}</h3>
                        <p className={`mt-1.5 text-pretty text-small ${k === 1 ? "text-white/85" : "text-dim"}`}>{d}</p>
                    </li>
                ))}
            </ol>

            <ol className="mx-auto mt-14 grid max-w-[64rem] gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                {UNITS.map(([t, d], k) => (
                    <li key={t} className="flex gap-4 border-t border-line py-5">
                        <span className="font-display text-[1.5rem] font-semibold leading-none text-blue">{k + 1}</span>
                        <div>
                            <h3 className="font-display text-[1.125rem] font-semibold leading-tight">{t}</h3>
                            <p className="mt-1 text-pretty text-small text-dim">{d}</p>
                        </div>
                    </li>
                ))}
            </ol>
            <p className="mx-auto mt-6 max-w-[64rem] text-small text-dim">
                Lesson 1 maps to California CS standards 3A-IC-26, 3A-DA-09 and 3B-AP-14.
            </p>
        </Section>
    );
}
