import { Link } from "react-router-dom";
import NeuralPlayground from "../components/NeuralPlayground";
import Reveal from "../components/Reveal";

export default function Demo() {
    return (
        <div className="container-page py-16 sm:py-20">
            <Reveal className="mx-auto max-w-3xl text-center">
                <span className="eyebrow">Live demo</span>
                <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                    Train a neural network <span className="text-gradient">yourself</span>.
                </h1>
                <p className="mt-5 text-lg text-white/60">
                    No sign-up, no code, no server. This is a genuine multi-layer neural network
                    doing real backpropagation in your browser. It's a taste of how our students
                    learn — by building the thing, not just reading about it.
                </p>
            </Reveal>

            <Reveal className="mx-auto mt-12 max-w-5xl">
                <NeuralPlayground />
            </Reveal>

            {/* How to read it */}
            <div className="mx-auto mt-16 max-w-5xl">
                <Reveal>
                    <h2 className="font-display text-2xl font-bold text-white">How to read what you're seeing</h2>
                </Reveal>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    {[
                        { n: "1", t: "The dots are data", d: "Each dot is an example with two features (its x and y position) and a class — cyan or indigo. The network only ever sees these points." },
                        { n: "2", t: "The shading is belief", d: "The colored background is the model's current guess for every point in space. Sharp regions = confident; muddy = unsure." },
                        { n: "3", t: "Training reshapes it", d: "Each epoch nudges thousands of weights to reduce loss. Watch the boundary bend to fit — that bending is learning." },
                    ].map((c, i) => (
                        <Reveal key={c.t} delay={i * 100} className="glass p-6">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600/20 font-mono font-bold text-brand-300 ring-1 ring-brand-500/30">
                                {c.n}
                            </div>
                            <h3 className="mt-4 font-semibold text-white">{c.t}</h3>
                            <p className="mt-2 text-sm text-white/55">{c.d}</p>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Things to try */}
            <Reveal className="mx-auto mt-14 max-w-5xl glass p-8">
                <h2 className="font-display text-xl font-bold text-white">Things to try</h2>
                <div className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {[
                        "Switch to Spiral — the hardest set. Can 4 neurons solve it? Try 12.",
                        "Crank the learning rate to 2.0 and watch training get unstable.",
                        "Drop to 1 hidden layer on XOR — see why 'depth' matters.",
                        "Hit Reset a few times: different random starts, different paths.",
                    ].map((t) => (
                        <div key={t} className="flex items-start gap-2.5 text-sm text-white/70">
                            <span className="mt-0.5 text-cyan-400">→</span>
                            {t}
                        </div>
                    ))}
                </div>
            </Reveal>

            <Reveal className="mt-14 text-center">
                <p className="text-white/60">This is one lesson. Imagine twelve weeks of them.</p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link to="/program" className="btn-primary">Explore the curriculum</Link>
                    <Link to="/contact" className="btn-ghost">Partner with us</Link>
                </div>
            </Reveal>
        </div>
    );
}
