import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color?: string;
  className?: string;
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  color = 'from-purple-600 to-cyan-500',
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={cn(
        'bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl group',
        className
      )}
    >
      <div className={cn(
        'inline-flex items-center justify-center w-12 h-12 rounded-xl text-white mb-4 transform group-hover:scale-110 transition-transform duration-300',
        `bg-gradient-to-r ${color}`
      )}>
        <Icon className="h-6 w-6" />
      </div>
      
      <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent mb-1">
        {value}
      </div>
      
      <div className="text-gray-600 text-sm font-medium">
        {label}
      </div>
    </motion.div>
  );
};
