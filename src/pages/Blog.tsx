import { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, Search, Tag, TrendingUp, BookOpen, Code, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Add handleReadMore function
  const handleReadMore = (post: any) => {
    const slugMap: { [key: number]: string } = {
      1: 'web-development-guide-2024',
      2: 'final-year-project-guide',
      3: 'social-media-marketing-strategy',
      4: 'ai-ml-project-ideas-2024',
      5: 'student-to-software-developer',
      6: 'building-restful-apis-nodejs',
      7: 'From Project to Publication',
      8: 'Important Questions for Your Sem prepared form Previous question paper',
      9:'Master Cutting-Edge Tech with Our Weekly Workshops on AI, IoT, Web Dev & More!',
      10:'Project Handover Guide',
      11:'The Ultimate Guide to College and School Websites',
      12:'We Provide Ready-to-Use Solutions for Problem Statements in any type of Hackathons'
    };
    navigate(`/blog/${slugMap[post.id]}`);
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "DesignDeliverGrow Blog",
    "description": "Expert insights on web development, student projects, digital marketing, and technology trends",
    "url": "https://www.designdelivergrow.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "DesignDeliverGrow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.designdelivergrow.com/logo.png"
      }
    },
    "blogPost": [
      {
        "@type": "BlogPosting",
        "headline": "Complete Guide to Web Development in 2024",
        "description": "Learn the latest web development trends, technologies, and best practices for building modern websites.",
        "author": {
          "@type": "Person",
          "name": "DDG Team"
        },
        "datePublished": "2024-01-15",
        "url": "https://www.designdelivergrow.com/blog/web-development-guide-2024"
      }
    ]
  };

  const categories = ['All', 'Web Development', 'Student Projects', 'Digital Marketing', 'AI/ML', 'Career Tips', 'Technology Trends'];

  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to Web Development in 2024: Technologies, Trends & Best Practices",
      excerpt: "Discover the latest web development technologies, frameworks, and trends that are shaping the industry in 2024. From React to AI integration.",
      category: "Web Development",
      author: "DDG Team",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "💻",
      tags: ["React", "JavaScript", "Web Development", "2024 Trends"],
      featured: true
    },
    {
      id: 2,
      title: "How to Choose the Perfect Final Year Project: CSE, AI/ML & AIDS Guide",
      excerpt: "Step-by-step guide to selecting, planning, and executing your final year project. Includes 50+ project ideas and implementation tips.",
      category: "Student Projects",
      author: "Project Mentor",
      date: "2024-01-12",
      readTime: "12 min read",
      image: "🎓",
      tags: ["Final Year Project", "CSE", "AI/ML", "Project Ideas"],
      featured: true
    },
    {
      id: 3,
      title: "Social Media Marketing Strategy for Startups: From Zero to 10K Followers",
      excerpt: "Proven strategies to grow your startup's social media presence organically. Real case studies and actionable tips included.",
      category: "Digital Marketing",
      author: "Marketing Expert",
      date: "2024-01-10",
      readTime: "10 min read",
      image: "📱",
      tags: ["Social Media", "Marketing", "Startups", "Growth Hacking"]
    },
    {
      id: 4,
      title: "AI & Machine Learning Project Ideas for Students in 2024",
      excerpt: "25+ innovative AI/ML project ideas with complete implementation guides, datasets, and career impact analysis.",
      category: "AI/ML",
      author: "AI Specialist",
      date: "2024-01-08",
      readTime: "15 min read",
      image: "🤖",
      tags: ["Artificial Intelligence", "Machine Learning", "Python", "Data Science"]
    },
    {
      id: 5,
      title: "From Student to Software Developer: Career Roadmap 2024",
      excerpt: "Complete career guide for computer science students. Skills, certifications, interview tips, and salary expectations.",
      category: "Career Tips",
      author: "Career Counselor",
      date: "2024-01-05",
      readTime: "18 min read",
      image: "🚀",
      tags: ["Career", "Software Development", "Skills", "Interview Tips"]
    },
    {
      id: 6,
      title: "Building RESTful APIs with Node.js: Complete Tutorial",
      excerpt: "Learn to build scalable REST APIs using Node.js, Express, and MongoDB. Includes authentication, validation, and deployment.",
      category: "Web Development",
      author: "Backend Developer",
      date: "2024-01-03",
      readTime: "20 min read",
      image: "⚙️",
      tags: ["Node.js", "REST API", "Backend", "MongoDB"]
    },
{
  id: 8,
  title: "ACE Semester Exams – Important Questions",
  excerpt: "Get ahead in your semester exams with our curated list of important questions tailored to ACE syllabus patterns.",
  category: "Exam Preparation",
  author: "Academic Coach",
  date: "2024-03-01",
  readTime: "6 min read",
  image: "📘",
  tags: ["ACE", "Exams", "Important Questions", "Study Guide"]
},
{
  id: 9,
  title: "Master Cutting-Edge Tech with Our Weekly Workshops on AI, IoT, Web Dev & More!",
  excerpt: "Join our hands-on workshops every weekend to explore the latest in AI, IoT, and Web Development with industry experts.",
  category: "Workshops",
  author: "Tech Mentor",
  date: "2024-03-08",
  readTime: "8 min read",
  image: "🚀",
  tags: ["Workshops", "AI", "IoT", "Web Development"]
},
{
  id: 10,
  title: "Project Handover Guide – How We Ensure Smooth Delivery & Setup for Your Academic Project",
  excerpt: "Discover how we make academic project delivery seamless with proper documentation, setup support, and technical assistance.",
  category: "Academic Projects",
  author: "Project Coordinator",
  date: "2024-03-15",
  readTime: "7 min read",
  image: "📦",
  tags: ["Project Handover", "Academic Projects", "Setup Guide"]
},
{
  id: 11,
  title: "The Ultimate Guide to College & School Websites – Must-Have Features & Best Practices",
  excerpt: "Learn what makes a great educational website—from design and responsiveness to student portal integration and more.",
  category: "Web Design",
  author: "UI/UX Strategist",
  date: "2024-03-22",
  readTime: "10 min read",
  image: "🏫",
  tags: ["School Websites", "College Websites", "Web Design", "Best Practices"]
},
{
  id: 12,
  title: "Winning Hackathons Made Easy – How We Provide Ready-to-Use Solutions for Problem Statements",
  excerpt: "Increase your chances of hackathon success with our pre-built project ideas, documentation templates, and expert mentoring.",
  category: "Hackathons",
  author: "Innovation Coach",
  date: "2024-03-29",
  readTime: "9 min read",
  image: "🏆",
  tags: ["Hackathons", "Problem Statements", "Ready Solutions", "Project Ideas"]
},
{
  id:7 ,
  title: "From Project to Publication – Turning Your Work into Research Papers",
  excerpt: "Learn how to transform your academic or technical project into a publishable research paper with step-by-step guidance.",
  category: "Research & Publishing",
  author: "Research Mentor",
  date: "2024-02-24",
  readTime: "12 min read",
  image: "📝",
  tags: ["Research", "Project to Paper", "Academic Writing", "Publication"]
}

    
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const blogStats = [
    { icon: BookOpen, label: "Articles Published", value: "50+" },
    { icon: User, label: "Monthly Readers", value: "5K+" },
    { icon: TrendingUp, label: "Topics Covered", value: "15+" },
    { icon: Code, label: "Code Examples", value: "200+" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog | DesignDeliverGrow - Web Development, Student Projects & Tech Insights"
        description="Expert articles on web development, student project guidance, digital marketing strategies, and latest technology trends. Learn from industry professionals."
        schema={blogSchema}
        keywords="web development blog, student project help, digital marketing tips, technology trends, programming tutorials, career guidance"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200/50 backdrop-blur-sm">
              <Lightbulb className="w-4 h-4 mr-2" />
              Fresh Insights & Expert Tips
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6 leading-tight">
              Learn. Grow. Succeed.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto font-light leading-relaxed">
              Expert insights on <span className="font-semibold text-purple-600">web development</span>, <span className="font-semibold text-blue-600">student projects</span>, and <span className="font-semibold text-cyan-600">digital growth</span>
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg rounded-xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Blog Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {blogStats.map((stat, index) => (
              <div key={index} className="text-center backdrop-blur-sm bg-white/40 rounded-2xl p-6 border border-white/50 hover:bg-white/60 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Articles</h2>
              <p className="text-xl text-gray-600">Our most popular and impactful content</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-0 bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-purple-100 to-cyan-100 p-8 text-center">
                      <div className="text-6xl mb-4">{post.image}</div>
                      <Badge className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white mb-4">
                        Featured
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <Button 
                          variant="ghost" 
                          className="text-purple-600 hover:text-purple-700"
                          onClick={() => handleReadMore(post)}
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 
                  "bg-gradient-to-r from-purple-600 to-cyan-400 hover:from-purple-700 hover:to-cyan-500" : 
                  "border-purple-200 hover:bg-purple-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>


      {/* Regular Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-600">Stay updated with our latest insights and tutorials</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-gray-100 to-purple-50 p-6 text-center">
                    <div className="text-4xl mb-2">{post.image}</div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-purple-600 hover:text-purple-700"
                        onClick={() => handleReadMore(post)}
                      >
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Latest Insights
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Get weekly articles, project ideas, and career tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email"
              className="bg-white/90 border-0 text-gray-900 placeholder-gray-500"
            />
            <Button className="bg-white text-purple-600 hover:bg-gray-100 whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>
     
    </div>
  );
};

export default Blog;
