import Section from "../components/Section";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-founder" },
    { name: "Michael Tarekegn", role: "Co-founder" },
    { name: "Ibrahim Piri", role: "Engineering" },
];

export default function About() {
    return (
        <Section id="about" tag="Who we are" title="Run by LA high school students.">
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="space-y-5 text-pretty text-lead lg:col-span-7">
                    <p>
                        Adrian Erlikhman and Michael Tarekegn founded AIML-LI in Los Angeles to build the AI class
                        their own schools didn't have.
                    </p>
                    <p className="text-dim">
                        We write the course, test it in classrooms, fix what doesn't work and give it to schools for
                        free. We've presented it at the LAUSD Innovation Expo, and aiEDU mentors the team.
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
