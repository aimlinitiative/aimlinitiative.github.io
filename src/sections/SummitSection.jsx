import Section from "../components/Section";
import { mailto } from "../lib/site";

const FACTS = [
    ["When", "A Saturday in late November or early December 2026"],
    ["Where", "Los Angeles. Venue being finalized."],
    ["Who", "LA public middle and high school students"],
    ["Cost", "Free, lunch included"],
    ["Size", "200+ students, depending on the venue"],
];

const DAY = [
    ["Morning", "Talks, a panel and demos", "Keynotes from Google DeepMind, Microsoft, Google and Snap. A careers panel. Live demos, including physical AI."],
    ["Midday", "Lunch", "Free for students, with partner tables around the room."],
    ["Afternoon", "Hackathon", "Teams of three or four pick a problem from their own school or neighborhood. Mentors work the floor. Halfway through, teams swap and try to break each other's projects. Then three-minute pitches, judging and prizes."],
];

export default function SummitSection() {
    return (
        <Section id="summit" tone="bg-warm" tag="LA Student AI Summit & Hackathon" title="One free Saturday of talks, demos and a hackathon."
            intro="For LA public school students: hear from people who build AI, see how the tools they already use work, and build something of their own.">
            <div className="grid gap-10 lg:grid-cols-12">
                <ol className="lg:col-span-7">
                    {DAY.map(([when, t, d]) => (
                        <li key={t} className="grid gap-2 border-t-[1.5px] border-ink py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
                            <span className="tag pt-1.5">{when}</span>
                            <div>
                                <h3 className="font-display text-h3">{t}</h3>
                                <p className="mt-2 max-w-measure text-pretty text-body text-dim">{d}</p>
                            </div>
                        </li>
                    ))}
                </ol>

                <aside className="lg:col-span-5">
                    <dl className="card divide-y divide-line">
                        {FACTS.map(([k, v]) => (
                            <div key={k} className="grid grid-cols-[5rem_1fr] gap-4 px-6 py-4">
                                <dt className="tag pt-1">{k}</dt>
                                <dd className="font-bold">{v}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <a href="#involved" className="btn-ink">Help with the summit</a>
                        <a href={mailto("LA Student AI Summit")} className="btn-outline">Email us</a>
                    </div>
                </aside>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
                <div className="card p-6">
                    <h3 className="font-display text-h3">Safety</h3>
                    <p className="mt-3 text-pretty text-body text-dim">
                        Every student under 18 brings signed parent consent that covers AI tool use. Teachers come with
                        their students, and partner mentors are on the floor all day. Generative AI is only used during
                        the afternoon build, for a set block, with a mentor at each table.
                    </p>
                    <p className="mt-3 text-pretty text-small text-dim">
                        Tools, reviewed with each school: Teachable Machine, Google Colab, GitHub Student Developer Pack,
                        MongoDB Atlas, Google Forms and Devpost.
                    </p>
                </div>
                <div className="card p-6">
                    <h3 className="font-display text-h3">Money</h3>
                    <p className="mt-3 text-pretty text-body text-dim">
                        All sponsorship goes to The Hack Foundation (Hack Club), a 501(c)(3) and our fiscal sponsor. It
                        pays for lunch, printing and prizes directly, with a receipt for every expense. Students pay
                        nothing and never handle money.
                    </p>
                    <p className="mt-3 font-mono text-small text-dim">EIN 81-2908499</p>
                </div>
            </div>
        </Section>
    );
}
