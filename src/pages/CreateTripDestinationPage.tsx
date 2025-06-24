
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DestinationHeader from '@/components/trip-creation/DestinationHeader';
import DestinationInputPanel from '@/components/trip-creation/DestinationInputPanel';
import DestinationMapPanel from '@/components/trip-creation/DestinationMapPanel';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';

const CreateTripDestinationPage = () => {
  const { state } = useTripCreation();
  const navigate = useNavigate();

  // Backend Integration: Validation logic for proceeding to next step
  const hasValidDates = state.dateType && (
    (state.dateType === 'single' && state.startDate) ||
    (state.dateType === 'range' && state.dateRange?.from)
  );

  const canProceed = state.tripType && 
    hasValidDates &&
    state.destinationType && (
    state.destinationType === 'domestic' || 
    (state.destinationType === 'international' && state.selectedCountry)
  ) && (
    state.tripType === 'personal' || 
    (state.tripType === 'group' && state.groupMembers.every(member => 
      member.name.trim() !== '' && member.email.trim() !== ''
    ))
  );

  const handleNext = async () => {
    if (canProceed) {
      // Backend Integration: Save trip data before proceeding
      // try {
      //   await createTrip(); // This will call the API to create the trip
      //   console.log('Trip created successfully with ID:', state.tripId);
      //   navigate('/create-trip/schedule');
      // } catch (error) {
      //   console.error('Failed to create trip:', error);
      //   // Show error toast or message to user
      // }
      
      // For now, proceed to schedule builder
      console.log('Proceeding to schedule builder with state:', state);
      navigate('/create-trip/schedule');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TripCreationCloseButton />
      
      <div className="container mx-auto px-6 py-8">
        <DestinationHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DestinationInputPanel />
          <DestinationMapPanel />
        </div>

        {/* Sticky CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="fixed bottom-6 right-6 z-20"
        >
          <Button
            id="next-to-schedule-button"
            onClick={handleNext}
            disabled={!canProceed}
            size="lg"
            className={cn(
              "h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
              canProceed
                ? "bg-spot-primary hover:bg-spot-primary/90 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            Next → Build Your Schedule
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateTripDestinationPage;
