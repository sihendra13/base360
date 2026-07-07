import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import ActiveTheoryPage from './ActiveTheoryPage';

function App() {
  const [heroMode, setHeroMode] = useState('hero-b'); // Default to Option B

  // Initialize smooth scrolling Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <ActiveTheoryPage heroMode={heroMode} />
    </>
  );
}

export default App;
