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
      { root: document.getElementById('chat-container'), threshold: 0.8 },
    ),
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
