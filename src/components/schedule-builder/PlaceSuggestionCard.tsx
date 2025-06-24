
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TimePicker from './TimePicker';

interface Place {
  id: string;
  name: string;
  rating: number;
  distance: string;
  image: string;
  type: string;
}

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
}

interface PlaceSuggestionCardProps {
  place: Place;
  selectedDay: number;
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
}

const PlaceSuggestionCard = ({ place, selectedDay, onAddActivity }: PlaceSuggestionCardProps) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleCardClick = () => {
    setShowTimePicker(true);
  };

  return (
    <>
      <Button
        variant="ghost"
        className={cn(
          "place-suggestion w-full h-auto p-4 flex items-center gap-3 border border-gray-200 rounded-lg",
          "hover:border-spot-primary hover:bg-spot-primary/5 transition-all duration-200",
          "text-left justify-start"
        )}
        onClick={handleCardClick}
      >
        <img
          src={place.image}
          alt={place.name}
          className="w-12 h-12 rounded-lg object-cover bg-gray-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{place.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{place.rating}</span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{place.distance}</span>
          </div>
        </div>
      </Button>

      <TimePicker
        isOpen={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        place={place}
        selectedDay={selectedDay}
        onAddActivity={onAddActivity}
      />
    </>
  );
};

export default PlaceSuggestionCard;
