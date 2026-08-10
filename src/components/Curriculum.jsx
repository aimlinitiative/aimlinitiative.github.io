import { useState, useRef } from "react";

/* Horizontal curved-arc coverflow: the active card faces you flat and front;
 * neighbors rotate on the Y-axis, recede in Z, and dip along an arc as they fan
 * out to the sides. Each unit carries its own animated concept-visual.
 * Drag left/right, click the left/right side to step, arrows/dots, or click a card. */

const UNITS = [
    { r: "1-2",   t: "Foundations",       s: "How machines learn from data.",            k: "data" },
    { r: "3-4",   t: "Building models",    s: "Train, classify, ship.",                   k: "classify" },
    { r: "5-6",   t: "Prediction & error", s: "Predict without overfitting.",             k: "fit" },
    { r: "7-8",   t: "Neural networks",    s: "Deep learning, from scratch.",             k: "net" },
    { r: "9-10",  t: "Language & bias",    s: "Where models work, and where they break.", k: "tokens" },
    { r: "11-12", t: "Capstone",           s: "Design, build, present.",                  k: "ship" },
];

const STEPX = 208;  // px between cards
const ANGLE = 42;   // deg of Y-rotation per step
const DEPTH = 150;  // px pushed back per step
const ARCY = 26;    // px arc dip per step

function Visual({ k, accent }) {
    if (k === "data") {
        const dots = [[34, 30], [58, 60], [46, 72], [88, 42], [118, 66]];
        const hot = [[120, 26], [150, 34], [178, 54], [192, 30]];
        return (
            <svg viewBox="0 0 220 92" className="h-full w-full">
                {dots.map((d, i) => <circle key={i} className="viz-twinkle" style={{ animationDelay: `${i * 0.3}s` }} cx={d[0]} cy={d[1]} r="4" fill="currentColor" />)}
                {hot.map((d, i) => <circle key={i} className="viz-twinkle" style={{ animationDelay: `${0.6 + i * 0.3}s` }} cx={d[0]} cy={d[1]} r="4" fill={accent} />)}
            </svg>
        );
    }
    if (k === "classify") {
        return (
            <svg viewBox="0 0 220 92" className="h-full w-full">
                <line className="viz-march" x1="26" y1="84" x2="196" y2="14" stroke={accent} strokeWidth="2" />
                <g fill="currentColor" opacity="0.5"><circle cx="44" cy="70" r="4" /><circle cx="66" cy="76" r="4" /><circle cx="40" cy="54" r="4" /><circle cx="82" cy="66" r="4" /></g>
                <g fill={accent}><circle cx="150" cy="30" r="4" /><circle cx="172" cy="22" r="4" /><circle cx="182" cy="42" r="4" /><circle cx="150" cy="50" r="4" /></g>
            </svg>
        );
    }
    if (k === "fit") {
        return (
            <svg viewBox="0 0 220 92" className="h-full w-full">
                <path className="viz-draw" d="M18,74 C56,70 74,38 116,34 C158,30 182,24 204,20" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
                <g fill="currentColor" opacity="0.55"><circle cx="40" cy="66" r="3.5" /><circle cx="78" cy="52" r="3.5" /><circle cx="116" cy="42" r="3.5" /><circle cx="150" cy="32" r="3.5" /><circle cx="186" cy="26" r="3.5" /></g>
            </svg>
        );
    }
    if (k === "net") {
        const c1 = [26, 46, 66], c2 = [18, 40, 62, 84], c3 = [38, 60];
        const lines = [];
        c1.forEach((y1) => c2.forEach((y2) => lines.push([34, y1, 110, y2])));
        c2.forEach((y1) => c3.forEach((y2) => lines.push([110, y1, 186, y2])));
        return (
            <svg viewBox="0 0 220 92" className="h-full w-full">
                <g stroke="currentColor" strokeWidth="1">
                    {lines.map((l, i) => <line key={i} className="viz-pulse" style={{ animationDelay: `${(i % 6) * 0.22}s` }} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} opacity="0.22" />)}
                </g>
                {c1.map((y, i) => <circle key={`a${i}`} cx="34" cy={y} r="5" fill="currentColor" />)}
                {c2.map((y, i) => <circle key={`b${i}`} cx="110" cy={y} r="5" fill="currentColor" opacity="0.75" />)}
                {c3.map((y, i) => <circle key={`c${i}`} className="viz-pulse" style={{ animationDelay: `${i * 0.4}s` }} cx="186" cy={y} r="5.5" fill={accent} />)}
            </svg>
        );
    }
    if (k === "tokens") {
        const bars = [{ x: 26, h: 26 }, { x: 52, h: 42 }, { x: 78, h: 18 }, { x: 104, h: 58, hot: true }, { x: 130, h: 34 }, { x: 156, h: 22 }, { x: 182, h: 30 }];
        return (
            <svg viewBox="0 0 220 92" className="h-full w-full">
                {bars.map((b, i) => (
                    <rect key={i} className="viz-bar" style={{ animationDelay: `${i * 0.15}s` }} x={b.x} y={82 - b.h} width="14" height={b.h} rx="2.5"
                        fill={b.hot ? accent : "currentColor"} opacity={b.hot ? 1 : 0.38} />
                ))}
            </svg>
        );
    }
    // ship
    const bars = [{ x: 30, h: 24, o: 0.35 }, { x: 74, h: 40, o: 0.5 }, { x: 118, h: 56, o: 0.72 }];
    return (
        <svg viewBox="0 0 220 92" className="h-full w-full">
            {bars.map((b, i) => <rect key={i} x={b.x} y={82 - b.h} width="26" height={b.h} rx="3" fill="currentColor" opacity={b.o} />)}
            <g className="viz-bob">
                <rect x="162" y="8" width="26" height="74" rx="3" fill={accent} />
                <path d="M175,0 l10 11 h-20 z" fill={accent} />
            </g>
        </svg>
    );
}

export default function Curriculum() {
    const [active, setActive] = useState(0);
    const [drag, setDrag] = useState(0); // live drag offset in px
    const dragging = useRef(false);
    const startX = useRef(0);
    const moved = useRef(false);
    const stageRef = useRef(null);

    const n = UNITS.length;
    const clamp = (v) => Math.max(0, Math.min(n - 1, v));
    const go = (dir) => setActive((a) => clamp(a + dir));

    const onDown = (e) => {
        dragging.current = true;
        startX.current = e.clientX;
        moved.current = false;
        e.currentTarget.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e) => {
        if (!dragging.current) return;
        const d = e.clientX - startX.current;
        if (Math.abs(d) > 4) moved.current = true;
        setDrag(d);
    };
    const onUp = (e) => {
        if (!dragging.current) return;
        dragging.current = false;
        if (moved.current) {
            setActive((a) => clamp(a - Math.round(drag / STEPX)));
        } else if (stageRef.current) {
            // light click: left half steps back, right half steps forward
            const rect = stageRef.current.getBoundingClientRect();
            const dir = e.clientX < rect.left + rect.width / 2 ? -1 : 1;
            setActive((a) => clamp(a + dir));
        }
        setDrag(0);
    };
    const onLeave = () => {
        if (!dragging.current) return;
        dragging.current = false;
        setActive((a) => clamp(a - Math.round(drag / STEPX)));
        setDrag(0);
    };
    const onKey = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(1); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(-1); }
    };

    return (
        <div className="mt-12 flex flex-col items-center">
            <div
                ref={stageRef}
                className="relative w-full cursor-pointer select-none overflow-hidden"
                style={{ height: 360, perspective: "1500px", touchAction: "pan-y", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent)" }}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerLeave={onLeave}
                onKeyDown={onKey}
                tabIndex={0}
                role="listbox"
                aria-label="Curriculum units"
            >
                <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                    {UNITS.map((u, i) => {
                        const o = i - active + drag / STEPX;
                        const ao = Math.abs(o);
                        const hidden = ao > 2.7;
                        const isActive = i === active;
                        const accent = isActive ? "#8FB2E6" : "#3D77C9";
                        const style = {
                            transform: `translate(-50%, -50%) translateX(${o * STEPX}px) translateY(${ao * ARCY}px) translateZ(${-ao * DEPTH}px) rotateY(${-o * ANGLE}deg) scale(${Math.max(0.8, 1 - ao * 0.06)})`,
                            opacity: hidden ? 0 : Math.max(0, 1 - ao * 0.3),
                            zIndex: 100 - Math.round(ao * 10),
                            transition: dragging.current ? "none" : "transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.55s ease",
                            pointerEvents: "none",
                        };
                        return (
                            <div key={i} className="absolute left-1/2 top-1/2 w-[min(80vw,19rem)]" style={style} role="option" aria-selected={isActive}>
                                <div className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${isActive ? "border-transparent bg-ink text-white shadow-lift" : "border-line bg-white text-ink shadow-soft"}`}>
                                    <div className={`viz-grid flex h-28 items-center justify-center overflow-hidden border-b ${isActive ? "border-white/10 bg-white/[0.05]" : "border-line bg-surface"}`}>
                                        <div className="relative h-14 w-[66%]"><Visual k={u.k} accent={accent} /></div>
                                    </div>
                                    <div className="px-6 py-5">
                                        <div className="flex items-center justify-between">
                                            <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${isActive ? "text-white/45" : "text-faint"}`}>Weeks {u.r}</span>
                                            <span className={`font-mono text-[11px] ${isActive ? "text-white/40" : "text-faint"}`}>{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
                                        </div>
                                        <h3 className="display mt-3 text-xl font-bold tracking-tight">{u.t}</h3>
                                        <p className={`mt-1.5 text-[15px] ${isActive ? "text-white/70" : "text-muted"}`}>{u.s}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center gap-5">
                <button onClick={() => go(-1)} disabled={active === 0} aria-label="Previous unit"
                    className="focusable flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/30 disabled:pointer-events-none disabled:opacity-25">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <div className="flex items-center gap-1.5">
                    {UNITS.map((u, i) => (
                        <button key={i} onClick={() => setActive(i)} aria-label={`Unit ${i + 1}`}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{ width: i === active ? 24 : 6, backgroundColor: i === active ? "#2C63B0" : "rgba(21,21,26,0.16)" }} />
                    ))}
                </div>
                <button onClick={() => go(1)} disabled={active === n - 1} aria-label="Next unit"
                    className="focusable flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/30 disabled:pointer-events-none disabled:opacity-25">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
            </div>
        </div>
    );
}
