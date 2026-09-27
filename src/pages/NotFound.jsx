import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "../lib/motion";

/* 404 as a poster (DESIGN.md): the number at display-2xl in ink, the message
 * two-toned beneath it in faint, one Action Blue way home. Left-aligned, like
 * every light room. The digits rise and un-blur one after another. */

const Stack = motion.div;
const Digit = motion.span;
const Line = motion.span;
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
        <section className="section-y bg-canvas">
            <Stack className="container-page flex min-h-[50svh] flex-col justify-center"
                variants={stack} initial={reduce ? false : "hidden"} animate="show">
                <h1 className="display">
                    <span className="sr-only">404. </span>
                    <span aria-hidden="true" className="block text-display-2xl tabular-nums text-ink">
                        {["4", "0", "4"].map((d, i) => (
                            <Digit key={i} variants={digit} className="inline-block">{d}</Digit>
                        ))}
                    </span>
                    <Line variants={part} className="mt-3 block text-balance text-display-lg text-faint">Page not found</Line>
                </h1>
                <Part variants={part}>
                    <p className="mt-6 max-w-measure text-pretty text-lead text-muted">We couldn't find what you were looking for.</p>
                </Part>
                <Part variants={part} className="mt-10">
                    <Link to="/" className="btn-accent">Back home</Link>
                </Part>
            </Stack>
        </section>
    );
}
