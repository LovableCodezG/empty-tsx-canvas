
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DateRange } from "react-day-picker";

// Backend Integration Notes for bolt.new:
// 1. This context manages trip creation state on the frontend
// 2. When ready to connect backend, add API calls to:
//    - POST /api/trips - to create new trip
//    - POST /api/trips/{id}/members - to add group members
//    - GET /api/countries - to fetch countries list
// 3. Consider adding validation schema with Zod for API requests
// 4. Add loading states and error handling for API calls

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  // Backend Note: Add userId field when user authentication is implemented
  // userId?: string;
}

export interface TransportLeg {
  from: string;
  to: string;
  distance: string;
  estimatedFare: number;
}

export interface MealCost {
  restaurantName: string;
  priceLevel: '$' | '$$' | '$$$';
  estimatedCost: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Activity {
  id: string;
  name: string;
  startTime: string;
  duration: number;
  category: 'meal' | 'sightseeing' | 'transportation' | 'accommodation' | 'other';
  notes?: string;
  colorIndex?: number;
}

export interface TripCreationState {
  tripType: 'group' | 'personal' | null;
  destinationType: 'domestic' | 'international' | null;
  selectedCountry: string | null;
  tripName: string;
  groupSize: number;
  groupMembers: GroupMember[];
  currentStep: number;
  // Date-related fields
  dateType: 'single' | 'range' | null;
  startDate: Date | null;
  endDate: Date | null;
  dateRange: DateRange | undefined;
  // Search flow handling
  fromSearchFlow: boolean;
  // Transport-related fields
  transportMode: 'skip' | 'uber' | 'rental' | null;
  rentalCostPerDay: number | null;
  // Expense-related fields
  userBudget: number | null;
  groupBudgetPerHead: number | null;
  transportCosts: TransportLeg[];
  fuelCost: number | null;
  foodCosts: MealCost[];
  hotelTotalCost: number | null;
  hotelPerNight: number | null;
  hotelPerHead: number | null;
  flightCost: number | null;
  visaInsuranceCost: number | null;
  activitiesCost: number | null;
  miscCost: number | null;
  // Schedule-related fields
  scheduleActivities: Record<number, Activity[]>;
  // Overview-related fields
  checklistItems: ChecklistItem[];
  // Backend Integration: Add these fields when implementing API
  // isLoading?: boolean;
  // error?: string | null;
  // tripId?: string; // Will be set when trip is created on backend
}

type TripCreationAction =
  | { type: 'SET_TRIP_TYPE'; payload: 'group' | 'personal' }
  | { type: 'SET_DESTINATION_TYPE'; payload: 'domestic' | 'international' }
  | { type: 'SET_SELECTED_COUNTRY'; payload: string }
  | { type: 'SET_TRIP_NAME'; payload: string }
  | { type: 'SET_GROUP_SIZE'; payload: number }
  | { type: 'SET_GROUP_MEMBERS'; payload: GroupMember[] }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_TRIP_DATES'; payload: { dateType: 'single' | 'range'; startDate?: Date | null; endDate?: Date | null; dateRange?: DateRange | undefined } }
  | { type: 'SET_FROM_SEARCH_FLOW'; payload: boolean }
  | { type: 'SET_TRANSPORT_MODE'; payload: 'skip' | 'uber' | 'rental' }
  | { type: 'SET_RENTAL_COST_PER_DAY'; payload: number | null }
  | { type: 'SET_USER_BUDGET'; payload: number | null }
  | { type: 'SET_GROUP_BUDGET_PER_HEAD'; payload: number | null }
  | { type: 'SET_TRANSPORT_COSTS'; payload: TransportLeg[] }
  | { type: 'SET_FUEL_COST'; payload: number | null }
  | { type: 'SET_FOOD_COSTS'; payload: MealCost[] }
  | { type: 'SET_HOTEL_TOTAL_COST'; payload: number | null }
  | { type: 'SET_HOTEL_PER_NIGHT'; payload: number | null }
  | { type: 'SET_HOTEL_PER_HEAD'; payload: number | null }
  | { type: 'SET_FLIGHT_COST'; payload: number | null }
  | { type: 'SET_VISA_INSURANCE_COST'; payload: number | null }
  | { type: 'SET_ACTIVITIES_COST'; payload: number | null }
  | { type: 'SET_MISC_COST'; payload: number | null }
  | { type: 'SET_SCHEDULE_ACTIVITIES'; payload: Record<number, Activity[]> }
  | { type: 'SET_CHECKLIST_ITEMS'; payload: ChecklistItem[] }
  | { type: 'POPULATE_FROM_SEARCH'; payload: { destination: string; dateType: 'single' | 'range'; startDate?: Date | null; endDate?: Date | null; dateRange?: DateRange | undefined; totalTravelers: number } }
  | { type: 'RESET' };
  // Backend Integration: Add these actions when implementing API
  // | { type: 'SET_LOADING'; payload: boolean }
  // | { type: 'SET_ERROR'; payload: string | null }
  // | { type: 'SET_TRIP_ID'; payload: string }

const initialState: TripCreationState = {
  tripType: null,
  destinationType: null,
  selectedCountry: null,
  tripName: '',
  groupSize: 2,
  groupMembers: [],
  currentStep: 1,
  dateType: null,
  startDate: null,
  endDate: null,
  dateRange: undefined,
  fromSearchFlow: false,
  transportMode: null,
  rentalCostPerDay: null,
  userBudget: null,
  groupBudgetPerHead: null,
  transportCosts: [],
  fuelCost: null,
  foodCosts: [],
  hotelTotalCost: null,
  hotelPerNight: null,
  hotelPerHead: null,
  flightCost: null,
  visaInsuranceCost: null,
  activitiesCost: null,
  miscCost: null,
  scheduleActivities: {},
  checklistItems: [],
};

// Helper function to determine if destination is international
const isInternationalDestination = (destination: string): boolean => {
  // Simple check - if destination contains country indicators or non-domestic patterns
  const internationalIndicators = ['🇧🇭', '🇫🇷', '🇮🇹', '🇯🇵', '🇬🇧', '🇺🇸', '🇦🇺', '🇨🇦', '🇩🇪', '🇪🇸'];
  return internationalIndicators.some(indicator => destination.includes(indicator)) ||
         destination.toLowerCase().includes('bahrain') ||
         destination.toLowerCase().includes('france') ||
         destination.toLowerCase().includes('italy') ||
         destination.toLowerCase().includes('japan') ||
         destination.toLowerCase().includes('uk') ||
         destination.toLowerCase().includes('england') ||
         destination.toLowerCase().includes('germany') ||
         destination.toLowerCase().includes('spain');
};

// Helper function to extract country name from destination
const extractCountryFromDestination = (destination: string): string => {
  if (destination.includes('🇧🇭') || destination.toLowerCase().includes('bahrain')) return 'Bahrain';
  if (destination.includes('🇫🇷') || destination.toLowerCase().includes('france')) return 'France';
  if (destination.includes('🇮🇹') || destination.toLowerCase().includes('italy')) return 'Italy';
  if (destination.includes('🇯🇵') || destination.toLowerCase().includes('japan')) return 'Japan';
  if (destination.includes('🇬🇧') || destination.toLowerCase().includes('uk') || destination.toLowerCase().includes('england')) return 'United Kingdom';
  if (destination.includes('🇺🇸') || destination.toLowerCase().includes('usa') || destination.toLowerCase().includes('america')) return 'United States';
  if (destination.includes('🇦🇺') || destination.toLowerCase().includes('australia')) return 'Australia';
  if (destination.includes('🇨🇦') || destination.toLowerCase().includes('canada')) return 'Canada';
  if (destination.includes('🇩🇪') || destination.toLowerCase().includes('germany')) return 'Germany';
  if (destination.includes('🇪🇸') || destination.toLowerCase().includes('spain')) return 'Spain';
  
  // Default fallback - extract text after flag or return as-is
  return destination.replace(/🇧🇭|🇫🇷|🇮🇹|🇯🇵|🇬🇧|🇺🇸|🇦🇺|🇨🇦|🇩🇪|🇪🇸/g, '').trim() || destination;
};

const tripCreationReducer = (state: TripCreationState, action: TripCreationAction): TripCreationState => {
  switch (action.type) {
    case 'SET_TRIP_TYPE':
      return { 
        ...state, 
        tripType: action.payload,
        // Set default group size to 2 when switching to group, reset to 1 for personal
        groupSize: action.payload === 'group' ? 2 : 1,
        // Reset group data when switching away from group
        ...(action.payload === 'personal' && { groupMembers: [] })
      };
    case 'SET_DESTINATION_TYPE':
      return { ...state, destinationType: action.payload };
    case 'SET_SELECTED_COUNTRY':
      return { ...state, selectedCountry: action.payload };
    case 'SET_TRIP_NAME':
      return { ...state, tripName: action.payload };
    case 'SET_GROUP_SIZE':
      return { ...state, groupSize: action.payload };
    case 'SET_GROUP_MEMBERS':
      return { ...state, groupMembers: action.payload };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_TRIP_DATES':
      return { 
        ...state, 
        dateType: action.payload.dateType,
        startDate: action.payload.startDate !== undefined ? action.payload.startDate : state.startDate,
        endDate: action.payload.endDate !== undefined ? action.payload.endDate : state.endDate,
        dateRange: action.payload.dateRange !== undefined ? action.payload.dateRange : state.dateRange,
      };
    case 'SET_FROM_SEARCH_FLOW':
      return { ...state, fromSearchFlow: action.payload };
    case 'SET_TRANSPORT_MODE':
      return { 
        ...state, 
        transportMode: action.payload,
        // Reset rental cost when switching away from rental
        ...(action.payload !== 'rental' && { rentalCostPerDay: null })
      };
    case 'SET_RENTAL_COST_PER_DAY':
      return { ...state, rentalCostPerDay: action.payload };
    case 'SET_USER_BUDGET':
      return { ...state, userBudget: action.payload };
    case 'SET_GROUP_BUDGET_PER_HEAD':
      return { ...state, groupBudgetPerHead: action.payload };
    case 'SET_TRANSPORT_COSTS':
      return { ...state, transportCosts: action.payload };
    case 'SET_FUEL_COST':
      return { ...state, fuelCost: action.payload };
    case 'SET_FOOD_COSTS':
      return { ...state, foodCosts: action.payload };
    case 'SET_HOTEL_TOTAL_COST':
      return { ...state, hotelTotalCost: action.payload };
    case 'SET_HOTEL_PER_NIGHT':
      return { ...state, hotelPerNight: action.payload };
    case 'SET_HOTEL_PER_HEAD':
      return { ...state, hotelPerHead: action.payload };
    case 'SET_FLIGHT_COST':
      return { ...state, flightCost: action.payload };
    case 'SET_VISA_INSURANCE_COST':
      return { ...state, visaInsuranceCost: action.payload };
    case 'SET_ACTIVITIES_COST':
      return { ...state, activitiesCost: action.payload };
    case 'SET_MISC_COST':
      return { ...state, miscCost: action.payload };
    case 'SET_SCHEDULE_ACTIVITIES':
      return { ...state, scheduleActivities: action.payload };
    case 'SET_CHECKLIST_ITEMS':
      return { ...state, checklistItems: action.payload };
    case 'POPULATE_FROM_SEARCH':
      const { destination, dateType, startDate, endDate, dateRange, totalTravelers } = action.payload;
      const isInternational = isInternationalDestination(destination);
      
      return {
        ...state,
        // Destination settings
        destinationType: isInternational ? 'international' : 'domestic',
        selectedCountry: isInternational ? extractCountryFromDestination(destination) : null,
        // Trip type based on travelers
        tripType: totalTravelers > 1 ? 'group' : 'personal',
        groupSize: totalTravelers,
        // Date settings
        dateType,
        startDate,
        endDate,
        dateRange,
        // Mark as coming from search flow
        fromSearchFlow: true,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

interface TripCreationContextType {
  state: TripCreationState;
  dispatch: React.Dispatch<TripCreationAction>;
  // Backend Integration: Add these methods when implementing API
  // createTrip: () => Promise<void>;
  // updateTrip: () => Promise<void>;
  // saveGroupMembers: () => Promise<void>;
}

const TripCreationContext = createContext<TripCreationContextType | undefined>(undefined);

export const TripCreationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tripCreationReducer, initialState);

  // Backend Integration: Implement these functions when connecting to API
  // const createTrip = async () => {
  //   try {
  //     dispatch({ type: 'SET_LOADING', payload: true });
  //     const response = await fetch('/api/trips', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         tripType: state.tripType,
  //         destinationType: state.destinationType,
  //         selectedCountry: state.selectedCountry,
  //         groupSize: state.groupSize,
  //         groupMembers: state.groupMembers,
  //         dateType: state.dateType,
  //         startDate: state.startDate,
  //         endDate: state.endDate,
  //         dateRange: state.dateRange
  //       })
  //     });
  //     const data = await response.json();
  //     dispatch({ type: 'SET_TRIP_ID', payload: data.id });
  //   } catch (error) {
  //     dispatch({ type: 'SET_ERROR', payload: error.message });
  //   } finally {
  //     dispatch({ type: 'SET_LOADING', payload: false });
  //   }
  // };

  return (
    <TripCreationContext.Provider value={{ state, dispatch }}>
      {children}
    </TripCreationContext.Provider>
  );
};

export const useTripCreation = () => {
  const context = useContext(TripCreationContext);
  if (context === undefined) {
    throw new Error('useTripCreation must be used within a TripCreationProvider');
  }
  return context;
};
