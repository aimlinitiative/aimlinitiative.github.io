// src/pages/Classes.jsx
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";
import { db } from "../lib/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Classes() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [name, setName] = useState("");
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    async function load() {
        if (!user) return;
        const q = query(collection(db, "classes"), where("ownerUid", "==", user.uid));
        const snap = await getDocs(q);
        setClasses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }

    useEffect(() => { load(); }, [user]);

    async function generateJoinCode() {
        while (true) {
            const code = Math.random().toString(36).slice(2, 8).toUpperCase();
            const codeQuery = query(collection(db, "classes"), where("code", "==", code));
            const snap = await getDocs(codeQuery);
            if (snap.empty) return code;
        }
    }

    async function create() {
        if (!name.trim()) return;
        if (!user) return;
        setError("");
        setCreating(true);
        try {
            const code = await generateJoinCode();
            const ref = await addDoc(collection(db, "classes"), {
                ownerUid: user.uid,
                name: name.trim(),
                code,
                createdAt: serverTimestamp(),
            });
            await setDoc(doc(db, "class_members", `${ref.id}_${user.uid}`), {
                classId: ref.id,
                uid: user.uid,
                role: "educator",
            });
            setName("");
            await load();
        } catch (e) {
            setError(e.message);
        } finally {
            setCreating(false);
        }
    }

    async function deleteClass(classId) {
        if (!window.confirm("Are you sure you want to delete this class? This will remove all student memberships, progress, and quiz attempts. This action cannot be undone.")) {
            return;
        }
        setDeletingId(classId);
        try {
            // Delete all related data
            const membersQ = query(collection(db, "class_members"), where("classId", "==", classId));
            const membersSnap = await getDocs(membersQ);
            const progressQ = query(collection(db, "progress"), where("classId", "==", classId));
            const progressSnap = await getDocs(progressQ);
            const attemptsQ = query(collection(db, "attempts"), where("classId", "==", classId));
            const attemptsSnap = await getDocs(attemptsQ);

            const batch = writeBatch(db);
            membersSnap.docs.forEach((d) => batch.delete(d.ref));
            progressSnap.docs.forEach((d) => batch.delete(d.ref));
            attemptsSnap.docs.forEach((d) => batch.delete(d.ref));
            batch.delete(doc(db, "classes", classId));
            await batch.commit();

            await load();
        } catch (e) {
            setError("Error deleting class: " + e.message);
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Classes</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex gap-3">
                    <input 
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                        placeholder="Class name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <button
                        className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
                        onClick={create}
                        disabled={creating}
                    >
                        {creating ? "Creating..." : "Create Class"}
                    </button>
                </div>
                {error && <p className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {classes.map((c) => (
                    <div 
                        key={c.id} 
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                    >
                        <Link to={`/classes/${c.id}`} className="block mb-3">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">{c.name}</h2>
                            <p className="text-sm text-gray-600">Join code: <span className="font-mono font-semibold text-indigo-600">{c.code}</span></p>
                        </Link>
                        <button
                            onClick={() => deleteClass(c.id)}
                            disabled={deletingId === c.id}
                            className="w-full mt-3 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        >
                            {deletingId === c.id ? "Deleting..." : "Delete Class"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
