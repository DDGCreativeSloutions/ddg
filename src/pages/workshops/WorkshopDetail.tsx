import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkshopById, Workshop } from '@/data/workshopsData';
import { 
  Calendar, 
  Users, 
  Clock, 
  Award, 
  Lightbulb, 
  Hammer, 
  ArrowRight, 
  X, 
  CheckCircle, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Sparkles,
  ChevronLeft,
  Star,
  BookOpen,
  CheckSquare,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface FormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  experience: string;
  motivation: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  college?: string;
  year?: string;
  experience?: string;
  motivation?: string;
}

const WorkshopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workshop = getWorkshopById(id || '');
  
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    experience: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [countdown, setCountdown] = useState("");
  const [registeredCount, setRegisteredCount] = useState<number | null>(null);

  // Fetch registered count from SheetDB for the first workshop
  useEffect(() => {
    if (workshop?.id === "full-stack-hackathon") {
      fetch('https://sheetdb.io/api/v1/w7cl475isdyph/count')
        .then(res => res.json())
        .then(data => {
          if (typeof data?.rows === "number") setRegisteredCount(data.rows);
        })
        .catch(() => setRegisteredCount(null));
    }
  }, [workshop?.id]);

  // Countdown timer for workshops with dates
  useEffect(() => {
    if (!workshop?.date) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = workshop.date!.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(
          `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`
        );
      } else {
        setCountdown("Event Started!");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [workshop?.date]);

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Workshop Not Found</h1>
          <p className="mb-6">The workshop you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/workshops')}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Button>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.college.trim()) errors.college = 'College/Institution is required';
    if (!formData.year) errors.year = 'Academic year is required';
    if (!formData.experience) errors.experience = 'Experience level is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Submit to SheetDB
    try {
      const response = await fetch('https://sheetdb.io/api/v1/w7cl475isdyph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone, 
            college: formData.college, 
            year: formData.year, 
            experience: formData.experience, 
            motivation: formData.motivation,
            workshop: workshop?.title || ''
          } 
        })
      });
      
      await response.json();
      
      // Update the registration count
      if (workshop?.id === "full-stack-hackathon") {
        const countResponse = await fetch('https://sheetdb.io/api/v1/w7cl475isdyph/count');
        const countData = await countResponse.json();
        if (typeof countData?.rows === "number") setRegisteredCount(countData.rows);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setShowRegistrationForm(false);
      setShowConfirmation(true);
      
      // Auto-hide confirmation after 5 seconds
      setTimeout(() => setShowConfirmation(false), 5000);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRegistrationForm(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className={`p-6 bg-gradient-to-r ${workshop.color} text-white rounded-t-2xl`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl">{workshop.icon}</span>
                    <h2 className="text-2xl font-bold">Register for {workshop.title}</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setShowRegistrationForm(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="+91 9876543210"
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    College/Institution *
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${formErrors.college ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your college or institution"
                  />
                  {formErrors.college && <p className="text-red-500 text-sm mt-1">{formErrors.college}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <GraduationCap className="inline h-4 w-4 mr-1" />
                    Academic Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${formErrors.year ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                  {formErrors.year && <p className="text-red-500 text-sm mt-1">{formErrors.year}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level *
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${formErrors.experience ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select experience</option>
                    <option value="Complete Beginner">Complete Beginner</option>
                    <option value="Some Experience">Some Experience</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  {formErrors.experience && <p className="text-red-500 text-sm mt-1">{formErrors.experience}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What motivates you to join this workshop? (Optional)
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  placeholder="Share your goals and expectations..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRegistrationForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 bg-gradient-to-r ${workshop.color} hover:shadow-lg transition-all duration-200 disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Registering...</span>
                    </div>
                  ) : (
                    'Complete Registration'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-8 text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-ping" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-6">
                You've successfully registered for <span className="font-semibold text-indigo-600">{workshop.title}</span>
              </p>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-indigo-600 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">What's Next?</span>
                </div>
                <p className="text-sm text-gray-600">
                  Check your email for confirmation details and workshop materials. We'll send reminders closer to the date!
                </p>
              </div>
              
              <Button
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Awesome, Got it!
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Workshop Header */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Animated Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover md:object-center object-[25%] scale-[1.02]"
          >
            <source src="/assets/bg.mp4" type="video/mp4" />
          </video>
          {/* Custom gradient overlay with increased opacity for better text visibility on mobile */}
          <div className={`absolute inset-0 bg-gradient-to-br ${workshop.color} md:opacity-40 opacity-20`}></div>
          
          {/* Additional decorative elements */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/workshops')}
                  className="mb-8 text-white bg-white/10 border-white/30 hover:text-white hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Workshops
                </Button>
                
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform duration-300 border border-white/20">
                    <span className="text-5xl">{workshop.icon}</span>
                  </div>
                  <div>
                    <Badge className="mb-2 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md">
                      {workshop.level}
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                      {workshop.title}
                    </h1>
                  </div>
                </div>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8 leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-xl border border-white/10 shadow-lg">
                  {workshop.tagline}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    <Calendar className="h-5 w-5 text-white" />
                    <span className="font-medium">
                      {workshop.date 
                        ? workshop.date.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "Coming Soon"}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    <Clock className="h-5 w-5 text-white" />
                    <span className="font-medium">{workshop.duration || "Full Day"}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    <Users className="h-5 w-5 text-white" />
                    <span className="font-medium">
                      {workshop.id === "full-stack-hackathon" && registeredCount !== null 
                        ? `${registeredCount} registered` 
                        : workshop.students}
                    </span>
                  </div>
                </div>
                
                {workshop.date && (
                  <div className="mb-8 bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 inline-block border border-white/20 shadow-lg transform hover:translate-y-[-5px] transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Workshop Starts In</p>
                        <p className="text-2xl font-bold text-white">{countdown}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md w-full transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Join This Workshop</h2>
                    <p className="text-white/80">
                      {workshop.registrationOpen 
                        ? "Limited spots available. Reserve yours now!" 
                        : "Registration opening soon. Join the waitlist!"}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {workshop.registrationOpen ? (
                      <>
                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20 mb-4">
                          <div>
                            <p className="text-white/80 text-sm">Regular Price</p>
                            <p className="text-xl font-bold text-white/60 line-through">₹2,999</p>
                          </div>
                          <div className="bg-white/20 rounded-lg px-3 py-1">
                            <p className="text-white font-bold">100% OFF</p>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-xl border border-white/20 p-4 text-center">
                          <p className="text-white/80 text-sm">Early Bird Price</p>
                          <p className="text-3xl font-bold text-white">FREE</p>
                        </div>
                        
                        <Button 
                          onClick={() => setShowRegistrationForm(true)}
                          size="lg"
                          className="w-full bg-white hover:bg-white/90 text-gray-900 hover:shadow-xl transition-all duration-300 text-lg font-bold py-6"
                        >
                          Register Now
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        
                        <div className="flex items-center justify-center space-x-2 text-white/80 text-sm">
                          <Users className="h-4 w-4" />
                          <p>Only {workshop.id === "full-stack-hackathon" ? (250 - (registeredCount || 0)) : 8} spots remaining</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white/10 rounded-xl border border-white/20 p-6 text-center mb-4">
                          <p className="text-white text-lg mb-2">Registration opening soon</p>
                          <p className="text-white/80 text-sm">Be the first to know when spots become available</p>
                        </div>
                        
                        <Button 
                          variant="outline"
                          onClick={() => navigate('/contact')}
                          size="lg"
                          className="w-full border-white text-white hover:bg-white/20 transition-all duration-300 text-lg font-medium py-6"
                        >
                          Join the Waitlist
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About the Workshop */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Workshop</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">{workshop.description}</p>
                </div>
              </div>

              {/* Workshop Agenda */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Workshop Agenda</h2>
                <div className="space-y-6">
                  {workshop.agenda.map((day, idx) => (
                    <Card key={idx} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
                      <div className={`p-4 bg-gradient-to-r ${workshop.color} text-white`}>
                        <h3 className="text-xl font-bold">{day.title}</h3>
                      </div>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {day.topics.map((topic, i) => (
                            <div key={i} className="flex items-start space-x-3">
                              <Lightbulb className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* What You'll Get */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What You'll Get</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="border-none shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
                      <h3 className="text-xl font-bold flex items-center">
                        <Hammer className="h-5 w-5 mr-2" />
                        Tangible Outcomes
                      </h3>
                    </div>
                    <CardContent className="p-6">
                      <ul className="space-y-4">
                        {workshop.outcome.map((outcome, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="mr-3 mt-1 h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                              <CheckSquare className="h-3 w-3" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{outcome}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                {idx === 0 ? "Showcase your work to potential employers or clients" : 
                                 idx === 1 ? "Apply your new skills immediately to real-world problems" :
                                 "Add this achievement to your resume and professional profiles"}
                              </p>
                            </div>
                          </li>
                        ))}
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                            <CheckSquare className="h-3 w-3" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Exclusive Resources</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Get access to premium templates, code samples, and cheat sheets worth $199
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white">
                        <h3 className="text-xl font-bold flex items-center">
                          <BookOpen className="h-5 w-5 mr-2" />
                          In-Demand Skills
                        </h3>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {workshop.skills.map((skill, idx) => (
                            <Badge key={idx} className="bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-800 hover:from-green-200 hover:to-emerald-200 transition-colors border-0 px-3 py-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm">
                          These skills are among the most sought-after by employers in 2025, with an average salary increase of 15-20% for professionals who master them.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                        <h3 className="text-xl font-bold flex items-center">
                          <MessageCircle className="h-5 w-5 mr-2" />
                          Ongoing Support
                        </h3>
                      </div>
                      <CardContent className="p-6">
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="mr-2 text-amber-500">•</div>
                            <span className="text-gray-700">30 days of post-workshop email support</span>
                          </li>
                          <li className="flex items-center">
                            <div className="mr-2 text-amber-500">•</div>
                            <span className="text-gray-700">Access to private community forum</span>
                          </li>
                          <li className="flex items-center">
                            <div className="mr-2 text-amber-500">•</div>
                            <span className="text-gray-700">Monthly Q&A sessions with instructors</span>
                          </li>
                          <li className="flex items-center">
                            <div className="mr-2 text-amber-500">•</div>
                            <span className="text-gray-700">Exclusive alumni networking events</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Prerequisites</h2>
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {workshop.prerequisites.map((prerequisite, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <ArrowRight className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Why Join This Workshop */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why This Workshop Is For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-br from-indigo-50 to-blue-50">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 text-white">
                        <Sparkles className="h-7 w-7" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Accelerate Your Growth</h3>
                      <p className="text-gray-700">
                        Gain months of learning in just days with our intensive, hands-on approach. Skip the trial and error and learn directly from industry experts.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 text-white">
                        <Users className="h-7 w-7" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Network With Peers</h3>
                      <p className="text-gray-700">
                        Connect with like-minded professionals and build relationships that last beyond the workshop. Our alumni network continues to collaborate on projects.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 text-white">
                        <Award className="h-7 w-7" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Stand Out</h3>
                      <p className="text-gray-700">
                        Add a recognized credential to your portfolio and LinkedIn profile. Our workshop certificates are respected by employers across the industry.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-10 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white">
                        <Lightbulb className="h-10 w-10" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Limited Spots Available</h3>
                      <p className="text-gray-700 mb-4">
                        We keep our workshops small to ensure personalized attention and maximum learning. Our workshops consistently sell out weeks in advance, so secure your spot today to avoid disappointment.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                          <span className="text-sm text-gray-500">Average Rating</span>
                          <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-gray-900 font-medium">4.9/5</span>
                          </div>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                          <span className="text-sm text-gray-500">Alumni Network</span>
                          <p className="text-gray-900 font-medium">1,500+ Professionals</p>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                          <span className="text-sm text-gray-500">Success Rate</span>
                          <p className="text-gray-900 font-medium">98% Completion</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Instructor Info */}
              <Card className="border-none shadow-lg overflow-hidden">
                <div className={`p-4 bg-gradient-to-r ${workshop.color} text-white`}>
                  <h3 className="text-xl font-bold">Meet Your Instructor</h3>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                      <img 
                        src={workshop.instructor.image} 
                        alt={workshop.instructor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(workshop.instructor.name)}&background=random&size=128`;
                        }}
                      />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{workshop.instructor.name}</h4>
                    <p className="text-indigo-600 mb-4">{workshop.instructor.role}</p>
                    <p className="text-gray-700 text-sm">{workshop.instructor.bio}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Certificate */}
              <Card className="border-none shadow-lg overflow-hidden">
                <div className={`p-4 bg-gradient-to-r ${workshop.color} text-white`}>
                  <h3 className="text-xl font-bold">Certification</h3>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Award className="h-10 w-10 text-yellow-500" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Official Certificate</h4>
                      <p className="text-sm text-gray-600">Add to your portfolio & LinkedIn</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{workshop.certificate}</p>
                </CardContent>
              </Card>

              {/* Registration CTA */}
              <Card className={`border-none shadow-lg overflow-hidden bg-gradient-to-br ${workshop.color} text-white`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Ready to Join?</h3>
                  <p className="mb-6 text-white/90">Secure your spot in this workshop and start your learning journey today!</p>
                  <Button 
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full bg-white text-gray-900 hover:bg-white/90 hover:shadow-lg transition-all duration-200"
                  >
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join {workshop.title}</h2>
              <p className="text-xl text-gray-600 mb-8">
                {workshop.registrationOpen 
                  ? "Take the next step in your learning journey and register for this workshop today."
                  : "Registration for this workshop is not open yet. Join our waitlist to be first in line when spots become available."}
              </p>
              
              {workshop.registrationOpen ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="bg-white rounded-lg shadow-md px-6 py-4 flex-1">
                      <p className="text-sm text-gray-500 uppercase tracking-wide">Regular Price</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold text-gray-400 line-through">₹2,999</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md px-6 py-4 text-white flex-1">
                      <p className="text-sm uppercase tracking-wide">Early Bird Offer</p>
                      <div className="flex items-center">
                        <p className="text-3xl font-bold">Free</p>
                        <span className="ml-2 bg-white text-indigo-600 text-xs font-bold px-2 py-1 rounded-full">100% OFF</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setShowRegistrationForm(true)}
                    size="lg"
                    className={`w-full bg-gradient-to-r ${workshop.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6`}
                  >
                    Secure Your Spot Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <p>Only {workshop.id === "full-stack-hackathon" ? (250 - (registeredCount || 0)) : 8} spots remaining</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/contact')}
                    size="lg"
                    className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition-all px-8 py-6"
                  >
                    Join the Waitlist
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-gray-500 text-sm">
                    Be the first to know when registration opens and get exclusive early access.
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className={`p-4 bg-gradient-to-r ${workshop.color} text-white`}>
                <h3 className="text-xl font-bold">What's Included</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Full Workshop Access</p>
                    <p className="text-sm text-gray-600">All sessions, materials, and hands-on activities</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Premium Resource Bundle</p>
                    <p className="text-sm text-gray-600">Templates, code samples, and reference guides</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Official Certificate</p>
                    <p className="text-sm text-gray-600">Recognized credential for your portfolio</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">30-Day Support</p>
                    <p className="text-sm text-gray-600">Post-workshop assistance from instructors</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Alumni Community Access</p>
                    <p className="text-sm text-gray-600">Network with peers and join exclusive events</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Satisfaction Guarantee</p>
                    <p className="text-xs text-gray-400">Full refund available if requested within first 4 hours</p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopDetail;