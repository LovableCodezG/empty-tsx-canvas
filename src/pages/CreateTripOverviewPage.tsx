
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripCreation } from '@/contexts/TripCreationContext';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import OverviewHeader from '@/components/trip-creation/overview/OverviewHeader';
import TripItinerarySection from '@/components/trip-creation/overview/TripItinerarySection';
import CostSummarySection from '@/components/trip-creation/overview/CostSummarySection';
import TripChecklistSection from '@/components/trip-creation/overview/TripChecklistSection';
import GroupMembersSection from '@/components/trip-creation/overview/GroupMembersSection';
import ShareTripSection from '@/components/trip-creation/overview/ShareTripSection';

const CreateTripOverviewPage = () => {
  const { state } = useTripCreation();
  const navigate = useNavigate();
  const shareRef = useRef<HTMLDivElement>(null);

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
      (state.tripType === 'group' && state.groupSize >= 2)
    );

    const hasValidTransport = state.transportMode !== null && (
      state.transportMode !== 'rental' || 
      (state.transportMode === 'rental' && state.rentalCostPerDay && state.rentalCostPerDay > 0)
    );

    if (!hasValidDestination || !hasValidTransport) {
      console.log('Invalid previous steps data, redirecting to destination page');
      navigate('/create-trip/destination');
    }
  }, [state, navigate]);

  const handleShareClick = () => {
    shareRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEditClick = () => {
    navigate('/create-trip/destination');
  };

  const handleFinishClick = () => {
    console.log('Trip creation completed, navigating to dashboard');
    navigate('/dashboard');
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
    (state.tripType === 'group' && state.groupSize >= 2)
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
      
      <div className="container mx-auto px-6 py-8">
        <OverviewHeader
          onShareClick={handleShareClick}
          onEditClick={handleEditClick}
          onFinishClick={handleFinishClick}
        />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <TripItinerarySection />
          <CostSummarySection />
          <TripChecklistSection />
          <GroupMembersSection />
          <div ref={shareRef}>
            <ShareTripSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTripOverviewPage;
