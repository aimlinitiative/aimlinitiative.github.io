import { Link } from "react-router-dom";
import NeuralPlayground from "../components/NeuralPlayground";
import Reveal from "../components/Reveal";

export default function Demo() {
    return (
        <div className="container-wide py-16 sm:py-24">
            <Reveal className="max-w-4xl">
                <span className="label">Live demo</span>
                <h1 className="display mt-5 text-5xl text-white sm:text-7xl">
                    Train a neural network <span className="text-gradient">yourself</span>.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-white/60">
                    No sign-up, no code, no server. This is a genuine multi-layer neural network doing
                    real backpropagation in your browser — a taste of how our students learn, by
                    building the thing, not just reading about it.
                </p>
            </Reveal>

            <Reveal className="mt-14">
                <NeuralPlayground />
            </Reveal>

            <section className="mt-24">
                <Reveal><h2 className="display text-3xl text-white sm:text-5xl">How to read what you're seeing</h2></Reveal>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {[
                        { n: "01", t: "The dots are data", d: "Each dot is an example with two features (its x and y position) and a class — purple or coral. The network only ever sees these points." },
                        { n: "02", t: "The shading is belief", d: "The tinted background is the model's current guess for every point in space. Sharp regions = confident; muddy = unsure." },
                        { n: "03", t: "Training reshapes it", d: "Each epoch nudges thousands of weights to reduce loss. Watch the boundary bend to fit — that bending is learning." },
                    ].map((c, i) => (
                        <Reveal key={c.n} delay={i * 100}>
                            <div className="panel h-full p-7">
                                <div className="index-num text-lg">{c.n}</div>
                                <h3 className="mt-3 font-display text-lg font-bold text-white">{c.t}</h3>
                                <p className="mt-2 text-sm text-white/55">{c.d}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <Reveal className="mt-16 panel p-8">
                <h2 className="label">Things to try</h2>
                <div className="mt-6 grid gap-x-12 gap-y-4 sm:grid-cols-2">
                    {[
                        "Switch to Spiral — the hardest set. Can 4 neurons solve it? Try 12.",
                        "Crank the learning rate to 2.0 and watch training get unstable.",
                        "Drop to 1 hidden layer on XOR — see why depth matters.",
                        "Hit Reset a few times: different random starts, different paths.",
                    ].map((t) => (
                        <div key={t} className="flex items-start gap-3 text-sm text-white/70">
                            <span className="mono text-[#c76bff]">→</span>{t}
                        </div>
                    ))}
                </div>
            </Reveal>

            <Reveal className="mt-24 text-center">
                <p className="display text-2xl text-white sm:text-3xl">This is one lesson. Imagine twelve weeks of them.</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link to="/program" className="btn-primary">Explore the curriculum</Link>
                    <Link to="/contact" className="btn-ghost">Partner with us</Link>
                </div>
            </Reveal>
        </div>
    );
}
