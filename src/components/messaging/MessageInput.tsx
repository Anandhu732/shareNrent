import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  placeholder = 'Type a message...',
  disabled = false
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-end bg-white border-t border-gray-200 p-3"
    >
      <button
        type="button"
        className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
        disabled={disabled}
        aria-label="Attach file"
      >
        <FiPaperclip className="h-5 w-5" />
      </button>
      
      <div className="flex-1 mx-2 relative">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-32 overflow-y-auto"
        />
      </div>
      
      <div className="flex">
        <button
          type="button"
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 mr-1"
          disabled={disabled}
          aria-label="Add emoji"
        >
          <FiSmile className="h-5 w-5" />
        </button>
        
        <button
          type="submit"
          className={`p-2 rounded-full ${
            message.trim() && !disabled
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!message.trim() || disabled}
          aria-label="Send message"
        >
          <FiSend className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput; 