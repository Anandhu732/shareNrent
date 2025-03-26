"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  FiHome, FiSearch, FiPlus, FiMessageCircle, 
  FiHeart, FiSettings, FiLogOut, FiMenu, 
  FiX, FiUser, FiPackage, FiCalendar 
} from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

// Mock data for items
const mockItems = [
  {
    id: '1',
    title: 'Professional DSLR Camera',
    description: 'Canon EOS 5D Mark IV with 24-70mm lens, perfect for photography projects.',
    price: 50,
    period: 'day',
    category: 'Photography',
    location: 'New York, NY',
    owner: {
      name: 'Jane Smith',
      rating: 4.8,
      reviewCount: 23
    },
    imageUrl: 'https://placehold.co/600x400/indigo/white?text=Camera'
  },
  {
    id: '2',
    title: 'Electric Power Drill Set',
    description: 'DeWalt cordless drill with multiple bits and attachments for any home project.',
    price: 25,
    period: 'day',
    category: 'Tools',
    location: 'Boston, MA',
    owner: {
      name: 'Mike Johnson',
      rating: 4.9,
      reviewCount: 45
    },
    imageUrl: 'https://placehold.co/600x400/indigo/white?text=Drill'
  },
  {
    id: '3',
    title: 'Mountain Bike',
    description: 'Trek mountain bike in excellent condition, perfect for weekend adventures.',
    price: 35,
    period: 'day',
    category: 'Sports',
    location: 'Denver, CO',
    owner: {
      name: 'Sarah Wilson',
      rating: 4.7,
      reviewCount: 18
    },
    imageUrl: 'https://placehold.co/600x400/indigo/white?text=Bike'
  },
  {
    id: '4',
    title: 'Projector for Home Theater',
    description: 'HD projector with built-in speakers, HDMI and USB ports for movie nights.',
    price: 40,
    period: 'day',
    category: 'Electronics',
    location: 'Chicago, IL',
    owner: {
      name: 'David Brown',
      rating: 4.6,
      reviewCount: 31
    },
    imageUrl: 'https://placehold.co/600x400/indigo/white?text=Projector'
  },
  {
    id: '5',
    title: 'Party Tent (10x20 ft)',
    description: 'Large canopy tent perfect for backyard parties, weddings or events.',
    price: 75,
    period: 'day',
    category: 'Party Supplies',
    location: 'Miami, FL',
    owner: {
      name: 'Rachel Green',
      rating: 4.9,
      reviewCount: 27
    },
    imageUrl: 'https://placehold.co/600x400/indigo/white?text=Tent'
  },
  {
    id: '6',
    title: 'Professional Sound System',
    description: 'Complete PA system with speakers, mixer and microphones for events.',
    price: 100,
    period: 'day',
    category: 'Audio Equipment',
    location: 'Los Angeles, CA',
    owner: {
      name: 'Tom Wilson',
      rating: 5.0,
      reviewCount: 39
    },
    imageUrl: 'https://placehold.co/600x400/indigo/white?text=Sound+System'
  }
];

export default function DashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to login page if not authenticated
      redirect('/login');
    },
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Photography', 'Tools', 'Electronics', 'Sports', 'Party Supplies', 'Audio Equipment'];

  const filteredItems = mockItems.filter(item => {
    // Filter by category
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    
    // Filter by search query
    const searchMatch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 transition duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">WorkIt</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-6">
          {/* User profile */}
          <div className="flex items-center px-2 mb-6">
            <div className="relative w-10 h-10 mr-3">
              <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden transition-transform duration-200">
                {session?.user?.image ? (
                  <img 
                    src={session.user.image}
                    alt={session.user.name || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="w-5 h-5 text-indigo-600" />
                )}
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-800">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <Link 
              href="/dashboard" 
              className="flex items-center px-2 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md group transition-colors duration-200"
            >
              <FiHome className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link 
              href="/browse" 
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md group transition-colors duration-200"
            >
              <FiSearch className="w-5 h-5 mr-3" />
              Browse Items
            </Link>
            <Link 
              href="/messages" 
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md group transition-colors duration-200"
            >
              <FiMessageCircle className="w-5 h-5 mr-3" />
              Messages
            </Link>
            <Link 
              href="/create-listing" 
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md group transition-colors duration-200"
            >
              <FiPlus className="w-5 h-5 mr-3" />
              Create Listing
            </Link>
            <Link 
              href="/my-items" 
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md group transition-colors duration-200"
            >
              <FiPackage className="w-5 h-5 mr-3" />
              My Items
            </Link>
            <Link 
              href="/rentals" 
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md group transition-colors duration-200"
            >
              <FiCalendar className="w-5 h-5 mr-3" />
              My Rentals
            </Link>
            <Link 
              href="/saved" 
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md group transition-colors duration-200"
            >
              <FiHeart className="w-5 h-5 mr-3" />
              Saved Items
            </Link>
          </nav>

          <div className="pt-6 mt-6 border-t border-gray-200">
            <Link 
              href="/settings" 
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md group transition-colors duration-200"
            >
              <FiSettings className="w-5 h-5 mr-3" />
              Settings
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: '/welcome' })}
              className="flex items-center w-full px-2 py-2 mt-1 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md group transition-colors duration-200"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            
            <div className="relative flex-1 max-w-xl px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items..."
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FiSearch className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center ml-4">
              <Link 
                href="/messages" 
                className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <FiMessageCircle className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </header>

        {/* Categories filter */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Items grid */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Discover Items</h1>
            <p className="text-gray-600 mt-1">Find exactly what you need, when you need it.</p>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        ${item.price}<span className="text-sm font-normal text-gray-500">/{item.period}</span>
                      </span>
                      <span className="text-sm text-gray-500">{item.location}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {item.owner.name.charAt(0)}
                          </span>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{item.owner.name}</span>
                      </div>
                      <Link 
                        href={`/items/${item.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <FiSearch className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 