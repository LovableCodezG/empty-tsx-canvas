
import React, { useState, useMemo } from 'react';
import { Plus, Clock, AlertTriangle } from 'lucide-react';
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

interface CustomActivityFormProps {
  selectedDay: number;
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
  existingActivities: Activity[];
}

const CustomActivityForm = ({ selectedDay, onAddActivity, existingActivities }: CustomActivityFormProps) => {
  const [name, setName] = useState('');
  const [timeRange, setTimeRange] = useState([540, 660]); // 9:00 AM - 11:00 AM
  const [category, setCategory] = useState<Activity['category']>('other');
  const [notes, setNotes] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || hasConflict) return;

    const startTime = minutesToHHMM(timeRange[0]);
    const duration = timeRange[1] - timeRange[0];

    const activity: Omit<Activity, 'id'> = {
      name: name.trim(),
      startTime,
      duration,
      category,
      notes: notes.trim() || undefined,
      source: 'custom'
    };

    onAddActivity(activity);
    
    // Reset form
    setName('');
    setTimeRange([540, 660]);
    setCategory('other');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="activity-name">Activity Name</Label>
        <Input
          id="activity-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter activity name..."
          required
        />
      </div>

      <div className="space-y-3">
        <Label>Time Range</Label>
        
        {/* Time Range Display */}
        <div className={`p-3 rounded-lg text-center ${hasConflict ? 'bg-red-50' : 'bg-blue-50'}`}>
          <span className={`text-sm font-medium ${hasConflict ? 'text-red-900' : 'text-blue-900'}`}>
            {minutesToTime(timeRange[0])} - {minutesToTime(timeRange[1])}
          </span>
          <div className={`text-xs mt-1 ${hasConflict ? 'text-red-700' : 'text-blue-700'}`}>
            Duration: {Math.round((timeRange[1] - timeRange[0]) / 60 * 10) / 10} hours
          </div>
        </div>

        {/* Conflict Warning */}
        {hasConflict && (
          <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-800 font-medium mb-1">Conflicts with:</p>
            {conflictingActivities.map((conflict, index) => (
              <p key={index} className="text-xs text-red-700">
                • {conflict.name}
              </p>
            ))}
            <div className="flex items-center gap-1 mt-1 text-red-700">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs font-medium">Time conflict detected</span>
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

      <Button 
        type="submit"
        className="w-full bg-spot-primary hover:bg-spot-primary/90 flex items-center gap-2"
        disabled={!name.trim() || hasConflict}
      >
        <Plus className="h-4 w-4" />
        Add Custom Activity
      </Button>
    </form>
  );
};

export default CustomActivityForm;
