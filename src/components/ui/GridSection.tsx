import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GridSectionProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GridSection: React.FC<GridSectionProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className,
}) => {
  const gapSizes = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  const columnSizes = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'grid',
        columnSizes[columns],
        gapSizes[gap],
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerAnimation as any}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemAnimation as any}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
