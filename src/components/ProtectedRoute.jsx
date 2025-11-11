// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProtectedRoute({ children, requireRole }) {
    const { user, profile, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    if (requireRole && profile?.role !== requireRole) return <Navigate to="/" replace />;
    return children;
}
