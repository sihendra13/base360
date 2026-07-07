import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Bot, MessageSquare, Database, PhoneCall, Mail } from 'lucide-react';

const steps = [
  { id: 1, title: 'TikTok Comment', desc: 'A customer asks "How much is this?" on a viral post.', icon: MessageCircle, color: '#3b82f6' },
  { id: 2, title: 'AI Agent Auto-Reply', desc: 'The AI agent replies publicly, then slides into their DMs.', icon: Bot, color: '#8b5cf6' },
  { id: 3, title: 'Handling the DMs', desc: 'In the DM, the AI explains the offering and answers questions.', icon: MessageSquare, color: '#ec4899' },
  { id: 4, title: 'High-Intent Lead', desc: 'The contact is added to the CRM as a high-intent lead.', icon: Database, color: '#10b981' },
  { id: 5, title: 'AI Voice Call', desc: 'The AI places a call with an AI voice to walk them through the product.', icon: PhoneCall, color: '#f59e0b' },
  { id: 6, title: 'Email Nurture', desc: 'They’re enrolled into marketing emails and nurtured until they buy.', icon: Mail, color: '#06b6d4' },
];

export default function LinearJourney() {
  const containerRef = useRef(null);
  
  // We track the scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate which step is currently active (0 to 5)
  const activeStepIndex = useTransform(scrollYProgress, [0, 1], [0, 5.99]);

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '600vh', background: '#000' }}>
      {/* Sticky Container */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        
        {/* Left Side: Scrolling Text Indicators */}
        <div style={{ flex: 1, paddingLeft: '10vw', display: 'flex', flexDirection: 'column', gap: '30vh' }}>
          {steps.map((step, index) => (
            <StepText key={step.id} step={step} index={index} progress={activeStepIndex} />
          ))}
        </div>

        {/* Right Side: Sticky UI Graphic */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <StickyGraphic progress={activeStepIndex} />
        </div>

      </div>
    </section>
  );
}

// Component for the text on the left
function StepText({ step, index, progress }) {
  // If the current progress is near this index, it becomes active (white), else dimmed (grey)
  const opacity = useTransform(progress, 
    [index - 1, index, index + 1], 
    [0.2, 1, 0.2]
  );

  return (
    <motion.div style={{ opacity, maxWidth: '400px' }}>
      <div style={{ color: step.color, fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Step 0{step.id}
      </div>
      <h3 style={{ fontSize: '36px', fontWeight: '500', marginBottom: '16px', letterSpacing: '-0.02em' }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '18px', color: '#888', lineHeight: '1.5' }}>
        {step.desc}
      </p>
    </motion.div>
  );
}

// Component for the dynamic UI graphic on the right
function StickyGraphic({ progress }) {
  const [index, setIndex] = React.useState(0);
  
  React.useEffect(() => {
    return progress.on("change", (latest) => {
      setIndex(Math.floor(latest));
    });
  }, [progress]);

  const yOffset = useTransform(progress, v => `${-(Math.floor(v) * 100)}%`);
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

  return (
    <div style={{ 
      width: '320px', 
      height: '570px', 
      background: '#0A0A0A', 
      border: '1px solid #333', 
      borderRadius: '24px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.05)'
    }}>
      {/* Real Video Background */}
      <video 
        src={videoUrl}
        autoPlay 
        loop 
        muted 
        playsInline
        style={{
          position: 'absolute', inset: 0, 
          width: '100%', height: '100%', objectFit: 'cover',
          filter: index >= 1 ? 'brightness(0.2) blur(10px)' : 'brightness(0.9)',
          transition: 'all 0.5s ease',
          zIndex: 0
        }}
      />
      {/* A simple strip of mockups that slides up based on the active step */}
      <motion.div style={{ y: yOffset, width: '100%', height: '100%', transition: 'y 0.3s ease-out', position: 'relative', zIndex: 10 }}>
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.id} style={{ 
              width: '100%', height: '100%', 
              display: 'flex', flexDirection: 'column', 
              justifyContent: 'center', alignItems: 'center',
              borderBottom: '1px solid #111'
            }}>
              <div style={{ 
                width: '80px', height: '80px', 
                borderRadius: '20px', 
                background: `linear-gradient(135deg, ${step.color}22 0%, ${step.color}00 100%)`,
                border: `1px solid ${step.color}44`,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                marginBottom: '24px'
              }}>
                <Icon size={40} color={step.color} />
              </div>
              <div style={{ width: '60%', height: '8px', background: '#222', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ width: '40%', height: '8px', background: '#222', borderRadius: '4px' }} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
