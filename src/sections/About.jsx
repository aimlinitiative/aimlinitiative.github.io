import Reveal from "../components/Reveal";
import Words from "../components/Words";
import Note from "../components/Note";

// Credits, not cards: who runs it, and who stands behind the course.
const CREDITS = [
    ["Co-founders", "Adrian Erlikhman, Michael Tarekegn"],
    ["Engineering", "Ibrahim Piri"],
    ["Fiscal sponsor", "Hack Club, a 501(c)(3)"],
    ["Curriculum feedback", "Arm, PhET (CU Boulder)"],
    ["Built with", "DeepMind and Microsoft engineers, a UCLA professor, a YC founder"],
];

export default function About() {
    return (
        <section id="about">
            <div className="page py-20 lg:py-28">
                <Reveal>
                    <div className="grid gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <p className="eyebrow">Who we are</p>
                            <h2 className="mt-5 text-balance font-display text-h2"><Words text="Run by LA high school students." /></h2>
                            <p className="mt-5 max-w-[30rem] text-pretty text-lead text-dim">
                                We wrote the AI class our schools didn&apos;t have.
                            </p>
                            <Note dir="left" flip className="mt-10 hidden lg:flex" tone="text-blue">all of us still in high school</Note>
                        </div>
                        <dl className="lg:col-span-7">
                            {CREDITS.map(([k, v], i) => (
                                <div key={k} data-up style={{ "--i": i + 1 }} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                                    <dt className="text-small font-semibold text-dim">{k}</dt>
                                    <dd className="font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.01em]">{v}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
