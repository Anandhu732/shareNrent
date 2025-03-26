"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FiClock, FiCheck, FiAlertTriangle, FiCalendar, FiUser, FiMapPin, FiMessageSquare, FiStar } from 'react-icons/fi';

// Mock rental data for user
const mockRentals = [
  {
    id: '1',
    itemId: '101',
    itemTitle: 'Professional DSLR Camera',
    itemImage: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ownerId: 'user123',
    ownerName: 'John Davis',
    ownerImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    startDate: '2023-07-01',
    endDate: '2023-07-03',
    totalPrice: 135,
    status: 'completed',
    location: 'Manhattan, NY',
    hasReviewed: true,
    rating: 5
  },
  {
    id: '2',
    itemId: '102',
    itemTitle: 'Electric Bike',
    itemImage: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ownerId: 'user456',
    ownerName: 'Sarah Johnson',
    ownerImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    startDate: '2023-07-15',
    endDate: '2023-07-18',
    totalPrice: 120,
    status: 'active',
    location: 'Brooklyn, NY',
    hasReviewed: false
  },
  {
    id: '3',
    itemId: '103',
    itemTitle: 'Tent and Camping Gear',
    itemImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ownerId: 'user789',
    ownerName: 'Michael Brown',
    ownerImage: 'https://randomuser.me/api/portraits/men/43.jpg',
    startDate: '2023-08-05',
    endDate: '2023-08-08',
    totalPrice: 90,
    status: 'upcoming',
    location: 'Queens, NY',
    hasReviewed: false
  },
  {
    id: '4',
    itemId: '104',
    itemTitle: 'DJ Equipment',
    itemImage: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ownerId: 'user012',
    ownerName: 'Emma Wilson',
    ownerImage: 'https://randomuser.me/api/portraits/women/29.jpg',
    startDate: '2023-06-15',
    endDate: '2023-06-17',
    totalPrice: 180,
    status: 'completed',
    location: 'Bronx, NY',
    hasReviewed: false
  }
];

type RentalStatus = 'all' | 'active' | 'upcoming' | 'completed';

export default function RentalsPage() {
  const { data: session, status: sessionStatus } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const [filter, setFilter] = useState<RentalStatus>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  
  // Filter rentals based on selected status
  const filteredRentals = mockRentals.filter(rental => {
    if (filter === 'all') return true;
    return rental.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiClock className="mr-1 h-3 w-3" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <FiCheck className="mr-1 h-3 w-3" />
            Completed
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FiCalendar className="mr-1 h-3 w-3" />
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };
  
  const openReviewModal = (rentalId: string) => {
    setSelectedRental(rentalId);
    setShowReviewModal(true);
  };
  
  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedRental(null);
    setReviewRating(5);
    setReviewComment('');
  };
  
  const submitReview = () => {
    // In a real app, this would send the review to the API
    console.log({
      rentalId: selectedRental,
      rating: reviewRating,
      comment: reviewComment
    });
    
    // Close the modal
    closeReviewModal();
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Rentals</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your rental history and current rentals
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === 'all'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 bg-white hover:bg-gray-100'
                }`}
              >
                All ({mockRentals.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 bg-white hover:bg-gray-100'
                }`}
              >
                In Progress ({mockRentals.filter(rental => rental.status === 'active').length})
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === 'upcoming'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 bg-white hover:bg-gray-100'
                }`}
              >
                Upcoming ({mockRentals.filter(rental => rental.status === 'upcoming').length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === 'completed'
                    ? 'bg-gray-100 text-gray-700'
                    : 'text-gray-700 bg-white hover:bg-gray-100'
                }`}
              >
                Completed ({mockRentals.filter(rental => rental.status === 'completed').length})
              </button>
            </div>
          </div>
        </div>
        
        {/* Rental List */}
        {filteredRentals.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg divide-y divide-gray-200">
            {filteredRentals.map(rental => (
              <div key={rental.id} className="p-6">
                <div className="flex flex-col sm:flex-row">
                  {/* Item image and details */}
                  <div className="flex flex-grow mb-4 sm:mb-0">
                    <div className="flex-shrink-0">
                      <div className="h-24 w-24 rounded-md overflow-hidden">
                        <img
                          src={rental.itemImage}
                          alt={rental.itemTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/item/${rental.itemId}`}
                          className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                        >
                          {rental.itemTitle}
                        </Link>
                        {getStatusBadge(rental.status)}
                      </div>
                      
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <span>
                              {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <FiMapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <span>{rental.location}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span className="font-medium text-gray-900">${rental.totalPrice}</span>
                          <span className="ml-1">total</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={rental.ownerImage}
                            alt={rental.ownerName}
                          />
                        </div>
                        <div className="ml-3 flex items-center text-sm text-gray-500">
                          <FiUser className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>Rented from {rental.ownerName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="sm:ml-6 flex flex-col justify-center space-y-3">
                    <Link
                      href={`/messages?user=${rental.ownerId}`}
                      className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FiMessageSquare className="mr-2 h-4 w-4" />
                      Message Owner
                    </Link>
                    
                    {rental.status === 'completed' && !rental.hasReviewed && (
                      <button
                        onClick={() => openReviewModal(rental.id)}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FiStar className="mr-2 h-4 w-4" />
                        Leave Review
                      </button>
                    )}
                    
                    {rental.status === 'completed' && rental.hasReviewed && (
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className={`h-4 w-4 ${i < rental.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="ml-2">Reviewed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No rentals found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start renting items to build your rental history.
            </p>
            <div className="mt-6">
              <Link
                href="/browse"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Items
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiStar className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Leave a Review</h3>
                    <div className="mt-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none"
                            >
                              <FiStar 
                                className={`h-8 w-8 ${
                                  reviewRating >= star 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="review-comment" 
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Comments
                        </label>
                        <textarea
                          id="review-comment"
                          rows={4}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Share your experience with this item..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={submitReview}
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeReviewModal}
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