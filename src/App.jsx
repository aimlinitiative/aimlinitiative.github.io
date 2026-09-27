import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { DUR, EASE } from "./lib/motion";

export default function App() {
    return (
        <BrowserRouter>
            {/* reducedMotion="user": motion drops transform/layout animation for people who ask for less motion */}
            <MotionConfig reducedMotion="user" transition={{ duration: DUR.base, ease: EASE.out }}>
                <div className="flex min-h-screen flex-col bg-bg text-ink">
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
