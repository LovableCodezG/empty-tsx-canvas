
import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ScheduleHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <Calendar className="h-8 w-8 text-spot-primary" />
        <h1 className="text-3xl font-bold text-gray-900">Schedule Builder</h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Build your itinerary by selecting places and assigning times for each day
      </p>
    </motion.div>
  );
};

export default ScheduleHeader;
