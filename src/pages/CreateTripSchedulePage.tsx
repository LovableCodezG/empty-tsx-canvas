
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripCreation } from '@/contexts/TripCreationContext';
import ScheduleBuilderContent from '@/components/schedule-builder/ScheduleBuilderContent';

const CreateTripSchedulePage = () => {
  const { state } = useTripCreation();
  const navigate = useNavigate();

  // Check if prerequisites are met, but allow search flow users to proceed
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
      (state.tripType === 'group' && state.groupSize >= 2)
    );

    // Only redirect if validation fails AND user didn't come from search flow
    if (!hasValidDestination && !state.fromSearchFlow) {
      console.log('Invalid previous steps data and not from search flow, redirecting to destination page');
      navigate('/create-trip/destination');
    }
  }, [state, navigate]);

  return <ScheduleBuilderContent />;
};

export default CreateTripSchedulePage;
