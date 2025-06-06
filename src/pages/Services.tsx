import { useState } from 'react';
import { CheckCircle, ArrowRight, Star, Users } from 'lucide-react';
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
    "description": "Comprehensive digital solutions including web design, student project assistance, social media marketing, and educational workshops.",
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
      title: "Educational Courses",
      description: "Comprehensive learning programs designed to boost your technical skills and career prospects",
      icon: "💻",
      color: "from-orange-500 to-red-500",
      features: [
        "Expert Instructors",
        "Hands-on Projects",
        "Industry Certificates",
        "Job Placement Support",
        "Live Sessions",
        "Recorded Materials"
      ],
      packages: [
        {
          name: "Web Development Masterclass",
          price: "₹4,999",
          duration: "12 weeks",
          features: [
            "HTML, CSS, JavaScript",
            "React.js & Node.js",
            "Database management",
            "3 real-world projects",
            "Portfolio development",
            "Job interview preparation",
            "Industry certificate"
          ],
          popular: true
        },
        {
          name: "AI/ML Fundamentals",
          price: "₹5,999",
          duration: "10 weeks",
          features: [
            "Python programming",
            "Machine learning algorithms",
            "Data analysis & visualization",
            "Real dataset projects",
            "Industry case studies",
            "Career guidance",
            "Certification included"
          ],
          popular: false
        },
        {
          name: "Social Media Marketing Bootcamp",
          price: "₹2,999",
          duration: "8 weeks",
          features: [
            "Platform-specific strategies",
            "Content creation techniques",
            "Analytics & reporting",
            "Ad campaign management",
            "Personal branding",
            "Live campaign creation",
            "Certificate of completion"
          ],
          popular: false
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Services | Web Design, Project Assistance & Digital Growth"
        description="Explore our wide range of services including website development, student project support, and marketing solutions with transparent pricing."
        schema={servicesSchema}
        keywords="web design services, student project help, social media marketing, educational workshops, transparent pricing"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions with transparent pricing and detailed packages. 
              Click on any service to explore features and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  expandedService === index ? 'ring-2 ring-blue-500 shadow-xl' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="text-4xl">{service.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedService === index && (
                    <div className="animate-fade-in space-y-6 border-t pt-6">
                      <h4 className="text-xl font-bold text-gray-900">Available Packages:</h4>
                      
                      {service.packages.map((pkg, pkgIdx) => (
                        <div key={pkgIdx} className="relative border rounded-xl p-6 hover:shadow-md transition-shadow">
                          {pkg.popular && (
                            <Badge className="absolute -top-3 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                              Most Popular
                            </Badge>
                          )}
                          
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h5 className="text-lg font-bold text-gray-900">{pkg.name}</h5>
                              <p className="text-gray-600">Duration: {pkg.duration}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {pkg.price}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {pkg.features.map((feature, featureIdx) => (
                              <div key={featureIdx} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={()=>setShowModal(true)}>
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => setExpandedService(expandedService === index ? null : index)}
                  >
                    {expandedService === index ? 'Show Less' : 'View Packages & Pricing'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
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
              className="border-white text-blue-600 hover:bg-white hover:text-purple-600 text-lg px-8 py-3"
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
    </div>
  );
};

export default Services;
