import Section from "../components/Section";
import { mailto } from "../lib/site";

const NEEDS = [
    { t: "Sponsor the summit", d: "Cash or in kind: hardware, credits, swag, or a prize track in your area. It all runs through our 501(c)(3) fiscal sponsor.", cta: "Sponsor" },
    { t: "Speak, judge or mentor", d: "A 20-minute talk, an hour of judging, a hands-on demo or an afternoon at a table. Each is half a day or less.", cta: "Volunteer" },
    { t: "Lend us a venue", d: "One Saturday, 8am to 8pm, for 500+ students. Our biggest open item.", cta: "Offer a venue" },
    { t: "Bring the course to a school", d: "Teachers can run it as written. Or bring your students to the summit.", cta: "Teach it" },
];

export default function Involved() {
    return (
        <Section id="involved" tag="Get involved" title="Four ways to help."
            intro="Each one opens an email to our team.">
            <ul className="mx-auto grid max-w-[60rem] gap-4 md:grid-cols-2">
                {NEEDS.map((n, k) => (
                    <li key={n.t}>
                        <a href={mailto(n.t)} className="card group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 lg:p-7">
                            <span className="font-mono text-tag text-dim">0{k + 1}</span>
                            <h3 className="mt-3 font-display text-h3">{n.t}</h3>
                            <p className="mt-2 flex-1 text-pretty text-small text-dim">{n.d}</p>
                            <span className="mt-5 text-small font-semibold text-blue">{n.cta} →</span>
                        </a>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
