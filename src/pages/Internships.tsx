import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Star, Users, Calendar, Award, TrendingUp, Sparkles, Code, Palette, Brain, Target } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Internships = () => {
  const [expandedInternship, setExpandedInternship] = useState<number | null>(null);
  const [internshipType, setInternshipType] = useState<'individual' | 'group'>('individual');
  const navigate = useNavigate();

  const internshipsSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "DesignDeliverGrow Internship Program",
    "description": "Comprehensive internship opportunities in web development, design, digital marketing, and AI/ML for students and fresh graduates.",
    "url": "https://www.designdelivergrow.store/internships",
    "provider": {
      "@type": "Organization",
      "name": "DesignDeliverGrow",
      "url": "https://www.designdelivergrow.store"
    }
  };

  const internshipPrograms = [
    {
      id: 1,
      title: "Web Development Internship",
      duration: "3-6 Months",
      type: "Full-time/Part-time",
      category: "individual",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      description: "Build real-world web applications and gain hands-on experience with modern web technologies in a personalized learning environment.",
      benefits: [
        "One-on-one mentorship with senior developers",
        "Personalized project assignments based on your skill level",
        "Flexible scheduling to accommodate your academic commitments",
        "Certificate of completion",
        "Letter of recommendation",
        "Performance-based stipend"
      ],
      requirements: [
        "Basic knowledge of HTML, CSS, JavaScript",
        "Passion for web development",
        "Good communication skills",
        "Currently pursuing or recently completed degree"
      ]
    },
    {
      id: 2,
      title: "UI/UX Design Internship",
      duration: "3-6 Months",
      type: "Full-time/Part-time",
      category: "individual",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      description: "Design beautiful and user-friendly interfaces for web and mobile applications with personalized guidance.",
      benefits: [
        "Personal design mentorship and portfolio review",
        "Individual project assignments tailored to your interests",
        "Flexible hours to balance with studies",
        "Certificate of completion",
        "Letter of recommendation",
        "Performance-based stipend"
      ],
      requirements: [
        "Basic knowledge of design principles",
        "Familiarity with design tools",
        "Creative mindset",
        "Good communication skills"
      ]
    },
    {
      id: 3,
      title: "Digital Marketing Internship",
      duration: "3-6 Months",
      type: "Full-time/Part-time",
      category: "individual",
      skills: ["Social Media", "SEO", "Content Marketing", "Analytics"],
      description: "Learn digital marketing strategies and execute campaigns for real clients with personalized training.",
      benefits: [
        "One-on-one marketing strategy sessions",
        "Personal campaign management responsibilities",
        "Flexible scheduling for academic balance",
        "Certificate of completion",
        "Letter of recommendation",
        "Performance-based stipend"
      ],
      requirements: [
        "Basic knowledge of social media",
        "Good writing skills",
        "Understanding of digital marketing",
        "Currently pursuing marketing/communication degree"
      ]
    },
    {
      id: 4,
      title: "AI/ML Internship",
      duration: "3-6 Months",
      type: "Full-time/Part-time",
      category: "individual",
      skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
      description: "Work on AI and machine learning projects with personalized guidance from industry experts.",
      benefits: [
        "Personal mentorship from AI/ML specialists",
        "Customized project assignments based on your background",
        "Flexible learning pace",
        "Certificate of completion",
        "Letter of recommendation",
        "Performance-based stipend"
      ],
      requirements: [
        "Knowledge of Python programming",
        "Basic understanding of statistics",
        "Interest in AI/ML",
        "Currently pursuing CS/AI/ML degree"
      ]
    },
    {
      id: 5,
      title: "Group Web Development Bootcamp",
      duration: "3-6 Months",
      type: "Group Program",
      category: "group",
      skills: ["React", "Node.js", "TypeScript", "MongoDB", "Team Collaboration"],
      description: "Collaborative web development experience where you work in teams on real client projects with peer learning.",
      benefits: [
        "Team-based project work with 3-5 interns per group",
        "Peer learning and code reviews",
        "Group mentorship sessions",
        "Agile development methodology training",
        "Certificate of completion",
        "Letter of recommendation",
        "Performance-based stipend"
      ],
      requirements: [
        "Basic knowledge of HTML, CSS, JavaScript",
        "Team player with good collaboration skills",
        "Willingness to participate in group activities",
        "Currently pursuing or recently completed degree"
      ]
    },
    {
      id: 6,
      title: "Collaborative Design Studio",
      duration: "3-6 Months",
      type: "Group Program",
      category: "group",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
      description: "Work in design teams to create comprehensive user experiences for real client projects.",
      benefits: [
        "Team-based design sprints and workshops",
        "Collaborative brainstorming and ideation sessions",
        "Group portfolio projects",
        "Design system development experience",
        "Certificate of completion",
        "Letter of recommendation",
        "Performance-based stipend"
      ],
      requirements: [
        "Basic knowledge of design principles",
        "Familiarity with design tools",
        "Strong teamwork and communication skills",
        "Creative mindset"
      ]
    },
    {
      id: 7,
      title: "Digital Marketing Campaign Team",
      duration: "3-6 Months",
      type: "Group Program",
      category: "group",
      skills: ["Social Media", "SEO", "Content Marketing", "Analytics", "Campaign Strategy"],
      description: "Work in marketing teams to plan and execute comprehensive digital marketing campaigns.",
      benefits: [
        "Team-based campaign planning and execution",
        "Collaborative content creation workshops",
        "Group analytics and reporting sessions",
        "Cross-functional marketing experience",
        "Certificate of completion",
        "Letter of recommendation",
        "Performance-based stipend"
      ],
      requirements: [
        "Basic knowledge of social media",
        "Good writing and communication skills",
        "Team collaboration experience",
        "Understanding of digital marketing"
      ]
    },
    {
      id: 8,
      title: "AI/ML Research Group",
      duration: "3-6 Months",
      type: "Group Program",
      category: "group",
      skills: ["Python", "Machine Learning", "Data Science", "TensorFlow", "Research"],
      description: "Collaborative AI/ML research and development in small teams working on innovative projects.",
      benefits: [
        "Team-based research and development projects",
        "Collaborative problem-solving sessions",
        "Peer code reviews and knowledge sharing",
        "Research paper writing experience",
        "Certificate of completion",
        "Letter of recommendation",
        "Performance-based stipend"
      ],
      requirements: [
        "Knowledge of Python programming",
        "Basic understanding of statistics",
        "Strong teamwork skills",
        "Interest in AI/ML research"
      ]
    }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Successful Interns" },
    { icon: Award, value: "95%", label: "Placement Rate" },
    { icon: TrendingUp, value: "4.8/5", label: "Average Rating" },
    { icon: Sparkles, value: "50+", label: "Live Projects" }
  ];

  const filteredPrograms = internshipPrograms.filter(program => program.category === internshipType);

  return (
    <>
      <SEO
        title="Internship Programs | DesignDeliverGrow"
        description="Join our comprehensive internship programs in web development, UI/UX design, digital marketing, and AI/ML. Choose between individual internships with personalized mentorship or group internships with collaborative team learning."
        keywords="internship, web development internship, UI/UX design internship, digital marketing internship, AI/ML internship, student internship"
        schema={internshipsSchema}
      />

      <PageLayout
        title="Internship Programs"
        subtitle="Launch Your Career with Real-World Experience"
        description="Join our comprehensive internship programs - individual internships with personalized mentorship or group internships with collaborative team learning. Gain hands-on experience with live projects and expert guidance."
      >
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Internship Programs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Internship Programs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Choose from our specialized internship tracks designed to give you practical experience
                and prepare you for a successful career in tech.
              </p>

              {/* Internship Type Selector */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setInternshipType('individual')}
                    className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                      internshipType === 'individual'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Individual Internships
                  </button>
                  <button
                    onClick={() => setInternshipType('group')}
                    className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                      internshipType === 'group'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Group Internships
                  </button>
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-gray-600">
                  {internshipType === 'individual'
                    ? 'Personalized learning experience with one-on-one mentorship and flexible scheduling.'
                    : 'Collaborative team environment with peer learning and group project work.'
                  }
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary">{program.duration}</Badge>
                            <Badge variant="outline">{program.type}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {program.skills.slice(0, 3).map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{program.description}</p>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            What You'll Gain
                          </h4>
                          <ul className="space-y-1">
                            {program.benefits.slice(0, expandedInternship === program.id ? program.benefits.length : 3).map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="text-sm text-gray-600 flex items-start">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                          {program.benefits.length > 3 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedInternship(expandedInternship === program.id ? null : program.id)}
                              className="mt-2 p-0 h-auto text-purple-600 hover:text-purple-700"
                            >
                              {expandedInternship === program.id ? 'Show Less' : `Show ${program.benefits.length - 3} More Benefits`}
                            </Button>
                          )}
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                          <ul className="space-y-1">
                            {program.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="text-sm text-gray-600 flex items-start">
                                <Target className="w-3 h-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          onClick={() => navigate('/contact')}
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Internship Program?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We provide more than just an internship – we offer a launchpad for your career.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {internshipType === 'individual' ? 'Personalized Learning' : 'Collaborative Projects'}
                </h3>
                <p className="text-gray-600">
                  {internshipType === 'individual'
                    ? 'One-on-one mentorship with customized learning paths tailored to your goals.'
                    : 'Team-based projects with peer learning and collaborative problem-solving.'
                  }
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {internshipType === 'individual' ? 'Expert Mentorship' : 'Group Mentorship'}
                </h3>
                <p className="text-gray-600">
                  {internshipType === 'individual'
                    ? 'Learn from industry professionals with personalized guidance and feedback.'
                    : 'Group mentorship sessions with industry experts and peer knowledge sharing.'
                  }
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Growth</h3>
                <p className="text-gray-600">
                  Build your portfolio, gain certifications, and increase your job prospects with industry-recognized experience.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join our internship program and take the first step towards a successful career in tech.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/contact')}
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  Apply for Internship
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/projects')}
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  View Our Work
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Internships;