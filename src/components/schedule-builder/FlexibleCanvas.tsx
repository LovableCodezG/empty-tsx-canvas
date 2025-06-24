
import React, { useState, useRef, useEffect } from 'react';
import ActivityBlock from './ActivityBlock';
import ActivityModal from './ActivityModal';
import CustomActivityEditModal from './CustomActivityEditModal';
import PlaceActivityEditModal from './PlaceActivityEditModal';

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
  colorIndex?: number;
  source?: 'custom' | 'place';
}

interface FlexibleCanvasProps {
  selectedDay: number;
  activities: Record<number, Activity[]>;
  onUpdateActivities: React.Dispatch<React.SetStateAction<Record<number, Activity[]>>>;
}

const FlexibleCanvas = ({ selectedDay, activities, onUpdateActivities }: FlexibleCanvasProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomEditModalOpen, setIsCustomEditModalOpen] = useState(false);
  const [isPlaceEditModalOpen, setIsPlaceEditModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Canvas configuration
  const startHour = 0;
  const endHour = 24;
  const pixelsPerHour = 60;
  const pixelsPerMinute = pixelsPerHour / 60;

  // Global mouse tracking for edge glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseLeave = () => {
      // Reset to center when mouse leaves canvas
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePosition({
          x: rect.width / 2,
          y: rect.height / 2
        });
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const calculateRotationForActivity = (activity: Activity) => {
    if (!canvasRef.current) return 4.2; // Default rotation

    const [hours, minutes] = activity.startTime.split(':').map(Number);
    const activityStartMinutes = hours * 60 + minutes;
    const topPosition = (activityStartMinutes - startHour * 60) * pixelsPerMinute + 20;
    const height = activity.duration * pixelsPerMinute;
    
    // Calculate center of the activity card
    const cardCenterX = canvasRef.current.offsetWidth / 2; // Cards span most of the width
    const cardCenterY = topPosition + height / 2;
    
    // Calculate angle from mouse position to card center
    const deltaX = mousePosition.x - cardCenterX;
    const deltaY = mousePosition.y - cardCenterY;
    const angle = Math.atan2(-deltaX, deltaY);
    
    return angle;
  };

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
    
    // Determine which edit modal to open based on activity source
    if (activity.source === 'custom') {
      setIsCustomEditModalOpen(true);
    } else {
      // For place/restaurant activities, use the limited edit modal
      setIsPlaceEditModalOpen(true);
    }
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
        ref={canvasRef}
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
            globalRotation={calculateRotationForActivity(activity)}
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

      {/* Regular Activity Modal (for new activities) */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleSaveActivity}
        existingActivity={editingActivity || undefined}
      />

      {/* Custom Activity Edit Modal */}
      {editingActivity && (
        <CustomActivityEditModal
          isOpen={isCustomEditModalOpen}
          onClose={() => {
            setIsCustomEditModalOpen(false);
            setEditingActivity(null);
          }}
          onSave={handleSaveActivity}
          existingActivity={editingActivity}
          existingActivities={dayActivities}
        />
      )}

      {/* Place Activity Edit Modal */}
      {editingActivity && (
        <PlaceActivityEditModal
          isOpen={isPlaceEditModalOpen}
          onClose={() => {
            setIsPlaceEditModalOpen(false);
            setEditingActivity(null);
          }}
          onSave={handleSaveActivity}
          existingActivity={editingActivity}
          existingActivities={dayActivities}
        />
      )}
    </div>
  );
};

export default FlexibleCanvas;
