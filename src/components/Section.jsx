import Reveal from "./Reveal";

/* Every section uses the same asymmetric frame: a short label in the first
 * three columns, the content from column five to the end. */
export default function Section({ id, label, children }) {
    return (
        <section id={id} className="border-t border-line">
            <div className="page grid12 py-24 lg:py-40">
                <h2 className="label col-span-12 mb-10 lg:col-span-3 lg:mb-0">{label}</h2>
                <Reveal className="col-span-12 lg:col-span-8 lg:col-start-5">{children}</Reveal>
            </div>
        </section>
    );
}
