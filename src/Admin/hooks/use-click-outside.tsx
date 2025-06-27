import { useEffect, RefObject } from "react";

export const useClickOutside = (
    refs: RefObject<HTMLElement>[],
    callback: (event: MouseEvent) => void
) => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const isOutside = refs.every((ref) => !ref?.current?.contains(event.target as Node));

            if (isOutside && typeof callback === "function") {
                callback(event);
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [callback, refs]);
};
