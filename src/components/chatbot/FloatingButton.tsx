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
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-4 sm:left-5 z-[60]
                 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full
                 bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] text-[var(--color-primary-950)]
                 shadow-lg shadow-black/10 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-primary-50)]/90
                 transition-all duration-300 ease-out hover:bg-[var(--color-primary-100)] md:hover:scale-105 active:scale-95
                 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-primary-200)]"
    >
      <span className="text-xl sm:text-2xl select-none">💬</span>
      <span className="pointer-events-none absolute -top-2 right-0 translate-x-1/2 rounded-full bg-[var(--color-primary-700)] px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold leading-none text-white shadow-sm ring-1 ring-white/30">
        AI
      </span>
    </button>
  );
}
