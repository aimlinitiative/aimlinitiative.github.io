// src/utils/progress.js
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function setProgressFlag(uid, classId, weekId, field, value) {
    const id = `${uid}_${weekId}_${classId}`;
    await setDoc(doc(db, "progress", id), {
        uid, classId, weekId,
        [field]: value,
        lastUpdated: serverTimestamp(),
    }, { merge: true });
}

export async function updateProgress(uid, classId, weekId, data) {
    const id = `${uid}_${weekId}_${classId}`;
    await setDoc(doc(db, "progress", id), {
        uid, classId, weekId,
        ...data,
        lastUpdated: serverTimestamp(),
    }, { merge: true });
}
