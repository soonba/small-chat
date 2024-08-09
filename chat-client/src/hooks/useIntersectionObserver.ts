import { useCallback, useRef } from 'react';

const useIntersectionObserver = (callback: () => void) => {
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callback();
                    }
                });
            },
            { threshold: 0.8, root: document.getElementById('chat-container') }
        )
    );

    const observe = useCallback((element: Element) => {
        observer.current.observe(element);
    }, []);

    const unobserve = useCallback((element: Element) => {
        observer.current.unobserve(element);
    }, []);

    return [observe, unobserve];
};

export default useIntersectionObserver;
