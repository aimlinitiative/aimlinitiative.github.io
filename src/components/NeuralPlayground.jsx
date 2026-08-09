import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  A tiny neural network (MLP) that trains live in the browser.
 *  Pure JS — real forward pass + backprop, no libraries.
 *  Visualizes the decision boundary of a 2-input classifier as it learns.
 * ------------------------------------------------------------------ */

function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const sigmoid = (z) => 1 / (1 + Math.exp(-z));

function buildNet(sizes) {
    const layers = [];
    for (let l = 1; l < sizes.length; l++) {
        const fin = sizes[l - 1], fout = sizes[l];
        const scale = Math.sqrt(2 / (fin + fout));
        const W = [], b = [];
        for (let o = 0; o < fout; o++) {
            const row = [];
            for (let i = 0; i < fin; i++) row.push(randn() * scale);
            W.push(row);
            b.push(0);
        }
        layers.push({ W, b, fin, fout });
    }
    return { sizes, layers };
}

function forward(net, x) {
    const acts = [x];
    let a = x;
    for (let l = 0; l < net.layers.length; l++) {
        const { W, b } = net.layers[l];
        const isLast = l === net.layers.length - 1;
        const z = new Array(W.length);
        for (let o = 0; o < W.length; o++) {
            let s = b[o];
            const row = W[o];
            for (let i = 0; i < row.length; i++) s += row[i] * a[i];
            z[o] = isLast ? sigmoid(s) : Math.tanh(s);
        }
        a = z;
        acts.push(a);
    }
    return acts;
}

// One full-batch gradient-descent step. Returns mean BCE loss.
function trainBatch(net, X, Y, lr) {
    const L = net.layers.length;
    const gW = net.layers.map((l) => l.W.map((row) => row.map(() => 0)));
    const gb = net.layers.map((l) => l.b.map(() => 0));
    let lossSum = 0;

    for (let n = 0; n < X.length; n++) {
        const acts = forward(net, X[n]);
        const out = acts[L][0];
        const y = Y[n];
        const p = Math.min(Math.max(out, 1e-7), 1 - 1e-7);
        lossSum += -(y * Math.log(p) + (1 - y) * Math.log(1 - p));

        const deltas = new Array(L);
        deltas[L - 1] = [out - y];
        for (let l = L - 2; l >= 0; l--) {
            const next = net.layers[l + 1];
            const aThis = acts[l + 1];
            const d = new Array(net.layers[l].fout).fill(0);
            for (let j = 0; j < net.layers[l].fout; j++) {
                let s = 0;
                for (let o = 0; o < next.fout; o++) s += next.W[o][j] * deltas[l + 1][o];
                d[j] = s * (1 - aThis[j] * aThis[j]);
            }
            deltas[l] = d;
        }

        for (let l = 0; l < L; l++) {
            const aPrev = acts[l];
            const dl = deltas[l];
            for (let o = 0; o < net.layers[l].fout; o++) {
                gb[l][o] += dl[o];
                const grow = gW[l][o];
                for (let i = 0; i < aPrev.length; i++) grow[i] += dl[o] * aPrev[i];
            }
        }
    }

    const m = X.length;
    for (let l = 0; l < L; l++) {
        for (let o = 0; o < net.layers[l].fout; o++) {
            net.layers[l].b[o] -= (lr * gb[l][o]) / m;
            const row = net.layers[l].W[o], grow = gW[l][o];
            for (let i = 0; i < row.length; i++) row[i] -= (lr * grow[i]) / m;
        }
    }
    return lossSum / m;
}

function makeData(kind, N = 220) {
    const X = [], Y = [];
    const push = (x, y, c) => { X.push([x, y]); Y.push(c); };
    const half = N / 2;
    for (let i = 0; i < N; i++) {
        if (kind === "circle") {
            const inner = i < half;
            const ang = Math.random() * Math.PI * 2;
            const rad = inner ? Math.random() * 0.42 : 0.62 + Math.random() * 0.36;
            push(Math.cos(ang) * rad, Math.sin(ang) * rad, inner ? 1 : 0);
        } else if (kind === "xor") {
            const x = Math.random() * 1.7 - 0.85;
            const y = Math.random() * 1.7 - 0.85;
            push(x, y, x * y > 0 ? 1 : 0);
        } else if (kind === "spiral") {
            const c = i % 2;
            const k = Math.floor(i / 2);
            const r = k / half;
            const t = 1.75 * r * 2 * Math.PI + c * Math.PI;
            const nz = () => (Math.random() - 0.5) * 0.14;
            push(r * Math.cos(t) + nz(), r * Math.sin(t) + nz(), c);
        } else {
            const c = i % 2;
            const cx = c ? 0.45 : -0.45;
            const cy = c ? 0.45 : -0.45;
            push(cx + randn() * 0.17, cy + randn() * 0.17, c);
        }
    }
    return { X, Y };
}

const DATASETS = [
    { key: "circle", label: "Circle" },
    { key: "xor", label: "XOR" },
    { key: "spiral", label: "Spiral" },
    { key: "gauss", label: "Clusters" },
];

const DOMAIN = 1.15;
const RES = 72;
const STEPS_PER_FRAME = 3;

// Light theme: faint region tints; ink vs accent points on white.
const C0 = [255, 232, 228]; // class A region (faint accent)
const C1 = [223, 222, 216]; // class B region (faint ink)
const PT0 = "#ff3d23";      // class A point (accent)
const PT1 = "#121110";      // class B point (ink)

export default function NeuralPlayground({ compact = false }) {
    const [dataset, setDataset] = useState("spiral");
    const [hidden, setHidden] = useState(8);
    const [depth, setDepth] = useState(2);
    const [lr, setLr] = useState(0.6);
    const [playing, setPlaying] = useState(true);
    const [seed, setSeed] = useState(0);
    const [stats, setStats] = useState({ epoch: 0, loss: 1, acc: 0 });

    const canvasRef = useRef(null);
    const lrRef = useRef(lr);
    const playingRef = useRef(playing);
    useEffect(() => { lrRef.current = lr; }, [lr]);
    useEffect(() => { playingRef.current = playing; }, [playing]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const size = canvas.clientWidth;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const off = document.createElement("canvas");
        off.width = RES; off.height = RES;
        const offCtx = off.getContext("2d");
        const img = offCtx.createImageData(RES, RES);

        const { X, Y } = makeData(dataset);
        let net = buildNet([2, ...Array(depth).fill(hidden), 1]);
        let epoch = 0;
        const lossHist = [];
        let frameCount = 0;
        let raf = 0;

        const toPx = (v) => ((v + DOMAIN) / (2 * DOMAIN)) * size;

        function renderBoundary() {
            let p = 0;
            for (let gy = 0; gy < RES; gy++) {
                const wy = DOMAIN - ((gy + 0.5) / RES) * 2 * DOMAIN;
                for (let gx = 0; gx < RES; gx++) {
                    const wx = -DOMAIN + ((gx + 0.5) / RES) * 2 * DOMAIN;
                    const out = forward(net, [wx, wy])[net.layers.length][0];
                    img.data[p++] = C0[0] + (C1[0] - C0[0]) * out;
                    img.data[p++] = C0[1] + (C1[1] - C0[1]) * out;
                    img.data[p++] = C0[2] + (C1[2] - C0[2]) * out;
                    img.data[p++] = 255;
                }
            }
            offCtx.putImageData(img, 0, 0);
            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(off, 0, 0, size, size);
        }

        function renderPoints() {
            for (let i = 0; i < X.length; i++) {
                const px = toPx(X[i][0]);
                const py = size - toPx(X[i][1]);
                ctx.beginPath();
                ctx.arc(px, py, 3.4, 0, Math.PI * 2);
                ctx.fillStyle = Y[i] === 1 ? PT1 : PT0;
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(243,242,237,0.9)";
                ctx.stroke();
            }
        }

        function evaluate() {
            let correct = 0, loss = 0;
            for (let i = 0; i < X.length; i++) {
                const out = forward(net, X[i])[net.layers.length][0];
                const p = Math.min(Math.max(out, 1e-7), 1 - 1e-7);
                loss += -(Y[i] * Math.log(p) + (1 - Y[i]) * Math.log(1 - p));
                if ((out > 0.5 ? 1 : 0) === Y[i]) correct++;
            }
            return { loss: loss / X.length, acc: correct / X.length };
        }

        function loop() {
            if (playingRef.current) {
                for (let s = 0; s < STEPS_PER_FRAME; s++) {
                    trainBatch(net, X, Y, lrRef.current);
                    epoch++;
                }
            }
            renderBoundary();
            renderPoints();

            frameCount++;
            if (frameCount % 5 === 0) {
                const { loss, acc } = evaluate();
                lossHist.push(loss);
                if (lossHist.length > 160) lossHist.shift();
                setStats({ epoch, loss, acc });
            }
            raf = requestAnimationFrame(loop);
        }

        loop();
        return () => cancelAnimationFrame(raf);
    }, [dataset, hidden, depth, seed]);

    return (
        <div className="tile p-4 sm:p-5">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_248px]">
                {/* Canvas */}
                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        className="aspect-square w-full rounded-xl bg-white ring-1 ring-ink/10"
                    />
                    <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
                        <span className="mono rounded bg-paper/80 px-2 py-1 text-[11px] font-medium text-accent">● class A</span>
                        <span className="mono rounded bg-paper/80 px-2 py-1 text-[11px] font-medium text-ink">● class B</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-4">
                    <div>
                        <span className="label">Dataset</span>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {DATASETS.map((d) => (
                                <button
                                    key={d.key}
                                    onClick={() => setDataset(d.key)}
                                    className={`rounded-full px-3 py-2 text-xs font-medium transition ${
                                        dataset === d.key
                                            ? "bg-ink text-paper"
                                            : "border border-ink/20 text-ink hover:border-ink"
                                    }`}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Slider label="Learning rate" value={lr} display={lr.toFixed(2)} min={0.05} max={2} step={0.05} onChange={setLr} />
                    <Slider label="Neurons / layer" value={hidden} display={hidden} min={2} max={12} step={1} onChange={(v) => setHidden(Math.round(v))} />
                    <Slider label="Hidden layers" value={depth} display={depth} min={1} max={4} step={1} onChange={(v) => setDepth(Math.round(v))} />

                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setPlaying((v) => !v)} className="btn-primary !py-2.5 text-sm">
                            {playing ? "Pause" : "Train"}
                        </button>
                        <button onClick={() => { setSeed((s) => s + 1); setPlaying(true); }} className="btn-ghost !py-2.5 text-sm">
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats bar */}
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-ink/12 pt-4">
                <Metric label="Epoch" value={stats.epoch.toLocaleString()} />
                <Metric label="Loss" value={stats.loss.toFixed(3)} />
                <Metric label="Accuracy" value={`${(stats.acc * 100).toFixed(1)}%`} highlight />
            </div>
            {!compact && (
                <p className="mt-4 text-xs leading-relaxed text-ink2">
                    A real neural network training in your browser — no server, no libraries. Every
                    frame runs a forward pass and backpropagation in plain JavaScript. Watch the
                    shaded <span className="text-accent">decision boundary</span> reshape itself to
                    separate the two classes as the model learns.
                </p>
            )}
        </div>
    );
}

function Slider({ label, value, display, min, max, step, onChange }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <span className="label">{label}</span>
                <span className="mono text-xs text-accent">{display}</span>
            </div>
            <input
                type="range"
                min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-ink/15 accent-accent"
            />
        </div>
    );
}

function Metric({ label, value, highlight }) {
    return (
        <div className="rounded-lg border border-ink/12 px-3 py-2.5 text-center">
            <div className={`mono text-lg font-semibold ${highlight ? "text-accent" : "text-ink"}`}>{value}</div>
            <div className="label mt-0.5 !text-[10px]">{label}</div>
        </div>
    );
}
