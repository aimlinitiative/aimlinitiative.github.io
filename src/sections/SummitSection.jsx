import Reveal from "../components/Reveal";
import { PARTNERS } from "../lib/partners";
import { mailto } from "../lib/site";

const STATS = [
    ["500+", "LA public school students"],
    ["4", "keynotes: Google DeepMind, Microsoft, Google, Snap"],
    ["9", "committed partners"],
    ["$0", "for students, lunch included"],
];

const DAY = [
    ["Morning", "Keynotes, a panel and demos", "Google DeepMind, Microsoft, Google and Snap on the main stage. A careers panel. Live demos students can get their hands on, including physical AI."],
    ["Midday", "Lunch with the partners", "Free for every student, with partner tables around the room."],
    ["Afternoon", "The hackathon", "Teams of three or four pick a problem from their own school or neighborhood. Mentors work the floor. Halfway through, teams swap and try to break each other's projects. Then three-minute pitches, judging, and prizes from Jane Street, MongoDB and Discovery Education."],
];

const FACTS = [
    ["When", "A Saturday in late November or early December 2026"],
    ["Where", "Los Angeles. Venue being finalized."],
    ["Who", "LA public middle and high school students, with their teachers"],
    ["Cost", "Free, lunch included"],
];

export default function SummitSection() {
    return (
        <section id="summit" className="bg-blue text-white">
            <div className="page py-20 lg:py-28">
                <Reveal>
                    <p className="tag text-white/75">The LA Student AI Summit &amp; Hackathon</p>
                    <h2 className="mt-3 max-w-[18ch] text-balance font-display text-[clamp(2.5rem,1.6rem+3.6vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
                        One Saturday. 500+ students. <span className="mark-light">The people who build AI.</span>
                    </h2>
                    <p className="mt-6 max-w-[40rem] text-pretty text-lead text-white/90">
                        A free day for LA public school students: hear from the people building AI, see how the tools
                        they already use really work, and build something of their own before the day is out.
                    </p>

                    <dl className="mt-12 grid gap-px overflow-hidden rounded-card bg-white/25 sm:grid-cols-2 lg:grid-cols-4">
                        {STATS.map(([n, l]) => (
                            <div key={l} className="bg-blue px-6 py-6">
                                <dt className="sr-only">{l}</dt>
                                <dd>
                                    <span className="block font-display text-[3rem] font-extrabold leading-none">{n}</span>
                                    <span className="mt-2 block text-small text-white/85">{l}</span>
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-14 grid gap-10 lg:grid-cols-12">
                        <ol className="lg:col-span-7">
                            {DAY.map(([when, t, d]) => (
                                <li key={t} className="grid gap-2 border-t-[1.5px] border-white/40 py-6 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                                    <span className="tag pt-1.5 text-white/75">{when}</span>
                                    <div>
                                        <h3 className="font-display text-h3">{t}</h3>
                                        <p className="mt-2 max-w-measure text-pretty text-body text-white/85">{d}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <aside className="lg:col-span-5">
                            <dl className="card divide-y divide-line border-white text-ink">
                                {FACTS.map(([k, v]) => (
                                    <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-4 px-6 py-4">
                                        <dt className="tag pt-1">{k}</dt>
                                        <dd className="font-bold">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <a href="#involved" className="btn bg-white text-ink hover:bg-ink hover:text-white">Help make it happen</a>
                                <a href={mailto("LA Student AI Summit")} className="btn border-2 border-white text-white hover:bg-white hover:text-ink">Email us</a>
                            </div>
                        </aside>
                    </div>

                    <div className="mt-14 rounded-card bg-white px-6 py-7 text-ink lg:px-8">
                        <p className="tag">Committed partners</p>
                        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                            {PARTNERS.map((p) => (
                                <li key={p.name}>
                                    <div className="flex h-9 items-center">
                                        <img src={p.logo} alt={p.name} style={{ height: Math.round(p.h * 0.9) }} className="w-auto max-w-full" loading="lazy" decoding="async" />
                                    </div>
                                    <p className="tag mt-2 text-blue">{p.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-card bg-white/10 p-6">
                            <h3 className="font-display text-h3">Safety</h3>
                            <p className="mt-3 text-pretty text-body text-white/85">
                                Every student under 18 brings signed parent consent that covers AI tool use. Teachers
                                come with their students, and partner mentors are on the floor all day. Generative AI is
                                only used during the afternoon build, for a set block, with a mentor at each table.
                                Tools are reviewed with each school: Teachable Machine, Google Colab, GitHub Student
                                Developer Pack, MongoDB Atlas, Google Forms and Devpost.
                            </p>
                        </div>
                        <div className="rounded-card bg-white/10 p-6">
                            <h3 className="font-display text-h3">Money</h3>
                            <p className="mt-3 text-pretty text-body text-white/85">
                                All sponsorship goes to The Hack Foundation (Hack Club), a <span className="whitespace-nowrap">501(c)(3)</span> and our fiscal
                                sponsor. It pays for lunch, printing and prizes directly, with a receipt for every
                                expense. Students pay nothing and never handle money.
                            </p>
                            <p className="mt-3 font-mono text-small text-white/75">EIN 81-2908499</p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
