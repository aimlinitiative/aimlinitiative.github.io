import { useLayoutEffect, useState } from "react";

/* Centers of anchor elements relative to a container, from offsets (so CSS
 * transforms on the way never skew them). Re-measures on container resize. */
function measure(container, anchors) {
    return anchors.map((a) => {
        let x = a.offsetWidth / 2, y = a.offsetHeight / 2, el = a;
        while (el && el !== container) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
        return [x, y];
    });
}

export default function useAnchors(containerRef, anchorRefs) {
    const [pts, setPts] = useState([]);
    useLayoutEffect(() => {
        const c = containerRef.current;
        if (!c) return;
        const run = () => {
            const els = anchorRefs.current.filter(Boolean);
            const next = measure(c, els);
            setPts((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
        };
        run();
        const ro = new ResizeObserver(run);
        ro.observe(c);
        return () => ro.disconnect();
    }, [containerRef, anchorRefs]);
    return pts;
}

