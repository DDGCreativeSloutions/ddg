import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Star, Users, Sparkles } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Services",
    "provider": {
      "@type": "Organization",
      "name": "DesignDeliverGrow",
      "url": "https://www.designdelivergrow.store"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "description": "Comprehensive digital solutions including web design, student project assistance, social media marketing, and automation tools.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "DesignDeliverGrow Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Design & Development"
          },
          "priceCurrency": "INR",
          "price": "4999"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Student Project Assistance"
          },
          "priceCurrency": "INR",
          "price": "2000"
        }
      ]
    }
  };

  const services = [
    {
      title: "Web Design & Development",
      description: "Professional websites that convert visitors into customers with modern design and robust functionality",
      icon: "🎨",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Responsive Design",
        "SEO Optimized",
        "Fast Loading Speed",
        "Modern UI/UX",
        "Cross-browser Compatible",
        "Mobile-first Approach"
      ],
      packages: [
        {
          name: "Static Website",
          price: "₹4,999 - ₹7,999",
          duration: "5-7 days",
          features: [
            "3-5 responsive pages",
            "Modern UI design",
            "Mobile responsive",
            "SEO basics included",
            "Contact form integration",
            "Social media links",
            "Free 1 month support"
          ],
          popular: false
        },
        {
          name: "Dynamic Website",
          price: "₹12,999 - ₹25,000+",
          duration: "2-4 weeks",
          features: [
            "User login/authentication",
            "Admin panel dashboard",
            "Database integration",
            "Content management system",
            "Custom APIs",
            "Payment gateway integration",
            "Free 3 months support"
          ],
          popular: true
        }
      ]
    },
    {
      title: "Student Project Assistance",
      description: "Complete academic project support from concept to completion with proper documentation",
      icon: "🎓",
      color: "from-purple-500 to-pink-500",
      features: [
        "Code Implementation",
        "Project Documentation",
        "Presentation Design",
        "GitHub Setup",
        "Technical Support",
        "Academic Guidelines"
      ],
      packages: [
        {
          name: "Minor Projects",
          price: "₹2,000 - ₹4,000",
          duration: "3-5 days",
          features: [
            "Project idea consultation",
            "Basic code implementation",
            "Project report writing",
            "GitHub repository setup",
            "Basic presentation slides",
            "Code explanation session"
          ],
          popular: false
        },
        {
          name: "Major Projects",
          price: "₹5,000 - ₹10,000",
          duration: "1-2 weeks",
          features: [
            "End-to-end project development",
            "Complete code implementation",
            "Detailed project report",
            "Professional presentation",
            "Literature review",
            "Testing & deployment guide",
            "Viva preparation support"
          ],
          popular: true
        }
      ]
    },
    {
      title: "Social Media Marketing",
      description: "Strategic social media management to grow your brand presence and engagement",
      icon: "📱",
      color: "from-green-500 to-emerald-500",
      features: [
        "Content Strategy",
        "Organic Growth",
        "Paid Advertisements",
        "Analytics & Reporting",
        "Community Management",
        "Brand Building"
      ],
      packages: [
        {
          name: "Organic Growth Plan",
          price: "₹3,000/month",
          duration: "Monthly",
          features: [
            "3 social media platforms",
            "12 custom posts per month",
            "Hashtag research & strategy",
            "Page optimization",
            "Engagement management",
            "Monthly analytics report"
          ],
          popular: true
        },
        {
          name: "Ad Campaign Management",
          price: "From ₹1,500/campaign",
          duration: "Per campaign",
          features: [
            "Custom ad creatives",
            "Audience targeting",
            "A/B testing",
            "Campaign optimization",
            "Detailed performance reports",
            "ROI tracking"
          ],
          popular: false
        }
      ]
    },
    {
      title: "Automation Tools",
      description: "Powerful automation tools to streamline workflows and boost productivity",
      icon: "🤖",
      color: "from-orange-500 to-red-500",
      features: [
        "AI Assistants",
        "Code Generation",
        "Popular Integrations",
        "Team Collaboration",
        "Cross-platform Support",
        "Documentation"
      ],
      packages: [
        {
          name: "Starter Toolkit",
          duration: "Instant Access",
          features: [
            "Free tools",
            "Basic AI assistance",
            "Popular integrations",
            "Quick start"
          ],
          popular: true
        },
        {
          name: "Pro Automation Suite",
          duration: "Monthly/Yearly",
          features: [
            "Advanced AI",
            "Custom workflows",
            "Multi-IDE support",
            "Priority support"
          ],
          popular: false
        }
      ]
    }

  ];

  return (
    <PageLayout>
      <SEO
        title="Our Services | Web Design, Project Assistance & Digital Growth"
        description="Explore our wide range of services including website development, student project support, and marketing solutions with transparent pricing."
        schema={servicesSchema}
        keywords="web design services, student project help, social media marketing, automation tools, transparent pricing"
      />

      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200/50 backdrop-blur-sm transform transition-all duration-1000"
            >
              <Sparkles className="w-4 h-4 mr-2 text-purple-600 animate-glow-pulse" />
              Professional Digital Services
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              Transform Your Digital Presence
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-black max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-white/10 p-4 rounded-2xl border border-white/10"
            >
              Comprehensive digital solutions with transparent pricing and detailed packages. 
              Click on any service to explore features and pricing.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group perspective-1000"
              >
                <Card 
                  className={`cursor-pointer transform-3d backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-3d hover:bg-white/15 transition-all duration-500 ${
                    expandedService === index ? 'ring-2 ring-purple-500 shadow-xl' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <motion.div 
                        className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${service.color} rounded-3xl flex items-center justify-center text-4xl shadow-3d`}
                        whileHover={{ rotateY: 180, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {service.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                          {service.title}
                        </h3>
                        <p className="text-gray-700">{service.description}</p>
                      </div>
                    </div>

                    {/* Features Preview */}
                    <div className="mb-6">
                      <h4 className="font-black text-gray-900 mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 animate-glow-pulse" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedService === index && (
                      <motion.div 
                        className="space-y-6 border-t pt-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-xl font-black text-gray-900">Available Packages:</h4>
                        
                        {service.packages.map((pkg, pkgIdx) => (
                          <motion.div 
                            key={pkgIdx} 
                            className={`relative backdrop-blur-xl bg-gradient-to-r ${service.color} bg-opacity-20 border border-white/20 rounded-3xl p-6 hover:shadow-3d transition-all duration-300`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: pkgIdx * 0.2 }}
                            whileHover={{ scale: 1.02, rotateX: 2 }}
                          >
                            {pkg.popular && (
                              <Badge className="absolute -top-3 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                                Most Popular
                              </Badge>
                            )}
                            
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h5 className="text-xl font-black text-gray-900">{pkg.name}</h5>
                                <p className="text-gray-700">Duration: {pkg.duration}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                  {pkg.price}
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {pkg.features.map((feature, featureIdx) => (
                                <motion.div 
                                  key={featureIdx} 
                                  className="flex items-start space-x-2"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: featureIdx * 0.1 }}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0 animate-glow-pulse" />
                                  <span className="text-gray-800 font-medium">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                            
                            <motion.button 
                              className="w-full mt-6 gradient-button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                if (service.title === "Automation Tools") {
                                  navigate('/tools');
                                } else {
                                  setShowModal(true);
                                }
                              }}
                            >
                              Get Started
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    <motion.button 
                      className="w-full mt-6 gradient-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedService(expandedService === index ? null : index)}
                    >
                      {expandedService === index ? 'Show Less' : 'View Packages & Pricing'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600">
              We deliver exceptional value with every project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                We ensure high-quality deliverables that meet industry standards and exceed expectations
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">
                No hidden costs or surprise fees. Clear pricing structure with detailed package breakdown
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dedicated Support</h3>
              <p className="text-gray-600">
                Ongoing support and maintenance to ensure your success long after project completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Choose the service that fits your needs and let's bring your vision to life. 
            Free consultation available for all services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/contact')}
              className="bg-white text-purple-600 hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
            >
              Book Free Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/projects')}
              className="border-white bg-white text-blue-600 hover:bg-white hover:text-purple-600 text-lg px-8 py-3"
            >
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* Modal for Call Request */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-purple-700">Request a Call</h3>
            <p className="mb-6 text-gray-700">
              Thank you for your interest! Please <b>book a free consultation</b> and our team will call you back soon.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                setShowModal(false);
                navigate('/contact');
              }}
            >
              Book Free Consultation
            </Button>
          </div>
        </div>
      )}
      
    </PageLayout>
  );
};

export default Services;
