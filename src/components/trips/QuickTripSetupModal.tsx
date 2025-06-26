
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

// Backend Integration Comments:
// 1. Add API call to create trip template: POST /api/trips/from-template
// 2. Track premade trip selection analytics
// 3. Store user preferences for future recommendations
// 4. Add validation for date ranges and group sizes
// 5. Implement user authentication check before trip creation

interface QuickTripSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (setupData: TripSetupData) => void;
  trip: {
    title: string;
    duration: string;
    country: string;
    isInternational: boolean;
    price: number;
    maxGroupSize: number;
  };
}

export interface TripSetupData {
  tripType: 'group' | 'personal';
  groupSize: number;
  dateRange: DateRange | undefined;
  notes?: string;
}

const QuickTripSetupModal = ({ isOpen, onClose, onConfirm, trip }: QuickTripSetupModalProps) => {
  const [tripType, setTripType] = useState<'group' | 'personal'>('personal');
  const [groupSize, setGroupSize] = useState(2);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const setupData: TripSetupData = {
      tripType,
      groupSize: tripType === 'group' ? groupSize : 1,
      dateRange,
      notes: notes.trim() || undefined,
    };

    // Backend TODO: Validate setup data
    // ValidationService.validateTripSetup(setupData);
    
    onConfirm(setupData);
  };

  const isDateRangeValid = dateRange?.from && dateRange?.to;
  const canProceed = isDateRangeValid;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg"
      >
        <Card className="w-full shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Start Planning Your Trip</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{trip.title}</Badge>
              <Badge className={trip.isInternational ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                {trip.country}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Trip Type Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Who's traveling?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={tripType === 'personal' ? 'default' : 'outline'}
                  onClick={() => setTripType('personal')}
                  className="h-12 flex flex-col items-center justify-center"
                >
                  <Users className="h-4 w-4 mb-1" />
                  <span className="text-xs">Just Me</span>
                </Button>
                <Button
                  variant={tripType === 'group' ? 'default' : 'outline'}
                  onClick={() => setTripType('group')}
                  className="h-12 flex flex-col items-center justify-center"
                >
                  <Users className="h-4 w-4 mb-1" />
                  <span className="text-xs">Group Trip</span>
                </Button>
              </div>
            </div>

            {/* Group Size Selection */}
            {tripType === 'group' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Group Size (including you)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5, 6, 7, 8].filter(size => size <= trip.maxGroupSize).map((size) => (
                    <Button
                      key={size}
                      variant={groupSize === size ? 'default' : 'outline'}
                      onClick={() => setGroupSize(size)}
                      className="h-10"
                      size="sm"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                {trip.maxGroupSize < 8 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Maximum group size for this trip: {trip.maxGroupSize}
                  </p>
                )}
              </div>
            )}

            <Separator />

            {/* Date Range Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                When would you like to travel?
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-12",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      <span>Select travel dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    defaultMonth={new Date()}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    disabled={(date) => date < new Date()}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Special requests or notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific preferences, dietary restrictions, or special occasions..."
                className="w-full p-3 border border-gray-300 rounded-md text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-spot-primary focus:border-transparent"
                maxLength={200}
              />
              <div className="text-xs text-gray-500 mt-1">{notes.length}/200</div>
            </div>

            <Separator />

            {/* Pricing Estimate */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Estimated cost per person:</span>
                <span className="text-lg font-bold text-spot-primary">${trip.price}</span>
              </div>
              {tripType === 'group' && (
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Total estimated cost:</span>
                  <span className="text-md font-semibold text-gray-800">
                    ${(trip.price * groupSize).toLocaleString()}
                  </span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                This is a rough estimate. Actual costs may vary based on your preferences and travel dates.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!canProceed}
                className="flex-1 bg-spot-primary hover:bg-spot-primary/90"
              >
                Start Planning
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuickTripSetupModal;
