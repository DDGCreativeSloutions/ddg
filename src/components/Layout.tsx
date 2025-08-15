import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [visitCount, setVisitCount] = useState<number | null>(null);

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Automation Tools', href: '/tools' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollY(progress);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current?.observe(el));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch('https://abacus.jasoncameron.dev/hit/designdelivergrow/visits')
      .then((res) => res.json())
      .then((data) => setVisitCount(data.value))
      .catch(() => setVisitCount(null));
  }, []);

  return (
    <div className="min-h-screen">
      <style>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #06b6d4);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #0891b2);
        }

        html { scroll-behavior: smooth; }

        /* Scroll progress bar */
        .scroll-progress {
          position: fixed; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, #8b5cf6, #06b6d4);
          transform-origin: 0%;
          z-index: 60;
        }

        /* Animate-on-scroll base */
        [data-animate] { opacity: 0; transform: translateY(20px); transition: all .6s ease-out; }
        [data-animate].is-visible { opacity: 1; transform: translateY(0); }

        /* Google Font */
        @import url('https://fonts.googleapis.com/css?family=Open+Sans');

        /* ===== Brand reveal (logo only by default; name emerges from behind) ===== */
        .brand-wrapper { display: inline-flex; align-items: center; position: relative; }
        .brand-logo { position: relative; z-index: 10; }
        .brand-name {
          margin-left: .5rem;
          font-weight: 800;
          font-size: 1.125rem;
          line-height: 1;
          background-image: linear-gradient(90deg, #7c3aed, #2563eb);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
          white-space: nowrap;
          max-width: 0;            /* hidden by default */
          opacity: 0;              /* hidden by default */
          transform: translateX(-12px); /* tucked "under" the logo */
          transition: max-width .45s ease, opacity .45s ease, transform .45s ease;
          z-index: 0; /* sits under the logo to look like it comes from behind */
          overflow: hidden;
        }
        /* Hover on the whole brand wrapper */
        .group\\/logo:hover .brand-name {
          max-width: 280px;
          opacity: 1;
          transform: translateX(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-name { transition: none; }
        }

        /* ===== Desktop Nav list styling + purple→blue gradient hover ===== */
        .ddg-nav-list { text-align: center; box-shadow: 0 0 25px rgba(0,0,0,0.1), inset 0 0 1px rgba(255,255,255,0.6);
          padding: 10px 20px; border-radius: 50px; display: inline-block; }
        .ddg-nav-list li { display: inline-block; }
        .ddg-nav-list .nav-link {
          position: relative;
          padding: 18px;
          font-family: "Open Sans", sans-serif;
          text-transform: uppercase;
          color: rgba(0,35,122,0.6);
          font-size: 16px; text-decoration: none; display: block; transition: all .3s ease;
        }
        /* underline indicator */
        .ddg-nav-list .nav-link::after {
          content: ""; position: absolute; left: 18px; right: 18px; bottom: 10px; height: 2px;
          background: linear-gradient(90deg, #8b5cf6, #3b82f6);
          transform: scaleX(0); transform-origin: left; transition: transform .25s ease;
        }
        /* gradient text on hover + active */
        .ddg-nav-list .nav-link:hover,
        .ddg-nav-list .nav-link.active {
          color: transparent !important;
          background-image: linear-gradient(90deg, #8b5cf6, #3b82f6);
          -webkit-background-clip: text; background-clip: text;
          box-shadow: none;
        }
        .ddg-nav-list .nav-link:hover::after,
        .ddg-nav-list .nav-link.active::after { transform: scaleX(1); }

        /* ===== Mobile Navigation gradient hover ===== */
        .ddg-nav-list-mobile { display: flex; flex-direction: column; gap: .5rem; }
        .nav-link-mobile {
          padding: 1rem; font-family: "Open Sans", sans-serif; text-transform: uppercase;
          color: rgba(0,35,122,0.7); font-size: 16px; text-decoration: none; transition: all .3s ease;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0) 100%);
          box-shadow: 0 0 15px rgba(0,0,0,0.05), inset 0 0 1px rgba(255,255,255,0.6);
          border-radius: 10px;
        }
        .nav-link-mobile:hover,
        .nav-link-mobile.active {
          color: transparent !important;
          background:
            linear-gradient(90deg, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.12) 100%),
            linear-gradient(90deg, #8b5cf6, #3b82f6);
          -webkit-background-clip: padding-box, text;
          background-clip: padding-box, text;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1), inset 0 0 1px rgba(255,255,255,0.8);
        }

        /* ===== Fancy checkbox burger (unchanged) ===== */
        .reject-checkbox .checkbox-wrapper * { -webkit-tap-highlight-color: transparent; outline: none; }
        .reject-checkbox .checkbox-wrapper input[type="checkbox"] { display: none; }
        .reject-checkbox .checkbox-wrapper label {
          --size: 50px; --shadow: calc(var(--size) * 0.07) calc(var(--size) * 0.1);
          position: relative; display: block; width: var(--size); height: var(--size); margin: 0 auto;
          background-color: #6a00ff;
          background-image: linear-gradient(43deg, #6a00ff 0%, #3b82f6 100%);
          border-radius: 50%;
          box-shadow: 0 var(--shadow) #ffbeb8; cursor: pointer; transition: .2s ease transform, .2s ease background-color, .2s ease box-shadow; overflow: hidden; z-index: 1;
        }
        .reject-checkbox .checkbox-wrapper label:before {
          content: ""; position: absolute; top: 50%; right: 0; left: 0; width: 70%; height: 70%; margin: 0 auto; background-color: #fff; transform: translateY(-50%); border-radius: 50%;
          box-shadow: inset 0 var(--shadow) #ffbeb8; transition: .2s ease width, .2s ease height;
        }
        .reject-checkbox .checkbox-wrapper label:hover:before { width: 55%; height: 55%; box-shadow: inset 0 var(--shadow) #ff9d96; }
        .reject-checkbox .checkbox-wrapper label:active { transform: scale(0.9); }
        .reject-checkbox .checkbox-wrapper .tick_mark { position: absolute; top: 9px; left: 2px; right: 0; width: 60%; height: 60%; margin: 0 auto; margin-left: 14%; transform: rotateZ(-92deg); }
        .reject-checkbox .checkbox-wrapper .tick_mark:before,
        .reject-checkbox .checkbox-wrapper .tick_mark:after { content: ""; position: absolute; background-color: #fff; border-radius: 2px; opacity: 0; transition: .2s ease transform, .2s ease opacity; }
        .reject-checkbox .checkbox-wrapper .tick_mark:before { left: 0; bottom: 0; width: 10%; height: 30%; box-shadow: -2px 0 5px rgba(0,0,0,0.23); transform: translateY(-68%); }
        .reject-checkbox .checkbox-wrapper .tick_mark:after { left: 0; bottom: 0; width: 100%; height: 10%; box-shadow: 0 3px 5px rgba(0,0,0,0.23); transform: translateX(78%); }
        .reject-checkbox .checkbox-wrapper input[type="checkbox"]:checked + label {
          background-color: #3b82f6; background-image: linear-gradient(43deg, #3b82f6 0%, #6a00ff 100%);
          box-shadow: rgba(0,0,0,0.3) 0px 19px 38px, rgba(0,0,0,0.22) 0px 15px 12px;
        }
        .reject-checkbox .checkbox-wrapper input[type="checkbox"]:checked + label:before { width: 0; height: 0; }
        .reject-checkbox .checkbox-wrapper input[type="checkbox"]:checked + label .tick_mark:before,
        .reject-checkbox .checkbox-wrapper input[type="checkbox"]:checked + label .tick_mark:after {
          background-color: #fff; width: 40%; height: 10%; left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: 1;
        }
        .reject-checkbox .checkbox-wrapper input[type="checkbox"]:checked + label .tick_mark:before { transform: translate(-50%, -50%) rotate(45deg); }
        .reject-checkbox .checkbox-wrapper input[type="checkbox"]:checked + label .tick_mark:after { transform: translate(-50%, -50%) rotate(-45deg); }

        /* ===== Footer candy ===== */
        .footer-glow { position: relative; }
        .footer-glow:before {
          content: ""; position: absolute; inset: 0 0 auto 0; height: 2px;
          background: linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4);
          opacity: 0.9; filter: blur(.4px);
        }
        .gradient-ring {
          background: radial-gradient(60% 60% at 50% 0%, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.12) 40%, rgba(6,182,212,0.0) 70%);
        }
      `}</style>

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollY / 100})` }} />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          {/* Brand: logo only by default; name reveals on hover */}
          <Link
            to="/"
            aria-label="DesignDeliverGrow home"
            className="brand-wrapper group group/logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="brand-logo relative overflow-hidden rounded-xl p-1 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
              <img
                src="/ilogo.png"
                alt="DesignDeliverGrow Logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:rotate-1"
              />
            </div>
            <span className="brand-name">DesignDeliverGrow</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <ul className="ddg-nav-list">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden reject-checkbox">
            <div className="checkbox-wrapper">
              <input
                name="menu_toggle"
                id="menu_toggle"
                type="checkbox"
                checked={isMenuOpen}
                onChange={() => setIsMenuOpen(!isMenuOpen)}
              />
              <label htmlFor="menu_toggle">
                <div className="tick_mark">
                  <div className="cross" />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 backdrop-blur-md z-40 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <motion.div className="p-4 space-y-2" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
                {navigation.map((item, index) => (
                  <motion.div key={item.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 + 0.2 }}>
                    <Link
                      to={item.href}
                      className={`block nav-link-mobile ${location.pathname === item.href ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* CONTENT */}
      {children}

      {/* ADVANCED FOOTER */}
      <footer className="relative z-50 bg-black text-white overflow-hidden footer-glow">
        {/* soft gradient halo */}
        <div className="absolute inset-0 gradient-ring pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 bg-black">

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-10">
            {/* Brand + mission */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-r from-purple-800/50 via-blue-800/50 to-green-800/50">
                  <img src="/ilogo.png" alt="DesignDeliverGrow Logo" className="h-8 w-auto" />
                </div>
                <span className="font-bold text-xl">DesignDeliverGrow</span>
              </div>
              <p className="text-gray-400">
                Crafting high-impact digital products with speed, polish, and empathy. From idea to launch and beyond.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                {visitCount !== null && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Visitors: <strong className="font-semibold">{visitCount}</strong>
                  </span>
                )}
                
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="hover:text-white transition-colors duration-200"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/privacy-policy"onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/blog" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Blog & Insights</Link></li>
                <li><Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><a href="mailto:info@designdelivergrow.store" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2 lg:col-span-2">
              <div>
              <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
              <div className="space-y-2 text-gray-400">
                <p><strong>Email:</strong> <a href="mailto:info@designdelivergrow.store" className="text-gray-400 hover:text-white transition-colors duration-200">info@designdelivergrow.store</a></p>
                <p><strong>Phone:</strong> +916309063641</p>
                <p><strong>Location:</strong> Hyderabad, TG, INDIA</p>
              </div>
            </div>
              <div className="mt-6 flex items-center gap-4">
                <a href="https://github.com/DDGCreativeSloutions" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                   className="p-2 rounded-xl border border-white/10 hover:text-purple-600 transition">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/company/designdelivergrow" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                   className="p-2 rounded-xl border border-white/10 hover:text-blue-700 transition">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/designdelivergrow/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                   className="p-2 rounded-xl border border-white/10 hover:text-pink-500 transition">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61577027030683" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                   className="p-2 rounded-xl border border-white/10 hover:text-blue-600 transition">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} DesignDeliverGrow. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="hover:text-white transition">Privacy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition">Terms</Link>
              
            </div>
          </div>
        </div>
      </footer>

      {/* Floating actions */}
      <a
        href="https://wa.me/916309063641?text=Hi%20DDG%20Team%2C%20I%20need%20help%20with%20my%20project!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300"
        style={{ boxShadow: '0 4px 24px rgba(37, 211, 102, 0.3)' }}
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 24 24">
          <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.45l-.38-.23-3.67.96.98-3.58-.25-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.98 2.44.02 1.44 1.03 2.84 1.18 3.04.15.2 2.03 3.1 4.93 4.23.69.28 1.23.45 1.65.57.69.18 1.32.16 1.82.1.56-.07 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
        </svg>
      </a>

      <a
        href="tel:+916309063641"
        className="fixed bottom-6 left-6 z-50 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300"
        style={{ boxShadow: '0 4px 24px rgba(37, 99, 235, 0.3)' }}
        aria-label="Call DDG"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/>
        </svg>
      </a>
    </div>
  );
};

export default Layout;
