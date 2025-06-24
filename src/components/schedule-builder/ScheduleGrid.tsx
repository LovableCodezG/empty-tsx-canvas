
import React from 'react';
import { motion } from 'framer-motion';
import FlexibleCanvas from './FlexibleCanvas';

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
}

interface ScheduleGridProps {
  selectedDay: number;
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
}

const ScheduleGrid = ({ selectedDay, onAddActivity }: ScheduleGridProps) => {
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
        <p className="text-sm text-gray-500 mt-1">
          View and manage your daily activities
        </p>
      </div>
      
      <div id="canvas-grid" className="h-[500px] overflow-y-auto">
        <FlexibleCanvas selectedDay={selectedDay} onAddActivity={onAddActivity} />
      </div>
    </motion.div>
  );
};

export default ScheduleGrid;
