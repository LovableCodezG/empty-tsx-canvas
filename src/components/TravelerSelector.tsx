
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Users, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface TravelerData {
  adults: number;
  children: number;
  infants: number;
}

interface TravelerSelectorProps {
  travelers: TravelerData;
  onUpdateTravelers: (travelers: TravelerData) => void;
}

const TravelerSelector = ({ travelers, onUpdateTravelers }: TravelerSelectorProps) => {
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);

  const updateTravelerCount = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
    const newTravelers = {
      ...travelers,
      [type]: Math.max(0, travelers[type] + (increment ? 1 : -1))
    };
    onUpdateTravelers(newTravelers);
  };

  const getTotalTravelers = () => {
    return travelers.adults + travelers.children + travelers.infants;
  };

  return (
    <div className="relative">
      <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 pl-12 justify-start text-left font-normal bg-white border-gray-200 focus:border-blue-600 transition-colors"
          >
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lime-500 w-5 h-5" />
            👤 {getTotalTravelers()} traveler{getTotalTravelers() !== 1 ? 's' : ''}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Adult</div>
                <div className="text-sm text-gray-500">(Age 13-99)</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateTravelerCount('adults', false)}
                  disabled={travelers.adults <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{travelers.adults}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateTravelerCount('adults', true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Children</div>
                <div className="text-sm text-gray-500">(Age 3-12)</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateTravelerCount('children', false)}
                  disabled={travelers.children <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{travelers.children}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateTravelerCount('children', true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Infant</div>
                <div className="text-sm text-gray-500">(Age 2 and younger)</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateTravelerCount('infants', false)}
                  disabled={travelers.infants <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{travelers.infants}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateTravelerCount('infants', true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              type="button"
              className="w-full text-purple-600 hover:text-purple-700"
              variant="ghost"
              onClick={() => setIsTravelersOpen(false)}
            >
              + Invite people
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { TravelerSelector };
