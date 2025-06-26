
import { TripCreationState } from '@/contexts/TripCreationContext';
import { convertTripCreationToSavedTrip, saveTrip, SavedTrip } from '@/utils/tripStorage';

export interface PremadeTripData {
  id: string;
  slug: string;
  title: string;
  country: string;
  isInternational: boolean;
  category: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  description: string;
  maxGroupSize: number;
  detailedDescription: string;
  inclusions: string[];
  exclusions: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    activities: string[];
  }>;
}

export interface QuickSetupData {
  tripType: 'group' | 'personal';
  groupSize: number;
  startDate: Date;
  endDate?: Date;
  tripName: string;
}

export const convertPremadeTripToCreationState = (
  premadeTrip: PremadeTripData, 
  setupData: QuickSetupData
): TripCreationState => {
  // Convert itinerary to schedule activities
  const scheduleActivities: Record<number, any[]> = {};
  
  if (premadeTrip.itinerary) {
    premadeTrip.itinerary.forEach((day) => {
      scheduleActivities[day.day] = day.activities.map((activity, index) => ({
        id: `${day.day}-${index}`,
        name: activity,
        startTime: index === 0 ? '09:00' : `${9 + index * 2}:00`,
        duration: 120, // 2 hours default
        category: 'sightseeing' as const,
        notes: '',
        colorIndex: index % 5
      }));
    });
  }

  return {
    tripType: setupData.tripType,
    destinationType: premadeTrip.isInternational ? 'international' : 'domestic',
    selectedCountry: premadeTrip.isInternational ? premadeTrip.country : null,
    tripName: setupData.tripName,
    groupSize: setupData.groupSize,
    groupMembers: [],
    currentStep: 6, // Final step
    dateType: setupData.endDate ? 'range' : 'single',
    startDate: setupData.startDate,
    endDate: setupData.endDate || null,
    dateRange: setupData.endDate ? {
      from: setupData.startDate,
      to: setupData.endDate
    } : undefined,
    transportMode: 'skip',
    rentalCostPerDay: null,
    userBudget: setupData.tripType === 'personal' ? premadeTrip.price : null,
    groupBudgetPerHead: setupData.tripType === 'group' ? premadeTrip.price : null,
    transportCosts: [],
    fuelCost: null,
    foodCosts: [],
    hotelTotalCost: Math.round(premadeTrip.price * 0.4), // Estimate 40% for accommodation
    hotelPerNight: null,
    hotelPerHead: null,
    flightCost: premadeTrip.isInternational ? Math.round(premadeTrip.price * 0.3) : null,
    visaInsuranceCost: premadeTrip.isInternational ? 200 : null,
    activitiesCost: Math.round(premadeTrip.price * 0.3), // Estimate 30% for activities
    miscCost: null,
    scheduleActivities,
    checklistItems: [
      { id: '1', text: 'Check passport validity', completed: false },
      { id: '2', text: 'Book flights', completed: false },
      { id: '3', text: 'Arrange travel insurance', completed: false },
      { id: '4', text: 'Pack essentials', completed: false }
    ]
  };
};

export const createTripFromPremade = (
  premadeTrip: PremadeTripData,
  setupData: QuickSetupData
): SavedTrip => {
  const tripCreationState = convertPremadeTripToCreationState(premadeTrip, setupData);
  const savedTrip = convertTripCreationToSavedTrip(tripCreationState);
  
  // Enhanced saved trip with premade trip reference
  const enhancedTrip: SavedTrip = {
    ...savedTrip,
    id: Date.now().toString(),
    tripName: setupData.tripName,
    destination: premadeTrip.country,
    image: premadeTrip.image,
    createdAt: new Date().toISOString()
  };
  
  // Save to storage
  saveTrip(enhancedTrip);
  
  return enhancedTrip;
};

export const createTripFromSearch = (searchData: any): SavedTrip => {
  // Backend TODO: Implement search-based trip creation
  // This would convert search form data to trip creation state
  console.log('Search-based trip creation not implemented yet', searchData);
  throw new Error('Search-based trip creation not implemented');
};
