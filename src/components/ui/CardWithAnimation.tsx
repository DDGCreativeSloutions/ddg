import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardWithAnimationProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'glass' | 'outline';
  animate?: boolean;
  delay?: number;
}

export const CardWithAnimation: React.FC<CardWithAnimationProps> = ({
  className,
  children,
  variant = 'default',
  animate = true,
  delay = 0,
}) => {
  const variants = {
    default: 'bg-white dark:bg-gray-800',
    gradient: 'gradient-primary',
    glass: 'glass',
    outline: 'border border-purple-600 dark:border-purple-400'
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number]
      }
    }
  } as const;

  return (
    <motion.div
      className={cn(
        'rounded-xl p-6 shadow-lg transform-3d perspective-1000 transition-3d hover-lift',
        variants[variant],
        className
      )}
      initial={animate ? "hidden" : false}
      animate={animate ? "visible" : false}
      variants={cardAnimation}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};
