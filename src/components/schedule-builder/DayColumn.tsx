
import React from 'react';
import TimeSlot from './TimeSlot';

interface DayColumnProps {
  selectedDay: number;
}

const DayColumn = ({ selectedDay }: DayColumnProps) => {
  // Generate time slots from 6:00 AM to 10:00 PM in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour < 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Pre-filled meal slots
  const getMealType = (time: string): 'breakfast' | 'lunch' | 'dinner' | null => {
    if (time === '08:00') return 'breakfast';
    if (time === '13:00') return 'lunch';
    if (time === '20:00') return 'dinner';
    return null;
  };

  const getMealIcon = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    switch (mealType) {
      case 'breakfast': return '🥣';
      case 'lunch': return '🍽️';
      case 'dinner': return '🍲';
    }
  };

  const getMealLabel = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    switch (mealType) {
      case 'breakfast': return 'Breakfast';
      case 'lunch': return 'Lunch';
      case 'dinner': return 'Dinner';
    }
  };

  return (
    <div className="space-y-1">
      {timeSlots.map((time, index) => {
        const mealType = getMealType(time);
        const isPrefilledMeal = mealType !== null;
        
        return (
          <TimeSlot
            key={`${selectedDay}-${time}`}
            time={time}
            type={isPrefilledMeal ? 'meal' : 'activity'}
            mealType={mealType}
            mealIcon={mealType ? getMealIcon(mealType) : undefined}
            mealLabel={mealType ? getMealLabel(mealType) : undefined}
            selectedDay={selectedDay}
          />
        );
      })}
    </div>
  );
};

export default DayColumn;
