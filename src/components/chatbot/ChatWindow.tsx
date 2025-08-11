'use client';
import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { ChatMessage } from '@/types/chat.types';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onResend: () => void;
  onClose: () => void;
}

export default function ChatWindow({ messages, isLoading, onSendMessage, onResend, onClose }: ChatWindowProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onSendMessage(input.trim());
        setInput('');
      }
    }
  };

  const formatTime = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className="fixed bottom-28 left-6 z-[55] flex w-[22rem] max-h-[75vh] flex-col overflow-hidden rounded-xl
                 border border-border/60 bg-gradient-to-b from-white/90 to-white/80 backdrop-blur-xl
                 shadow-[0_8px_28px_-6px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.08)]
                 sm:w-[24rem] sm:max-h-[78vh] md:w-[26rem] md:max-h-[80vh]"
    >
      {/* Header */}
      <header
        className="relative flex items-center justify-between px-4 py-3 bg-[#f5f5f5] border-b border-[#d1d5db] text-[#222] shadow-inner"
      >
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#444] ring-2 ring-white/50" />
          Snack AI 도우미
        </div>
        <button
          onClick={onClose}
          aria-label="챗봇 닫기"
          className="rounded-md p-1 text-[#222]/80 transition-colors hover:bg-[#e5e7eb] hover:text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d1d5db]"
        >
          ✕
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d1d5db]/30 to-transparent" />
      </header>

      {/* Messages */}
      <div className="scrollbar relative flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm leading-relaxed">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div key={m.id || m.createdAt} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div
                className={`group relative max-w-[85%] whitespace-pre-wrap break-words rounded-lg px-3 py-2 shadow-sm ring-1 ring-black/5 ${isUser
                  ? 'bg-[#d1d5db] text-[#222]'
                  : 'bg-[#f5f5f5] text-[#222] backdrop-blur-sm'
                  } ${m.error ? 'border border-red-500' : ''}`}
              >
                {m.content}
                {m.error && (
                  <button
                    type="button"
                    onClick={onResend}
                    className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f5f5] text-red-500 shadow ring-1 ring-black/5 transition-colors hover:bg-red-500 hover:text-white"
                    aria-label="다시 시도"
                  >
                    ↺
                  </button>
                )}
              </div>
              <span className="mt-1 select-none text-[10px] font-medium text-[#888]">
                {formatTime(m.createdAt)}
              </span>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] animate-pulse rounded-lg bg-[#e5e7eb] px-3 py-2 text-[#888] ring-1 ring-black/5">
              응답 생성 중...
            </div>
          </div>
        )}
        <div className="h-1" />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-[#d1d5db] bg-[#f5f5f5] p-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="max-h-32 min-h-[2.5rem] flex-1 resize-none rounded-md border border-[#d1d5db] bg-[#f5f5f5] px-3 py-2 text-sm shadow-inner placeholder:text-[#888] focus:border-[#444] focus:outline-none focus:ring-2 focus:ring-[#d1d5db]"
            placeholder="Shift+Enter 줄바꿈, Enter 전송"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="inline-flex items-center gap-1 rounded-md bg-[#f5f5f5] border border-[#444] px-4 py-2 text-sm font-medium text-[#222] shadow disabled:cursor-not-allowed disabled:opacity-60 transition-colors hover:bg-[#e5e7eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d1d5db]"
          >
            전송
          </button>
        </div>
        <p className="mt-2 line-clamp-2 text-[10px] text-[#888]">
          예: &quot;이번 달 예산 현황은 어떻게 봐?&quot;, &quot;구매 요청 승인 권한은?&quot;
        </p>
      </form>
    </div>
  );
}
