"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FiSearch, FiFilter, FiMapPin, FiStar, FiHeart } from 'react-icons/fi';

// Mock categories for filtering
const categories = [
  'All Categories',
  'Photography', 
  'Tools', 
  'Electronics', 
  'Sports', 
  'Party Supplies', 
  'Audio Equipment',
  'Home Appliances',
  'Garden Equipment',
  'Vehicles',
  'Clothing',
];

// Mock items data
const mockItems = [
  {
    id: '1',
    title: 'Professional DSLR Camera',
    category: 'Photography',
    price: 45,
    priceUnit: 'day',
    rating: 4.8,
    reviewCount: 24,
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'John D.',
    distance: '1.2 miles away'
  },
  {
    id: '2',
    title: 'Electric Lawn Mower',
    category: 'Garden Equipment',
    price: 25,
    priceUnit: 'day',
    rating: 4.5,
    reviewCount: 18,
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Sarah K.',
    distance: '2.4 miles away'
  },
  {
    id: '3',
    title: 'Mountain Bike',
    category: 'Sports',
    price: 20,
    priceUnit: 'day',
    rating: 4.7,
    reviewCount: 32,
    location: 'Bronx, NY',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Mike R.',
    distance: '3.1 miles away'
  },
  {
    id: '4',
    title: 'Portable Speaker System',
    category: 'Audio Equipment',
    price: 35,
    priceUnit: 'day',
    rating: 4.9,
    reviewCount: 45,
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Lisa T.',
    distance: '4.5 miles away'
  },
  {
    id: '5',
    title: 'Power Drill Set',
    category: 'Tools',
    price: 15,
    priceUnit: 'day',
    rating: 4.6,
    reviewCount: 19,
    location: 'Staten Island, NY',
    image: 'https://images.unsplash.com/photo-1572981779307-38e922a08da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Robert L.',
    distance: '5.2 miles away'
  },
  {
    id: '6',
    title: 'Tent (4-Person)',
    category: 'Outdoor Gear',
    price: 30,
    priceUnit: 'day',
    rating: 4.4,
    reviewCount: 15,
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Alex W.',
    distance: '1.8 miles away'
  },
  {
    id: '7',
    title: 'MacBook Pro 16"',
    category: 'Electronics',
    price: 55,
    priceUnit: 'day',
    rating: 4.9,
    reviewCount: 37,
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Emma S.',
    distance: '2.7 miles away'
  },
  {
    id: '8',
    title: 'Party Lights & Disco Ball',
    category: 'Party Supplies',
    price: 25,
    priceUnit: 'day',
    rating: 4.3,
    reviewCount: 12,
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1504704911898-68304a7d2807?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Carlos M.',
    distance: '3.4 miles away'
  },
];

export default function BrowsePage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [distance, setDistance] = useState<number>(10); // miles
  const [sortOption, setSortOption] = useState('relevance');
  const [savedItems, setSavedItems] = useState<string[]>([]);
  
  // Filter items based on search, category, price and distance
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesDistance = parseFloat(item.distance.split(' ')[0]) <= distance;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDistance;
  });
  
  // Sort items based on selected option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch(sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0]);
      default:
        return 0; // relevance - maintain current order
    }
  });
  
  const toggleSaveItem = (itemId: string) => {
    setSavedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Search header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-grow max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by item name, category, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FiFilter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sorting options */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available near you
          </h1>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select
              className="block pl-3 pr-10 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
              <option value="distance">Nearest First</option>
            </select>
          </div>
        </div>
        
        {/* Results grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => toggleSaveItem(item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm"
                >
                  <FiHeart 
                    className={`h-5 w-5 ${savedItems.includes(item.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} 
                  />
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 hover:text-indigo-600">
                      <Link href={`/item/${item.id}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">${item.price}</p>
                    <p className="text-xs text-gray-500">per {item.priceUnit}</p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center text-sm">
                  <FiMapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">{item.distance}</span>
                </div>
                
                <div className="mt-3 flex items-center text-sm">
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 fill-yellow-400 h-4 w-4" />
                    <span className="ml-1 text-gray-700">{item.rating}</span>
                  </div>
                  <span className="mx-1 text-gray-500">·</span>
                  <span className="text-gray-500">{item.reviewCount} reviews</span>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Listed by {item.owner}
                  </div>
                  <Link href={`/item/${item.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter criteria
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                  setPriceRange([0, 100]);
                  setDistance(10);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 