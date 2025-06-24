
import React from 'react';
import { motion } from 'framer-motion';

const DestinationHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Where are you planning to go?
      </h1>
      <p className="text-lg text-gray-600">
        Let us personalize your trip
      </p>
    </motion.div>
  );
};

export default DestinationHeader;
