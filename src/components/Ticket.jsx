import { useState } from "react";
import Note from "./Note";

// The summit as an admission ticket, after YC Startup School's: one card,
// hairline rules, a perforated stub. Pick a row to read it; pick Student or
// Teacher; click the stub to tear it off.
const DAY = [
    ["Morning", "Keynotes", "Google DeepMind · Microsoft · Google · Snap", "The people building AI at four of the biggest labs, on one stage, talking to high schoolers and their teachers."],
    ["Midday", "Lunch with partners", "Free for everyone", "Lunch for every student and teacher, with partner tables to walk up to and ask anything."],
    ["Afternoon", "Hackathon", "Mentors + teachers at every table", "Teams of three or four build something for their own school or neighborhood."],
    ["Evening", "Pitches & prizes", "Jane Street · MongoDB · Discovery", "Three minutes a team, then judging and prizes for the top teams."],
];

const WHO = {
    Student: ["500+", "LA public middle and high school students"],
    Teacher: ["+ yours", "Teachers come with their students and build alongside them"],
};

function Barcode() {
    let x = 0, seed = 2027;
    const bars = [];
    while (x < 300) {
        seed = (seed * 9301 + 49297) % 233280;
        const w = 1 + (seed % 4);
        if (seed % 3) bars.push(<rect key={x} x={x} y="0" width={w} height="44" />);
        x += w + 1 + (seed % 2);
    }
    return <svg viewBox="0 0 300 44" preserveAspectRatio="none" className="block h-11 w-full" aria-hidden="true"><g fill="#101418">{bars}</g></svg>;
}

const notch = (side) => ({
    WebkitMask: `radial-gradient(circle at ${side} 0, transparent 13px, #000 13.5px) top/100% 51% no-repeat, radial-gradient(circle at ${side} 100%, transparent 13px, #000 13.5px) bottom/100% 51% no-repeat`,
    mask: `radial-gradient(circle at ${side} 0, transparent 13px, #000 13.5px) top/100% 51% no-repeat, radial-gradient(circle at ${side} 100%, transparent 13px, #000 13.5px) bottom/100% 51% no-repeat`,
});

const Label = ({ children }) => <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-dim">{children}</p>;

export default function Ticket() {
    const [row, setRow] = useState(0);
    const [who, setWho] = useState("Student");
    const [torn, setTorn] = useState(false);
    const [n, l] = WHO[who];

    return (
        <div className="relative mx-auto max-w-[60rem]">
            <div className="flex flex-col drop-shadow-[0_28px_40px_rgba(16,20,24,0.2)] md:flex-row">
                <div className="flex-1 rounded-[20px] bg-white p-6 sm:p-8 md:rounded-r-none" style={notch("100%")}>
                    <div className="flex items-center justify-between">
                        <span className="text-small font-semibold">AIML-LI presents</span>
                        <span className="text-small tabular-nums text-dim">No. 0001</span>
                    </div>
                    <h3 className="mt-4 font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.25rem)] font-bold leading-[0.95] tracking-[-0.045em]">
                        LA Student AI Summit<br /><span className="text-dim">&amp; Hackathon</span>
                    </h3>
                    <dl className="mt-6 grid grid-cols-2 gap-5 border-y border-line py-4 sm:flex sm:flex-wrap sm:gap-x-10">
                        {[["Date", "Sat, Feb 6, 2027"], ["Venue", "LACES, LA"], ["For", "Students + teachers"], ["Price", "Free"]].map(([k, v]) => (
                            <div key={k}><dt><Label>{k}</Label></dt><dd className="mt-1 whitespace-nowrap font-semibold">{v}</dd></div>
                        ))}
                    </dl>

                    <ul className="mt-2" role="tablist" aria-label="The day">
                        {DAY.map(([when, t, w], k) => (
                            <li key={t}>
                                <button type="button" role="tab" aria-selected={k === row} onMouseEnter={() => setRow(k)} onFocus={() => setRow(k)} onClick={() => setRow(k)}
                                    className={`grid w-full grid-cols-[5.5rem_1fr] items-baseline gap-3 border-b border-line py-3 text-left transition-colors sm:grid-cols-[5.5rem_1fr_auto] ${k === row ? "text-ink" : "text-ink/55 hover:text-ink"}`}>
                                    <span className="text-small text-dim">{when}</span>
                                    <span className={`font-display text-[1.125rem] font-semibold tracking-[-0.01em] ${k === row ? "text-blue" : ""}`}>{t}</span>
                                    <span className="hidden text-small text-dim sm:block">{w}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p key={row} className="sched-in mt-4 min-h-[3rem] max-w-[34rem] text-pretty text-body text-dim" role="tabpanel">{DAY[row][3]}</p>
                </div>

                <button type="button" onClick={() => setTorn((v) => !v)} aria-pressed={torn} aria-label={torn ? "Put the stub back" : "Tear off the stub"}
                    className="relative flex flex-col rounded-[20px] border-dashed border-[#CDD2DA] bg-white p-6 text-left transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] max-md:mt-px max-md:border-t-[1.5px] md:w-[15rem] md:rounded-l-none md:border-l-[1.5px]"
                    style={{ ...notch("0"), transform: torn ? "translate(18px, 26px) rotate(7deg)" : "none" }}>
                    <Label>Admit one</Label>
                    <span className="mt-3 inline-flex self-start rounded-full bg-elev p-[3px]" onClick={(e) => e.stopPropagation()}>
                        {Object.keys(WHO).map((k) => (
                            <span key={k} role="button" tabIndex={0} onClick={() => setWho(k)} onKeyDown={(e) => e.key === "Enter" && setWho(k)}
                                className={`cursor-pointer rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold ${who === k ? "bg-white text-ink shadow-sm" : "text-dim"}`}>{k}</span>
                        ))}
                    </span>
                    <span key={who} className="sched-in mt-auto block pt-10 font-display text-[3.25rem] font-bold leading-[0.9] tracking-[-0.05em] text-blue">{n}</span>
                    <span className="mt-2 block text-small text-dim">{l}</span>
                    <span className="mt-5 block"><Barcode /></span>
                </button>
            </div>

            <Note dir="up" className="absolute -bottom-11 right-[4%] hidden md:flex" tone="text-blue">{torn ? "see you Feb 6" : "click to tear it off"}</Note>
            <Note dir="left" flip className="absolute -left-48 top-[56%] hidden w-44 justify-end xl:flex">hover the day</Note>
            <Note dir="down" className="absolute -top-10 right-[3%] hidden md:flex">teachers come too</Note>
        </div>
    );
}
