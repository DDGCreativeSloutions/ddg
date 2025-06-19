// Performance optimization utilities

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/logo.png', as: 'image', type: 'image/png' },
    { href: '/og-home.jpg', as: 'image', type: 'image/jpeg' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap', as: 'style' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.as === 'style') link.onload = () => { link.rel = 'stylesheet'; };
    document.head.appendChild(link);
  });
};

// Lazy load non-critical CSS
export const loadNonCriticalCSS = () => {
  const nonCriticalCSS = [
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
  ];

  nonCriticalCSS.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => { link.media = 'all'; };
    document.head.appendChild(link);
  });
};

// Optimize images for modern formats
export const supportsWebP = (): Promise<boolean> => {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

export const supportsAVIF = (): Promise<boolean> => {
  return new Promise(resolve => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

// Defer non-critical JavaScript
export const deferNonCriticalJS = () => {
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.src = script.getAttribute('src') || '';
    newScript.defer = true;
    if (script.getAttribute('data-async')) newScript.async = true;
    document.head.appendChild(newScript);
    script.remove();
  });
};

// Optimize font loading
export const optimizeFontLoading = () => {
  // Add font-display: swap to existing font faces
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
  `;
  document.head.appendChild(style);
};

// Implement service worker for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
};

// Critical CSS inlining
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    body { margin: 0; font-family: 'Inter', sans-serif; }
    .hero-section { min-height: 100vh; display: flex; align-items: center; }
    .loading-spinner { 
      width: 40px; height: 40px; border: 4px solid #f3f3f3; 
      border-top: 4px solid #9333ea; border-radius: 50%; 
      animation: spin 1s linear infinite; 
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  // Run immediately
  inlineCriticalCSS();
  preloadCriticalResources();
  optimizeFontLoading();
  
  // Run after DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    loadNonCriticalCSS();
    deferNonCriticalJS();
  });
  
  // Run after page is fully loaded
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
};

// Measure and report Core Web Vitals
export const measureCoreWebVitals = () => {
  // First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
        // Report to analytics
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'timing_complete', {
            name: 'FCP',
            value: Math.round(entry.startTime)
          });
        }
      }
    }
  });
  
  observer.observe({ entryTypes: ['paint'] });
  
  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'timing_complete', {
        name: 'LCP',
        value: Math.round(lastEntry.startTime)
      });
    }
  });
  
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  
  // Cumulative Layout Shift
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Type assertion to LayoutShift which has hadRecentInput and value properties
      const layoutShift = entry as unknown as { hadRecentInput: boolean; value: number };
      if (!layoutShift.hadRecentInput) {
        clsValue += layoutShift.value;
      }
    }
    console.log('CLS:', clsValue);
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'timing_complete', {
        name: 'CLS',
        value: Math.round(clsValue * 1000)
      });
    }
  });
  
  clsObserver.observe({ entryTypes: ['layout-shift'] });
};