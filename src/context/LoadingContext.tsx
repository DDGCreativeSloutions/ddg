import React, { createContext, useContext, useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';

interface LoadingContextType {
  setIsLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Pre-load important assets
    const loadAssets = async () => {
      const duration = 2000; // 2 seconds
      const interval = 20; // Update every 20ms
      const steps = duration / interval;
      let currentStep = 0;

      const progressInterval = setInterval(() => {
        currentStep++;
        const newProgress = (currentStep / steps) * 100;
        setLoadingProgress(Math.min(newProgress, 100));

        if (currentStep >= steps) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 500);
        }
      }, interval);

      // Pre-load 3D models and important assets
      try {
        await Promise.all([
          // Pre-load 3D models
          fetch('/models/main-robot.glb'),
          fetch('/models/robot-head.glb'),
          fetch('/models/walking-robot.glb'),
          // Pre-load important images
          new Promise((resolve) => {
            const logo = new Image();
            logo.src = '/logo.png';
            logo.onload = resolve;
          }),
          new Promise((resolve) => {
            const logo = new Image();
            logo.src = '/logo1.png';
            logo.onload = resolve;
          }),
        ]);
      } catch (error) {
        console.error('Failed to load some assets:', error);
      }
    };

    loadAssets();
  }, []);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ setIsLoading, startLoading, stopLoading }}>
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />
      {!isLoading && children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
