// src/pages/WeekList.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { db } from "../lib/firebase";

export default function WeekList() {
    const { user, profile } = useAuth();
    const isTeacher = profile?.role === "educator";
    const [weeks, setWeeks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const q = query(collection(db, "weeks"), orderBy("index", "asc"));
                const snap = await getDocs(q);
                setWeeks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            } catch (err) {
                console.error("Error loading weeks:", err);
                setError("Failed to load course chapters. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Course Chapters</h1>
            {!user && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> You are viewing this content without being logged in. Your progress and quiz scores will not be saved. 
                        <Link to="/login" className="underline ml-1">Sign in</Link> to save your work and track your progress.
                    </p>
                </div>
            )}
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}
            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Loading course chapters...</p>
                </div>
            ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {weeks.map((w) => (
                    <div key={w.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Chapter {w.index}: {w.title}</h2>
                        <div className="flex flex-col gap-2 mb-4">
                            <Link 
                                to={`/weeks/${w.id}`} 
                                className="text-center px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                            >
                                Student Guide
                            </Link>
                            {isTeacher && (
                                <Link 
                                    to={`/weeks/${w.id}/teacher`} 
                                    className="text-center px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                                >
                                    Teacher Guide
                                </Link>
                            )}
                        </div>
                        {w.colabUrl && (
                            <Link
                                to={`/colab/${w.id}`}
                                className="block text-center px-4 py-2.5 mb-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200 border border-blue-200"
                            >
                                Open Colab Notebook
                            </Link>
                        )}
                        {w.quizId && (
                            <Link 
                                to={`/quiz/${w.quizId}`} 
                                className="block text-center px-4 py-2.5 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors duration-200 border border-indigo-200"
                            >
                                Take Quiz
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}
