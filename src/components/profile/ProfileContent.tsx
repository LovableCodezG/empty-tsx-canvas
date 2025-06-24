import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, MapPin, Calendar, Globe, Mail, Phone, Edit3, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import dashboardData from "@/data/dashboard.json";

// Extended user data - easily changeable from backend by updating dashboard.json
const getExtendedUserData = () => {
  const {
    user
  } = dashboardData;
  return {
    ...user,
    // Backend will be able to easily update these fields in dashboard.json
    phone: "+1 (555) 123-4567",
    bio: "Passionate traveler and adventure seeker. Love exploring new cultures and creating unforgettable memories with friends.",
    location: "San Francisco, CA",
    avatar: user.avatar,
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    joinDate: "March 2023",
    totalTrips: 12,
    countries: 8,
    preferences: {
      budget: "Mid-range",
      travelStyle: "Adventure",
      accommodation: "Hotels & Hostels"
    },
    interests: ["Photography", "Hiking", "Local Cuisine", "Museums", "Nightlife", "Beach"]
  };
};

const ProfileContent = () => {
  const {
    toast
  } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(getExtendedUserData());
  const [formData, setFormData] = useState(getExtendedUserData());

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(userData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userData);
  };

  const handleSave = async () => {
    try {
      // TODO: Backend API call - bolt.ai can easily update dashboard.json
      // await updateUserProfile(formData);

      setUserData(formData);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create a preview URL for immediate display
      const previewUrl = URL.createObjectURL(file);
      
      // Update both form data and user data for immediate feedback
      const updatedData = { ...formData, avatar: previewUrl };
      setFormData(updatedData);
      setUserData(updatedData);

      // TODO: Backend file upload - bolt.ai can implement this
      // const uploadedUrl = await uploadAvatar(file);
      // setFormData(prev => ({ ...prev, avatar: uploadedUrl }));
      // setUserData(prev => ({ ...prev, avatar: uploadedUrl }));

      toast({
        title: "Avatar Updated",
        description: "Your profile avatar has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your avatar.",
        variant: "destructive"
      });
    }
  };

  return <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Hero Section with Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <img src={userData.coverImage} alt="Cover" className="w-full h-full object-cover opacity-80" />
        <AnimatedGridPattern className="absolute inset-0 opacity-20" strokeDasharray={5} numSquares={30} />
        
        {/* Profile Avatar - aligned with sidebar logo */}
        <div className="absolute top-6 left-4 z-50">
          <div className="relative">
            <Avatar className="w-40 h-40 border-4 border-white shadow-xl bg-white ring-4 ring-white/20">
              <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
              <AvatarFallback className="text-4xl bg-spot-primary text-white font-bold">
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <label className="absolute bottom-2 right-2 bg-spot-primary hover:bg-spot-primary/90 rounded-full p-3 shadow-lg cursor-pointer transition-colors z-50 ring-4 ring-white">
              <Camera className="w-5 h-5 text-white" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarUpload} 
                className="hidden" 
              />
            </label>
          </div>
        </div>
        
        {/* Edit Button */}
        <div className="absolute top-4 right-4 z-10">
          {!isEditing ? <Button onClick={handleEdit} className="bg-white/90 text-gray-800 hover:bg-white">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button> : <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" className="bg-white/90 text-gray-800 hover:bg-white">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>}
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-8 py-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }}>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      {isEditing ? <Input id="name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className="focus:ring-2 focus:ring-spot-primary" /> : <div className="text-lg font-semibold text-gray-900">{userData.name}</div>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      {isEditing ? <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="focus:ring-2 focus:ring-spot-primary" /> : <div className="flex items-center text-gray-700">
                          <Mail className="w-4 h-4 mr-2" />
                          {userData.email}
                        </div>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      {isEditing ? <Input id="phone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="focus:ring-2 focus:ring-spot-primary" /> : <div className="flex items-center text-gray-700">
                          <Phone className="w-4 h-4 mr-2" />
                          {userData.phone}
                        </div>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                        Location
                      </Label>
                      {isEditing ? <Input id="location" value={formData.location} onChange={e => handleInputChange('location', e.target.value)} className="focus:ring-2 focus:ring-spot-primary" /> : <div className="flex items-center text-gray-700">
                          <MapPin className="w-4 h-4 mr-2" />
                          {userData.location}
                        </div>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                      Bio
                    </Label>
                    {isEditing ? <Textarea id="bio" value={formData.bio} onChange={e => handleInputChange('bio', e.target.value)} rows={3} className="focus:ring-2 focus:ring-spot-primary" /> : <p className="text-gray-600 leading-relaxed">{userData.bio}</p>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Travel Interests */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Travel Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.interests.map((interest, index) => <Badge key={index} variant="secondary" className="bg-spot-primary/10 text-spot-primary hover:bg-spot-primary/20">
                        {interest}
                      </Badge>)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Travel Stats */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Travel Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-spot-primary mr-2" />
                      <span className="text-gray-600">Total Trips</span>
                    </div>
                    <span className="text-2xl font-bold text-spot-primary">{userData.totalTrips}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-spot-primary mr-2" />
                      <span className="text-gray-600">Countries Visited</span>
                    </div>
                    <span className="text-2xl font-bold text-spot-primary">{userData.countries}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-spot-primary mr-2" />
                      <span className="text-gray-600">Member Since</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{userData.joinDate}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Travel Preferences */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }}>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Travel Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">Budget Range</Label>
                    <div className="text-lg font-semibold text-gray-900">{userData.preferences.budget}</div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-600">Travel Style</Label>
                    <div className="text-lg font-semibold text-gray-900">{userData.preferences.travelStyle}</div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-600">Accommodation</Label>
                    <div className="text-lg font-semibold text-gray-900">{userData.preferences.accommodation}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>;
};

export default ProfileContent;
