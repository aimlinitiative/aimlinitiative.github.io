import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="bg-white text-gray-900">
            {/* Hero */}
            <section className="mx-auto max-w-6xl px-4 py-16">
                <div className="flex flex-col items-center mb-8">
                    <img 
                        src="/logo.jpg" 
                        alt="AIML Initiative" 
                        className="h-24 w-24 object-contain mb-4"
                    />
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center">
                        Learn AI with clarity
                    </h1>
                </div>
                <p className="mt-3 max-w-2xl text-lg text-gray-600">
                    Workshops, Colab notebooks, and projects that make machine learning
                    feel approachable and useful.
                </p>
                <div className="mt-6 flex gap-3">
                    <Link
                        to="/resources"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Explore resources
                    </Link>
                    <Link
                        to="/about"
                        className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                    >
                        Learn more
                    </Link>
                </div>
            </section>

            {/* Overview sections */}
            <section className="mx-auto max-w-6xl px-4 py-12">
                <h2 className="text-2xl font-semibold">Our Focus</h2>
                <p className="mt-2 text-gray-600">
                    We design lessons, tools, and projects that help students grasp AI
                    through creative, hands-on learning.
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border p-6">
                        <h3 className="font-semibold">Education</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Open-source lessons and activities for classrooms and clubs.
                        </p>
                    </div>
                    <div className="rounded-2xl border p-6">
                        <h3 className="font-semibold">Collaboration</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Partner with schools, educators, and mentors to make AI literacy
                            accessible.
                        </p>
                    </div>
                    <div className="rounded-2xl border p-6">
                        <h3 className="font-semibold">Innovation</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Encourage students to build projects that reflect real-world
                            applications of machine learning.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="mx-auto max-w-6xl px-4 py-16 text-center">
                <h2 className="text-2xl font-semibold">Get Involved</h2>
                <p className="mt-2 text-gray-600">
                    Join our mission to make AI literacy accessible for everyone.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                    <Link
                        to="/about"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        About us
                    </Link>
                    <Link
                        to="/resources"
                        className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                    >
                        Browse resources
                    </Link>
                </div>
            </section>
        </div>
    );
}
