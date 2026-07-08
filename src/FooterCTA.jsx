import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FooterCTA() {
  const containerRef = useRef(null);
  
  // Animate solid white text opacity based on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center center"] 
  });
  
  // Fades from 0 (video mask visible) to 1 (solid white text)
  const whiteTextOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <section ref={containerRef} style={{ 
      height: '100vh', width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', zIndex: 10,
      backgroundColor: '#000', // Pure black required for multiply blend mode to work seamlessly
      overflow: 'hidden'
    }}>
      
      <div style={{ textAlign: 'center', zIndex: 2, width: '100%' }}>
        
        {/* TEXT MASK CONTAINER */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '40px', backgroundColor: '#000' }}>
          
          {/* 1. Base Text (Invisible, just to give the container physical size) */}
          <h2 style={{ 
            fontSize: '6vw', fontWeight: 900, margin: 0, 
            letterSpacing: '-1px', opacity: 0 
          }}>
            Ready to Automate?
          </h2>

          {/* 2. White Text (This gets multiplied by the video) */}
          <h2 style={{ 
            position: 'absolute', inset: 0,
            fontSize: '6vw', fontWeight: 900, color: '#fff', margin: 0, 
            letterSpacing: '-1px' 
          }}>
            Ready to Automate?
          </h2>

          {/* 3. The Video (Multiply blend mode masks it perfectly inside the white text) */}
          <video 
            src="/Hero_Image_ok.mp4" 
            autoPlay loop muted playsInline
            style={{ 
              position: 'absolute', inset: 0, width: '100%', height: '100%', 
              objectFit: 'cover', mixBlendMode: 'multiply', pointerEvents: 'none' 
            }}
          />

          {/* 4. Solid Glowing White Text (Fades in over the video as user scrolls) */}
          <motion.h2 style={{ 
            position: 'absolute', inset: 0,
            fontSize: '6vw', fontWeight: 900, color: '#fff', margin: 0, 
            letterSpacing: '-1px', opacity: whiteTextOpacity,
            textShadow: '0 0 40px rgba(255,255,255,0.6)'
          }}>
            Ready to Automate?
          </motion.h2>

        </div>
        
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          {/* Tombol Utama */}
          <button style={{
            background: '#00F0FF',
            color: '#000',
            border: 'none', borderRadius: '8px',
            padding: '16px 40px', fontSize: '18px', fontWeight: 'bold',
            cursor: 'pointer', outline: 'none',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseOver={(e) => { 
            e.currentTarget.style.transform = 'scale(1.05)'; 
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.6)'; 
          }}
          onMouseOut={(e) => { 
            e.currentTarget.style.transform = 'scale(1)'; 
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.4)'; 
          }}>
            Book Live Demo
          </button>
        </div>
      </div>

      {/* Footer Minimalis */}
      <div style={{ 
        position: 'absolute', bottom: '40px', width: '100%', 
        display: 'flex', justifyContent: 'space-between', padding: '0 60px', 
        fontSize: '12px', color: '#666', letterSpacing: '2px', fontWeight: 'bold', zIndex: 2 
      }}>
        <div>© 2026 BASE360 | All Right Reserved | Hendra Fitriadi | nilakayuwangi@gmail.com</div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#666'}>LINKEDIN</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#666'}>TWITTER</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#666'}>INSTAGRAM</span>
        </div>
      </div>
    </section>
  );
}
