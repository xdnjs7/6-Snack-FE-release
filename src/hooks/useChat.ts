'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChatMessage, ChatRequest, ChatResponse } from '@/types/chat.types';

function createMessage(partial: Omit<ChatMessage, 'id' | 'createdAt'>): ChatMessage {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...partial,
  };
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  // 초기 웰컴 메시지
  useEffect(() => {
    setMessages([
      createMessage({
        role: 'assistant',
        content: '안녕하세요! 간식 대장 AI 도우미입니다. 무엇을 도와드릴까요? 예: "이번 달 예산 현황은 어떻게 봐?" / "구매 요청 승인 권한은?"',
      }),
    ]);
  }, []);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim() || isLoading) return;

      const userMsg = createMessage({ role: 'user', content: userMessage.trim() });
      const optimistic = [...messages, userMsg];
      setMessages(optimistic);
      setLastUserMessage(userMessage.trim());
      setIsLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: optimistic } as ChatRequest),
        });

        if (!res.ok) throw new Error(`API request failed with status ${res.status}`);

        const data: ChatResponse = await res.json();
        const aiMessage = createMessage({ role: 'assistant', content: data.message });
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error('[useChat] Chat API error:', error);
        const errorMessage = createMessage({
          role: 'assistant',
          content: '죄송합니다. 오류가 발생했습니다. 아이콘을 눌러 다시 시도할 수 있어요.',
          error: true,
        });
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const resendLast = useCallback(() => {
    if (lastUserMessage && !isLoading) {
      // 마지막 실패 메시지 제거 (error true)
      setMessages((prev) => prev.filter((m) => !m.error));
      sendMessage(lastUserMessage);
    }
  }, [lastUserMessage, isLoading, sendMessage]);

  return { messages, isLoading, sendMessage, resendLast };
}
