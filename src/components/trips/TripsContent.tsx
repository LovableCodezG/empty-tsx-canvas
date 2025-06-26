
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Tiles } from "@/components/ui/tiles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PremadeTripCard from "@/components/trips/PremadeTripCard";
import tripsData from "@/data/trips.json";

// Backend Integration Comments:
// 1. Replace tripsData import with API call to fetch trips
// 2. Add pagination support for large datasets
// 3. Implement search functionality with backend filtering
// 4. Add sorting options (price, rating, duration)
// 5. Cache trip data for better performance
// 6. Implement user favorites/wishlist functionality
// 7. Add analytics tracking for trip views and interactions

// Ideal API Endpoints:
// GET /api/trips?page=1&limit=12&search=&location=&category=
// GET /api/trips/featured
// POST /api/trips/:id/favorite
// GET /api/trips/:id/related

interface Trip {
  id: string;
  slug: string;
  title: string;
  country: string;
  isInternational: boolean;
  category: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  description: string;
  maxGroupSize: number;
}

const TripsContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");

  // Backend TODO: Replace with API call
  const trips: Trip[] = tripsData.trips;

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === "All" || 
                           (selectedLocation === "Domestic" && !trip.isInternational) ||
                           (selectedLocation === "International" && trip.isInternational);
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Background Tiles */}
      <div className="absolute inset-0 overflow-hidden">
        <Tiles 
          rows={50} 
          cols={8}
          tileSize="md"
          className="opacity-30"
        />
      </div>

      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto px-6 py-8">
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Amazing Trips</h1>
            <p className="text-gray-600">Choose from our carefully curated travel experiences around the world</p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search trips, destinations, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["All", "Domestic", "International"].map((location) => (
                <Button
                  key={location}
                  variant={selectedLocation === location ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLocation(location)}
                  className="whitespace-nowrap"
                >
                  {location}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-6"
          >
            <p className="text-sm text-gray-600">
              {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {/* Trips Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <PremadeTripCard trip={trip} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* No results */}
          {filteredTrips.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <MapPin className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No trips found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripsContent;
