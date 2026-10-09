import Section from "../components/Section";

const STEPS = [
    { t: "We write the course.", d: "Twelve weeks for high schoolers with no background. Plain-language lessons, real notebooks, aligned to state standards." },
    { t: "We teach it in classrooms.", d: "Alongside public-school teachers, then we fix whatever doesn't land. Our first pilot is with LAUSD." },
    { t: "We keep it free.", d: "Every lesson is open source. No school pays, and cost never decides who gets to learn this." },
];

export default function Work() {
    return (
        <Section id="work" label="How it works">
            <ol>
                {STEPS.map((s, i) => (
                    <li key={s.t} className="grid grid-cols-8 gap-x-6 border-t border-line py-10 first:border-t-0 first:pt-0">
                        <span className="col-span-8 text-h2 tabular-nums sm:col-span-2">{i + 1}</span>
                        <div className="col-span-8 mt-4 sm:col-span-6 sm:mt-2">
                            <h3 className="text-h3">{s.t}</h3>
                            <p className="mt-3 max-w-measure text-pretty text-body text-dim">{s.d}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
