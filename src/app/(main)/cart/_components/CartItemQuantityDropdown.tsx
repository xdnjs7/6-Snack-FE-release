"use client";

import React, { useState } from "react";
import ic_chevron_down from "@/assets/icons/ic_chevron_down.svg";
import Image from "next/image";

type TCartItemQuantityDropdownProps = {
  value: number;
  onClick: (quantity: number) => void;
};

export default function CartItemQuantityDropdown({ value, onClick }: TCartItemQuantityDropdownProps) {
  const [isQuantityDropdownVisible, setIsQuantityDropdownVisible] = useState<boolean>(false);

  const quantityOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  const handleQuantityDropdown = () => {
    setIsQuantityDropdownVisible(!isQuantityDropdownVisible);
  };

  return (
    <>
      <div
        onClick={handleQuantityDropdown}
        className="flex justify-end items-center h-[40px] pl-[24px] gap-[4px] cursor-pointer"
      >
        <p className="font-bold text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px]">{value}</p>
        <div className="relative w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]">
          <Image src={ic_chevron_down} alt="아래 화살표" fill className="object-cover" />
        </div>
      </div>

      {isQuantityDropdownVisible && (
        <div className="absolute h-[80px] top-[40px] right-0 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-auto overflow-x-hidden bg-white scrollbar-hide cursor-pointer">
          {quantityOptions.map((quantity, i) => (
            <ul
              onClick={() => {
                onClick(quantity);
                setIsQuantityDropdownVisible(false);
              }}
              key={`${quantity}_${i}`}
              className="flex justify-end items-center h-[40px] px-[24px] font-bold text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px]"
            >
              {quantity}
            </ul>
          ))}
        </div>
      )}
    </>
  );
}
