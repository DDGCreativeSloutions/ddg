import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useScrollParallax } from '../hooks/useScrollParallax';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  offset = 0,
  direction = 'up',
  className = ''
}) => {
  const { transform } = useScrollParallax({ speed, offset, direction });

  return (
    <motion.div
      className={`will-change-transform ${className}`}
      style={{ transform }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;