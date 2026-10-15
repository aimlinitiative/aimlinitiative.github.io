import Reveal from "./Reveal";

/* A section: a small tag, the heading, an optional intro beside it on wide
 * screens, then the content. `tone` sets the band behind it. */
export default function Section({ id, tag, title, intro, tone = "", children }) {
    return (
        <section id={id} className={tone}>
            <div className="page py-20 lg:py-28">
                <Reveal>
                    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
                        <div className="lg:col-span-7">
                            <p className="tag text-blue">{tag}</p>
                            <h2 className="mt-3 text-balance font-display text-h2">{title}</h2>
                        </div>
                        {intro && <p className="max-w-measure text-pretty text-lead text-dim lg:col-span-5">{intro}</p>}
                    </div>
                    <div className="mt-12 lg:mt-14">{children}</div>
                </Reveal>
            </div>
        </section>
    );
}
