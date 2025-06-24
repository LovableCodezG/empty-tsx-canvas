
import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
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

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
}

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Omit<Activity, 'id'>) => void;
  initialTime?: string;
  existingActivity?: Activity;
}

const ActivityModal = ({ isOpen, onClose, onSave, initialTime, existingActivity }: ActivityModalProps) => {
  const [name, setName] = useState(existingActivity?.name || '');
  const [startTime, setStartTime] = useState(existingActivity?.startTime || initialTime || '09:00');
  const [duration, setDuration] = useState(existingActivity?.duration || 60);
  const [category, setCategory] = useState<Activity['category']>(existingActivity?.category || 'other');
  const [notes, setNotes] = useState(existingActivity?.notes || '');

  const handleSave = () => {
    if (!name.trim()) return;
    
    onSave({
      name: name.trim(),
      startTime,
      duration,
      category,
      notes: notes.trim() || undefined
    });
    
    // Reset form
    setName('');
    setStartTime('09:00');
    setDuration(60);
    setCategory('other');
    setNotes('');
    onClose();
  };

  const getCategoryColor = (cat: Activity['category']) => {
    switch (cat) {
      case 'meal': return 'bg-orange-100 text-orange-800';
      case 'sightseeing': return 'bg-blue-100 text-blue-800';
      case 'transportation': return 'bg-gray-100 text-gray-800';
      case 'accommodation': return 'bg-green-100 text-green-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-spot-primary" />
            {existingActivity ? 'Edit Activity' : 'Add Activity'}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="15"
                max="1440"
                step="15"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value: Activity['category']) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meal">🍽️ Meal</SelectItem>
                <SelectItem value="sightseeing">🏛️ Sightseeing</SelectItem>
                <SelectItem value="transportation">🚗 Transportation</SelectItem>
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

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 bg-spot-primary hover:bg-spot-primary/90"
              disabled={!name.trim()}
            >
              {existingActivity ? 'Update' : 'Add'} Activity
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityModal;
