import Section from "../components/Section";

// What AIML-LI is working toward, each with where it stands today.
const GOALS = [
    {
        t: "A standing AI-literacy elective in LAUSD.",
        d: "A class on the schedule every year, in the second-largest school district in the country.",
        now: "Piloting with LAUSD. A four-week version has already run at LACES.",
    },
    {
        t: "A course any public school can teach for free.",
        d: "Twelve weeks of notebooks with a teacher key in every lesson. No license, no fee.",
        now: "All six units written. Lesson 1 maps to California CS standards.",
    },
    {
        t: "500+ LA students in a room with the people who build AI.",
        d: "One free Saturday of keynotes, demos and a hackathon.",
        now: "The LA Student AI Summit, late November or early December 2026. Nine partners committed.",
    },
];

export default function Goals() {
    return (
        <Section id="mission" tag="What we're trying to do"
            title="Make AI literacy a normal class in LA public schools."
            intro="Well-off schools already offer machine-learning electives. Most public schools offer nothing, though their students use AI every day. We're closing that gap, starting in LA.">
            <ol className="grid gap-4 lg:grid-cols-3">
                {GOALS.map((g, k) => (
                    <li key={g.t} className="card flex flex-col p-6 lg:p-7">
                        <span className="font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] text-blue">0{k + 1}</span>
                        <h3 className="mt-5 text-balance font-display text-[1.375rem] font-semibold leading-tight tracking-tight">{g.t}</h3>
                        <p className="mt-3 flex-1 text-pretty text-body text-dim">{g.d}</p>
                        <p className="mt-6 border-t border-line pt-4 text-small">
                            <span className="mr-2 rounded-full bg-sky px-2 py-0.5 font-mono text-tag font-semibold uppercase text-blue">Now</span>{g.now}
                        </p>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
