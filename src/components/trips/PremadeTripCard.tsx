
import React from "react";
import { motion } from "framer-motion";
import { Star, Clock, Users, MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface PremadeTripCardProps {
  trip: PremadeTrip;
}

const PremadeTripCard = ({ trip }: PremadeTripCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Challenging":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="trip-card"
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-xl h-full">
        {/* Trip Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Difficulty Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${getDifficultyColor(trip.difficulty)} border-0`}>
              {trip.difficulty}
            </Badge>
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/80 hover:bg-white text-gray-700 backdrop-blur-sm"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Price */}
          <div className="absolute bottom-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-sm font-bold text-gray-900">${trip.price}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-4 flex flex-col h-full">
          {/* Country and Rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-3 w-3 mr-1" />
              {trip.country}
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
              <span className="text-sm font-medium">{trip.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({trip.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{trip.title}</h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">{trip.description}</p>

          {/* Trip Details */}
          <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {trip.duration}
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              Max {trip.maxGroupSize}
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {trip.highlights.slice(0, 3).map((highlight, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
              {trip.highlights.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{trip.highlights.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* See More Button */}
          <Button className="w-full bg-spot-primary hover:bg-spot-primary/90">
            See More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremadeTripCard;
