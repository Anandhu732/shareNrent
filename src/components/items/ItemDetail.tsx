import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiTag, FiUser, FiMessageCircle } from 'react-icons/fi';
import StarRating from '../reviews/StarRating';
import { formatPrice } from '@/utils/formatters';

interface ItemDetailProps {
  item: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    location: string;
    category: string;
    owner: {
      id: string;
      name: string;
      avatarUrl?: string;
      rating?: number;
      reviewCount?: number;
    };
    availableFrom?: Date;
    availableTo?: Date;
  };
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the API
      console.log('Sending message:', message);
      // Then redirect to the messaging page
      window.location.href = `/messages/new?item=${item.id}&recipient=${item.owner.id}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative h-72 md:h-full">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-1/2 p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
            <div className="text-xl font-semibold text-indigo-600">
              {formatPrice(item.price)}<span className="text-gray-600 text-sm">/day</span>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <FiMapPin className="text-gray-500 mr-1" />
            <span className="text-gray-600">{item.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <FiTag className="text-gray-500 mr-1" />
              <span className="text-gray-600 text-sm">{item.category}</span>
            </div>
            {item.availableFrom && item.availableTo && (
              <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <FiCalendar className="text-gray-500 mr-1" />
                <span className="text-gray-600 text-sm">Available: {item.availableFrom.toLocaleDateString()} - {item.availableTo.toLocaleDateString()}</span>
              </div>
            )}
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 my-4">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{item.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden relative">
                {item.owner.avatarUrl ? (
                  <Image
                    src={item.owner.avatarUrl}
                    alt={item.owner.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <FiUser className="w-full h-full text-gray-400 p-2" />
                )}
              </div>
              <div>
                <Link href={`/users/${item.owner.id}`} className="font-medium hover:text-indigo-600 transition-colors">
                  {item.owner.name}
                </Link>
                {item.owner.rating && (
                  <div className="flex items-center mt-1">
                    <StarRating rating={item.owner.rating} size="small" />
                    <span className="text-xs text-gray-500 ml-1">
                      ({item.owner.reviewCount} {item.owner.reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setShowContactModal(true)}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <FiMessageCircle className="mr-2" />
              Contact Owner
            </button>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Contact {item.owner.name}</h3>
            
            <p className="text-gray-600 mb-4">
              Send a message to inquire about "{item.title}"
            </p>
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I'm interested in renting this item..."
              className="w-full border border-gray-300 rounded-md p-3 mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`px-4 py-2 rounded-md ${
                  message.trim() 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail; 