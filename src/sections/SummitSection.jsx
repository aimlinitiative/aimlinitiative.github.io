import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Summit from "../components/Summit";

/* The page's one dark band. The panel grows from an inset card to full size as
 * it scrolls in (scale 0.92 -> 1, corners 48px -> 28px). data-nav-theme sits on
 * the panel, not the section, so the navbar only turns dark over the dark part.
 * Nothing inside is sticky, and nothing here clips overflow. */
export default function SummitSection() {
    const panelRef = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: panelRef, offset: ["start end", "start 0.25"] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], [48, 28]);

    return (
        <section id="summit" aria-labelledby="summit-title" className="bg-bg px-3 py-6 sm:px-5 md:py-10">
            <Motion.div
                ref={panelRef}
                data-nav-theme="dark"
                className="mx-auto w-full max-w-[1400px] rounded-2xl bg-dark py-22 text-dark-ink md:py-30"
                style={reduce ? undefined : { scale, borderRadius }}
            >
                <Summit />
            </Motion.div>
        </section>
    );
}
