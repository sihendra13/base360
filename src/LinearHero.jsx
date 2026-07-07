import React from 'react';
import { motion } from 'framer-motion';

export default function LinearHero() {
  return (
    <section style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center', 
      padding: '0 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle top glow */}
      <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '40vh', background: 'radial-gradient(ellipse, rgba(0, 240, 255, 0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 1 }}
      >
        <div style={{ 
          display: 'inline-block',
          padding: '6px 12px', 
          borderRadius: '20px', 
          border: '1px solid rgba(255,255,255,0.1)', 
          marginBottom: '32px', 
          fontSize: '12px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: '#888'
        }}>
          Base360 — New Generation
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(40px, 6vw, 80px)', 
          fontWeight: '500', 
          letterSpacing: '-0.03em',
          lineHeight: '1.05', 
          marginBottom: '24px', 
          maxWidth: '900px',
          color: '#fff'
        }}>
          Every conversation. <br/>
          <span style={{ color: '#888' }}>One unified system.</span>
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#888', 
          maxWidth: '560px', 
          lineHeight: '1.5', 
          marginBottom: '48px',
          margin: '0 auto 48px'
        }}>
          Automate the work with AI, capture and nurture subscribers, and turn every comment into a tracked lead.
        </p>
        
        <button style={{
          background: '#fff',
          color: '#000',
          border: 'none',
          padding: '14px 28px',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 0 0 0 rgba(255,255,255,0)'
        }}
        onMouseOver={(e) => {
          e.target.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.4)';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseOut={(e) => {
          e.target.style.boxShadow = '0 0 0 0 rgba(255,255,255,0)';
          e.target.style.transform = 'translateY(0)';
        }}
        >
          Start Building Now
        </button>
      </motion.div>
    </section>
  );
}
