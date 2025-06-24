
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripCreation } from '@/contexts/TripCreationContext';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import TripNavigationButtons from '@/components/trip-creation/TripNavigationButtons';
import ExpenseHeader from '@/components/trip-creation/expense/ExpenseHeader';
import BudgetInputSection from '@/components/trip-creation/expense/BudgetInputSection';
import TransportCostSection from '@/components/trip-creation/expense/TransportCostSection';
import FoodCostSection from '@/components/trip-creation/expense/FoodCostSection';
import HotelCostSection from '@/components/trip-creation/expense/HotelCostSection';
import ActivitiesCostSection from '@/components/trip-creation/expense/ActivitiesCostSection';
import ExpenseSummary from '@/components/trip-creation/expense/ExpenseSummary';

const CreateTripExpensePage = () => {
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

    const hasValidTransport = state.transportMode !== null && (
      state.transportMode !== 'rental' || 
      (state.transportMode === 'rental' && state.rentalCostPerDay && state.rentalCostPerDay > 0)
    );

    if (!hasValidDestination || !hasValidTransport) {
      console.log('Invalid destination, schedule, or transport data, redirecting to destination page');
      navigate('/create-trip/destination');
    }
  }, [state, navigate]);

  // Check if at least one cost section has input
  const hasExpenseInput = 
    state.transportMode === 'skip' || 
    state.rentalCostPerDay !== null ||
    state.transportCosts.length > 0 ||
    state.foodCosts.length > 0 ||
    state.hotelTotalCost !== null ||
    state.hotelPerNight !== null ||
    state.hotelPerHead !== null ||
    state.flightCost !== null ||
    state.visaInsuranceCost !== null ||
    state.activitiesCost !== null ||
    state.miscCost !== null;

  const handleBack = () => {
    console.log('Navigating back to transport page');
    navigate('/create-trip/transport');
  };

  const handleNext = () => {
    if (hasExpenseInput) {
      console.log('Proceeding to final trip overview with expenses:', state);
      // TODO: Navigate to final overview page when implemented
      // navigate('/create-trip/overview');
      console.log('Final overview page not yet implemented');
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

  const hasValidTransport = state.transportMode !== null && (
    state.transportMode !== 'rental' || 
    (state.transportMode === 'rental' && state.rentalCostPerDay && state.rentalCostPerDay > 0)
  );

  if (!hasValidDestination || !hasValidTransport) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TripCreationCloseButton />
      
      <div className="container mx-auto px-6 py-8 pb-24">
        <ExpenseHeader />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <BudgetInputSection />
          <TransportCostSection />
          <FoodCostSection />
          {state.destinationType === 'international' && <HotelCostSection />}
          <ActivitiesCostSection />
          <ExpenseSummary />
        </div>
      </div>

      <TripNavigationButtons
        showBack={true}
        onBack={handleBack}
        backText="← Transport"
        nextText="Next → Final Trip Overview"
        onNext={handleNext}
        canProceed={hasExpenseInput}
      />
    </div>
  );
};

export default CreateTripExpensePage;
