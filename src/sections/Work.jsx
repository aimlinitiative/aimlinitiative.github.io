import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

const WORK_TINT = ["#22508F", "#2C63B0", "#4C82D2"];

const WORK = [
    { n: "01", t: "We build the curriculum", d: "A 12-week course for high-schoolers with no background. Plain-language lessons, real notebooks, aligned to state standards." },
    { n: "02", t: "We run it in classrooms", d: "We work with public-school teachers to teach it for real, then fix whatever doesn't land. Our first pilot is with LAUSD." },
    { n: "03", t: "We keep it free", d: "Every lesson is open-source. No school pays, and cost never decides who gets to learn this." },
];

export default function Work() {
    return (
        <>
            {/* ===================== WHAT WE DO ===================== */}
            <section id="work" className="border-y border-line bg-surface">
                <div className="container-page py-24 sm:py-32">
                    <Reveal className="max-w-2xl">
                        <SectionLabel n="02">What we do</SectionLabel>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                            How it works.
                        </h2>
                    </Reveal>
                    <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
                        {WORK.map((w, i) => (
                            <Reveal key={w.n} delay={i * 80} className="relative">
                                {i < WORK.length - 1 && (
                                    <div className="absolute left-10 top-5 hidden h-px bg-line md:block" style={{ width: "calc(100% - 0.5rem)" }} />
                                )}
                                {i < WORK.length - 1 && (
                                    <div className="absolute left-5 w-px bg-line md:hidden" style={{ top: "3rem", bottom: "-2.5rem" }} />
                                )}
                                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg font-mono text-sm font-bold shadow-soft" style={{ color: WORK_TINT[i] }}>
                                    {w.n}
                                </div>
                                <h3 className="display mt-6 text-xl font-semibold text-ink">{w.t}</h3>
                                <p className="mt-3 max-w-sm leading-relaxed text-muted">{w.d}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
