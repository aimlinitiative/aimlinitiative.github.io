import Section from "../components/Section";

// What AIML-LI is working toward, each with where it stands today.
const GOALS = [
    {
        t: "A standing AI-literacy elective in LAUSD.",
        d: "Not a one-off workshop: a class on the schedule, every year, in the second-largest school district in the country.",
        now: "Piloting with LAUSD. A four-week version has already run at LACES.",
    },
    {
        t: "A course any public school can teach for free.",
        d: "Twelve weeks of notebooks a teacher can run as written, with a teacher key in every lesson. No license and no fee.",
        now: "All six units written. Lesson 1 maps to California CS standards.",
    },
    {
        t: "500+ LA students in a room with the people who build AI.",
        d: "One free Saturday of keynotes, demos and a hackathon, so students see the work up close and build something of their own.",
        now: "The LA Student AI Summit, late November or early December 2026. Nine partners committed.",
    },
];

export default function Goals() {
    return (
        <Section id="mission" tag="What we're trying to do"
            title={<>Make AI literacy a <span className="mark">normal class</span> in LA public schools.</>}
            intro="Well-off schools already offer machine-learning electives and tutors. Most public schools offer nothing, even though their students use AI every day. We're closing that gap, starting in Los Angeles.">
            <ol className="grid gap-4 lg:grid-cols-3">
                {GOALS.map((g, k) => (
                    <li key={g.t} className="card flex flex-col p-6 lg:p-7">
                        <span className="font-display text-[3.5rem] font-extrabold leading-none text-blue">{k + 1}</span>
                        <h3 className="mt-5 text-balance font-display text-[1.5rem] font-extrabold leading-tight tracking-tight">{g.t}</h3>
                        <p className="mt-3 flex-1 text-pretty text-body text-dim">{g.d}</p>
                        <p className="mt-6 border-t border-line pt-4 text-small">
                            <span className="tag mr-2 text-blue">Now</span>{g.now}
                        </p>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
