import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, Award, Lightbulb, Hammer, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { workshops } from '@/data/workshopsData';

const Workshops = () => {
  const navigate = useNavigate();
  const [expandedWorkshop, setExpandedWorkshop] = useState<number | null>(null);
  const [countdown, setCountdown] = useState("");
  const [registeredCount, setRegisteredCount] = useState<number | null>(null);

  // Fetch registered count from SheetDB
  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/w7cl475isdyph/count')
      .then(res => res.json())
      .then(data => {
        if (typeof data?.rows === "number") setRegisteredCount(data.rows);
      })
      .catch(() => setRegisteredCount(null));
  }, []);

  // Countdown timer for the first workshop
  useEffect(() => {
    if (!workshops[0].date) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = workshops[0].date!.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(
          `Starts in: <span style="color:#6366f1;font-weight:bold">${days}d</span> <span style="color:#10b981;font-weight:bold">${hours}h</span> <span style="color:#f59e42;font-weight:bold">${minutes}m</span> <span style="color:#ef4444;font-weight:bold">${seconds}s</span>`
        );
      } else {
        setCountdown("Event Started!");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = (id: string) => {
    navigate(`/workshops/${id}`);
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Workshops</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intense, hands-on sessions designed to help you build, learn, and grow in just a few focused days.
          </p>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((workshop, index) => {
            // Update the first workshop with dynamic data
            const workshopData = {...workshop};
            if (index === 0) {
              workshopData.duration = countdown;
              workshopData.students = registeredCount !== null ? `${registeredCount} registered` : "Loading...";
            }
            
            return (
              <Card 
                key={index} 
                className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${expandedWorkshop === index ? 'ring-2 ring-indigo-500' : ''}`}
              >
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
                      {index === 0 ? (
                        <span
                          className="text-gray-600"
                          dangerouslySetInnerHTML={{ __html: workshopData.duration }}
                        />
                      ) : (
                        <span className="text-gray-600">{workshop.duration}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">{workshopData.students}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{workshop.level}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      {workshop.date ? (
                        <span className="text-gray-600">{workshop.date.toLocaleDateString()}</span>
                      ) : (
                        <span className="text-gray-400 italic">Upcoming</span>
                      )}
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
                          onClick={() => handleViewDetails(workshop.id)}
                          className={`bg-gradient-to-r ${workshop.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                        >
                          View Full Details
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button 
                    variant={expandedWorkshop === index ? "outline" : "default"}
                    className="w-full mt-4 flex items-center justify-center hover:bg-blue-500 transition-all"
                    onClick={() => setExpandedWorkshop(expandedWorkshop === index ? null : index)}
                  >
                    {expandedWorkshop === index ? 'Show Less' : 'Quick Preview'}
                    {expandedWorkshop !== index && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>

                  <Button 
                    variant="default"
                    className={`w-full mt-4 bg-gradient-to-r ${workshop.color} hover:shadow-lg transition-all`}
                    onClick={() => handleViewDetails(workshop.id)}
                  >
                    View Workshop Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Level Up Your Skills?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Our workshops are designed to provide intensive, hands-on learning experiences that will accelerate your growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-indigo-600 hover:bg-white/90 hover:shadow-lg transition-all"
              onClick={() => document.getElementById('workshops-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore All Workshops
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white text-indigo-600 hover:bg-white/90 hover:shadow-lg transition-all"
              onClick={() => navigate('/contact')}
            >
              Request Custom Workshop
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workshops;