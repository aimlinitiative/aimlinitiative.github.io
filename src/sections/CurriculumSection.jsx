import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import Curriculum from "../components/Curriculum";
import ScrubText from "../components/viz/ScrubText";
import { GLOW } from "../components/viz/palette";

export default function CurriculumSection() {
    return (
        <>
            {/* ===================== CURRICULUM ===================== */}
            <section id="curriculum" className="relative isolate overflow-hidden bg-stage text-white">
                {/* stage lighting: soft colored glows + a faint grid that fades out at the edges */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-0" style={{ background: `radial-gradient(60% 45% at 50% 62%, ${GLOW.blue}24, transparent 70%), radial-gradient(40% 35% at 18% 20%, ${GLOW.violet}1f, transparent 70%), radial-gradient(35% 30% at 85% 30%, ${GLOW.cyan}14, transparent 70%)` }} />
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                            WebkitMaskImage: "radial-gradient(70% 60% at 50% 55%, #000, transparent 80%)",
                            maskImage: "radial-gradient(70% 60% at 50% 55%, #000, transparent 80%)",
                        }} />
                </div>
                <div className="container-page py-24 sm:py-32">
                    <div className="mx-auto max-w-2xl text-center">
                        <Reveal>
                            <SectionLabel n="03" className="justify-center [&>span:last-child]:text-white/70">The curriculum</SectionLabel>
                        </Reveal>
                        <ScrubText
                            text="Six units over twelve weeks."
                            className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-white sm:text-[2.5rem]"
                        />
                        <Reveal delay={120}>
                            <p className="mt-4 text-lg text-white/60">
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
