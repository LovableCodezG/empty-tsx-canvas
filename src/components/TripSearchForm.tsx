
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { DatePickerInput } from "./DatePickerInput";
import { TravelerSelector } from "./TravelerSelector";
import { useTripCreation } from "@/contexts/TripCreationContext";

interface TravelerData {
  adults: number;
  children: number;
  infants: number;
}

interface SearchData {
  destination: string;
  dateType: "single" | "range";
  startDate: Date | null;
  endDate: Date | null;
  dateRange: DateRange | undefined;
  travelers: TravelerData;
}

const TripSearchForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useTripCreation();
  
  const [searchData, setSearchData] = useState<SearchData>({
    destination: "",
    dateType: "single",
    startDate: null,
    endDate: null,
    dateRange: undefined,
    travelers: {
      adults: 1,
      children: 0,
      infants: 0
    }
  });

  // NOTE: Search bar only works if the user is logged in.
  // If not logged in, redirect to login page before continuing.
  // for BOLT.new to check
  const checkUserAuthStatus = (): boolean => {
    // TODO: Implement proper authentication check
    // For now, return true to maintain current functionality
    // This should check actual user session/token
    return true;
  };

  // NOTE: This flow skips destination page if user starts planning from search bar.
  // Ensure destination and dates are stored before navigation to avoid redirect.
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    const isLoggedIn = checkUserAuthStatus();
    if (!isLoggedIn) {
      console.log("User not logged in, redirecting to login page");
      navigate('/login');
      return;
    }
    
    // Validate required fields
    if (!searchData.destination.trim()) {
      console.log("Destination is required");
      return;
    }
    
    const hasValidDates = searchData.dateType && (
      (searchData.dateType === 'single' && searchData.startDate) ||
      (searchData.dateType === 'range' && searchData.dateRange?.from)
    );
    
    if (!hasValidDates) {
      console.log("Valid dates are required");
      return;
    }

    const totalTravelers = searchData.travelers.adults + searchData.travelers.children + searchData.travelers.infants;
    
    console.log("Search data for trip creation:", {
      destination: searchData.destination,
      dateType: searchData.dateType,
      startDate: searchData.startDate?.toISOString(),
      endDate: searchData.endDate?.toISOString(),
      dateRange: searchData.dateRange ? {
        from: searchData.dateRange.from?.toISOString(),
        to: searchData.dateRange.to?.toISOString()
      } : null,
      totalTravelers,
      travelerBreakdown: searchData.travelers
    });

    // Populate trip creation context with search data BEFORE navigation
    dispatch({
      type: 'POPULATE_FROM_SEARCH',
      payload: {
        destination: searchData.destination,
        dateType: searchData.dateType,
        startDate: searchData.startDate,
        endDate: searchData.endDate,
        dateRange: searchData.dateRange,
        totalTravelers
      }
    });

    console.log("Context populated, navigating to schedule page...");

    // Small delay to ensure context is updated before navigation
    setTimeout(() => {
      navigate('/create-trip/schedule');
    }, 100);
  }, [searchData, dispatch, navigate]);

  const updateSearchData = (updates: Partial<SearchData>) => {
    setSearchData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="relative z-20 -mt-40">
      <div className="max-w-5xl mx-auto">
        <Card className="p-6 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Destination Input */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lime-500 w-5 h-5" />
              <Input 
                placeholder="🇧🇭 Bahrain"
                value={searchData.destination}
                onChange={(e) => updateSearchData({ destination: e.target.value })}
                className="pl-12 h-12 bg-white border-gray-200 focus:border-blue-600 transition-colors"
                required
              />
            </div>

            <DatePickerInput 
              searchData={searchData}
              onUpdateSearchData={updateSearchData}
            />

            <TravelerSelector 
              travelers={searchData.travelers}
              onUpdateTravelers={(travelers) => updateSearchData({ travelers })}
            />

            {/* Submit Button */}
            <Button 
              type="submit"
              className="h-12 bg-lime-400 hover:bg-lime-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Plan your trip
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TripSearchForm;
