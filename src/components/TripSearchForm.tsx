
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import EnhancedQuickSetupModal, { QuickSetupData } from "@/components/trips/EnhancedQuickSetupModal";
import { createTripFromSearch } from "@/utils/universalTripCreation";

// Backend Integration Comments:
// 1. Connect to search API: GET /api/search/destinations
// 2. Implement real-time destination suggestions
// 3. Add price estimation API integration
// 4. Store search history and popular destinations
// 5. Add location-based search and filtering
// 6. Implement advanced search filters (budget, duration, activities)
// 7. POST /api/trips/from-search - Create trip from search data

const TripSearchForm = () => {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("");
  const [showQuickSetup, setShowQuickSetup] = useState(false);
  const [searchData, setSearchData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination.trim()) {
      toast({
        title: "Please enter a destination",
        description: "Tell us where you'd like to go!",
        variant: "destructive"
      });
      return;
    }

    // Store search data for trip creation
    setSearchData({
      destination: destination.trim(),
      dates,
      travelers
    });

    // Backend TODO: Implement search functionality
    // const searchResults = await SearchService.searchDestinations({
    //   destination,
    //   dates,
    //   travelers
    // });

    // For now, show the quick setup modal
    setShowQuickSetup(true);
  };

  const handleQuickSetupSubmit = (setupData: QuickSetupData) => {
    try {
      // Backend TODO: Implement search-based trip creation
      // const createdTrip = createTripFromSearch({
      //   ...searchData,
      //   ...setupData
      // });
      
      console.log('Search-based trip creation:', { searchData, setupData });
      
      toast({
        title: "Trip Created!",
        description: `"${setupData.tripName}" has been added to your dashboard.`,
      });

      setShowQuickSetup(false);
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Failed to create trip from search:', error);
      toast({
        title: "Feature Coming Soon",
        description: "Search-based trip creation will be available soon!",
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
      >
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-spot-primary" />
              Where to?
            </label>
            <Input
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border-gray-200 focus:border-spot-primary"
            />
          </div>

          {/* Dates */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-spot-primary" />
              When?
            </label>
            <Input
              type="text"
              placeholder="Select dates"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="border-gray-200 focus:border-spot-primary"
            />
          </div>

          {/* Travelers */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Users className="h-4 w-4 mr-1 text-spot-primary" />
              Travelers
            </label>
            <Input
              type="text"
              placeholder="2 adults"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="border-gray-200 focus:border-spot-primary"
            />
          </div>

          {/* Search Button */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-transparent">Search</label>
            <Button
              type="submit"
              className="w-full bg-spot-primary hover:bg-spot-primary/90 text-white font-medium"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Quick Setup Modal for Search Results */}
      <EnhancedQuickSetupModal
        isOpen={showQuickSetup}
        onClose={() => setShowQuickSetup(false)}
        onSubmit={handleQuickSetupSubmit}
        premadeTripTitle={`${destination} Trip`}
        suggestedDuration="5-7 days"
      />
    </>
  );
};

export default TripSearchForm;
