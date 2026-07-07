import React, { useState, useEffect } from 'react';
import { motion, useMotionValueEvent, useMotionValue, useTransform } from 'framer-motion';

// Import SVG & Images secara langsung agar Vite mem-bundlenya
import loveIcon from '../public/SVG/love.svg';
import komenIcon from '../public/SVG/komen.svg';
import forwardIcon from '../public/SVG/forward.svg';
import homeIcon from '../public/SVG/home.svg';
import discoverIcon from '../public/SVG/discover.svg';
import postIcon from '../public/SVG/post.svg';
import inboxIcon from '../public/SVG/inbox.svg';
import profileIcon from '../public/SVG/profile.svg';
import addUserIcon from '../public/SVG/add user2.svg';
import userProfileImg from '../public/user_Profile.jpg';
import userAiImg from '../public/user_ai.jpg';

// --- Komponen Typewriter dengan Looping Otomatis (4 detik) ---
const TypewriterText = ({ text, delay = 0, relativeScroll, pause = 4000 }) => {
  const [displayed, setDisplayed] = useState('');
  const [start, setStart] = useState(false);
  const [key, setKey] = useState(0); 

  useEffect(() => {
    if (!relativeScroll) {
      setStart(true);
      return;
    }
    
    // Cek posisi awal saat komponen pertama kali di-render
    if (relativeScroll.get() < 1.0 && relativeScroll.get() > -0.5) {
      setStart(true);
    }
    
    // Dengarkan perubahan scroll
    const unsubscribe = relativeScroll.on("change", (latest) => {
      if (latest < 1.0 && latest > -0.5) {
        setStart(true);
      }
    });
    
    return () => unsubscribe();
  }, [relativeScroll]);

  useEffect(() => {
    if (!start) return;
    let i = 0;
    let interval;
    let pauseTimer;
    
    let timer = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayed(text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(interval);
          pauseTimer = setTimeout(() => {
            setDisplayed('');
            setKey(k => k + 1); 
          }, pause);
        }
      }, 50); 
    }, delay);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [text, delay, start, key, pause]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{text}</span>
      <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'pre-wrap' }}>{displayed}</span>
    </span>
  );
};

const TikTokSidebar = () => (
  <div style={{ position: 'absolute', right: '12px', bottom: '100px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', zIndex: 10 }}>
    <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fff', border: '2px solid #fff', position: 'relative' }}>
      <img src={userProfileImg} alt="profile" style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'block', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '20px' }}>
         <img src={addUserIcon} alt="add" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
      <img src={loveIcon} style={{ width: '32px', height: '32px', objectFit: 'contain', display: 'block' }} alt="love" />
      <span>124K</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
      <img src={komenIcon} style={{ width: '32px', height: '32px', objectFit: 'contain', display: 'block' }} alt="comment" />
      <span>4,098</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
      <img src={forwardIcon} style={{ width: '32px', height: '32px', objectFit: 'contain', display: 'block' }} alt="share" />
      <span>8,201</span>
    </div>
  </div>
);

const TikTokBottomBar = () => (
  <div style={{ position: 'absolute', bottom: '0', left: 0, width: '100%', height: '70px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 10, padding: '10px 10px 20px', color: '#fff', fontSize: '11px', fontWeight: '500' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <img src={homeIcon} style={{ width: '24px', height: '24px', objectFit: 'contain', display: 'block' }} alt="home" />
      <span>Home</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.6 }}>
      <img src={discoverIcon} style={{ width: '24px', height: '24px', objectFit: 'contain', display: 'block' }} alt="discover" />
      <span>Discover</span>
    </div>
    <div>
      <img src={postIcon} style={{ height: '32px', objectFit: 'contain', display: 'block' }} alt="post" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.6 }}>
      <img src={inboxIcon} style={{ width: '24px', height: '24px', objectFit: 'contain', display: 'block' }} alt="inbox" />
      <span>Inbox</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.6 }}>
      <img src={profileIcon} style={{ width: '24px', height: '24px', objectFit: 'contain', display: 'block' }} alt="profile" />
      <span>Me</span>
    </div>
  </div>
);

const TikTokCaption = () => (
  <div style={{ position: 'absolute', bottom: '90px', left: '16px', zIndex: 10, color: '#fff', maxWidth: '70%', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
    <h4 style={{ margin: '0 0 8px', fontSize: '16px' }}>@burger_lover</h4>
    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.4 }}>The best burger in town! So juicy and delicious. #burger #foodie</p>
  </div>
);


export default function StoryCard({ panel, relativeScroll, globalProgress }) {
  const floatAnim = {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  const wiggleAnim = {
    rotate: [0, -2, 2, -2, 0],
    y: [0, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  };

  const dummyProgress = useMotionValue(1);
  const activeProgress = globalProgress || dummyProgress;

  // Fade in UI only after the seamless transition finishes (activeProgress > 0.25)
  // But only applies if it's Card 1 and globalProgress was actually provided.
  const uiOpacity = useTransform(activeProgress, [0.2, 0.28], [0, 1]);
  const combinedOpacity = useTransform(() => panel.id === 1 && globalProgress ? uiOpacity.get() : 1);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      
      {/* 1. Video Latar Belakang & TikTok UI */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', overflow: 'hidden', zIndex: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        <video 
          src="/burger-eat.mp4" 
          autoPlay loop muted playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            filter: 'blur(0px)', zIndex: 0, transition: 'all 1s ease'
          }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', zIndex: 1 }} />
      </div>
      
      <motion.div style={{ position: 'absolute', inset: 0, zIndex: 5, opacity: combinedOpacity }}>
        <TikTokSidebar />
        <TikTokBottomBar />
        <TikTokCaption />
      </motion.div>

      {/* 2. Container UI Dinamis Break-out */}
      <motion.div style={{ position: 'absolute', inset: 0, zIndex: 5, opacity: combinedOpacity }}>
        
        {/* === KARTU 1: THE HOOK === */}
        {panel.id === 1 && (
          <div style={{ width: '280px', position: 'absolute', top: '25%', right: 'calc(100% + 48px)', zIndex: 20 }}>
            <h3 style={{ fontSize: '24px', color: '#fff', margin: '0 0 12px 10px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              {panel.title} <span style={{fontSize: '14px', color: '#ddd', display: 'block', fontWeight: 'normal'}}>{panel.desc}</span>
            </h3>
            
            <motion.div animate={wiggleAnim} style={{ background: '#fff', padding: '16px', borderRadius: '24px 24px 24px 0px', display: 'flex', gap: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.5)' }}>
              <div>
                <p style={{ margin: 0, fontSize: '13px', color: '#555', fontWeight: 'bold' }}>@sarah_loves_food</p>
                <p style={{ margin: '4px 0 0', fontSize: '15px', color: '#000', minHeight: '45px', display: 'block' }}>
                  <TypewriterText text="Wow looks delicious! 😍 How much price this burger?" delay={100} relativeScroll={relativeScroll} />
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* === KARTU 2: AI TAKEOVER === */}
        {panel.id === 2 && (
          <div style={{ width: '280px', position: 'absolute', top: '20%', left: 'calc(100% + 48px)', zIndex: 20 }}>
            <h3 style={{ fontSize: '24px', color: '#fff', margin: '0 0 12px 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)', textAlign: 'right' }}>
              {panel.title} <span style={{fontSize: '14px', color: '#00F0FF', display: 'block', fontWeight: 'normal'}}>{panel.desc}</span>
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* Bubble User - Kini solid putih, bentuk dan ukuran konsisten dengan Kartu 1 */}
              <motion.div animate={wiggleAnim} style={{ background: '#fff', padding: '16px', borderRadius: '24px 24px 24px 0px', display: 'flex', gap: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.5)', alignSelf: 'flex-end', width: '250px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#555', fontWeight: 'bold' }}>@sarah_loves_food</p>
                  <p style={{ margin: '4px 0 0', fontSize: '15px', color: '#000', display: 'block' }}>Wow looks delicious! 😍 How much price this burger?</p>
                </div>
              </motion.div>

              {/* Bubble AI Bot */}
              <motion.div animate={floatAnim} style={{ background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '16px', borderRadius: '24px 24px 0 24px', border: '2px solid #00F0FF', display: 'flex', gap: '12px', boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#00F0FF', flexShrink: 0, overflow: 'hidden' }}>
                  <img src={userAiImg} alt="AI Agent" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#00F0FF', fontWeight: 'bold' }}>Base360 AI <span style={{ background: '#00F0FF', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', marginLeft: '4px' }}>Author</span></p>
                  <p style={{ margin: '4px 0 0', fontSize: '15px', color: '#fff', minHeight: '60px', display: 'block' }}>
                    <TypewriterText text="It's $8! I've sent you a DM with the menu and a special discount link! 🍔🚀" delay={200} relativeScroll={relativeScroll} />
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* === KARTU 3: CLOSING IN DMs === */}
        {panel.id === 3 && (
           <div style={{ width: '280px', position: 'absolute', top: '25%', right: 'calc(100% + 48px)', zIndex: 20 }}>
            <h3 style={{ fontSize: '24px', color: '#fff', margin: '0 0 20px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              {panel.title} <span style={{fontSize: '14px', color: '#00F0FF', display: 'block'}}>{panel.desc}</span>
            </h3>
            <motion.div animate={floatAnim} style={{ width: '100%', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#888', marginBottom: '16px' }}>Direct Messages</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ alignSelf: 'flex-start', background: '#333', padding: '10px 14px', borderRadius: '16px 16px 16px 4px', color: '#fff', fontSize: '13px', maxWidth: '80%' }}>
                  Hi Sarah! As promised, here is the menu link. Use code BURGER10 for 10% off your first order! 🍔
                </div>
                <div style={{ alignSelf: 'flex-end', background: 'rgba(255,255,255,0.2)', padding: '10px 14px', borderRadius: '16px 16px 0 16px', color: '#fff', fontSize: '13px', maxWidth: '80%' }}>
                  Omg thank you! Can I order for delivery right now?
                </div>
                <div style={{ alignSelf: 'flex-start', background: 'rgba(0, 240, 255, 0.15)', border: '1px solid #00F0FF', padding: '10px 14px', borderRadius: '16px 16px 16px 4px', color: '#fff', fontSize: '13px', maxWidth: '80%', fontWeight: '500' }}>
                  <TypewriterText text="Absolutely! I can process that for you right here. What's your delivery address?" delay={200} relativeScroll={relativeScroll} />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* === KARTU 4: CRM CAPTURE === */}
        {panel.id === 4 && (
          <div style={{ width: '280px', position: 'absolute', top: '25%', left: 'calc(100% + 48px)', zIndex: 20 }}>
            <h3 style={{ fontSize: '24px', color: '#fff', margin: '0 0 20px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              {panel.title} <span style={{fontSize: '14px', color: '#00F0FF', display: 'block'}}>{panel.desc}</span>
            </h3>
            <motion.div animate={floatAnim} style={{ width: '100%', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', marginBottom: '12px' }}>unified-inbox-v2.0</div>
              <div style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold', marginBottom: '16px' }}>Recent Conversations</div>
              
              <div style={{ background: '#1e293b', borderRadius: '12px', padding: '12px', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src={userProfileImg} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Sarah (TikTok)</span>
                    <span style={{ color: '#10b981', fontSize: '10px', padding: '2px 6px', background: 'rgba(16,185,129,0.2)', borderRadius: '4px' }}>Hot Lead</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>"Where can I find this..."</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00F0FF', fontSize: '12px', fontWeight: 'bold' }}>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F0FF' }} />
                AI is processing order...
              </div>
            </motion.div>
          </div>
        )}

        {/* === KARTU 5: VOICE AGENT (DITARIK KE KANAN) === */}
        {panel.id === 5 && (
          <div style={{ width: '280px', position: 'absolute', top: '25%', right: 'calc(100% + 48px)', zIndex: 20 }}>
            <h3 style={{ fontSize: '24px', color: '#fff', margin: '0 0 20px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              {panel.title} <span style={{fontSize: '14px', color: '#00F0FF', display: 'block'}}>{panel.desc}</span>
            </h3>
            <motion.div animate={floatAnim} style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '30px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
              <div style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>Base360 AI</div>
              <div style={{ fontSize: '14px', color: '#aaa', marginBottom: '40px' }}>Calling to confirm order...</div>
              
              <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', inset: -20, border: '2px solid #00F0FF', borderRadius: '50%' }} />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} style={{ position: 'absolute', inset: -10, border: '2px solid #00F0FF', borderRadius: '50%' }} />
                <div style={{ width: '100%', height: '100%', background: '#00F0FF', borderRadius: '50%', overflow: 'hidden' }}>
                  <img src={userAiImg} alt="AI Agent" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '30px', marginTop: '60px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line></svg>
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* === KARTU 6: REVENUE / MARKETING === */}
        {panel.id === 6 && (
          <div style={{ width: '280px', position: 'absolute', top: '25%', left: 'calc(100% + 48px)', zIndex: 20 }}>
            <h3 style={{ fontSize: '24px', color: '#fff', margin: '0 0 20px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              {panel.title} <span style={{fontSize: '14px', color: '#00F0FF', display: 'block'}}>{panel.desc}</span>
            </h3>
            <motion.div animate={floatAnim} style={{ width: '100%', background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>New Email</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Just now</div>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#000', marginBottom: '8px' }}>Your Receipt & 10% Off!</div>
              <div style={{ fontSize: '13px', color: '#444', lineHeight: 1.5 }}>
                Hi Sarah, thanks for your order! It's being prepared.<br/><br/>
                As a thank you, here is 10% off your next burger.
              </div>
              <div style={{ marginTop: '20px', background: '#00F0FF', color: '#000', textAlign: 'center', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                CLAIM DISCOUNT
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

    </div>
  );
}
