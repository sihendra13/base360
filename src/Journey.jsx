import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import StoryCard from './StoryCard';

const panels = [
  { id: 1, title: "The Hook", desc: "Capturing incoming social leads", video: "/burger-eat.mp4" },
  { id: 2, title: "AI Takeover", desc: "Base360 replies instantly", video: "/video.mp4" },
  { id: 3, title: "Closing in DMs", desc: "24/7 automated conversational sales", video: "/video.mp4" },
  { id: 4, title: "Smart CRM", desc: "Instantly saves the contact as a high-intent lead.", video: "/video.mp4" },
  { id: 5, title: "AI Voice Call", desc: "The AI places a real call to walk them through the product.", video: "/video.mp4" },
  { id: 6, title: "Automated Marketing", desc: "Enrolls leads into email campaigns and nurtures them until they buy.", video: "/video.mp4" }
];

// Hero Landing Page Statis (Khusus Opsi B)
function HeroStaticLanding({ onEnter }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        backgroundColor: '#0a0f1d', // Dark navy background dari screenshot
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 20px', textAlign: 'center'
      }}
    >
      {/* Video Background dengan Overlay Gelap & Gradasi Bawah */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <video 
          src="/Hero_Image_ok.mp4" 
          autoPlay loop muted playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
        />
        <div style={{ 
          position: 'absolute', 
          bottom: 0, left: 0, right: 0, 
          height: '50vh', 
          background: 'linear-gradient(to bottom, rgba(10,15,29,0) 0%, rgba(10,15,29,1) 100%)' 
        }} />
      </div>

      {/* Badge Atas */}
      <div style={{
        border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '20px',
        padding: '6px 16px', display: 'inline-flex', alignItems: 'center', gap: '8px',
        marginBottom: '40px'
      }}>
        <span style={{ color: '#00F0FF', fontSize: '14px' }}>✨</span>
        <span style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px' }}>
          NEXT-GEN AUTONOMOUS WORKFORCE
        </span>
      </div>

      {/* Headline */}
      <h1 style={{ color: '#fff', fontSize: '5vw', fontWeight: 800, margin: '0 0 20px', letterSpacing: '-1px' }}>
        Hire the AI Agent that<br/>
        <span style={{ color: '#00F0FF' }}>Never Sleeps.</span>
      </h1>

      {/* Sub-headline */}
      <p style={{ color: '#94a3b8', fontSize: '1.2vw', maxWidth: '650px', lineHeight: 1.6, marginBottom: '50px' }}>
        Automate replies, qualify leads, and place sales calls across every social channel. Focus on growth, not inbox management.
      </p>

      {/* Tombol Utama */}
      <motion.button 
        onClick={onEnter}
        animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 20px rgba(0, 240, 255, 0.4)', '0 0 40px rgba(0, 240, 255, 0.8)', '0 0 20px rgba(0, 240, 255, 0.4)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        style={{
          background: '#00F0FF',
          color: '#000',
          border: 'none', borderRadius: '8px',
          padding: '16px 40px', fontSize: '18px', fontWeight: 'bold',
          cursor: 'pointer', outline: 'none',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}
      >
        <span>See Agents in Action</span>
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          →
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

// Z-Tunnel Card
function StaggeredCard({ panel, index, tunnelProgress, globalOpacity }) {
  const relativeScroll = useTransform(tunnelProgress, (p) => index - (p * 6));
  const direction = index % 2 === 0 ? 1 : -1;
  const tunnelX = useTransform(relativeScroll, [-1, 0, 1, 5], [-300 * direction, 0, 400 * direction, 1500 * direction]);
  const tunnelY = useTransform(relativeScroll, [-1, 0, 1, 5], [100 * direction, 0, -150 * direction, -500 * direction]);
  const tunnelZ = useTransform(relativeScroll, [-1, 0, 1, 5], [1000, 0, -1200, -5000]);
  const tunnelRotateY = useTransform(relativeScroll, [-1, 0, 1, 5], [10, 0, -10, -30]);
  const tunnelRotateZ = useTransform(relativeScroll, [-1, 0, 1, 5], [-5, 0, 5, 15]);
  
  // Hide cards completely when relativeScroll > 4 or < -1 (when they are past camera)
  const baseOpacity = useTransform(relativeScroll, [-0.8, 0, 1, 4], [0, 1, 0.6, 0]);
  
  // Combine individual card opacity with the global tunnel container opacity
  const finalOpacity = useTransform(() => baseOpacity.get() * globalOpacity.get());

  return (
    <motion.div
      style={{
        position: 'absolute', 
        width: 360, height: 640,
        x: tunnelX, y: tunnelY, z: tunnelZ, 
        rotateY: tunnelRotateY, rotateZ: tunnelRotateZ, 
        opacity: finalOpacity,
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.5)',
        background: 'rgba(20, 20, 25, 0.5)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
        transformStyle: 'preserve-3d',
        zIndex: 100 - index
      }}
    >
      <StoryCard panel={panel} relativeScroll={relativeScroll} />
    </motion.div>
  );
}

export default function Journey({ heroMode = 'hero-a', enteredTunnel, setEnteredTunnel }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isOptionB = heroMode === 'hero-b';
  const containerHeight = (isOptionB && !enteredTunnel) ? '100vh' : '600vh';
  const tunnelProgress = useTransform(scrollYProgress, [0, 1], [0, 5/6], { clamp: true });
  const tunnelContainerOpacity = useMotionValue(1);

  // Jika user scroll kembali mentok ke atas, kembalikan ke layar Hero
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 0 && enteredTunnel && isOptionB) {
      setEnteredTunnel(false);
    }
  });

  return (
    <section ref={containerRef} style={{ position: 'relative', height: containerHeight, background: 'transparent', zIndex: 10 }}>
      
      <div style={{ 
        position: 'sticky', top: 0, height: '100vh', display: 'flex', 
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        perspective: '1000px', backgroundColor: '#0a0f1d'
      }}>

        {isOptionB && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <video 
              src="/lightin-green.mp4" 
              autoPlay loop muted playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          </div>
        )}

        <div style={{ position: 'relative', transformStyle: 'preserve-3d', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
          {panels.map((panel, i) => (
            <StaggeredCard key={panel.id} panel={panel} index={i} tunnelProgress={tunnelProgress} globalOpacity={tunnelContainerOpacity} />
          ))}
        </div>

        <AnimatePresence>
          {isOptionB && !enteredTunnel && (
            <HeroStaticLanding onEnter={() => setEnteredTunnel(true)} />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
