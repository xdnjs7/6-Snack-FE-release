"use client";
import React from "react";

interface BackdropSpinnerWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function BackdropSpinnerWrapper({ children, className }: BackdropSpinnerWrapperProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-20 ${className ?? ""}`}>
      {children}
    </div>
  );
}
