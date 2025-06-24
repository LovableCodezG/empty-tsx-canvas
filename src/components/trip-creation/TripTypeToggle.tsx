
import React from 'react';
import { Users, User } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { cn } from '@/lib/utils';

const TripTypeToggle = () => {
  const { state, dispatch } = useTripCreation();

  const handleTripTypeChange = (type: 'group' | 'personal') => {
    dispatch({ type: 'SET_TRIP_TYPE', payload: type });
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Trip Type
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleTripTypeChange('personal')}
          className={cn(
            "flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105",
            state.tripType === 'personal'
              ? "border-spot-primary bg-spot-primary/10 text-spot-primary"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          )}
        >
          <User className="h-5 w-5" />
          <span className="font-medium">Personal</span>
        </button>
        <button
          onClick={() => handleTripTypeChange('group')}
          className={cn(
            "flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105",
            state.tripType === 'group'
              ? "border-spot-primary bg-spot-primary/10 text-spot-primary"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          )}
        >
          <Users className="h-5 w-5" />
          <span className="font-medium">Group</span>
        </button>
      </div>
    </div>
  );
};

export default TripTypeToggle;
