import Reveal from "./Reveal";
import deepmind from "../assets/supporters/deepmind.png";
import microsoft from "../assets/supporters/microsoft.png";
import google from "../assets/supporters/google.png";
import snap from "../assets/supporters/snap.png";
import mongodb from "../assets/supporters/mongodb.png";
import confluent from "../assets/supporters/confluent.png";
import janestreet from "../assets/supporters/janestreet.png";
import discovery from "../assets/supporters/discovery.png";
import hackerfund from "../assets/supporters/hackerfund.png";

/* Partners committed to the LA Student AI Summit, in the order the partner
 * brief lists them, then anyone who committed after it (Hacker Fund, 14 Sept).
 * Logos are each partner's color mark with the background made transparent,
 * and `h` is the CSS height that gives the marks about the same visual weight.
 * Partners still in conversation stay off this list until they commit. */
const PARTNERS = [
    { name: "Google DeepMind", logo: deepmind, h: 21, role: "Speaker", what: "Keynote" },
    { name: "Microsoft", logo: microsoft, h: 25, role: "Speaker", what: "Keynote" },
    { name: "Google", logo: google, h: 30, role: "Speaker", what: "Keynote" },
    { name: "Snap Inc.", logo: snap, h: 24, label: "Snap Inc.", role: "Speaker · Sponsor", what: "Keynote and event sponsorship" },
    { name: "MongoDB", logo: mongodb, h: 27, role: "Sponsor", what: "Prizes and Atlas credits for the hackathon" },
    { name: "Confluent", logo: confluent, h: 22, role: "Speaker · Mentors", what: "A speaker and hackathon mentors" },
    { name: "Jane Street", logo: janestreet, h: 33, role: "Sponsor", what: "Prizes for the top five teams" },
    { name: "Discovery Education", logo: discovery, h: 26, role: "Event partner", what: "Co-branding, promotion to LA teachers, a speaker, and prizes" },
    { name: "Hacker Fund", logo: hackerfund, h: 20, role: "Sponsor", what: "In-kind support for the hackathon" },
];

const BACKERS = [
    { role: "Fiscal sponsor", name: "Hack Club", sub: "The Hack Foundation, a 501(c)(3)" },
    { role: "Mentorship", name: "aiEDU" },
    { role: "Curriculum feedback", name: "Arm" },
    { role: "Curriculum feedback", name: "PhET", sub: "CU Boulder" },
];

export default function Supporters() {
    return (
        <>
            {/* Flex instead of grid, so a row that isn't full sits centered. */}
            <div className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-4">
                {PARTNERS.map((p, i) => (
                    <Reveal key={p.name} delay={(i % 3) * 60} className="w-[calc(50%_-_0.375rem)] sm:w-[calc(50%_-_0.5rem)] md:w-[calc((100%_-_2rem)/3)]">
                        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                            <div className="flex h-24 items-center justify-center px-4 sm:h-28 sm:px-6">
                                {p.label ? (
                                    <span className="flex items-center gap-2">
                                        <img src={p.logo} alt="" style={{ height: p.h }} className="w-auto" loading="lazy" decoding="async" />
                                        <span className="display whitespace-nowrap text-[15px] font-bold tracking-tight text-ink sm:text-[17px]">{p.label}</span>
                                    </span>
                                ) : (
                                    <img src={p.logo} alt={p.name} style={{ height: p.h }} className="w-auto max-w-full object-contain" loading="lazy" decoding="async" />
                                )}
                            </div>
                            <div className="flex-1 border-t border-line px-4 py-4 sm:px-6">
                                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint sm:tracking-[0.14em]">{p.role}</p>
                                <p className="mt-1.5 text-[14px] leading-snug text-muted">{p.what}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal className="mt-16 border-t border-line pt-10">
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-faint">Also behind AIML-LI</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                    The curriculum was built with engineers at Google DeepMind and Microsoft, a UCLA professor, and a Y Combinator-backed founder.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                    {BACKERS.map((b) => (
                        <div key={b.name} className="bg-white p-5 sm:p-6">
                            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint sm:tracking-[0.14em]">{b.role}</p>
                            <p className="display mt-2 text-lg font-semibold tracking-tight text-ink">{b.name}</p>
                            {b.sub && <p className="mt-0.5 text-[13px] leading-snug text-muted">{b.sub}</p>}
                        </div>
                    ))}
                </div>
            </Reveal>
        </>
    );
}
