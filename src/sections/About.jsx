import { Item, Stagger } from "../components/fx/Stagger";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-founder", initials: "AE" },
    { name: "Michael Tarekegn", role: "Co-founder", initials: "MT" },
    { name: "Ibrahim Piri", role: "Engineering", initials: "IP" },
];

export default function About() {
    return (
        <section id="about" aria-labelledby="about-title" className="py-22 md:py-30">
            <div className="container-page grid gap-16 md:grid-cols-12 md:gap-8">
                <Stagger className="md:col-span-7" each={0.08}>
                    <Item as="h2" id="about-title" className="text-h2 text-ink">Why we started</Item>
                    <Item as="p" className="mt-8 max-w-prose text-lead text-ink">
                        AI already touches most jobs, but the students who would gain the most from
                        understanding it get the least chance to learn it. Wealthy schools have machine
                        learning electives and private tutors. Most public schools have nothing.
                    </Item>
                    <Item as="p" className="mt-6 max-w-prose text-lead text-ink2">
                        So we started AIML-LI. We write the curriculum, test it in real classrooms and give
                        it away free. Our advisors come from Google DeepMind and Y Combinator, and we&rsquo;ve
                        shown the work at the LAUSD Innovation Expo.
                    </Item>
                </Stagger>

                <Stagger className="md:col-span-4 md:col-start-9 md:pt-3" each={0.08} delay={0.15}>
                    <Item as="h3" className="text-sm font-medium text-ink2">The team</Item>
                    <ul className="mt-4 border-t border-line">
                        {TEAM.map((m) => (
                            <Item as="li" key={m.name} className="flex items-center gap-4 border-b border-line py-4">
                                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-medium text-ink">
                                    {m.initials}
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-base font-medium text-ink">{m.name}</span>
                                    <span className="block text-sm text-ink2">{m.role}</span>
                                </span>
                            </Item>
                        ))}
                    </ul>
                </Stagger>
            </div>
        </section>
    );
}
