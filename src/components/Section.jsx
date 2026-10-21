import Reveal from "./Reveal";

/* A section: a small tag, one headline that says the point, an optional line
 * under it, then the content. Centered, like Hivemind's section heads. */
export default function Section({ id, tag, title, intro, align = "center", className = "", children }) {
    const c = align === "center";
    return (
        <section id={id} className={className}>
            <div className="page py-20 lg:py-28">
                <Reveal>
                    <div className={c ? "mx-auto max-w-[46rem] text-center" : "max-w-[46rem]"}>
                        {tag && <p className="tag text-blue">{tag}</p>}
                        <h2 className="mt-3 text-balance font-display text-h2">{title}</h2>
                        {intro && <p className={`mt-5 text-pretty text-lead text-dim ${c ? "mx-auto" : ""} max-w-[38rem]`}>{intro}</p>}
                    </div>
                    <div className="mt-12 lg:mt-16">{children}</div>
                </Reveal>
            </div>
        </section>
    );
}
