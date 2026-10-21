import Reveal from "../components/Reveal";
import Note from "../components/Note";
import { PARTNERS } from "../lib/partners";
import { mailto } from "../lib/site";

const FACTS = [
    ["When", "A Saturday, late Nov or early Dec 2026"],
    ["Where", "Los Angeles · venue being finalized"],
    ["Who", "500+ LA public middle and high schoolers, with their teachers"],
    ["Cost", "Free for students, lunch included"],
];

const DAY = [
    ["Morning", "Keynotes", "Google DeepMind, Microsoft, Google and Snap on the main stage, then a careers panel and hands-on demos."],
    ["Midday", "Lunch with partners", "Free for every student, with partner tables around the room."],
    ["Afternoon", "Hackathon", "Teams of three or four build for a problem in their own school or neighborhood, with mentors on the floor."],
    ["Evening", "Pitches and prizes", "Three-minute pitches, judging, and prizes from Jane Street, MongoDB and Discovery Education."],
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
                            Keynotes in the morning, a hackathon in the afternoon. Every student leaves having built something.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-4 lg:grid-cols-12">
                        <div className="card p-6 sm:p-8 lg:col-span-7">
                            <p className="tag">The day</p>
                            <ol className="mt-4">
                                {DAY.map(([t, h, d]) => (
                                    <li key={h} className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-line py-5">
                                        <span className="pt-1 font-mono text-tag font-semibold uppercase tracking-[0.06em] text-blue">{t}</span>
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
                            <div className="flex-1 rounded-card bg-ink p-6 text-white sm:p-7">
                                <p className="tag text-white/60">Most needed</p>
                                <h3 className="mt-2 font-display text-[1.5rem] font-semibold tracking-tight">A venue</h3>
                                <p className="mt-2 text-pretty text-small text-white/80">
                                    One Saturday, 8am to 8pm, for 500+ students and mentors, with power and Wi-Fi. It sets the date.
                                </p>
                                <a href={mailto("Summit venue")} className="btn mt-5 bg-white text-ink hover:bg-blue hover:text-white">I know a venue</a>
                            </div>
                        </div>
                    </div>

                    <div id="partners" className="card mt-4 scroll-mt-28 p-6 sm:p-8">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <p className="tag">Committed partners</p>
                            <p className="text-small text-dim">A partner is listed once they&apos;ve said yes.</p>
                        </div>
                        <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-line sm:grid-cols-3">
                            {PARTNERS.map((p) => (
                                <li key={p.name} className="bg-white p-5">
                                    <div className="flex h-9 items-center">
                                        <img src={p.logo} alt={p.name} style={{ height: Math.round(p.h * 0.9) }} className="w-auto max-w-full" loading="lazy" decoding="async" />
                                    </div>
                                    <p className="tag mt-3 text-blue">{p.role}</p>
                                    <p className="mt-1 text-pretty text-small text-dim">{p.what}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="card p-6 sm:p-7">
                            <h3 className="font-display text-h3">Safe for students</h3>
                            <p className="mt-2 text-pretty text-small text-dim">
                                Signed parent consent for every student under 18, covering AI tool use. Teachers come with
                                their students and mentors sit at every table. Each tool is reviewed with the schools:
                                Teachable Machine, Google Colab, GitHub Student Developer Pack, MongoDB Atlas, Google Forms and Devpost.
                            </p>
                        </div>
                        <div className="card relative p-6 sm:p-7">
                            <h3 className="font-display text-h3">Every dollar accounted for</h3>
                            <p className="mt-2 text-pretty text-small text-dim">
                                Sponsorship goes to our fiscal sponsor, The Hack Foundation (Hack Club), a <span className="whitespace-nowrap">501(c)(3)</span>.
                                It pays for lunch, printing and prizes directly, with a receipt for every expense. Students never handle money.
                            </p>
                            <p className="mt-3 font-mono text-tag text-dim">EIN 81-2908499</p>
                        </div>
                    </div>
                    <div className="relative hidden h-12 lg:block">
                        <Note dir="up" className="absolute right-[18%] top-2" tone="text-blue">sponsorship runs through a real 501(c)(3)</Note>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
