import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { Users, Target, Heart, Award, TrendingUp, Globe, Sparkles, Zap, Shield, Lightbulb, ArrowRight, Star, CheckCircle } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
    hero: true,
    mission: true,
    values: true,
    'platform-process': true,
    differentiators: true,
    testimonials: true,
    'why-started': true
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
  }>>([]);
  const heroRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('section[id]');
    elements.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Particle system for hero section
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed * 0.1) % 100,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.1
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace cutting-edge technologies to deliver future-ready solutions",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "We understand your challenges and work closely to solve them",
      gradient: "from-pink-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Clear communication and honest pricing with no hidden costs",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "We measure our success by your growth and achievements",
      gradient: "from-green-400 to-blue-500"
    }
  ];

  const stats = [
    { icon: Target, label: "Services Offered", value: "4+", color: "from-purple-500 to-blue-500" },
    { icon: Users, label: "Focus Areas", value: "Students & Startups", color: "from-blue-500 to-cyan-500" },
    { icon: Globe, label: "Reach", value: "PAN India", color: "from-cyan-500 to-purple-500" },
    { icon: Award, label: "Commitment", value: "100%", color: "from-purple-600 to-cyan-400" }
  ];

  const differentiators = [
    {
      title: "Student-Centric Approach",
      description: "We understand academic requirements and industry standards",
      icon: "🎓",
      delay: "0ms"
    },
    {
      title: "Transparent Pricing",
      description: "No hidden costs, clear packages, honest communication",
      icon: "💎",
      delay: "200ms"
    },
    {
      title: "End-to-End Support",
      description: "From concept to deployment, we're with you every step",
      icon: "🤝",
      delay: "400ms"
    },
    {
      title: "Modern Technologies",
      description: "Latest tools and frameworks for future-ready solutions",
      icon: "⚡",
      delay: "600ms"
    }
  ];

  const testimonials = [
    {
      text: "DesignDeliverGrow transformed our startup idea into reality. Their student-centric approach is unmatched.",
      author: "Priya Sharma",
      role: "Startup Founder"
    },
    {
      text: "The transparency and quality of work exceeded our expectations. Highly recommended!",
      author: "Rahul Patel",
      role: "Computer Science Student"
    },
    {
      text: "From concept to deployment, they were with us every step. Amazing support team!",
      author: "Anjali Reddy",
      role: "Entrepreneur"
    }
  ];

  const platformProcess = [
    { 
      id: "discover", 
      title: "Discover", 
      description: "We start by understanding your unique needs and requirements through in-depth consultations",
      icon: "🔍",
      color: "from-purple-600 to-blue-600"
    },
    { 
      id: "design", 
      title: "Design", 
      description: "Our expert team creates custom solutions tailored specifically to your goals and vision",
      icon: "✏️",
      color: "from-blue-600 to-cyan-500"
    },
    { 
      id: "develop", 
      title: "Develop", 
      description: "We bring your ideas to life with cutting-edge technology and industry best practices",
      icon: "⚙️",
      color: "from-cyan-500 to-purple-600"
    },
    { 
      id: "deliver", 
      title: "Deliver", 
      description: "Receive a polished, high-quality solution that exceeds expectations and meets all requirements",
      icon: "🚀",
      color: "from-purple-600 to-cyan-500"
    },
    { 
      id: "grow", 
      title: "Grow", 
      description: "We provide ongoing support and optimization to ensure your continued success and growth",
      icon: "📈",
      color: "from-blue-600 to-purple-600"
    }
  ];

  return (
    <PageLayout>
      <style>{`
        /* Mobile responsiveness fixes */
        .break-words {
          word-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
        }
        
        @media (max-width: 640px) {
          h1, h2, h3, h4, h5, h6 {
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
          
          p, span, div {
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
        }
      `}</style>


      {/* Enhanced Hero Section with Particles */}
      <section 
        ref={heroRef}
        className={`relative py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 overflow-hidden section-fade-in ${isVisible.hero ? 'visible' : ''}`}
        id="hero"
      >
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: particle.opacity,
                transform: `scale(${particle.size})`,
                transition: 'all 0.1s linear'
              }}
            />
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-purple-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-4 h-4 sm:w-6 sm:h-6 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div 
              className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200/50 backdrop-blur-sm transform transition-all duration-1000 ${
                isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Our Story of Empowerment
            </div>
            
            <h1
  className={`block pb-[0.25em] overflow-visible text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4 sm:mb-6 leading-[1.2] transform transition-all duration-1000 delay-200 ${
    isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
  }`}
  style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}
>
  About DesignDeliverGrow
</h1>

            <div 
              className={`bg-gradient-to-r from-purple-600 to-cyan-500 p-1 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 max-w-4xl mx-auto transform transition-all duration-1000 delay-400 ${
                isVisible.hero ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}
            >
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
                <p className="text-lg sm:text-xl lg:text-2xl text-purple-600 font-medium italic leading-relaxed">
                  "We don't just deliver services. We empower dreams."
                </p>
              </div>
            </div>
            
            <p 
              className={`text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4 transform transition-all duration-1000 delay-600 ${
                isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              We are a passionate team dedicated to empowering students, entrepreneurs, and professionals 
              with cutting-edge digital solutions, comprehensive learning experiences, and growth-oriented strategies.
            </p>

            {/* Animated Stats Cards */}
            <div 
              className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 transform transition-all duration-1000 delay-800 ${
                isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${stat.color} rounded-lg sm:rounded-xl text-white mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent mb-1 leading-tight">{stat.value}</div>
                  <div className="text-gray-600 text-xs sm:text-sm font-medium leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with Parallax Effect */}
      <section 
        className={`py-12 sm:py-16 lg:py-20 bg-white relative section-fade-in ${isVisible.mission ? 'visible' : ''}`}
        id="mission"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible.mission ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 relative">
                Our Mission
                <div className="absolute -bottom-2 left-0 w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500"></div>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                To bridge the gap between academic learning and industry requirements by providing 
                comprehensive digital solutions, project assistance, and skill development programs 
                that empower individuals to succeed in the digital economy.
              </p>
              <div className="space-y-4">
                {[
                  "Provide high-quality, affordable digital solutions",
                  "Support students in their academic and career journey", 
                  "Foster innovation and creativity through technology"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div 
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible.mission ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-3xl p-1 hover:scale-105 transition-transform duration-500">
                <div className="bg-white rounded-3xl p-8 h-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Star className="w-6 h-6 text-yellow-500 mr-2" />
                    Our Vision
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    To become the go-to platform for students and professionals seeking 
                    comprehensive digital solutions and skill development, creating a 
                    community of empowered individuals ready for the future.
                  </p>
                  <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl p-6 border border-purple-100">
                    <p className="text-purple-700 font-medium italic text-center">
                      "Empowering every student and professional to turn their digital dreams into reality."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Values Section */}
      <section 
        className={`py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-purple-50/30 relative section-fade-in ${isVisible.values ? 'visible' : ''}`}
        id="values"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
              isVisible.values ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Our Values</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-lg sm:text-xl text-gray-600 px-4">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 hover:-translate-y-6 ${
                  isVisible.values ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full relative overflow-hidden">
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r ${value.gradient} rounded-xl sm:rounded-2xl text-white mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <value.icon className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-purple-700 transition-colors duration-300 leading-tight">{value.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Process Section - Replacing Timeline */}
      <section 
        className="py-12 sm:py-16 lg:py-20 bg-white relative"
        id="platform-process"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
              isVisible["platform-process"] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">How Our Platform Works</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-lg sm:text-xl text-gray-600 px-4">A seamless process designed for your success</p>
          </div>

          {/* Process Flow Visualization */}
          <div className="relative mb-12 sm:mb-16">
            {/* Connecting Line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 transform -translate-y-1/2 rounded-full hidden lg:block"></div>
            
            {/* Process Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 relative z-10">
              {platformProcess.map((step, index) => (
                <div
                  key={step.id}
                  className={`transform transition-all duration-1000 ${
                    isVisible["platform-process"] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col items-center">
                    {/* Step Number with Glow Effect */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 relative group`}>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 blur-lg opacity-50 group-hover:opacity-80 animate-pulse transition-all duration-500"></div>
                      <div className="relative z-10 text-xl sm:text-2xl lg:text-3xl">{step.icon}</div>
                    </div>
                    
                    {/* Step Title with Animated Underline */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 relative group text-center">
                      {step.title}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                    </h3>
                    
                    {/* Step Description with Card Effect */}
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group">
                      <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Interactive Process Visualization */}
          <div 
            className={`bg-gradient-to-br from-purple-50 to-cyan-50 rounded-3xl p-8 relative overflow-hidden transform transition-all duration-1000 delay-500 ${
              isVisible["platform-process"] ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-300/10 to-cyan-300/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-700"></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-purple-400 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <span className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center text-white mr-3">
                  <Sparkles className="w-5 h-5" />
                </span>
                Why Our Process Works
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Efficiency</h4>
                  <p className="text-gray-600">Our streamlined process eliminates bottlenecks and ensures rapid delivery without compromising quality</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Precision</h4>
                  <p className="text-gray-600">We focus on the details that matter, ensuring every aspect of your project meets exact specifications</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Collaboration</h4>
                  <p className="text-gray-600">We work closely with you at every step, ensuring the final product aligns perfectly with your vision</p>
                </div>
              </div>
              
              <div className="mt-12 max-w-2xl mx-auto">
                <div className="bg-white rounded-xl p-6 border border-purple-100 group hover:border-purple-300 transition-all duration-300">
                  <p className="text-purple-700 font-medium italic text-center">
                    "Our process isn't just about delivering a product—it's about creating an experience that empowers your success."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add custom animation for this section */}
        <style>{`
          @keyframes float-in-out {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 10px 2px rgba(139, 92, 246, 0.3); }
            50% { box-shadow: 0 0 20px 5px rgba(6, 182, 212, 0.5); }
          }
        `}</style>
      </section>

      {/* Enhanced Differentiators Section */}
      <section 
        className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30"
        id="differentiators"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.differentiators ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Why choose DesignDeliverGrow over others</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {differentiators.map((diff, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-6 group transform transition-all duration-700 ${
                    isVisible.differentiators ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: diff.delay,
                    animationDelay: diff.delay 
                  }}
                >
                  <div className="flex-shrink-0 text-4xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {diff.icon}
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex-1 hover:bg-white transition-all duration-500 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{diff.title}</h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{diff.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div 
              className={`transform transition-all duration-1000 delay-500 ${
                isVisible.differentiators ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-3xl p-1 hover:scale-105 transition-transform duration-500">
                <div className="bg-white rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Focus Areas</h3>
                  <div className="grid grid-cols-2 gap-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center group">
                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl text-white mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                          <stat.icon className="h-8 w-8" />
                        </div>
                        <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent mb-1">{stat.value}</div>
                        <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section 
        className="py-20 bg-white"
        id="testimonials"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Real experiences from real people</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-3xl p-1">
              <div className="bg-white rounded-3xl p-12 text-center">
                <div className="text-6xl text-purple-300 mb-6">"</div>
                <p className="text-xl text-gray-700 leading-relaxed mb-8 transition-all duration-500">
                  {testimonials[currentTestimonial].text}
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900">{testimonials[currentTestimonial].author}</h4>
                  <p className="text-purple-600 font-medium">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started with 3D Effect */}
      <section 
        className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30"
        id="why-started"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['why-started'] ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Why We Started</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mb-4"></div>
          </div>

          <div 
            className={`max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${
              isVisible['why-started'] ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden hover:shadow-cyan-500/20 transition-all duration-500 group">
              <div className="p-12 relative">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-cyan-500"></div>
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-purple-400 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-cyan-400 rounded-full animate-pulse"></div>
                </div>

                <div className="relative z-10 text-center mb-8">
                  <div className="text-8xl mb-6 animate-bounce">💡</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Bridging the Gap</h3>
                </div>
                
                <div className="relative z-10 space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We noticed a significant gap between what students learn in academics and 
                    what the industry demands. Many talented individuals struggle with project 
                    implementation, lack proper guidance, and miss opportunities due to limited 
                    access to quality resources.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    DesignDeliverGrow was born from the passion to change this narrative. 
                    We believe that with the right guidance, tools, and support, every student 
                    and professional can achieve their digital aspirations.
                  </p>
                  <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl p-8 text-center border border-purple-100 group-hover:border-purple-200 transition-colors duration-300">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                    <p className="text-purple-700 font-semibold text-xl">
                      "We're not just a service provider - we're your partners in success."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white/30 rotate-45 animate-spin" style={{ animationDuration: '10s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/20 rounded-full animate-bounce delay-500"></div>
        </div> 

        {/* Floating Action Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className="w-2 h-2 bg-white/20 rounded-full"></div>
            </div>
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full text-white mb-6 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
            <Heart className="w-5 h-5 mr-2 animate-pulse" />
            Ready to Start Your Journey?
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Let's Create Something Amazing Together
          </h2>
          
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Let's discuss how we can help you achieve your goals and exceed your expectations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
            onClick={() => navigate('/contact')}

            className="group bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center">
              Let's Get Started
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
            onClick={() => navigate('/projects')}
             className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center">
              View Our Work
              <Zap className="ml-2 w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex justify-center items-center space-x-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm">Projects Delivered</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Client Satisfaction</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS Animations */}
      <style>{`
        .section-fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .section-fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
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
      `}</style>
     
    </PageLayout>
  );
};

export default About;