
import React, { useState, useMemo } from 'react';
import { Clock, AlertTriangle, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
  source?: 'custom' | 'place';
}

interface PlaceActivityEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Omit<Activity, 'id'>) => void;
  existingActivity: Activity;
  existingActivities: Activity[];
}

const PlaceActivityEditModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  existingActivity, 
  existingActivities 
}: PlaceActivityEditModalProps) => {
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

  // Initialize form state - only time range is editable
  const initialStartMinutes = timeToMinutes(existingActivity.startTime);
  const initialEndMinutes = initialStartMinutes + existingActivity.duration;
  
  const [timeRange, setTimeRange] = useState([initialStartMinutes, initialEndMinutes]);

  // Calculate occupied time ranges from other existing activities (excluding current one)
  const occupiedRanges = useMemo(() => {
    return existingActivities
      .filter(activity => activity.id !== existingActivity.id)
      .map(activity => {
        const startMinutes = timeToMinutes(activity.startTime);
        const endMinutes = startMinutes + activity.duration;
        return { start: startMinutes, end: endMinutes, name: activity.name };
      });
  }, [existingActivities, existingActivity.id]);

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

  const handleSave = () => {
    if (hasConflict) return;
    
    const startTime = minutesToHHMM(timeRange[0]);
    const duration = timeRange[1] - timeRange[0];

    onSave({
      name: existingActivity.name, // Keep original name
      startTime,
      duration,
      category: existingActivity.category, // Keep original category
      notes: existingActivity.notes, // Keep original notes
      source: existingActivity.source || 'place'
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-spot-primary" />
            Reschedule Activity
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Activity Info - Read Only */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-1">{existingActivity.name}</h3>
            <p className="text-sm text-gray-600">{existingActivity.notes}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Adjust Time Range</span>
              <span className="text-xs text-gray-500">Only time can be modified</span>
            </div>
            
            {/* Time Range Display */}
            <div className={`p-3 rounded-lg text-center ${hasConflict ? 'bg-red-50' : 'bg-blue-50'}`}>
              <span className={`text-lg font-medium ${hasConflict ? 'text-red-900' : 'text-blue-900'}`}>
                {minutesToTime(timeRange[0])} - {minutesToTime(timeRange[1])}
              </span>
              <div className={`text-sm mt-1 ${hasConflict ? 'text-red-700' : 'text-blue-700'}`}>
                Duration: {Math.round((timeRange[1] - timeRange[0]) / 60 * 10) / 10} hours
              </div>
            </div>

            {/* Conflict Warning */}
            {hasConflict && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium mb-1">Conflicts with:</p>
                {conflictingActivities.map((conflict, index) => (
                  <p key={index} className="text-sm text-red-700">
                    • {conflict.name} ({minutesToTime(conflict.start)} - {minutesToTime(conflict.end)})
                  </p>
                ))}
                <div className="flex items-center gap-1 mt-2 text-red-700">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Time conflict detected</span>
                </div>
              </div>
            )}

            {/* Range Slider */}
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

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={hasConflict}
              className="flex-1 bg-spot-primary hover:bg-spot-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasConflict ? 'Resolve Conflict' : 'Update Time'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceActivityEditModal;
