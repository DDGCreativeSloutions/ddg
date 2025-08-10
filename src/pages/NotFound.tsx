import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, Mail, Phone, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const popularPages = [
    { name: "Home", path: "/", description: "Return to our homepage" },
    { name: "Services", path: "/services", description: "Explore our web design and development services" },
    { name: "Projects", path: "/projects", description: "View our portfolio of completed projects" },
    { name: "Automation Tools", path: "/tools", description: "Explore our productivity tools" },
    { name: "About Us", path: "/about", description: "Learn more about DesignDeliverGrow" },
    { name: "Contact", path: "/contact", description: "Get in touch with our team" }
  ];

  const faqData = [
    {
      question: "What should I do if I encounter a 404 error?",
      answer: "If you encounter a 404 error, try checking the URL for typos, use our navigation menu, or contact our support team for assistance."
    },
    {
      question: "How can I find the page I was looking for?",
      answer: "You can use our main navigation menu, search functionality, or browse our popular pages listed below to find what you're looking for."
    }
  ];

  return (
    <>
      <SEO
        title="Page Not Found - 404 Error"
        description="The page you're looking for doesn't exist. Explore our web design services, student project assistance, and automation tools at DesignDeliverGrow."
        keywords="404 error, page not found, DesignDeliverGrow, web design, student projects, automation tools"
        noindex={true}
        faqSchema={faqData}
        breadcrumbs={[
          { name: "Home", url: "https://www.designdelivergrow.store/" },
          { name: "404 Error", url: "https://www.designdelivergrow.store/404" }
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Main 404 Section */}
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* Logo and Brand */}
            <div className="flex flex-col items-center mb-6">
              <img 
                src="/logo.png" 
                alt="DesignDeliverGrow Logo" 
                className="h-16 w-auto mb-3"
                loading="eager"
              />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent">
                DesignDeliverGrow
              </span>
            </div>

            {/* 404 Display */}
            <div className="text-8xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              404
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, we're here to help you find what you need!
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go to Homepage
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>

          {/* Popular Pages Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Popular Pages
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularPages.map((page, index) => (
                <Link
                  key={index}
                  to={page.path}
                  className="group p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 mb-2">
                    {page.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {page.description}
                  </p>
                  <div className="flex items-center mt-2 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm">Visit page</span>
                    <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Need Help?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-purple-600 mr-3" />
                    <a 
                      href="mailto:info@designdelivergrow.store" 
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      info@designdelivergrow.store
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-purple-600 mr-3" />
                    <a 
                      href="tel:+919642872160" 
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      +91-9642872160
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link 
                    to="/services" 
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    → Web Design & Development
                  </Link>
                  <Link 
                    to="/services" 
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    → Student Project Assistance
                  </Link>
                  <Link 
                    to="/services" 
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    → Social Media Marketing
                  </Link>
                  <Link 
                    to="/tools" 
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    → Automation Tools
                  </Link>
                </div>
              </div>
            </div>

            {/* Search Suggestion */}
            <div className="mt-8 p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-gray-700 mb-2">
                Still can't find what you're looking for?
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                Contact our support team
                <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;