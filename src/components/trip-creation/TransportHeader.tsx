
import React from 'react';
import { motion } from 'framer-motion';

const TransportHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        How do you want to travel in your destination
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        How are you planning to travel between places? This helps us estimate transportation costs accurately.
      </p>
    </motion.div>
  );
};

export default TransportHeader;
