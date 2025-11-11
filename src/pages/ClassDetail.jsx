// src/pages/ClassDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, getDoc, orderBy, deleteDoc, writeBatch } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthProvider";
import { useClass } from "../context/ClassProvider";

export default function ClassDetail() {
    const { classId } = useParams();
    const navigate = useNavigate();
    const { user, profile } = useAuth();
    const { choose } = useClass();
    const [cls, setCls] = useState(null);
    const [members, setMembers] = useState([]);
    const [attempts, setAttempts] = useState([]);
    const [progress, setProgress] = useState([]);
    const [userMap, setUserMap] = useState({});
    const [weeks, setWeeks] = useState([]);
    const [leaving, setLeaving] = useState(false);
    
    const isOwner = cls?.ownerUid === user?.uid;
    const isStudent = profile?.role === "student" && members.some(m => m.uid === user?.uid && m.role === "student");

    useEffect(() => {
        async function load() {
            const c = await getDoc(doc(db, "classes", classId));
            setCls({ id: c.id, ...c.data() });

            const memberSnap = await getDocs(query(collection(db, "class_members"), where("classId", "==", classId)));
            const memberRows = memberSnap.docs.map((d) => d.data());
            setMembers(memberRows);

            const userIds = Array.from(new Set(memberRows.map((m) => m.uid)));
            const userEntries = await Promise.all(userIds.map(async (uid) => {
                const u = await getDoc(doc(db, "users", uid));
                return [uid, u.exists() ? u.data() : null];
            }));
            const map = {};
            for (const [uid, data] of userEntries) {
                map[uid] = data;
            }
            setUserMap(map);

            const qa = query(collection(db, "attempts"), where("classId", "==", classId), orderBy("submittedAt", "desc"));
            const asnap = await getDocs(qa);
            setAttempts(asnap.docs.map((d) => ({ id: d.id, ...d.data() })));

            const qp = query(collection(db, "progress"), where("classId", "==", classId));
            const psnap = await getDocs(qp);
            setProgress(psnap.docs.map((d) => d.data()));

            const weekSnap = await getDocs(query(collection(db, "weeks"), orderBy("index", "asc")));
            setWeeks(weekSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        load();
    }, [classId]);

    function displayName(uid) {
        const data = userMap[uid];
        if (!data) return uid;
        const first = data.firstName || "";
        const last = data.lastName || "";
        const full = `${first} ${last}`.trim();
        return full || data.email || uid;
    }

    const progressByStudent = progress.reduce((acc, row) => {
        if (!acc[row.uid]) acc[row.uid] = {};
        acc[row.uid][row.weekId] = row;
        return acc;
    }, {});

    async function leaveClass() {
        if (!user || !window.confirm("Are you sure you want to leave this class? Your progress will be preserved but you won't be able to access this class anymore.")) {
            return;
        }
        setLeaving(true);
        try {
            // Delete membership
            await deleteDoc(doc(db, "class_members", `${classId}_${user.uid}`));
            // Note: We keep progress and attempts for historical purposes
            navigate("/join");
        } catch (e) {
            alert("Error leaving class: " + e.message);
        } finally {
            setLeaving(false);
        }
    }

    if (!cls) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-12">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    // Allow students to view their own class (but not if they're the owner)
    if (isStudent && !isOwner) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-12">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{cls.name}</h1>
                    <p className="text-gray-600">Join code: <span className="font-mono font-semibold text-indigo-600">{cls.code}</span></p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Class Information</h2>
                    <p className="text-gray-600 mb-6">You are enrolled in this class. View your progress on the Progress page.</p>
                    <button
                        onClick={leaveClass}
                        disabled={leaving}
                        className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        {leaving ? "Leaving..." : "Leave Class"}
                    </button>
                </div>
            </div>
        );
    }

    // Only educators can see the full detail view
    if (profile?.role !== "educator" && !isOwner) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-12">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-600">You don't have permission to view this class.</p>
                </div>
            </div>
        );
    }

    // Educator view
    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{cls.name}</h1>
                <p className="text-gray-600">Join code: <span className="font-mono font-semibold text-indigo-600">{cls.code}</span></p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Roster</h2>
                <ul className="space-y-2">
                    {members.map((m) => (
                        <li key={`${m.classId}_${m.uid}`} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                            <span className="text-gray-900">{displayName(m.uid)}</span>
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">{m.role}</span>
                        </li>
                    ))}
                    {!members.length && <li className="text-gray-600">No members yet.</li>}
                </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Quiz Attempts</h2>
                <div className="space-y-3">
                    {attempts.map((a) => (
                        <div key={a.id} className="border border-gray-200 rounded-lg p-4">
                            <p className="font-medium text-gray-900">Student: {displayName(a.uid)}</p>
                            <p className="text-sm text-gray-600">Quiz: {a.quizId}</p>
                            <p className="text-sm font-semibold text-indigo-600">Score: {a.score} ({a.percent}%)</p>
                        </div>
                    ))}
                    {!attempts.length && <p className="text-gray-600">No attempts yet.</p>}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Progress</h2>
                <div className="space-y-6">
                    {members
                        .filter((m) => m.role === "student")
                        .map((m) => {
                            const record = progressByStudent[m.uid] || {};
                            return (
                                <div key={m.uid} className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{displayName(m.uid)}</h3>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {weeks.map((week) => {
                                            const row = record[week.id] || {};
                                            const guide = row.guideComplete ? "✓" : "○";
                                            const colab = row.colabComplete ? "✓" : "○";
                                            const quiz = row.quizComplete ? `✓ (${row.quizPercent ?? 0}%)` : "○";
                                            return (
                                                <div key={week.id} className="border border-gray-200 rounded-lg p-3 text-sm">
                                                    <p className="font-semibold text-gray-900 mb-2">Chapter {week.index}: {week.title}</p>
                                                    <p className="text-gray-600">Guide: <span className={row.guideComplete ? "text-green-600 font-medium" : ""}>{guide}</span></p>
                                                    <p className="text-gray-600">Colab: <span className={row.colabComplete ? "text-green-600 font-medium" : ""}>{colab}</span></p>
                                                    {week.quizId && <p className="text-gray-600">Quiz: <span className={row.quizComplete ? "text-green-600 font-medium" : ""}>{quiz}</span></p>}
                                                </div>
                                            );
                                        })}
                                        {!weeks.length && <p className="text-sm text-gray-600">No weeks available.</p>}
                                    </div>
                                </div>
                            );
                        })}
                    {!members.some((m) => m.role === "student") && (
                        <p className="text-gray-600">No students have joined this class yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
