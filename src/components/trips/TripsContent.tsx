
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Star, Clock, Users } from "lucide-react";
import { Tiles } from "@/components/ui/tiles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PremadeTripCard from "@/components/trips/PremadeTripCard";

interface PremadeTrip {
  id: string;
  title: string;
  country: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  description: string;
  maxGroupSize: number;
}

const premadeTrips: PremadeTrip[] = [
  {
    id: "1",
    title: "Romantic Paris Getaway",
    country: "France",
    duration: "5 days",
    difficulty: "Easy",
    price: 1299,
    rating: 4.8,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&q=80",
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise", "Montmartre"],
    description: "Experience the magic of Paris with visits to iconic landmarks and romantic spots.",
    maxGroupSize: 12
  },
  {
    id: "2",
    title: "Tokyo Culture & Cuisine",
    country: "Japan",
    duration: "7 days",
    difficulty: "Moderate",
    price: 1899,
    rating: 4.9,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80",
    highlights: ["Shibuya Crossing", "Traditional Temples", "Sushi Making", "Mount Fuji"],
    description: "Immerse yourself in Japanese culture, from ancient traditions to modern marvels.",
    maxGroupSize: 8
  },
  {
    id: "3",
    title: "Bali Island Paradise",
    country: "Indonesia",
    duration: "6 days",
    difficulty: "Easy",
    price: 999,
    rating: 4.7,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&q=80",
    highlights: ["Rice Terraces", "Beach Clubs", "Temple Visits", "Yoga Sessions"],
    description: "Relax in tropical paradise with stunning beaches, temples, and wellness experiences.",
    maxGroupSize: 15
  },
  {
    id: "4",
    title: "Swiss Alps Adventure",
    country: "Switzerland",
    duration: "8 days",
    difficulty: "Challenging",
    price: 2299,
    rating: 4.9,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    highlights: ["Matterhorn", "Hiking Trails", "Mountain Railways", "Alpine Villages"],
    description: "Conquer the Swiss Alps with breathtaking mountain views and challenging hikes.",
    maxGroupSize: 10
  },
  {
    id: "5",
    title: "Tuscan Wine Country",
    country: "Italy",
    duration: "5 days",
    difficulty: "Easy",
    price: 1599,
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500&q=80",
    highlights: ["Wine Tastings", "Historic Towns", "Cooking Classes", "Vineyard Tours"],
    description: "Savor the flavors of Tuscany with wine tastings and culinary experiences.",
    maxGroupSize: 12
  },
  {
    id: "6",
    title: "Iceland Northern Lights",
    country: "Iceland",
    duration: "6 days",
    difficulty: "Moderate",
    price: 1799,
    rating: 4.6,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1539066309609-dd4bb3cb9305?w=500&q=80",
    highlights: ["Northern Lights", "Blue Lagoon", "Waterfalls", "Glacier Tours"],
    description: "Witness the magical Aurora Borealis and explore Iceland's dramatic landscapes.",
    maxGroupSize: 16
  }
];

const TripsContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const filteredTrips = premadeTrips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || trip.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
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
                placeholder="Search trips or destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["All", "Easy", "Moderate", "Challenging"].map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className="whitespace-nowrap"
                >
                  {difficulty}
                </Button>
              ))}
            </div>
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
