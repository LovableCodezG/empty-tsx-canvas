
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Users, Target, Lightbulb, Heart, Mail, Phone, MapPin } from "lucide-react";
import { CountAnimation } from "@/components/ui/count-animation";

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make travel planning effortless and enjoyable for everyone, anywhere in the world."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to create personalized travel experiences."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a global community of travelers who share and inspire each other."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about travel and helping others discover amazing destinations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <Header theme="light" />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
              About SpotPlan
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              We're revolutionizing the way people plan and experience travel through 
              intelligent AI-powered recommendations and collaborative planning tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Our Story</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    SpotPlan was born from a simple frustration: planning the perfect trip 
                    shouldn't be overwhelming. Our founders, avid travelers themselves, 
                    experienced firsthand the challenges of coordinating itineraries, 
                    managing expenses, and discovering hidden gems.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We envisioned a world where artificial intelligence could understand 
                    your unique travel preferences and craft personalized experiences that 
                    truly resonate with your style of exploration.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-sky-100 rounded-xl p-8 text-center">
                  <CountAnimation number={2025} className="text-4xl font-bold text-blue-600 mb-2" />
                  <div className="text-gray-600">Founded with a vision</div>
                  <CountAnimation number={195} className="text-4xl font-bold text-blue-600 mb-2 mt-6" />
                  <div className="text-gray-600">Countries covered</div>
                </div>
              </div>
            </motion.div>

            {/* Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <motion.h5 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-xs uppercase tracking-wide text-gray-500 mb-4"
                >
                  our values
                </motion.h5>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold tracking-tight text-blue-900 mb-6"
                >
                  Guiding principles that{" "}
                  <span className="text-blue-600">shape our journey</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto text-gray-600 leading-relaxed"
                >
                  These core values are the foundation of everything we do at SpotPlan. 
                  They guide our decisions, inspire our innovations, and ensure we always 
                  put travelers first in creating exceptional experiences.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      className="group bg-white rounded-2xl border border-blue-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-8 h-8 text-blue-600" />
                        </motion.div>
                        <motion.div 
                          className="text-3xl font-bold text-blue-600 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </motion.div>
                      </div>
                      <motion.h3 
                        className="text-2xl font-bold text-blue-900 mb-4 tracking-tight group-hover:text-blue-700 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                        viewport={{ once: true }}
                      >
                        {value.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
                        viewport={{ once: true }}
                      >
                        {value.description}
                      </motion.p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">Get in Touch</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">hello@spotplan.com</p>
                  <p className="text-gray-600">support@spotplan.com</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600 text-sm">Mon-Fri 9AM-6PM PST</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600">123 Innovation Drive</p>
                  <p className="text-gray-600">San Francisco, CA 94105</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
};

export default AboutPage;
