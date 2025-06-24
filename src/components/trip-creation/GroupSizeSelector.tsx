
import React from 'react';
import { Users } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';

const GroupSizeSelector = () => {
  const { state, dispatch } = useTripCreation();

  const handleGroupSizeChange = (size: number) => {
    dispatch({ type: 'SET_GROUP_SIZE', payload: size });
  };

  if (state.tripType !== 'group') {
    return null;
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        How many people?
      </label>
      <div className="relative">
        <select
          value={state.groupSize}
          onChange={(e) => handleGroupSizeChange(Number(e.target.value))}
          className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-spot-primary focus:border-transparent transition-all duration-200"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'person' : 'people'}
            </option>
          ))}
        </select>
        <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default GroupSizeSelector;
