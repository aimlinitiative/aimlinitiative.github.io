export default function About() {
    return (
        <div className="bg-white text-gray-900">
            <section className="mx-auto max-w-6xl px-4 py-16">
                <h1 className="text-4xl font-bold tracking-tight">About</h1>
                <p className="mt-4 max-w-3xl text-lg text-gray-700">
                    The AIML Initiative helps students and educators learn practical AI.
                    We publish open lessons, run workshops, and share projects that make
                    complex ideas feel clear and useful.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border p-6">
                        <h2 className="text-xl font-semibold">What we teach</h2>
                        <p className="mt-2 text-gray-600">
                            Foundations of machine learning, simple neural networks, data
                            literacy, evaluation, and responsible use.
                        </p>
                    </div>
                    <div className="rounded-2xl border p-6">
                        <h2 className="text-xl font-semibold">How we teach</h2>
                        <p className="mt-2 text-gray-600">
                            Hands on labs in Colab, clear visuals, and short projects that
                            build confidence step by step.
                        </p>
                    </div>
                </div>

                <div className="mt-12 rounded-2xl border p-6">
                    <h2 className="text-xl font-semibold">Get involved</h2>
                    <p className="mt-2 text-gray-600">
                        Host a workshop, contribute a lesson, or share feedback on our
                        materials. We welcome collaborators and classroom pilots.
                    </p>
                    <a
                        href="mailto:team@aimlinitiative.org"
                        className="mt-4 inline-block rounded-lg border px-4 py-2 hover:bg-gray-50"
                    >
                        team@aimlinitiative.org
                    </a>
                </div>
            </section>
        </div>
    );
}
