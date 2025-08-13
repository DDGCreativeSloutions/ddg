import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create orb data with purple and blue colors
  const orbs = useMemo(() => {
    const orbData = [];
    for (let i = 0; i < 15; i++) {
      const colors = [
        '#8B5CF6', // Purple
        '#3B82F6', // Blue  
        '#6366F1', // Indigo
        '#A855F7', // Purple variant
        '#06B6D4', // Cyan
      ];
      
      orbData.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20
        ] as [number, number, number],
        scale: Math.random() * 3 + 1,
        speed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }
    return orbData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.05;
      
      groupRef.current.children.forEach((child, index) => {
        const orb = orbs[index];
        child.position.y += Math.sin(time * orb.speed + index) * 0.01;
        child.rotation.x += orb.rotationSpeed;
        child.rotation.z += orb.rotationSpeed * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, index) => (
        <mesh key={index} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={orb.color}
            transparent
            opacity={0.3}
            emissive={orb.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    const colors = new Float32Array(200 * 3);
    
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Purple and blue color variations
      const colorVariant = Math.random();
      if (colorVariant < 0.5) {
        // Purple variants
        colors[i * 3] = 0.54 + Math.random() * 0.2; // R
        colors[i * 3 + 1] = 0.36 + Math.random() * 0.2; // G  
        colors[i * 3 + 2] = 0.96; // B
      } else {
        // Blue variants
        colors[i * 3] = 0.23 + Math.random() * 0.2; // R
        colors[i * 3 + 1] = 0.51 + Math.random() * 0.2; // G
        colors[i * 3 + 2] = 0.96; // B
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      pointsRef.current.rotation.y = time * 0.02;
      pointsRef.current.rotation.x = time * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={200}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={200}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8B5CF6" />
        <pointLight position={[10, -10, 5]} intensity={0.3} color="#3B82F6" />
        
        <FloatingOrbs />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;