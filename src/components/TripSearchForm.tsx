
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DatePickerInput } from "./DatePickerInput";
import { TravelerSelector } from "./TravelerSelector";

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search data for backend:", {
      destination: searchData.destination,
      dateType: searchData.dateType,
      startDate: searchData.startDate?.toISOString(),
      endDate: searchData.endDate?.toISOString(),
      dateRange: searchData.dateRange ? {
        from: searchData.dateRange.from?.toISOString(),
        to: searchData.dateRange.to?.toISOString()
      } : null,
      totalTravelers: searchData.travelers.adults + searchData.travelers.children + searchData.travelers.infants,
      travelerBreakdown: searchData.travelers
    });
    // TODO: Connect to backend API endpoint for trip planning
  };

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
