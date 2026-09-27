import { motion as Motion } from "motion/react";
import deepmind from "../assets/supporters/deepmind.png";
import microsoft from "../assets/supporters/microsoft.png";
import google from "../assets/supporters/google.png";
import snap from "../assets/supporters/snap.png";
import mongodb from "../assets/supporters/mongodb.png";
import confluent from "../assets/supporters/confluent.png";
import janestreet from "../assets/supporters/janestreet.png";
import discovery from "../assets/supporters/discovery.png";
import hackerfund from "../assets/supporters/hackerfund.png";
import { SPRING, STAGGER } from "../lib/motion";
import { Item, Stagger } from "./fx/Stagger";

/* Partners committed to the LA Student AI Summit, in the order the partner
 * brief lists them, then anyone who committed after it (Hacker Fund, 14 Sept).
 * Logos are each partner's color mark with the background made transparent,
 * and `h` is the CSS height that gives the marks about the same visual weight.
 * Partners still in conversation stay off this list until they commit.
 * The count in SupportersSection ("Nine partners") must match this list. */
const PARTNERS = [
    { name: "Google DeepMind", logo: deepmind, h: 21, role: "Speaker", what: "Keynote" },
    { name: "Microsoft", logo: microsoft, h: 25, role: "Speaker", what: "Keynote" },
    { name: "Google", logo: google, h: 30, role: "Speaker", what: "Keynote" },
    // The Snap mark is the ghost alone, so the name sits next to it.
    { name: "Snap Inc.", logo: snap, h: 24, label: "Snap Inc.", role: "Speaker and sponsor", what: "Keynote and event sponsorship" },
    { name: "MongoDB", logo: mongodb, h: 27, role: "Sponsor", what: "Prizes and Atlas credits for the hackathon" },
    { name: "Confluent", logo: confluent, h: 22, role: "Speaker and mentors", what: "A speaker and hackathon mentors" },
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

// The logo follows the cell's hover state (variants propagate from the parent's whileHover).
const LOGO = {
    hidden: { scale: 1 },
    show: { scale: 1, transition: SPRING.ui },
    hover: { scale: 1.03, transition: SPRING.ui },
};

/* Which hairlines a cell draws. Mobile: 2 columns, and the odd last partner
 * spans both so it sits centered. Desktop: 3 x 3. */
const LAST = PARTNERS.length - 1;
function rules(i) {
    const mobile = i === LAST ? "col-span-2" : `border-b ${i % 2 === 0 ? "border-r" : ""}`;
    const desktop = `md:col-span-1 ${i < 6 ? "md:border-b" : "md:border-b-0"} ${i % 3 === 2 ? "md:border-r-0" : "md:border-r"}`;
    return `${mobile} ${desktop}`;
}

function Logo({ p }) {
    return (
        <Motion.span variants={LOGO} className="flex items-center gap-2">
            <img
                src={p.logo}
                alt={p.label ? "" : p.name}
                style={{ height: p.h }}
                className="w-auto max-w-full object-contain"
                loading="lazy"
                decoding="async"
            />
            {p.label && <span className="whitespace-nowrap text-base font-semibold text-ink">{p.label}</span>}
        </Motion.span>
    );
}

export default function Supporters() {
    return (
        <>
            {/* Hairline grid: rules only between cells, never on the outer edge. */}
            <Stagger
                as="ul"
                each={STAGGER.tight}
                className="mt-14 grid grid-cols-2 md:mt-18 md:grid-cols-3"
            >
                {PARTNERS.map((p, i) => (
                    <Item
                        key={p.name}
                        as="li"
                        whileHover="hover"
                        className={`flex flex-col items-center border-line px-4 pb-8 pt-9 text-center transition-colors duration-base ease-out hover:bg-surface sm:px-8 md:pb-10 md:pt-12 ${rules(i)}`}
                    >
                        <div className="flex h-12 items-center justify-center">
                            <Logo p={p} />
                        </div>
                        <p className="mt-6 text-caption text-ink3">{p.role}</p>
                        <p className="mt-1 max-w-[16rem] text-sm text-ink2">{p.what}</p>
                    </Item>
                ))}
            </Stagger>

            <Stagger className="mt-20 grid gap-10 md:mt-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
                <Item>
                    <h3 className="text-h4 text-ink">Also behind AIML-LI</h3>
                    <p className="mt-3 max-w-prose text-base text-ink2">
                        The curriculum was built with engineers at Google DeepMind and Microsoft, a UCLA professor, and a Y Combinator-backed founder.
                    </p>
                </Item>
                <Item as="ul" className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                    {BACKERS.map((b) => (
                        <li key={b.name} className="border-t border-line py-4">
                            <p className="text-caption text-ink3">{b.role}</p>
                            <p className="mt-1 text-base font-medium text-ink">
                                {b.name}
                                {b.sub && <span className="font-normal text-ink2"> ({b.sub})</span>}
                            </p>
                        </li>
                    ))}
                </Item>
            </Stagger>
        </>
    );
}
