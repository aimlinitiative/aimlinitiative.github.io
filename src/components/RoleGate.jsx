// src/components/RoleGate.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function RoleGate({ children }) {
	const { user, profile, loading } = useAuth();
	if (loading) return null;
	if (!user) return <Navigate to="/login" replace />;
	if (!profile?.role) return <Navigate to="/role" replace />;
	return children;
}


