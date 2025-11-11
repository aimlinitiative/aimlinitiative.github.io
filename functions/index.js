// functions/index.js
// eslint-disable-next-line no-undef
const functions = require("firebase-functions");
// eslint-disable-next-line no-undef
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// eslint-disable-next-line no-undef
require('dotenv').config(); // at top

// helper
async function assertTeacher(uid) {
    const prof = await db.doc(`users/${uid}`).get();
    if (prof.data()?.role !== "educator") {
        throw new functions.https.HttpsError("permission-denied", "Educator only");
    }
}

// eslint-disable-next-line no-undef
exports.createClass = functions.https.onCall(async (data, context) => {
    if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Sign in required");
    const uid = context.auth.uid;
    await assertTeacher(uid);

    const name = (data.name || "").trim();
    if (!name) throw new functions.https.HttpsError("invalid-argument", "Class name required");

    // unique code
    let code = "";
    for (let i = 0; i < 20; i++) {
        const candidate = Math.random().toString(36).slice(2, 8).toUpperCase();
        const existing = await db.collection("classes").where("code", "==", candidate).limit(1).get();
        if (existing.empty) { code = candidate; break; }
    }
    if (!code) throw new functions.https.HttpsError("resource-exhausted", "Could not generate class code");


    const ref = await db.collection("classes").add({
        ownerUid: uid,
        name,
        code,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await db.doc(`class_members/${ref.id}_${uid}`).set({
        classId: ref.id,
        uid,
        role: "educator",
    });

    return { classId: ref.id, code };
});

// eslint-disable-next-line no-undef
exports.joinClassByCode = functions.https.onCall(async (data, context) => {
    if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Sign in required");
    const uid = context.auth.uid;
    const code = (data.code || "").trim().toUpperCase();
    if (!code) throw new functions.https.HttpsError("invalid-argument", "Code required");

    const snap = await db.collection("classes").where("code", "==", code).limit(1).get();
    if (snap.empty) throw new functions.https.HttpsError("not-found", "Class not found");
    const cls = snap.docs[0];
    const classId = cls.id;

    await db.doc(`class_members/${classId}_${uid}`).set({
        classId,
        uid,
        role: "student",
    }, { merge: true });

    return { classId };
});

// eslint-disable-next-line no-undef
exports.gradeQuiz = functions.https.onCall(async (data, context) => {
    if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Sign in required");
    const uid = context.auth.uid;
    const { quizId, classId, answers } = data || {};
    if (!quizId || !classId || !answers) throw new functions.https.HttpsError("invalid-argument", "Missing fields");

    const keyDoc = await db.doc(`quiz_answers/${quizId}`).get();
    if (!keyDoc.exists) throw new functions.https.HttpsError("not-found", "Answer key missing");
    const key = keyDoc.data().key || {};
    const weekId = keyDoc.data().weekId;

    let score = 0;
    let total = 0;
    const breakdown = [];
    for (const q of Object.keys(key)) {
        total += 1;
        const selected = Object.prototype.hasOwnProperty.call(answers, q) ? answers[q] : null;
        const isCorrect = selected === key[q];
        if (isCorrect) score += 1;
        breakdown.push({
            id: q,
            correctAnswer: key[q],
            selected,
            isCorrect,
        });
    }
    const percent = total ? Math.round((score * 100) / total) : 0;

    const attemptRef = await db.collection("attempts").add({
        quizId,
        uid,
        classId,
        answers,
        score,
        percent,
        autoGraded: true,
        submittedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // optional progress update
    if (weekId) {
        await db.doc(`progress/${uid}_${weekId}_${classId}`).set({
            uid, classId, weekId, status: "completed",
            lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
    }

    return { attemptId: attemptRef.id, score, percent, breakdown, total };
});


// set an env var: firebase functions:config:set importer.secret="YOUR_SHARED_SECRET"
// eslint-disable-next-line no-undef
const IMPORTER_SECRET = process.env.IMPORTER_SECRET || "";

// eslint-disable-next-line no-undef
exports.importQuiz = functions.https.onRequest(async (req, res) => {
    try {
        // 1️⃣ Check that the request is allowed
        const secret = req.get("x-import-secret");
        // eslint-disable-next-line no-undef
        if (!process.env.IMPORTER_SECRET || secret !== process.env.IMPORTER_SECRET) {
            return res.status(401).send("Unauthorized");
        }

        // 2️⃣ Then validate the body
        if (req.method !== "POST") return res.status(405).send("Use POST");

        const { quizId, weekId, title, questions, key } = req.body || {};
        if (!quizId || !title || !Array.isArray(questions) || !key) {
            return res.status(400).send("Missing fields");
        }

        // 3️⃣ Write to Firestore
        await db.collection("quizzes").doc(quizId).set({
            weekId: weekId || "",
            title,
            questions,
        });

        await db.collection("quiz_answers").doc(quizId).set({
            weekId: weekId || "",
            key,
        });

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});