
import { MapPin, Calendar, DollarSign, Share2 } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import LocationCard from "@/components/LocationCard";
import landingData from "@/data/landing-page.json";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

const iconMap = {
  "map-pin": MapPin,
  calendar: Calendar,
  "dollar-sign": DollarSign,
  "share-2": Share2,
};

const HowItWorksSection = () => {
  const [selectedRange, setSelectedRange] = useState({ start: 7, end: 12 });
  
  const handleDateClick = (dayNumber: number) => {
    if (dayNumber === selectedRange.start) {
      // If clicking start date, extend range by 3 days
      setSelectedRange({ start: dayNumber, end: Math.min(dayNumber + 5, 21) });
    } else if (dayNumber === selectedRange.end) {
      // If clicking end date, shrink range by 2 days
      setSelectedRange({ start: selectedRange.start, end: Math.max(dayNumber - 2, selectedRange.start + 2) });
    } else if (dayNumber > selectedRange.start && dayNumber < selectedRange.end) {
      // If clicking in middle, make it a 3-day trip around that date
      setSelectedRange({ start: Math.max(dayNumber - 1, 1), end: Math.min(dayNumber + 2, 21) });
    } else {
      // If clicking outside range, create new 5-day range
      setSelectedRange({ start: dayNumber, end: Math.min(dayNumber + 5, 21) });
    }
  };

  const timelineData = landingData.howItWorks.map((step, index) => {
    const IconComponent = iconMap[step.icon as keyof typeof iconMap];
    
    // Create unique content for each step
    let stepContent;
    
    if (index === 0) {
      // Step 1: Destination selection with new location cards
      stepContent = (
        <div className="space-y-6">
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-spot-beige/20 to-spot-sky/10 rounded-xl p-6 border border-spot-beige/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Tropical Islands",
                  subtitle: "Maldives, Bali, Hawaii",
                  description: "Experience pristine beaches, crystal-clear waters, and luxury resorts in paradise destinations.",
                  imageSrc: "/images/landingpage/bali.jpg",
                  emoji: "🏝️"
                },
                {
                  title: "Mountain Adventures",
                  subtitle: "Alps, Himalayas, Rockies",
                  description: "Discover breathtaking peaks, alpine villages, and world-class skiing and hiking trails.",
                  imageSrc: "/images/landingpage/alps.jpg",
                  emoji: "🏔️"
                },
                {
                  title: "Historic Cities",
                  subtitle: "Rome, Paris, Tokyo",
                  description: "Immerse yourself in rich culture, ancient architecture, and vibrant city life.",
                  imageSrc: "/images/landingpage/rome.jpg",
                  emoji: "🏛️"
                }
              ].map((location, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + (idx * 0.1) }}
                  viewport={{ once: true }}
                >
                  <LocationCard {...location} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      );
    } else if (index === 1) {
      // Step 2: Interactive calendar/schedule view
      const tripDuration = selectedRange.end - selectedRange.start + 1;
      
      stepContent = (
        <div className="space-y-6">
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-spot-beige/20 to-spot-sky/10 rounded-xl p-6 border border-spot-beige/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="grid grid-cols-7 gap-2 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </motion.div>
            <motion.div 
              className="grid grid-cols-7 gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7, staggerChildren: 0.02 }}
              viewport={{ once: true }}
            >
              {Array.from({ length: 21 }, (_, i) => {
                const dayNumber = i + 1;
                let cellClass = 'aspect-square rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all duration-200 ';
                
                if (dayNumber === selectedRange.start || dayNumber === selectedRange.end) {
                  cellClass += 'bg-spot-primary text-white font-bold hover:bg-spot-primary/80 shadow-md';
                } else if (dayNumber > selectedRange.start && dayNumber < selectedRange.end) {
                  cellClass += 'bg-spot-primary/30 text-spot-primary font-semibold hover:bg-spot-primary/50';
                } else {
                  cellClass += 'bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600 hover:shadow-sm';
                }
                
                return (
                  <motion.div 
                    key={i} 
                    className={cellClass}
                    onClick={() => handleDateClick(dayNumber)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + (i * 0.02) }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {dayNumber}
                  </motion.div>
                );
              })}
            </motion.div>
            <motion.div 
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-600">
                Trip Duration: {tripDuration} Days ({selectedRange.start}{selectedRange.start === 1 ? 'st' : selectedRange.start === 2 ? 'nd' : selectedRange.start === 3 ? 'rd' : 'th'} - {selectedRange.end}{selectedRange.end === 1 ? 'st' : selectedRange.end === 2 ? 'nd' : selectedRange.end === 3 ? 'rd' : 'th'})
              </p>
              <p className="text-xs text-gray-500 mt-1">Click on dates to adjust your trip duration</p>
            </motion.div>
          </motion.div>
        </div>
      );
    } else if (index === 2) {
      // Step 3: Budget breakdown with interactive elements
      stepContent = (
        <div className="space-y-6">
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-spot-beige/20 to-spot-sky/10 rounded-xl p-6 border border-spot-beige/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {[
                { label: "Flights", amount: "$750", color: "hover:bg-blue-50" },
                { label: "Hotels", amount: "$450", color: "hover:bg-green-50" },
                { label: "Activities", amount: "$300", color: "hover:bg-purple-50" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md ${item.color} transition-all duration-200 cursor-pointer`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + (idx * 0.1) }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-spot-primary font-bold">{item.amount}</span>
                </motion.div>
              ))}
              <motion.div 
                className="flex justify-between items-center p-3 bg-spot-primary/10 rounded-lg border-2 border-spot-primary/20 hover:bg-spot-primary/20 transition-all duration-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-bold text-spot-primary">Total Budget</span>
                <span className="text-spot-primary font-bold text-xl">$1,500</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      );
    } else {
      // Step 4: Collaboration/sharing with hover cards
      stepContent = (
        <div className="space-y-6">
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-spot-primary to-spot-secondary rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-spot-beige/20 to-spot-sky/10 rounded-xl p-6 border border-spot-beige/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {[
                { initial: "J", name: "John", action: "added Eiffel Tower", time: "2 minutes ago", bg: "bg-blue-500", hoverContent: "John added the Eiffel Tower to the itinerary for Day 3. He also included viewing times and nearby restaurant recommendations for a complete Paris experience." },
                { initial: "S", name: "Sarah", action: "updated budget", time: "5 minutes ago", bg: "bg-spot-secondary", hoverContent: "Sarah adjusted the budget by finding a better hotel deal and adding a Seine river cruise. She saved $150 on accommodation and allocated it to a romantic dinner experience." },
                { initial: "M", name: "Mike", action: "suggested restaurant", time: "10 minutes ago", bg: "bg-blue-600", hoverContent: "Mike recommended \"Le Comptoir du Relais\" - a highly-rated bistro in Saint-Germain. He included menu highlights, price range, and notes about making reservations in advance." }
              ].map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + (idx * 0.1) }}
                  viewport={{ once: true }}
                >
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <motion.div 
                        className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={`w-8 h-8 ${activity.bg} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                          {activity.initial}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.name} {activity.action}</div>
                          <div className="text-sm text-gray-500">{activity.time}</div>
                        </div>
                      </motion.div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{activity.name}'s {activity.action.includes('added') ? 'Activity' : activity.action.includes('updated') ? 'Update' : 'Suggestion'}</h4>
                        <p className="text-xs text-muted-foreground">
                          {activity.hoverContent}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      );
    }
    
    return {
      title: `Step ${step.step}`,
      content: stepContent,
    };
  });

  return (
    <section className="py-20 bg-gray-50 pb-12">
      <div className="container mx-auto px-4">
        {/* Rectangle container with animated grid pattern */}
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          {/* Animated Grid Pattern Background */}
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-0 h-full opacity-30",
            )}
          />
          
          {/* Content */}
          <div className="relative z-10 px-8 py-16">
            <motion.div 
              className="text-center mb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                How It Works
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-2xl mx-auto mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Coordinate, Calculate, Discover, and Go – All in Four Steps
              </motion.p>
            </motion.div>
            
            <div className="-mt-16">
              <Timeline data={timelineData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
