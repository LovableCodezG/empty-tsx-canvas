
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripCreation } from '@/contexts/TripCreationContext';
import DestinationHeader from '@/components/trip-creation/DestinationHeader';
import DestinationInputPanel from '@/components/trip-creation/DestinationInputPanel';
import DestinationMapPanel from '@/components/trip-creation/DestinationMapPanel';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import TripNavigationButtons from '@/components/trip-creation/TripNavigationButtons';

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
      
      <div className="container mx-auto px-6 py-8 pb-24">
        <DestinationHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DestinationInputPanel />
          <DestinationMapPanel />
        </div>
      </div>

      <TripNavigationButtons
        showBack={false}
        nextText="Next → Build Your Schedule"
        onNext={handleNext}
        canProceed={canProceed}
      />
    </div>
  );
};

export default CreateTripDestinationPage;
