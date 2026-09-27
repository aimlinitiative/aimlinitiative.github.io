import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import Curriculum from "../components/Curriculum";
import ScrubText from "../components/viz/ScrubText";

export default function CurriculumSection() {
    return (
        <>
            {/* ===================== CURRICULUM ===================== */}
            <section id="curriculum" data-nav-theme="dark" className="section-y relative isolate overflow-hidden bg-stage text-ondark">
                {/* a quiet, dark gallery room: one soft pool of light where the cards stand */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"
                    style={{ background: "radial-gradient(55% 42% at 50% 66%, rgba(255,255,255,0.045), transparent 72%)" }} />
                <div className="container-page">
                    <div className="mx-auto max-w-4xl text-center">
                        <Reveal>
                            <SectionLabel n="03" tone="dark" className="justify-center">The curriculum</SectionLabel>
                        </Reveal>
                        <ScrubText
                            text="Six units over twelve weeks."
                            className="mt-6 text-balance font-display text-display-xl text-white"
                        />
                        <Reveal delay={120}>
                            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lead text-ondarkmuted">
                                It starts from the basics and ends with a project students ship. Drag to look through it.
                            </p>
                        </Reveal>
                    </div>
                    <Curriculum />
                </div>
            </section>
        </>
    );
}
