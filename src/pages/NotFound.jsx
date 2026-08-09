import { Link } from "react-router-dom";
import Magnetic from "../components/Magnetic";

export default function NotFound() {
    return (
        <div className="container-wide flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
            <div className="serif text-[24vw] font-medium leading-none text-ink sm:text-[16rem]">4<span className="text-accent">0</span>4</div>
            <h1 className="serif mt-2 text-2xl font-medium text-ink">This page went off-distribution.</h1>
            <p className="mt-3 max-w-md text-ink2">We couldn't find what you were looking for. Let's get you back to something useful.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnetic strength={0.4}><Link to="/" className="btn-primary" data-cursor>Back home</Link></Magnetic>
                <Magnetic strength={0.4}><Link to="/demo" className="btn-ghost" data-cursor>Try the demo</Link></Magnetic>
            </div>
        </div>
    );
}
