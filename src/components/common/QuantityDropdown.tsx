import React, { useState } from "react";
import ArrowIcon from "@/components/svg/ArrowIcon";

type TQuantityDropdownProps = {
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  className?: string;
};

export default function QuantityDropdown({
  selectedQuantity,
  onQuantityChange,
  className = "",
}: TQuantityDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  // 0-100까지의 숫자 배열 생성
  const quantityOptions = Array.from({ length: 101 }, (_, i) => i);

  const handleSelect = (quantity: number) => {
    onQuantityChange(quantity);
    setShowDropdown(false);
  };

  return (
    <div className={`flex justify-center items-center gap-3.5 ${className}`}>
      <div className="text-primary-950 text-base font-normal">수량</div>
      <div className="relative flex justify-start items-center w-25 p-3.5 bg-white rounded-sm border border-primary-300">
        <div className="flex-1 self-stretch flex justify-end items-center gap-1">
          <div className="justify-center text-neutral-800 text-base font-normal">{selectedQuantity}</div>
          <ArrowIcon
            direction="down"
            className="w-4 h-4 p-[1px] text-primary-950"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {/* 드롭다운 메뉴 */}
          {showDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-primary-200 rounded-md shadow-lg z-10 w-25">
              <div
                className="overflow-y-auto py-2"
                style={{
                  maxHeight: "128px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db #f3f4f6",
                }}
              >
                {quantityOptions.map((quantity) => (
                  <div
                    key={quantity}
                    className="px-3 py-1 hover:bg-primary-50 cursor-pointer text-center"
                    onClick={() => handleSelect(quantity)}
                  >
                    {quantity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
