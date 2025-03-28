"use client";

import { useState } from 'react';
import StarRating from './StarRating';

interface Review {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
  ownerResponse?: string;
}

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  isOwner?: boolean;
}

export default function ReviewList({ 
  reviews, 
  averageRating, 
  totalReviews, 
  isOwner = false 
}: ReviewListProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [responseText, setResponseText] = useState<string>('');
  const [respondingTo, setRespondingTo] = useState<number | null>(null);

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // 5 stars down to 1 star
  reviews.forEach(review => {
    ratingCounts[5 - review.rating]++;
  });

  // Sort reviews based on selected criteria
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  // Toggle expanded state of a review
  const toggleExpanded = (reviewId: number) => {
    if (expandedReviews.includes(reviewId)) {
      setExpandedReviews(expandedReviews.filter(id => id !== reviewId));
    } else {
      setExpandedReviews([...expandedReviews, reviewId]);
    }
  };

  // Handle responding to a review
  const handleRespond = (reviewId: number) => {
    setRespondingTo(reviewId);
    setResponseText('');
  };

  // Submit response to a review
  const submitResponse = () => {
    if (!responseText.trim()) return;
    
    // In a real app, you would send this to your backend
    console.log(`Submitting response to review #${respondingTo}: ${responseText}`);
    
    // Reset state
    setRespondingTo(null);
    setResponseText('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
            <div className="mt-1 flex items-center">
              <StarRating rating={averageRating} size="medium" />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                {averageRating.toFixed(1)} out of 5 ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by
            </label>
            <select
              id="sort-by"
              name="sort-by"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'highest' | 'lowest')}
            >
              <option value="newest">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Rating Distribution</h3>
          <div className="mt-2 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <div className="w-12 text-sm text-gray-600 dark:text-gray-400">{star} stars</div>
                <div className="ml-4 flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400" 
                    style={{ 
                      width: totalReviews > 0 
                        ? `${(ratingCounts[5 - star] / totalReviews) * 100}%` 
                        : '0%' 
                    }}
                  ></div>
                </div>
                <div className="ml-4 w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                  {ratingCounts[5 - star]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {review.userName.charAt(0)}
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{review.userName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-1">
                    <StarRating rating={review.rating} size="small" />
                  </div>
                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {review.comment.length > 200 && !expandedReviews.includes(review.id) ? (
                      <>
                        <p>{review.comment.substring(0, 200)}...</p>
                        <button 
                          onClick={() => toggleExpanded(review.id)}
                          className="mt-1 text-blue-600 dark:text-blue-400 hover:text-blue-500"
                        >
                          Show more
                        </button>
                      </>
                    ) : (
                      <>
                        <p>{review.comment}</p>
                        {review.comment.length > 200 && (
                          <button 
                            onClick={() => toggleExpanded(review.id)}
                            className="mt-1 text-blue-600 dark:text-blue-400 hover:text-blue-500"
                          >
                            Show less
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Owner Response */}
                  {review.ownerResponse && (
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Response from owner:</p>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{review.ownerResponse}</p>
                    </div>
                  )}

                  {/* Response Form for Owner */}
                  {isOwner && !review.ownerResponse && (
                    <div className="mt-4">
                      {respondingTo === review.id ? (
                        <div className="space-y-3">
                          <textarea
                            rows={3}
                            className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                            placeholder="Write your response..."
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                          />
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => setRespondingTo(null)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={submitResponse}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                              Submit Response
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleRespond(review.id)}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500"
                        >
                          Respond to this review
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
} 