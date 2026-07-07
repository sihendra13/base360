import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function SpineParticles(props) {
  const ref = useRef();
  
  // Menghasilkan formasi partikel tulang punggung (spine) yang masif seperti Active Theory
  const { positions, colors } = useMemo(() => {
    const count = 25000; // Jumlah partikel yang sangat padat (Nebula)
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Palet warna khas mahakarya Active Theory: Ungu/Magenta, Cyan, Emas, dan Hijau Neon
    const colorP = new THREE.Color('#8B5CF6'); // Purple
    const colorC = new THREE.Color('#00F0FF'); // Cyan
    const colorG = new THREE.Color('#EAB308'); // Gold
    const colorG2 = new THREE.Color('#10B981'); // Emerald Green

    for (let i = 0; i < count; i++) {
      // Y axis: membentang panjang vertikal
      const y = (Math.random() - 0.5) * 20; 
      
      // Radius: Dibuat SANGAT rapat di tengah (0.2 hingga maksimal 1.5), menyisakan ruang kosong di kiri kanan
      const radius = Math.pow(Math.random(), 3) * 1.5 + 0.2; 
      
      // Angle: diberikan pelintiran organik (twist) yang lebih kuat membentuk seperti pita DNA / Infinity
      const angle = Math.random() * Math.PI * 2 + (y * 0.8); 
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Warna diacak untuk menciptakan tekstur organik
      const mix = Math.random();
      const finalColor = new THREE.Color();
      if (mix < 0.25) finalColor.copy(colorP);
      else if (mix < 0.5) finalColor.copy(colorC);
      else if (mix < 0.75) finalColor.copy(colorG);
      else finalColor.copy(colorG2);
      
      // Tambahkan efek kilau putih acak
      finalColor.lerp(new THREE.Color('#ffffff'), Math.random() * 0.4);

      colors[i * 3 + 0] = finalColor.r;
      colors[i * 3 + 1] = finalColor.g;
      colors[i * 3 + 2] = finalColor.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Putaran konstan yang memberikan efek nebula / galaksi melayang
      ref.current.rotation.y += delta * 0.15;
      // Sedikit goyangan vertikal
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group rotation={[0.2, 0, Math.PI / 12]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          vertexColors // Memunculkan warna partikel individual
          size={0.035} // Ukuran debu bintang
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
          blending={THREE.AdditiveBlending} // Efek Glow bertumpuk
        />
      </Points>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div id="canvas-container" style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#010102', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <SpineParticles />
      </Canvas>
    </div>
  );
}
