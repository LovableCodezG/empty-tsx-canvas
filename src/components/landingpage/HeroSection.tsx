
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TripSearchForm from "../TripSearchForm";
import { MacbookPro } from "@/components/ui/macbook-pro";
import Header from "@/components/shared/Header";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

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
        >
          <TripSearchForm />
        </motion.div>

        {/* Hero MacBook with Video */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="relative z-10 max-w-6xl mx-auto mt-20 mb-16"
        >
          <motion.div 
            style={{ scale: laptopScale }}
            className="drop-shadow-[0_35px_70px_rgba(0,0,0,0.45)] shadow-black/40"
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
