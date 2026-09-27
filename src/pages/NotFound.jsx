import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { fadeUp, group } from "../lib/motion";

export default function NotFound() {
    return (
        <Motion.div
            className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center"
            variants={group()} initial="hidden" animate="show"
        >
            <Motion.h1 variants={fadeUp} className="text-h2 text-ink">Page not found</Motion.h1>
            <Motion.p variants={fadeUp} className="mt-4 max-w-prose text-lead text-ink2">
                We couldn't find the page you were looking for.
            </Motion.p>
            <Motion.div variants={fadeUp} className="mt-8">
                <Link to="/" className="btn-secondary">Back home</Link>
            </Motion.div>
        </Motion.div>
    );
}
