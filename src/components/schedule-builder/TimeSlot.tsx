
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeSlotProps {
  time: string;
  type: 'meal' | 'activity';
  mealType?: 'breakfast' | 'lunch' | 'dinner' | null;
  mealIcon?: string;
  mealLabel?: string;
  selectedDay: number;
}

const TimeSlot = ({ time, type, mealType, mealIcon, mealLabel, selectedDay }: TimeSlotProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleClick = () => {
    setIsHighlighted(!isHighlighted);
    
    if (type === 'meal') {
      console.log(`Opening restaurant picker for ${mealLabel} at ${time}`);
      // Open restaurant-only suggestions modal
    } else {
      console.log(`Opening place picker for ${time}`);
      // Open general place picker modal
    }
  };

  const displayTime = time;
  const nextHour = parseInt(time.split(':')[0]) + 1;
  const nextTime = `${nextHour.toString().padStart(2, '0')}:${time.split(':')[1]}`;

  return (
    <Button
      variant="ghost"
      className={cn(
        "time-slot w-full h-12 px-4 flex items-center justify-between border rounded-lg transition-all duration-200",
        isHighlighted 
          ? "border-spot-sky bg-spot-sky/10" 
          : "border-gray-200 hover:border-gray-300",
        type === 'meal' 
          ? "bg-spot-beige/30 hover:bg-spot-beige/50" 
          : "bg-white hover:bg-gray-50"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">
          {displayTime} - {nextTime}
        </span>
        {type === 'meal' && mealIcon && mealLabel && (
          <div className="flex items-center gap-2">
            <span className="text-lg">{mealIcon}</span>
            <span className="text-sm text-gray-600">{mealLabel}</span>
          </div>
        )}
      </div>
      
      {type === 'meal' && (
        <span className="text-xs text-gray-500">Tap to add restaurant</span>
      )}
      {type === 'activity' && (
        <span className="text-xs text-gray-500">Tap to add activity</span>
      )}
    </Button>
  );
};

export default TimeSlot;
