import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiMoreVertical, FiPhone, FiVideo } from 'react-icons/fi';

interface ConversationHeaderProps {
  user: {
    id: string;
    name: string;
    image?: string;
    isOnline?: boolean;
    lastActive?: Date;
  };
  itemId?: string;
  itemName?: string;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ 
  user, 
  itemId, 
  itemName 
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <Link 
          href="/messages" 
          className="md:hidden p-2 mr-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiChevronLeft className="h-5 w-5" />
        </Link>
        
        <div className="relative">
          <Image
            src={user.image || '/images/default-avatar.png'}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          {user.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>
        
        <div className="ml-3">
          <Link href={`/users/${user.id}`} className="font-semibold hover:underline">
            {user.name}
          </Link>
          <div className="text-xs text-gray-500">
            {user.isOnline ? (
              'Online now'
            ) : user.lastActive ? (
              `Last active ${formatLastActive(user.lastActive)}`
            ) : null}
          </div>
          {itemId && itemName && (
            <div className="text-xs text-gray-500 mt-1">
              Regarding: <Link href={`/items/${itemId}`} className="text-indigo-600 hover:underline">{itemName}</Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Voice call"
        >
          <FiPhone className="h-5 w-5" />
        </button>
        <button 
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Video call"
        >
          <FiVideo className="h-5 w-5" />
        </button>
        <button 
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="More options"
        >
          <FiMoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

function formatLastActive(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInMinutes < 24 * 60) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const days = Math.floor(diffInMinutes / (24 * 60));
    if (days === 1) {
      return 'yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      // Format as date
      return date.toLocaleDateString();
    }
  }
}

export default ConversationHeader; 