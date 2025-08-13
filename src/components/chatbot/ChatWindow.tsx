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
      className="fixed z-[55] flex flex-col overflow-hidden rounded-xl border border-primary-200 bg-primary-25/95 backdrop-blur-md shadow-[0_4px_18px_-4px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)]
                 left-4 sm:left-5 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)]
                 w-[min(100%-1.5rem,26rem)] sm:w-[24rem] md:w-[26rem]
                 max-h-[70vh] sm:max-h-[74vh] md:max-h-[78vh]
                 animate-[fadeIn_.25s_ease]"
    >
      {/* Header */}
      <header
        className="relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-primary-50 border-b border-primary-200 text-primary-950"
      >
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary-700 ring-2 ring-white/50" />
          Snack AI 도우미
        </div>
        <button
          onClick={onClose}
          aria-label="챗봇 닫기"
          className="rounded-md p-1 text-primary-950/80 transition-colors hover:bg-primary-100 hover:text-primary-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
        >
          ✕
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-200/30 to-transparent" />
      </header>

      {/* Messages */}
      <div className="scrollbar relative flex-1 space-y-4 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 text-sm leading-relaxed">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div key={m.id || m.createdAt} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div
                className={`group relative max-w-[85%] whitespace-pre-wrap break-words rounded-lg px-3 py-2 shadow-sm ring-1 ring-black/5 ${isUser
                  ? 'bg-primary-200 text-primary-950'
                  : 'bg-primary-50 text-primary-950 backdrop-blur-sm'
                  } ${m.error ? 'border border-red-500' : ''}`}
              >
                {m.content}
                {m.error && (
                  <button
                    type="button"
                    onClick={onResend}
                    className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 text-red-500 shadow ring-1 ring-black/5 transition-colors hover:bg-red-500 hover:text-white"
                    aria-label="다시 시도"
                  >
                    ↺
                  </button>
                )}
              </div>
              <span className="mt-1 select-none text-[10px] font-medium text-primary-400">
                {formatTime(m.createdAt)}
              </span>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] animate-pulse rounded-lg bg-primary-100 px-3 py-2 text-primary-400 ring-1 ring-black/5">
              응답 생성 중...
            </div>
          </div>
        )}
        <div className="h-1" />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-primary-200 bg-primary-50/90 backdrop-blur px-3 sm:px-4 py-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="max-h-32 min-h-[2.5rem] flex-1 resize-none rounded-md border border-primary-200 bg-primary-25 px-3 py-2 text-sm shadow-inner placeholder:text-primary-400 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="Shift+Enter 줄바꿈, Enter 전송"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="inline-flex items-center gap-1 rounded-md bg-primary-50 border border-primary-700 px-3 sm:px-4 py-2 text-sm font-medium text-primary-950 shadow disabled:cursor-not-allowed disabled:opacity-60 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
          >
            전송
          </button>
        </div>
        <p className="mt-2 line-clamp-2 text-[10px] text-primary-400">
          예: &quot;이번 달 예산 현황은 어떻게 봐?&quot;, &quot;구매 요청 승인 권한은?&quot;
        </p>
      </form>
    </div>
  );
}
