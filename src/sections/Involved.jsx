import Section from "../components/Section";
import { mailto } from "../lib/site";

const NEEDS = [
    { t: "A venue for the summit", most: true, d: "One Saturday, 8am to 8pm. Room for 500+ students plus mentors, tables and chairs, power, and Wi-Fi that holds a few hundred devices. It's our biggest open item, and it sets the date." },
    { t: "Speakers, judges, demos and mentors", d: "Twenty minutes on what you build, pitched at a 15-year-old. An hour judging pitches. A demo students can get their hands on, hardware especially. An afternoon mentoring a table. Each takes half a day or less." },
    { t: "Sponsors and funders", d: "Cash or in kind: hardware, platform credits, swag, or a prize track in your area. Every dollar runs through our 501(c)(3) fiscal sponsor, with a receipt for every expense." },
    { t: "Schools and teachers", d: "Bring students to the summit, or teach the course in your classroom. We'll help you set it up." },
    { t: "Introductions", d: "Venue operators, education giving teams, anyone who should be in the room. Warm intros have done far more for us than cold email." },
];

export default function Involved() {
    return (
        <Section id="involved" tag="Get involved" title="Help us put on the summit."
            intro="The summit is planned for late November or early December. Each of these goes straight to our inbox.">
            <ul className="grid gap-4 md:grid-cols-2">
                {NEEDS.map((n) => n.most ? (
                    <li key={n.t} className="grid gap-6 rounded-card bg-blue p-6 text-white md:col-span-2 md:p-8 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-4">
                            <p className="tag text-white/80">Most needed</p>
                            <h3 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight tracking-tight">{n.t}</h3>
                        </div>
                        <p className="text-pretty text-lead text-white/90 lg:col-span-5">{n.d}</p>
                        <div className="lg:col-span-3 lg:text-right">
                            <a href={mailto(n.t)} className="btn bg-white text-ink hover:bg-ink hover:text-white">I know a venue</a>
                        </div>
                    </li>
                ) : (
                    <li key={n.t} className="card flex flex-col p-6">
                        <h3 className="font-display text-h3">{n.t}</h3>
                        <p className="mt-3 flex-1 text-pretty text-body text-dim">{n.d}</p>
                        <a href={mailto(n.t)} className="link mt-6 self-start">Email us about this</a>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
