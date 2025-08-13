import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Award, 
  TrendingUp, 
  Sparkles, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Code, 
  Palette, 
  Rocket, 
  Brain, 
  Target, 
  Play 
} from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';
import ParallaxSection from '../components/ParallaxSection';
import RobotHeadCTA from '../components/RobotHeadCTA';
import RobotGLB from '../components/RobotGLB';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useMouseParallax } from '../hooks/useScrollParallax';
import CardSwap, { Card } from '../components/CardSwap';

const Home = () => {
  useSmoothScroll();
  
  const [activeService, setActiveService] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { transform: mouseTransform } = useMouseParallax(0.02);

  useEffect(() => {
    const loadAssets = async () => {
      // Start loading progress
      const duration = 2000; // 2 seconds
      const interval = 20; // Update every 20ms
      const steps = duration / interval;
      let currentStep = 0;

      const progressInterval = setInterval(() => {
        currentStep++;
        const newProgress = (currentStep / steps) * 100;

        if (currentStep >= steps) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 500); // Add slight delay before hiding
        }
      }, interval);

      // Pre-load important assets
      await Promise.all([
        // Pre-load 3D models
        new Promise(resolve => {
          const robotModel = new Image();
          robotModel.src = '/models/main-robot.glb';
          robotModel.onload = resolve;
        }),
        new Promise(resolve => {
          const headModel = new Image();
          headModel.src = '/models/robot-head.glb';
          headModel.onload = resolve;
        }),
        // Pre-load important images
        new Promise(resolve => {
          const logo = new Image();
          logo.src = '/logo.png';
          logo.onload = resolve;
        })
      ]);
    };

    loadAssets();
  }, []);
  
  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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

  const services: Service[] = [
    {
      title: "Web Design & Development",
      description: "Professional websites that convert visitors into customers",
      icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" />,
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
      icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
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
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-green-500 to-teal-500",
      features: ["Content Strategy", "Organic Growth", "Ad Campaigns", "Analytics"],
      packages: [
        { name: "Organic Growth", price: "₹3,000/month", features: ["3 platforms", "12 posts/month", "Hashtag strategy"] },
        { name: "Ad Campaigns", price: "From ₹1,500/campaign", features: ["Custom creatives", "Targeting", "Reports"] }
      ]
    },
    {
      title: "Automation Tools",
      description: "WhatsApp Bulk Message Sender for personalized campaigns at scale",
      icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-orange-500 to-red-500",
      features: [
        "Bulk sending with smart batching",
        "Personalization with name/placeholders",
        "CSV/Excel contact import",
        "Scheduling & rate limiting"
      ],
      packages: [
        {
          name: "Free Trial",
          features: ["Limited sends", "CSV import", "Templates", "Basic scheduling"]
        },
        {
          name: "Pro Campaigns",
          features: ["Higher limits", "Media attachments", "Advanced scheduling", "Delivery reports"]
        }
      ]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      content: "DDG helped me complete my final year project flawlessly. The guidance was exceptional and made all the difference!",
      rating: 5,
      avatar: "👩‍🎓",
      highlight: "A+"
    },
    {
      name: "Rahul Gupta",
      role: "Startup Founder",
      content: "Our e-commerce website built by DDG increased our sales by 300%. The team delivered beyond expectations!",
      rating: 5,
      avatar: "👨‍💼",
      highlight: "300%"
    },
    {
      name: "Anita Verma",
      role: "Marketing Manager",
      content: "Their social media strategy transformed our brand presence. Amazing results in just 3 months with dedicated support!",
      rating: 5,
      avatar: "👩‍💻",
      highlight: "3M"
    }
  ];

  const features = [
    { 
      icon: Zap, 
      title: "Lightning Fast", 
      description: "Optimized for speed and performance with cutting-edge technologies", 
      color: "from-yellow-400 to-orange-500",
      stats: "99.9% Uptime"
    },
    { 
      icon: ShieldCheck, 
      title: "Secure & Reliable", 
      description: "Enterprise-grade security standards with advanced encryption", 
      color: "from-green-400 to-emerald-500",
      stats: "256-bit SSL"
    },
    { 
      icon: Globe, 
      title: "Global Reach", 
      description: "Serving clients across India and beyond with 24/7 support", 
      color: "from-blue-400 to-cyan-500",
      stats: "50+ Countries"
    },
    { 
      icon: Sparkles, 
      title: "Modern Design", 
      description: "Latest UI/UX trends and technologies for exceptional user experience", 
      color: "from-purple-400 to-pink-500",
      stats: "100% Custom"
    }
  ];

  const featuredProjects = [
    {
      title: "E-Library",
      description: "Digital library for browsing and accessing a wide range of e-books",
      backDescription: "Built with modern web technologies for seamless user experience. Features include advanced search, bookmarking, and reading progress tracking.",
      tech: ["HTML", "CSS", "JavaScript", "REST APIs"],
      category: "Web Development",
      icon: "📚",
      color: "from-purple-500 to-pink-500",
      features: ["Advanced Search", "User Profiles", "Reading Progress", "Responsive Design"]
    },
    {
      title: "LearnByDoing",
      description: "Interactive coding platform enabling users to learn by building real-world projects",
      backDescription: "Full-stack application with user authentication, progress tracking, and real-time code execution environment for hands-on learning.",
      tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      category: "Full Stack Development",
      icon: "💻",
      color: "from-indigo-500 to-blue-500",
      features: ["Live Code Editor", "Project Gallery", "Peer Reviews", "Certificates"]
    },
    {
      title: "NEO Explorer",
      description: "Web app to visualize NASA's Near Earth Objects using public API data",
      backDescription: "Interactive visualization tool with real-time data from NASA APIs. Features 3D models, orbital predictions, and impact assessments.",
      tech: ["JavaScript", "HTML", "CSS", "NASA API"],
      category: "Web Development",
      icon: "🌌",
      color: "from-yellow-500 to-red-500",
      features: ["3D Visualization", "Real-time Data", "Orbital Tracking", "Impact Analysis"]
    },
    {
      title: "Fake Media Detection",
      description: "AI-powered system to detect fake news and manipulated media using NLP and blockchain",
      backDescription: "Advanced ML model with 95% accuracy in detecting deepfakes and misinformation. Blockchain integration ensures content authenticity.",
      tech: ["Python", "XGBoost", "NLP", "Blockchain"],
      category: "AI/ML",
      icon: "🕵‍♂️",
      color: "from-gray-700 to-emerald-500",
      features: ["95% Accuracy", "Blockchain Verify", "Real-time Detection", "API Integration"]
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden relative bg-transparent">
      
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Interactive Robot (GLB model) that moves with user */}
      <RobotGLB modelPath="/models/main-robot.glb" />
      
      {/* Floating Robot Head for Testimonials and CTA */}
      <RobotHeadCTA />

      {/* Custom CSS for flip cards and buttons */}
      <style>{`
        .flip-card {
          background-color: transparent;
          width: 100%;
          max-width: 300px;
          height: 400px;
          perspective: 1000px;
          font-family: sans-serif;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border: 1px solid #f97316;
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .flip-card-front {
          background: linear-gradient(120deg, #6366f1 60%, #e0e7ff 88%, #3b82f6 40%, #dbeafe 48%);
          color: #4338ca;
        }

        .flip-card-back {
          background: linear-gradient(120deg, #93c5fd 30%, #3b82f6 88%, #c7d2fe 40%, #6366f1 78%);
          color: #1e3a8a;
          transform: rotateY(180deg);
        }

        .gradient-button {
          position: relative;
          width: 140px;
          height: 45px;
          background-color: #000;
          display: flex;
          align-items: center;
          color: white;
          flex-direction: column;
          justify-content: center;
          border: none;
          padding: 12px;
          gap: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          text-align: center;
        }

        .gradient-button::before {
          content: '';
          position: absolute;
          inset: 0;
          left: -4px;
          top: -1px;
          margin: auto;
          width: 148px;
          height: 53px;
          border-radius: 10px;
          background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
          z-index: -10;
          pointer-events: none;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .gradient-button::after {
          content: "";
          z-index: -1;
          position: absolute;
          inset: 0;
          background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
          transform: translate3d(0, 0, 0) scale(0.95);
          filter: blur(20px);
        }

        .gradient-button:hover::after {
          filter: blur(30px);
        }

        .gradient-button:hover::before {
          transform: rotate(-180deg);
        }

        .gradient-button:active::before {
          scale: 0.7;
        }

        .testimonial-outer {
          width: 100%;
          max-width: 350px;
          height: 300px;
          border-radius: 10px;
          padding: 1px;
          background: radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d);
          position: relative;
        }

        .testimonial-dot {
          width: 5px;
          aspect-ratio: 1;
          position: absolute;
          background-color: #fff;
          box-shadow: 0 0 10px #ffffff;
          border-radius: 100px;
          z-index: 2;
          right: 10%;
          top: 10%;
          animation: moveDot 6s linear infinite;
        }

        @keyframes moveDot {
          0%, 100% { top: 10%; right: 10%; }
          25% { top: 10%; right: calc(100% - 35px); }
          50% { top: calc(100% - 30px); right: calc(100% - 35px); }
          75% { top: calc(100% - 30px); right: 10%; }
        }

        .testimonial-card {
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 9px;
          border: solid 1px #202222;
          background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-direction: column;
          color: #fff;
          padding: 1.5rem;
        }

        .testimonial-ray {
          width: 220px;
          height: 45px;
          border-radius: 100px;
          position: absolute;
          background-color: #c7c7c7;
          opacity: 0.4;
          box-shadow: 0 0 50px #fff;
          filter: blur(10px);
          transform-origin: 10%;
          top: 0%;
          left: 0;
          transform: rotate(40deg);
        }

        .testimonial-highlight {
          font-weight: bolder;
          font-size: 3rem;
          background: linear-gradient(45deg, #000000 4%, #fff, #000);
          background-clip: text;
          color: transparent;
          margin-bottom: 1rem;
        }

        .testimonial-line {
          width: 100%;
          height: 1px;
          position: absolute;
          background-color: #2c2c2c;
        }

        .testimonial-topl {
          top: 10%;
          background: linear-gradient(90deg, #888888 30%, #1d1f1f 70%);
        }

        .testimonial-bottoml {
          bottom: 10%;
        }

        .testimonial-leftl {
          left: 10%;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, #747474 30%, #222424 70%);
        }

        .testimonial-rightl {
          right: 10%;
          width: 1px;
          height: 100%;
        }
      `}</style>

      <main id="main-content" className="relative z-20">
        {/* Revolutionary Hero Section */}
        <section className="relative min-h-screen flex items-center justify-start perspective-1000 px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.2} className="relative z-10 max-w-7xl mx-auto py-12 sm:py-16 w-full">
            <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl">
              <motion.div 
                className="space-y-6 sm:space-y-8 lg:space-y-10"
                initial={{ opacity: 0, x: -100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div 
                  className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-black rounded-full text-xs sm:text-sm font-medium shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-purple-600 animate-glow-pulse" />
                  Trusted by 200+ Projects
                </motion.div>

                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight transform-3d break-words"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  Design.Deliver.Grow
                </motion.h1>
                
                <motion.h2 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Professional Web Design & Development Services in India
                </motion.h2>

                <motion.div 
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-black leading-relaxed backdrop-blur-sm bg-white/10 p-4 sm:p-6 rounded-2xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p className="max-w-3xl">
                    Transform your digital presence with expert <strong className="text-purple-600">web design</strong>, <strong className="text-blue-600">student project assistance</strong>, and <strong className="text-cyan-600">automation tools</strong>. We help students, startups, and businesses grow online.
                  </p>
                </motion.div>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <motion.button
                    className="px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-2xl shadow-3d backdrop-blur-xl hover:shadow-glow-purple transition-all duration-500 group text-sm sm:text-base"
                    whileHover={{ scale: 1.05, rotateX: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Explore our web design and development services"
                  >
                    Explore Our Services
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-xl bg-white/10 border border-white/20 text-black font-bold rounded-2xl hover:bg-white/20 transition-all duration-500 text-sm sm:text-base"
                    whileHover={{ scale: 1.05, rotateX: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Book a free consultation with our experts"
                  >
                    Book Free Consultation
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </ParallaxSection>
        </section>

        {/* Services Section - Left Aligned with Gradient Buttons */}
        <ParallaxSection speed={0.3}>
          <section className="pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-14 lg:pb-16 relative px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-left mb-12 sm:mb-16 lg:mb-20 max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Our Digital Services
                </h2>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-900 max-w-3xl leading-relaxed backdrop-blur-sm bg-white/10 p-4 sm:p-6 rounded-2xl border border-white/10">
                  Comprehensive web design, student project assistance, and digital marketing solutions
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 max-w-5xl">
                {services.map((service, index) => (
                  <motion.div 
                    key={index}
                    className="group cursor-pointer perspective-1000"
                    onClick={() => setActiveService(activeService === index ? null : index)}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 h-full transform-3d backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-3d hover:bg-white/15 transition-all duration-500">
                      <motion.div 
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${service.color} rounded-3xl flex items-center justify-center text-white shadow-3d`}
                        whileHover={{ rotateY: 180, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {service.icon}
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-3 sm:mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                          {service.title}
                        </h3>
                        <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                          {service.description}
                        </p>
                        
                        {activeService === index && (
                          <motion.div 
                            className="space-y-6 sm:space-y-8"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div>
                              <h4 className="font-black text-gray-900 mb-4 sm:mb-6 text-lg sm:text-xl">Features:</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {service.features.map((feature: string, idx: number) => (
                                  <motion.div 
                                    key={idx} 
                                    className="flex items-center space-x-3 sm:space-x-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                  >
                                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 animate-glow-pulse" />
                                    <span className="text-gray-800 font-medium text-sm sm:text-base">{feature}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-black text-gray-900 mb-4 sm:mb-6 text-lg sm:text-xl">Packages:</h4>
                              {service.packages.map((pkg: ServicePackage, idx: number) => (
                                <motion.div 
                                  key={idx} 
                                  className={`backdrop-blur-xl bg-gradient-to-r ${service.color} bg-opacity-20 border border-white/20 rounded-3xl p-6 sm:p-8 mb-4 sm:mb-6 hover:shadow-3d transition-all duration-300`}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.2 }}
                                  whileHover={{ scale: 1.02, rotateX: 2 }}
                                >
                                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                                    <h5 className="font-black text-gray-900 text-lg sm:text-xl mb-2 sm:mb-0">{pkg.name}</h5>
                                    {pkg.price && (
                                      <span className="text-purple-600 font-black text-lg sm:text-xl">
                                        {pkg.price}
                                      </span>
                                    )}
                                  </div>
                                  <ul className="text-gray-700 space-y-2 sm:space-y-3">
                                    {pkg.features.map((feature, fidx) => (
                                      <li key={fidx} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full animate-glow-pulse mt-2"></div>
                                        <span className="font-medium text-sm sm:text-base">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                        
                        <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
                          <motion.button 
                            className="gradient-button text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {activeService === index ? 'Show Less' : 'Learn More'}
                          </motion.button>
                          

                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ParallaxSection>

        {/* Projects Section - Right Aligned with Flip Cards */}
        <ParallaxSection speed={0.4}>
          <section className="py-16 sm:py-20 lg:py-24 relative px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-right mb-12 sm:mb-16 lg:mb-20 ml-auto max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Featured Projects
                </h2>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-900 max-w-3xl leading-relaxed backdrop-blur-sm bg-white/10 p-4 sm:p-6 rounded-2xl border border-white/10 ml-auto">
                  Showcasing our expertise through innovative solutions
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 max-w-7xl ml-auto justify-items-center">
                {featuredProjects.map((project, index) => (
                  <motion.div 
                    key={index}
                    className="flip-card w-full max-w-[280px]"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="text-4xl sm:text-5xl mb-4">{project.icon}</div>
                        <span className="inline-block px-3 py-1 backdrop-blur-xl bg-white/20 border border-white/30 rounded-full text-xs font-medium mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black mb-3 leading-tight">{project.title}</h3>
                        <p className="text-sm leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {project.tech.slice(0, 2).map((tech: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 backdrop-blur-xl bg-white/20 border border-white/30 rounded-full text-xs font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flip-card-back">
                        <h3 className="text-lg font-black mb-4">{project.title} Details</h3>
                        <p className="text-sm leading-relaxed mb-4">{project.backDescription}</p>
                        
                        <div className="space-y-2 mb-4">
                          <h4 className="font-bold text-sm">Key Features:</h4>
                          {project.features.map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center text-xs">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-300" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 justify-center">
                          {project.tech.map((tech: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 backdrop-blur-xl bg-white/20 border border-white/30 rounded-full text-xs font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ParallaxSection>

        {/* Testimonials Section - Left Aligned with Futuristic Cards */}
        <ParallaxSection speed={0.2}>
          <section className="py-16 sm:py-20 lg:py-24 relative px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-left mb-12 sm:mb-16 lg:mb-20 max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                  What Our Clients Say
                </h2>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-900 leading-relaxed max-w-3xl backdrop-blur-sm bg-white/10 p-4 sm:p-6 rounded-2xl border border-white/10">
                  Real feedback from real people who've experienced our services
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6 max-w-6xl justify-items-center">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    className="testimonial-outer"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="testimonial-dot"></div>
                    <div className="testimonial-card">
                      <div className="testimonial-ray"></div>
                      <div className="testimonial-line testimonial-topl"></div>
                      <div className="testimonial-line testimonial-bottoml"></div>
                      <div className="testimonial-line testimonial-leftl"></div>
                      <div className="testimonial-line testimonial-rightl"></div>
                      
                      <div className="testimonial-highlight">{testimonial.highlight}</div>
                      
                      <div className="flex items-center mb-4">
                        <div className="text-2xl mr-3">{testimonial.avatar}</div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{testimonial.name}</h4>
                          <p className="text-gray-300 text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-200 text-xs text-center leading-relaxed mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ParallaxSection>

        {/* Features Section - Side by Side Layout */}
        <ParallaxSection speed={0.3}>
          <section className="py-16 sm:py-20 lg:py-24 relative px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left side - Content */}
                <motion.div 
                  className="order-1 lg:order-1 mb-8 lg:mb-0"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                    Why Choose Us
                  </h2>
                  <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-black max-w-3xl leading-relaxed backdrop-blur-sm bg-white/10 p-4 sm:p-6 rounded-2xl border border-white/10 mb-8">
                    We combine technical expertise with creative excellence
                  </p>
                
                </motion.div>

                {/* Right side - CardSwap */}
                <motion.div 
                  className="order-2 lg:order-2 flex justify-center lg:justify-end"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative h-[460px] sm:h-[500px] lg:h-[520px] w-full max-w-[400px]">
                    <CardSwap
                      width={320}
                      height={400}
                      cardDistance={30}
                      verticalDistance={40}
                      delay={3000}
                      pauseOnHover={true}
                      easing="elastic"
                    >
                      {features.map((feature, index) => (
                        <Card key={index} customClass="p-6 text-white">
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className={`w-16 h-16 mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-3d`}>
                              <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            
                            <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                            <p className="text-gray-300 leading-relaxed text-sm mb-4">{feature.description}</p>
                            
                            <div className="mt-auto">
                              <span className={`inline-block px-4 py-2 bg-gradient-to-r ${feature.color} rounded-full text-white font-bold text-sm`}>
                                {feature.stats}
                              </span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </CardSwap>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </ParallaxSection>

        {/* CTA Section with Robot Head Transition */}
        <ParallaxSection speed={0.1}>
          <section className="pt-10 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24 relative px-4 sm:px-6 lg:px-8">
            {/* Robot Head will float here from previous section */}
            
            <div className="relative max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1 }}
                className="perspective-1000"
              >
                <motion.h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent transform-3d"
                  style={{ transform: mouseTransform }}
                >
                  Ready to Transform Your Digital Presence?
                </motion.h2>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black max-w-4xl mb-8 sm:mb-12 leading-relaxed mx-auto backdrop-blur-sm bg-white/10 p-4 sm:p-6 rounded-2xl border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Let's collaborate to bring your vision to life with our expertise in design, development, and digital marketing.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 perspective-1000 justify-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.button
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 sm:px-8 sm:py-5 rounded-2xl font-bold text-base sm:text-xl shadow-3d backdrop-blur-xl"
                    whileHover={{ 
                      scale: 1.05, 
                      rotateX: 5,
                      boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started Today
                  </motion.button>
                  
                  <motion.button
                    className="backdrop-blur-xl bg-white/10 border-2 border-white/30 text-black px-6 py-3 sm:px-8 sm:py-5 rounded-2xl font-bold text-base sm:text-xl"
                    whileHover={{ 
                      scale: 1.05, 
                      rotateX: -5,
                      backgroundColor: "rgba(255,255,255,0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Services
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </ParallaxSection>
      </main>
    </div>
  );
};

export default Home;
