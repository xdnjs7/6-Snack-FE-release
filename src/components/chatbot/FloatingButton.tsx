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
      className="fixed bottom-5 left-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full
                 bg-[#f5f5f5] border border-[#d1d5db] text-[#222] shadow-lg shadow-black/10
                 transition-all duration-300 ease-out hover:bg-[#e5e7eb] hover:scale-105 active:scale-95
                 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d1d5db]"
    >
      <span className="text-2xl select-none">💬</span>
      <span className="pointer-events-none absolute -top-2 right-0 translate-x-1/2 rounded-full bg-[#444] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow-sm ring-1 ring-white/30">
        AI
      </span>
    </button>
  );
}
