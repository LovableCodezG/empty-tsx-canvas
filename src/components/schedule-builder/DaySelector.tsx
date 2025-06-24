
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { format, addDays, differenceInDays } from 'date-fns';

interface DaySelectorProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

const DaySelector = ({ selectedDay, onSelectDay }: DaySelectorProps) => {
  const { state } = useTripCreation();
  
  // Dates populated from Page 1 user-selected trip range
  const getDayButtons = () => {
    const buttons = [];
    
    if (state.dateType === 'single' && state.startDate) {
      // Single day trip
      buttons.push({
        day: 0,
        label: 'Day 1',
        date: format(state.startDate, 'EEE, MMM d')
      });
    } else if (state.dateType === 'range' && state.dateRange?.from) {
      // Multi-day trip
      const startDate = state.dateRange.from;
      const endDate = state.dateRange.to || startDate;
      const dayCount = differenceInDays(endDate, startDate) + 1;
      
      for (let i = 0; i < dayCount; i++) {
        const currentDate = addDays(startDate, i);
        buttons.push({
          day: i,
          label: `Day ${i + 1}`,
          date: format(currentDate, 'EEE, MMM d')
        });
      }
    } else {
      // Fallback if no dates are set
      buttons.push({
        day: 0,
        label: 'Day 1',
        date: 'Select dates first'
      });
    }
    
    return buttons;
  };

  const dayButtons = getDayButtons();
  const totalDays = dayButtons.length;

  const handlePrevious = () => {
    if (selectedDay > 0) {
      onSelectDay(selectedDay - 1);
    }
  };

  const handleNext = () => {
    if (selectedDay < totalDays - 1) {
      onSelectDay(selectedDay + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Select Day</h2>
        <span className="text-sm text-gray-500">{totalDays} {totalDays === 1 ? 'day' : 'days'} total</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={selectedDay === 0}
          className="shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-3 overflow-x-auto min-w-0 flex-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {dayButtons.map((button) => (
            <Button
              key={button.day}
              onClick={() => onSelectDay(button.day)}
              variant={selectedDay === button.day ? "default" : "outline"}
              className={cn(
                "day-column shrink-0 flex-col h-auto py-3 px-4 min-w-[120px]",
                selectedDay === button.day 
                  ? "bg-spot-primary hover:bg-spot-primary/90 text-white" 
                  : "bg-white hover:bg-gray-50 text-gray-700"
              )}
            >
              <span className="font-medium text-sm">{button.label}</span>
              <span className="text-xs opacity-80">{button.date}</span>
            </Button>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={selectedDay === totalDays - 1}
          className="shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 mt-3 text-center">
        Scroll horizontally or use arrows to navigate
      </p>
    </motion.div>
  );
};

export default DaySelector;
