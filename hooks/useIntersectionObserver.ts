import { useEffect, useState, useRef, MutableRefObject } from 'react';

interface UseIntersectionObserverArgs {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverArgs = {}): [MutableRefObject<HTMLDivElement | null>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const frozen = useRef(false);
 
  useEffect(() => {
    const node = ref.current;
    if (!node || frozen.current) return;
 
    // Fallback: toon de content sowieso na 1 seconde als de observer niet afgaat
    const timeoutId = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
        frozen.current = true;
      }
    }, 1000);

    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (freezeOnceVisible) {
              frozen.current = true;
              observer.disconnect();
              clearTimeout(timeoutId);
            }
          } else if (!freezeOnceVisible) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(node);
      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
      };
    } else {
      // Fallback for older browsers
      setIsVisible(true);
      frozen.current = true;
      clearTimeout(timeoutId);
    }
  }, [threshold, rootMargin, freezeOnceVisible]);

  return [ref, isVisible];
}