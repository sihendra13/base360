import React from 'react';
import LinearHero from './LinearHero';
import LinearJourney from './LinearJourney';

export default function LinearPage() {
  // Pure black background, no WebGL canvas
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <LinearHero />
      <LinearJourney />
    </div>
  );
}
