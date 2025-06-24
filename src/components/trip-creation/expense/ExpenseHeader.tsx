
import React from 'react';
import { motion } from 'framer-motion';

const ExpenseHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Estimate Your Trip Expenses
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Get a detailed breakdown of your trip costs including transport, accommodation, food, and activities to help you plan your budget.
      </p>
    </motion.div>
  );
};

export default ExpenseHeader;
