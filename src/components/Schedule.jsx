import { useEffect, useRef, useState } from "react";
import deepmind from "../assets/supporters/deepmind.png";
import microsoft from "../assets/supporters/microsoft.png";
import google from "../assets/supporters/google.png";
import snap from "../assets/supporters/snap.png";
import janestreet from "../assets/supporters/janestreet.png";
import mongodb from "../assets/supporters/mongodb.png";
import discovery from "../assets/supporters/discovery.png";

const DATE = new Date("2027-02-06T08:00:00-08:00");

// The day, block by block. It steps through on its own while on screen;
// clicking a block holds it.
const DAY = [
    { when: "Morning", t: "Keynotes", d: "The people building AI at four of the biggest labs, on one stage, talking to high schoolers.", logos: [deepmind, microsoft, google, snap] },
    { when: "Midday", t: "Lunch with partners", d: "Free lunch for every student, and partner tables to walk up to and ask anything." },
    { when: "Afternoon", t: "Hackathon", d: "Teams of three or four build something for their own school or neighborhood, with mentors at every table." },
    { when: "Evening", t: "Pitches and prizes", d: "Three minutes per team, judges from industry, and prizes for the top teams.", logos: [janestreet, mongodb, discovery] },
];

function useCountdown() {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);
    const s = Math.max(0, Math.floor((DATE - now) / 1000));
    return [["days", Math.floor(s / 86400)], ["hrs", Math.floor(s / 3600) % 24], ["min", Math.floor(s / 60) % 60], ["sec", s % 60]];
}

export default function Schedule() {
    const [i, setI] = useState(0);
    const [held, setHeld] = useState(false);
    const [seen, setSeen] = useState(false);
    const ref = useRef(null);
    const cd = useCountdown();

    useEffect(() => {
        const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.3 });
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);
    useEffect(() => {
        if (held || !seen || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setTimeout(() => setI((v) => (v + 1) % DAY.length), 4000);
        return () => clearTimeout(id);
    }, [i, held, seen]);

    const b = DAY[i];
    return (
        <div ref={ref} className="relative overflow-hidden rounded-[28px] bg-[#0A1020] text-white">
            <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-blue/40 blur-[120px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 h-[26rem] w-[26rem] rounded-full bg-[#5B8CFF]/20 blur-[120px]" />

            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
                <div className="lg:col-span-5">
                    <p className="text-small font-semibold text-[#8FB2FF]">Saturday · LACES, Los Angeles</p>
                    <p className="mt-2 font-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em]">Feb 6</p><p className="font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] text-white/40">2027</p>
                    <dl className="mt-8 grid max-w-[22rem] grid-cols-4 gap-2" aria-label="Time until the summit">
                        {cd.map(([l, n]) => (
                            <div key={l} className="rounded-2xl bg-white/[0.07] px-2 py-3 text-center ring-1 ring-white/10">
                                <dd className="font-display text-[1.75rem] font-semibold tabular-nums leading-none">{String(n).padStart(2, "0")}</dd>
                                <dt className="mt-1 text-[0.75rem] text-white/55">{l}</dt>
                            </div>
                        ))}
                    </dl>
                    <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-small text-white/70">
                        <span><b className="text-white">500+</b> students</span>
                        <span><b className="text-white">4</b> keynotes</span>
                        <span><b className="text-white">$0</b> to attend</span>
                    </p>
                </div>

                <div className="lg:col-span-7">
                    <ol className="relative grid grid-cols-4 gap-2" role="tablist" aria-label="The day">
                        <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[1.1rem] h-px bg-white/15" />
                        <span aria-hidden="true" className="absolute left-[12.5%] top-[1.1rem] h-px bg-[#8FB2FF] transition-[width] duration-700 ease-out" style={{ width: `${(i / (DAY.length - 1)) * 75}%` }} />
                        {DAY.map((x, k) => (
                            <li key={x.t} className="relative">
                                <button type="button" role="tab" aria-selected={k === i}
                                    onClick={() => { setI(k); setHeld(true); }}
                                    className="group flex w-full flex-col items-center gap-3 rounded-xl py-1 text-center">
                                    <span className={`relative grid h-9 w-9 place-items-center rounded-full text-[0.8125rem] font-bold transition-all duration-300 ${k <= i ? "bg-[#8FB2FF] text-[#0A1020]" : "bg-[#141C33] text-white/60 ring-1 ring-white/15 group-hover:text-white"}`}>
                                        {k === i && <span className="absolute inset-0 animate-ping rounded-full bg-[#8FB2FF]/40" />}
                                        {k + 1}
                                    </span>
                                    <span className={`text-[0.8125rem] font-semibold transition-colors ${k === i ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>{x.when}</span>
                                </button>
                            </li>
                        ))}
                    </ol>

                    <div key={i} className="sched-in mt-8 rounded-[20px] bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8" role="tabpanel">
                        <h3 className="font-display text-[clamp(2rem,1.4rem+2vw,3rem)] font-bold leading-none tracking-[-0.04em]">{b.t}</h3>
                        <p className="mt-4 max-w-[34rem] text-pretty text-lead text-white/75">{b.d}</p>
                        {b.logos && (
                            <ul className="mt-7 flex flex-wrap items-center gap-3">
                                {b.logos.map((src) => (
                                    <li key={src} className="flex h-12 items-center rounded-xl bg-white px-4">
                                        <img src={src} alt="" className="h-6 w-auto" />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
