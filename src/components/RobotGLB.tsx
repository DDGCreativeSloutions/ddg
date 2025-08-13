import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface RobotGLBModelProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  currentSection: number;
  modelPath: string;
  isMobile: boolean;
  touchIntensity: number;
}

// Enhanced sparking particles component
const SparkingParticles: React.FC<{ position: THREE.Vector3; intensity: number; isMobile: boolean }> = ({ position, intensity, isMobile }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? 80 : 50; // More particles on mobile
  
  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Random positions around the robot
      const radius = isMobile ? 3 : 2;
      positions[i3] = (Math.random() - 0.5) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * radius;
      positions[i3 + 2] = (Math.random() - 0.5) * radius;
      
      // Random velocities - faster on mobile
      const speed = isMobile ? 0.035 : 0.02;
      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
      
      // Enhanced spark colors with more variety
      const color = new THREE.Color();
      if (isMobile) {
        // More vibrant colors for mobile
        const hue = Math.random() * 0.3; // Orange to blue spectrum
        color.setHSL(hue, 1, 0.6 + Math.random() * 0.4);
      } else {
        color.setHSL(Math.random() * 0.1 + 0.1, 1, 0.5 + Math.random() * 0.5);
      }
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Variable particle sizes
      sizes[i] = isMobile ? Math.random() * 0.08 + 0.02 : Math.random() * 0.05 + 0.02;
    }
    
    return { positions, velocities, colors, sizes };
  }, [isMobile]);
  
  useFrame((state) => {
    if (particlesRef.current && intensity > 0) {
      const time = state.clock.elapsedTime;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const sizes = particlesRef.current.geometry.attributes.size?.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Enhanced movement with swirling effect on mobile
        const swirl = isMobile ? Math.sin(time * 2 + i * 0.1) * 0.002 : 0;
        positions[i3] += particles.velocities[i3] + Math.sin(time * 5 + i) * 0.001 + swirl;
        positions[i3 + 1] += particles.velocities[i3 + 1] + Math.cos(time * 5 + i) * 0.001;
        positions[i3 + 2] += particles.velocities[i3 + 2] + Math.sin(time * 3 + i) * 0.001 + swirl;
        
        // Animate particle sizes on mobile
        if (sizes && isMobile) {
          sizes[i] = particles.sizes[i] * (1 + Math.sin(time * 4 + i) * 0.3);
        }
        
        // Reset particles that go too far
        const maxDistance = isMobile ? 4 : 3;
        if (Math.abs(positions[i3]) > maxDistance || Math.abs(positions[i3 + 1]) > maxDistance || Math.abs(positions[i3 + 2]) > maxDistance) {
          const resetRadius = isMobile ? 1 : 0.5;
          positions[i3] = (Math.random() - 0.5) * resetRadius;
          positions[i3 + 1] = (Math.random() - 0.5) * resetRadius;
          positions[i3 + 2] = (Math.random() - 0.5) * resetRadius;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      if (sizes) {
        particlesRef.current.geometry.attributes.size.needsUpdate = true;
      }
    }
  });
  
  if (intensity <= 0) return null;
  
  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
        {isMobile && (
          <bufferAttribute
            attach="attributes-size"
            count={particleCount}
            array={particles.sizes}
            itemSize={1}
          />
        )}
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.08 : 0.05}
        vertexColors
        transparent
        opacity={intensity}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={isMobile}
      />
    </points>
  );
};

const RobotGLBModel: React.FC<RobotGLBModelProps> = ({ 
  scrollProgress, 
  mouseX, 
  mouseY, 
  currentSection,
  modelPath,
  isMobile,
  touchIntensity
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [robotOpacity, setRobotOpacity] = useState(1);
  const [sparkIntensity, setSparkIntensity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Load the GLB model with animations
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, meshRef);
  
  useEffect(() => {
    // Play all available animations with enhanced settings for mobile
    if (actions) {
      Object.values(actions).forEach(action => {
        if (action) {
          action.play();
          // Faster animations on mobile for more energy
          action.setEffectiveTimeScale(isMobile ? 1.2 : 0.8);
          action.setEffectiveWeight(1);
        }
      });
    }
    
    // Handle hover events
    const handlePointerEnter = () => setIsHovered(true);
    const handlePointerLeave = () => setIsHovered(false);
    
    const container = document.querySelector('.robot-container');
    if (container) {
      container.addEventListener('pointerenter', handlePointerEnter);
      container.addEventListener('pointerleave', handlePointerLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('pointerenter', handlePointerEnter);
        container.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, [actions, isMobile]);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Mobile-specific or desktop movement logic
      let positionX = 0;
      let positionY = 0;
      let rotationY = 0;
      let scale = 2;
      let opacity = 1;
      
      const sectionProgress = (scrollProgress * 6) % 1;
      const sectionIndex = Math.floor(scrollProgress * 6);
      
      if (isMobile) {
        // Enhanced mobile-specific movements
        switch(sectionIndex) {
          case 0:
            // More dramatic floating motion
            positionX = Math.sin(time * 0.3) * 1.2 + Math.cos(time * 0.15) * 0.5;
            positionY = Math.sin(time * 0.4) * 0.8 + Math.cos(time * 0.25) * 0.3;
            rotationY = time * 0.1 + Math.sin(time * 0.2) * 0.4;
            scale = 2.8 + Math.sin(time * 0.6) * 0.2 + touchIntensity * 0.3;
            break;
            
          case 1:
            // Spiral movement
            const spiral = time * 0.5;
            positionX = Math.cos(spiral) * (2 + Math.sin(time * 0.3));
            positionY = Math.sin(spiral) * 1.5 + Math.sin(time * 0.6) * 0.5;
            rotationY = spiral + Math.PI/2 + Math.sin(time * 0.3) * 0.5;
            scale = 2.2 + Math.sin(time * 0.8) * 0.15 + touchIntensity * 0.2;
            break;
            
          case 2:
            // Figure-8 movement
            const t = time * 0.4;
            positionX = Math.sin(t) * 2.5;
            positionY = Math.sin(2 * t) * 1.2;
            rotationY = t + Math.cos(t) * 0.6;
            scale = 2.0 + Math.sin(time * 1.2) * 0.18 + touchIntensity * 0.25;
            break;
            
          case 3:
            // Wobbling descent with touch response
            positionX = Math.sin(time * 0.4 + touchIntensity * 2) * (1.5 + touchIntensity);
            positionY = Math.cos(time * 0.3) * 0.8 - scrollProgress * 4;
            rotationY = scrollProgress * 2 + Math.sin(time * 0.5 + touchIntensity) * 0.8;
            scale = 1.7 + Math.sin(time * 1.5) * 0.1 + touchIntensity * 0.4;
            opacity = THREE.MathUtils.lerp(1, 0.4, Math.min(sectionProgress * 1.5, 1));
            break;
            
          case 4:
            // Gentle floating with fade
            positionX = Math.sin(time * 0.2) * 0.3 + touchIntensity * Math.cos(time);
            positionY = Math.cos(time * 0.25) * 0.2 - scrollProgress * 6;
            rotationY = time * 0.08 + touchIntensity * 0.5;
            scale = 1.3 + Math.sin(time * 0.7) * 0.05 + touchIntensity * 0.2;
            opacity = 0.2;
            break;
            
          default:
            positionX = 0;
            positionY = -scrollProgress * 8;
            rotationY = 0;
            scale = 0.8;
            opacity = 0;
        }
      } else {
        // Original desktop movement logic
        switch(sectionIndex) {
          case 0:
            positionX = 5 + Math.sin(time * 0.2) * 0.3;
            positionY = -0.5 + Math.sin(time * 0.5) * 0.4;
            rotationY = -Math.PI / 2 + Math.sin(time * 0.2) * 0.2;
            scale = 2.4 + Math.sin(time * 0.8) * 0.1;
            break;
            
          case 1:
            const serviceTransition = THREE.MathUtils.smoothstep(sectionProgress, 0, 1);
            positionX = THREE.MathUtils.lerp(5, -5, serviceTransition);
            positionY = Math.sin(time * 0.4 + scrollProgress * Math.PI) * 0.8;
            rotationY = Math.PI / 2 + Math.sin(time * 0.3) * 0.3;
            scale = 2.1 + Math.cos(time * 0.7) * 0.08;
            break;
            
          case 2:
            const projectTransition = THREE.MathUtils.smoothstep(sectionProgress, 0, 1);
            positionX = THREE.MathUtils.lerp(-5, 5, projectTransition);
            positionY = Math.sin(time * 0.4 + scrollProgress * Math.PI * 2) * 1.2;
            rotationY = -Math.PI / 2 + Math.sin(time * 0.3) * 0.3;
            scale = 1.9 + Math.sin(scrollProgress * 4 + time) * 0.15;
            break;
            
          case 3:
            const testimonialTransition = THREE.MathUtils.smoothstep(sectionProgress, 0, 1);
            positionX = THREE.MathUtils.lerp(3.8, -2.5, testimonialTransition) + Math.sin(time * 0.4) * 0.3;
            positionY = THREE.MathUtils.lerp(0.6, 0.8, testimonialTransition) + Math.cos(time * 0.3) * 0.2 - scrollProgress * 6;
            rotationY = -scrollProgress * 1.2 + Math.cos(time * 0.2) * 0.15;
            scale = 1.6 + Math.sin(time * 1.1) * 0.06;
            opacity = THREE.MathUtils.lerp(1, 0.3, Math.min(sectionProgress * 2, 1));
            break;
            
          case 4:
            positionX = -2.5 + Math.sin(time * 0.2) * 0.1;
            positionY = 0.8 + Math.cos(time * 0.3) * 0.1 - scrollProgress * 8;
            rotationY = scrollProgress * 0.5 + time * 0.05;
            scale = 1.2 + Math.sin(time * 0.8) * 0.02;
            opacity = 0.1;
            break;
            
          default:
            positionX = 0;
            positionY = -scrollProgress * 10;
            rotationY = 0;
            scale = 0.5;
            opacity = 0;
        }
      }
      
      setRobotOpacity(opacity);
      
      // Enhanced spark intensity calculation
      const movementIntensity = isMobile 
        ? Math.abs(Math.sin(time * 0.8)) * 1.2 + touchIntensity * 0.5
        : Math.abs(Math.sin(time * 0.5)) * 0.8;
      const sectionSparkBoost = isMobile 
        ? (sectionIndex === 0 ? 1.5 : 0.8)
        : (sectionIndex === 0 ? 1.2 : 0.6);
      setSparkIntensity(movementIntensity * sectionSparkBoost * opacity);
      
      // Smoother interpolation for mobile
      const lerpFactor = isMobile ? 0.06 : 0.04;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, positionX, lerpFactor);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, positionY, lerpFactor);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotationY, lerpFactor * 0.8);
      
      // Enhanced mouse/touch influence
      const mouseInfluence = isMobile ? 0.0003 : 0.0001;
      const touchInfluenceX = isMobile ? touchIntensity * 0.2 : 0;
      const touchInfluenceZ = isMobile ? touchIntensity * 0.15 : 0;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, 
        mouseY * mouseInfluence + Math.sin(time * 0.3) * 0.1 + touchInfluenceX, 
        0.03
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        Math.sin(time * 0.4 + scrollProgress * 2) * 0.06 + touchInfluenceZ,
        0.02
      );
      
      const targetScale = scale;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.03));
      
      // Apply opacity to all materials in the model
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => {
              if (material.transparent !== undefined) {
                material.transparent = true;
                material.opacity = opacity;
              }
            });
          } else {
            const material = mesh.material as THREE.Material;
            if (material.transparent !== undefined) {
              material.transparent = true;
              (material as any).opacity = opacity;
            }
          }
        }
      });
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <primitive object={scene.clone()} />
      <SparkingParticles 
        position={new THREE.Vector3(0, 0, 0)} 
        intensity={sparkIntensity}
        isMobile={isMobile}
      />
    </group>
  );
};

const RobotGLB: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [touchIntensity, setTouchIntensity] = useState(0);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
      
      const sections = 6;
      const section = Math.floor(progress * sections);
      setCurrentSection(Math.min(section, sections - 1));
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: e.clientX - window.innerWidth / 2, 
        y: e.clientY - window.innerHeight / 2 
      });
    };

    // Enhanced touch handling for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (isMobile) {
        setTouchIntensity(1);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isMobile && e.touches[0]) {
        setMousePos({
          x: e.touches[0].clientX - window.innerWidth / 2,
          y: e.touches[0].clientY - window.innerHeight / 2
        });
        setTouchIntensity(Math.min(touchIntensity + 0.1, 1));
      }
    };

    const handleTouchEnd = () => {
      if (isMobile) {
        // Gradually decrease touch intensity
        const decreaseIntensity = () => {
          setTouchIntensity(prev => {
            const newValue = Math.max(prev - 0.05, 0);
            if (newValue > 0) {
              setTimeout(decreaseIntensity, 16);
            }
            return newValue;
          });
        };
        decreaseIntensity();
      }
    };

    // Device motion for mobile (optional gyroscope effect)
    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      if (isMobile && e.accelerationIncludingGravity) {
        const x = (e.accelerationIncludingGravity.x || 0) * 10;
        const y = (e.accelerationIncludingGravity.y || 0) * 10;
        setMousePos(prev => ({
          x: prev.x + x * 0.1,
          y: prev.y + y * 0.1
        }));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    if (isMobile) {
      window.addEventListener('devicemotion', handleDeviceMotion, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile, touchIntensity]);

  return (
    <div className="fixed top-[60px] md:top-0 left-0 w-full h-[calc(100%-60px)] md:h-full pointer-events-none z-10">
      <Canvas
        camera={{ 
          position: [0, 0, isMobile ? 4 : 6], 
          fov: isMobile ? 65 : 50 
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          logarithmicDepthBuffer: true
        }}
        dpr={Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)}
        performance={{ min: 0.5 }}
        shadows={!isMobile} // Disable shadows on mobile for better performance
      >
        <fog attach="fog" args={['#000', 5, isMobile ? 12 : 15]} />
        <ambientLight intensity={isMobile ? 1.2 : 1} />
        <directionalLight 
          position={[10, 10, 8]} 
          intensity={isMobile ? 2 : 1.5} 
          castShadow={!isMobile}
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-10, -10, -8]} intensity={isMobile ? 1.2 : 0.8} color="#8B5CF6" />
        <pointLight position={[10, -10, 8]} intensity={isMobile ? 1.2 : 0.8} color="#3B82F6" />
        <spotLight 
          position={[0, 10, 5]} 
          intensity={isMobile ? 1.5 : 1} 
          color="#00D4FF"
          angle={0.6}
          penumbra={0.5}
          castShadow={!isMobile}
        />
        {isMobile && (
          <>
            <pointLight position={[5, 5, -5]} intensity={0.6} color="#FF6B6B" />
            <pointLight position={[-5, -5, 5]} intensity={0.6} color="#4ECDC4" />
          </>
        )}

        <RobotGLBModel 
          scrollProgress={scrollProgress}
          currentSection={currentSection}
          mouseX={mousePos.x} 
          mouseY={mousePos.y}
          modelPath={modelPath}
          isMobile={isMobile}
          touchIntensity={touchIntensity}
        />
      </Canvas>
    </div>
  );
};

export default RobotGLB;