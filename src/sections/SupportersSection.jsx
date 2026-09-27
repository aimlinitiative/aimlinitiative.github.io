import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import Supporters from "../components/Supporters";

export default function SupportersSection() {
    return (
        <>
            {/* ===================== SUPPORTERS ===================== */}
            {/* Parchment ground (DESIGN.md §5). Supporters lays out its own containers:
                the logo band runs full-bleed. */}
            <section id="supporters" className="section-y bg-parchment">
                <div className="container-page">
                    <Reveal className="max-w-3xl">
                        <SectionLabel n="05">Supporters</SectionLabel>
                        <h2 className="display mt-6 text-balance text-display-xl text-ink">
                            Who's already in.
                        </h2>
                        <p className="mt-6 max-w-measure text-pretty text-lead text-muted">
                            Nine partners have committed to the summit so far.
                        </p>
                    </Reveal>
                </div>
                <Supporters />
            </section>
        </>
    );
}
