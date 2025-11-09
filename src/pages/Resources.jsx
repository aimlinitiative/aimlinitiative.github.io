export default function Resources() {
    const items = [
        {
            title: "Intro to ML slide deck",
            desc: "A gentle slide deck for a first lesson on supervised learning.",
            href: "#",
        },
        {
            title: "Colab: k-NN mini lab",
            desc: "Classify points and build intuition for distance based models.",
            href: "#",
        },
        {
            title: "Colab: simple CNN",
            desc: "Train a small CNN on images and inspect feature maps.",
            href: "#",
        },
        {
            title: "Dataset guide",
            desc: "Tips for sourcing, cleaning, and splitting small datasets.",
            href: "#",
        },
        {
            title: "Evaluation checklist",
            desc: "Measure accuracy the right way and avoid common traps.",
            href: "#",
        },
        {
            title: "Ethics discussion kit",
            desc: "Prompts and activities about bias, fairness, and risk.",
            href: "#",
        },
    ];

    return (
        <div className="bg-white text-gray-900">
            <section className="mx-auto max-w-6xl px-4 py-16">
                <h1 className="text-4xl font-bold tracking-tight">Resources</h1>
                <p className="mt-4 max-w-3xl text-lg text-gray-700">
                    Slides, notebooks, and teaching kits you can use right away.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((r) => (
                        <a
                            key={r.title}
                            href={r.href}
                            className="group rounded-2xl border p-6 hover:shadow"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <h2 className="text-lg font-semibold group-hover:underline">
                                {r.title}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">{r.desc}</p>
                        </a>
                    ))}
                </div>

                <div className="mt-12 rounded-2xl border p-6">
                    <h2 className="text-xl font-semibold">License</h2>
                    <p className="mt-2 text-gray-600">
                        Unless noted otherwise, resources are available for classroom use
                        with attribution. Please link back to this site when you share.
                    </p>
                </div>
            </section>
        </div>
    );
}
