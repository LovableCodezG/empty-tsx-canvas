
import { SavedTrip } from '@/utils/tripStorage';
import { TripCreationState } from '@/contexts/TripCreationContext';

export const convertSavedTripToCreationState = (savedTrip: SavedTrip): TripCreationState => {
  // Parse dates from the saved trip
  const today = new Date();
  const startDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Default to next week
  
  // Determine if it's international based on destination
  const isInternational = !['Domestic Trip'].includes(savedTrip.destination);
  
  return {
    tripType: savedTrip.members.length > 1 ? 'group' : 'personal',
    destinationType: isInternational ? 'international' : 'domestic',
    selectedCountry: isInternational ? savedTrip.destination : null,
    tripName: savedTrip.tripName,
    groupSize: savedTrip.members.length,
    groupMembers: savedTrip.members.slice(1).map((member, index) => ({
      id: `member-${index}`,
      name: member.name,
      email: `${member.name.toLowerCase().replace(' ', '.')}@example.com`
    })),
    currentStep: 6, // Overview step
    dateType: 'range',
    startDate,
    endDate: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000), // Week-long trip
    dateRange: {
      from: startDate,
      to: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    },
    transportMode: 'skip',
    rentalCostPerDay: null,
    userBudget: savedTrip.members.length === 1 ? 2000 : null,
    groupBudgetPerHead: savedTrip.members.length > 1 ? 2000 : null,
    transportCosts: [],
    fuelCost: null,
    foodCosts: [],
    hotelTotalCost: 800,
    hotelPerNight: null,
    hotelPerHead: null,
    flightCost: isInternational ? 600 : null,
    visaInsuranceCost: isInternational ? 200 : null,
    activitiesCost: 400,
    miscCost: null,
    scheduleActivities: {},
    checklistItems: [
      { id: '1', text: 'Check passport validity', completed: false },
      { id: '2', text: 'Book flights', completed: false },
      { id: '3', text: 'Arrange travel insurance', completed: false },
      { id: '4', text: 'Pack essentials', completed: false }
    ]
  };
};
