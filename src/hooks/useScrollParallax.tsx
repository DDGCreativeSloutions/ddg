import { useEffect, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const useScrollParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0, direction = 'up' } = options;
  const [scrollY, setScrollY] = useState(0);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const parallaxValue = (currentScrollY + offset) * speed;
      
      switch (direction) {
        case 'up':
          setTransform(`translateY(${-parallaxValue}px)`);
          break;
        case 'down':
          setTransform(`translateY(${parallaxValue}px)`);
          break;
        case 'left':
          setTransform(`translateX(${-parallaxValue}px)`);
          break;
        case 'right':
          setTransform(`translateX(${parallaxValue}px)`);
          break;
        default:
          setTransform(`translateY(${-parallaxValue}px)`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset, direction]);

  return { scrollY, transform };
};

export const useMouseParallax = (strength: number = 0.05) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (clientX - centerX) * strength;
      const deltaY = (clientY - centerY) * strength;
      
      setMousePosition({ x: deltaX, y: deltaY });
      setTransform(`translate3d(${deltaX}px, ${deltaY}px, 0) rotateX(${deltaY * 0.05}deg) rotateY(${deltaX * 0.05}deg)`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return { mousePosition, transform };
};
