
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripCreation } from '@/contexts/TripCreationContext';
import ScheduleBuilderContent from '@/components/schedule-builder/ScheduleBuilderContent';

const CreateTripSchedulePage = () => {
  const navigate = useNavigate();
  const { state } = useTripCreation();

  // Check if user has valid trip data, redirect appropriately
  useEffect(() => {
    const hasValidDates = state.dateType && (
      (state.dateType === 'single' && state.startDate) ||
      (state.dateType === 'range' && state.dateRange?.from)
    );

    // If no valid dates and NOT from search flow, redirect to destination page
    if (!hasValidDates && !state.fromSearchFlow) {
      console.log('No valid dates and not from search flow, redirecting to destination page');
      navigate('/create-trip/destination');
      return;
    }

    // If from search flow but missing essential data, redirect to destination page
    if (state.fromSearchFlow && (!state.tripType || !state.destinationType)) {
      console.log('From search flow but missing essential data, redirecting to destination page');
      navigate('/create-trip/destination');
      return;
    }

    console.log('Schedule page loaded with state:', {
      hasValidDates,
      fromSearchFlow: state.fromSearchFlow,
      tripType: state.tripType,
      destinationType: state.destinationType
    });
  }, [state, navigate]);

  return <ScheduleBuilderContent />;
};

export default CreateTripSchedulePage;
