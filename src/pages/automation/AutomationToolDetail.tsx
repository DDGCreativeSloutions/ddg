import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getToolById } from '@/data/automationToolsData';
import {
  ChevronLeft,
  Star,
  Code,
  Globe,
  Zap,
  CheckCircle,
  BookOpen,
  Server,
  Laptop,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SEO from '@/components/SEO';

const AutomationToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tool = getToolById(id || '');
  const [activeTab, setActiveTab] = useState('features');

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-gray-600 mb-6">The automation tool you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/tools')} className="inline-flex items-center">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <SEO
        title={`${tool.title} | Automation Tool`}
        description={tool.tagline}
        keywords={`whatsapp bulk sender, whatsapp automation, ${tool.title}`}
        canonical={`https://www.designdelivergrow.store/tools/${tool.id}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/tools')}
            className="inline-flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
          {tool.demoAvailable && (
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              Try Demo
            </Button>
          )}
        </div>

        {/* Tool Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`text-5xl w-20 h-20 flex items-center justify-center bg-gradient-to-br ${tool.color} rounded-2xl text-white shadow-lg`}>
                  {tool.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{tool.title}</h1>
                  <p className="text-xl text-gray-600">{tool.tagline}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-6">
                <Badge variant="gradient-purple" className="text-sm">{tool.category}</Badge>
                <Badge variant="gradient-blue" className="text-sm">{tool.pricing}</Badge>
                <Badge variant="gradient-green" className="text-sm">{tool.level}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-md p-2">
              <div className="flex gap-2">
                {['features', 'integration', 'requirements', 'reviews'].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <Button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 capitalize rounded-md transition-colors duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-400 text-white shadow border-0'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                      variant="ghost"
                    >
                      {tab}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-md p-6">
              {activeTab === 'features' && (
                <div className="space-y-6">
                  {tool.features.map((feature, idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {feature.features.map((item, i) => (
                            <div key={i} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'integration' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Supported Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.integration.platforms.map((platform, i) => (
                        <Badge key={i} variant="outline" className="text-sm">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.integration.languages.map((lang, i) => (
                        <Badge key={i} variant="outline" className="text-sm">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Frameworks</h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.integration.frameworks.map((framework, i) => (
                        <Badge key={i} variant="outline" className="text-sm">
                          {framework}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div className="space-y-4">
                  {tool.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {tool.reviews.map((review, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold">
                            {review.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{review.role}</p>
                            <p className="text-gray-700">{review.text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                <div className="space-y-3">
                  {tool.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Core Capabilities</h3>
                <div className="space-y-3">
                  {tool.capabilities.map((capability, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{capability}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {tool.documentation && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Documentation</h3>
                  <p className="text-gray-700">{tool.documentation}</p>
                  <Button variant="outline" className="w-full mt-4">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationToolDetail;