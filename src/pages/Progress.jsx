// src/pages/Progress.jsx
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";
import { useClass } from "../context/ClassProvider";
import { db } from "../lib/firebase";

export default function Progress() {
	const { user } = useAuth();
	const { currentClassId } = useClass();
	const [rows, setRows] = useState([]);
	const [weeks, setWeeks] = useState([]);

	useEffect(() => {
		async function loadWeeks() {
			const q = query(collection(db, "weeks"), orderBy("index", "asc"));
			const snap = await getDocs(q);
			setWeeks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
		}
		loadWeeks();
	}, []);

	useEffect(() => {
		async function loadProgress() {
			if (!user || !currentClassId) {
				setRows([]);
				return;
			}
			const qp = query(
				collection(db, "progress"),
				where("uid", "==", user.uid),
				where("classId", "==", currentClassId)
			);
			const psnap = await getDocs(qp);
			setRows(psnap.docs.map((d) => d.data()));
		}
		loadProgress();
	}, [user, currentClassId]);

	const progressMap = useMemo(() => {
		const map = {};
		for (const row of rows) {
			map[row.weekId] = row;
		}
		return map;
	}, [rows]);

	const { totalTasks, completedTasks } = useMemo(() => {
		let total = 0;
		let done = 0;
		for (const week of weeks) {
			total += 2; // guide + colab flag
			const row = progressMap[week.id];
			if (row?.guideComplete) done += 1;
			if (row?.colabComplete) done += 1;
			if (week.quizId) {
				total += 1;
				if (row?.quizComplete) done += 1;
			}
		}
		return { totalTasks: total, completedTasks: done };
	}, [weeks, progressMap]);

	const percent = totalTasks ? Math.round((completedTasks * 100) / totalTasks) : 0;

	return (
		<div className="mx-auto max-w-4xl px-4 py-12">
			<h1 className="text-4xl font-bold text-gray-900 mb-8">Your Progress</h1>
			{!user && (
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<p className="text-gray-600">Sign in to view your progress.</p>
				</div>
			)}
			{user && !currentClassId && (
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<p className="text-gray-600">Pick a class first (top bar).</p>
				</div>
			)}

			{user && currentClassId && (
				<div className="space-y-6">
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-3">
							<span className="text-lg font-semibold text-gray-900">Overall Completion</span>
							<span className="text-2xl font-bold text-indigo-600">{percent}%</span>
						</div>
						<div className="h-4 w-full rounded-full bg-gray-200 overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 rounded-full"
								style={{ width: `${percent}%` }}
							/>
						</div>
						<p className="mt-3 text-sm text-gray-600">
							{completedTasks} of {totalTasks} tasks completed
						</p>
					</div>

					<div className="space-y-4">
						{weeks.map((week) => {
							const row = progressMap[week.id] || {};
							return (
								<div key={week.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
									<h2 className="text-xl font-semibold text-gray-900 mb-4">
										Chapter {week.index}: {week.title}
									</h2>
									<ul className="space-y-2">
										<li className="flex items-center gap-3">
											<span className={`text-xl ${row.guideComplete ? "text-green-600" : "text-gray-400"}`}>
												{row.guideComplete ? "✓" : "○"}
											</span>
											<span className={`${row.guideComplete ? "text-gray-900 font-medium" : "text-gray-600"}`}>
												Student guide {row.guideComplete ? "(completed)" : "(not yet)"}
											</span>
										</li>
										<li className="flex items-center gap-3">
											<span className={`text-xl ${row.colabComplete ? "text-green-600" : "text-gray-400"}`}>
												{row.colabComplete ? "✓" : "○"}
											</span>
											<span className={`${row.colabComplete ? "text-gray-900 font-medium" : "text-gray-600"}`}>
												Colab {row.colabComplete ? "(completed)" : "(not yet)"}
											</span>
										</li>
										{week.quizId && (
											<li className="flex items-center gap-3">
												<span className={`text-xl ${row.quizComplete ? "text-green-600" : "text-gray-400"}`}>
													{row.quizComplete ? "✓" : "○"}
												</span>
												<span className={`${row.quizComplete ? "text-gray-900 font-medium" : "text-gray-600"}`}>
													Quiz {row.quizComplete
														? `(scored ${row.quizPercent ?? 0}%)`
														: "(not yet)"}
												</span>
											</li>
										)}
									</ul>
								</div>
							);
						})}
					</div>
				</div>
			)}

			{user && currentClassId && !rows.length && (
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<p className="text-gray-600">No progress yet. Open a chapter to get started.</p>
				</div>
			)}
		</div>
	);
}

