
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Utensils, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import PlaceSuggestionCard from './PlaceSuggestionCard';
import AccommodationModal from './AccommodationModal';

interface SuggestionsPanelProps {
  selectedDay: number;
}

const SuggestionsPanel = ({ selectedDay }: SuggestionsPanelProps) => {
  const [activeTab, setActiveTab] = useState<'places' | 'restaurants'>('places');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);

  // Dummy data - To be connected to Google Places API
  const placesData = [
    {
      id: '1',
      name: 'Central Park',
      rating: 4.6,
      distance: '2.1 km',
      image: '/placeholder.svg',
      type: 'park'
    },
    {
      id: '2',
      name: 'Museum of Modern Art',
      rating: 4.5,
      distance: '1.8 km',
      image: '/placeholder.svg',
      type: 'museum'
    },
    {
      id: '3',
      name: 'Times Square',
      rating: 4.3,
      distance: '3.2 km',
      image: '/placeholder.svg',
      type: 'landmark'
    }
  ];

  const restaurantsData = [
    {
      id: '4',
      name: 'The Plaza Food Hall',
      rating: 4.4,
      distance: '1.5 km',
      image: '/placeholder.svg',
      type: 'restaurant'
    },
    {
      id: '5',
      name: 'Katz\'s Delicatessen',
      rating: 4.7,
      distance: '4.1 km',
      image: '/placeholder.svg',
      type: 'restaurant'
    }
  ];

  const currentData = activeTab === 'places' ? placesData : restaurantsData;
  const filteredData = currentData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showCustomPlaceMessage = searchQuery && filteredData.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-fit max-h-[600px] flex flex-col"
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'places' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('places')}
          className={cn(
            "flex items-center gap-2",
            activeTab === 'places' 
              ? "bg-spot-primary hover:bg-spot-primary/90" 
              : ""
          )}
        >
          <MapPin className="h-4 w-4" />
          Places
        </Button>
        <Button
          variant={activeTab === 'restaurants' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('restaurants')}
          className={cn(
            "flex items-center gap-2",
            activeTab === 'restaurants' 
              ? "bg-spot-primary hover:bg-spot-primary/90" 
              : ""
          )}
        >
          <Utensils className="h-4 w-4" />
          Restaurants
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Suggestions List */}
      <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
        {filteredData.map((place) => (
          <PlaceSuggestionCard
            key={place.id}
            place={place}
            selectedDay={selectedDay}
          />
        ))}
        
        {showCustomPlaceMessage && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-3">No results found</p>
            <Button
              variant="link"
              className="text-spot-primary hover:text-spot-primary/90"
              onClick={() => console.log('Open custom place modal')}
            >
              Can't find it? Add a custom place to your schedule.
            </Button>
          </div>
        )}
      </div>

      {/* Add Accommodation Button */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button
          id="open-hotel-popup-button"
          variant="outline"
          className="w-full flex items-center gap-2 hover:bg-spot-beige"
          onClick={() => setShowAccommodationModal(true)}
        >
          <Hotel className="h-4 w-4" />
          🏨 Add Accommodation
        </Button>
      </div>

      <AccommodationModal
        isOpen={showAccommodationModal}
        onClose={() => setShowAccommodationModal(false)}
        selectedDay={selectedDay}
      />
    </motion.div>
  );
};

export default SuggestionsPanel;
