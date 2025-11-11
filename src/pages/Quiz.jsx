// src/pages/Quiz.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useClass } from "../context/ClassProvider";
import { db } from "../lib/firebase";
import { updateProgress } from "../utils/progress";

export default function Quiz() {
	const { quizId } = useParams();
	const { user } = useAuth();
	const { currentClassId } = useClass();
	const [quiz, setQuiz] = useState(null);
	const [answers, setAnswers] = useState({});
	const [result, setResult] = useState(null);
	const [answerKey, setAnswerKey] = useState({});
	const [weekId, setWeekId] = useState(null);
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		async function load() {
			const qDoc = await getDoc(doc(db, "quizzes", quizId));
			if (qDoc.exists()) {
				setQuiz(qDoc.data());
			} else {
				setQuiz(null);
			}
			const keyDoc = await getDoc(doc(db, "quiz_answers", quizId));
			if (keyDoc.exists()) {
				setAnswerKey(keyDoc.data().key || {});
				setWeekId(keyDoc.data().weekId || null);
			} else {
				setAnswerKey({});
				setWeekId(null);
			}
		}
		load();
	}, [quizId]);

	if (!quiz) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16">
				<h1 className="text-3xl font-bold">Quiz not found</h1>
				<p className="mt-3 text-sm text-gray-600">Check with your educator for the latest materials.</p>
			</div>
		);
	}

	async function submit(e) {
		e.preventDefault();
		if (submitted) return;
		let score = 0;
		let total = 0;
		const breakdown = quiz.questions.map((q) => {
			total += 1;
			const selected = answers[q.id] ?? null;
			const correctAnswer = answerKey[q.id];
			const isCorrect = selected === correctAnswer;
			if (isCorrect) score += 1;
			return { id: q.id, selected, correctAnswer, isCorrect };
		});
		const percent = total ? Math.round((score * 100) / total) : 0;
		setResult({ score, percent, breakdown, total });
		setSubmitted(true);

		if (user && currentClassId && weekId) {
			await updateProgress(user.uid, currentClassId, weekId, {
				quizComplete: true,
				quizScore: score,
				quizPercent: percent,
			});
		}
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<h1 className="text-4xl font-bold text-gray-900 mb-8">{quiz.title}</h1>

			{!user && (
				<div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
					<p className="text-sm text-yellow-800">
						<strong>Note:</strong> You are taking this quiz without being logged in. Your quiz score will not be saved. 
						<Link to="/login" className="underline ml-1">Sign in</Link> to save your quiz results and track your progress.
					</p>
				</div>
			)}

			<form onSubmit={submit} className="mt-6 space-y-6">
				{quiz.questions?.map((q) => (
					<div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<p className="font-semibold text-gray-900 mb-4 text-lg">{q.prompt}</p>
						<div className="space-y-3">
							{q.choices.map((c) => (
								<label key={c} className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 transition-colors ${
									submitted ? "cursor-not-allowed opacity-60" : "hover:bg-gray-50 cursor-pointer"
								}`}>
									<input
										type="radio"
										name={q.id}
										value={c}
										checked={answers[q.id] === c}
										onChange={(evt) => !submitted && setAnswers((prev) => ({ ...prev, [q.id]: evt.target.value }))}
										disabled={submitted}
										className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 disabled:cursor-not-allowed"
									/>
									<span className="text-gray-700">{c}</span>
								</label>
							))}
						</div>
					</div>
				))}
				<button 
					type="submit"
					disabled={submitted}
					className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
				>
					{submitted ? "Quiz Submitted" : "Submit Quiz"}
				</button>
				<Link
					to="/weeks"
					className="mt-3 block w-full text-center px-5 py-2.5 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 transition-colors duration-200"
				>
					Back to Coursework
				</Link>
			</form>

			{result && (
				<div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="mb-6 pb-6 border-b border-gray-200">
						<p className="text-2xl font-bold text-gray-900 mb-2">
							Score: <span className="text-indigo-600">{result.score}</span> / {result.total}
						</p>
						<p className="text-lg text-gray-600">
							Percent: <strong className="text-indigo-600">{result.percent}%</strong>
						</p>
					</div>
					<div className="space-y-4">
						{result.breakdown.map((b) => (
							<div key={b.id} className={`rounded-lg p-4 border-2 ${b.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
								<p className="font-semibold text-gray-900 mb-2">{quiz.questions.find((q) => q.id === b.id)?.prompt}</p>
								<p className={`text-sm font-medium ${b.isCorrect ? "text-green-700" : "text-red-700"}`}>
									Your answer: {b.selected ?? "—"} {b.isCorrect ? "✓ Correct" : "✗ Incorrect"}
								</p>
								{!b.isCorrect && (
									<p className="mt-2 text-sm text-gray-700">
										Correct answer: <strong className="text-green-700">{b.correctAnswer ?? "Unavailable"}</strong>
									</p>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

