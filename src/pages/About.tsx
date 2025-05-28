
import { Users, Target, Heart, Award, TrendingUp, Globe, Sparkles, Zap, Shield, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace cutting-edge technologies to deliver future-ready solutions"
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "We understand your challenges and work closely to solve them"
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Clear communication and honest pricing with no hidden costs"
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "We measure our success by your growth and achievements"
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
      icon: "🎓"
    },
    {
      title: "Transparent Pricing",
      description: "No hidden costs, clear packages, honest communication",
      icon: "💎"
    },
    {
      title: "End-to-End Support",
      description: "From concept to deployment, we're with you every step",
      icon: "🤝"
    },
    {
      title: "Modern Technologies",
      description: "Latest tools and frameworks for future-ready solutions",
      icon: "⚡"
    }
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "DesignDeliverGrow",
      "description": "Empowering students, entrepreneurs, and professionals with digital solutions, learning experiences, and growth strategies.",
      "foundingDate": "2024"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="About Us | DesignDeliverGrow - Empowering Digital Dreams"
        description="Learn about DesignDeliverGrow's mission to empower students, entrepreneurs, and professionals through innovative digital solutions and comprehensive learning experiences."
        schema={aboutSchema}
        keywords="about designdelivergrow, digital solutions, student support, web development team"
      />

      {/* Enhanced Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Story of Empowerment
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6 leading-tight">
              About DesignDeliverGrow
            </h1>
            
            <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-1 rounded-2xl mb-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-8">
                <p className="text-2xl text-purple-600 font-medium italic leading-relaxed">
                  "We don't just deliver services. We empower dreams."
                </p>
              </div>
            </div>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We are a passionate team dedicated to empowering students, entrepreneurs, and professionals 
              with cutting-edge digital solutions, comprehensive learning experiences, and growth-oriented strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To bridge the gap between academic learning and industry requirements by providing 
                comprehensive digital solutions, project assistance, and skill development programs 
                that empower individuals to succeed in the digital economy.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Provide high-quality, affordable digital solutions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Support students in their academic and career journey</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Foster innovation and creativity through technology</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-3xl p-1">
              <div className="bg-white rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  To become the go-to platform for students and professionals seeking 
                  comprehensive digital solutions and skill development, creating a 
                  community of empowered individuals ready for the future.
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl p-6">
                  <p className="text-purple-700 font-medium italic">
                    "Empowering every student and professional to turn their digital dreams into reality."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-3 border-0 bg-white/80 backdrop-blur-sm group">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl text-white mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Differentiators Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Why choose DesignDeliverGrow over others</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {differentiators.map((diff, index) => (
                <div key={index} className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0 text-3xl">{diff.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{diff.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{diff.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-3xl p-1">
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
      </section>

      {/* Why We Started Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why We Started</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mb-4"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-6">💡</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Bridging the Gap</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We noticed a significant gap between what students learn in academics and 
                  what the industry demands. Many talented individuals struggle with project 
                  implementation, lack proper guidance, and miss opportunities due to limited 
                  access to quality resources.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  DesignDeliverGrow was born from the passion to change this narrative. 
                  We believe that with the right guidance, tools, and support, every student 
                  and professional can achieve their digital aspirations.
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl p-6 text-center">
                  <p className="text-purple-700 font-semibold text-lg">
                    "We're not just a service provider - we're your partners in success."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full text-white mb-6 backdrop-blur-sm">
            <Heart className="w-5 h-5 mr-2" />
            Ready to Start Your Journey?
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            We'd Love to Help
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to start your journey with us? Let's discuss how we can help you achieve your goals.
          </p>
          <Button 
            onClick={() => navigate('/contact')}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Let's Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
