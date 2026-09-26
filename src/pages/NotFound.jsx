import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "../lib/motion";

const Stack = motion.div;
const Digit = motion.span;
const Part = motion.div;

const stack = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const digit = {
    hidden: { opacity: 0, y: "40%", filter: "blur(14px)" },
    show: { opacity: 1, y: "0%", filter: "blur(0px)", transition: { duration: 1.1, ease: EASE.out } },
};
const part = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE.out } },
};

export default function NotFound() {
    const reduce = useReducedMotion();
    return (
        <Stack className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center"
            variants={stack} initial={reduce ? false : "hidden"} animate="show">
            <div className="display text-7xl font-bold tracking-tight text-ink" aria-label="404">
                {["4", "0", "4"].map((d, i) => (
                    <Digit key={i} aria-hidden="true" variants={digit} className={`inline-block ${i === 1 ? "text-gradient" : ""}`}>{d}</Digit>
                ))}
            </div>
            <Part variants={part}>
                <h1 className="display mt-3 text-xl font-semibold text-ink">Page not found</h1>
                <p className="mt-2 max-w-md text-muted">We couldn't find what you were looking for.</p>
            </Part>
            <Part variants={part}>
                <Link to="/" className="btn-accent mt-8">Back home</Link>
            </Part>
        </Stack>
    );
}
