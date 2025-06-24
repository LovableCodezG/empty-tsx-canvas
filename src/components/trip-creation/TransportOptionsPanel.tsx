
import React from 'react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TransportOptionCard from './TransportOptionCard';

const TransportOptionsPanel = () => {
  const { state, dispatch } = useTripCreation();

  const handleTransportModeChange = (mode: 'skip' | 'uber' | 'rental') => {
    console.log('Setting transport mode:', mode);
    dispatch({ type: 'SET_TRANSPORT_MODE', payload: mode });
  };

  const handleRentalCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : parseFloat(value);
    console.log('Setting rental cost per day:', numericValue);
    dispatch({ type: 'SET_RENTAL_COST_PER_DAY', payload: numericValue });
  };

  return (
    <div className="space-y-6">
      {/* Skip Transport Option */}
      <TransportOptionCard
        id="transport-option-skip"
        icon="🚫"
        title="Skip Transport"
        subtext="I'll handle transportation myself – no need to estimate costs."
        isSelected={state.transportMode === 'skip'}
        onClick={() => handleTransportModeChange('skip')}
      />

      {/* Uber/Taxi Option */}
      <TransportOptionCard
        id="transport-option-uber"
        icon="🚕"
        title="Uber or Local Taxi"
        subtext="Estimate costs using Uber fares between locations."
        isSelected={state.transportMode === 'uber'}
        onClick={() => handleTransportModeChange('uber')}
      />

      {/* Rental Car Option */}
      <TransportOptionCard
        id="transport-option-rental"
        icon="🚗"
        title="Rental Car"
        subtext="Estimate and optionally book rentals for your trip."
        isSelected={state.transportMode === 'rental'}
        onClick={() => handleTransportModeChange('rental')}
      >
        <div className="space-y-2">
          <Label htmlFor="rental-cost-per-day" className="text-sm font-medium text-gray-700">
            Rental cost per day (₹)
          </Label>
          <Input
            id="rental-cost-per-day"
            type="number"
            placeholder="Enter daily rental cost"
            value={state.rentalCostPerDay || ''}
            onChange={handleRentalCostChange}
            className="w-full"
            min="0"
            step="100"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="text-xs text-gray-500 mt-1">
            Fuel costs will be calculated automatically based on your itinerary.
          </p>
        </div>
      </TransportOptionCard>
    </div>
  );
};

export default TransportOptionsPanel;
