export default function Resources() {
    return (
        <div className="bg-white text-gray-900">
            <section className="mx-auto max-w-6xl px-4 py-16">
                <h1 className="text-4xl font-bold tracking-tight mb-6">Course Resources</h1>
                <p className="max-w-3xl text-lg text-gray-700 mb-8">
                    This web application provides a comprehensive learning platform for AI and Machine Learning. 
                    All course materials are organized by chapter and accessible through your account.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-semibold mb-2">Chapter Guides</h2>
                        <p className="text-sm text-gray-600">
                            Detailed student and teacher guides for each chapter, covering key concepts and learning objectives.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-semibold mb-2">Interactive Notebooks</h2>
                        <p className="text-sm text-gray-600">
                            Google Colab notebooks with hands-on coding exercises. Make a copy before editing to save your work.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-semibold mb-2">Assessment Quizzes</h2>
                        <p className="text-sm text-gray-600">
                            Test your understanding with quizzes that provide immediate feedback on your answers.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-semibold mb-2">Progress Tracking</h2>
                        <p className="text-sm text-gray-600">
                            Monitor your completion status for guides, notebooks, and quizzes as you progress through the course.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-semibold mb-2">Class Management</h2>
                        <p className="text-sm text-gray-600">
                            Educators can create classes, share join codes, and track student progress across all chapters.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-semibold mb-2">Profile Settings</h2>
                        <p className="text-sm text-gray-600">
                            Update your name, reset progress, or manage your account settings from your profile page.
                        </p>
                    </div>
                </div>

                <div className="mt-12 rounded-2xl border border-gray-200 p-6 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-3">How to Use This Platform</h2>
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <h3 className="font-semibold mb-1">For Students:</h3>
                            <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                                <li>Sign up and select "Student" as your role</li>
                                <li>Join a class using the join code provided by your educator</li>
                                <li>Navigate to "Coursework" to see all available chapters</li>
                                <li>Click on a chapter to access the student guide, Colab notebook, and quiz</li>
                                <li>Mark items as complete as you finish them</li>
                                <li>View your overall progress on the "Progress" page</li>
                            </ol>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">For Educators:</h3>
                            <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                                <li>Sign up and select "Educator" as your role</li>
                                <li>Create a class from the "Classes" page and share the join code with students</li>
                                <li>Access teacher guides with detailed explanations and answer keys</li>
                                <li>Monitor student progress and quiz scores from the class detail page</li>
                                <li>View which materials each student has completed</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="mt-12 rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-3">Technical Requirements</h2>
                    <p className="text-gray-600 mb-4">
                        This platform works best with modern web browsers. For Google Colab notebooks, you'll need:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>A Google account (to save copies of Colab notebooks)</li>
                        <li>A stable internet connection</li>
                        <li>JavaScript enabled in your browser</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
