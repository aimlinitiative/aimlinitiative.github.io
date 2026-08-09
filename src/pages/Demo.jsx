import { Link } from "react-router-dom";
import NeuralPlayground from "../components/NeuralPlayground";
import AutomationVsLearning from "../components/AutomationVsLearning";
import NotebookFrame from "../components/NotebookFrame";
import Reveal from "../components/Reveal";

const NN_CODE = `# A neural network — from scratch, no libraries
net = NeuralNet(layers=[2, 8, 8, 1])   # 2 inputs -> 1 output

for epoch in range(400):
    y_hat = net.forward(X)             # predict
    loss  = binary_cross_entropy(y, y_hat)
    net.backward()                     # backprop
    net.step(lr=0.6)                   # gradient descent

accuracy(net, X, y)   # -> 0.97 on the spiral set`;

export default function Demo() {
    return (
        <div className="container-wide py-16 sm:py-24">
            <Reveal className="max-w-4xl">
                <span className="label">The playground</span>
                <h1 className="display mt-5 text-5xl text-white sm:text-7xl">
                    Train a neural network <span className="text-gradient">yourself</span>.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-white/60">
                    No sign-up, no code, no server. A genuine multi-layer neural network doing real
                    backpropagation in your browser — the same thing our students build in Unit 7.
                </p>
            </Reveal>

            <Reveal className="mt-12"><NeuralPlayground /></Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
                <Reveal>
                    <NotebookFrame filename="u01_l07_neural_nets.ipynb" tag="Under the hood" code={NN_CODE} output={`epoch 400  loss 0.061  acc 0.97`} />
                </Reveal>
                <Reveal delay={100} className="flex flex-col justify-center">
                    <h2 className="display text-2xl text-white sm:text-3xl">What you're looking at</h2>
                    <ul className="mt-5 space-y-4">
                        {[
                            ["The dots are data", "Two features (x, y) and a class — blue or amber. The net only sees these points."],
                            ["The shading is belief", "The model's guess for every point in space. Sharp = confident, muddy = unsure."],
                            ["Training reshapes it", "Each epoch nudges thousands of weights down the loss. That bending is learning."],
                        ].map(([t, d], i) => (
                            <li key={t} className="flex gap-4">
                                <span className="mono text-sm text-brand-400">0{i + 1}</span>
                                <div><div className="font-semibold text-white">{t}</div><div className="text-sm text-white/55">{d}</div></div>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>

            {/* Interactive lesson */}
            <section className="mt-24">
                <Reveal className="mb-8 max-w-2xl">
                    <span className="label">Unit 1 · interactive</span>
                    <h2 className="display mt-4 text-3xl text-white sm:text-5xl">Automation vs. learning</h2>
                    <p className="mt-4 text-white/55">Straight from the first lesson: rules a human wrote, next to a model that learned the rule from data.</p>
                </Reveal>
                <Reveal><AutomationVsLearning /></Reveal>
            </section>

            <Reveal className="mt-16 panel p-8">
                <h2 className="label">Things to try in the playground</h2>
                <div className="mt-6 grid gap-x-12 gap-y-4 sm:grid-cols-2">
                    {[
                        "Switch to Spiral — the hardest set. Can 4 neurons solve it? Try 12.",
                        "Crank the learning rate to 2.0 and watch training get unstable.",
                        "Drop to 1 hidden layer on XOR — see why depth matters.",
                        "Hit Reset a few times: different random starts, different paths.",
                    ].map((t) => (
                        <div key={t} className="flex items-start gap-3 text-sm text-white/70"><span className="mono text-brand-400">→</span>{t}</div>
                    ))}
                </div>
            </Reveal>

            <Reveal className="mt-24 text-center">
                <p className="display text-2xl text-white sm:text-3xl">This is two lessons. Imagine twelve weeks.</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link to="/program" className="btn-brand">Explore the curriculum</Link>
                    <Link to="/contact" className="btn-ghost">Partner with us</Link>
                </div>
            </Reveal>
        </div>
    );
}
