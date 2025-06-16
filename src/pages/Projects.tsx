import { useState } from 'react';
import { Search, ExternalLink, Github, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const filters = ['All', 'CSE', 'AI/ML', 'AIDS', 'Web Development', 'Mobile Apps'];

  const projects = [
    {
      id: 1,
      title: "E-Library Website",
      category: "Web Development",
      description: "Web application to browse, search, and read books online",
      image: "/image.png",
      technologies: ["HTML", "CSS", "JavaScript", "REST APIs"],
      features: [
        "Responsive UI design",
        "Search and filter functionality",
        "Book previews and detailed descriptions",
        "Category-wise book organization",
    "Bookmarking and reading history",
    "REST API integration for dynamic content"
  ],
  deliverables: ["Frontend source code", "UI wireframes", "API usage documentation"],
  client: "Personal Project",
  duration: "4 weeks",
  code:"https://github.com/syedalthaf786/online-ebook-library.git",
  demo:"http://www.e-libraryonline.42web.io"

    },
    {
       id: 2,
  title: "NEO Explorer",
  category: "Web Development",
  description: "Web app to visualize NASA's Near Earth Objects (NEO) using public API data",
  image: "/neo.png",
  technologies: ["JavaScript", "HTML", "CSS", "NASA API"],
  features: [
    "Real-time NEO data visualization",
    "3D orbital simulation (basic)",
    "Interactive charts and stats",
    "Filter by date and distance",
    "Educational content on space objects",
    "User-friendly responsive layout"
  ],
  deliverables: ["Web app source code", "API integration guide", "Data parsing documentation"],
  client: "NASA Space Apps Challenge",
  duration: "5 weeks",
    code:"https://github.com/DDGCreativeSloutions/neo-explorer.git",
    demo:"https://neoexplorer.earth"
    },
    {
  id: 3,
  title: "MedBridge",
  category: "AI/ML",
  description: "An AI-powered hospital management system for efficient patient care, appointment scheduling, and resource optimization.",
  image: "/hospital.png",
  technologies: ["React", "Node.js", "Express", "MongoDB", "Python", "Machine Learning"],
  features: [
    "AI-based patient triage and risk prediction",
    "Automated appointment scheduling",
    "Doctor and staff management",
    "Medical records and history tracking",
    "Billing and invoice generation",
    "Role-based access control",
    "Analytics dashboard for hospital operations"
  ],
  deliverables: [
    "Source code",
    "Trained ML models",
    "Database schema",
    "User manual",
    "Deployment guide"
  ],
  client: "Academic Project",
  duration: "8 weeks",
  code: "https://github.com/DDGCreativeSloutions/hospital-management-system.git", 
  demo: "https://ddgcreativesloutions.github.io/medbridge/" 
    },
    {
      id: 4,
  title: "LearnByDoing",
  category: "CSE",
  description: "Interactive coding platform enabling users to learn by building real-world projects",
  image: "/lbd.png",
  technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
  features: [
    "User authentication & role-based access",
    "Project-based learning modules",
    "Live code editor with syntax highlighting",
    "Progress tracking dashboard",
    "Discussion forums & peer collaboration",
    "Admin panel for content management"
  ],
  deliverables: ["Full source code", "Database schema", "API documentation", "User manual"],
  client: "Capstone Project",
  duration: "6 weeks",
  code:"https://github.com/DDGCreativeSloutions/learnbydoing1.git",
  demo:"https://learnbydoing-1.onrender.com"
    },
    {
    id: 5,
    title: "Library Management System",
    category: "CSE",
    description: "A comprehensive system to manage library books, members, and transactions efficiently.",
    image: "/lms.png",
    technologies: ["HTML", "CSS", "Javascript", "datatables"],
    features: [
      "Book inventory management",
      "Member registration and management",
      "Book issue and return tracking",
      "Fine calculation for late returns",
      "Search and filter books",
      "Admin dashboard for reports"
    ],
    deliverables: [
      "Source code",
      "Database schema",
      "User manual",
      "Project report"
    ],
    client: "Academic Project",
    duration: "5 weeks",
    code:"https://github.com/DDGCreativeSloutions/lms.git",
    demo:"https://ddgcreativesloutions.github.io/lms/"
  },
{
  id: 6,
  title: "Academic Performance Predictor",
  category: "AI/ML",
  description: "A machine learning system that predicts student academic performance based on historical data and key indicators.",
  image: "/ap.png",
  technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
  features: [
    "Data preprocessing and feature engineering",
    "Model training and evaluation",
    "Predictive analytics dashboard",
    "Visualization of student performance trends",
    "Exportable reports"
  ],
  deliverables: [
    "Source code",
    "Trained ML models",
    "User manual",
    "Project report"
  ],
  client: "Academic Project",
  duration: "4 weeks",
  code: "https://github.com/DDGCreativeSloutions/academic-predict.git",
   demo: "https://academia-forecast-master-33.lovable.app/" // Add if you have a live demo
},
{
  id: 7,
  title: "Fake Media Detection System",
  category: "AI/ML",
  description: "AI-driven platform for detecting fake news, manipulated images, and deepfakes using NLP, computer vision, and blockchain.",
  image: "/fake.png",
  technologies: ["React", "XGBoost", "Blockchain", "OpenCV"],
  features: [
    "Media upload support for text, images, and videos",
    "Fake news detection using NLP and XGBoost",
    "Image/deepfake detection via CNN and GAN-based models",
    "Blockchain-based media hash verification",
    "User authentication with role-based access",
    "Dashboard with detailed analysis results and trends"
  ],
  deliverables: [
    "Full source code",
    "Trained ML models",
    "Blockchain smart contracts",
    "API documentation",
    "User manual"
  ],
  client: "Research & Innovation Project",
  duration: "8 weeks",
  code: "https://github.com/DDGCreativeSloutions/Fake_Media_Detection.git",
  demo: "https://fake-media-detection-mocha.vercel.app/" // Add if you have a live demo
},
{
    id: 8,
    title: "Coding Quiz",
    category: "Web Development",
    description: "A web-based coding quiz platform to test and improve programming knowledge.",
    image: "/quiz.png", // Add an image to your public folder or use an emoji like "📝"
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    features: [
      "Multiple choice coding questions",
      "Real-time score tracking",
      "Timer for each quiz session",
      "Responsive design for all devices",
      "Instant feedback on answers",
      "Leaderboard for top scores"
    ],
    deliverables: [
      "Source code",
      "Quiz question set",
      "User manual"
    ],
    client: "Open Source",
    duration: "2 weeks",
    code: "https://github.com/syedalthaf786/Coding-quiz.git",
    demo: "https://syedalthaf786.github.io/Coding-quiz/" // Add a live demo link if available
  }

  ];

  // Filter projects based on selected category and search term
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedFilter === 'All' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of innovative projects across various domains. 
              Each project demonstrates our expertise and commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center mr-2">
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700 font-medium">Filter:</span>
              </div>
              {filters.map(filter => (
                <Badge
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedFilter === filter 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'hover:bg-gray-100'
                  } px-4 py-2 text-sm`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </Badge>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Counter */}
          <p className="text-gray-600 mb-6">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={project.id} className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    {project.image && project.image.endsWith('.png') ? (
    <img
      src={project.image}
      alt={project.title}
      className="h-full object-contain rounded shadow"
    />
  ) : (
    <span className="text-7xl text-white">{project.image}</span>
  )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <Badge>{project.category}</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-100">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* View Details / Expanded Content */}
                    {expandedProject === index ? (
                      <div className="animate-fade-in space-y-4 pt-4 border-t">
                        {/* Features */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 mb-2">KEY FEATURES</h4>
                          <ul className="list-disc list-inside text-gray-600 text-sm">
                            {project.features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Deliverables */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 mb-2">DELIVERABLES</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.deliverables.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-100">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Client & Duration */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500">CLIENT</h4>
                            <p className="text-gray-600">{project.client}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500">DURATION</h4>
                            <p className="text-gray-600">{project.duration}</p>
                          </div>
                        </div>
                        
                        {/* External Links */}
                        <div className="flex gap-2">
                          {project.code && (
    <a
      href={project.code}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1"
    >
      <Button size="sm" variant="outline" className="w-full">
        <Github className="h-4 w-4 mr-2" />
        Code
      </Button>
    </a>
  )}
  {project.demo && (
    <a
      href={project.demo}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1"
    >
      <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
        <ExternalLink className="h-4 w-4 mr-2" />
        Live Demo
      </Button>
    </a>
  )}
                        </div>
                      </div>
                    ) : (
                      <Button 
                        className="w-full mt-2"
                        onClick={() => setExpandedProject(index)}
                      >
                        View Details
                      </Button>
                    )}

                    {expandedProject === index && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => setExpandedProject(null)}
                      >
                        Hide Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try changing your filters or search term</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's work together to bring your vision to life. Our team is ready to help you create something amazing.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
            Get Started
          </Button>
        </div>
      </section>
      
    </div>
  );
};

export default Projects;
