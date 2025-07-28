"use client";
import { createPortal } from "react-dom";
import { TCategoryItem } from "@/types/subCategoryMenu.types";
import { CATEGORIES } from "@/lib/utils/categories.util";

type TMobileCategoryMenuProps = {
  items?: TCategoryItem[];
  isOpen: boolean;
  currentCategory?: string;
  onItemClick?: (item: TCategoryItem) => void;
  onClose: () => void;
  className?: string;
  useExternalState?: boolean;
};

export default function MobileCategoryMenu({
  items = CATEGORIES.parentCategory,
  isOpen,
  currentCategory,
  onItemClick,
  onClose,
  className = "",
}: TMobileCategoryMenuProps) {
  if (!isOpen) return null;

  // 전역 상태에서 선택된 카테고리 정보를 사용
  const isCurrentCategory = (item: TCategoryItem) => {
    if (!currentCategory || !item.id) return false;
    return currentCategory === item.id.toString();
  };

  const categoryMenuContent = (
    <div className="fixed inset-0 z-[9999] sm:hidden">
      {/* Background Overlay - 전체 화면 */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Category Menu */}
      <div
        className={`absolute top-14 left-1/2 transform -translate-x-1/2 w-full sm:hidden bg-white/90 backdrop-blur-lg flex flex-col items-center gap-2.5 p-4 ${className}`}
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
                {item.name}
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
