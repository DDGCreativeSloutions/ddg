'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SHEETDB_API_URL = "https://sheetdb.io/api/v1/dcatblz3r9uht";

type ContactSubmission = {
  id?: string;
  service: string;
  name: string;
  email: string;
  whatsapp: string;
  notes: string;
};

const serviceLabels: Record<string, string> = {
  'web-design': 'Web Design & Development',
  'student-project': 'Student Project Assistance',
  'social-media': 'Social Media Marketing',
  'workshops': 'Educational Workshops',
  'other': 'Other Amazing Services',
};

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(SHEETDB_API_URL);
        if (!res.ok) throw new Error('Failed to fetch contact submissions');
        const data = await res.json();
        setSubmissions(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      }
      setLoading(false);
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Contact Submissions (Admin)
        </h1>
        {/* Dashboard summary */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center">
            <span className="text-2xl font-semibold text-purple-700">Total Submissions</span>
            <span className="text-4xl font-bold text-blue-700 mt-2">
              {loading ? '...' : submissions.length}
            </span>
          </div>
        </div>
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            {loading ? (
              <div className="text-center text-lg text-gray-600">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600 font-semibold">{error}</div>
            ) : submissions.length === 0 ? (
              <div className="text-center text-gray-500">No submissions found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-100 to-blue-100">
                      <th className="px-4 py-2 text-left font-semibold">Service</th>
                      <th className="px-4 py-2 text-left font-semibold">Name</th>
                      <th className="px-4 py-2 text-left font-semibold">Email</th>
                      <th className="px-4 py-2 text-left font-semibold">WhatsApp</th>
                      <th className="px-4 py-2 text-left font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-purple-50">
                        <td className="px-4 py-2">{serviceLabels[s.service] || s.service}</td>
                        <td className="px-4 py-2">{s.name}</td>
                        <td className="px-4 py-2">{s.email}</td>
                        <td className="px-4 py-2">{s.whatsapp}</td>
                        <td className="px-4 py-2">{s.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;