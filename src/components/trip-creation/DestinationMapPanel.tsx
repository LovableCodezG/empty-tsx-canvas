
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import countriesData from '@/data/countries.json';

const DestinationMapPanel = () => {
  const { state } = useTripCreation();
  
  const selectedCountry = countriesData.find(country => country.code === state.selectedCountry);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-full min-h-[400px] flex flex-col"
    >
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-spot-primary" />
        <h3 className="font-semibold text-gray-900">Destination Preview</h3>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg">
        {state.selectedCountry && selectedCountry ? (
          <div className="text-center">
            <div className="text-6xl mb-4">{selectedCountry.flag}</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedCountry.name}</h4>
            <p className="text-gray-500 text-sm">Map integration coming soon</p>
          </div>
        ) : state.destinationType === 'domestic' ? (
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-4">🏠</div>
            <p className="text-lg font-medium mb-2">Domestic Trip</p>
            <p className="text-sm">Explore your home country</p>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin" />
            <p className="text-lg font-medium mb-2">Select a destination</p>
            <p className="text-sm">Choose your trip type and destination above</p>
          </div>
        )}
      </div>

      {/* Google Maps integration placeholder */}
      {/* TODO: Integrate with Google Maps API */}
      {/* <div id="destination-map" className="w-full h-64 bg-gray-100 rounded-lg"></div> */}
    </motion.div>
  );
};

export default DestinationMapPanel;
