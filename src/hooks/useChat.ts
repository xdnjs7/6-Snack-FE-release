'use client';

import { useState } from 'react';
import { ChatMessage, ChatRequest, ChatResponse } from '@/types/chat.types';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const newUserMessage: ChatMessage = { role: 'user', content: userMessage };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages } as ChatRequest),
      });

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const data: ChatResponse = await res.json();
      const aiMessage: ChatMessage = { role: 'assistant', content: data.message };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('[useChat] Chat API error:', error);
      const errorMessage: ChatMessage = { role: 'assistant', content: '죄송합니다. 오류가 발생했습니다.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
}
