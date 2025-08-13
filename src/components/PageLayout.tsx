import React from 'react';
import ThreeBackground from './ThreeBackground';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen overflow-hidden relative bg-transparent">
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Main Content */}
      <main className="relative z-20">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
