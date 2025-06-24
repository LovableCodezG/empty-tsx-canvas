
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
}

interface ActivityBlockProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (activityId: string) => void;
  pixelsPerMinute: number;
  startMinutes: number;
}

const ActivityBlock = ({ activity, onEdit, onDelete, pixelsPerMinute, startMinutes }: ActivityBlockProps) => {
  const getCategoryColor = (category: Activity['category']) => {
    switch (category) {
      case 'meal': return 'bg-orange-200 border-orange-300 text-orange-900';
      case 'sightseeing': return 'bg-blue-200 border-blue-300 text-blue-900';
      case 'transportation': return 'bg-gray-200 border-gray-300 text-gray-900';
      case 'accommodation': return 'bg-green-200 border-green-300 text-green-900';
      default: return 'bg-purple-200 border-purple-300 text-purple-900';
    }
  };

  const getCategoryIcon = (category: Activity['category']) => {
    switch (category) {
      case 'meal': return '🍽️';
      case 'sightseeing': return '🏛️';
      case 'transportation': return '🚗';
      case 'accommodation': return '🏨';
      default: return '📝';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getEndTime = () => {
    const [hours, minutes] = activity.startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + activity.duration;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  // Calculate position and height
  const [hours, minutes] = activity.startTime.split(':').map(Number);
  const activityStartMinutes = hours * 60 + minutes;
  const topPosition = (activityStartMinutes - startMinutes) * pixelsPerMinute + 20; // Add 20px offset for padding
  const height = activity.duration * pixelsPerMinute;

  return (
    <div
      className={cn(
        "absolute left-2 right-2 border-2 rounded-lg p-2 cursor-pointer group hover:shadow-md transition-all duration-200",
        getCategoryColor(activity.category)
      )}
      style={{
        top: `${Math.max(20, topPosition)}px`,
        height: `${Math.max(40, height)}px`,
        zIndex: 10
      }}
      onClick={() => onEdit(activity)}
    >
      <div className="flex items-start justify-between h-full">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-sm">{getCategoryIcon(activity.category)}</span>
            <span className="font-medium text-sm truncate">{activity.name}</span>
          </div>
          <div className="text-xs opacity-80">
            {formatTime(activity.startTime)} - {formatTime(getEndTime())}
          </div>
          {activity.notes && (
            <div className="text-xs opacity-70 mt-1 truncate">
              {activity.notes}
            </div>
          )}
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ml-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-black/10"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(activity);
            }}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-red-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(activity.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityBlock;
