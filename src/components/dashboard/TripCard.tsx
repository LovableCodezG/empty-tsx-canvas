
import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, MoreVertical, Edit, Eye, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TripMember {
  name: string;
  avatar: string;
  initials: string;
}

interface Trip {
  id: string;
  destination: string;
  dates: string;
  status: "Upcoming" | "In Progress" | "Completed";
  image: string;
  members: TripMember[];
}

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="trip-card"
      data-trip-id={trip.id}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-xl">
        {/* Trip Image - Reduced height */}
        <div className="relative h-32 overflow-hidden">
          <img
            src={trip.image}
            alt={trip.destination}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
              {trip.status}
            </span>
          </div>

          {/* Actions Menu */}
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/80 hover:bg-white text-gray-700 backdrop-blur-sm"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem className="hover:bg-gray-50">
                  <Eye className="h-4 w-4 mr-2" />
                  View Itinerary
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-50">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Trip
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-red-50 text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Trip
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Destination */}
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 text-spot-primary mr-2" />
            <h3 className="text-lg font-bold text-gray-900">{trip.destination}</h3>
          </div>

          {/* Dates */}
          <div className="flex items-center mb-3">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">{trip.dates}</span>
          </div>

          {/* Members */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600 mr-3">
                {trip.members.length} member{trip.members.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="flex -space-x-1">
              {trip.members.slice(0, 4).map((member, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-spot-primary text-white text-xs">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              {trip.members.length > 4 && (
                <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    +{trip.members.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TripCard;
