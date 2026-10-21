import Reveal from "../components/Reveal";
import Ticket from "../components/Ticket";
import { mailto } from "../lib/site";


export default function SummitSection() {
    return (
        <section id="summit">
            <div className="page py-20 lg:py-28">
                <Reveal>
                    <div className="mx-auto max-w-[48rem] text-center">
                        <p className="tag text-blue">The LA Student AI Summit &amp; Hackathon</p>
                        <h2 className="mt-3 text-balance font-display text-h2">One free Saturday with the people who build AI.</h2>
                    </div>

                    <div className="mt-20"><Ticket /></div>

                    <div className="mx-auto mt-16 flex max-w-[60rem] flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                        <p className="text-small text-dim">Sponsorship runs through Hack Club, a 501(c)(3).</p>
                        <a href={mailto("Sponsoring the LA Student AI Summit")} className="btn-primary shrink-0">Sponsor the summit</a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
