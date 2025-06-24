
import { motion } from "framer-motion";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header theme="dark" />
      
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
            Privacy Policy
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl text-gray-300 mb-8 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-white">Introduction</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to SpotPlan. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our 
                travel planning platform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-white">Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-200">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials and profile information</li>
                  <li>Travel preferences and itinerary data</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
                
                <h3 className="text-xl font-medium text-gray-200 mt-6">Usage Information</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and preferences</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-white">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Provide and improve our travel planning services</li>
                <li>Create personalized itineraries and recommendations</li>
                <li>Process payments and manage your account</li>
                <li>Communicate with you about your trips and our services</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-white">Data Sharing and Disclosure</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Service providers who help us operate our platform</li>
                <li>Travel partners and booking platforms (with your consent)</li>
                <li>Legal authorities when required by law</li>
                <li>Other users when you choose to share trip information</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-white">Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including 
                encryption, secure data transmission, and regular security audits. However, no method of transmission 
                over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-white">Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Access and review your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability and export</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-white">Cookies and Tracking</h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, remember your preferences, 
                and analyze site usage. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-white">Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any material changes 
                by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-white">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-gray-900 rounded-lg">
                <p className="text-gray-300">
                  Email: privacy@spotplan.com<br />
                  Address: [Your Company Address]<br />
                  Phone: [Your Phone Number]
                </p>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </main>

      <Footer theme="dark" />
    </div>
  );
};

export default PrivacyPolicy;
