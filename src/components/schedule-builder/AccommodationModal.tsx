
import React, { useState } from 'react';
import { Hotel, Star, MapPin, ExternalLink, Calendar, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

interface AccommodationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: number;
}

const AccommodationModal = ({ isOpen, onClose, selectedDay }: AccommodationModalProps) => {
  const [bookedHotels, setBookedHotels] = useState<Set<string>>(new Set());
  const [showScheduleForm, setShowScheduleForm] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [checkInTime, setCheckInTime] = useState('15:00');
  const [checkOutTime, setCheckOutTime] = useState('11:00');
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const [breakfastStartTime, setBreakfastStartTime] = useState('08:00');
  const [breakfastEndTime, setBreakfastEndTime] = useState('09:00');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Dummy hotel data
  const hotels = [
    {
      id: '1',
      name: 'The Plaza Hotel',
      rating: 4.8,
      location: 'Midtown Manhattan',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop',
      bookingUrl: 'https://booking.com'
    },
    {
      id: '2',
      name: 'The High Line Hotel',
      rating: 4.6,
      location: 'Chelsea',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop',
      bookingUrl: 'https://booking.com'
    },
    {
      id: '3',
      name: 'Pod Hotel Times Square',
      rating: 4.4,
      location: 'Times Square',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
      bookingUrl: 'https://booking.com'
    }
  ];

  const handleBookNow = (hotelId: string, url: string) => {
    setBookedHotels(prev => new Set([...prev, hotelId]));
    window.open(url, '_blank');
  };

  const handleAddToSchedule = (hotelId: string) => {
    setShowScheduleForm(hotelId);
  };

  const handleConfirmSchedule = () => {
    console.log('Adding to schedule:', {
      hotelId: showScheduleForm,
      dateRange,
      checkInTime,
      checkOutTime,
      includeBreakfast,
      breakfastTiming: includeBreakfast ? `${breakfastStartTime} - ${breakfastEndTime}` : null
    });
    
    // Reset form and close
    setShowScheduleForm(null);
    setDateRange(undefined);
    setIncludeBreakfast(false);
    onClose();
  };

  const getDateDisplayText = () => {
    if (dateRange?.from) {
      if (dateRange.to) {
        return `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`;
      }
      return `${format(dateRange.from, "MMM dd")} - ?`;
    }
    return "Select dates";
  };

  if (showScheduleForm) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Hotel className="h-5 w-5 text-spot-primary" />
              Schedule Accommodation
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Date Range Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Stay Dates</label>
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange?.from && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {getDateDisplayText()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-in/Check-out Times */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-in Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-out Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="time"
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Optional Breakfast */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="breakfast"
                  checked={includeBreakfast}
                  onCheckedChange={setIncludeBreakfast}
                />
                <label htmlFor="breakfast" className="text-sm font-medium">
                  Optional Breakfast
                </label>
              </div>

              {includeBreakfast && (
                <div className="ml-6 space-y-2">
                  <label className="text-sm font-medium">Breakfast Timing</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="time"
                      value={breakfastStartTime}
                      onChange={(e) => setBreakfastStartTime(e.target.value)}
                      placeholder="Start time"
                    />
                    <Input
                      type="time"
                      value={breakfastEndTime}
                      onChange={(e) => setBreakfastEndTime(e.target.value)}
                      placeholder="End time"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowScheduleForm(null)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleConfirmSchedule}
                className="flex-1 bg-spot-primary hover:bg-spot-primary/90"
                disabled={!dateRange?.from}
              >
                Add to Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hotel className="h-5 w-5 text-spot-primary" />
            Hotel Recommendations
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-spot-primary/50 transition-colors"
            >
              <div className="flex gap-4">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-24 h-24 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {!bookedHotels.has(hotel.id) ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBookNow(hotel.id, hotel.bookingUrl)}
                        className="flex items-center gap-1 w-fit"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Book Now
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleAddToSchedule(hotel.id)}
                        className="bg-spot-primary hover:bg-spot-primary/90 w-fit"
                      >
                        Add to Schedule
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccommodationModal;
