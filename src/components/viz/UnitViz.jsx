import { motion as Motion, useReducedMotion } from "motion/react";
import { EASE } from "../../lib/motion";
import { INK, INK2, INK3, LINE, HAIR, CARD, ACCENT, ACCENT_SOFT } from "./palette";

/* One small, honest diagram per curriculum unit, drawn for the white card:
 * ink for structure, the single accent for the one thing to look at.
 * When `play` turns on (unit selected and on screen) the diagram draws in once:
 * lines trace with pathLength, points scale in on a 20ms stagger, bars grow
 * from the baseline. No loops. Reduced motion renders the final state. */

const W = 400, H = 210;
const X0 = 36, X1 = 388, Y0 = 14, Y1 = 170;
const LABEL_Y = 196;

// Tiny seeded PRNG so the "data" is identical on every render.
function rng(seed) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
const gauss = (r) => (r() + r() + r() - 1.5) / 1.5;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const f1 = (v) => Math.round(v * 10) / 10;

/* ---- draw-in variants (state "hidden" -> "show", custom = delay in s) ---- */
const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (d = 0) => ({
        pathLength: 1,
        opacity: 1,
        transition: { pathLength: { duration: 0.7, ease: EASE.out, delay: d }, opacity: { duration: 0.01, delay: d } },
    }),
};
const pop = {
    hidden: { scale: 0, opacity: 0 },
    show: (d = 0) => ({ scale: 1, opacity: 1, transition: { duration: 0.35, ease: EASE.out, delay: d } }),
};
const grow = {
    hidden: { scaleY: 0 },
    show: (d = 0) => ({ scaleY: 1, transition: { duration: 0.6, ease: EASE.out, delay: d } }),
};
const fadeIn = {
    hidden: { opacity: 0 },
    show: (d = 0) => ({ opacity: 1, transition: { duration: 0.4, ease: EASE.out, delay: d } }),
};
const dotDelay = (i, start = 0.12) => start + Math.min(i, 30) * 0.02;

/* ---- primitives ---- */
function Stroke({ d, delay = 0, color = INK3, width = 1, ...rest }) {
    return (
        <Motion.path d={d} variants={draw} custom={delay} fill="none" stroke={color} strokeWidth={width}
            strokeLinecap="round" strokeLinejoin="round" {...rest} />
    );
}

// Two point shapes so groups never depend on color alone: filled vs. ring.
function Dot({ x, y, kind = "a", delay = 0 }) {
    const filled = kind === "a";
    return (
        <Motion.circle cx={x} cy={y} r={filled ? 4.5 : 4} variants={pop} custom={delay}
            fill={filled ? INK2 : CARD} stroke={INK2} strokeWidth={filled ? 0 : 1.5} />
    );
}

function Label({ x, y, children, anchor = "start", color = INK3, weight = 400, size = 12, delay = 0.45 }) {
    return (
        <Motion.text x={x} y={y} textAnchor={anchor} fill={color} fontSize={size} fontWeight={weight}
            variants={fadeIn} custom={delay} style={{ fontVariantNumeric: "tabular-nums" }}>
            {children}
        </Motion.text>
    );
}

function Axes({ x0 = X0, x1 = X1, y0 = Y0, y1 = Y1 }) {
    return <Stroke d={`M${x0},${y0} V${y1} H${x1}`} color={LINE} delay={0} />;
}

// Legend row along the bottom: [{ shape, label }]
function Legend({ items }) {
    let x = X0;
    return (
        <Motion.g variants={fadeIn} custom={0.5}>
            {items.map(({ shape, label }) => {
                const gx = x;
                x += (label === "prediction" ? 18 : 16) + label.length * 6.4 + 22;
                return (
                    <g key={label} transform={`translate(${gx},${LABEL_Y})`}>
                        {shape === "a" && <circle cx={5} cy={-4} r={4.5} fill={INK2} />}
                        {shape === "b" && <circle cx={5} cy={-4} r={4} fill={CARD} stroke={INK2} strokeWidth={1.5} />}
                        {shape === "q" && <rect x={0.5} y={-8.5} width={9} height={9} fill={ACCENT} transform="rotate(45 5 -4)" />}
                        {shape === "line" && <path d="M0,-4 H12" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />}
                        {shape === "tick" && <path d="M5,-10 V2" stroke={INK3} strokeWidth={1} />}
                        <text x={shape === "line" ? 18 : 16} y={0} fill={INK3} fontSize={12}>{label}</text>
                    </g>
                );
            })}
        </Motion.g>
    );
}

/* ---- 1. Foundations: nearest neighbors ---- */
const KNN = (() => {
    const r = rng(7);
    const pts = [];
    const cluster = (cx, cy, kind, n) => {
        for (let i = 0; i < n; i++) {
            pts.push({
                x: f1(clamp(cx + gauss(r) * 110, X0 + 12, X1 - 12)),
                y: f1(clamp(cy + gauss(r) * 70, Y0 + 10, Y1 - 10)),
                kind,
            });
        }
    };
    cluster(120, 66, "a", 14);
    cluster(300, 122, "b", 14);
    const q = { x: 214, y: 92 };
    const near = [...pts].sort((a, b) => Math.hypot(a.x - q.x, a.y - q.y) - Math.hypot(b.x - q.x, b.y - q.y)).slice(0, 3);
    const radius = Math.hypot(near[2].x - q.x, near[2].y - q.y) + 8;
    return { pts, q, near, radius };
})();

function Knn() {
    const { pts, q, near, radius } = KNN;
    return (
        <>
            <Axes />
            <Motion.circle cx={q.x} cy={q.y} r={radius} variants={pop} custom={0.5}
                fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth={1} strokeDasharray="3 4" />
            {pts.map((p, i) => <Dot key={i} {...p} delay={dotDelay(i)} />)}
            {near.map((p, i) => (
                <Stroke key={i} d={`M${q.x},${q.y} L${p.x},${p.y}`} color={ACCENT} width={1.5} delay={0.6 + i * 0.06} />
            ))}
            <Motion.g variants={pop} custom={0.55}>
                <rect x={q.x - 5.5} y={q.y - 5.5} width={11} height={11} fill={ACCENT} transform={`rotate(45 ${q.x} ${q.y})`} />
            </Motion.g>
            <Label x={q.x + radius * 0.72 + 6} y={q.y - radius * 0.72} color={ACCENT} weight={500} delay={0.75}>k = 3</Label>
            <Legend items={[{ shape: "a", label: "group A" }, { shape: "b", label: "group B" }, { shape: "q", label: "new point" }]} />
        </>
    );
}

/* ---- 2. Building models: a decision boundary ---- */
const yb = (x) => 96 + 36 * Math.sin(((x - X0) / (X1 - X0)) * Math.PI * 1.4 + 0.3);
const BOUNDARY = (() => {
    const s = [];
    for (let x = X0; x <= X1; x += 8) s.push(`${x},${f1(yb(x))}`);
    const line = `M${s.join(" L")}`;
    const r = rng(11);
    const pts = [];
    while (pts.length < 30) {
        const x = f1(X0 + 10 + r() * (X1 - X0 - 20));
        const y = f1(Y0 + 8 + r() * (Y1 - Y0 - 16));
        if (Math.abs(y - yb(x)) < 14) continue;
        if (x > X1 - 90 && y > yb(X1) - 34 && y < yb(X1)) continue; // keep the label clear
        pts.push({ x, y, kind: y < yb(x) ? "a" : "b" });
    }
    pts.sort((a, b) => a.x - b.x);
    return { line, region: `${line} L${X1},${Y1} L${X0},${Y1} Z`, pts };
})();

function Boundary() {
    const { line, region, pts } = BOUNDARY;
    return (
        <>
            <Motion.path d={region} fill={ACCENT_SOFT} variants={fadeIn} custom={0.35} />
            <Axes />
            {pts.map((p, i) => <Dot key={i} {...p} delay={dotDelay(i)} />)}
            <Stroke d={line} color={ACCENT} width={2} delay={0.25} />
            <Label x={X1 - 4} y={f1(yb(X1)) - 10} anchor="end" color={ACCENT} weight={500} delay={0.8}>boundary</Label>
            <Legend items={[{ shape: "a", label: "group A" }, { shape: "b", label: "group B" }]} />
        </>
    );
}

/* ---- 3. Prediction & error: regression line, residuals, R² ---- */
const FIT = (() => {
    const r = rng(23);
    const pts = [];
    for (let i = 0; i < 16; i++) {
        const x = f1(X0 + 22 + i * 20.5 + gauss(r) * 4);
        pts.push({ x, y: f1(clamp(152 - 0.3 * (x - X0) + gauss(r) * 42, Y0 + 6, Y1 - 6)) });
    }
    const n = pts.length;
    const mx = pts.reduce((s, p) => s + p.x, 0) / n;
    const my = pts.reduce((s, p) => s + p.y, 0) / n;
    const b = pts.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0) / pts.reduce((s, p) => s + (p.x - mx) ** 2, 0);
    const a = my - b * mx;
    const hat = (x) => a + b * x;
    const ssRes = pts.reduce((s, p) => s + (p.y - hat(p.x)) ** 2, 0);
    const ssTot = pts.reduce((s, p) => s + (p.y - my) ** 2, 0);
    return { pts, hat, r2: (1 - ssRes / ssTot).toFixed(2) };
})();

function Fit() {
    const { pts, hat, r2 } = FIT;
    const xa = X0 + 8, xb = X1 - 8;
    return (
        <>
            <Axes />
            {pts.map((p, i) => (
                <Stroke key={`r${i}`} d={`M${p.x},${p.y} V${f1(hat(p.x))}`} color={INK3} delay={0.55 + i * 0.02} />
            ))}
            <Stroke d={`M${xa},${f1(hat(xa))} L${xb},${f1(hat(xb))}`} color={ACCENT} width={2} delay={0.3} />
            {pts.map((p, i) => <Dot key={i} x={p.x} y={p.y} delay={dotDelay(i)} />)}
            <Label x={X1} y={Y0 + 10} anchor="end" color={INK} weight={500} size={13} delay={0.8}>R² = {r2}</Label>
            <Legend items={[{ shape: "line", label: "prediction" }, { shape: "tick", label: "error" }]} />
        </>
    );
}

/* ---- 4. Neural networks: a tiny net and its loss curve ---- */
const NET = (() => {
    const sizes = [3, 4, 4, 2];
    const xs = [52, 122, 192, 262];
    const cy = 92, gap = 34;
    const layers = sizes.map((n, l) => Array.from({ length: n }, (_, i) => ({ x: xs[l], y: cy + (i - (n - 1) / 2) * gap })));
    const hot = [1, 2, 1, 0]; // highlighted node index per layer
    const edges = [];
    for (let l = 0; l < layers.length - 1; l++) {
        for (const [i, a] of layers[l].entries()) {
            for (const [j, b] of layers[l + 1].entries()) {
                edges.push({ l, d: `M${a.x},${a.y} L${b.x},${b.y}`, hot: hot[l] === i && hot[l + 1] === j });
            }
        }
    }
    // Loss inset
    const lx0 = 314, lx1 = X1, ly0 = 30, ly1 = Y1;
    const r = rng(5);
    const loss = Array.from({ length: 18 }, (_, i) => {
        const t = i / 17;
        const v = 0.12 + 0.88 * Math.exp(-t * 3.4) + gauss(r) * 0.025;
        return `${f1(lx0 + 4 + t * (lx1 - lx0 - 8))},${f1(ly1 - 6 - clamp(v, 0, 1) * (ly1 - ly0 - 12))}`;
    });
    return { layers, hot, edges, inset: { lx0, lx1, ly0, ly1 }, loss: `M${loss.join(" L")}` };
})();

function Net() {
    const { layers, hot, edges, inset, loss } = NET;
    const names = ["in", "h₁", "h₂", "out"];
    return (
        <>
            {edges.filter((e) => !e.hot).map((e, i) => <Stroke key={i} d={e.d} color={LINE} delay={0.15 + e.l * 0.12} />)}
            {edges.filter((e) => e.hot).map((e, i) => <Stroke key={`h${i}`} d={e.d} color={ACCENT} width={2} delay={0.5 + e.l * 0.1} />)}
            {layers.map((nodes, l) => nodes.map((p, i) => {
                const on = hot[l] === i;
                return (
                    <Motion.circle key={`${l}-${i}`} cx={p.x} cy={p.y} r={9} variants={pop} custom={dotDelay(l * 4 + i, 0.05)}
                        fill={on ? ACCENT_SOFT : CARD} stroke={on ? ACCENT : INK2} strokeWidth={1.5} />
                );
            }))}
            {layers.map((nodes, l) => (
                <Label key={l} x={nodes[0].x} y={LABEL_Y} anchor="middle" delay={0.4}>{names[l]}</Label>
            ))}
            <Axes x0={inset.lx0} x1={inset.lx1} y0={inset.ly0} y1={inset.ly1} />
            <Stroke d={loss} color={INK2} width={1.5} delay={0.45} />
            <Label x={inset.lx0} y={inset.ly0 - 10} delay={0.5}>loss</Label>
            <Label x={(inset.lx0 + inset.lx1) / 2} y={LABEL_Y} anchor="middle" delay={0.5}>training</Label>
        </>
    );
}

/* ---- 5. Language & bias: attention from one word ---- */
const TOKENS = ["the", "cat", "sat", "on", "the", "mat"];
const WEIGHTS = [0.08, 0.46, 0.08, 0.12, 0.06, 0.2]; // attention from "sat", sums to 1
const Q = 2;

function Attention() {
    const step = (X1 - X0) / TOKENS.length;
    const cx = (i) => f1(X0 + step * (i + 0.5));
    const base = 132;
    const top = Math.max(...WEIGHTS.filter((_, i) => i !== Q));
    const arcs = TOKENS.map((_, i) => i)
        .filter((i) => i !== Q)
        .sort((a, b) => Math.abs(a - Q) - Math.abs(b - Q));
    return (
        <>
            {arcs.map((i, n) => {
                const dist = Math.abs(cx(i) - cx(Q));
                const h = 28 + dist * 1.0;
                const sx = f1(cx(Q) + Math.sign(cx(i) - cx(Q)) * 5); // fan the arcs out of "sat"
                const mid = f1((cx(i) + sx) / 2);
                const key = WEIGHTS[i] === top;
                return (
                    <Stroke key={i} d={`M${sx},${base} Q${mid},${f1(base - h)} ${cx(i)},${base}`}
                        color={key ? ACCENT : INK3} width={f1(1 + WEIGHTS[i] * 7)} delay={0.2 + n * 0.08}
                        strokeOpacity={key ? 1 : 0.55} />
                );
            })}
            {TOKENS.map((_, i) => i !== Q && (
                <Label key={`w${i}`} x={cx(i)} y={base + 52} anchor="middle" color={WEIGHTS[i] === top ? ACCENT : INK3}
                    weight={WEIGHTS[i] === top ? 500 : 400} delay={0.6 + i * 0.04}>
                    {Math.round(WEIGHTS[i] * 100)}%
                </Label>
            ))}
            {TOKENS.map((t, i) => (
                <Motion.g key={i} variants={pop} custom={dotDelay(i, 0.05)}>
                    {i === Q && <rect x={cx(i) - 24} y={base + 6} width={48} height={28} rx={14} fill={ACCENT_SOFT} />}
                    <text x={cx(i)} y={base + 25} textAnchor="middle" fontSize={15}
                        fill={i === Q ? ACCENT : INK} fontWeight={i === Q ? 500 : 400}>{t}</text>
                </Motion.g>
            ))}
            <Stroke d={`M${X0},${base} H${X1}`} color={HAIR} delay={0} />
        </>
    );
}

/* ---- 6. Capstone: twelve weeks, the last two are theirs ---- */
function Weeks() {
    const step = (X1 - X0) / 12;
    const bw = 18;
    return (
        <>
            {Array.from({ length: 12 }, (_, i) => {
                const unit = Math.floor(i / 2) + 1;
                const h = 20 + unit * 21;
                const x = f1(X0 + step * (i + 0.5) - bw / 2);
                const cap = unit === 6;
                return (
                    <g key={i}>
                        <Motion.rect x={x} y={Y1 - h} width={bw} height={h} rx={3}
                            fill={cap ? ACCENT : LINE} variants={grow} custom={0.08 + i * 0.045}
                            style={{ originY: 1 }} />
                        <Label x={x + bw / 2} y={Y1 + 18} anchor="middle" size={12} delay={0.3 + i * 0.02}>{i + 1}</Label>
                    </g>
                );
            })}
            <Stroke d={`M${X0},${Y1 + 0.5} H${X1}`} color={INK3} delay={0} />
            <Label x={f1(X0 + step * 11)} y={Y1 - (20 + 6 * 21) - 12} anchor="middle" color={ACCENT} weight={500} delay={0.75}>capstone</Label>
            <Label x={X0 - 6} y={Y1 + 18} anchor="end" size={11} delay={0.5}>week</Label>
        </>
    );
}

const CHARTS = {
    data: { C: Knn, label: "Scatter plot of two groups. A new point is labeled by its three nearest neighbors." },
    classify: { C: Boundary, label: "Two groups of points split by a curved decision boundary." },
    fit: { C: Fit, label: `Points with a fitted line and the error for each point. R squared is ${FIT.r2}.` },
    net: { C: Net, label: "A small neural network with one highlighted path, and a loss curve that falls during training." },
    tokens: { C: Attention, label: "Attention from the word sat in the sentence the cat sat on the mat. Most of it goes to cat." },
    ship: { C: Weeks, label: "Twelve weeks as bars. The last two weeks are the capstone." },
};

export default function UnitViz({ k, play = true }) {
    const reduce = useReducedMotion();
    const chart = CHARTS[k];
    if (!chart) return null;
    const { C, label } = chart;
    return (
        <Motion.svg
            viewBox={`0 0 ${W} ${H}`}
            className="block h-auto w-full overflow-visible"
            role="img"
            aria-label={label}
            initial={reduce ? false : "hidden"}
            animate={play || reduce ? "show" : "hidden"}
        >
            <C />
        </Motion.svg>
    );
}
