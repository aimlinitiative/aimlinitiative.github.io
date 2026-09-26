import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import Summit from "../components/Summit";

export default function SummitSection() {
    return (
        <>
            {/* ===================== SUMMIT ===================== */}
            <section id="summit" className="border-y border-line bg-surface">
                <div className="container-page py-24 sm:py-32">
                    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                        <Reveal>
                            <SectionLabel n="04">The summit</SectionLabel>
                            <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem] sm:leading-[1.08]">
                                LA Student AI Summit and Hackathon
                            </h2>
                        </Reveal>
                        <Reveal>
                            <p className="text-lg leading-relaxed text-muted">
                                Most students use AI outside school every day, but few are taught how it works or where it
                                fails. The summit is one free, supervised day where Los Angeles public school students hear
                                from people who build AI, see how the tools they already use actually work, and build
                                something of their own.
                            </p>
                        </Reveal>
                    </div>
                    <Summit />
                </div>
            </section>
        </>
    );
}
