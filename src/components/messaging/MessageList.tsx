import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  otherUser: {
    id: string;
    name: string;
    image?: string;
  };
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUserId, 
  otherUser 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach(message => {
    const date = format(message.timestamp, 'MMMM d, yyyy');
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  const renderStatus = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <span className="text-xs text-gray-400">Sent</span>;
      case 'delivered':
        return <span className="text-xs text-gray-400">Delivered</span>;
      case 'read':
        return <span className="text-xs text-blue-500">Read</span>;
      case 'failed':
        return <span className="text-xs text-red-500">Failed to send</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4">
      {Object.keys(groupedMessages).map(date => (
        <div key={date}>
          <div className="flex justify-center my-3">
            <span className="px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
              {date}
            </span>
          </div>
          
          {groupedMessages[date].map(message => {
            const isCurrentUser = message.senderId === currentUserId;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex max-w-[70%]">
                  {!isCurrentUser && (
                    <div className="flex-shrink-0 mr-2">
                      <Image
                        src={otherUser.image || '/images/default-avatar.png'}
                        alt={otherUser.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    <div 
                      className={`rounded-lg p-3 ${
                        isCurrentUser 
                          ? 'bg-indigo-600 text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.text}</p>
                    </div>
                    <div className={`flex text-xs mt-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-gray-500 mr-2">
                        {format(message.timestamp, 'h:mm a')}
                      </span>
                      {isCurrentUser && renderStatus(message.status)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 