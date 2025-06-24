
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripCreation } from '@/contexts/TripCreationContext';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import TripNavigationButtons from '@/components/trip-creation/TripNavigationButtons';
import TransportHeader from '@/components/trip-creation/TransportHeader';
import TransportOptionsPanel from '@/components/trip-creation/TransportOptionsPanel';

const CreateTripTransportPage = () => {
  const { state } = useTripCreation();
  const navigate = useNavigate();

  // Check if prerequisites are met, redirect to destination page if not
  useEffect(() => {
    const hasValidDates = state.dateType && (
      (state.dateType === 'single' && state.startDate) ||
      (state.dateType === 'range' && state.dateRange?.from)
    );

    const hasValidDestination = state.tripType && 
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

    if (!hasValidDestination) {
      console.log('Invalid destination or schedule data, redirecting to destination page');
      navigate('/create-trip/destination');
    }
  }, [state, navigate]);

  const canProceed = state.transportMode !== null && (
    state.transportMode !== 'rental' || 
    (state.transportMode === 'rental' && state.rentalCostPerDay && state.rentalCostPerDay > 0)
  );

  const handleBack = () => {
    console.log('Navigating back to schedule page');
    navigate('/create-trip/schedule');
  };

  const handleNext = () => {
    if (canProceed) {
      console.log('Proceeding to expense estimation with transport:', state.transportMode);
      navigate('/create-trip/expenses');
    }
  };

  // Early return if validation is failing (while redirect is happening)
  const hasValidDates = state.dateType && (
    (state.dateType === 'single' && state.startDate) ||
    (state.dateType === 'range' && state.dateRange?.from)
  );

  const hasValidDestination = state.tripType && 
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

  if (!hasValidDestination) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TripCreationCloseButton />
      
      <div className="container mx-auto px-6 py-8 pb-24">
        <TransportHeader />
        
        <div className="max-w-2xl mx-auto">
          <TransportOptionsPanel />
        </div>
      </div>

      <TripNavigationButtons
        showBack={true}
        onBack={handleBack}
        backText="← Schedule"
        nextText="Next → Estimate Expenses"
        onNext={handleNext}
        canProceed={canProceed}
      />
    </div>
  );
};

export default CreateTripTransportPage;
