// src/context/ClassProvider.jsx
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthProvider";

const ClassCtx = createContext(null);

export function ClassProvider({ children }) {
    const { user, loading } = useAuth();
    const [memberships, setMemberships] = useState([]);
    const [currentClassId, setCurrentClassId] = useState(
        () => {
            // Only read from localStorage if user is authenticated
            if (typeof window !== "undefined") {
                try {
                    return localStorage.getItem("currentClassId") || "";
                } catch {
                    return "";
                }
            }
            return "";
        }
    );
    const hasAutoSelectedRef = useRef(false);

    useEffect(() => {
        async function load() {
            // Wait for auth to finish loading
            if (loading) return;
            
            if (!user) {
                setMemberships([]);
                setCurrentClassId("");
                hasAutoSelectedRef.current = false;
                try {
                    localStorage.removeItem("currentClassId");
                } catch {
                    // Ignore localStorage errors
                }
                return;
            }
            try {
                const q = query(collection(db, "class_members"), where("uid", "==", user.uid));
                const snap = await getDocs(q);
                const rows = snap.docs.map(d => d.data());
                setMemberships(rows);
                // Auto-select if there's exactly one class and we haven't auto-selected yet
                if (!hasAutoSelectedRef.current && !currentClassId && rows.length === 1) {
                    setCurrentClassId(rows[0].classId);
                    hasAutoSelectedRef.current = true;
                    try {
                        localStorage.setItem("currentClassId", rows[0].classId);
                    } catch {
                        // Ignore localStorage errors
                    }
                }
            } catch (error) {
                console.error("Error loading class memberships:", error);
                setMemberships([]);
            }
        }
        load();
    }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const context = useContext(ClassCtx);
    // Return safe defaults if context is not available
    if (!context) {
        return { memberships: [], currentClassId: "", choose: () => {} };
    }
    return context;
}
