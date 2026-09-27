import { useEffect, useId, useRef, useState } from "react";
import { animate, motion as Motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { EASE } from "../../lib/motion";
import { GLOW } from "./palette";

/* Six mini-charts, one per curriculum unit, styled like a live analytics panel
 * on the dark stage: hairline axes, gridlines that fade in, mono tick labels
 * whose numbers tick up, and luminous blue -> violet -> cyan marks with glow.
 * `play` = this card is active and on screen (and motion is allowed). When it
 * flips on, the chart remounts and draws itself in, then settles into a quiet
 * live loop. When off, every chart renders its complete, static final state. */

// Plot box inside the 264 x 96 viewBox.
const W = 264, H = 96;
const X0 = 26, X1 = 254, Y0 = 8, Y1 = 78;
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const DIM = "rgba(255,255,255,0.34)";
const CARD = "#0D0F17";

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
const sid = (s) => s.replace(/[^a-zA-Z0-9_-]/g, "");

// Smooth path through points (Catmull-Rom -> cubic Bezier).
function smooth(pts) {
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
}

const label = (extra = {}) => ({ fontFamily: MONO, fontSize: 7, fill: "#fff", fillOpacity: 0.42, letterSpacing: "0.04em", ...extra });
const fadeIn = (play, delay = 0, duration = 0.6) => (play ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration, ease: EASE.out, delay } } : {});
const pop = (play, delay = 0) => (play ? { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, ease: EASE.out, delay } } : {});
const draw = (play, delay = 0, duration = 1.4, ease = EASE.inOut) => (play ? { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration, ease, delay, opacity: { duration: 0.15, delay } } } : {});

/* Numeric text that ticks from `from` to `to` when playing. */
function Count({ play, from = 0, to, fmt, delay = 0.4, duration = 1.4, ...rest }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!play) return;
        const c = animate(from, to, { duration, delay, ease: EASE.out, onUpdate: (v) => { if (ref.current) ref.current.textContent = fmt(v); } });
        return () => c.stop();
    }, [play, from, to, fmt, delay, duration]);
    return <text ref={ref} {...rest}>{fmt(play ? from : to)}</text>;
}

/* Shared chart frame: gridlines fading in one by one, axes that draw, ticks. */
function Frame({ play, xl = [], yl = [], grid = [Y0 + 4, (Y0 + Y1) / 2] }) {
    return (
        <g>
            {grid.map((y, i) => (
                <Motion.line key={y} x1={X0} x2={X1} y1={y} y2={y} stroke="#fff" strokeOpacity="0.1" strokeWidth="0.6" strokeDasharray="1.5 3"
                    {...draw(play, 0.15 + i * 0.12, 0.9, EASE.out)} />
            ))}
            <Motion.path d={`M${X0},${Y0} V${Y1} H${X1}`} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="0.8" {...draw(play, 0, 0.8, EASE.out)} />
            <Motion.g {...fadeIn(play, 0.3)}>
                {xl.map(([x, s]) => (
                    <g key={x}>
                        <line x1={x} x2={x} y1={Y1} y2={Y1 + 2.5} stroke="#fff" strokeOpacity="0.28" strokeWidth="0.8" />
                        <text x={x} y={H - 5} textAnchor="middle" style={label()}>{s}</text>
                    </g>
                ))}
                {yl.map(([y, s, num]) => (
                    <g key={y}>
                        <line x1={X0 - 2.5} x2={X0} y1={y} y2={y} stroke="#fff" strokeOpacity="0.28" strokeWidth="0.8" />
                        {num !== undefined
                            ? <Count play={play} to={num} fmt={s} x={X0 - 5} y={y + 2.4} textAnchor="end" style={label()} />
                            : <text x={X0 - 5} y={y + 2.4} textAnchor="end" style={label()}>{s}</text>}
                    </g>
                ))}
            </Motion.g>
        </g>
    );
}

function Readout({ play, children, x = X0 + 6, anchor = "start" }) {
    return (
        <Motion.g {...fadeIn(play, 0.5)}>
            <text x={x} y={Y0 + 7} textAnchor={anchor} style={label({ fillOpacity: 0.75 })}>{children}</text>
        </Motion.g>
    );
}

/* ---------- 01 data: points arrive scattered, then settle into clusters ---------- */
const CLU = [GLOW.blue, GLOW.violet, GLOW.cyan];
const DATA = (() => {
    const r = rng(7);
    const centers = [[78, 54], [150, 30], [214, 58]];
    const pts = [];
    centers.forEach((c, k) => {
        for (let i = 0; i < 7; i++) {
            pts.push({
                k,
                x: c[0] + gauss(r) * 13, y: c[1] + gauss(r) * 9,
                sx: X0 + 10 + r() * (X1 - X0 - 20), sy: Y0 + 8 + r() * (Y1 - Y0 - 16),
            });
        }
    });
    return { centers, pts };
})();

function DataViz({ play, ids }) {
    const cyc = { duration: 7, times: [0, 0.3, 0.8, 1], ease: "easeInOut", repeat: Infinity, delay: 0.9 };
    return (
        <>
            <Frame play={play} xl={[[X1 - 6, "x₁"]]} yl={[[Y0 + 4, "x₂"]]} />
            <Readout play={play}>k = 3</Readout>
            <Motion.g {...fadeIn(play, 0.5)}>
                <Count play={play} to={21} fmt={(v) => `n = ${Math.round(v)}`} x={X1 - 2} y={Y0 + 7} textAnchor="end" style={label({ fillOpacity: 0.55 })} />
            </Motion.g>
            {DATA.centers.map((c, k) => (
                <Motion.g key={k}
                    initial={play ? { opacity: 0 } : false}
                    animate={play ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }}
                    transition={play ? { ...cyc, times: [0, 0.24, 0.34, 0.76, 0.84] } : undefined}
                >
                    <circle cx={c[0]} cy={c[1]} r="17" fill={CLU[k]} fillOpacity="0.08" stroke={CLU[k]} strokeOpacity="0.6" strokeWidth="0.7" strokeDasharray="2 2.5" />
                    <path d={`M${c[0] - 3},${c[1]} h6 M${c[0]},${c[1] - 3} v6`} stroke={CLU[k]} strokeWidth="1" />
                </Motion.g>
            ))}
            <g filter={ids.glow}>
                {DATA.pts.map((p, i) => (
                    <Motion.circle key={i} cx={p.x} cy={p.y} r="2.4"
                        initial={play ? { opacity: 0, x: p.sx - p.x, y: p.sy - p.y, fill: DIM } : false}
                        animate={play
                            ? { opacity: 1, x: [p.sx - p.x, 0, 0, p.sx - p.x], y: [p.sy - p.y, 0, 0, p.sy - p.y], fill: [DIM, CLU[p.k], CLU[p.k], DIM] }
                            : { opacity: 1, x: 0, y: 0, fill: CLU[p.k] }}
                        transition={play ? { ...cyc, opacity: { duration: 0.5, delay: 0.15 + i * 0.025 } } : undefined}
                    />
                ))}
            </g>
        </>
    );
}

/* ---------- 02 classify: a decision boundary sweeps into place ---------- */
const PIV = [142, 44];
const FINAL = 30;
const side = (p, deg) => {
    const a = (deg * Math.PI) / 180;
    return (p.x - PIV[0]) * -Math.sin(a) + (p.y - PIV[1]) * Math.cos(a) > 0; // true = lower-left class
};
const CLS = (() => {
    const r = rng(21);
    const pts = [];
    for (let i = 0; i < 11; i++) pts.push({ x: 72 + gauss(r) * 34, y: 58 + gauss(r) * 14 });
    for (let i = 0; i < 11; i++) pts.push({ x: 196 + gauss(r) * 36, y: 30 + gauss(r) * 14 });
    pts.forEach((p) => { p.x = Math.min(X1 - 6, Math.max(X0 + 6, p.x)); p.y = Math.min(Y1 - 6, Math.max(Y0 + 10, p.y)); p.a = side(p, FINAL); });
    pts[3].a = !pts[3].a; // one honest mistake
    return pts;
})();
const acc = (deg) => CLS.filter((p) => side(p, deg) === p.a).length / CLS.length;
const START = -26;

function ClassPoint({ p, angle, i, play }) {
    const fill = useTransform(angle, (a) => (side(p, a) ? GLOW.violet : GLOW.cyan));
    const enter = pop(play, 0.1 + i * 0.02);
    return p.a
        ? <Motion.circle cx={p.x} cy={p.y} r="2.4" style={{ fill }} {...enter} />
        : <Motion.rect x={p.x - 2.2} y={p.y - 2.2} width="4.4" height="4.4" rx="0.8" style={{ fill }} {...enter} />;
}

function ClassifyViz({ play, ids }) {
    const clip = sid(useId());
    const angle = useMotionValue(play ? START : FINAL);
    const txt = useRef(null);
    useMotionValueEvent(angle, "change", (a) => { if (txt.current) txt.current.textContent = `acc ${acc(a).toFixed(2)}`; });
    useEffect(() => {
        if (!play) return;
        let loop;
        const c = animate(angle, FINAL, { duration: 1.9, ease: EASE.inOut, delay: 0.7 });
        c.then(() => { loop = animate(angle, [FINAL, FINAL + 7, FINAL - 5, FINAL], { duration: 8, ease: "easeInOut", repeat: Infinity }); });
        return () => { c.stop(); loop?.stop(); };
    }, [play, angle]);
    return (
        <>
            <defs><clipPath id={`c${clip}`}><rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} /></clipPath></defs>
            <Frame play={play} xl={[[X1 - 6, "x₁"]]} yl={[[Y0 + 4, "x₂"]]} />
            <g clipPath={`url(#c${clip})`}>
                <g transform={`translate(${PIV[0]} ${PIV[1]})`}>
                    <Motion.g style={{ rotate: angle }} {...fadeIn(play, 0.6, 0.5)}>
                        <rect x="-300" y="-300" width="600" height="600" fill="none" />
                        <rect x="-300" y="-300" width="600" height="300" fill={GLOW.cyan} fillOpacity="0.07" />
                        <rect x="-300" y="0" width="600" height="300" fill={GLOW.violet} fillOpacity="0.06" />
                        <line x1="-300" x2="300" y1="-7" y2="-7" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.6" strokeDasharray="2 2.5" />
                        <line x1="-300" x2="300" y1="7" y2="7" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.6" strokeDasharray="2 2.5" />
                        <line x1="-300" x2="300" y1="0" y2="0" stroke={GLOW.blue} strokeWidth="1.4" filter={ids.glow} />
                    </Motion.g>
                </g>
            </g>
            <g filter={ids.glow}>
                {CLS.map((p, i) => <ClassPoint key={i} p={p} i={i} angle={angle} play={play} />)}
            </g>
            <Readout play={play}><tspan ref={txt}>{`acc ${acc(play ? START : FINAL).toFixed(2)}`}</tspan></Readout>
        </>
    );
}

/* ---------- 03 fit: a curve draws through the data, residuals drop in ---------- */
const f = (x) => Y1 - 8 - 54 / (1 + Math.exp(-(x - 138) / 26));
const FIT = (() => {
    const r = rng(3);
    const pts = [];
    for (let x = 40; x <= 244; x += 25.5) pts.push([x, f(x) + gauss(r) * 9]);
    const curve = [];
    for (let x = X0 + 4; x <= X1 - 2; x += 6) curve.push([x, f(x)]);
    return { pts, d: smooth(curve) };
})();
const fmt2 = (v) => v.toFixed(2);
const fmt1 = (v) => v.toFixed(1);

function FitViz({ play, ids }) {
    const tx = useMotionValue(X0 + 10);
    const ty = useTransform(tx, f);
    useEffect(() => {
        if (!play) return;
        const c = animate(tx, [X0 + 10, X1 - 10], { duration: 5.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 2.8 });
        return () => c.stop();
    }, [play, tx]);
    const CURVE_D = 0.8, CURVE_T = 1.4;
    return (
        <>
            <Frame play={play} xl={[[X0 + 4, "0"], [(X0 + X1) / 2, "x"], [X1 - 4, "1"]]} yl={[[Y0 + 4, fmt1, 1], [(Y0 + Y1) / 2, fmt1, 0.5]]} />
            <Motion.g {...fadeIn(play, 0.5)}>
                <text x={X0 + 6} y={Y0 + 7} style={label({ fillOpacity: 0.75 })}>R²</text>
                <Count play={play} to={0.96} fmt={fmt2} delay={CURVE_D} duration={CURVE_T + 0.4} x={X0 + 18} y={Y0 + 7} style={label({ fillOpacity: 0.75 })} />
            </Motion.g>
            {FIT.pts.map(([x, y], i) => (
                <Motion.line key={`r${i}`} x1={x} x2={x} y1={y} y2={f(x)} stroke="#fff" strokeOpacity="0.45" strokeWidth="0.7"
                    {...(play ? { initial: { opacity: 0, scaleY: 0 }, animate: { opacity: 1, scaleY: 1 }, style: { originY: y < f(x) ? 0 : 1 }, transition: { duration: 0.5, ease: EASE.out, delay: CURVE_D + ((x - X0) / (X1 - X0)) * CURVE_T + 0.1 } } : {})} />
            ))}
            <Motion.path d={FIT.d} fill="none" stroke={ids.grad} strokeWidth="1.8" strokeLinecap="round" filter={ids.glow} {...draw(play, CURVE_D, CURVE_T)} />
            {FIT.pts.map(([x, y], i) => (
                <Motion.circle key={`p${i}`} cx={x} cy={y} r="2.3" fill="#fff" fillOpacity="0.9" {...pop(play, 0.25 + i * 0.05)} />
            ))}
            {play && (
                <Motion.g style={{ x: tx }} {...fadeIn(true, 2.8)}>
                    <line x1="0" x2="0" y1={Y0} y2={Y1} stroke={GLOW.cyan} strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="1.5 2" />
                    <Motion.g style={{ y: ty }}>
                        <circle r="6" fill={GLOW.cyan} fillOpacity="0.18" />
                        <circle r="2.6" fill={GLOW.cyan} stroke={CARD} strokeWidth="1.1" />
                    </Motion.g>
                </Motion.g>
            )}
        </>
    );
}

/* ---------- 04 net: signal pulses travel layer to layer ---------- */
const NX = [40, 104, 168, 232];
const NL = [3, 4, 4, 2].map((n, l) => Array.from({ length: n }, (_, k) => [NX[l], 42 + (k - (n - 1) / 2) * 18]));
const EDGES = [];
for (let l = 0; l < 3; l++) NL[l].forEach((a) => NL[l + 1].forEach((b) => EDGES.push([a, b])));
const ROUTES = [[0, 1, 2, 0], [2, 3, 1, 1], [1, 0, 3, 0], [1, 2, 0, 1]].map((r) => r.map((k, l) => NL[l][k]));
const RC = [GLOW.blue, GLOW.violet, GLOW.cyan, GLOW.blue];
const NET_CYCLE = 3.2;

function NetViz({ play, ids }) {
    const loop = (i, times) => ({ duration: NET_CYCLE, times, ease: "linear", repeat: Infinity, delay: 0.8 + i * (NET_CYCLE / ROUTES.length) });
    return (
        <>
            <Frame play={play} xl={NX.map((x, l) => [x, ["in", "h₁", "h₂", "out"][l]])} grid={[]} />
            <Motion.g {...fadeIn(play, 0.5)}>
                <text x={X1} y={Y0 + 3} textAnchor="end" style={label({ fillOpacity: 0.55 })}>loss</text>
                <Count play={play} from={2.3} to={0.08} fmt={fmt2} delay={0.8} duration={3.2} x={X1} y={Y0 + 12} textAnchor="end" style={label({ fillOpacity: 0.85 })} />
            </Motion.g>
            <Motion.g {...fadeIn(play, 0.2, 0.8)}>
                {EDGES.map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#fff" strokeOpacity="0.1" strokeWidth="0.6" />)}
            </Motion.g>
            <g filter={ids.glow}>
                {ROUTES.map((r, ri) => (
                    <g key={ri}>
                        {[0, 1, 2].map((s) => (
                            <Motion.line key={s} x1={r[s][0]} y1={r[s][1]} x2={r[s + 1][0]} y2={r[s + 1][1]} stroke={RC[ri]} strokeWidth="1.1" strokeLinecap="round"
                                initial={play ? { opacity: 0 } : false}
                                animate={play ? { opacity: [0, 0, 0.95, 0, 0] } : { opacity: ri < 2 ? 0.7 : 0 }}
                                transition={play ? loop(ri, [0, 0.25 * s, 0.25 * s + 0.08, 0.25 * (s + 1) + 0.14, 1]) : undefined} />
                        ))}
                        {play && r.map((n, s) => (
                            <Motion.circle key={`g${s}`} cx={n[0]} cy={n[1]} r="7.5" fill={RC[ri]}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0, 0.4, 0, 0] }}
                                transition={loop(ri, [0, Math.max(0, 0.25 * s - 0.02), 0.25 * s + 0.03, 0.25 * s + 0.2, 1])} />
                        ))}
                        {play && (
                            <Motion.circle cx="0" cy="0" r="2.2" fill="#fff"
                                initial={{ opacity: 0, x: r[0][0], y: r[0][1] }}
                                animate={{ x: [r[0][0], r[1][0], r[2][0], r[3][0], r[3][0]], y: [r[0][1], r[1][1], r[2][1], r[3][1], r[3][1]], opacity: [0, 1, 1, 1, 0, 0] }}
                                transition={{
                                    x: loop(ri, [0, 0.25, 0.5, 0.75, 1]),
                                    y: loop(ri, [0, 0.25, 0.5, 0.75, 1]),
                                    opacity: loop(ri, [0, 0.04, 0.5, 0.74, 0.8, 1]),
                                }} />
                        )}
                    </g>
                ))}
            </g>
            {NL.map((layer, l) => layer.map(([x, y], k) => (
                <Motion.circle key={`${l}-${k}`} cx={x} cy={y} r={l === 3 ? 4.6 : 4}
                    fill={l === 3 ? GLOW.cyan : CARD}
                    stroke={l === 3 ? GLOW.cyan : "#fff"} strokeOpacity={l === 3 ? 1 : 0.5} strokeWidth="1"
                    {...pop(play, 0.1 + l * 0.12 + k * 0.03)} />
            )))}
        </>
    );
}

/* ---------- 05 tokens: a query moves across the row, attention re-weights ---------- */
const TOKENS = ["the", "cat", "sat", "on", "the", "mat"];
const TX = TOKENS.map((_, i) => 52 + i * 38);
const ATTN = [
    [0.46, 0.30, 0.08, 0.04, 0.08, 0.04],
    [0.22, 0.48, 0.16, 0.04, 0.04, 0.06],
    [0.08, 0.52, 0.24, 0.06, 0.04, 0.06],
    [0.04, 0.10, 0.36, 0.30, 0.08, 0.12],
    [0.06, 0.04, 0.06, 0.26, 0.30, 0.28],
    [0.04, 0.12, 0.10, 0.34, 0.12, 0.28],
];
const BASE = 58, BAR_H = 44, WMAX = 0.55;
const hy = (w) => BASE - (w / WMAX) * BAR_H;

function TokensViz({ play, ids }) {
    const [q, setQ] = useState(2);
    useEffect(() => {
        if (!play) return;
        const id = setInterval(() => setQ((v) => (v + 1) % TOKENS.length), 1900);
        return () => clearInterval(id);
    }, [play]);
    const row = ATTN[q];
    const hot = row.indexOf(Math.max(...row));
    return (
        <>
            <Frame play={play} yl={[[hy(0.5), fmt1, 0.5], [BASE, "0"]]} grid={[hy(0.5), hy(0.25)]} />
            <Readout play={play} x={X1} anchor="end">{`attn · ${TOKENS[q]}`}</Readout>
            {TX.map((x, i) => (
                <Motion.rect key={i} x={x - 6} y={BASE - BAR_H} width="12" height={BAR_H} rx="1.5"
                    style={{ originY: 1 }}
                    fill={i === hot ? ids.vgrad : DIM}
                    filter={i === hot ? ids.glow : undefined}
                    initial={play ? { scaleY: 0 } : false}
                    animate={{ scaleY: row[i] / WMAX }}
                    transition={{ type: "spring", stiffness: 170, damping: 22, delay: play && q === 2 ? 0.5 + i * 0.06 : 0 }} />
            ))}
            <line x1={X0} x2={X1} y1={BASE + 0.5} y2={BASE + 0.5} stroke="#fff" strokeOpacity="0.22" strokeWidth="0.6" />
            <Motion.rect y={BASE + 5} width="32" height="13" rx="3.5" fill={GLOW.blue} fillOpacity="0.2" stroke={GLOW.blue} strokeWidth="0.8"
                initial={false} animate={{ x: TX[q] - 16 }} transition={{ type: "spring", stiffness: 200, damping: 26 }} />
            {TOKENS.map((s, i) => (
                <text key={i} x={TX[i]} y={BASE + 14.2} textAnchor="middle" style={label({ fontSize: 7.5, fillOpacity: i === q ? 0.95 : 0.5 })}>{s}</text>
            ))}
        </>
    );
}

/* ---------- 06 ship: a growth line draws in, the rocket lifts off ---------- */
const SHIP = (() => {
    const pts = [];
    for (let i = 0; i < 12; i++) {
        const v = 0.07 + 0.86 * Math.pow(i / 11, 2.1) + (i % 3 === 1 ? 0.025 : 0);
        pts.push([X0 + 10 + (i * (X1 - X0 - 34)) / 11, Y1 - v * (Y1 - Y0 - 6)]);
    }
    const d = smooth(pts);
    const last = pts[pts.length - 1];
    return { pts, d, area: `${d} L${last[0]},${Y1} L${pts[0][0]},${Y1} Z`, last };
})();

function ShipViz({ play, ids }) {
    const gid = sid(useId());
    const LINE_D = 0.5, LINE_T = 1.6;
    const [ex, ey] = SHIP.last;
    return (
        <>
            <defs>
                <linearGradient id={`a${gid}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={GLOW.violet} stopOpacity="0.38" />
                    <stop offset="1" stopColor={GLOW.blue} stopOpacity="0" />
                </linearGradient>
            </defs>
            <Frame play={play} xl={[[SHIP.pts[0][0], "W1"], [SHIP.pts[5][0], "W6"], [SHIP.pts[11][0], "W12"]]} yl={[]} />
            <Motion.g {...fadeIn(play, 0.5)}>
                <Count play={play} to={12} fmt={(v) => `${Math.round(v)} / 12 wk`} delay={LINE_D} duration={LINE_T} x={X0 + 6} y={Y0 + 7} style={label({ fillOpacity: 0.75 })} />
            </Motion.g>
            <Motion.path d={SHIP.area} fill={`url(#a${gid})`} {...fadeIn(play, LINE_D + LINE_T * 0.6, 1)} />
            <Motion.path d={SHIP.d} fill="none" stroke={ids.grad} strokeWidth="1.8" strokeLinecap="round" filter={ids.glow} {...draw(play, LINE_D, LINE_T)} />
            {SHIP.pts.map(([x, y], i) => i % 2 === 1 && i < 11 && (
                <Motion.circle key={i} cx={x} cy={y} r="1.7" fill={CARD} stroke="#fff" strokeOpacity="0.8" strokeWidth="0.9"
                    {...pop(play, LINE_D + (i / 11) * LINE_T)} />
            ))}
            {play && (
                <Motion.circle cx={ex} cy={ey} r="3" fill="none" stroke={GLOW.cyan} strokeWidth="0.8"
                    initial={{ scale: 1, opacity: 0 }} animate={{ scale: [1, 3.2], opacity: [0.8, 0] }}
                    transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, delay: LINE_D + LINE_T }} />
            )}
            <Motion.circle cx={ex} cy={ey} r="3" fill={GLOW.cyan} filter={ids.glow} {...pop(play, LINE_D + LINE_T - 0.1)} />
            {/* launch mark */}
            <Motion.g
                initial={play ? { opacity: 0, x: -10, y: 10 } : false}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, ease: EASE.out, delay: play ? LINE_D + LINE_T : 0 }}
            >
                <g transform={`translate(${ex + 10} ${ey - 8}) rotate(45)`}>
                    <Motion.g animate={play ? { y: [0, -1.6, 0] } : { y: 0 }} transition={play ? { duration: 2, ease: "easeInOut", repeat: Infinity, delay: 3 } : undefined}>
                        <Motion.path d="M-1.3,4.6 L0,9.5 L1.3,4.6 Z" fill={GLOW.cyan} filter={ids.glow} style={{ originY: 0 }}
                            animate={play ? { scaleY: [1, 0.55, 1] } : { scaleY: 1 }}
                            transition={play ? { duration: 0.35, repeat: Infinity, ease: "easeInOut" } : undefined} />
                        <path d="M0,-7.5 C3.2,-4.5 3.3,1 2.5,4.4 L-2.5,4.4 C-3.3,1 -3.2,-4.5 0,-7.5 Z" fill="#fff" />
                        <path d="M-2.5,1.2 L-4.8,5.2 L-2.3,4.4 Z M2.5,1.2 L4.8,5.2 L2.3,4.4 Z" fill={GLOW.violet} />
                        <circle cx="0" cy="-2" r="1.2" fill={GLOW.blue} />
                    </Motion.g>
                </g>
            </Motion.g>
        </>
    );
}

const VIZ = { data: DataViz, classify: ClassifyViz, fit: FitViz, net: NetViz, tokens: TokensViz, ship: ShipViz };

export default function UnitViz({ k, play }) {
    const u = sid(useId());
    const ids = { grad: `url(#g${u})`, vgrad: `url(#v${u})`, glow: `url(#f${u})` };
    const Viz = VIZ[k];
    return (
        <svg aria-hidden="true" focusable="false" viewBox={`0 0 ${W} ${H}`} className="h-full w-full overflow-visible">
            <defs>
                <linearGradient id={`g${u}`} gradientUnits="userSpaceOnUse" x1={X0} x2={X1} y1="0" y2="0">
                    <stop offset="0" stopColor={GLOW.blue} />
                    <stop offset="0.55" stopColor={GLOW.violet} />
                    <stop offset="1" stopColor={GLOW.cyan} />
                </linearGradient>
                <linearGradient id={`v${u}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={GLOW.cyan} />
                    <stop offset="1" stopColor={GLOW.violet} />
                </linearGradient>
                <filter id={`f${u}`} filterUnits="userSpaceOnUse" x="-10" y="-10" width={W + 20} height={H + 20}>
                    <feGaussianBlur stdDeviation="2.2" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            {/* remount on play so the chart re-draws each time its card lands */}
            <g key={play ? "play" : "still"}><Viz play={play} ids={ids} /></g>
        </svg>
    );
}
