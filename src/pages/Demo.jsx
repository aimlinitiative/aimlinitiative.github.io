import { Link } from "react-router-dom";
import NeuralPlayground from "../components/NeuralPlayground";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

export default function Demo() {
    return (
        <div className="container-wide py-16 sm:py-24">
            <Reveal className="max-w-4xl">
                <div className="flex items-center gap-3">
                    <span className="index-num">(02)</span>
                    <span className="label">Live demo</span>
                </div>
                <h1 className="display mt-6 text-5xl text-ink sm:text-7xl">
                    Train a neural network <span className="italic text-accent">yourself</span>.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-ink2">
                    No sign-up, no code, no server. This is a genuine multi-layer neural network doing
                    real backpropagation in your browser — a taste of how our students learn, by
                    building the thing, not just reading about it.
                </p>
            </Reveal>

            <Reveal className="mt-14">
                <NeuralPlayground />
            </Reveal>

            {/* How to read it */}
            <section className="mt-24 border-t border-ink/15 pt-16">
                <Reveal>
                    <h2 className="display text-3xl text-ink sm:text-5xl">How to read what you're seeing</h2>
                </Reveal>
                <div className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
                    {[
                        { n: "01", t: "The dots are data", d: "Each dot is an example with two features (its x and y position) and a class — accent or ink. The network only ever sees these points." },
                        { n: "02", t: "The shading is belief", d: "The tinted background is the model's current guess for every point in space. Sharp regions = confident; muddy = unsure." },
                        { n: "03", t: "Training reshapes it", d: "Each epoch nudges thousands of weights to reduce loss. Watch the boundary bend to fit — that bending is learning." },
                    ].map((c) => (
                        <Reveal key={c.n}>
                            <div className="group grid grid-cols-[3rem_1fr] gap-6 py-8 sm:grid-cols-[4rem_1fr_1.4fr] sm:gap-10">
                                <span className="index-num pt-2">{c.n}</span>
                                <h3 className="serif text-2xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-2">{c.t}</h3>
                                <p className="col-span-2 text-ink2 sm:col-span-1">{c.d}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Things to try */}
            <section className="mt-16">
                <Reveal>
                    <h2 className="label">Things to try</h2>
                    <div className="mt-6 grid gap-x-12 gap-y-4 sm:grid-cols-2">
                        {[
                            "Switch to Spiral — the hardest set. Can 4 neurons solve it? Try 12.",
                            "Crank the learning rate to 2.0 and watch training get unstable.",
                            "Drop to 1 hidden layer on XOR — see why depth matters.",
                            "Hit Reset a few times: different random starts, different paths.",
                        ].map((t) => (
                            <div key={t} className="flex items-start gap-3 border-t border-ink/15 pt-4 text-ink">
                                <span className="mono text-accent">→</span>{t}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            <Reveal className="mt-24 text-center">
                <p className="serif text-2xl text-ink sm:text-3xl">This is one lesson. Imagine twelve weeks of them.</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Magnetic strength={0.4}><Link to="/program" className="btn-primary" data-cursor>Explore the curriculum</Link></Magnetic>
                    <Magnetic strength={0.4}><Link to="/contact" className="btn-ghost" data-cursor>Partner with us</Link></Magnetic>
                </div>
            </Reveal>
        </div>
    );
}
