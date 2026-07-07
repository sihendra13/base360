import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StoryCard from './StoryCard';

export default function CarouselJourney() {
  const containerRef = useRef(null);
  
  // Section tinggi 600vh agar scroll panjang
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Putaran Ekstrem 360 Derajat
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, -360]);

  // Data 6 panel (cerita Base360) menggunakan video lokal yang anti-gagal
  const panels = [
    { id: 1, title: "The Hook", desc: "TikTok comment masuk", video: "/video.mp4" },
    { id: 2, title: "AI Takeover", desc: "Base360 membalas otomatis", video: "/video.mp4" },
    { id: 3, title: "Closing in DMs", desc: "AI bertindak sebagai CS", video: "/video.mp4" },
    { id: 4, title: "Data Captured", desc: "Lead masuk ke CRM", video: "/video.mp4" },
    { id: 5, title: "Voice Agent", desc: "AI menelpon pelanggan", video: "/video.mp4" },
    { id: 6, title: "Revenue Gen.", desc: "Deal Closed", video: "/video.mp4" },
  ];

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '600vh', background: 'transparent', zIndex: 10 }}>
      
      {/* Sticky Container (Layar terkunci) */}
      <div style={{ 
        position: 'sticky', top: 0, height: '100vh', display: 'flex', 
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        perspective: '2000px' // Perspektif dijauhkan (dari 1200px) agar efek kamera lebih elegan/luas
      }}>
        
        {/* Latar Belakang Cahaya Active Theory */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          filter: 'blur(40px)'
        }} />

        {/* Inti Cahaya Tengah Menggunakan Video Colorful */}
        <div style={{ position: 'absolute', width: '300px', height: '600px', zIndex: 0, transform: 'translateZ(-150px)' }}>
          <video 
            src="/Lighting colorful.mp4"
            autoPlay loop muted playsInline
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'blur(40px) brightness(1.2)',
              mixBlendMode: 'screen',
              borderRadius: '50px'
            }}
          />
        </div>

        {/* 3D Carousel Container */}
        <motion.div style={{
          position: 'relative',
          width: '290px',  // Dibesarkan sedikit (tadi 260px)
          height: '520px', // Dibesarkan sedikit (tadi 460px)
          transformStyle: 'preserve-3d', 
          rotateY: rotationY, 
          z: -200, // Dimajukan sedikit (tadi -400px)
          zIndex: 10
        }}>
          
          {panels.map((panel, index) => {
            const angle = index * 60;
            // Radius putaran disesuaikan agar pas dengan ukuran baru
            const radius = 550 + (index % 2 === 0 ? 30 : -20);
            const yOffset = (index % 2 === 0 ? 40 : -30); // Naik turun sedikit
            const tiltX = (index % 3 === 0 ? 5 : (index % 2 === 0 ? -4 : 2)); // Miring sedikit

            return (
              <div key={panel.id} style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                // Transform dengan distorsi
                transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px) rotateX(${tiltX}deg)`,
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.5)',
                background: 'rgba(20, 20, 25, 0.5)',
                boxShadow: '0 0 50px rgba(0, 240, 255, 0.3)',
                transformStyle: 'preserve-3d'
              }}>
                <StoryCard panel={panel} />
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
