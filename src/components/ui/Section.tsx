import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
  withGradient?: boolean;
  centered?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  className,
  children,
  title,
  subtitle,
  fullWidth = false,
  withGradient = false,
  centered = false,
}) => {
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section
      className={cn(
        'relative py-16 md:py-24',
        withGradient && 'gradient-primary text-white',
        !fullWidth && 'container mx-auto px-4 md:px-6',
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerAnimation}
    >
      {(title || subtitle) && (
        <div className={cn(
          'mb-12',
          centered && 'text-center'
        )}>
          {title && (
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={itemAnimation}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              className="text-lg md:text-xl opacity-80"
              variants={itemAnimation}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      <motion.div
        className={cn(
          'grid gap-8',
          centered && 'place-items-center'
        )}
        variants={itemAnimation}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};
