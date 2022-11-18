import { useEffect, useRef } from 'react';

export const useScrollReveal = (
  options?: scrollReveal.ScrollRevealObjectOptions
) => {
  const currentRef = useRef(null);
  useEffect(() => {
    async function Animate() {
      if (currentRef.current) {
        const sr = (await import('scrollreveal')).default;
        if (options) {
          sr({
            origin: 'top',
            distance: '50px',
            duration: 2000,
            delay: 100,
          }).reveal(currentRef.current, options);
        } else {
          sr({
            origin: 'top',
            distance: '50px',
            duration: 2500,
            delay: 50,
          }).reveal(currentRef.current);
        }
      }
    }
    Animate();
  });
  return currentRef;
};
