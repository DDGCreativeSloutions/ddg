import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  progress: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, progress }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Logo Container */}
      <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64">
        {/* Rotating Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 sm:border-4 border-blue-500/30"
          style={{
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Pulsing Middle Ring */}
        <motion.div
          className="absolute inset-3 sm:inset-4 rounded-full border-2 sm:border-4 border-purple-500/40"
          style={{
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent'
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: -360
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Inner Logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="/logo.png" 
            alt="DDG Logo"
            className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
          />
        </motion.div>
      </div>

      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              y: [null, -20, null],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Future Tech Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.path
          d="M 0,100 Q 250,200 500,100 T 1000,100"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default LoadingScreen;
