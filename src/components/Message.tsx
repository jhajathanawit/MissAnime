// src/components/Message.tsx
import React from 'react';

interface MessageProps {
  message: string;
  type: 'success' | 'error' | '';
}

const Message: React.FC<MessageProps> = ({ message, type }) => {
  if (!message) return null;

  const typeClasses = {
    success: 'bg-green-100 text-green-700 border-green-400',
    error: 'bg-red-100 text-red-700 border-red-400',
    '': '', // No specific styling if type is empty
  };

  return (
    <div
      className={`mt-4 p-3 rounded-md font-bold border ${typeClasses[type]}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Message;