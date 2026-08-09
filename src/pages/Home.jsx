import { Link } from "react-router-dom";
import NeuralPlayground from "../components/NeuralPlayground";
import AutomationVsLearning from "../components/AutomationVsLearning";
import NotebookFrame from "../components/NotebookFrame";
import Reveal from "../components/Reveal";
import Stat from "../components/Stat";
import Marquee from "../components/Marquee";
import Typewriter from "../components/Typewriter";

const MARQUEE = ["LAUSD Pilot", "Google DeepMind", "Data Herald", "Innovation Expo", "Open-source", "CA CS Standards aligned", "Free for schools"];

const FOUNDATIONS = `# Unit 1 · Automation vs Learning
def thermostat_rule(temp_f):
    if temp_f < 68:   return "Heater ON"
    elif temp_f > 75: return "Cooler ON"
    return "Stay steady"        # a human wrote every rule

# ...vs a model that LEARNS from data
study_hours = [[1],[2],[3],[4],[5],[6]]
passed      = [ 0,  0,  0,  1,  1,  1 ]
model = LogisticRegression().fit(study_hours, passed)
model.predict([[4.5]])          # -> 1  (learned, not written)`;

const CORE = `X, y = make_classification(n_samples=300, n_features=2,
                           n_redundant=0, random_state=42)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3)

for clf in [LogisticRegression(), DecisionTreeClassifier()]:
    clf.fit(Xtr, ytr)
    acc = accuracy_score(yte, clf.predict(Xte))
    print(clf.__class__.__name__, round(acc, 2))`;

export default function Home() {
    return (
        <div className="overflow-hidden">
            {/* ============================ HERO ============================ */}
            <section className="container-wide relative pb-14 pt-16 text-center sm:pt-24">
                <Reveal as="div" className="mx-auto max-w-3xl">
                    <div className="flex justify-center animate-fade-up">
                        <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Nonprofit · AI literacy · public schools</span>
                    </div>
                    <h1 className="display-xl mt-7 text-white opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
                        AI literacy,<br /><span className="text-gradient">shipped to the classroom.</span>
                    </h1>
                    <div className="mono mt-6 text-sm text-white/50 opacity-0 animate-fade-up" style={{ animationDelay: "150ms" }}>
                        <span className="text-brand-400">&gt;</span> students learn to{" "}
                        <Typewriter className="text-white" words={["train real models", "read an LLM", "spot AI bias", "ship their own AI"]} />
                    </div>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60 opacity-0 animate-fade-up" style={{ animationDelay: "220ms" }}>
                        AIML-LI is an open-source AI curriculum built for public schools — real notebooks,
                        real models, real classrooms. Starting with LAUSD, the nation's second-largest district.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 opacity-0 animate-fade-up sm:flex-row" style={{ animationDelay: "300ms" }}>
                        <Link to="/demo" className="btn-brand w-full sm:w-auto">Open the playground →</Link>
                        <Link to="/contact" className="btn-ghost w-full sm:w-auto">Partner or fund us</Link>
                    </div>
                    <div className="mono mt-5 flex items-center justify-center gap-2 text-xs text-white/35 opacity-0 animate-fade-up" style={{ animationDelay: "360ms" }}>
                        press <span className="kbd">D</span> to try the live demo
                    </div>
                </Reveal>

                {/* Product showcase */}
                <Reveal className="mx-auto mt-16 max-w-4xl">
                    <div className="glow-frame rounded-2xl">
                        <div className="panel overflow-hidden p-3 sm:p-4">
                            <div className="mb-3 flex items-center justify-between px-1">
                                <span className="mono flex items-center gap-2 text-xs text-white/55">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" /> live · neural net training in your browser
                                </span>
                                <span className="mono text-[10px] text-white/30">no server · plain JS</span>
                            </div>
                            <NeuralPlayground compact />
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Marquee */}
            <div className="border-y border-white/[0.08] py-5">
                <Marquee items={MARQUEE} />
            </div>

            {/* ============================ REAL CURRICULUM CUTOUTS ============================ */}
            <section className="container-wide py-20">
                <Reveal className="mb-10 max-w-2xl">
                    <span className="label">Straight from the notebooks</span>
                    <h2 className="display mt-4 text-4xl text-white sm:text-5xl">This isn't a brochure. It's the curriculum.</h2>
                    <p className="mt-4 text-white/55">Every lesson is a real, runnable Google Colab notebook — standards-aligned and open-source. Here are two cells students actually run in Unit 1.</p>
                </Reveal>
                <div className="grid gap-6 lg:grid-cols-2">
                    <Reveal>
                        <NotebookFrame filename="u01_l01_foundations_intro_ai.ipynb" tag="Lesson 01" code={FOUNDATIONS}
                            output={`Rule at 60°F  -> Heater ON\nLearned at 4.5 hrs -> PASS  (boundary ≈ 3.5 hrs)`} />
                    </Reveal>
                    <Reveal delay={120}>
                        <NotebookFrame filename="u01_l01_core_intro_ai.ipynb" tag="Lesson 01 · Core" code={CORE}
                            output={`LogisticRegression      0.89\nDecisionTreeClassifier  0.86`} />
                    </Reveal>
                </div>
            </section>

            {/* ============================ INTERACTIVE LESSON ============================ */}
            <section className="container-wide py-20">
                <Reveal className="mb-10 max-w-2xl">
                    <span className="label">Try the lesson</span>
                    <h2 className="display mt-4 text-4xl text-white sm:text-5xl">Automation vs. learning — hands-on.</h2>
                    <p className="mt-4 text-white/55">The exact Unit 1 concept, made interactive. Left: rules a human wrote. Right: a model that learned the rule from six data points. Drag the sliders.</p>
                </Reveal>
                <Reveal><AutomationVsLearning /></Reveal>
            </section>

            {/* ============================ STATS ============================ */}
            <section className="container-wide py-16">
                <Reveal className="panel grid grid-cols-2 gap-8 p-8 sm:p-12 lg:grid-cols-4">
                    <Stat value={12} label="Week program" sub="beginner → capstone" />
                    <Stat value={16} suffix="+" label="Curriculum units" sub="Colab + lesson kits" />
                    <Stat value={100} suffix="%" label="Open-source & free" sub="forever, for schools" />
                    <Stat value={2} suffix="nd" label="Largest US district" sub="LAUSD pilot" />
                </Reveal>
            </section>

            {/* ============================ FEATURE CARDS ============================ */}
            <section className="container-wide py-16">
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { icon: "◇", title: "Standards-aligned", text: "Mapped to CA CS Standards (3A-IC-26, 3A-DA-09, 3B-AP-14) and LAUSD digital-citizenship goals — drop-in ready." },
                        { icon: "◇", title: "In real classrooms", text: "Piloted directly with public-school teachers. Measured and iterated, not published and forgotten." },
                        { icon: "◇", title: "Learn by building", text: "Students train real models on real data — the notebooks above — so AI becomes something they can do." },
                    ].map((c, i) => (
                        <Reveal key={c.title} delay={i * 100}>
                            <div className="panel ring-grad panel-hover h-full p-7">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-lg text-brand-400">{c.icon}</div>
                                <h3 className="mt-5 font-display text-lg font-bold text-white">{c.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/55">{c.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============================ ROADMAP ============================ */}
            <section className="container-wide py-16">
                <Reveal className="mb-10 max-w-2xl">
                    <span className="label">Where we're going</span>
                    <h2 className="display mt-4 text-4xl text-white sm:text-5xl">One district → a movement.</h2>
                </Reveal>
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { tag: "Today", items: ["12-week curriculum, open-sourced", "LAUSD classroom pilot underway", "Advisors from DeepMind & Data Herald", "Presented at LAUSD Innovation Expo"] },
                        { tag: "By 2026", items: ["10 partner schools across LA", "1,000+ students reached", "Full teacher-training toolkit", "Formal impact evaluation"] },
                        { tag: "The vision", items: ["Statewide adoption in California", "A national open-source standard", "Free forever for public schools", "Students shipping their own AI"] },
                    ].map((col, i) => (
                        <Reveal key={col.tag} delay={i * 100}>
                            <div className="panel h-full p-7">
                                <span className="label text-brand-400">{col.tag}</span>
                                <ul className="mt-5 space-y-3">
                                    {col.items.map((it) => (
                                        <li key={it} className="flex items-start gap-2.5 text-sm text-white/70"><span className="mono mt-0.5 text-brand-400">→</span>{it}</li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============================ CTA ============================ */}
            <section className="container-wide py-16">
                <Reveal className="panel ring-grad relative overflow-hidden px-8 py-16 text-center sm:px-16">
                    <div className="absolute inset-0 -z-10" style={{ backgroundImage: "radial-gradient(38rem 16rem at 50% -10%, rgba(59,130,246,0.32), transparent 70%)" }} />
                    <h2 className="display mx-auto max-w-3xl text-4xl text-white sm:text-6xl">Put AI within reach of <span className="text-gradient">every</span> student.</h2>
                    <p className="mx-auto mt-5 max-w-xl text-white/60">We're seeking grant partners, schools, and mentors to scale a program that's already in classrooms. Every dollar goes into free curriculum and teacher support.</p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link to="/contact" className="btn-brand w-full sm:w-auto">Become a partner</Link>
                        <Link to="/program" className="btn-ghost w-full sm:w-auto">See the program</Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
