import Section from "../components/Section";
import { EMAIL } from "../lib/site";

const FACTS = [
    ["When", "A Saturday in late November or early December 2026"],
    ["Where", "Los Angeles. Venue being finalized."],
    ["Who", "LA middle and high school students"],
    ["Cost", "Free, lunch included"],
    ["Size", "200+ students, depending on the venue"],
];

const DAY = [
    ["Morning, 3 hours", "Talks, a panel and demos", "Keynotes from Google DeepMind, Microsoft, Google and Snap. A careers panel. Live demos, including physical AI."],
    ["Midday", "Lunch", "Free for students, with partner tables around the room."],
    ["Afternoon, 3 hours", "Hackathon", "Teams of three or four pick a problem from their own school or neighborhood. Mentors work the floor. Halfway through, teams swap and try to break each other's projects. Three-minute pitches, judging and prizes."],
];

function Rows({ rows }) {
    return (
        <dl className="border-t border-line">
            {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-8 gap-x-6 border-b border-line py-4">
                    <dt className="col-span-8 text-small text-dim sm:col-span-2">{k}</dt>
                    <dd className="col-span-8 mt-1 text-body sm:col-span-6 sm:mt-0">{v}</dd>
                </div>
            ))}
        </dl>
    );
}

export default function SummitSection() {
    return (
        <Section id="summit" label="Summit">
            <p className="text-balance text-h2">LA Student AI Summit and Hackathon</p>
            <p className="mt-6 max-w-measure text-pretty text-body text-dim">
                One free, supervised day for LA public school students. They hear from people who build AI,
                see how the tools they already use work, and build something of their own.
            </p>

            <div className="mt-16"><Rows rows={FACTS} /></div>

            <h3 className="label mt-20">The day</h3>
            <ol className="mt-6 border-t border-line">
                {DAY.map(([when, t, d]) => (
                    <li key={t} className="grid grid-cols-8 gap-x-6 border-b border-line py-6">
                        <span className="col-span-8 text-small text-dim sm:col-span-2">{when}</span>
                        <div className="col-span-8 mt-2 sm:col-span-6 sm:mt-0">
                            <p className="text-h3">{t}</p>
                            <p className="mt-2 max-w-measure text-pretty text-body text-dim">{d}</p>
                        </div>
                    </li>
                ))}
            </ol>

            <div className="mt-20 grid grid-cols-8 gap-x-6 gap-y-12">
                <div className="col-span-8 sm:col-span-4">
                    <h3 className="label">Safety</h3>
                    <p className="mt-4 text-pretty text-body text-dim">
                        Every student under 18 brings signed parent consent that covers AI tool use. Teachers come
                        with their students and partner mentors are on the floor all day. Generative AI is only used
                        during the afternoon build, for a set block, with a mentor at each table.
                    </p>
                    <p className="mt-4 text-pretty text-body text-dim">
                        Students use a short list of browser tools, reviewed with each school: Teachable Machine,
                        Google Colab, GitHub Student Developer Pack, MongoDB Atlas, Google Forms and Devpost.
                    </p>
                </div>
                <div className="col-span-8 sm:col-span-4">
                    <h3 className="label">Money</h3>
                    <p className="mt-4 text-pretty text-body text-dim">
                        All sponsorship goes to The Hack Foundation (Hack Club), a 501(c)(3) and our fiscal sponsor.
                        It pays for lunch, printing and prizes directly, with a receipt for every expense. Students pay
                        nothing and never handle money.
                    </p>
                    <p className="mt-4 text-small tabular-nums text-dim">EIN 81-2908499</p>
                </div>
            </div>

            <p className="mt-20 max-w-measure text-pretty text-statement">
                The summit is one day. The course is what lasts.
            </p>
            <p className="mt-6 max-w-measure text-pretty text-body text-dim">
                We've taught a 4-week version at LACES and built the 12-week version. The goal is a standing
                LAUSD AI literacy elective.
            </p>
            <div className="mt-10 flex items-center gap-8">
                <a href="#involved" className="btn-primary">Help with the summit</a>
                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("LA Student AI Summit")}`} className="btn-secondary">Email us</a>
            </div>
        </Section>
    );
}
