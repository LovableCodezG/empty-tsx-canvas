
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ActivityBlock from './ActivityBlock';
import ActivityModal from './ActivityModal';

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
}

interface FlexibleCanvasProps {
  selectedDay: number;
}

const FlexibleCanvas = ({ selectedDay }: FlexibleCanvasProps) => {
  const [activities, setActivities] = useState<Record<number, Activity[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedTime, setClickedTime] = useState<string>('');
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Canvas configuration
  const startHour = 0;
  const endHour = 24;
  const pixelsPerHour = 60;
  const pixelsPerMinute = pixelsPerHour / 60;

  const generateTimeMarkers = () => {
    const markers = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      markers.push({
        hour,
        label: hour === 24 ? '00:00' : `${hour.toString().padStart(2, '0')}:00`,
        position: (hour - startHour) * pixelsPerHour
      });
    }
    return markers;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const clickedMinutes = Math.floor(clickY / pixelsPerMinute) + (startHour * 60);
      const hours = Math.floor(clickedMinutes / 60);
      const minutes = Math.floor((clickedMinutes % 60) / 15) * 15; // Snap to 15-minute intervals
      
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      setClickedTime(timeString);
      setEditingActivity(null);
      setIsModalOpen(true);
    }
  };

  const handleSaveActivity = (activityData: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: editingActivity?.id || Date.now().toString()
    };

    setActivities(prev => {
      const dayActivities = prev[selectedDay] || [];
      
      if (editingActivity) {
        // Update existing activity
        const updatedActivities = dayActivities.map(activity =>
          activity.id === editingActivity.id ? newActivity : activity
        );
        return { ...prev, [selectedDay]: updatedActivities };
      } else {
        // Add new activity
        return { ...prev, [selectedDay]: [...dayActivities, newActivity] };
      }
    });
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities(prev => {
      const dayActivities = prev[selectedDay] || [];
      const updatedActivities = dayActivities.filter(activity => activity.id !== activityId);
      return { ...prev, [selectedDay]: updatedActivities };
    });
  };

  const timeMarkers = generateTimeMarkers();
  const dayActivities = activities[selectedDay] || [];
  const canvasHeight = (endHour - startHour) * pixelsPerHour;

  return (
    <div className="relative">
      <div className="flex text-xs text-gray-500 mb-2 items-center gap-2">
        <Plus className="h-4 w-4" />
        <span>Click anywhere on the timeline to add an activity</span>
      </div>
      
      <div 
        className="relative bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
        style={{ height: `${canvasHeight}px` }}
        onClick={handleCanvasClick}
      >
        {/* Time grid */}
        <div className="absolute inset-0">
          {timeMarkers.map((marker) => (
            <div key={marker.hour}>
              {/* Hour line */}
              <div
                className="absolute w-full border-t border-gray-300"
                style={{ top: `${marker.position}px` }}
              />
              
              {/* Time label */}
              <div
                className="absolute left-2 text-xs text-gray-500 font-medium bg-white px-1"
                style={{ top: `${marker.position - 8}px` }}
              >
                {marker.label}
              </div>
              
              {/* 15-minute subdivisions */}
              {marker.hour < endHour && (
                <>
                  <div
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${marker.position + 15 * pixelsPerMinute}px` }}
                  />
                  <div
                    className="absolute w-full border-t border-gray-200"
                    style={{ top: `${marker.position + 30 * pixelsPerMinute}px` }}
                  />
                  <div
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${marker.position + 45 * pixelsPerMinute}px` }}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Activity blocks */}
        {dayActivities.map((activity) => (
          <ActivityBlock
            key={activity.id}
            activity={activity}
            onEdit={handleEditActivity}
            onDelete={handleDeleteActivity}
            pixelsPerMinute={pixelsPerMinute}
            startMinutes={startHour * 60}
          />
        ))}

        {/* Empty state */}
        {dayActivities.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Click anywhere to add your first activity</p>
            </div>
          </div>
        )}
      </div>

      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleSaveActivity}
        initialTime={clickedTime}
        existingActivity={editingActivity || undefined}
      />
    </div>
  );
};

export default FlexibleCanvas;
