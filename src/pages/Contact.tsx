'use client';
import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Section } from '@/components/ui/Section';
import { Header } from '@/components/ui/Header';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/dcatblz3r9uht"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    whatsapp: '',
    notes: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentField, setCurrentField] = useState('intro');
  const [typedText, setTypedText] = useState('');

  const services = [
    { value: 'web-design', label: '🚀 Web Design & Development', emoji: '🚀' },
    { value: 'student-project', label: '📚 Student Project Assistance', emoji: '📚' },
    { value: 'social-media', label: '📱 Social Media Marketing', emoji: '📱' },
    { value: 'tools', label: '🤖 Automation Tools', emoji: '🤖' },
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
  };

  const handleSubmit = async () => {
    setErrorMsg('');
    if (!formData.service || !formData.name || !formData.email || !formData.whatsapp) {
      setErrorMsg('Please fill in all required fields');
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
    
    // Calculate progress based on filled fields
    if (formData.service) progress += 25;
    if (formData.name) progress += 25;
    if (formData.email) progress += 25;
    if (formData.whatsapp) progress += 25;
    
    return `${progress}%`;
  };

  return (
    <PageLayout>
      <PageTransition>
      {/* Hero Section */}
      <Section className="pt-24">
        <Header
          title="Let's Create Magic Together!"
          subtitle="Ready to turn your vision into reality? Book a completely FREE consultation and discover how we can supercharge your success! 🚀"
          badge="FREE Consultation • Limited Time Offer"
          titleGradient
          centered
        />
            
        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4">
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
      </Section>

      {/* Interactive Booking Form */}
      <Section className="py-6">
        {formSubmitted ? (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 transform animate-pulse max-w-4xl mx-auto">
            <CardContent className="p-6 text-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                  <Check className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 animate-spin">
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                Woohoo! 🎉 Request Submitted!
              </h2>
              <p className="text-xl text-gray-700 mb-2 leading-relaxed">
                Your consultation request is flying our way! We'll reach out within 24 hours to schedule your 
                <span className="font-bold text-green-600"> FREE consultation</span>. Get ready for something amazing! ✨
              </p>
              <Button
                onClick={() => {
                  setFormSubmitted(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-2 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Help Someone Else Too! 💝
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden w-full max-w-4xl mx-auto">
            <CardContent className="p-2 md:p-6 lg:p-3 relative">
              <div className="text-center mb-4 md:mb-5">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2 animate-fadeIn">
                  🌟 Book Your Free Consultation — Let's Make Magic Together! 🌟
                </h2>
              </div>
              {errorMsg && (
                <div className="mb-4 text-red-600 font-semibold text-center animate-shake">{errorMsg}</div>
              )}
              <div className="max-w-3xl mx-auto space-y-8 relative">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 shadow-lg transform transition-all duration-500 hover:shadow-xl">
                  <div className="prose prose-lg max-w-none">
                    <div className="space-y-8 text-xl leading-relaxed text-gray-700">
                      <p className="animate-fadeIn relative group">
                        Hey there! 👋 I'm{' '}
                        <span className="inline-block relative">
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="[your name]"
                            className="inline-block w-40 px-2 py-1 border-b-2 border-purple-300 focus:border-purple-500 bg-transparent text-purple-600 font-semibold placeholder:text-purple-300"
                          />
                          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                        </span>
                        , and I'm reaching out because I'm interested in something amazing.
                      </p>

                      <p className="animate-fadeIn delay-100">
                        I'm specifically looking for help with{' '}
                        <span className="relative inline-block min-w-[300px] group">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={(e) => handleSelectChange('service', e.target.value)}
                            className="w-full appearance-none bg-transparent border-b-2 border-purple-300 px-4 py-2 pr-10 text-purple-600 font-semibold cursor-pointer focus:outline-none focus:border-purple-500 transition-all duration-300"
                          >
                            <option value="" disabled hidden>Choose a service...</option>
                            {services.map((service) => (
                              <option key={service.value} value={service.value} className="text-gray-700">
                                {service.emoji} {service.label.replace(/^[^\s]+ /, '')}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        </span>
                        . You can reach out to me at{' '}
                        <span className="inline-block relative group">
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="[your email]"
                            className="inline-block w-48 px-2 py-1 border-b-2 border-purple-300 focus:border-purple-500 bg-transparent text-purple-600 font-semibold placeholder:text-purple-300"
                          />
                          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                        </span>
                        {' '}or message me on WhatsApp at{' '}
                        <span className="inline-block relative group">
                          <Input
                            type="text"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            placeholder="[your number]"
                            className="inline-block w-40 px-2 py-1 border-b-2 border-purple-300 focus:border-purple-500 bg-transparent text-purple-600 font-semibold placeholder:text-purple-300"
                          />
                          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                        </span>.
                      </p>

                      <p className="animate-fadeIn delay-200">
                        Here's a little bit about what I'm looking for:{' '}
                        <span className="block mt-4 relative group">
                          <Textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Share your dreams, goals, or specific requirements here..."
                            className="w-full p-4 min-h-[120px] bg-white/50 border-2 border-purple-200 focus:border-purple-500 rounded-lg resize-none text-purple-600 placeholder:text-purple-300"
                          />
                          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8 md:pt-10">
                <Button
  onClick={handleSubmit}
  disabled={
    !formData.service ||
    !formData.name ||
    !formData.email ||
    !formData.whatsapp
  }
  className="
    relative group 
    bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500
    text-base sm:text-lg md:text-xl
    px-6 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6
    rounded-full shadow-lg hover:shadow-xl 
    transform hover:scale-105 
    transition-all duration-300 
    disabled:opacity-50 disabled:cursor-not-allowed
    w-full sm:w-auto
  "
>
  {/* Glow animation */}
  <span
    className="
      absolute inset-0 w-full h-full rounded-full 
      bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 
      animate-pulse group-hover:animate-none 
      opacity-75 blur-xl 
      transition-opacity group-hover:opacity-100
    "
  ></span>

  {/* Button content */}
  <span className="relative flex items-center justify-center space-x-2">
    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce" />
    <span className="text-center leading-tight">
      Let's make something awesome! 💫
    </span>
    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
  </span>
</Button>

                {!formData.service || !formData.name || !formData.email || !formData.whatsapp ? (
                  <p className="mt-4 text-sm text-purple-600 animate-pulse">
                    ✨ Fill in all the magic details above to continue!
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>        
        )}
      </Section>

      {/* Contact Cards */}
      <Section className="py-20">
        <Header
          title="Or Reach Out Instantly!"
          subtitle="Multiple ways to connect because we love hearing from you!"
          titleGradient
          centered
        />

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
              <p className="text-gray-600 font-medium mb-2">+91 6309063641</p>
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
              <p className="text-gray-600 font-medium mb-2">+91 6309063641</p>
              <p className="text-gray-600 font-medium">Quick questions welcome!</p>
              <p className="text-sm text-blue-600 mt-4 font-medium">Usually online & ready to help! 🚀</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="py-20">
        <Header
          title="Quick Answers to Your Questions!"
          subtitle="Everything you need to know (and probably more!)"
          titleGradient
          centered
        />
        <div className="space-y-6 max-w-5xl mx-auto">
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
      </Section>
    </PageTransition>
    </PageLayout>
  );
};

export default Contact;