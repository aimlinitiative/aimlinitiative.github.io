import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { scrollEase } from "../../lib/motion";

/* Site-wide smooth scrolling (Lenis) plus gliding in-page anchor links.
 * - Wheel input is eased; touch keeps the native feel (syncTouch off), and
 *   horizontal-dominant gestures are left to the browser (carousels, strips).
 * - `a[href="#id"]` clicks glide to the target, honoring its scroll-margin-top
 *   (5.5rem on sections, clearing the sticky nav), update the URL hash and move
 *   focus to the target for keyboard / screen-reader users.
 * - prefers-reduced-motion: Lenis is not created and anchors jump natively. */

export default function SmoothScroll() {
    const lenisRef = useRef(null);
    const { pathname } = useLocation();
    const lastPath = useRef(pathname);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        let lenis = null;

        const start = () => {
            if (lenis || mq.matches) return;
            lenis = new Lenis({
                autoRaf: true,
                lerp: 0.1,
                smoothWheel: true,
                syncTouch: false,
                allowNestedScroll: true,
                virtualScroll: ({ deltaX, deltaY }) => Math.abs(deltaY) >= Math.abs(deltaX),
            });
            lenisRef.current = lenis;
        };
        const stop = () => {
            lenis?.destroy();
            lenis = null;
            lenisRef.current = null;
        };
        const onPref = () => (mq.matches ? stop() : start());

        const onClick = (e) => {
            if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
            if (!a || (a.target && a.target !== "_self")) return;
            const url = new URL(a.href, window.location.href);
            const here = window.location;
            if (url.origin !== here.origin || url.pathname !== here.pathname || !url.hash) return;

            const id = decodeURIComponent(url.hash.slice(1));
            const el = document.getElementById(id);
            if (!el && id !== "top") return;
            e.preventDefault();
            if (url.hash !== here.hash) window.history.pushState(null, "", url.hash);

            const toTop = id === "top";
            const margin = el ? parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : 0;
            const destination = toTop ? 0 : el.getBoundingClientRect().top + window.scrollY - margin;
            const distance = Math.abs(destination - window.scrollY);
            const duration = Math.min(1.8, Math.max(0.9, 0.75 + distance / 4000));

            lenis.scrollTo(toTop ? 0 : el, {
                duration,
                easing: scrollEase,
                onComplete: () => {
                    if (!el || toTop) return;
                    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
                    el.focus({ preventScroll: true });
                },
            });
        };

        start();
        mq.addEventListener("change", onPref);
        document.addEventListener("click", onClick);
        return () => {
            mq.removeEventListener("change", onPref);
            document.removeEventListener("click", onClick);
            stop();
        };
    }, []);

    // New route: start at the top.
    useEffect(() => {
        if (lastPath.current === pathname) return;
        lastPath.current = pathname;
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
        else window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
