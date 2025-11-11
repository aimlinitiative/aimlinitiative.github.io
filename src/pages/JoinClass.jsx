// src/pages/JoinClass.jsx
import { useState } from "react";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";
import { useClass } from "../context/ClassProvider";
import { db } from "../lib/firebase";

export default function JoinClass() {
    const [code, setCode] = useState("");
    const [msg, setMsg] = useState("");
    const [joining, setJoining] = useState(false);
    const { user } = useAuth();
    const { choose } = useClass();

    async function submit(e) {
        e.preventDefault();
        setMsg("");
        if (!user) {
            setMsg("Sign in to join a class.");
            return;
        }
        const trimmed = code.trim().toUpperCase();
        if (!trimmed) {
            setMsg("Enter a class code.");
            return;
        }
        setJoining(true);
        try {
            const q = query(collection(db, "classes"), where("code", "==", trimmed));
            const snap = await getDocs(q);
            if (snap.empty) {
                setMsg("Class not found. Check the code and try again.");
                return;
            }
            const cls = snap.docs[0];
            const classId = cls.id;
            await setDoc(doc(db, "class_members", `${classId}_${user.uid}`), {
                classId,
                uid: user.uid,
                role: "student",
            }, { merge: true });
            choose(classId);
            setMsg(`Joined class: ${cls.data().name}`);
            setCode("");
        } catch (e2) {
            setMsg(e2.message);
        } finally {
            setJoining(false);
        }
    }

    return (
        <div className="mx-auto max-w-md px-4 py-12">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Join a Class</h1>
                <form onSubmit={submit} className="space-y-4">
                    <input 
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all uppercase" 
                        placeholder="Enter class code"
                        value={code} 
                        onChange={(e) => setCode(e.target.value)} 
                    />
                    <button 
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg" 
                        disabled={joining}
                    >
                        {joining ? "Joining..." : "Join Class"}
                    </button>
                </form>
                {msg && (
                    <p className={`mt-4 p-3 rounded-lg text-sm ${
                        msg.includes("Joined") 
                            ? "bg-green-50 text-green-700 border border-green-200" 
                            : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                        {msg}
                    </p>
                )}
            </div>
        </div>
    );
}
