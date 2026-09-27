import { motion as Motion, useReducedMotion } from "motion/react";
import deepmind from "../assets/supporters/deepmind.png";
import microsoft from "../assets/supporters/microsoft.png";
import google from "../assets/supporters/google.png";
import snap from "../assets/supporters/snap.png";
import mongodb from "../assets/supporters/mongodb.png";
import confluent from "../assets/supporters/confluent.png";
import janestreet from "../assets/supporters/janestreet.png";
import discovery from "../assets/supporters/discovery.png";
import hackerfund from "../assets/supporters/hackerfund.png";
import { VIEWPORT } from "../lib/motion";
import TiltCard from "./fx/TiltCard";
import VelocityMarquee from "./fx/VelocityMarquee";
import { Item, Stagger } from "./fx/Stagger";
import { DRAW_X, SPRING_IN, STILL } from "./fx/variants";
import useMediaQuery from "./fx/useMediaQuery";

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

// Cards: slightly desaturated at rest on hover-capable screens; full color on card hover.
const LOGO_TONE = "transition duration-700 [@media(hover:hover)]:opacity-[0.85] [@media(hover:hover)]:grayscale-[50%] group-hover:!opacity-100 group-hover:!grayscale-0";
// Band: a touch quieter than the cards, back to full color while the pointer is on it.
const BAND_TONE = "opacity-[0.85] grayscale-[40%] transition duration-700 group-hover/band:opacity-100 group-hover/band:grayscale-0";

// Keeps "501(c)(3)" on one line (the browser may otherwise break it at ")(").
const keepCode = (s) => s.split(/(501\(c\)\(3\))/).map((part, i) => (i % 2 ? <span key={i} className="whitespace-nowrap">{part}</span> : part));

// A partner's mark; Snap's is an icon, so it carries its name beside it. `tone` goes on the whole lockup.
function Logo({ p, scale = 1, labelClass = "", tone = "" }) {
    const h = Math.round(p.h * scale);
    return p.label ? (
        <span className={`flex items-center gap-2 ${tone}`}>
            <img src={p.logo} alt="" style={{ height: h }} className="w-auto" loading="lazy" decoding="async" />
            <span className={`display whitespace-nowrap font-semibold tracking-[-0.02em] text-ink ${labelClass}`}>{p.label}</span>
        </span>
    ) : (
        <img src={p.logo} alt={p.name} style={{ height: h }} className={`w-auto max-w-full object-contain ${tone}`} loading="lazy" decoding="async" />
    );
}

// The drifting logo band above the cards, straight on the parchment. Decorative:
// the cards carry the names. It leans with scroll speed, but only a little.
function LogoBand() {
    const wide = useMediaQuery("(min-width: 640px)");
    return (
        <div aria-hidden className="mt-14 lg:mt-20">
            <VelocityMarquee speed={30} boost={2} skew={2} gap={wide ? 80 : 52} className="group/band py-3">
                {PARTNERS.map((p) => (
                    <span key={p.name} className="flex shrink-0 items-center">
                        <Logo p={p} scale={1.1} labelClass="text-[19px]" tone={BAND_TONE} />
                    </span>
                ))}
            </VelocityMarquee>
        </div>
    );
}

function PartnerCard({ p, delay }) {
    const reduce = useReducedMotion();
    return (
        <Motion.div
            className="w-[calc(50%_-_0.375rem)] sm:w-[calc(50%_-_0.5rem)] md:w-[calc((100%_-_2rem)/3)]"
            variants={reduce ? STILL : SPRING_IN}
            custom={delay}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
        >
            <TiltCard max={4} hoverScale={1.01} wrapperClassName="h-full" className="h-full">
                <div className="card group relative flex h-full flex-col p-0">
                    {/* Hover darkens the hairline to line-strong: an opacity fade of a second border on top. */}
                    <span aria-hidden className="pointer-events-none absolute -inset-px rounded-[inherit] border border-black/[0.065] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex h-24 items-center justify-center px-4 sm:h-28 sm:px-6">
                        <Logo p={p} labelClass="text-[15px] sm:text-[17px]" tone={LOGO_TONE} />
                    </div>
                    <div className="flex-1 border-t border-line px-4 py-4 sm:px-6 sm:py-5">
                        <p className="eyebrow leading-[1.4]">{p.role}</p>
                        <p className="mt-2 text-pretty text-body-sm text-muted">{p.what}</p>
                    </div>
                </div>
            </TiltCard>
        </Motion.div>
    );
}

export default function Supporters() {
    const cols = useMediaQuery("(min-width: 768px)") ? 3 : 2;
    return (
        <>
            <LogoBand />

            <div className="container-page">
                {/* Flex instead of grid, so a row that isn't full sits centered. */}
                <div className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-4 lg:mt-20">
                    {PARTNERS.map((p, i) => (
                        <PartnerCard key={p.name} p={p} delay={(i % cols) * 0.08} />
                    ))}
                </div>

                <Stagger each={0.08} className="relative mt-20 pt-12 lg:mt-28 lg:pt-16">
                    <Item variants={DRAW_X} aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
                    <Item as="p" className="eyebrow">Also behind AIML-LI</Item>
                    <Item as="p" className="mt-5 max-w-measure text-pretty text-body text-muted">
                        The curriculum was built with engineers at Google DeepMind and Microsoft, a UCLA professor, and a Y Combinator-backed founder.
                    </Item>
                    {/* One white panel; the grid's -1px margin tucks the outer cell borders under the panel's own. */}
                    <div className="mt-8 overflow-hidden rounded-card border border-line bg-canvas">
                        <Stagger inherit each={0.1} className="-m-px grid grid-cols-2 sm:grid-cols-4">
                            {BACKERS.map((b) => (
                                <div key={b.name} className="border-l border-t border-line p-5 sm:p-6">
                                    <Item>
                                        <p className="eyebrow leading-[1.4]">{b.role}</p>
                                        <p className="display mt-3 text-title text-ink">{b.name}</p>
                                        {b.sub && <p className="mt-1 text-pretty text-body-sm text-muted">{keepCode(b.sub)}</p>}
                                    </Item>
                                </div>
                            ))}
                        </Stagger>
                    </div>
                </Stagger>
            </div>
        </>
    );
}
