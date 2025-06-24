
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, Car, Utensils, Plane, Hotel, Activity } from 'lucide-react';

const CostSummarySection = () => {
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

  // Calculate costs from state
  const getTransportCost = () => {
    if (state.transportMode === 'skip') return 0;
    if (state.transportMode === 'rental') {
      return ((state.rentalCostPerDay || 0) * getTripDays()) + (state.fuelCost || 0);
    }
    return state.transportCosts.reduce((sum, leg) => sum + leg.estimatedFare, 0);
  };

  const getFoodCost = () => {
    return state.foodCosts.reduce((sum, meal) => sum + meal.estimatedCost, 0) * state.groupSize;
  };

  const getHotelCost = () => {
    if (state.hotelTotalCost) return state.hotelTotalCost;
    if (state.hotelPerNight) return state.hotelPerNight * (getTripDays() - 1);
    if (state.hotelPerHead) return state.hotelPerHead * state.groupSize;
    return 0;
  };

  const getFlightsCost = () => {
    const flights = (state.flightCost || 0) * state.groupSize;
    const visa = state.visaInsuranceCost || 0;
    return flights + visa;
  };

  const getActivitiesCost = () => {
    return (state.activitiesCost || 0) + (state.miscCost || 0);
  };

  const transportCost = getTransportCost();
  const foodCost = getFoodCost();
  const hotelCost = getHotelCost();
  const flightsCost = getFlightsCost();
  const activitiesCost = getActivitiesCost();

  const groupTotalCost = transportCost + foodCost + hotelCost + flightsCost + activitiesCost;
  const perPersonCost = state.groupSize > 0 ? groupTotalCost / state.groupSize : 0;

  const costCategories = [
    { 
      icon: Car, 
      label: 'Transport', 
      amount: transportCost, 
      className: 'cost-transport',
      show: transportCost > 0 
    },
    { 
      icon: Utensils, 
      label: 'Meals', 
      amount: foodCost, 
      className: 'cost-meals',
      show: foodCost > 0 
    },
    { 
      icon: Hotel, 
      label: 'Hotel', 
      amount: hotelCost, 
      className: 'cost-hotel',
      show: state.destinationType === 'international' && hotelCost > 0 
    },
    { 
      icon: Plane, 
      label: 'Flights/Visa', 
      amount: flightsCost, 
      className: 'cost-flights',
      show: state.destinationType === 'international' && flightsCost > 0 
    },
    { 
      icon: Activity, 
      label: 'Activities', 
      amount: activitiesCost, 
      className: 'cost-activities',
      show: activitiesCost > 0 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card id="cost-summary">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Estimated Trip Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Cost Breakdown */}
            <div className="space-y-3">
              {costCategories.filter(category => category.show).map((category) => (
                <div key={category.label} className={`${category.className} cost-summary-row flex justify-between items-center border-b pb-2`}>
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{category.label}</span>
                  </div>
                  <span className="font-medium">₹{category.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Total Costs */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 mt-6">
              <div className="per-person-cost flex justify-between items-center">
                <span className="text-lg font-medium">Per Person:</span>
                <span className="text-xl font-bold text-spot-primary">₹{perPersonCost.toLocaleString()}</span>
              </div>
              
              {state.groupSize > 1 && (
                <div className="group-total-cost flex justify-between items-center">
                  <span className="text-lg font-medium">Group Total:</span>
                  <span className="text-xl font-bold text-spot-primary">₹{groupTotalCost.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="text-sm text-blue-600 mt-4">
              Values come from Expense Estimator (Page 4)
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CostSummarySection;
