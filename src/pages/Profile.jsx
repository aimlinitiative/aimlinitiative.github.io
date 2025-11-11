// src/pages/Profile.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { doc, updateDoc, deleteDoc, collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const { user, profile } = useAuth();
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState(profile?.firstName || "");
	const [lastName, setLastName] = useState(profile?.lastName || "");
	const [saving, setSaving] = useState(false);
	const [msg, setMsg] = useState("");
	const [confirmReset, setConfirmReset] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [resetting, setResetting] = useState(false);
	const [deleting, setDeleting] = useState(false);

	async function saveName() {
		if (!user) return;
		setSaving(true);
		setMsg("");
		try {
			await updateDoc(doc(db, "users", user.uid), {
				firstName: firstName.trim(),
				lastName: lastName.trim(),
			});
			setMsg("Name updated successfully!");
			setTimeout(() => setMsg(""), 3000);
		} catch (e) {
			setMsg("Error updating name: " + e.message);
		} finally {
			setSaving(false);
		}
	}

	async function resetProgress() {
		if (!user || !confirmReset) return;
		setResetting(true);
		setMsg("");
		try {
			const q = query(collection(db, "progress"), where("uid", "==", user.uid));
			const snap = await getDocs(q);
			const batch = writeBatch(db);
			snap.docs.forEach((d) => {
				batch.delete(d.ref);
			});
			await batch.commit();
			setMsg("All progress has been reset.");
			setConfirmReset(false);
			setTimeout(() => setMsg(""), 3000);
		} catch (e) {
			setMsg("Error resetting progress: " + e.message);
		} finally {
			setResetting(false);
		}
	}

	async function deleteAccount() {
		if (!user || !confirmDelete) return;
		setDeleting(true);
		setMsg("");
		try {
			// Delete all user data
			const progressQ = query(collection(db, "progress"), where("uid", "==", user.uid));
			const progressSnap = await getDocs(progressQ);
			const attemptsQ = query(collection(db, "attempts"), where("uid", "==", user.uid));
			const attemptsSnap = await getDocs(attemptsQ);
			const membersQ = query(collection(db, "class_members"), where("uid", "==", user.uid));
			const membersSnap = await getDocs(membersQ);

			const batch = writeBatch(db);
			progressSnap.docs.forEach((d) => batch.delete(d.ref));
			attemptsSnap.docs.forEach((d) => batch.delete(d.ref));
			membersSnap.docs.forEach((d) => batch.delete(d.ref));
			batch.delete(doc(db, "users", user.uid));
			await batch.commit();

			// Delete auth account
			await deleteUser(user);
			navigate("/login");
		} catch (e) {
			setMsg("Error deleting account: " + e.message);
			setDeleting(false);
		}
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<h1 className="text-4xl font-bold text-gray-900 mb-8">Profile Settings</h1>

			{/* Name Section */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">Update Name</h2>
				<div className="grid gap-4 sm:grid-cols-2 mb-4">
					<input
						className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
						placeholder="First name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<input
						className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
						placeholder="Last name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<button
					onClick={saveName}
					disabled={saving}
					className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
				>
					{saving ? "Saving..." : "Save Name"}
				</button>
			</div>

			{/* Reset Progress Section */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-2">Reset Progress</h2>
				<p className="text-sm text-gray-600 mb-4">
					This will permanently delete all your progress across all classes. This action cannot be undone.
				</p>
				{!confirmReset ? (
					<button
						onClick={() => setConfirmReset(true)}
						className="px-6 py-2.5 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors duration-200 shadow-md hover:shadow-lg"
					>
						Reset All Progress
					</button>
				) : (
					<div className="space-y-3">
						<p className="text-sm font-medium text-red-600">Are you sure? This cannot be undone.</p>
						<div className="flex gap-3">
							<button
								onClick={resetProgress}
								disabled={resetting}
								className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
							>
								{resetting ? "Resetting..." : "Yes, Reset Progress"}
							</button>
							<button
								onClick={() => setConfirmReset(false)}
								disabled={resetting}
								className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Delete Account Section */}
			<div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
				<h2 className="text-xl font-semibold text-red-600 mb-2">Delete Account</h2>
				<p className="text-sm text-gray-600 mb-4">
					This will permanently delete your account and all associated data. This action cannot be undone.
				</p>
				{!confirmDelete ? (
					<button
						onClick={() => setConfirmDelete(true)}
						className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg"
					>
						Delete Account
					</button>
				) : (
					<div className="space-y-3">
						<p className="text-sm font-medium text-red-600">Are you absolutely sure? This will permanently delete your account and all data.</p>
						<div className="flex gap-3">
							<button
								onClick={deleteAccount}
								disabled={deleting}
								className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
							>
								{deleting ? "Deleting..." : "Yes, Delete Account"}
							</button>
							<button
								onClick={() => setConfirmDelete(false)}
								disabled={deleting}
								className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>

			{msg && (
				<div className={`mt-6 p-4 rounded-lg ${
					msg.includes("Error") || msg.includes("delete") || msg.includes("reset")
						? "bg-red-50 text-red-700 border border-red-200"
						: "bg-green-50 text-green-700 border border-green-200"
				}`}>
					{msg}
				</div>
			)}
		</div>
	);
}

