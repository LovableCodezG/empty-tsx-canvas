
import React, { useRef, useEffect } from 'react';
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
  colorIndex?: number;
}

interface ActivityBlockProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (activityId: string) => void;
  pixelsPerMinute: number;
  startMinutes: number;
}

const ActivityBlock = ({ activity, onEdit, onDelete, pixelsPerMinute, startMinutes }: ActivityBlockProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Add mouse tracking for edge highlight effect
  useEffect(() => {
    const card = cardRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(-x, y);
        card.style.setProperty("--rotation", angle + "rad");
      }
    };
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Define 4 pastel color themes
  const pastelColors = [
    {
      bg: '#f0fdf4', // Mint green
      border: '#bbf7d0',
      text: '#166534',
      accent: '#22c55e'
    },
    {
      bg: '#faf5ff', // Lavender
      border: '#e9d5ff',
      text: '#7c3aed',
      accent: '#a855f7'
    },
    {
      bg: '#fff7ed', // Peach
      border: '#fed7aa',
      text: '#ea580c',
      accent: '#f97316'
    },
    {
      bg: '#f0f9ff', // Sky blue
      border: '#bfdbfe',
      text: '#2563eb',
      accent: '#3b82f6'
    }
  ];

  const getActivityColors = () => {
    const colorIndex = activity.colorIndex ?? 0;
    return pastelColors[colorIndex % pastelColors.length];
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

  const colors = getActivityColors();

  return (
    <div
      ref={cardRef}
      className="absolute left-2 right-2 rounded-lg p-2 cursor-pointer group hover:shadow-md transition-all duration-200"
      style={{
        top: `${Math.max(20, topPosition)}px`,
        height: `${Math.max(40, height)}px`,
        zIndex: 10,
        '--rotation': '4.2rad',
        '--card-bg': colors.bg,
        '--card-accent': colors.accent,
        color: colors.text,
        border: '2px solid transparent',
        backgroundImage: `
          linear-gradient(var(--card-bg), var(--card-bg)),
          linear-gradient(calc(var(--rotation)), var(--card-accent) 0%, var(--card-bg) 30%, transparent 80%)
        `,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box'
      } as React.CSSProperties}
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
