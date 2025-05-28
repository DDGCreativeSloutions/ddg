import { useState } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Award, TrendingUp, Sparkles, Zap, Globe, ShieldCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';

const Home = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const navigate = useNavigate();

  const services = [
    {
      title: "Web Design & Development",
      description: "Professional websites that convert visitors into customers",
      icon: "🎨",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"],
      packages: [
        { name: "Static Website", price: "₹4,999 - ₹7,999", features: ["3-5 pages", "Mobile responsive", "SEO basics"] },
        { name: "Dynamic Website", price: "₹12,999 - ₹25,000+", features: ["Login/Auth", "Admin Panel", "Database"] }
      ]
    },
    {
      title: "Student Project Assistance",
      description: "Complete support for your academic projects",
      icon: "🎓",
      features: ["Code Implementation", "Project Reports", "Presentation", "GitHub Setup"],
      packages: [
        { name: "Minor Projects", price: "₹2,000 - ₹4,000", features: ["Idea support", "Basic implementation", "Report"] },
        { name: "Major Projects", price: "₹5,000 - ₹10,000", features: ["End-to-end support", "Code + Report + PPT"] }
      ]
    },
    {
      title: "Social Media Marketing",
      description: "Grow your brand with strategic social media presence",
      icon: "📱",
      features: ["Content Strategy", "Organic Growth", "Ad Campaigns", "Analytics"],
      packages: [
        { name: "Organic Growth", price: "₹3,000/month", features: ["3 platforms", "12 posts/month", "Hashtag strategy"] },
        { name: "Ad Campaigns", price: "From ₹1,500/campaign", features: ["Custom creatives", "Targeting", "Reports"] }
      ]
    },
    {
      title: "Educational Courses",
      description: "Learn cutting-edge technologies with expert guidance",
      icon: "💻",
      features: ["Expert Instructors", "Hands-on Projects", "Certificates", "Job Support"],
      packages: [
        { name: "Web Dev Masterclass", price: "₹4,999", features: ["12 weeks", "Full-stack", "3 projects"] },
        { name: "AI/ML Fundamentals", price: "₹5,999", features: ["10 weeks", "Python", "Real datasets"] }
      ]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      content: "DDG helped me complete my final year project flawlessly. The guidance was exceptional!",
      rating: 5,
      image: "👩‍🎓"
    },
    {
      name: "Rahul Gupta",
      role: "Startup Founder",
      content: "Our e-commerce website built by DDG increased our sales by 300%. Highly recommended!",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "Anita Verma",
      role: "Marketing Manager",
      content: "Their social media strategy transformed our brand presence. Amazing results in just 3 months!",
      rating: 5,
      image: "👩‍💻"
    }
  ];

  const stats = [
    { icon: Award, label: "Projects Delivered", value: "200+" },
    { icon: Users, label: "Happy Clients", value: "100+" },
    { icon: TrendingUp, label: "Courses Delivered", value: "50+" },
    { icon: Star, label: "Average Rating", value: "4.9/5" }
  ];

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Optimized for speed and performance" },
    { icon: ShieldCheck, title: "Secure & Reliable", description: "Enterprise-grade security standards" },
    { icon: Globe, title: "Global Reach", description: "Serving clients across India and beyond" },
    { icon: Sparkles, title: "Modern Design", description: "Latest UI/UX trends and technologies" }
  ];

  const featuredProjects = [
    {
      title: "E-commerce Platform",
      description: "Full-featured online store with payment integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development",
      image: "🛒"
    },
    {
      title: "AI Chatbot System",
      description: "Intelligent customer service automation",
      tech: ["Python", "TensorFlow", "NLP", "Flask"],
      category: "AI/ML",
      image: "🤖"
    },
    {
      title: "Student Management Portal",
      description: "Complete academic management solution",
      tech: ["React", "Express", "MySQL", "JWT"],
      category: "Academic Project",
      image: "🎓"
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics and content management platform",
      tech: ["Vue.js", "Laravel", "PostgreSQL"],
      category: "Digital Marketing",
      image: "📊"
    }
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DesignDeliverGrow",
    "url": "https://www.designdelivergrow.com",
    "logo": "https://www.designdelivergrow.com/logo.png",
    "description": "Empowering students, entrepreneurs, and professionals with web design, project assistance, and digital marketing services.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "serviceType": ["Web Design", "Student Project Assistance", "Social Media Marketing", "Educational Courses"]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="DesignDeliverGrow – Web Design, Student Projects, Marketing & Courses"
        description="One-stop solution for stunning websites, project help, digital marketing, and expert-led courses for students and startups."
        schema={organizationSchema}
        keywords="web design, student projects, digital marketing, online courses, CSE projects, AI ML projects"
      />

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-20 overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 200+ Projects Worldwide
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6 animate-fade-in leading-tight">
            Design. Deliver. Grow.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto animate-fade-in font-light leading-relaxed">
            From <span className="font-semibold text-purple-600">web design</span> to <span className="font-semibold text-blue-600">project guidance</span> and <span className="font-semibold text-cyan-600">skill development</span> — we help you thrive in the digital world
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
            <Button 
              size="lg" 
              onClick={() => navigate('/services')}
              className="bg-gradient-to-r from-purple-600 to-blue-400 hover:from-purple-700 hover:to-blue-500 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/contact')}
              className="text-lg px-8 py-4 border-2 border-purple-200 hover:border-purple-300 rounded-xl hover:bg-purple-50 transition-all duration-300"
            >
              Book Free Consultation
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
            {features.map((feature, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/40 rounded-2xl p-6 border border-white/50 hover:bg-white/60 transition-all duration-300 hover:transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-400 rounded-2xl text-white mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore some of our successful projects across different domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{project.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate('/projects')}
              className="bg-gradient-to-r from-purple-600 to-blue-400 hover:from-purple-700 hover:to-blue-500"
            >
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions to help you succeed in your digital journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm ${
                  activeService === index ? 'ring-2 ring-purple-400 shadow-xl' : ''
                }`}
                onClick={() => setActiveService(activeService === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{service.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      
                      {activeService === index && (
                        <div className="animate-fade-in space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Packages:</h4>
                            {service.packages.map((pkg, idx) => (
                              <div key={idx} className="border rounded-lg p-3 mb-2 bg-gradient-to-r from-purple-50 to-cyan-50">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-medium text-gray-900">{pkg.name}</h5>
                                  <span className="text-purple-600 font-semibold">{pkg.price}</span>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {pkg.features.map((feature, fidx) => (
                                    <li key={fidx}>• {feature}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="mt-4 border-purple-200 hover:bg-purple-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (activeService === index) {
                            setActiveService(null);
                          } else {
                            setActiveService(index);
                          }
                        }}
                      >
                        {activeService === index ? 'Show Less' : 'Learn More'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate('/services')}
              className="bg-gradient-to-r from-purple-600 to-cyan-400 hover:from-purple-700 hover:to-cyan-500"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section with updated colors */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from real people who've experienced our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 border-0 bg-gradient-to-br from-white to-purple-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{testimonial.image}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Build Your Dream Project Together
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Ready to take your business to the next level? Our team is here to help you succeed.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/contact')}
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Book an Appointment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
