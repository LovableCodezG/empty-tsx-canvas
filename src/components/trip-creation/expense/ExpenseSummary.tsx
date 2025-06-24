
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ExpenseSummary = () => {
  const { state } = useTripCreation();

  const getTripDays = () => {
    if (state.dateType === 'single' && state.startDate) {
      return 1;
    } else if (state.dateType === 'range' && state.dateRange?.from && state.dateRange?.to) {
      const diffTime = Math.abs(state.dateRange.to.getTime() - state.dateRange.from.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 1;
  };

  const getTripNights = () => {
    const days = getTripDays();
    return Math.max(1, days - 1);
  };

  // Calculate transport costs
  const getTransportCost = () => {
    if (state.transportMode === 'skip') return 0;
    if (state.transportMode === 'rental') {
      return ((state.rentalCostPerDay || 0) * getTripDays()) + (state.fuelCost || 0);
    }
    // Uber costs would be calculated by API
    return state.transportCosts.reduce((sum, leg) => sum + leg.estimatedFare, 0);
  };

  // Calculate food costs
  const getFoodCost = () => {
    return state.foodCosts.reduce((sum, meal) => sum + meal.estimatedCost, 0) * state.groupSize;
  };

  // Calculate hotel costs
  const getHotelCost = () => {
    if (state.hotelTotalCost) return state.hotelTotalCost;
    if (state.hotelPerNight) return state.hotelPerNight * getTripNights();
    if (state.hotelPerHead) return state.hotelPerHead * state.groupSize;
    return 0;
  };

  // Calculate activities and flights
  const getActivitiesCost = () => {
    const activities = state.activitiesCost || 0;
    const misc = state.miscCost || 0;
    return activities + misc;
  };

  const getFlightsCost = () => {
    const flights = (state.flightCost || 0) * state.groupSize;
    const visa = state.visaInsuranceCost || 0;
    return flights + visa;
  };

  const transportCost = getTransportCost();
  const foodCost = getFoodCost();
  const hotelCost = getHotelCost();
  const activitiesCost = getActivitiesCost();
  const flightsCost = getFlightsCost();

  const groupTotalCost = transportCost + foodCost + hotelCost + activitiesCost + flightsCost;
  const perPersonCost = state.groupSize > 0 ? groupTotalCost / state.groupSize : 0;

  // Calculate remaining budget
  const totalBudget = state.tripType === 'personal' ? 
    (state.userBudget || 0) : 
    ((state.groupBudgetPerHead || 0) * state.groupSize);
  
  const remainingBudget = totalBudget - groupTotalCost;
  const remainingPerPerson = state.groupSize > 0 ? remainingBudget / state.groupSize : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card className="border-2 border-spot-primary/20">
        <CardHeader>
          <CardTitle className="text-xl text-spot-primary">Trip Summary</CardTitle>
          <p className="text-sm text-gray-600">
            Here's how your current plan adds up.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Breakdown Table */}
            <div className="space-y-3">
              <div className="flex justify-between items-center summary-transport border-b pb-2">
                <span className="text-gray-700">Transport</span>
                <span className="font-medium">₹{transportCost.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center summary-food border-b pb-2">
                <span className="text-gray-700">Food</span>
                <span className="font-medium">₹{foodCost.toLocaleString()}</span>
              </div>
              
              {state.destinationType === 'international' && (
                <div className="flex justify-between items-center summary-hotel border-b pb-2">
                  <span className="text-gray-700">Hotel</span>
                  <span className="font-medium">₹{hotelCost.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center summary-activities border-b pb-2">
                <span className="text-gray-700">Activities</span>
                <span className="font-medium">₹{activitiesCost.toLocaleString()}</span>
              </div>
              
              {state.destinationType === 'international' && (
                <div className="flex justify-between items-center summary-flights border-b pb-2">
                  <span className="text-gray-700">Flights/Visa</span>
                  <span className="font-medium">₹{flightsCost.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Total Costs */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center per-person-cost">
                <span className="text-lg font-medium">Per Person:</span>
                <span className="text-xl font-bold text-spot-primary">₹{perPersonCost.toLocaleString()}</span>
              </div>
              
              {state.groupSize > 1 && (
                <div className="flex justify-between items-center group-total-cost">
                  <span className="text-lg font-medium">Group Total:</span>
                  <span className="text-xl font-bold text-spot-primary">₹{groupTotalCost.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Remaining Budget */}
            {(state.userBudget || state.groupBudgetPerHead) && (
              <div id="remaining-budget-summary" className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Remaining Budget</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center remaining-per-person">
                    <span className="text-green-700">Per person remaining:</span>
                    <span className={`font-bold ${remainingPerPerson >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{remainingPerPerson.toLocaleString()}
                    </span>
                  </div>
                  
                  {state.groupSize > 1 && (
                    <div className="flex justify-between items-center remaining-group-total">
                      <span className="text-green-700">Group total remaining:</span>
                      <span className={`font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{remainingBudget.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                
                {remainingBudget < 0 && (
                  <p className="text-sm text-red-600 mt-2">
                    ⚠️ Your current plan exceeds the budget by ₹{Math.abs(remainingBudget).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExpenseSummary;
