import Section from "../components/Section";
import { mailto } from "../lib/site";

const NEEDS = [
    ["Sponsor the summit", "Sponsor"],
    ["Speak, judge or mentor", "Volunteer"],
    ["Teach the course", "Teach it"],
];

export default function Involved() {
    return (
        <Section id="involved" tag="Get involved" title="Get involved.">
            <ul className="mx-auto grid max-w-[60rem] gap-4 md:grid-cols-3">
                {NEEDS.map(([t, cta], k) => (
                    <li key={t}>
                        <a href={mailto(t)} className="card group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 lg:p-7">
                            <span className="text-small font-semibold text-blue">0{k + 1}</span>
                            <h3 className="mt-3 flex-1 font-display text-h3">{t}</h3>
                            <span className="mt-6 text-small font-semibold text-blue">{cta} →</span>
                        </a>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
