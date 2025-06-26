
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TripCreationProvider } from '@/contexts/TripCreationContext';
import { getUserTrips } from '@/utils/tripStorage';
import { convertSavedTripToCreationState } from '@/utils/savedTripConverter';
import CreateTripOverviewPage from './CreateTripOverviewPage';

const TripOverviewViewPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [tripState, setTripState] = useState(null);

  useEffect(() => {
    if (!tripId) {
      navigate('/dashboard');
      return;
    }

    const userTrips = getUserTrips();
    const trip = userTrips.find(t => t.id === tripId);

    if (!trip) {
      navigate('/dashboard');
      return;
    }

    const creationState = convertSavedTripToCreationState(trip);
    setTripState(creationState);
  }, [tripId, navigate]);

  if (!tripState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spot-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trip overview...</p>
        </div>
      </div>
    );
  }

  return (
    <TripCreationProvider>
      <TripOverviewViewWrapper initialState={tripState} />
    </TripCreationProvider>
  );
};

const TripOverviewViewWrapper = ({ initialState }) => {
  const navigate = useNavigate();

  // Set up the context with the initial state
  useEffect(() => {
    // This is a view-only mode, so we'll pass the state differently
    // The overview page will need to be modified to accept view mode
  }, []);

  return <CreateTripOverviewPage viewMode={true} />;
};

export default TripOverviewViewPage;
