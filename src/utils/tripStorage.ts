
import { TripCreationState, GroupMember } from '@/contexts/TripCreationContext';

export interface SavedTrip {
  id: string;
  tripName: string;
  destination: string;
  dates: string;
  status: "Upcoming" | "In Progress" | "Completed";
  image: string;
  members: Array<{
    name: string;
    avatar: string;
    initials: string;
  }>;
  createdAt: string;
}

const TRIPS_STORAGE_KEY = 'userTrips';

export const formatDateRange = (state: TripCreationState): string => {
  if (!state.startDate) return '';
  
  const startDate = new Date(state.startDate);
  const endDate = state.endDate ? new Date(state.endDate) : null;
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const year = startDate.getFullYear();
  
  if (endDate && endDate.getTime() !== startDate.getTime()) {
    return `${formatDate(startDate)}-${formatDate(endDate)}, ${year}`;
  } else {
    return `${formatDate(startDate)}, ${year}`;
  }
};

export const getDestinationDisplayName = (state: TripCreationState): string => {
  if (state.destinationType === 'domestic') {
    return 'Domestic Trip';
  } else if (state.destinationType === 'international' && state.selectedCountry) {
    return state.selectedCountry;
  }
  return 'Unknown Destination';
};

export const getDestinationImage = (destination: string): string => {
  const imageMap: Record<string, string> = {
    'France': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&q=80',
    'Japan': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80',
    'Indonesia': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&q=80',
    'Switzerland': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
    'Italy': 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500&q=80',
  };
  
  return imageMap[destination] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=80';
};

export const convertTripCreationToSavedTrip = (state: TripCreationState): SavedTrip => {
  const destination = getDestinationDisplayName(state);
  const dates = formatDateRange(state);
  
  // Convert group members to dashboard format
  const members = state.groupMembers.map((member, index) => ({
    name: member.name,
    avatar: '/placeholder.svg',
    initials: member.name.split(' ').map(n => n[0]).join('').toUpperCase()
  }));
  
  // Add current user as first member
  const allMembers = [
    {
      name: 'You',
      avatar: '/placeholder.svg',
      initials: 'YO'
    },
    ...members
  ];
  
  return {
    id: Date.now().toString(),
    tripName: state.tripName,
    destination,
    dates,
    status: 'Upcoming',
    image: getDestinationImage(destination),
    members: allMembers,
    createdAt: new Date().toISOString()
  };
};

export const saveTrip = (trip: SavedTrip): void => {
  try {
    const existingTrips = getUserTrips();
    const updatedTrips = [trip, ...existingTrips];
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(updatedTrips));
  } catch (error) {
    console.error('Failed to save trip:', error);
  }
};

export const getUserTrips = (): SavedTrip[] => {
  try {
    const stored = localStorage.getItem(TRIPS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load trips:', error);
    return [];
  }
};

export const deleteTrip = (tripId: string): void => {
  try {
    const existingTrips = getUserTrips();
    const updatedTrips = existingTrips.filter(trip => trip.id !== tripId);
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(updatedTrips));
  } catch (error) {
    console.error('Failed to delete trip:', error);
  }
};
