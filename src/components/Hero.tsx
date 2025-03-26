"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const categories = [
  'Tools', 'Electronics', 'Outdoor Gear', 'Photography', 'Musical Instruments', 
  'Sports Equipment', 'Clothing', 'Party Supplies', 'Games', 'Vehicles'
];

const Hero = () => {
  const [currentCategory, setCurrentCategory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % categories.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full gradient-bg py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Rent Anything, <br className="md:hidden" />
          <span className="relative inline-block min-w-48 h-14 md:h-16 lg:h-20">
            <span className="absolute inset-0 flex justify-center items-center transition-opacity duration-500 opacity-0 animate-fadeIn">
              {categories[currentCategory]}
            </span>
          </span>
          <br className="md:hidden" />
          Near You
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Connect with people in your community to rent the things you need without the commitment of buying.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Link href="/browse" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium text-lg transition-colors duration-200">
            Browse Items
          </Link>
          <Link href="/create-listing" className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-full font-medium text-lg transition-colors duration-200">
            List Your Item
          </Link>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
      </div>
    </div>
  );
};

export default Hero; 