import React from 'react';

export default function FooterCTA() {
  return (
    <section style={{ 
      height: '100vh', width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', zIndex: 10,
      backgroundColor: '#0a0f1d'
    }}>
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <h2 style={{ 
          fontSize: '6vw', fontWeight: 900, marginBottom: '50px', 
          letterSpacing: '-1px', textShadow: '0 20px 40px rgba(0,0,0,0.8)' 
        }}>
          Ready to Automate?
        </h2>
        
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          {/* Tombol Utama (Bercahaya) */}
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
        fontSize: '12px', color: '#888', letterSpacing: '2px', fontWeight: 'bold' 
      }}>
        <div>© 2026 BASE360 | All Right Reserved | Hendra Fitriadi | nilakayuwangi@gmail.com</div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#888'}>LINKEDIN</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#888'}>TWITTER</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#888'}>INSTAGRAM</span>
        </div>
      </div>
    </section>
  );
}
