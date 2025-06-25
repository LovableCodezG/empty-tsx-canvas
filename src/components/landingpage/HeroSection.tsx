
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MacbookPro } from "@/components/ui/macbook-pro";
import Header from "@/components/shared/Header";
import PlanTripButton from "@/components/ui/PlanTripButton";
import { 
  CursorProvider,
  Cursor,
  CursorFollow
} from "@/components/ui/cursor";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // NOTE: This button only leads to the create-trip flow if the user is logged in.
  // If not logged in, they will be asked to login or signup.
  // TODO: Connect to proper authentication system when auth is implemented.
  const checkUserAuthStatus = (): boolean => {
    // Placeholder authentication check - currently returns true for all users
    // In a real implementation, this would check JWT tokens, session storage, etc.
    return true;
  };

  const handlePlanTrip = async () => {
    try {
      const isAuthenticated = checkUserAuthStatus();
      
      if (isAuthenticated) {
        // Navigate to the trip creation destination page
        navigate('/create-trip/destination');
      } else {
        // Navigate to login page (future enhancement)
        navigate('/login');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      throw new Error('Failed to navigate to trip planning');
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-gray-50 pt-0 pb-20"
    >
      <Header theme="light" />

      {/* Background World Map */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <WorldMap
          dots={[
            {
              start: { lat: 40.7128, lng: -74.006 },
              end: { lat: 51.5074, lng: -0.1278 },
            },
            {
              start: { lat: 35.6762, lng: 139.6503 },
              end: { lat: -33.8688, lng: 151.2093 },
            },
            {
              start: { lat: 48.8566, lng: 2.3522 },
              end: { lat: 55.7558, lng: 37.6176 },
            },
          ]}
          lineColor="#3B82F6"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-56 pt-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-blue-900 mb-4"
          >
            YOUR PERFECT TRIP,
            <br />
            PLANNED IN <span className="text-blue-600">MINUTES.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl text-blue-800 mb-10 max-w-2xl mx-auto"
          >
            Navigate like a local, eat like a foodie, and explore like a pro
            with an intelligent itinerary for you and your group.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="relative z-20 -mt-40 flex justify-center"
        >
          <PlanTripButton 
            onPlanTrip={handlePlanTrip}
            className="shadow-2xl"
          >
            Plan Your Trip
          </PlanTripButton>
        </motion.div>

        {/* Hero MacBook with Video and Interactive Cursor */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="relative z-10 max-w-6xl mx-auto mt-20 mb-16"
        >
          <motion.div 
            style={{ scale: laptopScale }}
            className="drop-shadow-[0_35px_70px_rgba(0,0,0,0.45)] shadow-black/40 relative"
          >
            <CursorProvider>
              <MacbookPro className="w-full h-auto mx-auto">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/images/landingpage/herovideo.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </MacbookPro>

              {/* Interactive Cursor */}
              <Cursor>
                <svg
                  className="size-6 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 40"
                >
                  <path
                    fill="currentColor"
                    d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
                  />
                </svg>
              </Cursor>
              <CursorFollow>
                <div className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm shadow-lg font-medium">
                  ✨ Collaborative Planning
                </div>
              </CursorFollow>
            </CursorProvider>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
