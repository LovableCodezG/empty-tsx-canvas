
import React from 'react';
import { Home, Globe } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { cn } from '@/lib/utils';

const DestinationTypeToggle = () => {
  const { state, dispatch } = useTripCreation();

  const handleDestinationTypeChange = (type: 'domestic' | 'international') => {
    dispatch({ type: 'SET_DESTINATION_TYPE', payload: type });
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Destination Type
      </label>
      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={() => handleDestinationTypeChange('domestic')}
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 text-left",
            state.destinationType === 'domestic'
              ? "border-spot-primary bg-spot-primary/10 text-spot-primary"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          )}
        >
          <Home className="h-6 w-6 flex-shrink-0" />
          <div>
            <div className="font-medium">Domestic</div>
            <div className="text-sm opacity-75">Explore your home country</div>
          </div>
        </button>
        <button
          onClick={() => handleDestinationTypeChange('international')}
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 text-left",
            state.destinationType === 'international'
              ? "border-spot-primary bg-spot-primary/10 text-spot-primary"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          )}
        >
          <Globe className="h-6 w-6 flex-shrink-0" />
          <div>
            <div className="font-medium">International</div>
            <div className="text-sm opacity-75">Discover new countries</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DestinationTypeToggle;
