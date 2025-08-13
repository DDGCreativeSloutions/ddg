import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  titleGradient?: boolean;
  className?: string;
  badge?: string;
  centered?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  alignment = 'left',
  titleGradient = false,
  className,
  badge,
  centered = false,
}) => {
  const containerAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.header
      className={cn(
        'mb-12',
        (alignment === 'center' || centered) && 'text-center',
        className
      )}
      initial="hidden"
      animate="visible"
      variants={containerAnimation as any}
    >
      {badge && (
        <motion.div
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200/50 backdrop-blur-sm transform transition-all duration-1000"
          variants={itemAnimation as any}
        >
          <span className="text-sm font-medium text-gray-800">{badge}</span>
        </motion.div>
      )}
      <motion.h1
        className={cn(
          'text-4xl md:text-5xl lg:text-6xl font-bold mb-4',
          titleGradient && 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent'
        )}
        variants={itemAnimation as any}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          variants={itemAnimation as any}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
};
