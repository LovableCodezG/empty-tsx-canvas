
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ActivitiesCostSection = () => {
  const { state, dispatch } = useTripCreation();

  const handleFlightCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : parseFloat(value);
    dispatch({ type: 'SET_FLIGHT_COST', payload: numericValue });
  };

  const handleVisaInsuranceCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : parseFloat(value);
    dispatch({ type: 'SET_VISA_INSURANCE_COST', payload: numericValue });
  };

  const handleActivitiesCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : parseFloat(value);
    dispatch({ type: 'SET_ACTIVITIES_COST', payload: numericValue });
  };

  const handleMiscCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : parseFloat(value);
    dispatch({ type: 'SET_MISC_COST', payload: numericValue });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Activities, Flights & Extras</CardTitle>
          <p className="text-sm text-gray-600">
            Add costs for flights, activities, and other miscellaneous expenses.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* International Trip Only Fields */}
          {state.destinationType === 'international' && (
            <div className="space-y-4 border-b pb-6">
              <h4 className="font-medium text-gray-900">International Trip Expenses</h4>
              
              <div className="space-y-2">
                <Label htmlFor="flight-cost">✈️ Flight Cost per person (round trip) (₹)</Label>
                <Input
                  id="flight-cost"
                  type="number"
                  placeholder="Enter flight cost per person"
                  value={state.flightCost || ''}
                  onChange={handleFlightCostChange}
                  min="0"
                  step="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visa-insurance-cost">🛡️ Visa & Insurance Fees (₹)</Label>
                <Input
                  id="visa-insurance-cost"
                  type="number"
                  placeholder="Enter visa and insurance costs"
                  value={state.visaInsuranceCost || ''}
                  onChange={handleVisaInsuranceCostChange}
                  min="0"
                  step="500"
                />
              </div>
            </div>
          )}

          {/* General Trip Fields */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">General Expenses</h4>
            
            <div className="space-y-2">
              <Label htmlFor="activities-cost">🎡 Activities & Excursions (₹)</Label>
              <Input
                id="activities-cost"
                type="number"
                placeholder="Enter activities and excursion costs"
                value={state.activitiesCost || ''}
                onChange={handleActivitiesCostChange}
                min="0"
                step="500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="misc-cost">🎒 Miscellaneous Expenses (₹)</Label>
              <Input
                id="misc-cost"
                type="number"
                placeholder="Enter other miscellaneous costs"
                value={state.miscCost || ''}
                onChange={handleMiscCostChange}
                min="0"
                step="200"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActivitiesCostSection;
