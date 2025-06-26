
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { useTripCreation } from '@/contexts/TripCreationContext';

// Backend TODO: Track premade trip selections and user preferences
// Analytics.track('premade_trip_selected', { tripId, tripSlug });

interface PremadeTrip {
  id: string;
  slug: string;
  title: string;
  country: string;
  isInternational: boolean;
  category: string;
  duration: string;
  price: number;
  image: string;
  itinerary?: Array<{
    day: number;
    title: string;
    activities: string[];
  }>;
}

interface QuickTripSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: PremadeTrip;
}

const QuickTripSetupModal = ({ isOpen, onClose, trip }: QuickTripSetupModalProps) => {
  const navigate = useNavigate();
  const { dispatch } = useTripCreation();
  
  const [tripType, setTripType] = useState<'group' | 'personal'>('personal');
  const [groupSize, setGroupSize] = useState(2);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartPlanning = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      return;
    }

    setIsLoading(true);

    try {
      // Reset the context first
      dispatch({ type: 'RESET' });

      // Set trip type and group size
      dispatch({ type: 'SET_TRIP_TYPE', payload: tripType });
      dispatch({ type: 'SET_GROUP_SIZE', payload: tripType === 'group' ? groupSize : 1 });

      // Set destination information
      dispatch({ type: 'SET_DESTINATION_TYPE', payload: trip.isInternational ? 'international' : 'domestic' });
      dispatch({ type: 'SET_SELECTED_COUNTRY', payload: trip.country });
      dispatch({ type: 'SET_TRIP_NAME', payload: trip.title });

      // Set dates
      dispatch({
        type: 'SET_TRIP_DATES',
        payload: {
          dateType: 'range',
          startDate: dateRange.from,
          endDate: dateRange.to,
          dateRange: dateRange
        }
      });

      // Convert itinerary to schedule activities
      if (trip.itinerary) {
        const scheduleActivities: Record<number, any[]> = {};
        
        trip.itinerary.forEach((day) => {
          const dayIndex = day.day - 1;
          scheduleActivities[dayIndex] = day.activities.map((activity, index) => {
            // Create realistic time slots
            const baseHour = 9 + (index * 2); // Start at 9 AM, 2 hours apart
            const startTime = `${baseHour.toString().padStart(2, '0')}:00`;
            
            // Determine activity category
            let category = 'sightseeing';
            if (activity.toLowerCase().includes('breakfast') || activity.toLowerCase().includes('lunch') || activity.toLowerCase().includes('dinner')) {
              category = 'meal';
            } else if (activity.toLowerCase().includes('transfer') || activity.toLowerCase().includes('transport')) {
              category = 'transportation';
            } else if (activity.toLowerCase().includes('hotel') || activity.toLowerCase().includes('check-in')) {
              category = 'accommodation';
            }

            return {
              id: `${dayIndex}-${index}`,
              name: activity,
              startTime: startTime,
              duration: 2,
              category: category,
              notes: `Part of ${trip.title} itinerary`
            };
          });
        });

        dispatch({ type: 'SET_SCHEDULE_ACTIVITIES', payload: scheduleActivities });
      }

      // Set estimated budget based on trip price
      const estimatedBudget = trip.price * (tripType === 'group' ? groupSize : 1);
      if (tripType === 'group') {
        dispatch({ type: 'SET_GROUP_BUDGET_PER_HEAD', payload: trip.price });
      } else {
        dispatch({ type: 'SET_USER_BUDGET', payload: estimatedBudget });
      }

      // Backend TODO: Save premade trip selection and user preferences
      // await TripService.createFromTemplate(trip.id, { tripType, groupSize, dateRange });

      console.log(`Starting planning for ${trip.title} - ${tripType} trip with ${groupSize} people`);

      // Navigate to schedule page with pre-populated data
      navigate('/create-trip/schedule');
      onClose();
    } catch (error) {
      console.error('Error setting up trip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Customize Your Trip</DialogTitle>
          <DialogDescription>
            Let's personalize "{trip.title}" for your needs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Trip Type Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Trip Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <Card 
                className={`cursor-pointer transition-all ${tripType === 'personal' ? 'ring-2 ring-spot-primary bg-spot-primary/5' : 'hover:bg-gray-50'}`}
                onClick={() => setTripType('personal')}
              >
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-medium">Personal Trip</p>
                  <p className="text-sm text-gray-600">Just for you</p>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer transition-all ${tripType === 'group' ? 'ring-2 ring-spot-primary bg-spot-primary/5' : 'hover:bg-gray-50'}`}
                onClick={() => setTripType('group')}
              >
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-medium">Group Trip</p>
                  <p className="text-sm text-gray-600">With friends/family</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Group Size (only if group trip) */}
          {tripType === 'group' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Label htmlFor="groupSize" className="text-base font-medium">
                How many people? (including you)
              </Label>
              <Input
                id="groupSize"
                type="number"
                min="2"
                max="20"
                value={groupSize}
                onChange={(e) => setGroupSize(parseInt(e.target.value) || 2)}
                className="mt-2"
              />
            </motion.div>
          )}

          {/* Date Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Travel Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick your travel dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Trip Preview */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <img src={trip.image} alt={trip.title} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold">{trip.title}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    {trip.country} • {trip.duration}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>• Pre-filled itinerary with {trip.itinerary?.length || 0} days of activities</p>
                <p>• Estimated cost: ${trip.price} per person</p>
                <p>• Fully customizable schedule and expenses</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleStartPlanning}
              disabled={!dateRange?.from || !dateRange?.to || isLoading}
              className="flex-1 bg-spot-primary hover:bg-spot-primary/90"
            >
              {isLoading ? (
                "Setting up..."
              ) : (
                <>
                  Start Planning
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickTripSetupModal;
