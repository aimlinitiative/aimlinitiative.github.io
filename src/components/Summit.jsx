import { Item, Stagger } from "./fx/Stagger";
import { mailto, ORG } from "../content/site";
import SummitDay from "./summit/SummitDay";

/* The LA Student AI Summit and Hackathon: key facts, how the day runs, and how
 * safety and money work. Wording follows the partner brief (14 Sept 2026), so
 * update it here once the date and venue are set. Renders inside the dark panel
 * in SummitSection. */

const FACTS = [
    { k: "When", v: "A Saturday in late November or early December 2026" },
    { k: "Where", v: "Los Angeles, venue being finalized" },
    { k: "Who", v: "LA middle and high school students" },
    { k: "Cost", v: "Free, lunch included" },
    { k: "Size", v: "200+ students, depending on the venue" },
];

const SAFETY = [
    "Signed parent consent for every student under 18, covering AI tool use.",
    "Teachers come with their students, and partner mentors are on the floor all day.",
    "Generative AI only during the afternoon build, for a set block of time, with a mentor at each table.",
];

const TOOLS = ["Teachable Machine", "Google Colab", "GitHub Student Developer Pack", "MongoDB Atlas", "Google Forms", "Devpost"];

const ONDARK_FOCUS = "focus-visible:outline-accent-ondark";

export default function Summit() {
    return (
        <div className="container-page">
            {/* Title and intro */}
            <Stagger className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
                <Item as="h2" id="summit-title" className="text-h2 text-dark-ink">
                    LA Student AI Summit & Hackathon
                </Item>
                <Item as="p" className="max-w-prose text-lead text-dark-ink2">
                    A free, supervised Saturday for LA public school students. They'll hear from people who build AI, see how
                    the tools they already use work, and build something of their own.
                </Item>
            </Stagger>

            {/* Key facts */}
            <Stagger as="dl" each={0.05} className="mt-16 grid gap-x-8 gap-y-8 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
                {FACTS.map((f) => (
                    <Item key={f.k} className="border-t border-dark-line pt-5">
                        <dt className="text-sm font-medium text-dark-ink2">{f.k}</dt>
                        <dd className="mt-1.5 text-lead text-dark-ink">{f.v}</dd>
                    </Item>
                ))}
            </Stagger>

            <div className="mt-22 md:mt-30">
                <SummitDay />
            </div>

            {/* Safety and money */}
            <Stagger each={0.08} className="mt-22 grid gap-4 md:mt-30 lg:grid-cols-[1.35fr_1fr]">
                <Item className="rounded-xl bg-dark-raised p-7 sm:p-9">
                    <h3 className="text-h4 text-dark-ink">Safety</h3>
                    <ul className="mt-5 space-y-3 text-base text-dark-ink2">
                        {SAFETY.map((s) => (
                            <li key={s} className="flex gap-3">
                                <span aria-hidden className="mt-[0.78em] h-px w-3 shrink-0 bg-dark-ink2" />
                                <span>{s}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-base text-dark-ink2">
                        Students use a short, fixed list of browser tools, reviewed with each school:
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Approved tools">
                        {TOOLS.map((t) => (
                            <li key={t} className="rounded-pill border border-dark-line px-3 py-1 text-sm text-dark-ink">
                                {t}
                            </li>
                        ))}
                    </ul>
                </Item>
                <Item className="flex flex-col rounded-xl bg-dark-raised p-7 sm:p-9">
                    <h3 className="text-h4 text-dark-ink">Money</h3>
                    <p className="mt-5 text-base text-dark-ink2">
                        All sponsorship goes to <span className="text-dark-ink">{ORG.fiscalSponsor}</span>, a <span className="whitespace-nowrap">501(c)(3)</span> nonprofit
                        and our fiscal sponsor. It holds the funds and pays for lunch, printing and prizes directly, with a
                        receipt for every expense.
                    </p>
                    <p className="mt-4 text-base text-dark-ink2">Students pay nothing, and no student handles money.</p>
                    <p className="mt-6 text-sm text-dark-ink2 tabular lg:mt-auto lg:pt-6">EIN {ORG.ein}</p>
                </Item>
            </Stagger>

            {/* Closing */}
            <Stagger
                each={0.08}
                className="mt-22 flex flex-col gap-8 border-t border-dark-line pt-10 md:mt-30 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
            >
                <Item as="p" className="max-w-prose text-lead text-dark-ink">
                    We want the course to become a standing AI literacy elective in LAUSD.
                </Item>
                <Item className="flex shrink-0 flex-col gap-3 sm:flex-row">
                    <a href="#involved" className={`btn-ondark ${ONDARK_FOCUS}`}>Help with the summit</a>
                    <a href={mailto("LA Student AI Summit")} className={`btn-ondark-secondary ${ONDARK_FOCUS}`}>Email us</a>
                </Item>
            </Stagger>
        </div>
    );
}
