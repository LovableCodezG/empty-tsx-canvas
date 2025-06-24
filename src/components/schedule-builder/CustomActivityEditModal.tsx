
import React, { useState, useMemo } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface CustomActivityEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Omit<Activity, 'id'>) => void;
  existingActivity: Activity;
  existingActivities: Activity[];
}

const CustomActivityEditModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  existingActivity, 
  existingActivities 
}: CustomActivityEditModalProps) => {
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

  // Initialize form state
  const initialStartMinutes = timeToMinutes(existingActivity.startTime);
  const initialEndMinutes = initialStartMinutes + existingActivity.duration;
  
  const [name, setName] = useState(existingActivity.name);
  const [timeRange, setTimeRange] = useState([initialStartMinutes, initialEndMinutes]);
  const [category, setCategory] = useState<Activity['category']>(existingActivity.category);
  const [notes, setNotes] = useState(existingActivity.notes || '');

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
    if (!name.trim() || hasConflict) return;
    
    const startTime = minutesToHHMM(timeRange[0]);
    const duration = timeRange[1] - timeRange[0];

    onSave({
      name: name.trim(),
      startTime,
      duration,
      category,
      notes: notes.trim() || undefined,
      source: 'custom'
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-spot-primary" />
            Edit Custom Activity
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity-name">Activity Name</Label>
            <Input
              id="activity-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter activity name..."
            />
          </div>

          <div className="space-y-3">
            <Label>Time Range</Label>
            
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

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value: Activity['category']) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meal">🍽️ Restaurant</SelectItem>
                <SelectItem value="sightseeing">🏛️ Sightseeing</SelectItem>
                <SelectItem value="accommodation">🏨 Accommodation</SelectItem>
                <SelectItem value="other">📝 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes..."
            />
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
              disabled={!name.trim() || hasConflict}
              className="flex-1 bg-spot-primary hover:bg-spot-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasConflict ? 'Resolve Conflict' : 'Update Activity'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomActivityEditModal;
