// src/context/ClassProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthProvider";

const ClassCtx = createContext(null);

export function ClassProvider({ children }) {
    const { user } = useAuth();
    const [memberships, setMemberships] = useState([]);
    const [currentClassId, setCurrentClassId] = useState(
        () => localStorage.getItem("currentClassId") || ""
    );

    useEffect(() => {
        async function load() {
            if (!user) {
                setMemberships([]);
                setCurrentClassId("");
                localStorage.removeItem("currentClassId");
                return;
            }
            const q = query(collection(db, "class_members"), where("uid", "==", user.uid));
            const snap = await getDocs(q);
            const rows = snap.docs.map(d => d.data());
            setMemberships(rows);
            if (!currentClassId && rows.length === 1) {
                setCurrentClassId(rows[0].classId);
                localStorage.setItem("currentClassId", rows[0].classId);
            }
        }
        load();
    }, [user]); // eslint-disable-line

    function choose(id) {
        setCurrentClassId(id);
        localStorage.setItem("currentClassId", id);
    }

    return (
        <ClassCtx.Provider value={{ memberships, currentClassId, choose }}>
            {children}
        </ClassCtx.Provider>
    );
}

export function useClass() {
    return useContext(ClassCtx);
}
