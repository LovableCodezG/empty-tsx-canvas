
import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import countriesData from '@/data/countries.json';
import { cn } from '@/lib/utils';

const CountrySelector = () => {
  const { state, dispatch } = useTripCreation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countriesData.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCountry = countriesData.find(country => country.code === state.selectedCountry);

  const handleCountrySelect = (countryCode: string) => {
    dispatch({ type: 'SET_SELECTED_COUNTRY', payload: countryCode });
    setIsOpen(false);
    setSearchTerm('');
  };

  if (state.destinationType !== 'international') {
    return null;
  }

  return (
    <div className="space-y-3 relative">
      <label className="block text-sm font-medium text-gray-700">
        Select Country
      </label>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 hover:border-gray-300",
            isOpen ? "border-spot-primary" : "border-gray-200",
            "bg-white text-left"
          )}
        >
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="font-medium">{selectedCountry.name}</span>
            </div>
          ) : (
            <span className="text-gray-500">Choose a country...</span>
          )}
          <ChevronDown className={cn(
            "h-5 w-5 text-gray-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-hidden">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-spot-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country.code)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="font-medium">{country.name}</span>
                </button>
              ))}
              {filteredCountries.length === 0 && (
                <div className="p-3 text-center text-gray-500">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySelector;
