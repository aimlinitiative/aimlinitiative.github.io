import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import Curriculum from "../components/Curriculum";

export default function CurriculumSection() {
    return (
        <>
            {/* ===================== CURRICULUM ===================== */}
            <section id="curriculum" className="container-page py-24 sm:py-32">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <SectionLabel n="03" className="justify-center">The curriculum</SectionLabel>
                    <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                        Six units over twelve weeks.
                    </h2>
                    <p className="mt-4 text-lg text-muted">
                        It starts from the basics and ends with a project students ship. Drag to look through it.
                    </p>
                </Reveal>
                <Curriculum />
            </section>
        </>
    );
}
