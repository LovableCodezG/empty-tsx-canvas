
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";
import VideoPlayer from "@/components/ui/video-player";
import { motion, AnimatePresence } from "framer-motion";

const DemoPreviewSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  const videoSrc = "/images/landingpage/demovideo.mp4";
  const thumbnailSrc = "/images/landingpage/demothumbnail.png";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  return (
    <motion.section 
      className="pt-8 pb-20 bg-gray-50" 
      id="demo-preview"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-3"
            variants={itemVariants}
          >
            See SpotPlan in Action
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Watch how easy it is to plan your perfect trip with our intelligent platform
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden shadow-2xl border-0 group">
            <div className="aspect-video bg-gradient-to-br from-spot-sky to-spot-blue relative">
              <AnimatePresence mode="wait">
                {!showVideo ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${thumbnailSrc})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/20" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <motion.div 
                          className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                          onClick={() => setShowVideo(true)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-8 h-8 text-spot-primary ml-1" />
                        </motion.div>
                        <p className="text-white text-lg font-semibold">Watch Demo</p>
                      </motion.div>
                      
                      {/* Floating UI elements for visual interest */}
                      <motion.div 
                        className="absolute top-4 left-4 bg-white/90 rounded-lg p-3 shadow-lg"
                        initial={{ opacity: 0, x: -50, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                      >
                        <div className="text-sm font-semibold text-spot-primary">✈️ Paris, France</div>
                        <div className="text-xs text-gray-600">5 days • $1,200</div>
                      </motion.div>
                      
                      <motion.div 
                        className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3 shadow-lg"
                        initial={{ opacity: 0, x: 50, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
                      >
                        <div className="text-sm font-semibold text-spot-primary">🍽️ Restaurant booked</div>
                        <div className="text-xs text-gray-600">Tonight at 7 PM</div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <VideoPlayer src={videoSrc} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DemoPreviewSection;
