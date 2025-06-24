
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTripCreation } from '@/contexts/TripCreationContext';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import ScheduleHeader from './ScheduleHeader';
import DaySelector from './DaySelector';
import SuggestionsPanel from './SuggestionsPanel';
import ScheduleGrid from './ScheduleGrid';
import AccommodationModal from './AccommodationModal';

const ScheduleBuilderContent = () => {
  const navigate = useNavigate();
  const { state } = useTripCreation();
  const [selectedDay, setSelectedDay] = useState(0);
  const [isAccommodationModalOpen, setIsAccommodationModalOpen] = useState(false);

  // Check if dates are properly set, redirect to destination page if not
  useEffect(() => {
    const hasValidDates = state.dateType && (
      (state.dateType === 'single' && state.startDate) ||
      (state.dateType === 'range' && state.dateRange?.from)
    );

    if (!hasValidDates) {
      console.log('No dates selected, redirecting to destination page');
      navigate('/create-trip/destination');
    }
  }, [state.dateType, state.startDate, state.dateRange, navigate]);

  const handleNext = () => {
    // Navigate to expense estimation page (placeholder for now)
    console.log('Proceeding to expense estimation');
    // navigate('/create-trip/expenses');
  };

  // Early return if no valid dates (while redirect is happening)
  const hasValidDates = state.dateType && (
    (state.dateType === 'single' && state.startDate) ||
    (state.dateType === 'range' && state.dateRange?.from)
  );

  if (!hasValidDates) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TripCreationCloseButton />
      
      <div className="container mx-auto px-6 py-8">
        <ScheduleHeader />
        
        <div className="mb-8">
          <DaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SuggestionsPanel selectedDay={selectedDay} />
          <ScheduleGrid selectedDay={selectedDay} />
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-20 flex flex-col gap-3">
          {/* Add Accommodation Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              id="open-hotel-popup-button"
              onClick={() => setIsAccommodationModalOpen(true)}
              size="lg"
              className={cn(
                "h-14 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                "bg-green-100 hover:bg-green-200 text-green-800 border border-green-300"
              )}
            >
              <Hotel className="mr-2 h-5 w-5" />
              Add Accommodation
            </Button>
          </motion.div>

          {/* Next Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              id="next-to-expense-button"
              onClick={handleNext}
              size="lg"
              className={cn(
                "h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                "bg-spot-primary hover:bg-spot-primary/90 text-white"
              )}
            >
              Next → Estimate Expenses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      <AccommodationModal
        isOpen={isAccommodationModalOpen}
        onClose={() => setIsAccommodationModalOpen(false)}
        selectedDay={selectedDay}
      />
    </div>
  );
};

export default ScheduleBuilderContent;
