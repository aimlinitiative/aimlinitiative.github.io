import Reveal from "../components/Reveal";
import Logo from "../components/Logo";
import { PARTNERS } from "../lib/partners";
import { mailto } from "../lib/site";

const FACTS = [
    ["When", "Saturday, February 6, 2027"],
    ["Where", "LACES, Los Angeles"],
    ["Who", "500+ LA public middle and high school students"],
    ["Cost", "Free, lunch included"],
];

const DAY = [
    ["Morning", "Keynotes", "Google DeepMind, Microsoft, Google and Snap, then a careers panel and hands-on demos."],
    ["Midday", "Lunch with partners", "Free for every student, with partner tables around the room."],
    ["Afternoon", "Hackathon", "Teams of three or four build for a problem in their own school or neighborhood, with mentors on the floor."],
    ["Evening", "Pitches and prizes", "Judging, and prizes from Jane Street, MongoDB and Discovery Education."],
];

export default function SummitSection() {
    return (
        <section id="summit">
            <div className="page py-20 lg:py-28">
                <Reveal>
                    <div className="mx-auto max-w-[48rem] text-center">
                        <p className="tag text-blue">The LA Student AI Summit &amp; Hackathon</p>
                        <h2 className="mt-3 text-balance font-display text-h2">One free Saturday with the people who build AI.</h2>
                        <p className="mx-auto mt-5 max-w-[38rem] text-pretty text-lead text-dim">
                            February 6, 2027 at LACES. Keynotes in the morning, a hackathon in the afternoon.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-4 lg:grid-cols-12">
                        <div className="card p-6 sm:p-8 lg:col-span-7">
                            <ol>
                                {DAY.map(([t, h, d], k) => (
                                    <li key={h} className={`grid grid-cols-[5.5rem_1fr] gap-4 py-5 ${k ? "border-t border-line" : "pt-0"}`}>
                                        <span className="pt-1 text-small font-semibold text-blue">{t}</span>
                                        <div>
                                            <h3 className="font-display text-h3">{h}</h3>
                                            <p className="mt-1 text-pretty text-small text-dim">{d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="flex flex-col gap-4 lg:col-span-5">
                            <dl className="card divide-y divide-line">
                                {FACTS.map(([k, v]) => (
                                    <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-4 px-6 py-4">
                                        <dt className="tag pt-0.5">{k}</dt>
                                        <dd className="font-medium">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="card flex-1 p-6 sm:p-7">
                                <p className="text-pretty text-small text-dim">
                                    Sponsorship runs through our fiscal sponsor, The Hack Foundation (Hack Club), a <span className="whitespace-nowrap">501(c)(3)</span>, with
                                    a receipt for every expense. Every student under 18 brings signed parent consent, and mentors sit at every table.
                                </p>
                                <a href={mailto("Sponsoring the LA Student AI Summit")} className="btn-primary mt-5">Sponsor the summit</a>
                            </div>
                        </div>
                    </div>

                    <div id="partners" className="mt-20 scroll-mt-28 text-center">
                        <p className="tag">Partners</p>
                        <ul className="mx-auto mt-8 grid max-w-[60rem] grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                            {PARTNERS.map((p) => (
                                <li key={p.name} className="flex flex-col items-center">
                                    <div className="flex h-9 items-center"><Logo p={p} /></div>
                                    <p className="mt-2 text-[0.8125rem] text-dim">{p.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
