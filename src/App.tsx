import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingProvider } from "./context/LoadingContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import AutomationTools from "./pages/AutomationTools";
import AutomationToolDetail from "./pages/automation/AutomationToolDetail";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import BlogPost from '@/components/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Admin from './pages/Admin';
import ClientForm from './pages/ClientForm';

function App() {
  // Test WebP support on mount
  useEffect(() => {
    const testWebP = () => {
      const webP = new Image();
      webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
      webP.onload = function() {
        const result = (webP.width > 0) && (webP.height > 0);
        if (result) {
          document.documentElement.classList.add('webp-support');
        }
      };
    };
    testWebP();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GoogleAnalytics trackingId="G-XXXXXXXXXX" />
            <Routes>
              {/* Routes with Layout */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/services" element={<Layout><Services /></Layout>} />
              <Route path="/projects" element={<Layout><Projects /></Layout>} />
              <Route path="/tools" element={<Layout><AutomationTools /></Layout>} />
              <Route path="/tools/:id" element={<Layout><AutomationToolDetail /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
              <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
              <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
              <Route path="/admin" element={<Layout><Admin /></Layout>} />
              
              {/* Routes without Layout */}
              <Route path="/form" element={<ClientForm />} />
            </Routes>
          </BrowserRouter>
        </LoadingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
