"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FiUser, FiMail, FiEdit, FiCamera, FiSave, FiPackage, FiMapPin, FiPhone, FiCalendar, FiClock, FiStar } from 'react-icons/fi';
import Link from 'next/link';

// Mock data for user's listed items
const mockListedItems = [
  {
    id: 'item1',
    title: 'Professional DSLR Camera',
    description: 'Canon EOS 5D Mark IV with 24-70mm lens',
    price: 50,
    period: 'day',
    imageUrl: 'https://placehold.co/300x200/indigo/white?text=Camera',
    rentedTimes: 8,
    rating: 4.8
  },
  {
    id: 'item2',
    title: 'Electric Power Drill Set',
    description: 'DeWalt cordless drill with multiple bits',
    price: 25,
    period: 'day',
    imageUrl: 'https://placehold.co/300x200/indigo/white?text=Drill',
    rentedTimes: 5,
    rating: 4.5
  },
  {
    id: 'item3',
    title: 'Mountain Bike',
    description: 'Trek mountain bike in excellent condition',
    price: 35,
    period: 'day',
    imageUrl: 'https://placehold.co/300x200/indigo/white?text=Bike',
    rentedTimes: 12,
    rating: 4.9
  }
];

// Mock rental history
const mockRentalHistory = [
  {
    id: 'rental1',
    itemName: 'Projector for Home Theater',
    rentalDate: '2023-10-15',
    returnDate: '2023-10-17',
    owner: 'David Brown',
    status: 'Completed'
  },
  {
    id: 'rental2',
    itemName: 'Party Tent (10x20 ft)',
    rentalDate: '2023-09-25',
    returnDate: '2023-09-26',
    owner: 'Rachel Green',
    status: 'Completed'
  }
];

export default function ProfilePage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to login page if not authenticated
      redirect('/login');
    },
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || '');
  const [bio, setBio] = useState('I love renting out my items to help others while making some extra income. I take great care of my equipment and expect the same from renters.');
  const [location, setLocation] = useState('San Francisco, CA');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [memberSince, setMemberSince] = useState('January 2023');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Here you would normally make an API call to update the user profile
    // For demo purposes, we'll just toggle editing mode
    setIsEditing(false);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Profile Header */}
      <div className="bg-indigo-600 h-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-24">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="sm:flex sm:items-center sm:justify-between p-6">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 flex items-center justify-center">
                      {session?.user?.image ? (
                        <img 
                          src={session.user.image}
                          alt={session.user.name || "Profile"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiUser className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    
                    {isEditing && (
                      <button 
                        className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2"
                        title="Change profile picture"
                      >
                        <FiCamera className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-0 sm:ml-6">
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full px-3 py-2 text-xl font-bold border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900 truncate">
                      {session?.user?.name || "User"}
                    </h1>
                  )}
                  
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <FiMail className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span>{session?.user?.email}</span>
                  </div>
                  
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span>Member since {memberSince}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-0">
                {isEditing ? (
                  <button
                    onClick={handleSaveProfile}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiSave className="mr-2 -ml-1 h-4 w-4" />
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiEdit className="mr-2 -ml-1 h-4 w-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-2 md:grid-cols-4">
              <div className="p-4 text-center border-r border-gray-200">
                <span className="block text-2xl font-bold text-indigo-600">{mockListedItems.length}</span>
                <span className="text-sm text-gray-500">Items Listed</span>
              </div>
              <div className="p-4 text-center border-r border-gray-200">
                <span className="block text-2xl font-bold text-indigo-600">{mockRentalHistory.length}</span>
                <span className="text-sm text-gray-500">Items Rented</span>
              </div>
              <div className="p-4 text-center border-r border-gray-200">
                <span className="block text-2xl font-bold text-indigo-600">25</span>
                <span className="text-sm text-gray-500">Total Transactions</span>
              </div>
              <div className="p-4 text-center">
                <span className="block text-2xl font-bold text-indigo-600">4.9</span>
                <span className="text-sm text-gray-500">Rating</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-base ${
                  activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('listings')}
                className={`py-4 px-1 border-b-2 font-medium text-base ${
                  activeTab === 'listings'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Listings
              </button>
              <button
                onClick={() => setActiveTab('rentals')}
                className={`py-4 px-1 border-b-2 font-medium text-base ${
                  activeTab === 'rentals'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rental History
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-base ${
                  activeTab === 'reviews'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="mt-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                {isEditing ? (
                  <form className="p-6 space-y-6">
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          rows={3}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">This will only be shared with users you're transacting with</p>
                    </div>
                  </form>
                ) : (
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900">About</h3>
                      <p className="mt-2 text-gray-600">{bio}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900">Location</h3>
                      <div className="mt-2 flex items-center text-gray-600">
                        <FiMapPin className="mr-2 h-5 w-5 text-gray-400" />
                        <span>{location}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                      <div className="mt-2 flex items-center text-gray-600">
                        <FiPhone className="mr-2 h-5 w-5 text-gray-400" />
                        <span>{phone}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Only visible to users you're transacting with</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Listings Tab */}
            {activeTab === 'listings' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">My Listed Items</h2>
                  <Link
                    href="/create-listing"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    + New Listing
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockListedItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-indigo-600">${item.price}<span className="text-sm text-gray-500">/{item.period}</span></span>
                          <div className="flex items-center">
                            <FiStar className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium text-gray-700">{item.rating}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          Rented {item.rentedTimes} times
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Edit
                          </button>
                          <button className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Rentals Tab */}
            {activeTab === 'rentals' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Items I've Rented</h2>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rental Period
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Owner
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockRentalHistory.map(rental => (
                          <tr key={rental.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{rental.itemName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{rental.rentalDate} to {rental.returnDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{rental.owner}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {rental.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-indigo-600 hover:text-indigo-900">View Details</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews (25)</h2>
                
                <div className="space-y-4">
                  {/* Sample reviews */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <span className="text-indigo-600 font-medium">JD</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">John Davis</h4>
                        <div className="flex text-yellow-400">
                          <FiStar className="h-4 w-4 fill-current" />
                          <FiStar className="h-4 w-4 fill-current" />
                          <FiStar className="h-4 w-4 fill-current" />
                          <FiStar className="h-4 w-4 fill-current" />
                          <FiStar className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">
                        <FiClock className="inline mr-1" />
                        2 weeks ago
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Great camera! It was in perfect condition and the owner was very helpful in explaining how to use some of the advanced features.
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      Item: Professional DSLR Camera
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <span className="text-indigo-600 font-medium">SM</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Sarah Miller</h4>
                        <div className="flex text-yellow-400">
                          <FiStar className="h-4 w-4 fill-current" />
                          <FiStar className="h-4 w-4 fill-current" />
                          <FiStar className="h-4 w-4 fill-current" />
                          <FiStar className="h-4 w-4 fill-current" />
                          <FiStar className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">
                        <FiClock className="inline mr-1" />
                        1 month ago
                      </div>
                    </div>
                    <p className="text-gray-600">
                      The drill set was complete and worked perfectly for my home project. Would rent again from this user.
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      Item: Electric Power Drill Set
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                      Load more reviews
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 