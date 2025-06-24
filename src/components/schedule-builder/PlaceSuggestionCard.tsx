
import React, { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  source?: 'custom' | 'place';
}

interface PlaceSuggestionCardProps {
  place: Place;
  selectedDay: number;
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
  existingActivities: Activity[];
}

const PlaceSuggestionCard = ({ place, selectedDay, onAddActivity, existingActivities }: PlaceSuggestionCardProps) => {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const handleAddActivityWithSource = (activity: Omit<Activity, 'id'>) => {
    // Add source property to mark this as coming from a place
    onAddActivity({
      ...activity,
      source: 'place'
    });
  };

  return (
    <>
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <img
          src={place.image}
          alt={place.name}
          className="w-12 h-12 rounded-md object-cover"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm truncate">{place.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{place.rating}</span>
            <span className="text-xs text-gray-500">• {place.distance}</span>
          </div>
        </div>
        
        <Button
          size="sm"
          className="bg-spot-primary hover:bg-spot-primary/90 h-8 w-8 p-0"
          onClick={() => setIsTimePickerOpen(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <TimePicker
        isOpen={isTimePickerOpen}
        onClose={() => setIsTimePickerOpen(false)}
        place={place}
        selectedDay={selectedDay}
        onAddActivity={handleAddActivityWithSource}
        existingActivities={existingActivities}
      />
    </>
  );
};

export default PlaceSuggestionCard;
