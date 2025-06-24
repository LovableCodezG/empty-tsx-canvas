
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const FoodCostSection = () => {
  const { state } = useTripCreation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Restaurant / Food Costs</CardTitle>
          <p className="text-sm text-gray-600">
            Estimates based on restaurants from your itinerary and group size.
          </p>
        </CardHeader>
        <CardContent id="food-costs">
          {state.foodCosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No meals added to itinerary – food cost not estimated.
            </div>
          ) : (
            <div className="space-y-3">
              {state.foodCosts.map((meal, index) => (
                <div key={index} className="meal-cost-row border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{meal.restaurantName}</p>
                      <p className="text-sm text-gray-500">
                        Price level: {meal.priceLevel} • Group size: {state.groupSize}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-spot-primary">₹{meal.estimatedCost}</p>
                      <p className="text-xs text-gray-400">Per person</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 text-sm text-blue-600">
            Google Places API will populate restaurant details and price levels automatically.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FoodCostSection;
