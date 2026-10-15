import Section from "../components/Section";
import deepmind from "../assets/supporters/deepmind.png";
import microsoft from "../assets/supporters/microsoft.png";
import google from "../assets/supporters/google.png";
import snap from "../assets/supporters/snap.png";
import mongodb from "../assets/supporters/mongodb.png";
import confluent from "../assets/supporters/confluent.png";
import janestreet from "../assets/supporters/janestreet.png";
import discovery from "../assets/supporters/discovery.png";
import hackerfund from "../assets/supporters/hackerfund.png";

// Committed partners only. `h` balances the marks' visual weight.
const PARTNERS = [
    { name: "Google DeepMind", logo: deepmind, h: 22, role: "Speaker", what: "Keynote" },
    { name: "Microsoft", logo: microsoft, h: 24, role: "Speaker", what: "Keynote" },
    { name: "Google", logo: google, h: 28, role: "Speaker", what: "Keynote" },
    { name: "Snap Inc.", logo: snap, h: 32, role: "Speaker · Sponsor", what: "Keynote and event sponsorship" },
    { name: "MongoDB", logo: mongodb, h: 26, role: "Sponsor", what: "Prizes and Atlas credits for the hackathon" },
    { name: "Confluent", logo: confluent, h: 21, role: "Speaker · Mentors", what: "A speaker and hackathon mentors" },
    { name: "Jane Street", logo: janestreet, h: 32, role: "Sponsor", what: "Prizes for the top five teams" },
    { name: "Discovery Education", logo: discovery, h: 28, role: "Event partner", what: "Co-branding, promotion to LA teachers, a speaker and prizes" },
    { name: "Hacker Fund", logo: hackerfund, h: 19, role: "Sponsor", what: "In-kind support for the hackathon" },
];

export default function SupportersSection() {
    return (
        <Section id="partners" tag="Partners" title="Nine partners have committed to the summit."
            intro="Speakers, prizes, mentors and in-kind support. We list a partner here once they've said yes.">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PARTNERS.map((p) => (
                    <li key={p.name} className="card flex flex-col p-6">
                        <div className="flex h-10 items-center">
                            <img src={p.logo} alt={p.name} style={{ height: p.h }} className="w-auto" loading="lazy" decoding="async" />
                        </div>
                        <p className="tag mt-6 text-blue">{p.role}</p>
                        <p className="mt-1 text-pretty font-bold">{p.what}</p>
                    </li>
                ))}
            </ul>
            <p className="mt-12 max-w-[44rem] text-pretty text-body text-dim">
                Also behind the work: Hack Club (The Hack Foundation, our fiscal sponsor), aiEDU (mentorship), and Arm
                and PhET at CU Boulder (curriculum feedback). The curriculum was built with engineers at Google DeepMind
                and Microsoft, a UCLA professor and a Y Combinator-backed founder.
            </p>
        </Section>
    );
}
