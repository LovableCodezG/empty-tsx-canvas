
import React, { useState } from 'react';
import { Hotel, Star, MapPin, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AccommodationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: number;
}

const AccommodationModal = ({ isOpen, onClose, selectedDay }: AccommodationModalProps) => {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);

  // Dummy hotel data - To be hooked to Hotel API later
  const hotels = [
    {
      id: '1',
      name: 'The Plaza Hotel',
      rating: 4.8,
      location: 'Midtown Manhattan',
      image: '/placeholder.svg',
      bookingUrl: 'https://booking.com'
    },
    {
      id: '2',
      name: 'The High Line Hotel',
      rating: 4.6,
      location: 'Chelsea',
      image: '/placeholder.svg',
      bookingUrl: 'https://booking.com'
    },
    {
      id: '3',
      name: 'Pod Hotel Times Square',
      rating: 4.4,
      location: 'Times Square',
      image: '/placeholder.svg',
      bookingUrl: 'https://booking.com'
    }
  ];

  const handleBookingSite = (hotelId: string, url: string) => {
    setSelectedHotel(hotelId);
    window.open(url, '_blank');
  };

  const handleAddToSchedule = (hotelId: string) => {
    console.log(`Adding hotel ${hotelId} to schedule for Day ${selectedDay + 1}`);
    // TODO: Open check-in/out time picker modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hotel className="h-5 w-5 text-spot-primary" />
            Add Accommodation
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
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBookingSite(hotel.id, hotel.bookingUrl)}
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Visit Booking Site
                    </Button>
                    {selectedHotel === hotel.id && (
                      <Button
                        size="sm"
                        onClick={() => handleAddToSchedule(hotel.id)}
                        className="bg-spot-primary hover:bg-spot-primary/90"
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
