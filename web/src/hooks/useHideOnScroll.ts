import { useState, useRef, useEffect } from 'react';

function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0);
  const scrollYThreshold = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0);

  useEffect(() => {
    function handleScroll() {
      const dir = window.pageYOffset - lastScrollY.current > 0 ? 'down' : 'up';
      lastScrollY.current = window.pageYOffset;

      if ((!hidden && dir === 'up') || (hidden && dir === 'down')) {
        lastScrollY.current = window.pageYOffset;
        scrollYThreshold.current = window.pageYOffset;

        return;
      }

      const diff = window.pageYOffset - scrollYThreshold.current;

      if (diff > 50) {
        setHidden(true);
        scrollYThreshold.current = window.pageYOffset;
      } else if (diff < -10) {
        setHidden(false);
        scrollYThreshold.current = window.pageYOffset;
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hidden, setHidden]);

  return hidden;
}

export default useHideOnScroll;
