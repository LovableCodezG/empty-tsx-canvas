
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const TransportCostSection = () => {
  const { state, dispatch } = useTripCreation();

  const handleFuelCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : parseFloat(value);
    dispatch({ type: 'SET_FUEL_COST', payload: numericValue });
  };

  const getTripDays = () => {
    if (state.dateType === 'single' && state.startDate) {
      return 1;
    } else if (state.dateType === 'range' && state.dateRange?.from && state.dateRange?.to) {
      const diffTime = Math.abs(state.dateRange.to.getTime() - state.dateRange.from.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 1;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Transportation Costs</CardTitle>
          <p className="text-sm text-gray-600">
            This estimate is based on your previous transport choice.
          </p>
        </CardHeader>
        <CardContent id="transport-costs">
          {state.transportMode === 'skip' && (
            <div className="text-center py-8 text-gray-500">
              Transport estimation skipped by user preference.
            </div>
          )}

          {state.transportMode === 'uber' && (
            <div className="space-y-4">
              <div className="text-sm text-blue-600 mb-4">
                Route estimates will be calculated using Uber API based on your itinerary.
              </div>
              {/* Placeholder for Uber route legs */}
              <div className="space-y-3">
                <div className="transport-leg-item border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sample Route Leg</p>
                      <p className="text-sm text-gray-500">Distance will be calculated</p>
                    </div>
                    <div className="text-right">
                      <div className="animate-pulse bg-gray-300 h-4 w-16 rounded"></div>
                      <p className="text-xs text-gray-400 mt-1">Loading...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {state.transportMode === 'rental' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Number of days</Label>
                  <div className="text-lg font-medium">{getTripDays()}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Cost per day</Label>
                  <div className="text-lg font-medium">₹{state.rentalCostPerDay || 0}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fuel-cost">Fuel estimate (optional) (₹)</Label>
                <Input
                  id="fuel-cost"
                  type="number"
                  placeholder="Enter estimated fuel cost"
                  value={state.fuelCost || ''}
                  onChange={handleFuelCostChange}
                  min="0"
                  step="100"
                />
                <p className="text-xs text-gray-500">
                  Bolt will calculate fuel costs automatically based on your itinerary if not provided.
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium">Estimated Total Rental Cost:</p>
                <p className="text-lg font-bold text-spot-primary">
                  ₹{((state.rentalCostPerDay || 0) * getTripDays()) + (state.fuelCost || 0)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransportCostSection;
