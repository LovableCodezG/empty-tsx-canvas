
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useTripCreation } from '@/contexts/TripCreationContext';

const TripDateSelector = () => {
  const { state, dispatch } = useTripCreation();
  const [isDateOpen, setIsDateOpen] = useState(false);

  const handleSingleDateSelect = (date: Date | undefined) => {
    dispatch({
      type: 'SET_TRIP_DATES',
      payload: {
        dateType: 'single',
        startDate: date || null,
        endDate: null,
        dateRange: undefined
      }
    });
  };

  const handleRangeDateSelect = (dateRange: DateRange | undefined) => {
    dispatch({
      type: 'SET_TRIP_DATES',
      payload: {
        dateType: 'range',
        dateRange: dateRange,
        startDate: null,
        endDate: null
      }
    });
  };

  const handleDateTypeChange = (value: "single" | "range") => {
    dispatch({
      type: 'SET_TRIP_DATES',
      payload: {
        dateType: value,
        startDate: null,
        endDate: null,
        dateRange: undefined
      }
    });
  };

  const getDateDisplayText = () => {
    if (state.dateType === "single") {
      return state.startDate ? format(state.startDate, "🗓️ MMM dd") : "🗓️ Select date";
    } else {
      if (state.dateRange?.from) {
        if (state.dateRange.to) {
          return `🗓️ ${format(state.dateRange.from, "MMM dd")} - ${format(state.dateRange.to, "MMM dd")}`;
        }
        return `🗓️ ${format(state.dateRange.from, "MMM dd")} - ?`;
      }
      return "🗓️ Select dates";
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">When are you traveling?</h3>
        <p className="text-sm text-gray-600">Select your trip dates</p>
      </div>
      
      <div className="relative">
        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 pl-12 justify-start text-left font-normal bg-white border-gray-200 focus:border-blue-600 transition-colors",
                !state.startDate && !state.dateRange?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lime-500 w-5 h-5" />
              {getDateDisplayText()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 border-b">
              <RadioGroup
                value={state.dateType || 'single'}
                onValueChange={handleDateTypeChange}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single">Single day</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="range" id="range" />
                  <Label htmlFor="range">Date range</Label>
                </div>
              </RadioGroup>
            </div>
            {state.dateType === "single" ? (
              <Calendar
                mode="single"
                selected={state.startDate}
                onSelect={handleSingleDateSelect}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            ) : (
              <Calendar
                mode="range"
                selected={state.dateRange}
                onSelect={handleRangeDateSelect}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TripDateSelector;
