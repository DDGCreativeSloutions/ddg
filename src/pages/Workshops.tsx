import { useState } from 'react';
import { Calendar, Users, Clock, Award, Lightbulb, Hammer, ArrowRight, X, CheckCircle, Mail, User, Phone, MapPin, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AgendaItem {
  title: string;
  topics: string[];
}

interface Workshop {
  title: string;
  icon: string;
  color: string;
  tagline: string;
  duration: string;
  students: string;
  level: string;
  agenda: AgendaItem[];
  outcome: string[];
  skills: string[];
  certificate: string;
}

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

const Workshops = () => {
  const [expandedWorkshop, setExpandedWorkshop] = useState<number | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
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

  const workshops: Workshop[] = [
    {
      title: "Full Stack Hackathon Weekend",
      icon: "🚀",
      color: "from-indigo-500 to-purple-500",
      tagline: "Code, build, and deploy a full-stack app in just two days!",
      duration: "2 Days",
      students: "150+ registered",
      level: "Intermediate to Advanced",
      agenda: [
        {
          title: "Day 1 - Frontend Sprint",
          topics: ["React Setup", "UI Design with Tailwind", "Routing & State Management", "API Integration"]
        },
        {
          title: "Day 2 - Backend & Deployment",
          topics: ["Node.js & Express", "MongoDB Integration", "Auth System", "Vercel Deployment"]
        }
      ],
      outcome: ["Deployed Full-Stack App", "Team Collaboration Experience", "Hackathon Certificate"],
      skills: ["Frontend Architecture", "Backend APIs", "Database Connectivity", "Deployment Pipeline"],
      certificate: "Hackathon Participation Certificate with Project Showcase"
    },
    {
      title: "AI in a Day: Build Your First Model",
      icon: "🤖",
      color: "from-green-500 to-blue-500",
      tagline: "Dive into Machine Learning basics through hands-on coding",
      duration: "1 Day",
      students: "200+ joined",
      level: "Beginner",
      agenda: [
        {
          title: "Session 1 - Python & Data",
          topics: ["Python Crash Course", "DataFrames with Pandas", "Visualization with Matplotlib"]
        },
        {
          title: "Session 2 - ML Modeling",
          topics: ["Scikit-Learn Basics", "Model Training", "Prediction Pipeline", "Accuracy Testing"]
        }
      ],
      outcome: ["Basic ML Model", "Data Analysis Skills", "Certificate of Completion"],
      skills: ["Python", "Data Science", "Model Evaluation", "ML Workflow"],
      certificate: "AI Workshop Completion Certificate"
    },
    {
      title: "Design Thinking Bootcamp",
      icon: "🎨",
      color: "from-yellow-400 to-red-400",
      tagline: "Master the art of innovation and problem solving",
      duration: "3 Days",
      students: "80+ creatives",
      level: "All Levels",
      agenda: [
        {
          title: "Day 1 - Empathize & Define",
          topics: ["User Research", "Problem Framing", "Persona Creation"]
        },
        {
          title: "Day 2 - Ideate & Prototype",
          topics: ["Brainstorming Techniques", "Wireframes", "Low-Fidelity Prototypes"]
        },
        {
          title: "Day 3 - Test & Iterate",
          topics: ["User Feedback", "Rapid Iteration", "Pitching Ideas"]
        }
      ],
      outcome: ["Innovative Problem Solution", "Pitch Presentation", "Creative Thinking Skills"],
      skills: ["Empathy Mapping", "Prototyping", "Innovation Process", "User-Centered Design"],
      certificate: "Certified Design Thinker Credential"
    },
    {
      title: "Inside the Software Industry: Senior Engineer Insights",
      icon: "💼",
      color: "from-blue-500 to-purple-600",
      tagline: "Learn from the journey of a senior engineer at top tech firms",
      duration: "1 Day",
      students: "100+ aspiring engineers",
      level: "Intermediate to Advanced",
      agenda: [
        {
          title: "Session 1 - Software Development Lifecycle",
          topics: ["Agile & Scrum", "DevOps Practices", "End-to-End Project Flow"]
        },
        {
          title: "Session 2 - Career Growth & Work Culture",
          topics: ["Team Collaboration", "Mentorship", "Company Culture in Big Tech"]
        },
        {
          title: "Session 3 - Q&A with the Senior Engineer",
          topics: ["Career Advice", "Real-world Challenges", "Resume Tips"]
        }
      ],
      outcome: [
        "Realistic View of Software Careers",
        "Knowledge of Tech Industry Practices",
        "Actionable Career Guidance"
      ],
      skills: [
        "Software Lifecycle Understanding",
        "Team Dynamics",
        "Career Planning",
        "Communication in Tech"
      ],
      certificate: "Industry Insights Participation Certificate"
    }
  ];

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

  const handleRegisterClick = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setShowRegistrationForm(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      college: '',
      year: '',
      experience: '',
      motivation: ''
    });
    setFormErrors({});
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowRegistrationForm(false);
    setShowConfirmation(true);
    
    // Auto-hide confirmation after 5 seconds
    setTimeout(() => setShowConfirmation(false), 5000);
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
            <div className={`p-6 bg-gradient-to-r ${selectedWorkshop?.color} text-white rounded-t-2xl`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl">{selectedWorkshop?.icon}</span>
                    <h2 className="text-2xl font-bold">Register for Workshop of {selectedWorkshop?.title}</h2>
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
                  className={`flex-1 bg-gradient-to-r ${selectedWorkshop?.color} hover:shadow-lg transition-all duration-200 disabled:opacity-50`}
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
                You've successfully registered for <span className="font-semibold text-indigo-600">{selectedWorkshop?.title}</span>
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

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Workshops</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intense, hands-on sessions designed to help you build, learn, and grow in just a few focused days.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((workshop, index) => (
            <Card key={index} className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${expandedWorkshop === index ? 'ring-2 ring-indigo-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`text-4xl w-16 h-16 flex items-center justify-center bg-gradient-to-br ${workshop.color} rounded-xl text-white shadow-lg`}>
                    {workshop.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{workshop.title}</h3>
                    <p className="text-gray-600">{workshop.tagline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">{workshop.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">{workshop.students}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{workshop.level}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Upcoming</span>
                  </div>
                </div>

                {expandedWorkshop === index && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-6 border-t pt-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Workshop Agenda</h4>
                      <div className="space-y-4">
                        {workshop.agenda.map((day, idx) => (
                          <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <h5 className="font-semibold text-gray-900 mb-2">{idx + 1}. {day.title}</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {day.topics.map((topic, i) => (
                                <div key={i} className="flex items-start space-x-2">
                                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Outcomes</h4>
                        <ul className="space-y-2">
                          {workshop.outcome.map((o, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Hammer className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-600">{o}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Skills You Gain</h4>
                        <div className="flex flex-wrap gap-2">
                          {workshop.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="bg-indigo-50 hover:bg-indigo-100 transition-colors">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Award className="h-5 w-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Certification</span>
                        </div>
                        <p className="text-sm text-gray-600">{workshop.certificate}</p>
                      </div>
                      <Button 
                        onClick={() => handleRegisterClick(workshop)}
                        className={`bg-gradient-to-r ${workshop.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                      >
                        Register Now
                      </Button>
                    </div>
                  </div>
                )}

                <Button 
                  variant={expandedWorkshop === index ? "outline" : "default"}
                  className="w-full mt-4 flex items-center justify-center hover:bg-blue-500 transition-all"
                  onClick={() => setExpandedWorkshop(expandedWorkshop === index ? null : index)}
                >
                  {expandedWorkshop === index ? 'Show Less' : 'View Workshop Details'}
                  {expandedWorkshop !== index && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
    </div>
  );
};

export default Workshops;

