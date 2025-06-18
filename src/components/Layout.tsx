import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Instagram, Facebook } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Workshops', href: '/workshops' },
    { name: 'Blog', href: '/blog' },
  ];

  useEffect(() => {
    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollY(progress);
    };

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current?.observe(el));

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleBookConsultation = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen">
      <style>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #06b6d4);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #0891b2);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Progress indicator */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(to right, #8b5cf6, #06b6d4);
          transform-origin: 0%;
          z-index: 60;
        }

        /* Animation for elements */
        [data-animate] {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        [data-animate].is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ transform: `scaleX(${scrollY / 100})` }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Creative Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="DesignDeliverGrow Logo"
                  className="h-10 w-auto transition-transform duration-300 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-700 group-hover:via-blue-700 group-hover:to-green-600">
                  DesignDeliverGrow
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* CTA Button */}
              <Button
                onClick={handleBookConsultation}
                className="bg-gradient-to-r from-purple-600 to-cyan-400 hover:from-purple-700 hover:to-cyan-500"
              >
                Book Consultation
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${location.pathname === item.href
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  onClick={() => {
                    handleBookConsultation();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-400 hover:from-purple-700 hover:to-cyan-500"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="relative z-50 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-r from-purple-800/50 via-blue-800/50 to-green-800/50">
                  <img
                    src="/logo.png"
                    alt="DesignDeliverGrow Logo"
                    className="h-8 w-auto"
                  />
                </div>
                <span className="font-bold text-xl">DesignDeliverGrow</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering students, entrepreneurs, and professionals to design impactful digital solutions,
                deliver exceptional outcomes, and grow through technology, creativity, and learning.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
              <div className="space-y-2 text-gray-400">
                <p><strong>Email:</strong> <a href="mailto:info@designdelivergrow.store" className="text-gray-400 hover:text-white transition-colors duration-200">info@designdelivergrow.store</a></p>
                <p><strong>Phone:</strong> +9196428 72160</p>
                <p><strong>Location:</strong> Hyderabad, TS, INDIA</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} DesignDeliverGrow. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/DDGCreativeSloutions" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-6 w-6 text-gray-500 hover:text-purple-600 transition" />
              </a>
              <a href="https://www.linkedin.com/company/designdelivergrow" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-gray-500 hover:text-blue-700 transition" />
              </a>
              <a href="https://www.instagram.com/designdelivergrow/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-gray-500 hover:text-pink-500 transition" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577027030683" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-gray-500 hover:text-blue-600 transition" />
              </a>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <a
  href="https://wa.me/919642872160?text=Hi%20DDG%20Team%2C%20I%20need%20help%20with%20my%20project!"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300"
  style={{ boxShadow: '0 4px 24px rgba(37, 211, 102, 0.3)' }}
  aria-label="Chat on WhatsApp"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.45l-.38-.23-3.67.96.98-3.58-.25-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.98 2.44.02 1.44 1.03 2.84 1.18 3.04.15.2 2.03 3.1 4.93 4.23.69.28 1.23.45 1.65.57.69.18 1.32.16 1.82.1.56-.07 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
  </svg>
</a>
<a
  href="tel:+919642872160"
  className="fixed bottom-6 left-6 z-50 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300"
  style={{ boxShadow: '0 4px 24px rgba(37, 99, 235, 0.3)' }}
  aria-label="Call DDG"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/>
  </svg>
</a>
    </div>
  );
};

export default Layout;
