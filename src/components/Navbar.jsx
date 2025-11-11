import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import ClassPicker from "./ClassPicker";

export default function Navbar() {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const isTeacher = profile?.role === "educator";

    async function handleLogout() {
        await signOut(auth);
        navigate("/login");
    }

    const displayName = profile?.firstName && profile?.lastName 
        ? `${profile.firstName} ${profile.lastName}`.trim()
        : profile?.email?.split("@")[0] || "User";

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left side: logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            AIML Initiative
                        </span>
                    </Link>

                    {/* Center: navigation links */}
                    <div className="hidden md:flex md:items-center md:gap-1">
                        <Link
                            to="/about"
                            className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            to="/resources"
                            className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                        >
                            Resources
                        </Link>

                        {user && (
                            <>
                                <Link
                                    to="/weeks"
                                    className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                                >
                                    Coursework
                                </Link>
                                <Link
                                    to="/progress"
                                    className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                                >
                                    Progress
                                </Link>

                                {isTeacher ? (
                                    <Link
                                        to="/classes"
                                        className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                                    >
                                        Classes
                                    </Link>
                                ) : (
                                    <Link
                                        to="/join"
                                        className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                                    >
                                        Join Class
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Right side: user menu */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                {user && <div className="mx-2"><ClassPicker /></div>}
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="hidden sm:inline">{displayName}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow"
                            >
                                Sign in
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
