
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface TripNameSectionProps {
  viewMode?: boolean;
}

const TripNameSection = ({ viewMode = false }: TripNameSectionProps) => {
  const { state, dispatch } = useTripCreation();

  const handleTripNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!viewMode) {
      dispatch({ type: 'SET_TRIP_NAME', payload: e.target.value });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="h-5 w-5 text-spot-primary" />
        <h2 className="text-xl font-semibold text-gray-900">Trip Details</h2>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="trip-name" className="text-sm font-medium text-gray-700">
          Trip Name
        </Label>
        <Input
          id="trip-name"
          type="text"
          placeholder="Enter your trip name..."
          value={state.tripName}
          onChange={handleTripNameChange}
          disabled={viewMode}
          className={`w-full ${viewMode ? 'bg-gray-50' : ''}`}
        />
        {!viewMode && !state.tripName.trim() && (
          <p className="text-sm text-red-600">Trip name is required</p>
        )}
      </div>
    </motion.div>
  );
};

export default TripNameSection;
