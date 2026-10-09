import Section from "../components/Section";

const NEEDS = [
    { t: "A venue for the summit", most: true, d: "One Saturday, 8am to 8pm. Room for at least 200 students plus mentors, tables and chairs, power, and Wi-Fi that holds a few hundred devices. It's our biggest open item, and it sets the date." },
    { t: "Speakers, judges, demos and mentors", d: "Twenty minutes on what you build, pitched at a 15-year-old. An hour judging pitches. A demo students can get their hands on, hardware especially. An afternoon mentoring a table. Each takes half a day or less." },
    { t: "Sponsors and funders", d: "Cash or in kind: hardware, platform credits, swag, or a prize track in your area. Every dollar runs through our 501(c)(3) fiscal sponsor, with a receipt for every expense." },
    { t: "Schools and educators", d: "Bring students to the summit, or teach the free course in your classroom. We'll help you set up." },
    { t: "Introductions", d: "Venue operators, education giving teams, anyone who should be in the room. Warm intros have done far more for us than cold email." },
];

export default function Involved() {
    return (
        <Section id="involved" label="Get involved">
            <p className="text-h2">What we need.</p>
            <p className="mt-6 max-w-measure text-body text-dim">
                The summit is planned for late November or early December. This is what helps most right now.
            </p>
            <ul className="mt-16 border-t border-line">
                {NEEDS.map((n) => (
                    <li key={n.t} className="grid grid-cols-8 gap-x-6 gap-y-2 border-b border-line py-8">
                        <div className="col-span-8 sm:col-span-3">
                            <h3 className="text-h3">{n.t}</h3>
                            {n.most && <p className="mt-2 text-small text-dim">Most needed</p>}
                        </div>
                        <p className="col-span-8 text-pretty text-body text-dim sm:col-span-5">{n.d}</p>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
