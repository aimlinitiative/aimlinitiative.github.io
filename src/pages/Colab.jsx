// src/pages/Colab.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthProvider";
import { useClass } from "../context/ClassProvider";
import { setProgressFlag } from "../utils/progress";

export default function Colab() {
	const { weekId } = useParams();
	const { user } = useAuth();
	const { currentClassId } = useClass();
	const [week, setWeek] = useState(null);
	const [progress, setProgress] = useState(null);

	useEffect(() => {
		async function loadWeek() {
			const w = await getDoc(doc(db, "weeks", weekId));
			if (w.exists()) {
				setWeek({ id: w.id, ...w.data() });
			} else {
				setWeek(null);
			}
		}
		loadWeek();
	}, [weekId]);

	useEffect(() => {
		async function loadProgress() {
			if (!user || !currentClassId || !week) {
				setProgress(null);
				return;
			}
			const pid = `${user.uid}_${week.id}_${currentClassId}`;
			const snap = await getDoc(doc(db, "progress", pid));
			setProgress(snap.exists() ? snap.data() : null);
		}
		loadProgress();
	}, [user, currentClassId, week]);

	if (!week) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16">
				<h1 className="text-3xl font-bold">Chapter not found</h1>
				<p className="mt-3 text-sm text-gray-600">Check with your educator for course materials.</p>
			</div>
		);
	}

	if (!week.colabUrl) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16">
				<h1 className="text-3xl font-bold">Colab Notebook Not Available</h1>
				<p className="mt-3 text-sm text-gray-600">This chapter does not have a Colab notebook associated with it.</p>
			</div>
		);
	}

	async function toggleComplete() {
		if (!user || !currentClassId) return;
		const newValue = !progress?.colabComplete;
		await setProgressFlag(user.uid, currentClassId, week.id, "colabComplete", newValue);
		setProgress((prev) => ({
			uid: user.uid,
			classId: currentClassId,
			weekId: week.id,
			...(prev || {}),
			colabComplete: newValue,
		}));
	}

	return (
		<div className="mx-auto max-w-4xl px-4 py-12">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">
					Chapter {week.index}: {week.title}
				</h1>
				<p className="text-lg text-gray-600">Google Colab Notebook</p>
			</div>

			{!user && (
				<div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
					<p className="text-sm text-yellow-800">
						<strong>Note:</strong> You are viewing this content without being logged in. Your progress will not be saved. 
						<Link to="/login" className="underline ml-1">Sign in</Link> to save your work and track your progress.
					</p>
				</div>
			)}

			<div className="mb-8 flex flex-col items-center">
				<a
					className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 hover:shadow-xl"
					href={week.colabUrl}
					target="_blank"
					rel="noreferrer"
				>
					<svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
					Open Colab Notebook
				</a>
				<p className="mt-2 text-sm text-gray-600 italic">Please make a copy of the notebook before using it.</p>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				{!user || !currentClassId ? (
					<div className="text-center py-3">
						<p className="text-sm text-gray-600 mb-2">
							{!user ? "Sign in to mark this notebook as complete." : "Join a class to track your progress."}
						</p>
						{!user && (
							<Link
								to="/login"
								className="inline-block px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 underline"
							>
								Sign in
							</Link>
						)}
					</div>
				) : (
					<button
						className={`w-full px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
							progress?.colabComplete
								? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
						}`}
						onClick={toggleComplete}
					>
						{progress?.colabComplete ? "✓ Colab completed (click to unmark)" : "Mark Colab complete"}
					</button>
				)}
				<Link
					to="/weeks"
					className="mt-3 block w-full text-center px-5 py-2.5 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 transition-colors duration-200"
				>
					Back to Coursework
				</Link>
			</div>
		</div>
	);
}

