'use client';
import React, { useState, FormEvent } from 'react';
import { ChatMessage } from '@/types/chat.types';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

export default function ChatWindow({ messages, isLoading, onSendMessage, onClose }: ChatWindowProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 max-h-[70vh] bg-white border border-gray-300 rounded-lg shadow-xl flex flex-col overflow-hidden">
      <header className="flex items-center justify-between px-3 py-2 bg-blue-600 text-white">
        <span className="text-sm font-semibold">AI 도우미</span>
        <button onClick={onClose} aria-label="Close chat" className="text-white hover:opacity-80">✕</button>
      </header>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${m.role === 'user' ? 'text-right' : 'text-left'
              }`}
          >
            <span
              className={`inline-block px-2 py-1 rounded-md max-w-[85%] break-words ${m.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
                }`}
            >
              {m.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <span className="inline-block px-2 py-1 rounded-md bg-gray-100 text-gray-500 animate-pulse">
              응답 생성 중...
            </span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="메시지를 입력하세요..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md disabled:opacity-50 hover:bg-blue-500"
        >
          전송
        </button>
      </form>
    </div>
  );
}
