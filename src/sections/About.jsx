import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

const TEAM = [
    { name: "Adrian Erlikhman", role: "Co-founder", initials: "AE" },
    { name: "Michael Tarekegn", role: "Co-founder", initials: "MT" },
    { name: "Ibrahim Piri", role: "Engineering", initials: "IP" },
];

export default function About() {
    return (
        <>
            {/* ===================== ABOUT ===================== */}
            <section id="about" className="container-page border-t border-line py-24 sm:py-32">
                <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    <Reveal>
                        <SectionLabel n="01">Who we are</SectionLabel>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem] sm:leading-[1.08]">
                            A small team going after a real gap.
                        </h2>
                    </Reveal>
                    <Reveal>
                        <div className="space-y-5 text-lg leading-relaxed text-muted">
                            <p>
                                AI already touches most jobs, but the students who'd gain the most from
                                understanding it get the least chance to learn it. Well-off schools have
                                machine-learning electives and private tutors. Most public schools have nothing.
                            </p>
                            <p>
                                So we started AIML-LI. We write the curriculum, test it in real classrooms,
                                and give it away for free. People from{" "}
                                <span className="font-medium text-ink">Google DeepMind</span> and{" "}
                                <span className="font-medium text-ink">Y Combinator</span> advise us, and
                                we've shown the work at the LAUSD Innovation Expo.
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* Team */}
                <Reveal className="mt-16 border-t border-line pt-10">
                    <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-faint">The team</p>
                    <div className="mt-7 grid gap-8 sm:grid-cols-3">
                        {TEAM.map((m) => (
                            <div key={m.name} className="flex items-center gap-4">
                                {/* Swap the initials avatar for a headshot / the YC photo when ready */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-sm font-semibold text-ink">
                                    {m.initials}
                                </div>
                                <div>
                                    <div className="display text-base font-semibold text-ink">{m.name}</div>
                                    <div className="text-sm text-muted">{m.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>
        </>
    );
}
