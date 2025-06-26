import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, Users, MapPin, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import QuickTripSetupModal from "@/components/trips/QuickTripSetupModal";
import tripsData from "@/data/trips.json";

// Backend Integration Comments:
// 1. Replace static data with API call: GET /api/trips/:slug
// 2. Add user reviews and ratings section
// 3. Implement trip planning tools and customization features
// 4. Add related trips recommendations
// 5. Track page views and user engagement
// 6. Add social sharing capabilities
// 7. Implement real-time cost estimation tools
// 8. Add image gallery with lightbox
// 9. Store user trip planning sessions and favorites

const TripDetailPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  // Backend TODO: Replace with API call
  const trip = tripsData.trips.find(t => t.slug === tripId);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip Not Found</h1>
          <Button onClick={() => navigate('/trips')}>
            Back to Trips
          </Button>
        </div>
      </div>
    );
  }

  const handleStartPlanning = () => {
    setIsSetupModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/trips')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Trips
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <Badge className={trip.isInternational ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                  {trip.isInternational ? 'International' : 'Domestic'}
                </Badge>
                <Badge variant="secondary">{trip.category}</Badge>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{trip.title}</h1>
              <div className="flex items-center text-white/90 gap-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {trip.country}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {trip.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Max {trip.maxGroupSize} people
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">About This Trip</h2>
                    <p className="text-gray-600 mb-4">{trip.detailedDescription}</p>
                    <p className="text-gray-600">{trip.description}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Trip Highlights</h2>
                    <div className="grid grid-cols-2 gap-2">
                      {trip.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Itinerary */}
              {trip.itinerary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8"
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Sample Itinerary</h2>
                      <div className="space-y-4">
                        {trip.itinerary.map((day, index) => (
                          <div key={index} className="border-l-4 border-spot-primary pl-4">
                            <h3 className="font-semibold text-lg">Day {day.day}: {day.title}</h3>
                            <ul className="mt-2 space-y-1">
                              {day.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="text-gray-600 flex items-center">
                                  <div className="w-2 h-2 bg-spot-primary rounded-full mr-2" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Inclusions & Exclusions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-green-700">Typically Includes</h3>
                      <div className="space-y-2">
                        {trip.inclusions.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-red-700">Additional Expenses</h3>
                      <div className="space-y-2">
                        {trip.exclusions.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <X className="h-4 w-4 text-red-600 mr-2" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-8"
              >
                <Card>
                  <CardContent className="p-6">
                    {/* Price Estimate */}
                    <div className="text-center mb-6">
                      <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                      <div className="text-3xl font-bold text-spot-primary">${trip.price}</div>
                      <div className="text-gray-600 text-sm">per person</div>
                    </div>

                    <Separator className="mb-6" />

                    {/* Rating */}
                    <div className="flex items-center justify-center mb-6">
                      <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                      <span className="text-lg font-semibold">{trip.rating}</span>
                      <span className="text-gray-500 ml-1">({trip.reviewCount} reviews)</span>
                    </div>

                    {/* Trip Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{trip.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Group Size:</span>
                        <span className="font-medium">Max {trip.maxGroupSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{trip.isInternational ? 'International' : 'Domestic'}</span>
                      </div>
                    </div>

                    {/* Start Planning Button */}
                    <Button 
                      onClick={handleStartPlanning}
                      className="w-full bg-spot-primary hover:bg-spot-primary/90 text-lg py-3"
                    >
                      Start Planning
                    </Button>

                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-500">Customize this trip to your preferences</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <QuickTripSetupModal 
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        trip={trip}
      />
    </>
  );
};

export default TripDetailPage;
