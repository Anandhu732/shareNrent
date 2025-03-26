import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { FiSearch } from 'react-icons/fi';

interface Conversation {
  id: string;
  otherUserName: string;
  otherUserImage: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations, 
  activeConversationId 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConversations = conversations.filter(conversation =>
    conversation.otherUserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <Link 
              href={`/messages/${conversation.id}`} 
              key={conversation.id}
              className={`block border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                activeConversationId === conversation.id ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-start p-4">
                <div className="relative mr-3">
                  <Image
                    src={conversation.otherUserImage || '/images/default-avatar.png'}
                    alt={conversation.otherUserName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  {conversation.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium truncate">{conversation.otherUserName}</h3>
                    <span className="text-xs text-gray-500">
                      {format(conversation.lastMessageDate, 'h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? 'No conversations match your search' : 'No conversations yet'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList; 