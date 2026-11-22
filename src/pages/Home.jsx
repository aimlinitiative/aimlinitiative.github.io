import { PARTNERS } from "../lib/partners";
import { RUNS } from "../lib/minilab";
import { EMAIL, SIGNUP, mailto } from "../lib/site";

// One page, after YC's Startup School 2026 event page: the masthead, sign-up
// first, then a card per topic. Every fact here is in DESIGN.md's sources.

const SCHEDULE = [
    ["Morning", "Keynotes", "Speakers from Google DeepMind, Microsoft, Google and Snap."],
    ["Midday", "Lunch", "With our partners. Free for everyone."],
    ["Afternoon", "Hackathon", "Build a project with a team, with mentors and teachers at every table."],
    ["Evening", "Pitches & prizes", "Teams present. Prizes from Jane Street, MongoDB and Discovery Education."],
];

const FAQ = [
    ["Does it cost anything?", "No. The summit is free, and lunch is included."],
    ["Do I need to know how to code?", "No. Mentors sit at every hackathon table."],
    ["Who can come?", "Middle and high school students at LA public schools, with their teachers."],
    ["Do I need a laptop?", "Bring one if you have one. We'll have loaners for anyone who doesn't."],
    ["Is it supervised?", "Yes. Teachers come with their students, and every student under 18 brings a signed parent consent form."],
    ["When does it start and end?", "Times are TBD. We'll email everyone who signs up as soon as they're set."],
];

const UNITS = [
    ["Foundations", "How machines learn from data, and the difference between automation and learning."],
    ["Building models", "Train, test and score a first classifier."],
    ["Prediction and error", "Accuracy, precision and recall, and who a model's mistakes land on."],
    ["Neural networks", "A small network, built step by step."],
    ["Language and bias", "How language models work, and where they break."],
    ["Capstone", "A project on a problem from the student's own school or neighborhood."],
];

const pct = (x) => `${(x * 100).toFixed(1)}%`;

function SignupButtons() {
    return (
        <div className="cta">
            <a className="btn dark" href={SIGNUP.student}>Sign up as a student</a>
            <a className="btn ghost" href={SIGNUP.teacher}>Sign up as a teacher</a>
        </div>
    );
}

export default function Home() {
    const last = RUNS[RUNS.length - 1];
    return (
        <>
            <div className="mast">
                <h1>LA Student<br />AI Summit 2027</h1>
                <p className="when"><b>Feb 6</b><span>LACES · Los Angeles, CA</span></p>
                <div className="sun" aria-hidden="true"><i /></div>
            </div>

            <div className="cards">
                <section className="card center" id="signup">
                    <h2>Sign up for the summit</h2>
                    <p><em>Free for LA middle and high school students and their teachers. Lunch is included.</em></p>
                    <SignupButtons />
                    <p className="small">Students under 18 need a parent's consent form.</p>
                </section>

                <section className="card" id="summit">
                    <p className="lbl">/About</p>
                    <p><b>The LA Student AI Summit &amp; Hackathon is on.</b></p>
                    <p>
                        On Saturday, February 6, 2027, we're bringing 500+ LA public school students to LACES for a free
                        day of AI. Speakers from Google DeepMind, Microsoft, Google and Snap give the keynotes. Then everyone
                        builds something in a hackathon, with mentors and teachers at every table, and the best teams win
                        prizes from Jane Street, MongoDB and Discovery Education.
                    </p>
                    <p>
                        We're AIML-LI, a student-run nonprofit. We're high school students in LA, and we wrote the free AI
                        course our schools didn't have.
                    </p>

                    <h3>Who can come</h3>
                    <p>Middle and high school students at LA public schools, with their teachers. You don't need to know how to code.</p>

                    <h3>What to bring</h3>
                    <p>A charged laptop if you have one. We'll have loaner laptops for anyone who doesn't.</p>

                    <h3>Partners</h3>
                    <div className="logos">
                        {PARTNERS.map((p) =>
                            p.logo
                                ? <img key={p.name} src={p.logo} alt={p.name} style={{ height: Math.round(p.h * 0.85) }} />
                                : <span key={p.name}>{p.name}</span>,
                        )}
                    </div>
                    <p className="small">
                        Want to sponsor? <a href={mailto("Sponsoring the summit")}>Email us</a>. Sponsorship runs through
                        Hack Club, a 501(c)(3).
                    </p>
                </section>

                <section className="card sched" id="schedule">
                    <p className="lbl">/Schedule</p>
                    <h2>The day</h2>
                    {SCHEDULE.map(([when, what, line]) => (
                        <div className="item" key={when}>
                            <span className="tag">6 Feb · {when}</span>
                            <b>{what}</b>
                            {line}
                        </div>
                    ))}
                    <p className="small">Exact times are TBD. We'll email everyone who signs up.</p>
                </section>

                <section className="card" id="faq">
                    <p className="lbl">/FAQ</p>
                    {FAQ.map(([q, a]) => (
                        <details key={q}>
                            <summary>{q}</summary>
                            <p>{a}</p>
                        </details>
                    ))}
                    <SignupButtons />
                </section>

                <section className="card" id="course">
                    <p className="lbl">/The course</p>
                    <h2>A free AI course, headed into every LAUSD high school.</h2>
                    <p>Twelve weeks, free, and no coding experience needed. Six units, each a Jupyter notebook students work through in class.</p>
                    <div className="units">
                        {UNITS.map(([name, line], i) => (
                            <div className="u" key={name}>
                                <span><span className="tag">Weeks {2 * i + 1}–{2 * i + 2}</span></span>
                                <span><b>{name}.</b> {line}</span>
                            </div>
                        ))}
                    </div>

                    <h3>Where it stands</h3>
                    <p>We taught a 4-week version at LACES. We're working with LAUSD toward making it a standing elective in every LAUSD high school.</p>

                    <h3 id="lesson">From Unit 1</h3>
                    <p>
                        Students run a model that screens scholarship applicants, then change one line,{" "}
                        <b>new_positive_weight</b>, to make winners rarer. The model gets more accurate while it finds fewer
                        of the real winners.
                    </p>
                    <table>
                        <thead>
                            <tr><th>Applicants who win</th><th>Accuracy</th><th>Real winners found</th></tr>
                        </thead>
                        <tbody>
                            {RUNS.map((r) => (
                                <tr key={r.label} className={r === last ? "hl" : undefined}>
                                    <td>{r.label}</td><td className="n">{pct(r.accuracy)}</td><td className="n">{pct(r.recall)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="small" style={{ marginTop: 10 }}>
                        Each row pools 25 runs of the lesson's own code. At {last.label} the model misses {last.missed} of {last.winners} winners.
                    </p>
                </section>

                <section className="card" id="about">
                    <p className="lbl">/Who we are</p>
                    <ul className="dots">
                        <li>Co-founders: Adrian Erlikhman and Michael Tarekegn</li>
                        <li>Engineering: Ibrahim Piri</li>
                        <li>Curriculum feedback: Arm and PhET (CU Boulder)</li>
                        <li>Built with input from engineers at Google DeepMind and Microsoft, a UCLA professor and a YC founder</li>
                        <li>Fiscal sponsor: Hack Club, a 501(c)(3) (EIN 81-2908499)</li>
                    </ul>
                    <h3 id="involved">Help out</h3>
                    <p>
                        <a href={mailto("Sponsoring the summit")}>Sponsor the summit</a> ·{" "}
                        <a href={mailto("Volunteering at the summit")}>Speak, judge or mentor</a> ·{" "}
                        <a href={mailto("Teaching the course")}>Teach the course</a>
                    </p>
                    <p id="contact">Questions? <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
                </section>
            </div>
        </>
    );
}
