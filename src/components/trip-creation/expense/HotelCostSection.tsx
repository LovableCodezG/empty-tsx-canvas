
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const HotelCostSection = () => {
  const { state, dispatch } = useTripCreation();
  const [costType, setCostType] = useState<'total' | 'per-night' | 'per-head'>('total');

  const getTripNights = () => {
    if (state.dateType === 'range' && state.dateRange?.from && state.dateRange?.to) {
      const diffTime = Math.abs(state.dateRange.to.getTime() - state.dateRange.from.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : parseFloat(value);
    
    // Reset other cost types
    dispatch({ type: 'SET_HOTEL_TOTAL_COST', payload: null });
    dispatch({ type: 'SET_HOTEL_PER_NIGHT', payload: null });
    dispatch({ type: 'SET_HOTEL_PER_HEAD', payload: null });
    
    // Set the selected cost type
    if (costType === 'total') {
      dispatch({ type: 'SET_HOTEL_TOTAL_COST', payload: numericValue });
    } else if (costType === 'per-night') {
      dispatch({ type: 'SET_HOTEL_PER_NIGHT', payload: numericValue });
    } else {
      dispatch({ type: 'SET_HOTEL_PER_HEAD', payload: numericValue });
    }
  };

  const getCurrentValue = () => {
    if (costType === 'total') return state.hotelTotalCost || '';
    if (costType === 'per-night') return state.hotelPerNight || '';
    return state.hotelPerHead || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Hotel Costs</CardTitle>
          <p className="text-sm text-gray-600">
            Input hotel cost based on your plans. Duration: {getTripNights()} nights
          </p>
        </CardHeader>
        <CardContent id="hotel-costs">
          <div className="hotel-estimate-card space-y-6">
            <RadioGroup value={costType} onValueChange={(value: 'total' | 'per-night' | 'per-head') => setCostType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="total" id="total-cost" />
                <Label htmlFor="total-cost">Total hotel cost for entire stay</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="per-night" id="per-night-cost" />
                <Label htmlFor="per-night-cost">Cost per night</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="per-head" id="per-head-cost" />
                <Label htmlFor="per-head-cost">Cost per person (entire stay)</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor={`hotel-${costType.replace('-', '-')}`}>
                {costType === 'total' && 'Total hotel cost (₹)'}
                {costType === 'per-night' && 'Cost per night (₹)'}
                {costType === 'per-head' && 'Cost per person for entire stay (₹)'}
              </Label>
              <Input
                id={costType === 'total' ? 'hotel-total-cost' : costType === 'per-night' ? 'hotel-per-night' : 'hotel-per-head'}
                type="number"
                placeholder={`Enter ${costType.replace('-', ' ')} cost`}
                value={getCurrentValue()}
                onChange={handleCostChange}
                min="0"
                step="500"
              />
            </div>

            {(state.hotelTotalCost || state.hotelPerNight || state.hotelPerHead) && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium">Estimated Total Hotel Cost:</p>
                <p className="text-lg font-bold text-spot-primary">
                  ₹{
                    state.hotelTotalCost || 
                    (state.hotelPerNight && state.hotelPerNight * getTripNights()) ||
                    (state.hotelPerHead && state.hotelPerHead * state.groupSize) ||
                    0
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HotelCostSection;
