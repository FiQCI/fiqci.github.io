import { useState, useEffect } from "react";

export const useWindowSize = () => {
    const [width, setWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', onResize);
        // In case the window was resized before the listener attached
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return { width };
}