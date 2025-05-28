import React from 'react';
import SEO from '../components/SEO';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SEO 
        title="Terms of Service - Design Deliver Grow"
        description="Read the official Terms of Service for using Design Deliver Grow's courses, services, and digital products."
      />
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg">
        <p className="mb-4">Last updated: May 24, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using DesignDeliverGrow ("Platform", "we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all terms, you must not use our services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You must be at least 13 years old to create an account or use our services.</li>
            <li>You agree to provide accurate, complete, and current information during registration.</li>
            <li>You are solely responsible for maintaining the confidentiality of your account credentials.</li>
            <li>We reserve the right to suspend or terminate accounts that engage in misuse, fraud, or violations of our terms.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p>All materials provided through our services—including course content, web templates, code, videos, documentation, and branding—are the intellectual property of DesignDeliverGrow or its licensors.</p>
          <ul className="list-disc pl-6 mb-4">
            <li>You may not copy, distribute, modify, sublicense, or sell any content without prior written consent.</li>
            <li>Personal or non-commercial use is permitted only as explicitly authorized.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Payments and Refunds</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>All prices for services, courses, or digital products are displayed in INR (₹) and are subject to applicable taxes.</li>
            <li>We use secure third-party payment processors. We do not store your card information.</li>
            <li>Refunds, if applicable, are governed by our <strong>Refund Policy</strong> (available upon request or linked separately).</li>
            <li>Subscription services may auto-renew unless canceled before the billing cycle.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use Policy</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You agree not to engage in illegal, abusive, or unethical behavior while using our services.</li>
            <li>Scraping, reverse-engineering, or attempting to exploit vulnerabilities is strictly prohibited.</li>
            <li>You may not use our platform to transmit harmful content, malware, or spam.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p>We provide our services "as is" and do not warrant uninterrupted or error-free operation. To the fullest extent permitted by law, DesignDeliverGrow shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform or services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Modifications to the Terms</h2>
          <p>We reserve the right to update or modify these Terms at any time. Significant changes will be communicated via email or site notification. Your continued use after such changes constitutes your acceptance of the revised Terms.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Disputes shall be resolved under the jurisdiction of the courts in Andhra Pradesh.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p><strong>Email:</strong> <a href="mailto:info@designdelivergrow.com">info@designdelivergrow.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
