// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import JoinClass from "./pages/JoinClass";
import WeekList from "./pages/WeekList";
import WeekDetail from "./pages/WeekDetail";
import WeekTeacher from "./pages/WeekTeacher";
import Quiz from "./pages/Quiz";
import Colab from "./pages/Colab";
import {ClassProvider} from "./context/ClassProvider.jsx";
import RoleGate from "./components/RoleGate.jsx";
import RoleSelect from "./pages/RoleSelect.jsx";
import Progress from "./pages/Progress.jsx";
import Profile from "./pages/Profile.jsx";


export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ClassProvider>
                <div className="flex min-h-screen flex-col bg-gray-50">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/resources" element={<Resources />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/role" element={<RoleSelect />} />

                            <Route path="/classes" element={
                                <ProtectedRoute requireRole="educator"><Classes /></ProtectedRoute>
                            } />
                            <Route path="/classes/:classId" element={<RoleGate><ClassDetail /></RoleGate>} />
                            <Route path="/join" element={<RoleGate><JoinClass /></RoleGate>} />

                            <Route path="/weeks" element={<WeekList />} />
                            <Route path="/weeks/:weekId" element={<WeekDetail />} />
                            <Route path="/weeks/:weekId/teacher" element={
                                <ProtectedRoute requireRole="educator"><WeekTeacher /></ProtectedRoute>
                            } />

                            <Route path="/colab/:weekId" element={<Colab />} />
                            <Route path="/quiz/:quizId" element={<Quiz />} />
                            <Route path="/progress" element={<RoleGate><Progress /></RoleGate>} />
                            <Route path="/profile" element={<RoleGate><Profile /></RoleGate>} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
                </ClassProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
