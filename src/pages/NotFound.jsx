import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl font-bold tracking-tight text-ink">404</div>
            <h1 className="mt-3 text-xl font-semibold text-ink">Page not found</h1>
            <p className="mt-2 max-w-md text-muted">We couldn't find what you were looking for.</p>
            <Link to="/" className="btn-brand mt-8">Back home</Link>
        </div>
    );
}
