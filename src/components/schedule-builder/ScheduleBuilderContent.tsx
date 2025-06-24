import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useTripCreation } from '@/contexts/TripCreationContext';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import TripNavigationButtons from '@/components/trip-creation/TripNavigationButtons';
import ScheduleHeader from './ScheduleHeader';
import DaySelector from './DaySelector';
import SuggestionsPanel from './SuggestionsPanel';
import ScheduleGrid from './ScheduleGrid';
import AccommodationModal from './AccommodationModal';

interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
  colorIndex?: number;
}

const ScheduleBuilderContent = () => {
  const navigate = useNavigate();
  const { state } = useTripCreation();
  const [selectedDay, setSelectedDay] = useState(0);
  const [isAccommodationModalOpen, setIsAccommodationModalOpen] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [emptyDays, setEmptyDays] = useState<number[]>([]);
  const [activities, setActivities] = useState<Record<number, Activity[]>>({});

  // Check if dates are properly set, redirect to destination page if not
  useEffect(() => {
    const hasValidDates = state.dateType && (
      (state.dateType === 'single' && state.startDate) ||
      (state.dateType === 'range' && state.dateRange?.from)
    );

    if (!hasValidDates) {
      console.log('No dates selected, redirecting to destination page');
      navigate('/create-trip/destination');
    }
  }, [state.dateType, state.startDate, state.dateRange, navigate]);

  // Helper function to get total number of days
  const getTotalDays = () => {
    if (state.dateType === 'single' && state.startDate) {
      return 1;
    }
    if (state.dateType === 'range' && state.dateRange?.from && state.dateRange?.to) {
      const timeDiff = state.dateRange.to.getTime() - state.dateRange.from.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    }
    return 0;
  };

  // Helper function to format date for display
  const formatDateForDay = (dayIndex: number) => {
    if (state.dateType === 'single' && state.startDate) {
      return state.startDate.toLocaleDateString();
    }
    if (state.dateType === 'range' && state.dateRange?.from) {
      const date = new Date(state.dateRange.from);
      date.setDate(date.getDate() + dayIndex);
      return date.toLocaleDateString();
    }
    return '';
  };

  // Validate schedule activities for each day
  const validateScheduleActivities = () => {
    const totalDays = getTotalDays();
    const daysWithoutActivities: number[] = [];
    
    // Check each day individually
    for (let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
      const dayActivities = activities[dayIndex] || [];
      let hasMeaningfulActivities = false;
      
      // Check if this day has meaningful activities
      dayActivities.forEach(activity => {
        // Skip accommodation activities (check-in/check-out)
        if (activity.category === 'accommodation') {
          return;
        }
        
        // Skip breakfast activities
        if (activity.category === 'meal' && 
            activity.name.toLowerCase().includes('breakfast')) {
          return;
        }
        
        // Found a meaningful activity
        hasMeaningfulActivities = true;
      });
      
      // If no meaningful activities, add to list
      if (!hasMeaningfulActivities) {
        daysWithoutActivities.push(dayIndex + 1); // Day number (1-indexed)
      }
    }
    
    return daysWithoutActivities;
  };

  const handleBack = () => {
    console.log('Navigating back to destination page');
    navigate('/create-trip/destination');
  };

  const handleNext = () => {
    console.log('Checking schedule validation before proceeding');
    
    // Validate if user has added meaningful activities for each day
    const daysWithoutActivities = validateScheduleActivities();
    
    if (daysWithoutActivities.length > 0) {
      console.log('Found days without activities:', daysWithoutActivities);
      setEmptyDays(daysWithoutActivities);
      setShowValidationDialog(true);
      return;
    }
    
    // Navigate to expense estimation page
    console.log('Proceeding to expense estimation');
    // navigate('/create-trip/expenses');
  };

  const handleContinueAnyway = () => {
    console.log('User chose to continue without adding activities for days:', emptyDays);
    setShowValidationDialog(false);
    setEmptyDays([]);
    // Navigate to expense estimation page
    // navigate('/create-trip/expenses');
  };

  const handleGoBackToAddPlans = () => {
    console.log('User chose to go back and add plans for days:', emptyDays);
    setShowValidationDialog(false);
    setEmptyDays([]);
    // Dialog closes, user stays on current page
  };

  const handleAddActivity = (activity: Omit<Activity, 'id'>, targetDay?: number) => {
    console.log('Adding activity to schedule:', activity, 'Target day:', targetDay);
    
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9), // More unique ID
      colorIndex: Math.floor(Math.random() * 4) // Random color index 0-3
    };

    const dayToUse = targetDay !== undefined ? targetDay : selectedDay;
    console.log('Adding activity to day:', dayToUse);

    setActivities(prev => {
      const dayActivities = prev[dayToUse] || [];
      return { ...prev, [dayToUse]: [...dayActivities, newActivity] };
    });
  };

  // Early return if no valid dates (while redirect is happening)
  const hasValidDates = state.dateType && (
    (state.dateType === 'single' && state.startDate) ||
    (state.dateType === 'range' && state.dateRange?.from)
  );

  if (!hasValidDates) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TripCreationCloseButton />
      
      <div className="container mx-auto px-6 py-8 pb-24">
        <ScheduleHeader />
        
        <div className="mb-8">
          <DaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <SuggestionsPanel 
              selectedDay={selectedDay} 
              onAddActivity={handleAddActivity}
              existingActivities={activities[selectedDay] || []}
            />
          </div>
          <div className="lg:col-span-3">
            <ScheduleGrid 
              selectedDay={selectedDay} 
              activities={activities}
              onUpdateActivities={setActivities}
            />
          </div>
        </div>

        {/* Add Accommodation Button - positioned higher to avoid navigation buttons */}
        <div className="fixed bottom-24 right-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              id="open-hotel-popup-button"
              onClick={() => setIsAccommodationModalOpen(true)}
              size="lg"
              className={cn(
                "h-14 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                "bg-green-100 hover:bg-green-200 text-green-800 border border-green-300"
              )}
            >
              <Hotel className="mr-2 h-5 w-5" />
              Add Accommodation
            </Button>
          </motion.div>
        </div>
      </div>

      <TripNavigationButtons
        showBack={true}
        onBack={handleBack}
        backText="← Back"
        nextText="Next → Estimate Expenses"
        onNext={handleNext}
        canProceed={true}
      />

      <AccommodationModal
        isOpen={isAccommodationModalOpen}
        onClose={() => setIsAccommodationModalOpen(false)}
        selectedDay={selectedDay}
        onAddActivity={handleAddActivity}
      />

      {/* Schedule Validation Alert Dialog */}
      <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activities Missing</AlertDialogTitle>
            <AlertDialogDescription>
              You haven't scheduled any activities for the following day(s): Day {emptyDays.join(', Day ')}.
              Would you like to continue anyway?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleGoBackToAddPlans}>
              Go Back to Add Plans
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleContinueAnyway}>
              Yes, Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ScheduleBuilderContent;
