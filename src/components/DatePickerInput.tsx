
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface SearchData {
  destination: string;
  dateType: "single" | "range";
  startDate: Date | null;
  endDate: Date | null;
  dateRange: DateRange | undefined;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
}

interface DatePickerInputProps {
  searchData: SearchData;
  onUpdateSearchData: (updates: Partial<SearchData>) => void;
}

const DatePickerInput = ({ searchData, onUpdateSearchData }: DatePickerInputProps) => {
  const [isDateOpen, setIsDateOpen] = useState(false);

  const handleSingleDateSelect = (date: Date | undefined) => {
    onUpdateSearchData({
      startDate: date || null,
      endDate: null,
      dateRange: undefined
    });
  };

  const handleRangeDateSelect = (dateRange: DateRange | undefined) => {
    onUpdateSearchData({
      dateRange: dateRange,
      startDate: null,
      endDate: null
    });
  };

  const getDateDisplayText = () => {
    if (searchData.dateType === "single") {
      return searchData.startDate ? format(searchData.startDate, "🗓️ MMM dd") : "🗓️ Jun 16";
    } else {
      if (searchData.dateRange?.from) {
        if (searchData.dateRange.to) {
          return `🗓️ ${format(searchData.dateRange.from, "MMM dd")} - ${format(searchData.dateRange.to, "MMM dd")}`;
        }
        return `🗓️ ${format(searchData.dateRange.from, "MMM dd")} - ?`;
      }
      return "🗓️ Select dates";
    }
  };

  return (
    <div className="relative">
      <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-12 pl-12 justify-start text-left font-normal bg-white border-gray-200 focus:border-blue-600 transition-colors",
              !searchData.startDate && !searchData.dateRange?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lime-500 w-5 h-5" />
            {getDateDisplayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 border-b">
            <RadioGroup
              value={searchData.dateType}
              onValueChange={(value: "single" | "range") => 
                onUpdateSearchData({
                  dateType: value,
                  startDate: null,
                  endDate: null,
                  dateRange: undefined
                })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single">Single day</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="range" id="range" />
                <Label htmlFor="range">Date range</Label>
              </div>
            </RadioGroup>
          </div>
          {searchData.dateType === "single" ? (
            <Calendar
              mode="single"
              selected={searchData.startDate}
              onSelect={handleSingleDateSelect}
              initialFocus
              className="pointer-events-auto"
            />
          ) : (
            <Calendar
              mode="range"
              selected={searchData.dateRange}
              onSelect={handleRangeDateSelect}
              initialFocus
              className="pointer-events-auto"
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { DatePickerInput };
