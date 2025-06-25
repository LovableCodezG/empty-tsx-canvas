
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
                  <source src="/images/landingpage/herovideo.mp4" type="video/mp4" />
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

            {/* Static Group Editing Cursors */}
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
                <span className="pointer-events-none relative select-none">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="size-3.5 text-emerald-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M19.438 6.716 1.115.05A.832.832 0 0 0 .05 1.116L6.712 19.45a.834.834 0 0 0 1.557.025l3.198-8 7.995-3.2a.833.833 0 0 0 0-1.559h-.024Z"
                    />
                  </svg>
                  <span className="relative ml-3.5 flex flex-col whitespace-nowrap rounded-xl py-1 pr-3 pl-2.5 text-xs bg-emerald-100 text-emerald-700">
                    <span>@sarah</span>
                    <span>Add Rome to day 3?</span>
                  </span>
                </span>
              </motion.div>

              {/* Cursor 2 - Center right area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.4, ease: "easeOut" }}
                className="absolute top-[35%] right-[20%] hidden md:block"
              >
                <span className="pointer-events-none relative select-none">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="size-3.5 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M19.438 6.716 1.115.05A.832.832 0 0 0 .05 1.116L6.712 19.45a.834.834 0 0 0 1.557.025l3.198-8 7.995-3.2a.833.833 0 0 0 0-1.559h-.024Z"
                    />
                  </svg>
                  <span className="relative ml-3.5 flex flex-col whitespace-nowrap rounded-xl py-1 pr-3 pl-2.5 text-xs bg-rose-100 text-rose-700">
                    <span>@mike</span>
                    <span>What about lunch here?</span>
                  </span>
                </span>
              </motion.div>

              {/* Cursor 3 - Bottom center area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.8, ease: "easeOut" }}
                className="absolute bottom-[25%] left-[35%] hidden sm:block"
              >
                <span className="pointer-events-none relative select-none">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="size-3.5 text-sky-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M19.438 6.716 1.115.05A.832.832 0 0 0 .05 1.116L6.712 19.45a.834.834 0 0 0 1.557.025l3.198-8 7.995-3.2a.833.833 0 0 0 0-1.559h-.024Z"
                    />
                  </svg>
                  <span className="relative ml-3.5 flex flex-col whitespace-nowrap rounded-xl py-1 pr-3 pl-2.5 text-xs bg-sky-100 text-sky-700">
                    <span>@emma</span>
                    <span>Love this itinerary! 🎉</span>
                  </span>
                </span>
              </motion.div>

              {/* Cursor 4 - Top right for mobile visibility */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 3.2, ease: "easeOut" }}
                className="absolute top-[15%] right-[15%] sm:hidden"
              >
                <span className="pointer-events-none relative select-none">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="size-3.5 text-purple-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M19.438 6.716 1.115.05A.832.832 0 0 0 .05 1.116L6.712 19.45a.834.834 0 0 0 1.557.025l3.198-8 7.995-3.2a.833.833 0 0 0 0-1.559h-.024Z"
                    />
                  </svg>
                  <span className="relative ml-3.5 flex flex-col whitespace-nowrap rounded-xl py-1 pr-3 pl-2.5 text-xs bg-purple-100 text-purple-700">
                    <span>@alex</span>
                    <span>Perfect!</span>
                  </span>
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
