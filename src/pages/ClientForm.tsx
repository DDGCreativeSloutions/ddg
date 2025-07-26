import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Instagram, Facebook } from "lucide-react";

import {
  GraduationCap,
  User,
  Mail,
  Phone,
  Building,
  BookOpen,
  Calendar,
  Code,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Eye,
  Send,
  Star,
  Target,
  Award,
  Rocket,
  Heart,
  ExternalLink,
  Zap,
  Shield,
  Clock,
  Users,
  TrendingUp,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { LOGO_GRADIENT } from '@/lib/utils';

interface StudentFormData {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  degree: string;
  branch: string;
  yearOfStudy: string;
  city: string;
  projectDomain: string;
  projectTitle: string;
  projectDescription: string;
  projectType: string;
  academicSubmission: string;
  individualOrTeam: string;
  numberOfMembers: string;
  githubLink: string;
  deadline: string;
  preferredCommunication: string;
  heardAboutUs: string;
  specificRequirements: string;
}

// Add the Google Apps Script Web App URL at the top
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7ixc4uKEwI0WWfjVG3vU_SwqKORO2YJcjizmg82mdMF8G9l4_oi5aao4sURxi9GHG/exec"; // TODO: Replace with your actual script URL

const ClientForm = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    degree: '',
    branch: '',
    yearOfStudy: '',
    city: '',
    projectDomain: '',
    projectTitle: '',
    projectDescription: '',
    projectType: '',
    academicSubmission: '',
    individualOrTeam: '',
    numberOfMembers: '',
    githubLink: '',
    deadline: '',
    preferredCommunication: '',
    heardAboutUs: '',
    specificRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare data for Google Form (keys should match your Google Sheet headers)
    const data = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      collegeName: formData.collegeName,
      degree: formData.degree,
      branch: formData.branch,
      yearOfStudy: formData.yearOfStudy,
      city: formData.city,
      projectDomain: formData.projectDomain,
      projectTitle: formData.projectTitle,
      projectDescription: formData.projectDescription,
      projectType: formData.projectType,
      academicSubmission: formData.academicSubmission,
      individualOrTeam: formData.individualOrTeam,
      numberOfMembers: formData.numberOfMembers,
      githubLink: formData.githubLink,
      deadline: formData.deadline,
      preferredCommunication: formData.preferredCommunication,
      heardAboutUs: formData.heardAboutUs,
      specificRequirements: formData.specificRequirements,
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Use "cors" if your script is published with permissions
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Show success animation
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Optionally reset formData here if you want to clear the form after submit
      // setFormData({ ... });
    } catch (error) {
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  const sections = [
    { title: "Personal Info", icon: User, color: "from-blue-500 to-purple-600" },
    { title: "Academic Details", icon: BookOpen, color: "from-green-500 to-teal-600" },
    { title: "Project Requirements", icon: Code, color: "from-purple-500 to-pink-600" },
    { title: "Support & Timeline", icon: Target, color: "from-orange-500 to-red-600" }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const sectionFields = [
    // Section 0: Personal Info
    [
      {
        label: "Full Name *",
        icon: <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />,
        id: "fullName",
        type: "text",
        required: true,
        placeholder: "e.g., Rahul Sharma",
      },
      {
        label: "Email *",
        icon: <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />,
        id: "email",
        type: "email",
        required: true,
        placeholder: "e.g., rahul@email.com",
      },
      {
        label: "Phone Number *",
        icon: <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />,
        id: "phone",
        type: "tel",
        required: true,
        placeholder: "WhatsApp preferred",
      },
      {
        label: "City/Location",
        id: "city",
        type: "text",
        required: false,
        placeholder: "e.g., Mumbai",
      },
    ],
    // Section 1: Academic Details
    [
      {
        label: "College/University *",
        id: "collegeName",
        type: "text",
        required: true,
        placeholder: "Your institution name",
      },
      {
        label: "Degree *",
        id: "degree",
        type: "text",
        required: true,
        placeholder: "e.g., B.Tech, MCA, B.Sc",
      },
      {
        label: "Branch *",
        id: "branch",
        type: "text",
        required: true,
        placeholder: "e.g., CSE, IT, AIML",
      },
      {
        label: "Year of Study *",
        id: "yearOfStudy",
        type: "text",
        required: true,
        placeholder: "e.g., Final Year / 7th Semester",
      },
    ],
    // Section 2: Project Requirements
    [
      {
        label: "Project Domain *",
        id: "projectDomain",
        type: "text",
        required: true,
        placeholder: "e.g., Web Development, AI/ML",
      },
      {
        label: "Project Title (if any)",
        id: "projectTitle",
        type: "text",
        required: false,
        placeholder: "e.g., Smart Attendance System",
      },
      {
        label: "Project Description / Idea",
        id: "projectDescription",
        type: "textarea",
        required: false,
        placeholder: "Describe your project idea...",
      },
      {
        label: "Type of Project (Mini / Major) *",
        id: "projectType",
        type: "select",
        required: true,
        options: ["Mini", "Major"],
      },
      {
        label: "Is it for Academic Submission? *",
        id: "academicSubmission",
        type: "select",
        required: true,
        options: ["Yes", "No"],
      },
    ],
    // Section 3: Support & Timeline
    [
      {
        label: "Individual or Team Project? *",
        id: "individualOrTeam",
        type: "select",
        required: true,
        options: ["Individual", "Team"],
      },
      {
        label: "Number of Members (if Team)",
        id: "numberOfMembers",
        type: "text",
        required: false,
        placeholder: "e.g., 3",
      },
      {
        label: "GitHub Link (if any)",
        id: "githubLink",
        type: "text",
        required: false,
        placeholder: "Paste your repo link",
      },
      {
        label: "Deadline / Expected Delivery Date *",
        id: "deadline",
        type: "text",
        required: true,
        placeholder: "e.g., 20 August 2025",
      },
      {
        label: "Preferred Mode of Communication",
        id: "preferredCommunication",
        type: "select",
        required: false,
        options: ["Call", "WhatsApp", "Email"],
      },
      {
        label: "How did you hear about us?",
        id: "heardAboutUs",
        type: "text",
        required: false,
        placeholder: "e.g., Friend, Social Media, etc.",
      },
      {
        label: "Any Specific Requirements or Questions",
        id: "specificRequirements",
        type: "textarea",
        required: false,
        placeholder: "Any specific requirements or notes...",
      },
    ],
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative mb-8"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-800" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4"
              >
                🎉 Registration Successful!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed px-4"
              >
                Thank you for choosing <span className="font-semibold text-primary">DesignDeliverGrow</span>!
                Our expert team will contact you within 24 hours to discuss your project requirements and create something amazing together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col gap-4 justify-center"
              >
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      collegeName: '',
                      degree: '',
                      branch: '',
                      yearOfStudy: '',
                      city: '',
                      projectDomain: '',
                      projectTitle: '',
                      projectDescription: '',
                      projectType: '',
                      academicSubmission: '',
                      individualOrTeam: '',
                      numberOfMembers: '',
                      githubLink: '',
                      deadline: '',
                      preferredCommunication: '',
                      heardAboutUs: '',
                      specificRequirements: '',
                    });
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Submit Another Registration
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.open('/', '_blank')}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Visit Our Platform
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        {/* Mobile optimized floating elements */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-bounce delay-700"></div>
      </div>

      <div className="relative z-20 container mx-auto py-4 sm:py-8 px-4 min-h-screen flex flex-col">
        {/* Enhanced Mobile-First Navigation Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6 sm:mb-8 relative z-30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 sm:gap-3">
           <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-xl bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent">
                DesignDeliverGrow
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Student Registration</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-3">
            <Button
              variant="default"
              onClick={() => window.open('/', '_blank')}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Visit Platform</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
            <Button
              variant="default"
              onClick={() => window.open('/projects', '_blank')}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">View Projects</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </motion.div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-40 relative"
            >
              <div className="p-4 space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    window.open('/', '_blank');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start gap-3 p-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  <Globe className="w-4 h-4 text-purple-600" />
                  Visit Our Platform
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    window.open('/projects', '_blank');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start gap-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                  View Our Projects
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    window.open('/about', '_blank');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start gap-3 p-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <Heart className="w-4 h-4 text-green-600" />
                  About Us
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
         {...fadeInUp}
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced Hero Header with Mobile Optimization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-r from-primary to-blue-600 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl">
                <img src="/logo1.png" alt="DDG Logo" width="100" />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-800" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-primary to-blue-600 bg-clip-text text-transparent mb-4 px-4">
              Student Project Registration
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6 px-4">
              <Badge variant="secondary" className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Premium Service
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Expert Team
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                24/7 Support
              </Badge>
            </div>

            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Join thousands of successful students who have transformed their academic projects with our expert guidance.
              <span className="font-semibold text-primary block sm:inline mt-1 sm:mt-0"> Let's build something extraordinary together!</span>
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1 sm:gap-2">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                <span>1000+ Projects</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                <span>100% Confidential</span>
              </div>
            </div>
          </motion.div>

          {/* Progress Indicator for Mobile */}
          <div className="sm:hidden mb-6">
            <div className="flex justify-center space-x-2 mb-4">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index <= currentSection ? 'bg-primary' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step {currentSection + 1} of {sections.length}: {sections[currentSection]?.title}
              </p>
            </div>
          </div>

          {/* Enhanced Main Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* 1. Card Enhancement: Add glassmorphism, stronger gradient, and shadow */}
            <Card className={`relative z-30 border-0 shadow-2xl bg-gradient-to-br ${LOGO_GRADIENT} bg-opacity-90 dark:bg-opacity-80 backdrop-blur-2xl rounded-3xl sm:rounded-[2rem] overflow-hidden ring-2 ring-primary/10 hover:ring-primary/30 transition-all duration-500`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${LOGO_GRADIENT} opacity-10 pointer-events-none`} />
              {/* Progress Bar (Stepper) */}
              <div className={`w-full h-2 bg-gradient-to-r ${LOGO_GRADIENT} rounded-t-3xl overflow-hidden mb-2`}>
                <div
                  className={`h-full bg-gradient-to-r ${LOGO_GRADIENT} transition-all duration-700`}
                  style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                />
              </div>
              <CardHeader className={`relative z-10 text-center py-6 sm:py-8 bg-gradient-to-r ${LOGO_GRADIENT} bg-clip-text text-transparent border-b border-gray-200/50 dark:border-gray-700/50`}>
                <CardTitle className="text-xl sm:text-3xl font-bold flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #7B2FF2, #F357A8)" }}>
                    Project Registration Form
                  </span>
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-300" />
                </CardTitle>
                <p className="text-white/80 mt-2 text-sm sm:text-base px-4">
                  Fill out the details below and let our experts handle the rest
                </p>
              </CardHeader>

              <CardContent className="relative z-10 p-4 sm:p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSection}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {/* Slide Title */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-center">
                        {sections[currentSection]?.title}
                      </h3>
                      {sectionFields[currentSection].map((field) => (
                        <div key={field.id} className="space-y-3 relative">
                          <Label htmlFor={field.id}>{field.label}</Label>
                          {field.type === "textarea" ? (
                            <Textarea
                              id={field.id}
                              value={formData[field.id as keyof StudentFormData]}
                              onChange={e => handleInputChange(field.id as keyof StudentFormData, e.target.value)}
                              placeholder={field.placeholder}
                              rows={3}
                              required={field.required}
                              className="focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
                            />
                          ) : field.type === "select" ? (
                            <Select
                              value={formData[field.id as keyof StudentFormData]}
                              onValueChange={value => handleInputChange(field.id as keyof StudentFormData, value)}
                              required={field.required}
                            >
                              <SelectTrigger className="focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md">
                                <SelectValue placeholder={`Select ${field.label.replace(/\*/, "").trim()}`} />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-900">
                                {field.options?.map(option => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id={field.id}
                              type={field.type}
                              value={formData[field.id as keyof StudentFormData]}
                              onChange={e => handleInputChange(field.id as keyof StudentFormData, e.target.value)}
                              placeholder={field.placeholder}
                              required={field.required}
                              className="pl-10 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
                            />
                          )}
                          {field.icon}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      onClick={() => setCurrentSection(s => Math.max(0, s - 1))}
                      disabled={currentSection === 0}
                      variant="outline"
                      className="rounded-xl px-6 py-3 text-sm sm:text-base font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 border-2 border-[#7B2FF2]" // Logo color border
                    >
                      Previous
                    </Button>
                    {currentSection < sectionFields.length - 1 ? (
                      <Button
                        type="button"
                        onClick={() => setCurrentSection(s => Math.min(sectionFields.length - 1, s + 1))}
                        className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-sm sm:text-base font-bold shadow-lg hover:scale-105 transition-all duration-300 border-2 border-[#7B2FF2]" // Logo color border
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-sm sm:text-base font-bold shadow-lg hover:scale-105 transition-all duration-300 border-2 border-[#7B2FF2]" // Logo color border
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0 }}
            className="text-center mt-12 space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                variant="default"
                onClick={() => window.open('/', '_blank')}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Explore Our Platform
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>

              <Button
                variant="default"
                onClick={() => window.open('/projects', '_blank')}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Our Projects
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>

              <Button
                variant="default"
                onClick={() => window.open('/about', '_blank')}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                About Us
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
              Follow us on social media for updates and inspiration!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                          <a href="https://github.com/DDGCreativeSloutions" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="h-6 w-6 text-gray-500 hover:text-purple-600 transition" />
                          </a>
                          <a href="https://www.linkedin.com/company/designdelivergrow" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="h-6 w-6 text-gray-500 hover:text-blue-700 transition" />
                          </a>
                          <a href="https://www.instagram.com/designdelivergrow/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram className="h-6 w-6 text-gray-500 hover:text-pink-500 transition" />
                          </a>
                          <a href="https://www.facebook.com/profile.php?id=61577027030683" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook className="h-6 w-6 text-gray-500 hover:text-blue-600 transition" />
                          </a>
                        </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 DesignDeliverGrow. Empowering students to achieve academic excellence.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientForm;