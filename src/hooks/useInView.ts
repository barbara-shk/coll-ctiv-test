"use client";

import { useEffect, useRef, useState } from "react";

// One-shot scroll-reveal trigger: 
// flips inView true the first time the element crosses `threshold`,
// then disconnects so the animation never replays.

export function useInView<TargetElement extends Element>(visibilityThreshold = 0.3) {
  const targetRef = useRef<TargetElement>(null);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  useEffect(() => {
    const targetElement = targetRef.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([firstEntry]) => {
        if (firstEntry.isIntersecting) {
          setHasBeenSeen(true);
          observer.disconnect();
        }
      },
      { threshold: visibilityThreshold }
    );

    observer.observe(targetElement);
    return () => observer.disconnect();
  }, [visibilityThreshold]);

  return { ref: targetRef, inView: hasBeenSeen };
}
