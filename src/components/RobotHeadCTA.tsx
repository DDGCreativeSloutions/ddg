import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface RobotHeadProps {
  position: [number, number, number];
  rotationOffset: number;
}

const RobotHead: React.FC<RobotHeadProps> = ({ position, rotationOffset }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Load the GLB model with animations
  const { scene, animations } = useGLTF('/models/robot-head.glb', true);
  const { actions } = useAnimations(animations, meshRef);
  
  useEffect(() => {
    if (scene) {
      setModelLoaded(true);
      console.log("Robot head model loaded successfully");
    }
  }, [scene]);
  
  useEffect(() => {
    // Play all available animations
    if (actions) {
      Object.values(actions).forEach(action => {
        if (action) {
          action.play();
          action.setEffectiveTimeScale(0.6);
          action.setEffectiveWeight(1);
        }
      });
    }
  }, [actions]);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Enhanced ethereal floating animation with more dramatic movement
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5 + rotationOffset) * 0.4;
      meshRef.current.rotation.y = Math.sin(time * 0.6 + rotationOffset) * 0.6;
      meshRef.current.rotation.x = Math.cos(time * 0.5 + rotationOffset) * 0.25;
      meshRef.current.rotation.z = Math.sin(time * 0.3 + rotationOffset) * 0.15;
      
      // Dreamy scale pulsing with phase offset
      // Increased base scale for better visibility (from 0.8 to 2.0)
      const scale = 2.0 + Math.sin(time * 1.8 + rotationOffset) * 0.1;
      meshRef.current.scale.setScalar(scale);
      
      // Adjust Z position to ensure visibility
      meshRef.current.position.z = -2 + Math.sin(time * 0.4 + rotationOffset) * 0.1;
    }
  });

  // Clone the model and add some glowing effects
  const model = scene.clone();
  model.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map(mat => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            const newMat = mat.clone();
            newMat.envMapIntensity = 1.5;
            newMat.metalness = 0.8;
            newMat.roughness = 0.1;
            if (mat.name.includes('eye') || mat.name.includes('glow')) {
              newMat.emissive = new THREE.Color('#00d4ff');
              newMat.emissiveIntensity = 2;
            }
            return newMat;
          }
          return mat;
        });
      } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
        const newMat = mesh.material.clone();
        newMat.envMapIntensity = 1.5;
        newMat.metalness = 0.8;
        newMat.roughness = 0.1;
        if (newMat.name.includes('eye') || newMat.name.includes('glow')) {
          newMat.emissive = new THREE.Color('#00d4ff');
          newMat.emissiveIntensity = 2;
        }
        mesh.material = newMat;
      }
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <primitive object={model} />
      {/* Add glow effects */}
      <pointLight
        position={[0, 0.2, 0.5]}
        distance={2}
        intensity={1}
        color="#00d4ff"
      />
      <pointLight
        position={[0, -0.2, 0.5]}
        distance={2}
        intensity={0.5}
        color="#8B5CF6"
      />
    </group>
  );
};

const RobotHeadCTA: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [section, setSection] = useState<'testimonials' | 'features' | 'cta' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
      
      // Show when reaching testimonials section (around 60%)
      setIsVisible(progress > 0.6);
      
      // Determine current section for animation
      if (progress > 0.6 && progress <= 0.75) {
        setSection('testimonials');
      } else if (progress > 0.75 && progress <= 0.85) {
        setSection('features');
      } else if (progress > 0.85) {
        setSection('cta');
      } else {
        setSection(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  // Calculate position based on section with adjusted values for better visibility
  const getPosition = (): [number, number, number] => {
    if (section === 'testimonials') {
      // Start at right side, adjusted Z for depth
      return [6, 1.5, -2];
    } else if (section === 'features') {
      // Move towards center from right
      const progress = (scrollProgress - 0.75) / 0.1; // normalize between 0 and 1
      return [6 * (1 - progress), 2, -2];
    } else if (section === 'cta') {
      // Center position with slight hover
      return [0, 2.5, -2];
    }
    return [6, 1.5, -2]; // Default position
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 20, marginTop: '64px' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          logarithmicDepthBuffer: true
        }}
        dpr={window.devicePixelRatio}
        performance={{ min: 0.5 }}
        shadows
        style={{ background: 'transparent' }}
      >
        {/* Removed fog for better visibility */}
        
        {/* Advanced lighting setup for metallic robot head */}
        <ambientLight intensity={0.8} />
        <hemisphereLight
          intensity={0.3}
          groundColor="#8B5CF6"
          color="#3B82F6"
        />
        
        {/* Main directional light with high-quality shadows */}
        <directionalLight 
          position={[15, 15, 8]} 
          intensity={2} 
          castShadow
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
        </directionalLight>
        
        {/* Colored rim lights for dramatic effect */}
        <pointLight position={[-8, 8, 5]} intensity={1.5} color="#8B5CF6" />
        <pointLight position={[8, -8, 5]} intensity={1.5} color="#3B82F6" />
        
        {/* Focused spot light for dramatic highlights */}
        <spotLight 
          position={[0, 5, 10]} 
          intensity={2} 
          color="#00D4FF"
          angle={0.4}
          penumbra={0.8}
          castShadow
          distance={20}
        />
        
        {/* Environment lighting for metallic reflections */}
        <Environment preset="night" />
        
        <Suspense fallback={null}>
          <RobotHead 
            position={getPosition()} 
            rotationOffset={scrollProgress * Math.PI * 4} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RobotHeadCTA;