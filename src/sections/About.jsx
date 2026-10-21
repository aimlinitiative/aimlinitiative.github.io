import Section from "../components/Section";
import { SUPPORTERS } from "../lib/partners";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-founder", i: "AE" },
    { name: "Michael Tarekegn", role: "Co-founder", i: "MT" },
    { name: "Ibrahim Piri", role: "Engineering", i: "IP" },
];

export default function About() {
    return (
        <Section id="about" tag="Who we are" title="Run by LA high school students."
            intro="We founded AIML-LI to build the AI class our own schools didn't have. We write the course, test it in classrooms, fix what doesn't work and give it away.">
            <ul className="mx-auto grid max-w-[56rem] gap-4 sm:grid-cols-3">
                {TEAM.map((m) => (
                    <li key={m.name} className="card flex items-center gap-4 p-5">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sky font-display text-[1rem] font-semibold text-blue">{m.i}</span>
                        <div>
                            <p className="font-display text-[1.125rem] font-semibold leading-tight">{m.name}</p>
                            <p className="mt-0.5 text-small text-dim">{m.role}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mx-auto mt-14 max-w-[56rem]">
                <p className="text-center tag">Behind the course</p>
                <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                    {SUPPORTERS.map((s) => (
                        <li key={s.name} className="card p-5">
                            <p className="font-display text-[1.125rem] font-semibold">{s.name}</p>
                            <p className="mt-1 text-small text-blue">{s.role}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-center text-pretty text-small text-dim">
                    The course was built with engineers at Google DeepMind and Microsoft, a UCLA professor and a
                    Y Combinator-backed founder. We&apos;ve presented it at the LAUSD Innovation Expo.
                </p>
            </div>
        </Section>
    );
}
