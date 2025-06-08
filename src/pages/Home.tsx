import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Award, TrendingUp, Sparkles, Zap, Globe, ShieldCheck, ExternalLink, Code, Palette, Rocket, Brain, Target, MousePointer, Play } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  interface LottieAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    className?: string;
    alt?: string;
  }

  const LottieAnimation = ({ src, className = "", alt = "Animation", ...props }: LottieAnimationProps) => {
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

  const services = [
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
      icon: "🕵‍♂",
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
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
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
        animation: `float 6s ease-in-out infinite ${delay}s, pulse 3s ease-in-out infinite ${delay * 0.5}s`,
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
        .animate-slide-in-left { animation: slideInFromLeft 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInFromRight 0.8s ease-out forwards; }
        .animate-slide-in-bottom { animation: slideInFromBottom 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-bounce-in { animation: bounceIn 0.8s ease-out forwards; }
        .animate-rotate-in { animation: rotateIn 0.8s ease-out forwards; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
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
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
          40%, 43% { transform: translate3d(0,-30px,0) rotate(10deg); }
          70% { transform: translate3d(0,-15px,0) rotate(-5deg); }
          90% { transform: translate3d(0,-4px,0) rotate(2deg); }
        }
      `}</style>

      {/* Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingOrb className="w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-400 top-1/4 left-1/4" delay={0} />
        <FloatingOrb className="w-80 h-80 bg-gradient-to-r from-cyan-400 to-purple-400 bottom-1/4 right-1/4" delay={2} />
        <FloatingOrb className="w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" delay={4} />
        <ParticleField />
      </div>

      {/* Enhanced Hero Section with GIF Lottie */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 overflow-hidden px-2 sm:px-6">
        {/* Optional Simple Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible.hero ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <span className="inline-flex items-center px-5 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
              Trusted by 200+ Projects
            </span>

            <h1 className="text-2xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent leading-tight">
              Design.Deliver.Grow.
            </h1>

            <p className="text-xl md:text-2xl text-gray-700">
              We help you excel in <span className="font-semibold text-purple-600">web design</span>, <span className="font-semibold text-blue-600">project execution</span>, and <span className="font-semibold text-cyan-600">skill development</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/services')}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300"
              >
                Explore Services
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="border-2 border-purple-300 text-purple-700 px-6 py-4 rounded-xl font-bold hover:bg-purple-50 transition duration-300"
              >
                Book Consultation
              </button>
            </div>
          </div>

          {/* Right Content - Animation / Image */}
          <div className={`${isVisible.hero ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="w-full h-96 lg:h-[500px] bg-transparent flex items-center justify-center">
              <LottieAnimation
                src="/DDG1.gif"
                alt="Animation"
                className="w-full h-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-10 sm:py-24 bg-gradient-to-br from-white to-purple-50/50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 sm:mb-20 ${isVisible.services ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-gray-900 mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-lg sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive solutions to help you succeed in your digital journey
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-10 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card group cursor-pointer transition-all duration-700 transform hover:scale-105 ${
                  activeService === index ? 'scale-105' : ''
                } ${isVisible.services ? 'animate-slide-in-bottom' : 'opacity-0'}`}
                onClick={() => setActiveService(activeService === index ? null : index)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-purple-500/10 border border-gray-100 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex flex-col sm:flex-row items-start sm:space-x-8">
                    <div className={`service-icon flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${service.color} rounded-2xl sm:rounded-3xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-all duration-500 shadow-lg mb-4 sm:mb-0`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-3xl font-black text-gray-900 mb-2 sm:mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-4 sm:mb-8 text-base sm:text-xl leading-relaxed">{service.description}</p>

                      {activeService === index && (
                        <div className="space-y-6 sm:space-y-8 animate-slide-in-bottom">
                          <div>
                            <h4 className="font-black text-gray-900 mb-2 sm:mb-6 text-lg sm:text-xl">Features:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-2 sm:space-x-4 animate-bounce-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                                  <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-black text-gray-900 mb-2 sm:mb-6 text-lg sm:text-xl">Packages:</h4>
                            {service.packages.map((pkg, idx) => (
                              <div key={idx} className={`bg-gradient-to-r ${service.color} bg-opacity-10 rounded-xl sm:rounded-3xl p-4 sm:p-8 mb-4 sm:mb-6 hover:bg-opacity-20 transition-all duration-300 animate-scale-in`} style={{ animationDelay: `${idx * 0.2}s` }}>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4">
                                  <h5 className="font-black text-gray-900 text-base sm:text-xl">{pkg.name}</h5>
                                  <span className="text-purple-600 font-black text-base sm:text-xl">{pkg.price}</span>
                                </div>
                                <ul className="text-gray-700 space-y-2 sm:space-y-3">
                                  {pkg.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-center space-x-2 sm:space-x-3">
                                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                      <span className="font-medium text-sm sm:text-base">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button className={`mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${service.color} text-white font-bold rounded-xl sm:rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 shadow-lg w-full sm:w-auto`}>
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
      <section id="projects" className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 ${isVisible.projects ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Explore some of our successful projects across different domains
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <div key={index} className={`group ${isVisible.projects ? 'animate-slide-in-bottom' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 border border-gray-100 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative">
                    <div className="text-6xl mb-8 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">{project.icon}</div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4">{project.title}</h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{project.description}</p>
                    <div className="mb-8">
                      <span className={`inline-block bg-gradient-to-r ${project.color} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg`}>
                        {project.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300">
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
      <section id="testimonials" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 ${isVisible.testimonials ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-2xl text-gray-600 leading-relaxed">
              Real feedback from real people who've experienced our services
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-10 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`group ${isVisible.testimonials ? 'animate-slide-in-bottom' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className="text-5xl mr-6 transform group-hover:scale-125 transition-transform duration-500">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-black text-gray-900 text-xl">{testimonial.name}</h4>
                        <p className="text-gray-600 font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-8">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-7 w-7 text-yellow-400 fill-current animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <p className="text-gray-700 text-xl italic leading-relaxed font-medium">"{testimonial.content}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section id="stats" className="py-12 sm:py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center group ${isVisible.stats ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl text-white mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                  <stat.icon className="h-10 w-10" />
                </div>
                <div className="text-4xl font-black text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">{stat.value}</div>
                <div className="text-purple-100 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section id="cta" className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
          <div className={`${isVisible.cta ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Let's Build Your Dream Project
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Ready to take your business to the next level? Our team is here to help you succeed with cutting-edge solutions.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="group relative bg-gradient-to-r from-white to-gray-100 text-purple-700 text-xl px-12 py-6 rounded-2xl font-black shadow-2xl hover:shadow-white/25 transition-all duration-500 transform hover:scale-105 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Book Free Consultation
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => navigate('/projects')}
                className="group text-xl px-12 py-6 border-3 border-white/30 text-white rounded-2xl font-black hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                <span className="flex items-center">
                  <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  View Projects
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;