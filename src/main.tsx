import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializePerformanceOptimizations, measureCoreWebVitals } from './utils/performanceOptimizer'

// Initialize performance optimizations
initializePerformanceOptimizations();

// Measure Core Web Vitals
measureCoreWebVitals();

createRoot(document.getElementById("root")!).render(<App />);
