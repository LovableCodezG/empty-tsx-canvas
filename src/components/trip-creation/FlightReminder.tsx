
import React from 'react';
import { Plane } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';

const FlightReminder = () => {
  const { state } = useTripCreation();

  if (state.destinationType !== 'international') {
    return null;
  }

  return (
    <div className="bg-spot-sky/10 border border-spot-sky/20 rounded-lg p-4 mt-4">
      <div className="flex items-center gap-2 text-spot-sky">
        <Plane className="h-5 w-5" />
        <span className="font-medium text-sm">
          ✈️ Flights integration coming soon!
        </span>
      </div>
    </div>
  );
};

export default FlightReminder;
