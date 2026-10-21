import Reveal from "../components/Reveal";
import Logo from "../components/Logo";
import Schedule from "../components/Schedule";
import { PARTNERS } from "../lib/partners";
import { mailto } from "../lib/site";


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

                    <div className="mt-14"><Schedule /></div>

                    <div className="mx-auto mt-6 flex max-w-[60rem] flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                        <p className="text-pretty text-small text-dim">
                            Sponsorship runs through our fiscal sponsor, The Hack Foundation (Hack Club), a <span className="whitespace-nowrap">501(c)(3)</span>, with a receipt for every expense.
                        </p>
                        <a href={mailto("Sponsoring the LA Student AI Summit")} className="btn-primary shrink-0">Sponsor the summit</a>
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
