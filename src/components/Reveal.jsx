import { useEffect, useRef, useState } from "react";

// Wraps children and fades/slides them in when scrolled into view.
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setShown(true);
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`reveal ${shown ? "is-visible" : ""} ${className}`}
        >
            {children}
        </Tag>
    );
}
