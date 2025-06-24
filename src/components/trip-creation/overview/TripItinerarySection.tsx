
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Calendar } from 'lucide-react';

const TripItinerarySection = () => {
  const { state } = useTripCreation();
  const [selectedDay, setSelectedDay] = useState(0);

  const getTripDays = () => {
    if (state.dateType === 'single' && state.startDate) {
      return 1;
    } else if (state.dateType === 'range' && state.dateRange?.from && state.dateRange?.to) {
      const diffTime = Math.abs(state.dateRange.to.getTime() - state.dateRange.from.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 1;
  };

  const tripDays = getTripDays();

  // Get actual activities from context
  const currentDayActivities = state.scheduleActivities[selectedDay] || [];

  // Helper function to get activity emoji based on category
  const getActivityIcon = (category: string, name: string) => {
    switch (category) {
      case 'meal':
        if (name.toLowerCase().includes('breakfast')) return '🥐';
        if (name.toLowerCase().includes('lunch')) return '🍕';
        if (name.toLowerCase().includes('dinner')) return '🍽️';
        return '🍽️';
      case 'sightseeing':
        return '🏛️';
      case 'transportation':
        return '🚗';
      case 'accommodation':
        return '🏨';
      case 'other':
        return '📍';
      default:
        return '📍';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Itinerary Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Day Selector Tabs */}
          <div className="day-tab-selector mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Array.from({ length: tripDays }, (_, index) => (
                <Button
                  key={index}
                  variant={selectedDay === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDay(index)}
                  className="flex-shrink-0"
                >
                  Day {index + 1}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Panel - Itinerary Details */}
            <div id="itinerary-day-details" className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4">Day {selectedDay + 1} Schedule</h3>
              {currentDayActivities.length > 0 ? (
                <div className="space-y-3">
                  {currentDayActivities
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((activity, index) => (
                    <div key={activity.id} className="itinerary-item-row border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-600">{activity.startTime}</span>
                          <span className="text-xl">{getActivityIcon(activity.category, activity.name)}</span>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900">{activity.name}</p>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{activity.category}</span>
                              {activity.duration && (
                                <span className="text-xs text-gray-400">• {activity.duration}h</span>
                              )}
                            </div>
                            {activity.notes && (
                              <p className="text-xs text-gray-500 mt-1">{activity.notes}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>No activities planned for this day yet.</p>
                  <p className="text-sm">Activities from Schedule Builder will appear here.</p>
                </div>
              )}
            </div>

            {/* Right Panel - Map */}
            <div id="itinerary-map-container" className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
              <div className="text-center text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="font-medium">Interactive Map</p>
                <p className="text-sm">Google Maps will show activity locations here</p>
                <p className="text-xs mt-2">Bolt fetches coordinates and updates pin highlights in sync</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TripItinerarySection;
