
import React, { useState } from 'react';
import { Star, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Place {
  id: string;
  name: string;
  rating: number;
  distance: string;
  image: string;
  type: string;
}

interface TimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  place: Place;
  selectedDay: number;
}

const TimePicker = ({ isOpen, onClose, place, selectedDay }: TimePickerProps) => {
  // Convert 9 AM to 5 PM as default range (in minutes from midnight)
  const [timeRange, setTimeRange] = useState([540, 1020]); // 9:00 AM - 5:00 PM

  // Helper function to convert minutes to 12-hour format
  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${mins.toString().padStart(2, '0')} ${ampm}`;
  };

  // Photo gallery data - using placeholder images
  const photos = [
    place.image, // Main image
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
  ];

  const handleAddToSchedule = () => {
    const startTime = minutesToTime(timeRange[0]);
    const endTime = minutesToTime(timeRange[1]);
    console.log(`Adding ${place.name} to Day ${selectedDay + 1} from ${startTime} to ${endTime}`);
    // TODO: Add to schedule state/context
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-spot-primary" />
            Add to Schedule
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Place Info with Photo Gallery */}
          <div className="space-y-3">
            {/* Main Photo */}
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img
                src={photos[0]}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Photo Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {photos.slice(1).map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${place.name} ${index + 2}`}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>

            {/* Place Details */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">{place.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{place.rating}</span>
                <span className="text-sm text-gray-500">• {place.distance}</span>
              </div>
            </div>
          </div>

          {/* Time Range Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Select Time Range
              </label>
              
              {/* Time Range Display */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg text-center">
                <span className="text-lg font-medium text-blue-900">
                  {minutesToTime(timeRange[0])} - {minutesToTime(timeRange[1])}
                </span>
                <div className="text-sm text-blue-700 mt-1">
                  Duration: {Math.round((timeRange[1] - timeRange[0]) / 60 * 10) / 10} hours
                </div>
              </div>

              {/* Range Slider */}
              <div className="px-3">
                <Slider
                  value={timeRange}
                  onValueChange={setTimeRange}
                  min={360} // 6:00 AM
                  max={1320} // 10:00 PM
                  step={30} // 30-minute intervals
                  className="w-full"
                />
                
                {/* Time Labels */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>6:00 AM</span>
                  <span>12:00 PM</span>
                  <span>6:00 PM</span>
                  <span>10:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToSchedule}
              className="flex-1 bg-spot-primary hover:bg-spot-primary/90"
            >
              Add to Schedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimePicker;
