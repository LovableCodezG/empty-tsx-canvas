
import React, { useState } from 'react';
import { Star, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

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
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour < 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        options.push({ value: time, label: displayTime });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleAddToSchedule = () => {
    if (startTime && endTime) {
      console.log(`Adding ${place.name} to Day ${selectedDay + 1} from ${startTime} to ${endTime}`);
      // TODO: Add to schedule state/context
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-spot-primary" />
            Add to Schedule
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Place Info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <img
              src={place.image}
              alt={place.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{place.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{place.rating}</span>
                <span className="text-sm text-gray-500">• {place.distance}</span>
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Start Time
              </label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                End Time
              </label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              disabled={!startTime || !endTime}
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
