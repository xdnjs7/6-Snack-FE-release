"use client";
import Image from "next/image";
import React, { Fragment, MouseEvent, useState } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";

type TCategoryItem = {
  id: string;
  label: string;
  href?: string;
};

type TMobileCategoryMenuProps = {
  items: TCategoryItem[];
  isOpen: boolean;
  currentCategory?: string;
  onItemClick?: (item: TCategoryItem) => void;
  onClose: () => void;
  className?: string;
};

const defaultCategories: TCategoryItem[] = [
  { id: "snack", label: "스낵" },
  { id: "beverage", label: "음료" },
  { id: "water", label: "생수" },
  { id: "convenience", label: "간편식" },
  { id: "fresh", label: "신선식" },
  { id: "coffee", label: "원두커피" },
  { id: "supplies", label: "비품" },
];

export default function MobileCategoryMenu({
  items = defaultCategories,
  isOpen,
  currentCategory,
  onItemClick,
  onClose,
  className = "",
}: TMobileCategoryMenuProps) {
  if (!isOpen) return null;

  // 상품리스트 페이지에서 currentCategory값 받아와야함
  const isCurrentCategory = (item: TCategoryItem) => {
    if (!currentCategory || !item.id) return false;
    return currentCategory === item.id;
  };

  const categoryMenuContent = (
    <div className="fixed inset-0 z-[9999]">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Category Menu */}
      <div
        className={`absolute top-14 md:top-[90px] left-1/2 transform -translate-x-1/2 w-full h-[calc(100vh-3.5rem)] sm:hidden bg-white/90 backdrop-blur-lg flex flex-col items-center gap-2.5 p-4 ${className}`}
      >
        {items.map((item) => {
          const isActive = isCurrentCategory(item);
          return (
            <div
              key={item.id}
              className="w-full p-2 inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors group"
              onClick={() => onItemClick?.(item)}
            >
              <div
                className={`justify-start text-base font-bold transition-all duration-200 ${
                  isActive ? "text-primary-950" : "text-primary-400 group-hover:text-primary-700"
                }`}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Portal을 사용하여 body에 직접 렌더링
  if (typeof window !== "undefined") {
    return createPortal(categoryMenuContent, document.body);
  }

  return categoryMenuContent;
}
