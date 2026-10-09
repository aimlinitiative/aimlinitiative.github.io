import Section from "../components/Section";
import deepmind from "../assets/supporters/deepmind.png";
import microsoft from "../assets/supporters/microsoft.png";
import google from "../assets/supporters/google.png";
import mongodb from "../assets/supporters/mongodb.png";
import confluent from "../assets/supporters/confluent.png";
import janestreet from "../assets/supporters/janestreet.png";
import discovery from "../assets/supporters/discovery.png";
import hackerfund from "../assets/supporters/hackerfund.png";

// `h` balances the marks' visual weight. Logos render as solid white; Snap's
// mark is a filled square that turns into a blank tile that way, so it is text.
const PARTNERS = [
    { name: "Google DeepMind", logo: deepmind, h: 18, role: "Speaker", what: "Keynote" },
    { name: "Microsoft", logo: microsoft, h: 21, role: "Speaker", what: "Keynote" },
    { name: "Google", logo: google, h: 24, role: "Speaker", what: "Keynote" },
    { name: "Snap Inc.", role: "Speaker, sponsor", what: "Keynote and event sponsorship" },
    { name: "MongoDB", logo: mongodb, h: 22, role: "Sponsor", what: "Prizes and Atlas credits for the hackathon" },
    { name: "Confluent", logo: confluent, h: 18, role: "Speaker, mentors", what: "A speaker and hackathon mentors" },
    { name: "Jane Street", logo: janestreet, h: 26, role: "Sponsor", what: "Prizes for the top five teams" },
    { name: "Discovery Education", logo: discovery, h: 22, role: "Event partner", what: "Co-branding, promotion to LA teachers, a speaker and prizes" },
    { name: "Hacker Fund", logo: hackerfund, h: 16, role: "Sponsor", what: "In-kind support for the hackathon" },
];

export default function SupportersSection() {
    return (
        <Section id="partners" label="Partners">
            <p className="text-h2">Nine partners are in.</p>
            <ul className="mt-16 border-t border-line">
                {PARTNERS.map((p) => (
                    <li key={p.name} className="grid grid-cols-8 items-center gap-x-6 gap-y-3 border-b border-line py-6">
                        <span className="col-span-8 flex h-8 items-center sm:col-span-3">
                            {p.logo
                                ? <img src={p.logo} alt={p.name} style={{ height: p.h }} className="w-auto brightness-0 invert" loading="lazy" decoding="async" />
                                : <span className="text-h3 font-semibold">{p.name}</span>}
                        </span>
                        <span className="col-span-3 text-small text-dim sm:col-span-2">{p.role}</span>
                        <span className="col-span-5 text-small sm:col-span-3">{p.what}</span>
                    </li>
                ))}
            </ul>
            <p className="mt-16 max-w-measure text-pretty text-body text-dim">
                Also behind the work: Hack Club (The Hack Foundation, our fiscal sponsor), aiEDU (mentorship), and
                Arm and PhET at CU Boulder (curriculum feedback). The curriculum was built with engineers at Google
                DeepMind and Microsoft, a UCLA professor and a Y Combinator-backed founder.
            </p>
        </Section>
    );
}
