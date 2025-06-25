
import React from 'react';
import { motion } from 'framer-motion';
import { Edit3 } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Input } from '@/components/ui/input';

const TripNameSection = () => {
  const { state, dispatch } = useTripCreation();

  const handleTripNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_TRIP_NAME', payload: e.target.value });
  };

  // Generate placeholder based on destination
  const destination = state.destinationType === 'domestic' 
    ? 'Domestic Trip' 
    : state.selectedCountry || 'Trip';
  const placeholder = `My Trip to ${destination}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-spot-primary/10 rounded-lg">
          <Edit3 className="h-5 w-5 text-spot-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Name Your Trip</h3>
          <p className="text-sm text-gray-600">Give your trip a memorable name</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={state.tripName}
          onChange={handleTripNameChange}
          className="text-lg font-medium"
          maxLength={50}
        />
        <p className="text-xs text-gray-500">
          {state.tripName.length}/50 characters
        </p>
      </div>
    </motion.div>
  );
};

export default TripNameSection;
