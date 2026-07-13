import { useState, useEffect, useRef } from 'react';

export function useScrollThreshold(threshold = 0.15) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Triggers true when the div enters the window, false when it leaves completely
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null, // monitors the main browser viewport
        threshold: threshold, // 0.15 means 15% of the div must be visible to trigger
        rootMargin: "0px 0px -50px 0px" // Adds a tiny buffer so it animates cleanly just before hitting the bottom
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  // Returns both the ref anchor and the reactive styling string
  return {
    ref: elementRef,
    className: isIntersecting
      ? 'opacity-100 translate-y-0 scale-100 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)'
      : 'opacity-0 translate-y-12 scale-95 pointer-events-none transition-all duration-500'
  };
}
