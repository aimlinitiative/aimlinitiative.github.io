export default function About() {
    return (
        <div className="bg-white text-gray-900">
            <section className="mx-auto max-w-6xl px-4 py-16">
                <h1 className="text-4xl font-bold tracking-tight mb-6">About the Course</h1>
                <p className="max-w-3xl text-lg text-gray-700 mb-8">
                    This online course on Artificial Intelligence and Machine Learning is designed specifically for high school students. 
                    Through interactive guides, hands-on Google Colab notebooks, and engaging quizzes, students learn the fundamentals 
                    of AI and ML in an accessible and practical way.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                        <h2 className="text-xl font-semibold mb-3">For Students</h2>
                        <p className="text-gray-600">
                            Join a class using a join code from your educator. Work through chapter guides, complete interactive 
                            Colab notebooks, and test your knowledge with quizzes. Track your progress as you advance through 
                            the course materials.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                        <h2 className="text-xl font-semibold mb-3">For Educators</h2>
                        <p className="text-gray-600">
                            Create classes and share join codes with your students. Access teacher guides with detailed explanations 
                            and answer keys. Monitor student progress, view quiz scores, and see which materials students have completed.
                        </p>
                    </div>
                </div>

                <div className="mt-12 rounded-2xl border border-gray-200 p-6 bg-indigo-50">
                    <h2 className="text-xl font-semibold mb-3">Course Structure</h2>
                    <p className="text-gray-700 mb-4">
                        The course is organized into chapters, each containing:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li><strong>Student Guides:</strong> Clear explanations and step-by-step instructions</li>
                        <li><strong>Google Colab Notebooks:</strong> Interactive coding exercises you can run directly in your browser</li>
                        <li><strong>Quizzes:</strong> Test your understanding with immediate feedback on your answers</li>
                    </ul>
                </div>

                <div className="mt-12 rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-3">Get Started</h2>
                    <p className="text-gray-600 mb-4">
                        Ready to begin? Sign up as a student or educator, and start exploring the course materials. 
                        If you're a student, ask your teacher for a class join code to get started.
                    </p>
                    <p className="text-sm text-gray-500">
                        Questions or feedback? Contact us at{" "}
                        <a href="mailto:team@aimlinitiative.org" className="text-indigo-600 hover:underline">
                            team@aimlinitiative.org
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
}
