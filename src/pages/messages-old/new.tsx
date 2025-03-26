import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import ConversationHeader from '@/components/messaging/ConversationHeader';
import MessageInput from '@/components/messaging/MessageInput';
import EmptyState from '@/components/messaging/EmptyState';

// Mock data for development
const mockUsers: { [key: string]: any } = {
  'user1': {
    id: 'user1',
    name: 'John Smith',
    image: '/images/default-avatar.png',
    isOnline: true,
  },
  'user2': {
    id: 'user2',
    name: 'Jane Doe',
    image: '/images/default-avatar.png',
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
  },
};

const mockItems: { [key: string]: any } = {
  'item1': {
    id: 'item1',
    name: 'DSLR Camera',
  },
  'item2': {
    id: 'item2',
    name: 'HD Projector',
  },
  'item3': {
    id: 'item3',
    name: 'Electric Guitar',
  },
};

const NewMessagePage: NextPage = () => {
  const router = useRouter();
  const { recipient, item: itemId } = router.query;
  
  const [recipientUser, setRecipientUser] = useState<any>(null);
  const [item, setItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    if (recipient && mockUsers[recipient as string]) {
      setRecipientUser(mockUsers[recipient as string]);
    }
    
    if (itemId && mockItems[itemId as string]) {
      setItem(mockItems[itemId as string]);
    }
    
    setIsLoading(false);
  }, [recipient, itemId]);

  const handleSendMessage = (text: string) => {
    // In a real app, this would create a new conversation and send the message
    console.log('Creating new conversation with:', recipient);
    console.log('About item:', itemId);
    console.log('First message:', text);
    
    // Simulate API call delay
    setTimeout(() => {
      // Redirect to a new conversation
      router.push(`/messages/1`);
    }, 500);
  };

  // If loading or recipient not found
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-4 max-w-6xl">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  // If recipient not found
  if (!recipientUser) {
    return (
      <Layout>
        <div className="container mx-auto p-4 max-w-6xl">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-red-500 mb-2">User not found</h2>
            <p className="text-gray-600">
              The user you're trying to message could not be found. Please check the URL and try again.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>New Message | WorkIt</title>
        <meta name="description" content="Start a new conversation" />
      </Head>
      
      <Layout>
        <div className="container mx-auto p-4 max-w-6xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="flex flex-col h-[calc(100vh-200px)]">
              <ConversationHeader 
                user={recipientUser} 
                itemId={item?.id}
                itemName={item?.name}
              />
              
              <div className="flex-1 overflow-y-auto bg-gray-50">
                <EmptyState 
                  type="no-messages" 
                  itemId={item?.id}
                  itemName={item?.name}
                />
              </div>
              
              <MessageInput 
                onSendMessage={handleSendMessage} 
                placeholder={`Message ${recipientUser.name}...`}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewMessagePage; 