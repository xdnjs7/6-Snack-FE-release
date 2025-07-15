import React, { useState } from "react";
import Image from "next/image";
import ic_menu from "@/assets/icons/ic_menu.svg";

type TMenuDropdownProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
};

export default function MenuDropdown({ onEdit, onDelete, className = "" }: TMenuDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleEdit = () => {
    onEdit?.();
    setShowDropdown(false);
  };

  const handleDelete = () => {
    onDelete?.();
    setShowDropdown(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="w-6 h-6 inline-flex flex-col justify-start items-start cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Image src={ic_menu} alt="더보기 메뉴" fill className="object-contain" />
      </div>

      {/* 드롭다운 메뉴 */}
      {showDropdown && (
        <div className="absolute top-0 right-6 bg-white border border-primary-200 rounded-md shadow-lg z-10 w-[95px]">
          <div className="py-1">
            <div
              className="h-12 px-4 py-2 flex justify-start items-center gap-1 hover:bg-primary-50 cursor-pointer"
              onClick={handleEdit}
            >
              <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT'] whitespace-nowrap">
                상품 수정
              </div>
            </div>
            <div
              className="h-12 px-4 py-2 flex justify-start items-center gap-1 hover:bg-primary-50 cursor-pointer"
              onClick={handleDelete}
            >
              <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT'] whitespace-nowrap">
                상품 삭제
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
