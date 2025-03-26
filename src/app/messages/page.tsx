"use client";

import React, { useState } from 'react';
import ConversationList from '@/components/messaging/ConversationList';
import { FiEdit, FiSend } from 'react-icons/fi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    otherUserName: 'Jane Smith',
    otherUserImage: 'https://placehold.co/100/indigo/white?text=JS',
    lastMessage: "I'm interested in renting your camera for the weekend. Is it still available?",
    lastMessageDate: new Date(2023, 7, 12, 14, 30),
    unreadCount: 2
  },
  {
    id: '2',
    otherUserName: 'Mike Johnson',
    otherUserImage: 'https://placehold.co/100/indigo/white?text=MJ',
    lastMessage: 'Thanks for the drill set! It worked perfectly for my project.',
    lastMessageDate: new Date(2023, 7, 10, 9, 15),
    unreadCount: 0
  },
  {
    id: '3',
    otherUserName: 'Sarah Wilson',
    otherUserImage: 'https://placehold.co/100/indigo/white?text=SW',
    lastMessage: "I'll return the bike tomorrow afternoon, around 3pm. Does that work?",
    lastMessageDate: new Date(2023, 7, 8, 18, 45),
    unreadCount: 0
  }
];

export default function MessagesPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });
  
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  
  const activeConversation = mockConversations.find(conv => conv.id === activeConversationId);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() === '') return;
    
    // In a real app, this would send the message to an API
    console.log(`Sending message to ${activeConversationId}: ${messageText}`);
    setMessageText('');
  };
  
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Link 
            href="/messages/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FiEdit className="mr-2 -ml-1 h-4 w-4" />
            New Message
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Conversation List */}
            <div className="col-span-1 border-r border-gray-200">
              <ConversationList 
                conversations={mockConversations} 
                activeConversationId={activeConversationId || undefined}
              />
            </div>
            
            {/* Message Content */}
            <div className="col-span-2 flex flex-col h-full">
              {activeConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center mr-3">
                      <img
                        src={activeConversation.otherUserImage}
                        alt={activeConversation.otherUserName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{activeConversation.otherUserName}</h3>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 flex-shrink-0 mr-2">
                          <img
                            src={activeConversation.otherUserImage}
                            alt={activeConversation.otherUserName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-gray-800">{activeConversation.lastMessage}</p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            {new Date(activeConversation.lastMessageDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      
                      {/* Example reply */}
                      <div className="flex justify-end">
                        <div className="bg-indigo-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-gray-800">Yes, it's available! When would you like to pick it up?</p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ml-2">
                          {session?.user?.image ? (
                            <img
                              src={session.user.image}
                              alt={session.user.name || "You"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-600 font-medium">
                                {session?.user?.name?.charAt(0) || "U"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700"
                      >
                        <FiSend className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <FiSend className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Your Messages</h3>
                  <p className="text-gray-600 max-w-md mb-6">
                    Select a conversation from the list or start a new message to communicate with other users about items.
                  </p>
                  <Link 
                    href="/messages/new" 
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <FiEdit className="mr-2 -ml-1 h-4 w-4" />
                    New Message
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 