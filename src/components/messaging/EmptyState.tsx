import React from 'react';
import Link from 'next/link';
import { FiMessageCircle, FiSearch } from 'react-icons/fi';

interface EmptyStateProps {
  type: 'no-conversations' | 'no-selection' | 'no-messages';
  itemId?: string;
  itemName?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, itemId, itemName }) => {
  const icon = <FiMessageCircle className="h-10 w-10 text-indigo-600" />;
  let title = '';
  let description = '';
  let action = null;

  switch (type) {
    case 'no-conversations':
      title = 'No conversations yet';
      description = 'Start a conversation by browsing items and contacting owners.';
      action = (
        <Link 
          href="/" 
          className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <FiSearch className="mr-2 h-4 w-4" />
          Browse available items
        </Link>
      );
      break;
    
    case 'no-selection':
      title = 'Select a conversation';
      description = 'Choose a conversation from the list or start a new one.';
      break;
    
    case 'no-messages':
      title = 'No messages yet';
      description = itemId && itemName 
        ? `Start the conversation about ${itemName} by sending a message.`
        : 'Start the conversation by sending a message.';
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="bg-indigo-100 rounded-full p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-gray-500 mt-2">
        {description}
      </p>
      {action}
    </div>
  );
};

export default EmptyState; 