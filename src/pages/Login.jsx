// src/pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mode, setMode] = useState("signin");
    const [role, setRole] = useState("student"); // default
    const [err, setErr] = useState("");
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            if (mode === "signin") {
                await signInWithEmailAndPassword(auth, email.trim(), pw);
                nav("/dashboard");
            } else {
                const cred = await createUserWithEmailAndPassword(auth, email.trim(), pw);
                try {
                    await setDoc(doc(db, "users", cred.user.uid), {
                        email: email.trim(),
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        role,
                        createdAt: serverTimestamp(),
                    }, { merge: true });
                } catch (eWrite) {
                    // Ignore write errors here; AuthProvider will create the doc on first load,
                    // and RoleGate/RoleSelect will handle role assignment.
                }
                nav("/dashboard");
            }
        } catch (e2) {
            setErr(e2.message);
        }
    };

    return (
        <div className="mx-auto max-w-md px-4 py-12">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{mode === "signin" ? "Sign In" : "Create Account"}</h1>
                <form onSubmit={submit} className="space-y-4">
                    <input 
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                        placeholder="Email"
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <input 
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                        placeholder="Password" 
                        type="password"
                        value={pw} 
                        onChange={e => setPw(e.target.value)} 
                    />
                    {mode === "signup" && (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <input 
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                                    placeholder="First name"
                                    value={firstName} 
                                    onChange={e => setFirstName(e.target.value)} 
                                />
                                <input 
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                                    placeholder="Last name"
                                    value={lastName} 
                                    onChange={e => setLastName(e.target.value)} 
                                />
                            </div>
                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="student"
                                        checked={role === "student"} 
                                        onChange={() => setRole("student")}
                                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-700 font-medium">Student</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="educator"
                                        checked={role === "educator"} 
                                        onChange={() => setRole("educator")}
                                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-700 font-medium">Educator</span>
                                </label>
                            </div>
                        </>
                    )}
                    {err && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{err}</p>}
                    <button 
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Continue
                    </button>
                </form>
                <div className="mt-6 text-center">
                    {mode === "signin" ? (
                        <button 
                            className="text-indigo-600 hover:text-indigo-700 font-medium" 
                            onClick={() => setMode("signup")}
                        >
                            Create an account
                        </button>
                    ) : (
                        <button 
                            className="text-indigo-600 hover:text-indigo-700 font-medium" 
                            onClick={() => setMode("signin")}
                        >
                            Already have an account?
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
