
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripCreation } from '@/contexts/TripCreationContext';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import TripNavigationButtons from '@/components/trip-creation/TripNavigationButtons';
import TransportHeader from '@/components/trip-creation/TransportHeader';
import TransportOptionsPanel from '@/components/trip-creation/TransportOptionsPanel';

const CreateTripTransportPage = () => {
  const { state } = useTripCreation();
  const navigate = useNavigate();

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
      // TODO: Navigate to expense estimation page when implemented
      // navigate('/create-trip/expenses');
      console.log('Expense estimation page not yet implemented');
    }
  };

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
