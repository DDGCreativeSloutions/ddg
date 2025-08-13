import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    let lenis: any;

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');
      
      lenis = new Lenis({
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  const scrollTo = (target: string | HTMLElement | number, options?: any) => {
    if (typeof window !== 'undefined') {
      import('lenis').then(({ default: Lenis }) => {
        const lenis = new Lenis();
        lenis.scrollTo(target, options);
      });
    }
  };

  return { scrollTo };
};
