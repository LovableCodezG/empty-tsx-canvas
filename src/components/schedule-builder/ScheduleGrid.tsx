
import React from 'react';
import { motion } from 'framer-motion';
import DayColumn from './DayColumn';

interface ScheduleGridProps {
  selectedDay: number;
}

const ScheduleGrid = ({ selectedDay }: ScheduleGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Daily Schedule - Day {selectedDay + 1}
        </h2>
      </div>
      
      <div id="canvas-grid" className="h-[500px] overflow-y-auto">
        <DayColumn selectedDay={selectedDay} />
      </div>
    </motion.div>
  );
};

export default ScheduleGrid;
