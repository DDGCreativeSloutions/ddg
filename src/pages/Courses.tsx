
import { useState } from 'react';
import { CheckCircle, Calendar, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Courses = () => {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const courses = [
    {
      title: "Web Development Masterclass",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      tagline: "From beginner to full-stack developer",
      duration: "12 weeks",
      price: "₹4,999",
      students: "500+ enrolled",
      level: "Beginner to Advanced",
      modules: [
        {
          title: "Frontend Fundamentals",
          topics: ["HTML5 & CSS3", "JavaScript Essentials", "Responsive Design", "Bootstrap & Tailwind"]
        },
        {
          title: "Advanced JavaScript",
          topics: ["ES6+ Features", "DOM Manipulation", "Async Programming", "API Integration"]
        },
        {
          title: "React Development",
          topics: ["React Fundamentals", "Hooks & State", "Routing", "React Context & Redux"]
        },
        {
          title: "Backend Development",
          topics: ["Node.js Basics", "Express.js Framework", "RESTful APIs", "Authentication"]
        },
        {
          title: "Database Integration",
          topics: ["MongoDB", "SQL Basics", "ORM Tools", "Database Design"]
        },
        {
          title: "Deployment & DevOps",
          topics: ["Git & GitHub", "CI/CD Pipelines", "Cloud Deployment", "Performance Optimization"]
        }
      ],
      projects: ["Personal Portfolio Site", "E-commerce Platform", "Social Media Dashboard"],
      skills: ["Frontend Development", "Backend Integration", "Database Management", "API Design", "Version Control", "Deployment Strategies"],
      certificate: "Industry-recognized certification upon completion"
    },
    {
      title: "AI & Machine Learning Fundamentals",
      icon: "🧠",
      color: "from-purple-500 to-pink-500",
      tagline: "Master the foundations of AI and ML",
      duration: "10 weeks",
      price: "₹5,999",
      students: "300+ enrolled",
      level: "Intermediate",
      modules: [
        {
          title: "Python for Data Science",
          topics: ["Python Basics", "NumPy & Pandas", "Data Manipulation", "Visualization with Matplotlib"]
        },
        {
          title: "Machine Learning Basics",
          topics: ["Linear Regression", "Classification Algorithms", "Decision Trees", "Ensemble Methods"]
        },
        {
          title: "Deep Learning",
          topics: ["Neural Networks", "TensorFlow & Keras", "CNNs", "RNNs & LSTMs"]
        },
        {
          title: "Computer Vision",
          topics: ["Image Processing", "Object Detection", "Face Recognition", "OpenCV"]
        },
        {
          title: "Natural Language Processing",
          topics: ["Text Processing", "Sentiment Analysis", "Chatbot Development", "Language Models"]
        },
        {
          title: "Model Deployment",
          topics: ["API Development", "Cloud Deployment", "Monitoring ML Systems", "Optimization"]
        }
      ],
      projects: ["Image Classification System", "Sentiment Analysis Tool", "Predictive Analytics Dashboard"],
      skills: ["Python Programming", "Data Analysis", "Machine Learning Algorithms", "Deep Learning", "Model Training", "Data Visualization"],
      certificate: "Industry-recognized certification with AI specialization"
    },
    {
      title: "Social Media Marketing Bootcamp",
      icon: "📱",
      color: "from-orange-500 to-red-500",
      tagline: "Build your brand in the digital world",
      duration: "8 weeks",
      price: "₹2,999",
      students: "400+ enrolled",
      level: "All Levels",
      modules: [
        {
          title: "Social Media Landscape",
          topics: ["Platform Analysis", "Audience Demographics", "Content Types", "Trend Analysis"]
        },
        {
          title: "Content Strategy",
          topics: ["Content Calendar", "Copywriting", "Visual Content", "Video Marketing"]
        },
        {
          title: "Community Management",
          topics: ["Engagement Tactics", "Comment Management", "Crisis Handling", "Influencer Collaboration"]
        },
        {
          title: "Paid Advertising",
          topics: ["Ad Campaign Setup", "Targeting Options", "Budget Management", "A/B Testing"]
        },
        {
          title: "Analytics & Reporting",
          topics: ["Performance Metrics", "ROI Analysis", "Report Generation", "Data-Driven Decisions"]
        },
        {
          title: "Growth Hacking",
          topics: ["Viral Content Strategy", "Automation Tools", "Cross-Platform Promotion", "Optimization"]
        }
      ],
      projects: ["Brand Growth Strategy", "Marketing Campaign", "Analytics Dashboard"],
      skills: ["Content Creation", "Community Management", "Paid Advertising", "Analytics", "Brand Building", "Campaign Planning"],
      certificate: "Digital Marketing certification"
    },
    {
      title: "Android App Development",
      icon: "📲",
      color: "from-green-500 to-teal-500",
      tagline: "Build professional Android applications",
      duration: "10 weeks",
      price: "₹4,499",
      students: "250+ enrolled",
      level: "Intermediate",
      modules: [
        {
          title: "Kotlin Fundamentals",
          topics: ["Kotlin Syntax", "Object-Oriented Programming", "Functional Programming", "Collections"]
        },
        {
          title: "Android Basics",
          topics: ["Activity Lifecycle", "UI Components", "Layouts", "Material Design"]
        },
        {
          title: "Data Management",
          topics: ["SQLite Database", "Room Persistence", "SharedPreferences", "Content Providers"]
        },
        {
          title: "Networking & APIs",
          topics: ["Retrofit", "REST API Integration", "JSON Parsing", "Network Security"]
        },
        {
          title: "Advanced UI/UX",
          topics: ["Custom Views", "Animations", "Responsive Design", "User Experience"]
        },
        {
          title: "Publication & Monetization",
          topics: ["Google Play Store", "App Bundles", "Monetization Strategies", "Analytics"]
        }
      ],
      projects: ["Todo App", "Social Networking App", "E-commerce Mobile App"],
      skills: ["Kotlin", "Android SDK", "API Integration", "Database Design", "UI/UX Design", "App Publication"],
      certificate: "Android Developer certification"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Educational Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive learning programs designed to boost your skills and accelerate your career. 
              Industry-relevant curriculum taught by experts.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <Card 
                key={index} 
                className={`h-full hover:shadow-xl transition-all duration-300 ${
                  expandedCourse === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`text-4xl w-16 h-16 flex items-center justify-center bg-gradient-to-br ${course.color} rounded-xl text-white`}>
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                      <p className="text-gray-600">{course.tagline}</p>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">{course.students}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-blue-600">{course.price}</span>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedCourse === index && (
                    <div className="animate-fade-in space-y-6 border-t pt-6">
                      {/* Course Modules */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Modules</h4>
                        <div className="space-y-4">
                          {course.modules.map((module, moduleIdx) => (
                            <div key={moduleIdx} className="border rounded-lg p-4">
                              <h5 className="font-semibold text-gray-900 mb-2">
                                {moduleIdx + 1}. {module.title}
                              </h5>
                              <div className="grid grid-cols-2 gap-2">
                                {module.topics.map((topic, topicIdx) => (
                                  <div key={topicIdx} className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-gray-600">{topic}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Projects & Skills */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Projects You'll Build</h4>
                          <ul className="space-y-2">
                            {course.projects.map((project, projectIdx) => (
                              <li key={projectIdx} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-600">{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Skills You'll Gain</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.skills.map((skill, skillIdx) => (
                              <Badge key={skillIdx} variant="outline" className="bg-blue-50">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Certificate & CTA */}
                      <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <span className="font-medium text-gray-900">Certification</span>
                          </div>
                          <p className="text-sm text-gray-600">{course.certificate}</p>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Toggle Button */}
                  <Button 
                    variant={expandedCourse === index ? "outline" : "default"}
                    className="w-full mt-4 flex items-center justify-center"
                    onClick={() => setExpandedCourse(expandedCourse === index ? null : index)}
                  >
                    {expandedCourse === index ? 'Show Less' : 'View Course Details'}
                    {expandedCourse !== index && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Learn With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our courses are designed to provide you with practical skills that are immediately applicable in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-600 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Instructors</h3>
                <p className="text-gray-600">
                  Learn from industry professionals with years of real-world experience in their respective fields
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                  <Laptop className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Practical Projects</h3>
                <p className="text-gray-600">
                  Build real-world projects that you can showcase in your portfolio and impress employers
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full text-purple-600 mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Learning</h3>
                <p className="text-gray-600">
                  Access course materials anytime, anywhere. Learn at your own pace with lifetime access
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Invest in your skills and future today. Choose a course and embark on your learning journey.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
            Browse All Courses
          </Button>
        </div>
      </section>
    </div>
  );
};

// Add missing icon import
import { Award, Laptop } from 'lucide-react';

export default Courses;
