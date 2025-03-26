"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiEye, FiClock, FiToggleLeft, FiToggleRight, FiUsers, FiDollarSign } from 'react-icons/fi';

// Mock user listings data
const mockListings = [
  {
    id: '1',
    title: 'DSLR Camera with 3 Lenses',
    category: 'Photography',
    price: 45,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    status: 'active',
    location: 'Manhattan, NY',
    views: 145,
    inquiries: 12,
    rentals: 8,
    revenue: 980,
    createdAt: '2023-04-15',
    nextRental: '2023-07-18'
  },
  {
    id: '2',
    title: 'Mountain Bike - Trek Fuel EX 8',
    category: 'Sports',
    price: 35,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    status: 'active',
    location: 'Brooklyn, NY',
    views: 89,
    inquiries: 5,
    rentals: 3,
    revenue: 420,
    createdAt: '2023-05-22',
    nextRental: null
  },
  {
    id: '3',
    title: 'Premium DJ Equipment Set',
    category: 'Audio Equipment',
    price: 90,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    status: 'inactive',
    location: 'Queens, NY',
    views: 210,
    inquiries: 18,
    rentals: 5,
    revenue: 1800,
    createdAt: '2023-03-10',
    nextRental: null
  },
  {
    id: '4',
    title: 'Drone - DJI Mavic Air 2',
    category: 'Electronics',
    price: 60,
    priceUnit: 'day',
    image: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    status: 'rented',
    location: 'Manhattan, NY',
    views: 112,
    inquiries: 9,
    rentals: 4,
    revenue: 480,
    createdAt: '2023-06-05',
    nextRental: '2023-07-15'
  }
];

type Status = 'active' | 'inactive' | 'rented';
type SortOption = 'date-new' | 'date-old' | 'price-high' | 'price-low' | 'popularity';

export default function MyItemsPage() {
  const { data: session, status: sessionStatus } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date-new');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  // Filter items based on selected status
  const filteredItems = mockListings.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });
  
  // Sort items based on selected option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch(sortOption) {
      case 'date-new':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'date-old':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'popularity':
        return b.views - a.views;
      default:
        return 0;
    }
  });
  
  const toggleItemStatus = (itemId: string) => {
    // In a real app, this would update the item status in the database
    console.log(`Toggle status for item ${itemId}`);
  };
  
  const confirmDelete = (itemId: string) => {
    setItemToDelete(itemId);
  };
  
  const deleteItem = () => {
    if (!itemToDelete) return;
    
    // In a real app, this would delete the item from the database
    console.log(`Deleting item ${itemToDelete}`);
    
    // Close the modal
    setItemToDelete(null);
  };
  
  const cancelDelete = () => {
    setItemToDelete(null);
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
            <h1 className="text-2xl font-bold text-gray-900">My Items</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your rental listings
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/create-listing"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              List a New Item
            </Link>
          </div>
        </div>
        
        {/* Summary stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <FiDollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="text-lg font-semibold text-gray-900">${mockListings.reduce((sum, item) => sum + item.revenue, 0)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FiUsers className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Rentals</dt>
                    <dd className="text-lg font-semibold text-gray-900">{mockListings.reduce((sum, item) => sum + item.rentals, 0)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <FiEye className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                    <dd className="text-lg font-semibold text-gray-900">{mockListings.reduce((sum, item) => sum + item.views, 0)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FiClock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Listings</dt>
                    <dd className="text-lg font-semibold text-gray-900">{mockListings.filter(item => item.status === 'active').length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and sort */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    filter === 'all'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 bg-white hover:bg-gray-100'
                  }`}
                >
                  All ({mockListings.length})
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    filter === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 bg-white hover:bg-gray-100'
                  }`}
                >
                  Active ({mockListings.filter(item => item.status === 'active').length})
                </button>
                <button
                  onClick={() => setFilter('rented')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    filter === 'rented'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 bg-white hover:bg-gray-100'
                  }`}
                >
                  Rented ({mockListings.filter(item => item.status === 'rented').length})
                </button>
                <button
                  onClick={() => setFilter('inactive')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    filter === 'inactive'
                      ? 'bg-gray-100 text-gray-700'
                      : 'text-gray-700 bg-white hover:bg-gray-100'
                  }`}
                >
                  Inactive ({mockListings.filter(item => item.status === 'inactive').length})
                </button>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <select
                  className="block pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                >
                  <option value="date-new">Newest First</option>
                  <option value="date-old">Oldest First</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Listings */}
        {sortedItems.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {sortedItems.map((listing) => (
                <li key={listing.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={listing.image} 
                            alt={listing.title}
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-medium text-gray-900">
                            {listing.title}
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-500">{listing.category}</span>
                            <span className="mx-1 text-gray-500">·</span>
                            <span className="text-sm text-gray-500">{listing.location}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-sm font-semibold text-gray-900">${listing.price}</span>
                            <span className="text-xs text-gray-500 ml-1">per {listing.priceUnit}</span>
                            
                            <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${listing.status === 'active' ? 'bg-green-100 text-green-800' : 
                                listing.status === 'rented' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                              }"
                            >
                              {listing.status}
                            </span>
                            
                            {listing.status === 'rented' && listing.nextRental && (
                              <span className="ml-2 text-xs text-gray-500">
                                Available after {new Date(listing.nextRental).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex sm:flex-col sm:items-end">
                        <div className="flex space-x-2">
                          <Link 
                            href={`/item/${listing.id}`}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <FiEye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                          
                          <Link 
                            href={`/item/${listing.id}/edit`}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <FiEdit className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                          
                          <button 
                            onClick={() => toggleItemStatus(listing.id)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            {listing.status === 'active' ? (
                              <>
                                <FiToggleRight className="h-4 w-4 mr-1 text-green-500" />
                                <span>Deactivate</span>
                              </>
                            ) : (
                              <>
                                <FiToggleLeft className="h-4 w-4 mr-1 text-gray-500" />
                                <span>Activate</span>
                              </>
                            )}
                          </button>
                          
                          <button 
                            onClick={() => confirmDelete(listing.id)}
                            className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                          >
                            <FiTrash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                        
                        <div className="mt-4 flex items-center text-sm text-gray-500 sm:mt-2">
                          <div className="flex items-center mr-4">
                            <FiEye className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <span>{listing.views} views</span>
                          </div>
                          <div className="flex items-center">
                            <FiUsers className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <span>{listing.rentals} rentals</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white shadow sm:rounded-md p-6 text-center">
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
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No listings found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new listing.</p>
            <div className="mt-6">
              <Link
                href="/create-listing"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create listing
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Delete confirmation modal */}
      {itemToDelete && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiTrash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Item</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={deleteItem}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 