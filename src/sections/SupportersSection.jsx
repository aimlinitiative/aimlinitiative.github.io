import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import Supporters from "../components/Supporters";

export default function SupportersSection() {
    return (
        <>
            {/* ===================== SUPPORTERS ===================== */}
            {/* Supporters lays out its own containers: the logo band runs full-bleed. */}
            <section id="supporters" className="py-24 sm:py-32">
                <div className="container-page">
                    <Reveal className="max-w-2xl">
                        <SectionLabel n="05">Supporters</SectionLabel>
                        <h2 className="display mt-5 text-balance text-3xl font-bold tracking-tightest text-ink sm:text-[2.5rem]">
                            Who's already in.
                        </h2>
                        <p className="mt-4 text-lg text-muted">
                            Nine partners have committed to the summit so far.
                        </p>
                    </Reveal>
                </div>
                <Supporters />
            </section>
        </>
    );
}
