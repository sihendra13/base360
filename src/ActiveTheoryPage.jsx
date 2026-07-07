import React, { useState } from 'react';
import { useScroll } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import Journey from './Journey';
import CarouselJourney from './CarouselJourney';
import FooterCTA from './FooterCTA';

export default function ActiveTheoryPage({ heroMode }) {
  const [variant, setVariant] = useState('tunnel-fast'); 
  const { scrollYProgress } = useScroll();
  const showWebGL = variant.includes('webgl');
  const showGreen = variant.includes('green');
  const showColorful = variant.includes('colorful');
  const [enteredTunnel, setEnteredTunnel] = useState(false);
  const isOptionB = heroMode === 'hero-b';

  return (
    <div style={{ backgroundColor: '#0a0f1d', minHeight: '100vh' }}>
      
      {/* 1. GLOBAL BACKGROUND: WebGL Particles */}
      {showWebGL && <HeroCanvas />}
      
      {/* 2. GLOBAL BACKGROUND: Green Video */}
      {showGreen && (
        <video 
          src="/lightin green.mp4" 
          autoPlay loop muted playsInline 
          style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: 0 }} 
        />
      )}

      {/* 3. GLOBAL BACKGROUND: Colorful Video */}
      {showColorful && (
        <video 
          src="/Lighting colorful.mp4" 
          autoPlay loop muted playsInline 
          style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: 0 }} 
        />
      )}

      {/* Overlay Gelap Tipis agar Teks Tetap Terbaca */}
      <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1, pointerEvents: 'none' }} />

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Render Journey (Z-Tunnel) atau CarouselJourney sesuai pilihan */}
        {/* 4. MAIN CONTENT */}
      <Journey heroMode={heroMode} enteredTunnel={enteredTunnel} setEnteredTunnel={setEnteredTunnel} />
      
      {/* 5. ALTERNATIVE JOURNEY (Horizontal Scroll) - dipisah untuk modul terpisah jika perlu */}
      {/* <CarouselJourney /> */}
      
      {/* 6. FOOTER CTA */}
      {(!isOptionB || enteredTunnel) && <FooterCTA />}
      </main>
    </div>
  );
}
