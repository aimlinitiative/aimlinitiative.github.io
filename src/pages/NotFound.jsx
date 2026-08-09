import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
            <div className="font-display text-7xl font-bold text-gradient">404</div>
            <h1 className="mt-4 font-display text-2xl font-bold text-white">This page went off-distribution.</h1>
            <p className="mt-3 max-w-md text-white/55">
                We couldn't find what you were looking for. Let's get you back to something useful.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/" className="btn-primary">Back home</Link>
                <Link to="/demo" className="btn-ghost">Try the demo</Link>
            </div>
        </div>
    );
}
