
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripCreation } from '@/contexts/TripCreationContext';
import ScheduleBuilderContent from '@/components/schedule-builder/ScheduleBuilderContent';

const CreateTripSchedulePage = () => {
  const navigate = useNavigate();
  const { state } = useTripCreation();

  // Check if user has valid trip data, redirect appropriately
  useEffect(() => {
    console.log('Schedule page loaded with state:', {
      hasDestination: !!state.selectedCountry || !!state.destinationType,
      hasValidDates: state.dateType && (
        (state.dateType === 'single' && state.startDate) ||
        (state.dateType === 'range' && state.dateRange?.from)
      ),
      fromSearchFlow: state.fromSearchFlow,
      tripType: state.tripType,
      destinationType: state.destinationType,
      selectedCountry: state.selectedCountry
    });

    const hasValidDates = state.dateType && (
      (state.dateType === 'single' && state.startDate) ||
      (state.dateType === 'range' && state.dateRange?.from)
    );

    const hasDestinationData = state.destinationType && (
      state.destinationType === 'domestic' ||
      (state.destinationType === 'international' && state.selectedCountry)
    );

    // For users coming from search flow: Only require dates and destination type
    if (state.fromSearchFlow) {
      if (!hasValidDates || !hasDestinationData) {
        console.log('Search flow user missing essential data, redirecting to destination page');
        navigate('/create-trip/destination');
        return;
      }
      console.log('Search flow user has valid data, allowing schedule page access');
      return;
    }

    // For users manually navigating: Require more complete data
    if (!hasValidDates || !hasDestinationData || !state.tripType) {
      console.log('Manual navigation without complete data, redirecting to destination page');
      navigate('/create-trip/destination');
      return;
    }

    console.log('Manual navigation with complete data, allowing schedule page access');
  }, [state, navigate]);

  return <ScheduleBuilderContent />;
};

export default CreateTripSchedulePage;
