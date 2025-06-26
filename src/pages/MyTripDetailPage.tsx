
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Users, Edit, Trash2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getUserTrips, deleteTrip, SavedTrip } from "@/utils/tripStorage";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { cn } from "@/lib/utils";

const MyTripDetailPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const userTrips = getUserTrips();
  const trip = userTrips.find(t => t.id === tripId);

  if (!trip) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip not found</h2>
          <p className="text-gray-600 mb-4">The trip you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleDeleteTrip = () => {
    if (window.confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      deleteTrip(trip.id);
      toast({
        title: "Trip deleted",
        description: `"${trip.tripName}" has been removed from your trips.`,
      });
      navigate('/dashboard');
    }
  };

  const handleEditTrip = () => {
    // TODO: Navigate to trip editing page
    toast({
      title: "Edit feature coming soon",
      description: "Trip editing functionality will be available soon!",
    });
  };

  return (
    <div className={cn(
      "flex flex-col md:flex-row bg-gray-50 w-full flex-1 mx-auto border border-gray-200 overflow-hidden",
      "h-screen"
    )}>
      <DashboardSidebar />
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 w-full h-full">
          <DashboardNavbar />
          
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleEditTrip}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Trip
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteTrip}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-3xl font-bold mb-2">{trip.tripName}</h1>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {trip.destination}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {trip.dates}
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {trip.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trip Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Trip Members */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Trip Members
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-3">
                          {trip.members.map((member, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                              <div className="h-8 w-8 rounded-full bg-spot-primary text-white flex items-center justify-center text-sm font-medium">
                                {member.initials}
                              </div>
                              <span className="text-sm font-medium">{member.name}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Itinerary Placeholder */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Itinerary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">Detailed Itinerary</h3>
                          <p className="text-gray-500 mb-4">Your day-by-day trip schedule will be displayed here.</p>
                          <Button variant="outline" onClick={handleEditTrip}>
                            Add Activities
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Trip Status */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Trip Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Status</label>
                            <div className="mt-1">
                              <Badge variant={trip.status === 'Upcoming' ? 'default' : 'secondary'}>
                                {trip.status}
                              </Badge>
                            </div>
                          </div>
                          <Separator />
                          <div>
                            <label className="text-sm font-medium text-gray-600">Created</label>
                            <p className="text-sm text-gray-900 mt-1">
                              {new Date(trip.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start" onClick={handleEditTrip}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Trip Details
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <DollarSign className="h-4 w-4 mr-2" />
                          View Expenses
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Members
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTripDetailPage;
