// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/chrome/SmoothScroll";
import ScrollProgress from "./components/chrome/ScrollProgress";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <BrowserRouter>
            {/* reducedMotion="user": motion drops transform/layout animation for people who ask for less motion */}
            <MotionConfig reducedMotion="user">
                <SmoothScroll />
                <ScrollProgress />
                <div className="flex min-h-screen flex-col bg-white">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </MotionConfig>
        </BrowserRouter>
    );
}
