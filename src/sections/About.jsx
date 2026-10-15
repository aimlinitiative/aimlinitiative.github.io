import Section from "../components/Section";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-founder" },
    { name: "Michael Tarekegn", role: "Co-founder" },
    { name: "Ibrahim Piri", role: "Engineering" },
];

export default function About() {
    return (
        <Section id="about" tag="About" title="Most LA public high schools have no class on how AI works.">
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="space-y-5 text-pretty text-lead lg:col-span-7">
                    <p>
                        Students already use AI every day, for homework and beyond. Well-off schools add
                        machine-learning electives and tutors. Most public schools don't have either.
                    </p>
                    <p className="text-dim">
                        We're LA high school students. We write the course, test it in classrooms, fix what doesn't
                        work, and give it to schools for free. We've shown it at the LAUSD Innovation Expo.
                    </p>
                </div>
                <ul className="card divide-y divide-line self-start lg:col-span-5">
                    {TEAM.map((m) => (
                        <li key={m.name} className="flex items-baseline justify-between gap-4 px-6 py-4">
                            <span className="font-display text-[1.1875rem] font-bold">{m.name}</span>
                            <span className="tag">{m.role}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
