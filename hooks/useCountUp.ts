import { useState, useEffect, useRef } from 'react';

const useCountUp = (end: number | null, duration: number = 2000): number => {
  const [count, setCount] = useState(0);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  // FIX: Initialize useRef with null. `useRef<T>()` is invalid; it must be `useRef<T>(initialValue)`.
  const animationFrameId = useRef<number | null>(null);
  const prevEndRef = useRef<number | null>(null);

  useEffect(() => {
    if (end === null) {
      setCount(0); // Reset if value becomes null
      prevEndRef.current = null;
      return;
    }
    
    // Animate from previous value if it exists, otherwise from 0
    const start = prevEndRef.current ?? 0;
    let frame = 0;

    const counter = () => {
      frame++;
      const progress = easeOutCubic(frame / totalFrames);
      const currentCount = start + (end - start) * progress;
      setCount(currentCount);

      if (frame < totalFrames) {
        animationFrameId.current = requestAnimationFrame(counter);
      } else {
        // Ensure the final value is exact
        setCount(end);
        prevEndRef.current = end;
      }
    };

    animationFrameId.current = requestAnimationFrame(counter);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [end, duration]);

  return count;
};

// Easing function for a more natural animation
const easeOutCubic = (t: number): number => --t * t * t + 1;

export default useCountUp;
