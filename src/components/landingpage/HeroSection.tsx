
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MacbookPro } from "@/components/ui/macbook-pro";
import Header from "@/components/shared/Header";
import PlanTripButton from "@/components/ui/PlanTripButton";
import { 
  Cursor, 
  CursorPointer, 
  CursorBody, 
  CursorName, 
  CursorMessage 
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

        {/* Hero MacBook with Video and Cursors */}
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
            <MacbookPro className="w-full h-auto mx-auto">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/images/landingpage/herovideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </MacbookPro>

            {/* Group Editing Cursors */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Cursor 1 - Top left area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.0, ease: "easeOut" }}
                className="absolute top-[20%] left-[25%] hidden sm:block"
              >
                <Cursor>
                  <CursorPointer className="text-emerald-500" />
                  <CursorBody className="bg-emerald-100 text-emerald-700">
                    <CursorName>@sarah</CursorName>
                    <CursorMessage>Add Rome to day 3?</CursorMessage>
                  </CursorBody>
                </Cursor>
              </motion.div>

              {/* Cursor 2 - Center right area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.4, ease: "easeOut" }}
                className="absolute top-[35%] right-[20%] hidden md:block"
              >
                <Cursor>
                  <CursorPointer className="text-rose-500" />
                  <CursorBody className="bg-rose-100 text-rose-700">
                    <CursorName>@mike</CursorName>
                    <CursorMessage>What about lunch here?</CursorMessage>
                  </CursorBody>
                </Cursor>
              </motion.div>

              {/* Cursor 3 - Bottom center area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.8, ease: "easeOut" }}
                className="absolute bottom-[25%] left-[35%] hidden sm:block"
              >
                <Cursor>
                  <CursorPointer className="text-sky-500" />
                  <CursorBody className="bg-sky-100 text-sky-700">
                    <CursorName>@emma</CursorName>
                    <CursorMessage>Love this itinerary! 🎉</CursorMessage>
                  </CursorBody>
                </Cursor>
              </motion.div>

              {/* Cursor 4 - Top right for mobile visibility */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 3.2, ease: "easeOut" }}
                className="absolute top-[15%] right-[15%] sm:hidden"
              >
                <Cursor>
                  <CursorPointer className="text-purple-500" />
                  <CursorBody className="bg-purple-100 text-purple-700">
                    <CursorName>@alex</CursorName>
                    <CursorMessage>Perfect!</CursorMessage>
                  </CursorBody>
                </Cursor>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
