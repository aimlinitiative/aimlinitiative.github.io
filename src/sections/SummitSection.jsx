import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import Summit from "../components/Summit";

export default function SummitSection() {
    return (
        <>
            {/* ===================== SUMMIT ===================== */}
            {/* Canvas ground (DESIGN.md §5). Summit lays out its own containers: the day
                timeline runs full-bleed (and pins on desktop), so no ancestor here may
                clip overflow. */}
            <section id="summit" className="section-y bg-canvas">
                <div className="container-page">
                    {/* Desktop: the headline takes the full row (the two tones split at the
                        line break), and the lead sits under it in the 7-column track. */}
                    <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-x-16 lg:gap-y-12">
                        <Reveal className="lg:col-span-2">
                            <SectionLabel n="04">The summit</SectionLabel>
                            <h2 className="display mt-6 text-balance text-display-xl text-ink">
                                LA Student AI Summit{" "}
                                <span className="text-faint lg:block">and Hackathon</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={120} className="lg:col-start-2">
                            <p className="max-w-measure text-pretty text-lead text-muted">
                                Most students use AI outside school every day, but few are taught how it works or where it
                                fails. The summit is one free, supervised day where Los Angeles public school students hear
                                from people who build AI, see how the tools they already use actually work, and build
                                something of their own.
                            </p>
                        </Reveal>
                    </div>
                </div>
                <Summit />
            </section>
        </>
    );
}
