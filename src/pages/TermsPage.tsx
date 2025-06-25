
import React from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header theme="light" />
      
      <main className="pt-16">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Terms of Service
              </h1>
              <p className="text-gray-600 mb-8">
                Last updated: December 25, 2024
              </p>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 mb-6">
                  By accessing and using SpotPlan, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Description of Service
                </h2>
                <p className="text-gray-700 mb-6">
                  SpotPlan is a travel planning platform that provides tools for creating itineraries, managing expenses, and collaborating with fellow travelers.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. User Accounts
                </h2>
                <p className="text-gray-700 mb-6">
                  You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Privacy Policy
                </h2>
                <p className="text-gray-700 mb-6">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Prohibited Uses
                </h2>
                <p className="text-gray-700 mb-6">
                  You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Termination
                </h2>
                <p className="text-gray-700 mb-6">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Contact Information
                </h2>
                <p className="text-gray-700 mb-6">
                  Questions about the Terms of Service should be sent to us at legal@spotplan.com.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer theme="light" />
    </div>
  );
};

export default TermsPage;
