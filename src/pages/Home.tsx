import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Award, TrendingUp, Sparkles, Zap, Globe, ShieldCheck, ExternalLink, Code, Palette, Rocket, Brain, Target, MousePointer, Play } from 'lucide-react';
import SEO from '../components/SEO';

const Home = () => {
  const navigate = useNavigate();

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
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({ hero: true });
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Set initial visibility for hero section
    setIsVisible(prev => ({ ...prev, hero: true }));

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observerOptions = {
      threshold: 0,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.id) {
          setIsVisible(prev => ({ 
            ...prev, 
            [entry.target.id]: entry.isIntersecting || prev[entry.target.id]
          }));
        }
      });
    }, observerOptions);

    // Explicitly observe hero section
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Observe other sections
    document.querySelectorAll('[id]').forEach(el => {
      if (el.id && el.id !== 'hero') observer.observe(el);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
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
      title: "Automation Tools",
      description: "WhatsApp Bulk Message Sender for personalized campaigns at scale",
      icon: <Rocket className="w-8 h-8" />,
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
    { icon: TrendingUp, label: "Automation Tools Launched", value: "10+", color: "text-green-600" },
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

  // SEO Data
  const faqData = [
    {
      question: "What services does DesignDeliverGrow offer?",
      answer: "We offer web design & development, student project assistance, social media marketing, and automation tools to help you grow digitally."
    },
    {
      question: "How can DesignDeliverGrow help with student projects?",
      answer: "We provide end-to-end support for academic projects including code implementation, project reports, presentations, and GitHub setup for both minor and major projects."
    },
    {
      question: "What makes DesignDeliverGrow different from other web design companies?",
      answer: "We combine professional web design with educational support, offering personalized guidance for students, startups, and businesses with affordable pricing and comprehensive solutions."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://www.designdelivergrow.store/" }
  ];
  return (
    <React.Fragment>
      <SEO
        title="DesignDeliverGrow - Web Design, Student Projects, Automation Tools & Digital Marketing"
        description="Transform your digital presence with DesignDeliverGrow. Expert web design & development, student project assistance, social media marketing, and automation tools. Trusted by 200+ projects across India."
        keywords="web design India, website development, student project assistance, social media marketing, automation tools, React development, Node.js development, digital marketing, UI UX design, professional websites, academic projects, CSE projects, final year projects, startup websites, responsive design, SEO optimized websites"
        canonical="https://www.designdelivergrow.store/"
        ogImage="https://www.designdelivergrow.store/og-home.jpg"
        faqSchema={faqData}
        reviewSchema={{
          ratingValue: 4.9,
          reviewCount: 150,
          bestRating: 5,
          worstRating: 1
        }}
        localBusinessSchema={{
          address: "India",
          telephone: "+91-9642872160",
          priceRange: "₹₹",
          openingHours: [
            "Monday:09:00-18:00",
            "Tuesday:09:00-18:00", 
            "Wednesday:09:00-18:00",
            "Thursday:09:00-18:00",
            "Friday:09:00-18:00",
            "Saturday:10:00-16:00"
          ]
        }}
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen overflow-hidden relative text-responsive">
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

      {/* Enhanced Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none hidden sm:block">
        <FloatingOrb className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-purple-400 to-blue-400 top-1/4 left-1/4 animate-float-glow" delay={0} />
        <FloatingOrb className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-cyan-400 to-purple-400 bottom-1/4 right-1/4 animate-float-glow" delay={2} />
        <FloatingOrb className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-400 to-cyan-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float-glow" delay={4} />
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
      <main id="main-content">      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(to right, rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className={`space-y-6 sm:space-y-8 ${isVisible.hero ? 'animate-blur-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <span className="inline-flex items-center px-5 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium shadow-sm pulse-ring">
                <Sparkles className="w-4 h-4 mr-2 text-purple-500 animate-wave" />
                Trusted by 200+ Projects
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-gradient-shimmer leading-tight">
                Design.Deliver.Grow
              </h1>
              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gradient-shimmer'>A Professional Web Design & Development Services in India</h2>

              <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                <p className="max-w-xs sm:max-w-lg lg:max-w-2xl">
                  Transform your digital presence with expert <strong>web design</strong>, <strong>student project assistance</strong>, and <strong>automation tools</strong>. We help students, startups, and businesses grow online.
                </p>
              </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                onClick={() => navigate('/services')}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 glow-border text-sm sm:text-base"
                aria-label="Explore our web design and development services"
              >
                Explore Our Services
              </button>
              <button
                onClick={() => navigate('/contact')}  
                className="border-2 border-purple-300 text-purple-700 px-6 py-3 sm:py-4 rounded-xl font-bold hover:bg-purple-50 transition duration-300 animate-border-glow text-sm sm:text-base"
                aria-label="Book a free consultation with our experts"
              >
                Book Free Consultation
              </button>
            </div>

            {/* Quick Links for Internal Linking */}
            <div className="flex flex-wrap gap-2 pt-4 text-sm">
              <button 
                onClick={() => navigate('/services')} 
                className="text-purple-600 hover:text-purple-800 underline"
              >
                Web Development
              </button>
              <span className="text-gray-400">•</span>
              <button 
                onClick={() => navigate('/services')} 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Student Projects
              </button>
              <span className="text-gray-400">•</span>
              <button 
                onClick={() => navigate('/tools')} 
                className="text-cyan-600 hover:text-cyan-800 underline"
              >
                Automation Tools
              </button>
              <span className="text-gray-400">•</span>
              <button 
                onClick={() => navigate('/projects')} 
                className="text-green-600 hover:text-green-800 underline"
              >
                Portfolio
              </button>
            </div>
          </div>          
           <div className={`mt-8 lg:mt-0 ${isVisible.hero ? 'animate-blur-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-transparent flex items-center justify-center">
              <LottieAnimation
                src="/assets/DDG1.gif"
                alt="DesignDeliverGrow - Professional web design and development services animation"
                className="w-full h-full rounded-xl sm:rounded-2xl animate-float-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-white to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 sm:mb-20 ${isVisible.services ? 'animate-blur-in' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-4 sm:mb-6 text-gradient-shimmer">
              Our Digital Services
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Comprehensive <strong>web design</strong>, <strong>student project assistance</strong>, and <strong>digital marketing solutions</strong> to help you succeed online
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button 
                onClick={() => navigate('/services')} 
                className="text-purple-600 hover:text-purple-800 underline font-medium"
              >
                View All Services
              </button>
              <span className="text-gray-400">•</span>
              <button 
                onClick={() => navigate('/contact')} 
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Get Quote
              </button>
              <span className="text-gray-400">•</span>
              <button 
                onClick={() => navigate('/projects')} 
                className="text-green-600 hover:text-green-800 underline font-medium"
              >
                See Our Work
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-card group cursor-pointer transition-all duration-700 transform hover:scale-105 ${
                  activeService === index ? 'scale-105' : ''
                } ${isVisible.services ? 'animate-blur-in' : 'opacity-0'} glow-border`}
                onClick={() => setActiveService(activeService === index ? null : index)}
                style={{animationDelay: `${index * 0.2 + 0.2}s`}}
              >
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-purple-500/10 border border-gray-100 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                    <div className={`service-icon flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r ${service.color} rounded-2xl sm:rounded-3xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-all duration-500 shadow-lg animate-float-glow`} style={{animationDelay: `${index * 0.5}s`}}>
                      {React.cloneElement(service.icon as React.ReactElement, { className: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" })}
                    </div>
                    <div className="flex-1 w-full">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-3 sm:mb-4 group-hover:text-gradient-shimmer transition-all duration-500 leading-tight">{service.title}</h3>
                      <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl leading-relaxed">{service.description}</p>
                      
                      {activeService === index && (
                        <div className="space-y-6 sm:space-y-8 animate-blur-in">
                          <div>
                            <h4 className="font-black text-gray-900 mb-4 sm:mb-6 text-lg sm:text-xl">Features:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              {service.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center space-x-3 sm:space-x-4 animate-blur-in" style={{animationDelay: `${idx * 0.1}s`}}>
                                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0 animate-wave" style={{animationDelay: `${idx * 0.2}s`}} />
                                  <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-black text-gray-900 mb-4 sm:mb-6 text-lg sm:text-xl">Packages:</h4>
                            {service.packages.map((pkg: ServicePackage, idx: number) => (
                              <div key={idx} className={`bg-gradient-to-r ${service.color} bg-opacity-10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 hover:bg-opacity-20 transition-all duration-300 animate-blur-in glow-border`} style={{animationDelay: `${idx * 0.2}s`}}>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                                  <h5 className="font-black text-gray-900 text-lg sm:text-xl break-words">{pkg.name}</h5>
                                  {pkg.price && <span className="text-purple-600 font-black text-base sm:text-lg lg:text-xl animate-floating-numbers break-words">{pkg.price}</span>}
                                </div>
                                <ul className="text-gray-700 space-y-2 sm:space-y-3">
                                  {pkg.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-start space-x-3">
                                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse mt-2 flex-shrink-0"></div>
                                      <span className="font-medium text-sm sm:text-base break-words">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <button className={`mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${service.color} text-white font-bold rounded-xl sm:rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 shadow-lg pulse-ring text-sm sm:text-base`}>
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
          <div className={`text-center mb-16 sm:mb-20 ${isVisible.projects ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Showcasing our expertise through innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {featuredProjects.map((project, index) => (
              <div key={index} className={`group ${isVisible.projects ? 'animate-slide-in-bottom' : 'opacity-0'}`} style={{animationDelay: `${index * 0.2}s`}}>
                <div className={`bg-gradient-to-br ${project.color} p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 h-full relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative text-white">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 transform group-hover:scale-125 transition-transform duration-500">{project.icon}</div>
                    <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">{project.category}</span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 sm:mb-4 leading-tight">{project.title}</h3>
                    <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string, idx: number) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
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
          <div className={`text-center mb-16 sm:mb-20 ${isVisible.testimonials ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed px-4">
              Real feedback from real people who've experienced our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`group ${isVisible.testimonials ? 'animate-slide-in-bottom' : 'opacity-0'}`} style={{animationDelay: `${index * 0.2}s`}}>
                <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className="flex items-center mb-6 sm:mb-8">
                      <div className="text-3xl sm:text-4xl lg:text-5xl mr-3 sm:mr-4">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-bold text-lg sm:text-xl text-gray-900 leading-tight">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm sm:text-base">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`${isVisible.stats ? 'animate-blur-in' : 'opacity-0'}`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 glow-border">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <stat.icon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${stat.color} animate-float-glow`} style={{animationDelay: `${index * 0.3}s`}} />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 sm:mb-2 animate-floating-numbers">{stat.value}</div>
                  <div className="text-sm sm:text-base lg:text-lg font-medium text-white/80 leading-tight">{stat.label}</div>
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
          <div className={`text-center mb-16 sm:mb-20 ${isVisible.features ? 'animate-bounce-in' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              We combine technical expertise with creative excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group ${isVisible.features ? 'animate-slide-in-bottom' : 'opacity-0'}`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-purple-500/10 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-4 sm:mb-6 bg-gradient-to-r ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 leading-tight">
              Ready to Transform Your <span className="text-gradient-shimmer">Digital Presence</span>?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed animate-typewriter px-4">
              Let's collaborate to bring your vision to life with our expertise in design, development, and digital marketing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-purple-600 px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl shadow-2xl hover:scale-105 transition-all duration-300 animate-glow pulse-ring"
              >
                Get Started Today
              </button>
              <button
                onClick={() => navigate('/services')}
                className="bg-transparent border-2 border-white/50 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:bg-white/10 transition-all duration-300 animate-border-glow"
              >                Explore Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
    </React.Fragment>
  );
}

export default Home;