
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

export interface TripCreationState {
  tripType: 'group' | 'personal' | null;
  destinationType: 'domestic' | 'international' | null;
  selectedCountry: string | null;
  groupSize: number;
  groupMembers: GroupMember[];
  currentStep: number;
  // Date-related fields
  dateType: 'single' | 'range' | null;
  startDate: Date | null;
  endDate: Date | null;
  dateRange: DateRange | undefined;
  // Backend Integration: Add these fields when implementing API
  // isLoading?: boolean;
  // error?: string | null;
  // tripId?: string; // Will be set when trip is created on backend
}

type TripCreationAction =
  | { type: 'SET_TRIP_TYPE'; payload: 'group' | 'personal' }
  | { type: 'SET_DESTINATION_TYPE'; payload: 'domestic' | 'international' }
  | { type: 'SET_SELECTED_COUNTRY'; payload: string }
  | { type: 'SET_GROUP_SIZE'; payload: number }
  | { type: 'SET_GROUP_MEMBERS'; payload: GroupMember[] }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_TRIP_DATES'; payload: { dateType: 'single' | 'range'; startDate?: Date | null; endDate?: Date | null; dateRange?: DateRange | undefined } }
  | { type: 'RESET' };
  // Backend Integration: Add these actions when implementing API
  // | { type: 'SET_LOADING'; payload: boolean }
  // | { type: 'SET_ERROR'; payload: string | null }
  // | { type: 'SET_TRIP_ID'; payload: string }

const initialState: TripCreationState = {
  tripType: null,
  destinationType: null,
  selectedCountry: null,
  groupSize: 1,
  groupMembers: [],
  currentStep: 1,
  dateType: null,
  startDate: null,
  endDate: null,
  dateRange: undefined,
};

const tripCreationReducer = (state: TripCreationState, action: TripCreationAction): TripCreationState => {
  switch (action.type) {
    case 'SET_TRIP_TYPE':
      return { 
        ...state, 
        tripType: action.payload,
        // Reset group data when switching away from group
        ...(action.payload === 'personal' && { groupSize: 1, groupMembers: [] })
      };
    case 'SET_DESTINATION_TYPE':
      return { ...state, destinationType: action.payload };
    case 'SET_SELECTED_COUNTRY':
      return { ...state, selectedCountry: action.payload };
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
