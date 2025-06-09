import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Award, TrendingUp, Sparkles, Zap, Globe, ShieldCheck, ExternalLink, Code, Palette, Rocket, Brain, Target, MousePointer, Play } from 'lucide-react';

const Home = () => {
  const navigate = (path) => console.log(`Navigate to: ${path}`);
  
  interface ServicePackage {
    name: string;
    price?: string;
    features: string[];
  }
  
  interface Service {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    features: string[];
    packages: ServicePackage[];
  }
  
  const [activeService, setActiveService] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('[id]').forEach(el => {
      if (el.id) observer.observe(el);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Lottie Component
  interface LottieAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    className?: string;
    alt?: string;
  }
  
  const LottieAnimation: React.FC<LottieAnimationProps> = ({ src, className = "", alt = "Animation", ...props }) => {
    return (
      <div className={`lottie-container ${className}`} {...props}>
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          style={{ border: 'none', background: 'transparent' }}
        />
      </div>
    );
  };

  const services: Service[] = [
    {
      title: "Web Design & Development",
      description: "Professional websites that convert visitors into customers",
      icon: <Palette className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"],
      packages: [
        { name: "Static Website", price: "₹4,999 - ₹7,999", features: ["3-5 pages", "Mobile responsive", "SEO basics"] },
        { name: "Dynamic Website", price: "₹12,999 - ₹25,000+", features: ["Login/Auth", "Admin Panel", "Database"] }
      ]
    },
    {
      title: "Student Project Assistance",
      description: "Complete support for your academic projects",
      icon: <Brain className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      features: ["Code Implementation", "Project Reports", "Presentation", "GitHub Setup"],
      packages: [
        { name: "Minor Projects", price: "₹2,000 - ₹4,000", features: ["Idea support", "Basic implementation", "Report"] },
        { name: "Major Projects", price: "₹5,000 - ₹10,000", features: ["End-to-end support", "Code + Report + PPT"] }
      ]
    },
    {
      title: "Social Media Marketing",
      description: "Grow your brand with strategic social media presence",
      icon: <Target className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      features: ["Content Strategy", "Organic Growth", "Ad Campaigns", "Analytics"],
      packages: [
        { name: "Organic Growth", price: "₹3,000/month", features: ["3 platforms", "12 posts/month", "Hashtag strategy"] },
        { name: "Ad Campaigns", price: "From ₹1,500/campaign", features: ["Custom creatives", "Targeting", "Reports"] }
      ]
    },
    {
      title: "Educational Workshops",
      description: "Learn cutting-edge technologies with expert guidance",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      features: ["Expert Instructors", "Hands-on Projects", "Certificates", "Job Support"],
      packages: [
        {
          name: "Full Stack Hackathon Weekend",
          features: ["2 Days", "Frontend + Backend", "Live Deployment", "Team Collaboration"]
        },
        {
          name: "AI in a Day: Build Your First Model",
          features: ["1 Day", "Python & ML Basics", "Real Dataset", "Model Building"]
        }
      ]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      content: "DDG helped me complete my final year project flawlessly. The guidance was exceptional!",
      rating: 5,
      avatar: "👩‍🎓"
    },
    {
      name: "Rahul Gupta",
      role: "Startup Founder",
      content: "Our e-commerce website built by DDG increased our sales by 300%. Highly recommended!",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Anita Verma",
      role: "Marketing Manager",
      content: "Their social media strategy transformed our brand presence. Amazing results in just 3 months!",
      rating: 5,
      avatar: "👩‍💻"
    }
  ];

  const stats = [
    { icon: Award, label: "Projects Delivered", value: "200+", color: "text-purple-600" },
    { icon: Users, label: "Happy Clients", value: "100+", color: "text-blue-600" },
    { icon: TrendingUp, label: "Workshops Delivered", value: "50+", color: "text-green-600" },
    { icon: Star, label: "Average Rating", value: "4.9/5", color: "text-orange-600" }
  ];

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Optimized for speed and performance", color: "from-yellow-400 to-orange-500" },
    { icon: ShieldCheck, title: "Secure & Reliable", description: "Enterprise-grade security standards", color: "from-green-400 to-emerald-500" },
    { icon: Globe, title: "Global Reach", description: "Serving clients across India and beyond", color: "from-blue-400 to-cyan-500" },
    { icon: Sparkles, title: "Modern Design", description: "Latest UI/UX trends and technologies", color: "from-purple-400 to-pink-500" }
  ];

  const featuredProjects = [
    {
      title: "E-Library",
      description: "Digital library for browsing and accessing a wide range of e-books",
      tech: ["HTML", "CSS", "JavaScript", "REST APIs"],
      category: "Web Development",
      icon: "📚",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "LearnByDoing",
      description: "Interactive coding platform enabling users to learn by building real-world projects",
      tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      category: "Full Stack Development",
      icon: "💻",
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "NEO Explorer",
      description: "Web app to visualize NASA's Near Earth Objects using public API data",
      tech: ["JavaScript", "HTML", "CSS", "NASA API"],
      category: "Web Development",
      icon: "🌌",
      color: "from-yellow-500 to-red-500"
    },
    {
      title: "Fake Media Detection",
      description: "AI-powered system to detect fake news and manipulated media using NLP and blockchain",
      tech: ["Python", "XGBoost", "NLP", "Blockchain"],
      category: "AI/ML",
      icon: "🕵‍♂️",
      color: "from-gray-700 to-emerald-500"
    }
  ];

  const ParticleField = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  };

  interface FloatingOrbProps {
    className: string;
    delay?: number;
  }
  
  const FloatingOrb = ({ className, delay = 0 }: FloatingOrbProps) => (
    <div 
      className={`absolute rounded-full blur-xl opacity-30 animate-pulse ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite ${delay}s, pulse 3s ease-in-out infinite ${delay * 0.5}s`
      }}
    />
  );

  return (
    <div className="min-h-screen overflow-hidden relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        @keyframes morphing {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg); }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(90deg); }
          50% { border-radius: 70% 30% 40% 60% / 40% 70% 60% 30%; transform: rotate(180deg); }
          75% { border-radius: 40% 70% 60% 30% / 70% 40% 30% 60%; transform: rotate(270deg); }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(360deg); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes slideInFromLeft {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromRight {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromBottom {
          0% { transform: translateY(100px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes rotateIn {
          0% { transform: rotate(-180deg) scale(0); opacity: 0; }
          100% { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6), 0 0 60px rgba(59, 130, 246, 0.4); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        /* New Advanced Animations */
        @keyframes floatWithGlow {
          0%, 100% { transform: translateY(0) rotate(0deg); filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.3)); }
          25% { transform: translateY(-15px) rotate(5deg); filter: drop-shadow(0 0 12px rgba(147, 51, 234, 0.4)); }
          50% { transform: translateY(-30px) rotate(0deg); filter: drop-shadow(0 0 16px rgba(147, 51, 234, 0.5)); }
          75% { transform: translateY(-15px) rotate(-5deg); filter: drop-shadow(0 0 12px rgba(147, 51, 234, 0.4)); }
        }
        @keyframes textShimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes blurIn {
          0% { filter: blur(15px); opacity: 0; transform: scale(0.9); }
          100% { filter: blur(0); opacity: 1; transform: scale(1); }
        }
        @keyframes floatingNumbers {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-20px) translateX(0); }
          75% { transform: translateY(-10px) translateX(-5px); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(147, 51, 234, 0.3); }
          50% { border-color: rgba(59, 130, 246, 0.6); }
        }
        @keyframes rotateGradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes waveEffect {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(5px) translateY(-5px); }
          50% { transform: translateX(10px) translateY(0); }
          75% { transform: translateX(5px) translateY(5px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
          40%, 43% { transform: translate3d(0,-30px,0) rotate(10deg); }
          70% { transform: translate3d(0,-15px,0) rotate(-5deg); }
          90% { transform: translate3d(0,-4px,0) rotate(2deg); }
        }
        
        /* Animation Classes */
        .animate-slide-in-left { animation: slideInFromLeft 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInFromRight 0.8s ease-out forwards; }
        .animate-slide-in-bottom { animation: slideInFromBottom 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-bounce-in { animation: bounceIn 0.8s ease-out forwards; }
        .animate-rotate-in { animation: rotateIn 0.8s ease-out forwards; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-float-glow { animation: floatWithGlow 6s ease-in-out infinite; }
        .animate-text-shimmer { background-size: 200% auto; animation: textShimmer 3s linear infinite; }
        .animate-pulse-ring { animation: pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite; }
        .animate-blur-in { animation: blurIn 0.8s ease-out forwards; }
        .animate-floating-numbers { animation: floatingNumbers 5s ease-in-out infinite; }
        .animate-border-glow { animation: borderGlow 2s ease-in-out infinite; }
        .animate-rotate-gradient { animation: rotateGradient 8s linear infinite; }
        .animate-breathe { animation: breathe 4s ease-in-out infinite; }
        .animate-wave { animation: waveEffect 3s ease-in-out infinite; }
        .animate-typewriter { overflow: hidden; white-space: nowrap; animation: typewriter 4s steps(40) 1s forwards; }
        .animate-cursor { animation: blink 0.7s infinite; }
        
        .morphing-bg { animation: morphing 12s ease-in-out infinite; }
        .gradient-animate { 
          background-size: 400% 400%;
          animation: gradient-shift 6s ease infinite;
        }
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .lottie-container {
          width: 100%;
          height: 100%;
          border: none;
          background: transparent;
        }
        .service-card:hover .service-icon {
          animation: bounce 0.6s ease-in-out;
        }
        
        /* Futuristic Elements */
        .glow-border {
          position: relative;
        }
        .glow-border::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: inherit;
          padding: 3px;
          background: linear-gradient(45deg, rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .glow-border:hover::after {
          opacity: 1;
        }
        
        .text-gradient-shimmer {
          background: linear-gradient(to right, #9333ea, #3b82f6, #9333ea);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textShimmer 3s linear infinite;
        }
        
        .pulse-ring {
          position: relative;
        }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 0;
          background: linear-gradient(45deg, rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5));
          animation: pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
          z-index: -1;
        }
      `}</style>

      {/* Enhanced Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingOrb className="w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-400 top-1/4 left-1/4 animate-float-glow" delay={0} />
        <FloatingOrb className="w-80 h-80 bg-gradient-to-r from-cyan-400 to-purple-400 bottom-1/4 right-1/4 animate-float-glow" delay={2} />
        <FloatingOrb className="w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float-glow" delay={4} />
        <ParticleField />
        
        {/* Add more dynamic particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.6,
                filter: 'blur(1px)',
                animation: `floatingNumbers ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'breathe 8s ease-in-out infinite'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible.hero ? 'animate-blur-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <span className="inline-flex items-center px-5 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium shadow-sm pulse-ring">
              <Sparkles className="w-4 h-4 mr-2 text-purple-500 animate-wave" />
              Trusted by 200+ Projects
            </span>

            <h1 className="text-2xl md:text-5xl font-black text-gradient-shimmer leading-tight">
              Design.Deliver.Grow.
            </h1>

           <p className="text-xl md:text-2xl text-gray-700 animate-typewriter">
  We help you excel in <span className="font-semibold text-purple-600">web design</span>, <span className="font-semibold text-blue-600">project execution</span>,<br />
  and <span className="font-semibold text-cyan-600">skill development</span>.
</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/services')}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 glow-border"
              >
                Explore Services
              </button>
              <button
                onClick={() => navigate('/contact')}  
                className="border-2 border-purple-300 text-purple-700 px-6 py-4 rounded-xl font-bold hover:bg-purple-50 transition duration-300 animate-border-glow"
              >
                Book Consultation
              </button>
            </div>
          </div>

          <div className={`${isVisible.hero ? 'animate-blur-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <div className="w-full h-96 lg:h-[500px] bg-transparent flex items-center justify-center">
              <LottieAnimation
                src="/DDG1.gif"
                alt="Animation"
                className="w-full h-full rounded-2xl animate-float-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-white to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 ${isVisible.services ? 'animate-blur-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 text-gradient-shimmer">
              Our Services
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-typewriter">
              Comprehensive solutions to help you succeed in your digital journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-card group cursor-pointer transition-all duration-700 transform hover:scale-105 ${
                  activeService === index ? 'scale-105' : ''
                } ${isVisible.services ? 'animate-blur-in' : 'opacity-0'} glow-border`}
                onClick={() => setActiveService(activeService === index ? null : index)}
                style={{animationDelay: `${index * 0.2 + 0.2}s`}}
              >
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/10 border border-gray-100 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative flex items-start space-x-8">
                    <div className={`service-icon flex-shrink-0 w-20 h-20 bg-gradient-to-r ${service.color} rounded-3xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-all duration-500 shadow-lg animate-float-glow`} style={{animationDelay: `${index * 0.5}s`}}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-gradient-shimmer transition-all duration-500">{service.title}</h3>
                      <p className="text-gray-600 mb-8 text-xl leading-relaxed">{service.description}</p>
                      
                      {activeService === index && (
                        <div className="space-y-8 animate-blur-in">
                          <div>
                            <h4 className="font-black text-gray-900 mb-6 text-xl">Features:</h4>
                            <div className="grid grid-cols-2 gap-4">
                              {service.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center space-x-4 animate-blur-in" style={{animationDelay: `${idx * 0.1}s`}}>
                                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 animate-wave" style={{animationDelay: `${idx * 0.2}s`}} />
                                  <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-black text-gray-900 mb-6 text-xl">Packages:</h4>
                            {service.packages.map((pkg: ServicePackage, idx: number) => (
                              <div key={idx} className={`bg-gradient-to-r ${service.color} bg-opacity-10 rounded-3xl p-8 mb-6 hover:bg-opacity-20 transition-all duration-300 animate-blur-in glow-border`} style={{animationDelay: `${idx * 0.2}s`}}>
                                <div className="flex justify-between items-start mb-4">
                                  <h5 className="font-black text-gray-900 text-xl">{pkg.name}</h5>
                                  {pkg.price && <span className="text-purple-600 font-black text-xl animate-floating-numbers">{pkg.price}</span>}
                                </div>
                                <ul className="text-gray-700 space-y-3">
                                  {pkg.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-center space-x-3">
                                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                      <span className="font-medium">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <button className={`mt-8 px-8 py-4 bg-gradient-to-r ${service.color} text-white font-bold rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 shadow-lg pulse-ring`}>
                        {activeService === index ? 'Show Less' : 'Learn More'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 ${isVisible.projects ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Showcasing our expertise through innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredProjects.map((project, index) => (
              <div key={index} className={`group ${isVisible.projects ? 'animate-slide-in-bottom' : 'opacity-0'}`} style={{animationDelay: `${index * 0.2}s`}}>
                <div className={`bg-gradient-to-br ${project.color} p-6 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 h-full relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative text-white">
                    <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-500">{project.icon}</div>
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">{project.category}</span>
                    <h3 className="text-3xl font-black mb-4">{project.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 ${isVisible.testimonials ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-2xl text-gray-600 leading-relaxed">
              Real feedback from real people who've experienced our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`group ${isVisible.testimonials ? 'animate-slide-in-bottom' : 'opacity-0'}`} style={{animationDelay: `${index * 0.2}s`}}>
                <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className="text-5xl mr-4">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-lg mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section id="stats" className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 animate-breathe" style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`${isVisible.stats ? 'animate-blur-in' : 'opacity-0'}`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 glow-border">
                  <div className="flex justify-center mb-4">
                    <stat.icon className={`w-12 h-12 ${stat.color} animate-float-glow`} style={{animationDelay: `${index * 0.3}s`}} />
                  </div>
                  <div className="text-4xl font-black mb-2 animate-floating-numbers">{stat.value}</div>
                  <div className="text-lg font-medium text-white/80">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 ${isVisible.features ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We combine technical expertise with creative excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group ${isVisible.features ? 'animate-slide-in-bottom' : 'opacity-0'}`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-8 shadow-xl hover:shadow-purple-500/10 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className={`w-16 h-16 mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section id="cta" className="py-24 bg-gradient-to-br from-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-transparent"></div>
          <div className="absolute inset-0 morphing-bg opacity-10" style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }}></div>
          
          {/* Add futuristic grid lines */}
          <div className="absolute inset-0 animate-rotate-gradient opacity-20" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`${isVisible.cta ? 'animate-blur-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Ready to Transform Your <span className="text-gradient-shimmer">Digital Presence</span>?
            </h2>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed animate-typewriter">
              Let's collaborate to bring your vision to life with our expertise in design, development, and digital marketing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-purple-600 px-8 py-5 rounded-xl font-bold text-xl shadow-2xl hover:scale-105 transition-all duration-300 animate-glow pulse-ring"
              >
                Get Started Today
              </button>
              <button
                onClick={() => navigate('/services')}
                className="bg-transparent border-2 border-white/50 text-white px-8 py-5 rounded-xl font-bold text-xl hover:bg-white/10 transition-all duration-300 animate-border-glow"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;