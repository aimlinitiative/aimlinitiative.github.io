import { useSyncExternalStore } from "react";

/* useMediaQuery(query): live boolean for a CSS media query. SSR-safe (false on
 * the server), no effect flash. Handy presets: FINE_POINTER, DESKTOP. */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const DESKTOP = "(min-width: 1024px)";

export default function useMediaQuery(query) {
    return useSyncExternalStore(
        (cb) => {
            const mq = window.matchMedia(query);
            mq.addEventListener("change", cb);
            return () => mq.removeEventListener("change", cb);
        },
        () => window.matchMedia(query).matches,
        () => false
    );
}
