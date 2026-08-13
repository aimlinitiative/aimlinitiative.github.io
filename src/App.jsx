// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SideRail from "./components/SideRail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <BrowserRouter>
            <div className="relative flex min-h-screen flex-col bg-bg">
                <div className="grain" aria-hidden="true" />
                <Navbar />
                <SideRail />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
