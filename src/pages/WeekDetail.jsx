// src/pages/WeekDetail.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db, storage } from "../lib/firebase";
import { useAuth } from "../context/AuthProvider";
import { useClass } from "../context/ClassProvider";
import { setProgressFlag } from "../utils/progress";
import { getDownloadURL, ref } from "firebase/storage";

export default function WeekDetail() {
	const { weekId } = useParams();
	const { user } = useAuth();
	const { currentClassId } = useClass();
	const [week, setWeek] = useState(null);
	const [student, setStudent] = useState(null);
	const [progress, setProgress] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function resolveHtml(data) {
		if (!data) return "";
		if (data.guideHtml) return data.guideHtml;
		const candidates = [
			data.guideHtmlPath,
			data.htmlPath,
			data.guidePath,
			data.path,
		].filter(Boolean);
		for (const path of candidates) {
			try {
				let html = "";
				if (/^https?:\/\//i.test(path)) {
					html = await fetch(path).then((res) => res.text());
				} else {
					const url = await getDownloadURL(ref(storage, path));
					html = await fetch(url).then((res) => res.text());
				}
				if (html) return html;
			} catch (e) {
				// continue to next candidate
			}
		}
		if (data.guideUrl) {
			try {
				const html = await fetch(data.guideUrl).then((res) => res.text());
				if (html) return html;
			} catch (e) {
				// ignore
			}
		}
		return "";
	}

	useEffect(() => {
		async function loadWeek() {
			try {
				setLoading(true);
				setError(null);
				const w = await getDoc(doc(db, "weeks", weekId));
				if (w.exists()) {
					const data = { id: w.id, ...w.data() };
					setWeek(data);
					try {
						const s = await getDoc(doc(db, "materials_student", weekId));
						if (s.exists()) {
							const studentData = s.data();
							const html = await resolveHtml(studentData);
							setStudent({ ...studentData, guideHtmlResolved: html });
						} else {
							setStudent(null);
						}
					} catch (err) {
						console.error("Error loading student materials:", err);
						setStudent(null);
					}
				} else {
					setWeek(null);
					setStudent(null);
				}
			} catch (err) {
				console.error("Error loading week:", err);
				setError("Failed to load chapter content. Please try again later.");
			} finally {
				setLoading(false);
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

	if (loading) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16">
				<p className="text-gray-600">Loading chapter content...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16">
				<div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
					<p className="text-sm text-red-800">{error}</p>
				</div>
				<Link
					to="/weeks"
					className="inline-block px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 underline"
				>
					Back to Coursework
				</Link>
			</div>
		);
	}

	if (!week) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16">
				<h1 className="text-3xl font-bold">Chapter not found</h1>
				<p className="mt-3 text-sm text-gray-600">Check with your educator for course materials.</p>
				<Link
					to="/weeks"
					className="mt-4 inline-block px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 underline"
				>
					Back to Coursework
				</Link>
			</div>
		);
	}

	async function toggleComplete(field) {
		if (!user || !currentClassId) return;
		const newValue = !progress?.[field];
		await setProgressFlag(user.uid, currentClassId, week.id, field, newValue);
		setProgress((prev) => ({
			uid: user.uid,
			classId: currentClassId,
			weekId: week.id,
			...(prev || {}),
			[field]: newValue,
		}));
	}

	return (
		<div className="mx-auto max-w-4xl px-4 py-12">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">
					Chapter {week.index}: {week.title}
				</h1>
			</div>

			{!user && (
				<div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
					<p className="text-sm text-yellow-800">
						<strong>Note:</strong> You are viewing this content without being logged in. Your progress will not be saved. 
						<Link to="/login" className="underline ml-1">Sign in</Link> to save your work and track your progress.
					</p>
				</div>
			)}

			{student ? (
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
					<div
						className="prose max-w-none"
						dangerouslySetInnerHTML={{ __html: student.guideHtmlResolved || student.guideHtml || "" }}
					/>
				</div>
			) : (
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
					<p className="text-gray-600">Student guide coming soon.</p>
				</div>
			)}

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
				{!user || !currentClassId ? (
					<div className="text-center py-3">
						<p className="text-sm text-gray-600 mb-2">
							{!user ? "Sign in to mark this guide as complete." : "Join a class to track your progress."}
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
							progress?.guideComplete
								? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
						}`}
						onClick={() => toggleComplete("guideComplete")}
					>
						{progress?.guideComplete ? "✓ Guide completed (click to unmark)" : "Mark guide complete"}
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

