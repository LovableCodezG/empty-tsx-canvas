import React, { useState } from 'react';
import ActivityBlock from './ActivityBlock';
import ActivityModal from './ActivityModal';

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
  colorIndex?: number;
}

interface FlexibleCanvasProps {
  selectedDay: number;
  activities: Record<number, Activity[]>;
  onUpdateActivities: React.Dispatch<React.SetStateAction<Record<number, Activity[]>>>;
}

const FlexibleCanvas = ({ selectedDay, activities, onUpdateActivities }: FlexibleCanvasProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Canvas configuration
  const startHour = 0;
  const endHour = 24;
  const pixelsPerHour = 60;
  const pixelsPerMinute = pixelsPerHour / 60;

  const generateTimeMarkers = () => {
    const markers = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? 'AM' : 'PM';
      const label = `${displayHour}:00 ${ampm}`;
      
      markers.push({
        hour,
        label,
        position: (hour - startHour) * pixelsPerHour
      });
    }
    return markers;
  };

  const handleSaveActivity = (activityData: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: editingActivity?.id || Date.now().toString(),
      colorIndex: editingActivity?.colorIndex ?? Math.floor(Math.random() * 4) // Keep existing color or assign random
    };

    onUpdateActivities(prev => {
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
    onUpdateActivities(prev => {
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
      <div 
        className="relative bg-white border border-gray-200 rounded-lg overflow-hidden"
        style={{ height: `${canvasHeight}px`, paddingTop: '20px', paddingBottom: '20px' }}
      >
        {/* Time grid */}
        <div className="absolute inset-0" style={{ top: '20px', bottom: '20px' }}>
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
              {marker.hour < endHour - 1 && (
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
              <p className="text-sm">No activities scheduled for this day</p>
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
        existingActivity={editingActivity || undefined}
      />
    </div>
  );
};

export default FlexibleCanvas;
