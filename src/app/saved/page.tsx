"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FiHeart, FiDollarSign, FiMapPin, FiStar, FiCalendar, FiTrash2 } from 'react-icons/fi';

// Mock saved items data
const mockSavedItems = [
  {
    id: '1',
    itemId: '101',
    title: 'Professional DSLR Camera',
    category: 'Photography',
    price: 45,
    priceUnit: 'day',
    rating: 4.8,
    reviewCount: 24,
    location: 'Manhattan, NY',
    distance: '1.2 miles away',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'John D.',
    availability: 'Available now',
    savedOn: '2023-07-01'
  },
  {
    id: '2',
    itemId: '102',
    title: 'Mountain Bike - Trek Fuel EX 8',
    category: 'Sports',
    price: 35,
    priceUnit: 'day',
    rating: 4.7,
    reviewCount: 32,
    location: 'Brooklyn, NY',
    distance: '2.8 miles away',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Mike R.',
    availability: 'Available from Jul 25',
    savedOn: '2023-07-10'
  },
  {
    id: '3',
    itemId: '103',
    title: 'DJI Mavic Air 2 Drone',
    category: 'Electronics',
    price: 60,
    priceUnit: 'day',
    rating: 4.9,
    reviewCount: 17,
    location: 'Queens, NY',
    distance: '3.5 miles away',
    image: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Emily W.',
    availability: 'Available now',
    savedOn: '2023-07-15'
  },
  {
    id: '4',
    itemId: '104',
    title: 'Portable Speaker System',
    category: 'Audio Equipment',
    price: 25,
    priceUnit: 'day',
    rating: 4.5,
    reviewCount: 21,
    location: 'Staten Island, NY',
    distance: '5.1 miles away',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    owner: 'Lisa T.',
    availability: 'Currently rented',
    savedOn: '2023-06-28'
  }
];

export default function SavedItemsPage() {
  const { data: session, status: sessionStatus } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const [savedItems, setSavedItems] = useState(mockSavedItems);
  const [sortOption, setSortOption] = useState<'newest' | 'oldest' | 'price-low' | 'price-high' | 'distance'>('newest');
  
  // Sort saved items based on selected option
  const sortedItems = [...savedItems].sort((a, b) => {
    switch(sortOption) {
      case 'newest':
        return new Date(b.savedOn).getTime() - new Date(a.savedOn).getTime();
      case 'oldest':
        return new Date(a.savedOn).getTime() - new Date(b.savedOn).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'distance':
        return parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0]);
      default:
        return 0;
    }
  });
  
  const removeItem = (itemId: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  if (sessionStatus === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved Items</h1>
            <p className="mt-1 text-sm text-gray-500">
              {savedItems.length} {savedItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select
              className="block pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
            >
              <option value="newest">Recently Saved</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="distance">Nearest First</option>
            </select>
          </div>
        </div>
        
        {/* Saved Items List */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedItems.map(item => (
              <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="relative">
                  <div className="h-48 w-full object-cover">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm"
                  >
                    <FiHeart className="h-5 w-5 text-red-500 fill-red-500" />
                  </button>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        item.availability === 'Available now' 
                          ? 'bg-green-100 text-green-800' 
                          : item.availability === 'Currently rented'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.availability}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <Link 
                    href={`/item/${item.itemId}`}
                    className="text-lg font-medium text-gray-900 hover:text-indigo-600 line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  
                  <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <FiDollarSign className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-lg font-semibold">{item.price}</span>
                      <span className="text-xs text-gray-500 ml-1">/{item.priceUnit}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <FiStar className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm text-gray-700">{item.rating}</span>
                      <span className="ml-1 text-xs text-gray-500">({item.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm">
                    <FiMapPin className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">{item.distance}</span>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      <FiCalendar className="inline-block mr-1 h-3 w-3" />
                      Saved {new Date(item.savedOn).toLocaleDateString()}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={`/item/${item.itemId}`}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50"
                      >
                        <FiTrash2 className="mr-1 h-3 w-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-100">
              <FiHeart className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">No saved items</h3>
            <p className="mt-2 text-sm text-gray-500">
              Items you save will appear here so you can easily find them later.
            </p>
            <div className="mt-6">
              <Link
                href="/browse"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Items
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 