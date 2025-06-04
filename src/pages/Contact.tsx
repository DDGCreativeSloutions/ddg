'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Check, Mail, Phone, MessageSquare, Sparkles, Rocket, Heart, Zap, Star, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const SHEETDB_API_URL = "https://sheetdb.io/api/v1/dcatblz3r9uht"; // Replace with your SheetDB API URL

const Contact = () => {
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    whatsapp: '',
    notes: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isFloating, setIsFloating] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const services = [
    { value: 'web-design', label: '🚀 Web Design & Development', emoji: '🚀' },
    { value: 'student-project', label: '📚 Student Project Assistance', emoji: '📚' },
    { value: 'social-media', label: '📱 Social Media Marketing', emoji: '📱' },
    { value: 'workshops', label: '🎓 Educational Workshops', emoji: '🎓' },
    { value: 'other', label: '✨ Other Amazing Services', emoji: '✨' },
  ];

  const benefits = [
    "🎯 Personalized solutions just for you",
    "⚡ Lightning-fast turnaround",
    "💎 Premium quality guaranteed",
    "🤝 Friendly expert guidance",
    "🎁 Special launch discounts available"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFloating(prev => !prev);
    }, 2000);

    // Generate random sparkles
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const sparkleInterval = setInterval(generateSparkles, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(sparkleInterval);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Automatically advance to step 2 when a service is selected
    if (name === 'service' && currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg('');
    if (!formData.service || !formData.name || !formData.email || !formData.whatsapp) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(SHEETDB_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }), // SheetDB expects { data: { ... } }
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMsg(`Submission failed: ${errorText}`);
        return;
      }

      setFormSubmitted(true);
      setFormData({
        service: '',
        name: '',
        email: '',
        whatsapp: '',
        notes: '',
      });
    } catch (error) {
      setErrorMsg("Failed to submit. Please try again.");
      console.error(error);
    }
  };

  const getProgressWidth = () => {
    let progress = 0;
    
    // Step 1 progress (50% of total)
    if (formData.service) {
      progress += 50;
    }
    
    // Step 2 progress (50% of total)
    if (currentStep >= 2) {
      // Base progress for reaching step 2
      progress += 10;
      
      // Additional progress for each field
      if (formData.name) progress += 10;
      if (formData.email) progress += 10;
      if (formData.whatsapp) progress += 20;
    }
    
    return `${progress}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-pulse"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            <Sparkles className="h-4 w-4 text-purple-400 opacity-60" />
          </div>
        ))}
        
        <div className="absolute top-20 left-10 animate-bounce delay-1000">
          <Heart className="h-8 w-8 text-blue-400 opacity-40" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-2000">
          <Star className="h-6 w-6 text-yellow-400 opacity-40" />
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-500">
          <Zap className="h-7 w-7 text-blue-400 opacity-40" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isFloating ? 'translate-y-2' : 'translate-y-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200/50 backdrop-blur-sm">
              <Gift className="h-4 w-4 mr-2" />
              FREE Consultation • Limited Time Offer
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6 leading-tight">
              Let's Create Magic Together! 
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Ready to turn your vision into reality? Book a <span className="font-bold text-purple-600">completely FREE</span> consultation 
              and discover how we can supercharge your success! 🚀
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-purple-200 hover:shadow-md transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Booking Form */}
      <section className="py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {formSubmitted ? (
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 transform animate-pulse">
              <CardContent className="p-12 text-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-bounce">
                    <Check className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 animate-spin">
                    <Sparkles className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Woohoo! 🎉 Request Submitted!
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Your consultation request is flying our way! We'll reach out within 24 hours to schedule your 
                  <span className="font-bold text-green-600"> FREE consultation</span>. Get ready for something amazing! ✨
                </p>
                <Button
                  onClick={() => {
                    setFormSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Help Someone Else Too! 💝
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden w-full max-w-6xl mx-auto">
              <div className="h-2 bg-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-700 ease-out"
                  style={{ width: getProgressWidth() }}
                />
              </div>
              
              <CardContent className="p-6 md:p-12 lg:p-16">
                <div className="text-center mb-8 md:mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Book Your Free Consultation Now!
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600">
                    Choose a service and tell us about yourself to get started!
                  </p>
                </div>
                {errorMsg && (
                  <div className="mb-4 text-red-600 font-semibold text-center">{errorMsg}</div>
                )}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                  {/* Step 1: Service Selection */}
                  <div className={`transition-all duration-500 ${currentStep === 1 ? 'opacity-100' : 'opacity-80'}`}>
                    <Label className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Rocket className="h-5 w-5 mr-2 text-purple-600" />
                      Step 1: Choose Your Adventure
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => handleSelectChange('service', service.value)}
                          className={`p-5 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                            formData.service === service.value
                              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg'
                              : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-md'
                          }`}
                          disabled={currentStep > 1}
                        >
                          <div className="text-2xl mb-2">{service.emoji}</div>
                          <div className="font-medium text-gray-900">{service.label.replace(/^[^\s]+ /, '')}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Personal Information */}
                  <div className={`transition-all duration-500 ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                    <Label className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-blue-600" />
                      Step 2: Let's Get Acquainted
                    </Label>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-base font-medium">What's your name? 😊</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Awesome"
                            className="text-base p-4 border-2 focus:border-purple-500 rounded-lg transition-all duration-300"
                            disabled={currentStep < 2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-base font-medium">Your email address 📧</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@awesome.com"
                            className="text-base p-4 border-2 focus:border-purple-500 rounded-lg transition-all duration-300"
                            disabled={currentStep < 2}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp" className="text-base font-medium">WhatsApp number 📱</Label>
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="text-base p-4 border-2 focus:border-purple-500 rounded-lg transition-all duration-300"
                          disabled={currentStep < 2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-base font-medium">Anything special you'd like to share? ✨</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Tell us about your dreams, goals, or any specific requirements..."
                          className="text-base p-4 border-2 focus:border-purple-500 rounded-lg transition-all duration-300 min-h-[100px] resize-none"
                          disabled={currentStep < 2}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-8 md:pt-10">
                  {currentStep >= 2 && (
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.service || !formData.name || !formData.email || !formData.whatsapp}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg md:text-xl px-10 py-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <Sparkles className="mr-3 h-6 w-6" />
                      Book My FREE Consultation
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>        
            )}
        </div>
      </section>

      {/* Fun Contact Cards */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Or Reach Out Instantly! 
            </h2>
            <p className="text-xl text-gray-600">Multiple ways to connect because we love hearing from you!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-purple-50 border-0 group">
              <CardContent className="p-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white mb-6 group-hover:animate-pulse">
                  <Mail className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Magic 📧</h3>
                <p className="text-gray-600 font-medium mb-2">info@designdelivergrow.store</p>
                <p className="text-gray-600 font-medium">support@designdelivergrow.store</p>
                <p className="text-sm text-purple-600 mt-4 font-medium">We reply within 2 hours! ⚡</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50 border-0 group">
              <CardContent className="p-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white mb-6 group-hover:animate-pulse">
                  <Phone className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Call Us Direct 📞</h3>
                <p className="text-gray-600 font-medium mb-2">+91 98765 43210</p>
                <p className="text-gray-600 font-medium">Mon-Fri, 10:00 AM - 6:00 PM IST</p>
                <p className="text-sm text-green-600 mt-4 font-medium">Friendly voices guaranteed! 😊</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-indigo-50 to-blue-50 border-0 group">
              <CardContent className="p-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full text-white mb-6 group-hover:animate-pulse">
                  <MessageSquare className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp Chat 💬</h3>
                <p className="text-gray-600 font-medium mb-2">+91 98765 43210</p>
                <p className="text-gray-600 font-medium">Quick questions welcome!</p>
                <p className="text-sm text-blue-600 mt-4 font-medium">Usually online & ready to help! 🚀</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fun FAQ Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Quick Answers to Your Questions! 
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know (and probably more!)</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: '⏰ How quickly will you get back to me?',
                a: 'Lightning fast! We typically respond within 24 hours, often much sooner. For urgent stuff, hit us up on WhatsApp! 📱',
              },
              {
                q: '💰 Is the consultation really, truly FREE?',
                a: 'Absolutely! No hidden costs, no surprise fees. Just pure value and awesome conversation about your goals! 🎁',
              },
              {
                q: '📅 Can I reschedule if something comes up?',
                a: 'Of course! Life happens, and we totally get it. Just drop us a message and we\'ll sort it out! 😊',
              },
              {
                q: '🎯 What exactly can we discuss in the consultation?',
                a: 'Anything and everything! Web design, projects, marketing, courses, or even that crazy idea you\'ve been thinking about! 🚀',
              },
              {
                q: '💳 Do I need to pay anything upfront?',
                a: 'Nope! Zero payment required. We believe in building trust first, amazing results second, and fair pricing always! ✨',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.q}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;