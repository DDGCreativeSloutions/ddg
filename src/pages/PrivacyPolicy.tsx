import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SEO 
        title="Privacy Policy - Design Deliver Grow"
        description="Learn how DesignDeliverGrow collects, uses, and protects your personal information when you use our services, projects, and courses."
      />
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg">
        <p className="mb-4">Last updated: May 24, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>DesignDeliverGrow ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>www.designdelivergrow.com</strong>, use our services, or interact with our educational content.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p>We may collect the following types of personal and usage data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Full Name and Contact Details (Email, Phone Number)</li>
            <li>Project details and student academic data (if applicable)</li>
            <li>Billing and Payment Information</li>
            <li>Course enrollment data and progress tracking</li>
            <li>Communication logs (emails, support queries, messages)</li>
            <li>Usage data such as browser type, IP address, time of visit, and pages visited</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>Your data helps us provide a better experience. We use it to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Deliver and improve our services, including courses, web development, and project assistance</li>
            <li>Process transactions and send relevant invoices</li>
            <li>Provide customer support</li>
            <li>Send updates, promotions, or service-related messages (you may opt out)</li>
            <li>Ensure website security and prevent fraudulent activities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookies & Tracking Technologies</h2>
          <p>We use cookies and similar technologies to improve website functionality and analyze site traffic. You can manage cookie preferences via your browser settings.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Information Sharing & Disclosure</h2>
          <p>We do not sell or rent your personal data. However, we may share your data with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Third-party service providers (e.g., payment gateways, hosting providers)</li>
            <li>Government or legal authorities when required by law</li>
            <li>Partners, with your explicit consent, for joint programs or certifications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p>We take data security seriously. We implement technical and organizational safeguards to protect your information against unauthorized access, misuse, or loss.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p>As a user, you have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Request access to the personal data we hold</li>
            <li>Request correction or deletion of inaccurate data</li>
            <li>Withdraw consent or opt out of marketing at any time</li>
            <li>Request portability of your data in a machine-readable format</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
          <p>Our site may contain links to external websites. We are not responsible for the privacy practices or content of those sites. Please review their respective privacy policies.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
          <p>Our services are not directed to children under the age of 13. We do not knowingly collect personal data from children. If you believe a child has provided us personal information, please contact us immediately.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Updates to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and significant changes will be communicated to you directly via email or site notification.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or want to exercise your data rights, you can contact us at:</p>
          <p><strong>Email:</strong> <a href="mailto:info@designdelivergrow.com">info@designdelivergrow.com</a></p>
          <p><strong>Website:</strong> <a href="https://www.designdelivergrow.com">www.designdelivergrow.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
