import React from 'react';
import { motion } from 'framer-motion';

export default function AppleHero() {
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
      background: '#000'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 1 }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: '500', color: '#f5f5f7', marginBottom: '8px' }}>Base360 Pro</h2>
        
        <h1 style={{ 
          fontSize: 'clamp(50px, 8vw, 120px)', 
          fontWeight: '600', 
          letterSpacing: '-0.04em',
          lineHeight: '1.05', 
          marginBottom: '24px',
          color: '#f5f5f7'
        }}>
          Titanium intelligence. <br/>
          Infinite conversions.
        </h1>
        
        <p style={{ 
          fontSize: '24px', 
          color: '#86868b', 
          fontWeight: '500',
          maxWidth: '600px', 
          margin: '0 auto 40px'
        }}>
          Turn every comment into a tracked lead. From TikTok to final sale, entirely automated.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button style={{
            background: '#fff', color: '#000', border: 'none', padding: '16px 32px', borderRadius: '30px', fontSize: '17px', fontWeight: '500', cursor: 'pointer'
          }}>
            Buy
          </button>
          <button style={{
            background: 'transparent', color: '#2997ff', border: 'none', fontSize: '17px', fontWeight: '400', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            Learn more {'>'}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
