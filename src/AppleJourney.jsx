import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function AppleJourney() {
  const containerRef = useRef(null);
  
  // 600vh scroll height for the 6 stages
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setIndex(Math.floor(latest * 5.99));
    });
  }, [scrollYProgress]);

  // Premium Apple-style scroll animations for the iPhone chassis
  const phoneScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.9]);
  const phoneY = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], ["20vh", "0vh", "0vh", "-10vh"]);
  const phoneRotate = useTransform(scrollYProgress, [0, 0.2], [5, 0]);

  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '600vh', background: '#000' }}>
      
      {/* Sticky container */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Apple-style big background text that fades based on step */}
        <div style={{ position: 'absolute', top: '10%', width: '100%', textAlign: 'center', zIndex: 0 }}>
          <StepTitle index={index} />
        </div>

        {/* The Premium iPhone Chassis */}
        <motion.div style={{ 
          scale: phoneScale, 
          y: phoneY, 
          rotateX: phoneRotate,
          perspective: '1000px',
          zIndex: 10
        }}>
          
          <div style={{
            width: '350px',
            height: '750px',
            background: '#000',
            borderRadius: '55px',
            // The metallic titanium bezel
            boxShadow: 'inset 0 0 0 2px #444, inset 0 0 0 6px #111, inset 0 0 20px rgba(255,255,255,0.2), 0 30px 60px rgba(0,0,0,0.8), 0 0 100px rgba(255,255,255,0.05)',
            border: '4px solid #555', // Outer metallic edge
            padding: '12px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
          }}>
            
            {/* Volume Buttons & Power Button (Simulated) */}
            <div style={{ position: 'absolute', left: '-6px', top: '150px', width: '4px', height: '60px', background: '#333', borderRadius: '4px' }} />
            <div style={{ position: 'absolute', left: '-6px', top: '220px', width: '4px', height: '60px', background: '#333', borderRadius: '4px' }} />
            <div style={{ position: 'absolute', right: '-6px', top: '180px', width: '4px', height: '80px', background: '#333', borderRadius: '4px' }} />

            {/* The Actual Screen (Glass) */}
            <div style={{
              width: '100%',
              height: '100%',
              background: '#000',
              borderRadius: '43px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)' // Screen glare
            }}>
              
              {/* Dynamic Island */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '30px',
                background: '#000',
                borderRadius: '20px',
                zIndex: 100,
                boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1)'
              }}>
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#111', border: '2px solid #222' }} />
              </div>

              {/* The Commercial Video Background */}
              <video 
                src={videoUrl}
                autoPlay 
                loop 
                muted 
                playsInline
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: (index === 0 || index === 1) ? 1 : 0.3, // Dim video after step 2
                  transition: 'opacity 1s ease'
                }}
              />

              {/* Storytelling Content Overlays */}
              <ScreenContent index={index} />

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function StepTitle({ index }) {
  const titles = [
    "The Hook.",
    "AI Takeover.",
    "Closing the DM.",
    "Data Captured.",
    "Voice Agent.",
    "Revenue."
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.h2
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: 'clamp(60px, 10vw, 150px)',
          fontWeight: '700',
          letterSpacing: '-0.05em',
          color: 'rgba(255,255,255,0.08)',
          whiteSpace: 'nowrap'
        }}
      >
        {titles[index]}
      </motion.h2>
    </AnimatePresence>
  );
}

function ScreenContent({ index }) {
  return (
    <AnimatePresence mode="wait">
      
      {/* Step 1: TikTok Comment Popup */}
      {index === 0 && (
        <motion.div 
          key="step1"
          initial={{ opacity: 0, y: 50, scale: 0.9 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
          style={{ position: 'absolute', bottom: '120px', left: '16px', right: '16px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', padding: '16px', borderRadius: '20px', color: '#000', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ff3b30' }} />
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>@sarah_styles</div>
              <div style={{ fontSize: '15px', marginTop: '2px' }}>Omg need this! How much? 😍</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: DM Interface taking over */}
      {index === 1 && (
        <motion.div 
          key="step2"
          initial={{ opacity: 0, y: '100%' }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          style={{ position: 'absolute', inset: 0, top: '40%', background: 'rgba(28,28,30,0.95)', backdropFilter: 'blur(30px)', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', padding: '24px 16px', zIndex: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div style={{ width: '40px', height: '5px', background: '#555', borderRadius: '3px', margin: '0 auto 20px' }} />
          <h3 style={{ textAlign: 'center', fontSize: '17px', fontWeight: '600', marginBottom: '24px' }}>Base360 AI Active</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#0a84ff', color: '#fff', padding: '12px 16px', borderRadius: '20px 20px 4px 20px', alignSelf: 'flex-end', maxWidth: '85%', fontSize: '15px' }}>
              Hi Sarah! The bundle is $149 today. Would you like the VIP link? ✨
            </div>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              style={{ fontSize: '12px', color: '#86868b', alignSelf: 'flex-end', marginTop: '-8px' }}>
              Read 10:42 AM
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Full DM Chat */}
      {index === 2 && (
        <motion.div 
          key="step3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 30, padding: '80px 16px 20px' }}
        >
          <div style={{ textAlign: 'center', fontSize: '17px', fontWeight: '600', marginBottom: '30px' }}>@sarah_styles</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#1c1c1e', padding: '12px 16px', borderRadius: '20px 20px 20px 4px', alignSelf: 'flex-start', maxWidth: '85%', fontSize: '15px' }}>
              Yes please! Does it come with free shipping?
            </div>
            <div style={{ background: '#0a84ff', color: '#fff', padding: '12px 16px', borderRadius: '20px 20px 4px 20px', alignSelf: 'flex-end', maxWidth: '85%', fontSize: '15px' }}>
              Yes, free express shipping worldwide! Here is your secure checkout link: base360.co/vip-sarah
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 4: CRM Sync */}
      {index === 3 && (
        <motion.div 
          key="step4"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #32d74b 0%, #28cd41 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Lead Captured</h2>
          <p style={{ color: '#86868b', fontSize: '15px' }}>Synced to Salesforce & Hubspot</p>
        </motion.div>
      )}

      {/* Step 5: AI Voice */}
      {index === 4 && (
        <motion.div 
          key="step5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#1c1c1e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', position: 'relative' }}>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '2px solid rgba(10,132,255,0.5)' }} 
            />
            <span style={{ fontSize: '40px' }}>🎙️</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '400', marginBottom: '8px' }}>Calling Sarah...</h2>
          <p style={{ color: '#0a84ff', fontSize: '17px' }}>Base360 Voice Agent</p>
        </motion.div>
      )}

      {/* Step 6: Deal Closed */}
      {index === 5 && (
        <motion.div 
          key="step6"
          initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #000 0%, #1c1c1e 100%)', zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '64px', fontWeight: '700', background: 'linear-gradient(90deg, #ffd700, #ff8c00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>
              $149.00
            </h1>
            <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#fff' }}>Payment Received</h2>
            <p style={{ color: '#86868b', fontSize: '15px', marginTop: '8px' }}>Automated via Base360</p>
          </div>
        </motion.div>
      )}

    </AnimatePresence>
  );
}
