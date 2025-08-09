'use client';
import React from 'react';

interface FloatingButtonProps {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="챗봇 열기"
      className="fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full
                 bg-gradient-to-br from-[var(--color-secondary-500)] via-[var(--color-primary-600)] to-[var(--color-primary-800)]
                 text-white shadow-lg shadow-black/15 ring-1 ring-white/10
                 transition-all duration-300 ease-out hover:shadow-xl hover:brightness-110 hover:scale-105 active:scale-95
                 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-secondary-100)]
                 before:absolute before:inset-0 before:rounded-full before:bg-white/0 before:transition-colors
                 hover:before:bg-white/5"
    >
      <span className="text-2xl select-none">💬</span>
      <span className="pointer-events-none absolute -top-2 right-0 translate-x-1/2 rounded-full bg-[var(--color-red)] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow-sm ring-1 ring-white/30">
        AI
      </span>
    </button>
  );
}
