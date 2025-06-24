
import React, { useState, useMemo } from 'react';
import { Star, Clock, AlertTriangle } from 'lucide-react';
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

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
}

interface TimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  place: Place;
  selectedDay: number;
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
  existingActivities: Activity[];
}

const TimePicker = ({ isOpen, onClose, place, selectedDay, onAddActivity, existingActivities }: TimePickerProps) => {
  // Convert 9 AM to 5 PM as default range (in minutes from midnight)
  const [timeRange, setTimeRange] = useState([540, 1020]); // 9:00 AM - 5:00 PM

  // Helper function to convert HH:MM to minutes from midnight
  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Helper function to convert minutes to 12-hour format
  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${mins.toString().padStart(2, '0')} ${ampm}`;
  };

  // Helper function to convert minutes to HH:MM format for activities
  const minutesToHHMM = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Calculate occupied time ranges from existing activities
  const occupiedRanges = useMemo(() => {
    return existingActivities.map(activity => {
      const startMinutes = timeToMinutes(activity.startTime);
      const endMinutes = startMinutes + activity.duration;
      return { start: startMinutes, end: endMinutes, name: activity.name };
    });
  }, [existingActivities]);

  // Check if current selection conflicts with existing activities
  const hasConflict = useMemo(() => {
    const [start, end] = timeRange;
    return occupiedRanges.some(range => 
      (start < range.end && end > range.start)
    );
  }, [timeRange, occupiedRanges]);

  // Get conflicting activities for display
  const conflictingActivities = useMemo(() => {
    if (!hasConflict) return [];
    const [start, end] = timeRange;
    return occupiedRanges.filter(range => 
      (start < range.end && end > range.start)
    );
  }, [hasConflict, timeRange, occupiedRanges]);

  // Photo gallery data - using placeholder images
  const photos = [
    place.image, // Main image
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
  ];

  const handleAddToSchedule = () => {
    if (hasConflict) {
      // You could show a confirmation dialog here instead
      return;
    }

    const startTime = minutesToHHMM(timeRange[0]);
    const duration = timeRange[1] - timeRange[0]; // Duration in minutes
    
    const activity: Omit<Activity, 'id'> = {
      name: place.name,
      startTime,
      duration,
      category: 'sightseeing',
      notes: `${place.rating} ⭐ • ${place.distance}`
    };

    onAddActivity(activity);
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
              <div className={`mb-4 p-3 rounded-lg text-center ${hasConflict ? 'bg-red-50' : 'bg-blue-50'}`}>
                <span className={`text-lg font-medium ${hasConflict ? 'text-red-900' : 'text-blue-900'}`}>
                  {minutesToTime(timeRange[0])} - {minutesToTime(timeRange[1])}
                </span>
                <div className={`text-sm mt-1 ${hasConflict ? 'text-red-700' : 'text-blue-700'}`}>
                  Duration: {Math.round((timeRange[1] - timeRange[0]) / 60 * 10) / 10} hours
                </div>
                {hasConflict && (
                  <div className="flex items-center justify-center gap-1 mt-2 text-red-700">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Time conflict detected</span>
                  </div>
                )}
              </div>

              {/* Conflict Warning */}
              {hasConflict && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 font-medium mb-1">Conflicts with:</p>
                  {conflictingActivities.map((conflict, index) => (
                    <p key={index} className="text-sm text-red-700">
                      • {conflict.name} ({minutesToTime(conflict.start)} - {minutesToTime(conflict.end)})
                    </p>
                  ))}
                </div>
              )}

              {/* Range Slider with Occupied Time Overlay */}
              <div className="px-3 relative">
                <Slider
                  value={timeRange}
                  onValueChange={setTimeRange}
                  min={360} // 6:00 AM
                  max={1320} // 10:00 PM
                  step={30} // 30-minute intervals
                  className="w-full"
                />
                
                {/* Occupied Time Indicators */}
                <div className="absolute top-0 left-3 right-3 h-2 pointer-events-none">
                  {occupiedRanges.map((range, index) => {
                    const startPercent = ((range.start - 360) / (1320 - 360)) * 100;
                    const widthPercent = ((range.end - range.start) / (1320 - 360)) * 100;
                    return (
                      <div
                        key={index}
                        className="absolute h-full bg-red-300 opacity-60 rounded"
                        style={{
                          left: `${Math.max(0, startPercent)}%`,
                          width: `${Math.min(100 - Math.max(0, startPercent), widthPercent)}%`
                        }}
                      />
                    );
                  })}
                </div>
                
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
              disabled={hasConflict}
              className="flex-1 bg-spot-primary hover:bg-spot-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasConflict ? 'Resolve Conflict' : 'Add to Schedule'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimePicker;
