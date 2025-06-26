
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, User } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

export interface QuickSetupData {
  tripType: 'group' | 'personal';
  groupSize: number;
  startDate: Date;
  endDate?: Date;
  tripName: string;
}

interface EnhancedQuickSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuickSetupData) => void;
  premadeTripTitle: string;
  suggestedDuration: string;
}

const EnhancedQuickSetupModal = ({
  isOpen,
  onClose,
  onSubmit,
  premadeTripTitle,
  suggestedDuration
}: EnhancedQuickSetupModalProps) => {
  const [tripType, setTripType] = useState<'group' | 'personal'>('personal');
  const [groupSize, setGroupSize] = useState(2);
  const [tripName, setTripName] = useState(`My ${premadeTripTitle}`);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateRange?.from || !tripName.trim()) {
      return;
    }

    onSubmit({
      tripType,
      groupSize: tripType === 'personal' ? 1 : groupSize,
      startDate: dateRange.from,
      endDate: dateRange.to,
      tripName: tripName.trim()
    });
  };

  const isFormValid = dateRange?.from && tripName.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Your Trip</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Name */}
          <div className="space-y-2">
            <Label htmlFor="tripName">Trip Name</Label>
            <Input
              id="tripName"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="Enter trip name"
              className="w-full"
            />
          </div>

          {/* Trip Type */}
          <div className="space-y-3">
            <Label>Trip Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={tripType === 'personal' ? 'default' : 'outline'}
                onClick={() => setTripType('personal')}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Solo Trip
              </Button>
              <Button
                type="button"
                variant={tripType === 'group' ? 'default' : 'outline'}
                onClick={() => setTripType('group')}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Group Trip
              </Button>
            </div>
          </div>

          {/* Group Size */}
          {tripType === 'group' && (
            <div className="space-y-2">
              <Label htmlFor="groupSize">Group Size</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setGroupSize(Math.max(2, groupSize - 1))}
                  disabled={groupSize <= 2}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{groupSize}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setGroupSize(Math.min(12, groupSize + 1))}
                  disabled={groupSize >= 12}
                >
                  +
                </Button>
              </div>
            </div>
          )}

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Travel Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick travel dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-gray-500">
              Suggested duration: {suggestedDuration}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 bg-spot-primary hover:bg-spot-primary/90"
            >
              Create Trip
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedQuickSetupModal;
