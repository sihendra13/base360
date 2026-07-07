import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero({ variant, heroMode }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Teks Raksasa Muncul (Digunakan di semua opsi)
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.35, 0.5], [150, 0]);
  const textScale = useTransform(scrollYProgress, [0.8, 1], [1, 0.9]);

  // ANIMASI OPSI A: DATA SWARM
  const swarmOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const swarmZ = useTransform(scrollYProgress, [0, 0.4], [0, 500]); // Melaju ke kamera
  const swarmY = useTransform(scrollYProgress, [0, 0.4], [0, -1000]); // Terbang ke atas

  // ANIMASI OPSI B: HOLOGRAPHIC PHONE
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const phoneRotateZ = useTransform(scrollYProgress, [0, 0.4], [-30, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.4], [1, 5]); // Membesar menjadi pintu masuk
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);

  // ANIMASI OPSI C: AI CORE
  const coreScale = useTransform(scrollYProgress, [0, 0.4], [1, 10]); // Meledak
  const coreOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const ring1Rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const ring2Rotate = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const ring3Rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <section ref={containerRef} style={{ height: '300vh', position: 'relative', zIndex: 10 }}>
       
       <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', perspective: '1000px' }}>
          
          {/* =========================================
              OPSI A: THE DATA SWARM 
              ========================================= */}
          {heroMode === 'hero-a' && (
            <motion.div style={{ opacity: swarmOpacity, z: swarmZ, y: swarmY, position: 'absolute', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
              {/* Balon Chat Terbang */}
              <div style={{ position: 'absolute', left: '20%', top: '60%', background: '#fff', padding: '10px 20px', borderRadius: '20px 20px 20px 0', fontSize: '12px', fontWeight: 'bold' }}>"Where is the store?"</div>
              <div style={{ position: 'absolute', right: '15%', top: '40%', background: '#00F0FF', color: '#000', padding: '10px 20px', borderRadius: '20px 20px 0 20px', fontSize: '12px', fontWeight: 'bold' }}>"Yes, I want the promo!"</div>
              <div style={{ position: 'absolute', left: '40%', top: '70%', background: '#fff', padding: '10px 20px', borderRadius: '20px', fontSize: '20px' }}>👍</div>
              <div style={{ position: 'absolute', right: '30%', top: '80%', background: '#ef4444', color: '#fff', padding: '10px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>1,402 New Messages</div>
              <div style={{ position: 'absolute', left: '10%', top: '30%', background: '#22c55e', color: '#fff', padding: '10px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>Payment Received: $8.00</div>
              
              {/* Partikel Cahaya */}
              {[...Array(15)].map((_, i) => (
                <div key={i} style={{ 
                  position: 'absolute', 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`, 
                  width: '6px', height: '6px', 
                  background: '#00F0FF', borderRadius: '50%', 
                  boxShadow: '0 0 20px #00F0FF' 
                }} />
              ))}
            </motion.div>
          )}

          {/* =========================================
              OPSI B: HOLOGRAPHIC PHONE
              ========================================= */}
          {heroMode === 'hero-b' && (
            <motion.div 
              style={{ 
                opacity: phoneOpacity, 
                rotateX: phoneRotateX, 
                rotateZ: phoneRotateZ, 
                scale: phoneScale,
                position: 'absolute',
                width: '300px', height: '600px',
                border: '4px solid rgba(0, 240, 255, 0.5)',
                borderRadius: '32px',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 50px rgba(0,240,255,0.2), inset 0 0 30px rgba(0,240,255,0.2)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {/* UI Abstrak di dalam HP */}
              <div style={{ width: '60%', height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', marginBottom: '20px' }} />
              <div style={{ width: '80%', height: '40px', background: 'rgba(0, 240, 255, 0.3)', borderRadius: '10px', marginBottom: '10px' }} />
              <div style={{ width: '80%', height: '40px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', marginBottom: '10px' }} />
              <div style={{ width: '80%', height: '40px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', marginBottom: '10px' }} />
              
              <div style={{ position: 'absolute', top: -20, right: -20, background: '#ef4444', color: '#fff', padding: '10px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>99+ Messages</div>
            </motion.div>
          )}

          {/* =========================================
              OPSI C: THE AI CORE
              ========================================= */}
          {heroMode === 'hero-c' && (
            <motion.div 
              style={{ 
                opacity: coreOpacity, 
                scale: coreScale,
                position: 'absolute',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {/* Bola Tengah -> Teks 360 Animasi */}
              <motion.div 
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '64px', fontWeight: '900', color: '#fff', 
                  textShadow: '0 0 20px #00F0FF, 0 0 40px #a855f7',
                  position: 'absolute'
                }}
                animate={{ 
                  scale: [1, 1.15, 1], 
                  filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                360
              </motion.div>
              
              {/* Cincin 1 */}
              <motion.div style={{ position: 'absolute', width: '120px', height: '120px', borderTop: '4px solid #00F0FF', borderBottom: '4px solid #00F0FF', borderRadius: '50%', rotateZ: ring1Rotate }} />
              
              {/* Cincin 2 */}
              <motion.div style={{ position: 'absolute', width: '180px', height: '180px', borderLeft: '2px solid #a855f7', borderRight: '2px solid #a855f7', borderRadius: '50%', rotateX: '60deg', rotateZ: ring2Rotate }} />
              
              {/* Cincin 3 */}
              <motion.div style={{ position: 'absolute', width: '240px', height: '240px', border: '1px dashed rgba(255,255,255,0.5)', borderRadius: '50%', rotateY: '70deg', rotateZ: ring3Rotate }} />
            </motion.div>
          )}


          {/* FASE 2: Judul Raksasa & Deskripsi (Sama untuk semua opsi) */}
          <motion.div 
            style={{ 
              opacity: textOpacity, 
              y: textY,
              scale: textScale,
              position: 'absolute', 
              width: '100%', 
              padding: '0 8%', 
              display: 'flex', 
              justifyContent: variant === 'carousel-colorful' ? 'space-between' : 'flex-start', 
              alignItems: 'center',
              gap: variant === 'carousel-colorful' ? '0' : '6vw', 
              color: '#fff'
            }}
          >
             <h1 style={{ fontWeight: 900, lineHeight: 0.85, letterSpacing: '-2px', textShadow: '0 20px 40px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '4.5vw', color: '#ddd', letterSpacing: '8px', marginLeft: '6px' }}>BASE</span>
                <span style={{ fontSize: '15vw', color: '#fff' }}>360</span>
             </h1>
             
             <div style={{ width: '320px', fontSize: '13px', color: '#ddd', lineHeight: 1.8, letterSpacing: '1px', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                <p style={{ color: '#00F0FF', fontWeight: 'bold', marginBottom: '16px' }}>THE HERO JOURNEY</p>
                <p style={{ marginBottom: '16px' }}>REVOLUTIONIZING CUSTOMER ENGAGEMENT THROUGH ADVANCED AI AUTOPILOT</p>
                <p>24/7 INTELLIGENT RESPONSES, SEAMLESS CRM INTEGRATION, AND AUTOMATED DEAL CLOSING</p>
             </div>
          </motion.div>

       </div>

    </section>
  );
}
