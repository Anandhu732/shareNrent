"use client";

import { useState } from 'react';
import StarRating from './StarRating';

interface ReviewFormProps {
  itemId: number;
  itemName: string;
  onSubmit: (review: {
    rating: number;
    comment: string;
  }) => void;
  onCancel?: () => void;
}

export default function ReviewForm({ 
  itemId, 
  itemName, 
  onSubmit, 
  onCancel 
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (error && rating === 0) {
      setError(null);
    }
  };
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setComment(text);
    setCharCount(text.length);
    
    if (error && text.trim().length > 0 && rating > 0) {
      setError(null);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }
    
    if (comment.trim().length === 0) {
      setError('Please enter a review comment.');
      return;
    }
    
    onSubmit({
      rating,
      comment: comment.trim()
    });
    
    // Reset form after submission
    setRating(0);
    setComment('');
    setCharCount(0);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Write a Review for {itemName}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rating
          </label>
          <div className="flex items-center">
            <StarRating 
              rating={rating} 
              size="large" 
              editable={true} 
              onRatingChange={handleRatingChange} 
            />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {rating > 0 ? `${rating} stars` : 'Select a rating'}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={5}
            className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Share your experience with this item. What did you like or dislike? Would you recommend it to others?"
            value={comment}
            onChange={handleCommentChange}
            maxLength={1000}
          ></textarea>
          <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
            {charCount}/1000 characters
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
} 