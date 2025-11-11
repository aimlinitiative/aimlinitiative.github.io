// src/pages/RoleSelect.jsx
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { db } from "../lib/firebase";

export default function RoleSelect() {
	const { user, profile } = useAuth();
	const [role, setRole] = useState("student");
	const [saving, setSaving] = useState(false);
	const [err, setErr] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (profile?.role) {
			navigate("/weeks", { replace: true });
		}
	}, [profile?.role, navigate]);

	if (!user) return null;

	async function save() {
		setErr("");
		setSaving(true);
		try {
			await setDoc(doc(db, "users", user.uid), { role }, { merge: true });
			navigate("/weeks", { replace: true });
		} catch (e) {
			setErr(e.message);
		} finally {
			setSaving(false);
		}
	}

	return (
		<div className="mx-auto max-w-md px-4 py-16">
			<h1 className="text-2xl font-bold">Choose your role</h1>
			<p className="mt-2 text-sm text-gray-600">Select your account type to continue.</p>
			<div className="mt-6 space-y-3">
				<label className="flex items-center gap-2">
					<input
						type="radio"
						name="role"
						value="student"
						checked={role === "student"}
						onChange={() => setRole("student")}
					/>
					<span>Student</span>
				</label>
				<label className="flex items-center gap-2">
					<input
						type="radio"
						name="role"
						value="educator"
						checked={role === "educator"}
						onChange={() => setRole("educator")}
					/>
					<span>Educator</span>
				</label>
			</div>
			{err && <p className="mt-3 text-sm text-red-600">{err}</p>}
			<button
				onClick={save}
				disabled={saving}
				className="mt-6 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
			>
				Continue
			</button>
		</div>
	);
}


