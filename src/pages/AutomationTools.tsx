import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { automationTools } from '@/data/automationToolsData';
import SEO from '@/components/SEO';
import { Section } from '@/components/ui/Section';
import { Header } from '@/components/ui/Header';
import { PageTransition } from '@/components/ui/PageTransition';

const AutomationTools: React.FC = () => {
  const navigate = useNavigate();
  const [expandedTool, setExpandedTool] = useState<number | null>(null);

  const handleViewDetails = (id: string) => {
    navigate(`/tools/${id}`);
  };

  return (
    <PageLayout>
      <PageTransition>
      <SEO
        title="Automation Tools | WhatsApp Bulk Message Sender"
        description="Send personalized WhatsApp messages at scale using templates, CSV import, scheduling, and delivery tracking."
        keywords="whatsapp bulk sender, whatsapp automation, bulk whatsapp messages, csv import whatsapp, whatsapp templates, schedule whatsapp messages"
        canonical="https://www.designdelivergrow.store/tools"
      />

      <Section className="pt-24">
        <Header
          title="Automation Tools"
          subtitle="Powerful automation tools to streamline your development workflow and boost productivity."
          badge="Boost Your Productivity 🚀"
          titleGradient
          centered
          className="mb-12"
        />

        {/* Tools Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {automationTools.map((tool, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  expandedTool === index ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <CardContent className="p-6">
                  {/* Tool header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div
                      className={`text-4xl w-16 h-16 flex items-center justify-center bg-gradient-to-br ${tool.color} rounded-xl text-white shadow-lg`}
                    >
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tool.title}</h3>
                      <p className="text-gray-600">{tool.tagline}</p>
                    </div>
                  </div>

                  {/* Tool details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Badge variant="gradient-purple">{tool.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="gradient-blue">{tool.pricing}</Badge>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {expandedTool === index && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-6 border-t pt-6">
                      {/* Features */}
                      <div className="space-y-4">
                        {tool.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <h5 className="font-semibold text-gray-900 mb-2">{feature.title}</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {feature.features.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-start space-x-2"
                                >
                                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Integration details */}
                      <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Supported Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                          {tool.integration.platforms.map((platform, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-indigo-50 hover:bg-indigo-100 transition-colors"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-4">
                        <Button
                          onClick={() => handleViewDetails(tool.id)}
                          className={`flex-1 bg-gradient-to-r ${tool.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                        >
                          View Details
                        </Button>
                        {tool.demoAvailable && (
                          <Button variant="outline" className="flex-1">
                            Try Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  <Button
                    variant={expandedTool === index ? 'outline' : 'default'}
                    className={`w-full mt-4 flex-1 bg-gradient-to-r ${tool.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                    onClick={() => setExpandedTool(expandedTool === index ? null : index)}
                  >
                    {expandedTool === index ? 'Show Less' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </Section>
    </PageTransition>
    </PageLayout>
  );
};

export default AutomationTools;
