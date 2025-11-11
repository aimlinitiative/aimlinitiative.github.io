// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Dashboard() {
    const { profile } = useAuth();
    if (!profile) return null;

    const isTeacher = profile.role === "educator";

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2">
                <Link to="/weeks" className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all duration-200 hover:border-indigo-300">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Course Weeks</h2>
                    <p className="text-gray-600">Browse student materials and quizzes</p>
                </Link>
                {isTeacher && (
                    <Link to="/classes" className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all duration-200 hover:border-indigo-300">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Classes</h2>
                        <p className="text-gray-600">Create a class and track progress</p>
                    </Link>
                )}
            </div>
        </div>
    );
}
