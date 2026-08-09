// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Particles from "./components/Particles";

import Home from "./pages/Home";
import About from "./pages/About";
import Program from "./pages/Program";
import Demo from "./pages/Demo";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }, [pathname]);
    return null;
}

function Spotlight() {
    useEffect(() => {
        const onMove = (e) => {
            document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
            document.documentElement.style.setProperty("--my", `${e.clientY}px`);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
    }, []);
    return <div className="bg-spotlight" aria-hidden="true" />;
}

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="bg-mesh" aria-hidden="true" />
            <div className="bg-grid" aria-hidden="true" />
            <Particles />
            <Spotlight />
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/program" element={<Program />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
