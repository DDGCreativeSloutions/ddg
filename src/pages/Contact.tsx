'use client';

import { useState } from 'react';
import { ArrowRight, Check, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    whatsapp: '',
    notes: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const services = [
    { value: 'web-design', label: 'Web Design & Development' },
    { value: 'student-project', label: 'Student Project Assistance' },
    { value: 'social-media', label: 'Social Media Marketing' },
    { value: 'courses', label: 'Educational Courses' },
    { value: 'other', label: 'Other Services' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.service || !formData.name || !formData.email || !formData.whatsapp) {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    console.log('Booking data:', formData);

    toast({
      title: 'Consultation request submitted successfully!',
      description:
        "We'll contact you shortly to schedule a convenient time for the consultation.",
      variant: 'default',
    });

    setFormSubmitted(true);
    setFormData({
      service: '',
      name: '',
      email: '',
      whatsapp: '',
      notes: '',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Book a Free Consultation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Schedule a call with our experts to discuss your requirements and get personalized solutions
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {formSubmitted ? (
            <Card className="border-green-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Consultation Request Submitted!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest. We'll contact you shortly to schedule the consultation.
                </p>
                <Button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Submit Another Request
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit}>
                  {/* Service Type */}
                  <div className="mb-8">
                    <Label htmlFor="service" className="text-lg font-semibold text-gray-900 mb-2 block">
                      1. Select Service Type
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleSelectChange('service', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Personal Info */}
                  <div className="mb-8">
                    <Label className="text-lg font-semibold text-gray-900 mb-4 block">
                      2. Your Information
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Please share any specific requirements or questions you have..."
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
                  >
                    Request Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Other Ways to Reach Us</h2>
            <p className="text-xl text-gray-600">We're always here to help. Connect with us through any of these channels</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-600 mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">info@designdelivergrow.store</p>
                <p className="text-gray-600">support@designdelivergrow.store</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-gray-600">Mon-Fri, 10:00 AM - 6:00 PM</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full text-purple-600 mb-4">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-gray-600">Available for quick consultation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Got questions? We’ve got answers.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How long does it take to receive a response after submitting the consultation form?',
                a: 'We typically respond within 24–48 hours. If it’s urgent, feel free to reach us via WhatsApp or phone.',
              },
              {
                q: 'Is the consultation really free?',
                a: 'Yes! The initial consultation is completely free. It helps us understand your needs before offering a solution.',
              },
              {
                q: 'Can I reschedule or cancel my consultation?',
                a: 'Absolutely. You can reach out via WhatsApp or email to reschedule or cancel anytime.',
              },
              {
                q: 'What kind of services can I discuss during the consultation?',
                a: 'You can discuss any listed services including Web Design, Project Assistance, Courses, or even custom requests.',
              },
              {
                q: 'Do I need to make any payment before the consultation?',
                a: 'No payment is required for the consultation. Pricing is only discussed after understanding your needs.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
