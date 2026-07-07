import React from 'react';
import AppleHero from './AppleHero';
import AppleJourney from './AppleJourney';

export default function ApplePage() {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', overflow: 'hidden' }}>
      <AppleHero />
      <AppleJourney />
    </div>
  );
}
