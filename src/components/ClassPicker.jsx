// src/components/ClassPicker.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useClass } from "../context/ClassProvider";
import { db } from "../lib/firebase";

export default function ClassPicker() {
    const { memberships, currentClassId, choose } = useClass();
    const [names, setNames] = useState({});

    useEffect(() => {
        async function load() {
            const res = {};
            for (const m of memberships) {
                const d = await getDoc(doc(db, "classes", m.classId));
                if (d.exists()) res[m.classId] = d.data().name;
            }
            setNames(res);
        }
        load();
    }, [memberships]);

    if (!memberships.length) return null;

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">Class:</span>
            <select
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                value={currentClassId}
                onChange={e => choose(e.target.value)}
            >
                <option value="">Select a class</option>
                {memberships.map(m => (
                    <option key={m.classId} value={m.classId}>
                        {names[m.classId] || m.classId}
                    </option>
                ))}
            </select>
        </div>
    );
}
