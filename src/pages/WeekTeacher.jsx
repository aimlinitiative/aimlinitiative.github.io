// src/pages/WeekTeacher.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db, storage } from "../lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";

export default function WeekTeacher() {
	const { weekId } = useParams();
	const [week, setWeek] = useState(null);
	const [teacher, setTeacher] = useState(null);
	const [html, setHtml] = useState("");

	useEffect(() => {
		async function load() {
			const w = await getDoc(doc(db, "weeks", weekId));
			setWeek(w.exists() ? { id: w.id, ...w.data() } : null);
			const t = await getDoc(doc(db, "materials_teacher", weekId));
			if (t.exists()) {
				const data = t.data();
				setTeacher(data);
				let resolved = data.guideHtml || "";
				if (!resolved) {
					const candidates = [
						data.guideHtmlPath,
						data.htmlPath,
						data.guidePath,
						data.path,
					].filter(Boolean);
					for (const path of candidates) {
						try {
							if (/^https?:\/\//i.test(path)) {
								resolved = await fetch(path).then((res) => res.text());
							} else {
								const url = await getDownloadURL(ref(storage, path));
								resolved = await fetch(url).then((res) => res.text());
							}
							if (resolved) break;
						} catch (e) {
							// continue
						}
					}
					if (!resolved && data.guideUrl) {
						try {
							resolved = await fetch(data.guideUrl).then((res) => res.text());
						} catch (e) {
							resolved = "";
						}
					}
				}
				setHtml(resolved);
			} else {
				setTeacher(null);
				setHtml("");
			}
		}
		load();
	}, [weekId]);

	if (!week) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16">
				<h1 className="text-3xl font-bold">Chapter not found</h1>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-16">
			<h1 className="text-3xl font-bold">Teacher materials for Chapter {week.index}</h1>
			{teacher ? (
				<>
					<div className="prose mt-6" dangerouslySetInnerHTML={{ __html: html }} />
					{teacher.answerKeyNote && (
						<div className="mt-6 rounded border p-4">
							<h2 className="font-semibold">Answer key notes</h2>
							<p className="text-sm text-gray-700">{teacher.answerKeyNote}</p>
						</div>
					)}
				</>
			) : (
				<p className="mt-6 text-sm text-gray-600">Teacher materials coming soon.</p>
			)}
			<div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<Link
					to="/weeks"
					className="block w-full text-center px-5 py-2.5 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 transition-colors duration-200"
				>
					Back to Coursework
				</Link>
			</div>
		</div>
	);
}


