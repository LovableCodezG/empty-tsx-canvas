
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm"
    >
      
    </motion.nav>
  );
};

export default DashboardNavbar;
