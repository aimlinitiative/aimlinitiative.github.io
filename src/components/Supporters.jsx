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
import SpotlightCard from "./fx/SpotlightCard";
import TiltCard from "./fx/TiltCard";
import VelocityMarquee from "./fx/VelocityMarquee";
import { Item, Stagger } from "./fx/Stagger";
import { DRAW_X, SPRING_IN, STILL } from "./fx/variants";
import { C } from "./fx/palette";
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

// Desaturated at rest on hover-capable screens; full color on card hover.
const LOGO_TONE = "transition duration-700 [@media(hover:hover)]:opacity-[0.82] [@media(hover:hover)]:grayscale-[45%] group-hover:!opacity-100 group-hover:!grayscale-0";

function Logo({ p, tone = "" }) {
    return p.label ? (
        <span className="flex items-center gap-2">
            <img src={p.logo} alt="" style={{ height: p.h }} className={`w-auto ${tone}`} loading="lazy" decoding="async" />
            <span className="display whitespace-nowrap text-[15px] font-bold tracking-tight text-ink sm:text-[17px]">{p.label}</span>
        </span>
    ) : (
        <img src={p.logo} alt={p.name} style={{ height: p.h }} className={`w-auto max-w-full object-contain ${tone}`} loading="lazy" decoding="async" />
    );
}

// The drifting logo band above the cards. Decorative: the cards carry the names.
function LogoBand() {
    return (
        <div aria-hidden className="relative mt-14 border-y border-line bg-white/50 py-7 sm:py-9">
            <VelocityMarquee gap={64}>
                {PARTNERS.map((p) => (
                    <span key={p.name} className="flex shrink-0 items-center gap-16">
                        <span className="flex items-center" style={{ transform: "scale(1.15)" }}>
                            {p.label ? (
                                <span className="flex items-center gap-2">
                                    <img src={p.logo} alt="" style={{ height: p.h }} className="w-auto" loading="lazy" decoding="async" />
                                    <span className="display whitespace-nowrap text-[17px] font-bold tracking-tight text-ink">{p.label}</span>
                                </span>
                            ) : (
                                <img src={p.logo} alt="" style={{ height: p.h }} className="w-auto" loading="lazy" decoding="async" />
                            )}
                        </span>
                        <span className="h-1.5 w-1.5 rotate-45" style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.cyan})` }} />
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
            <TiltCard max={6} hoverScale={1.015} wrapperClassName="h-full" className="h-full">
                <SpotlightCard glow="gradient" lift className="group flex h-full flex-col rounded-2xl border border-line bg-white">
                    <div className="flex h-24 items-center justify-center px-4 sm:h-28 sm:px-6">
                        <Logo p={p} tone={LOGO_TONE} />
                    </div>
                    <div className="flex-1 border-t border-line px-4 py-4 sm:px-6">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint sm:tracking-[0.14em]">{p.role}</p>
                        <p className="mt-1.5 text-[14px] leading-snug text-muted">{p.what}</p>
                    </div>
                </SpotlightCard>
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
                <div className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-4">
                    {PARTNERS.map((p, i) => (
                        <PartnerCard key={p.name} p={p} delay={(i % cols) * 0.08} />
                    ))}
                </div>

                <Stagger each={0.08} className="relative mt-16 pt-10">
                    <Item variants={DRAW_X} aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
                    <Item as="p" className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-faint">Also behind AIML-LI</Item>
                    <Item as="p" className="mt-4 max-w-2xl leading-relaxed text-muted">
                        The curriculum was built with engineers at Google DeepMind and Microsoft, a UCLA professor, and a Y Combinator-backed founder.
                    </Item>
                    <Stagger inherit each={0.1} className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                        {BACKERS.map((b) => (
                            <div key={b.name} className="bg-white p-5 sm:p-6">
                                <Item>
                                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint sm:tracking-[0.14em]">{b.role}</p>
                                    <p className="display mt-2 text-lg font-semibold tracking-tight text-ink">{b.name}</p>
                                    {b.sub && <p className="mt-0.5 text-[13px] leading-snug text-muted">{b.sub}</p>}
                                </Item>
                            </div>
                        ))}
                    </Stagger>
                </Stagger>
            </div>
        </>
    );
}
