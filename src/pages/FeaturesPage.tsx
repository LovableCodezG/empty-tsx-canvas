
import React from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users, Calculator, Sparkles, MapPin, Calendar, Share2, Clock, Shield } from "lucide-react";

const FeaturesPage = () => {
  const features = [
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Plan with friends and family in real-time. See changes instantly as everyone contributes to your perfect trip.",
      image: "/images/features/collaboration.jpg"
    },
    {
      icon: Calculator,
      title: "Smart Expense Tracking",
      description: "AI-powered budget estimation and automatic expense splitting. Never worry about who owes what again.",
      image: "/images/features/expenses.jpg"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Suggestions",
      description: "Get personalized recommendations for activities, restaurants, and hidden gems based on your preferences.",
      image: "/images/features/ai-suggestions.jpg"
    },
    {
      icon: MapPin,
      title: "Interactive Maps",
      description: "Visualize your entire trip on interactive maps with optimized routes and location-based recommendations.",
      image: "/images/features/maps.jpg"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Build your itinerary with drag-and-drop ease. Adjust timing and activities as your plans evolve.",
      image: "/images/features/scheduling.jpg"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your trip plans with travel companions or keep them private. Export to PDF or share via link.",
      image: "/images/features/sharing.jpg"
    },
    {
      icon: Clock,
      title: "Offline Access",
      description: "Access your trip details even without internet connection. Perfect for international travel.",
      image: "/images/features/offline.jpg"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your travel data is encrypted and secure. We never share your information with third parties.",
      image: "/images/features/security.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header theme="light" />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-blue-900 mb-6"
            >
              Everything You Need to
              <br />
              <span className="text-blue-600">Plan the Perfect Trip</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-blue-800 mb-10 max-w-3xl mx-auto"
            >
              Discover why thousands of travelers trust SpotPlan to create unforgettable experiences with our comprehensive suite of planning tools.
            </motion.p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Planning?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join thousands of travelers who have already discovered the joy of stress-free trip planning.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start Planning Your Trip
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer theme="light" />
    </div>
  );
};

export default FeaturesPage;
