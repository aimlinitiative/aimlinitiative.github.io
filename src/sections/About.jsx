import Section from "../components/Section";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-founder" },
    { name: "Michael Tarekegn", role: "Co-founder" },
    { name: "Ibrahim Piri", role: "Engineering" },
];

export default function About() {
    return (
        <Section id="about" label="About">
            <p className="text-pretty text-statement">
                The students who'd gain the most from understanding AI get the least chance to learn it.
                Well-off schools have machine-learning electives and tutors. Most public schools have nothing.
            </p>
            <p className="mt-10 max-w-measure text-pretty text-body text-dim">
                So we write the curriculum, test it in real classrooms and give it away. People from Google
                DeepMind and Y Combinator advise us, and we've shown the work at the LAUSD Innovation Expo.
            </p>
            <ul className="mt-20 border-t border-line">
                {TEAM.map((m) => (
                    <li key={m.name} className="flex items-baseline justify-between border-b border-line py-4">
                        <span className="text-body">{m.name}</span>
                        <span className="text-small text-dim">{m.role}</span>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
