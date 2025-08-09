'use client';
import React, { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import ChatWindow from './ChatWindow';
import FloatingButton from './FloatingButton';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage, resendLast } = useChat();

  return (
    <>
      <FloatingButton onClick={() => setIsOpen((o) => !o)} />
      {isOpen && (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
          onResend={resendLast}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
