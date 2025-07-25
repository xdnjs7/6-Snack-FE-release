"use client";

import React, { useState, useRef, useEffect } from "react";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";

type TQuantityDropdownProps = {
  value: number;
  onClick?: (value: number) => void;
};

export default function QuantityDropdown({ value, onClick }: TQuantityDropdownProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [quantity, setQuantity] = useState<number>(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null); // 드롭다운 토글 버튼 ref
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const quantityOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 막기
    setIsDropdownVisible((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (/^\d*$/.test(val)) {
      const num = Number(val);
      if (val === "") {
        setQuantity(NaN);
      } else if (num >= 1 && num <= 100) {
        setQuantity(num);
      }
    }
  };

  const handleSelect = (val: number) => {
    setQuantity(val);
    onClick?.(val);
    setIsDropdownVisible(false);
  };

  // quantity가 바뀌고 드롭다운이 보일 때 해당 항목 스크롤 이동
  useEffect(() => {
    if (isDropdownVisible && quantity >= 1 && quantity <= 100) {
      const el = optionRefs.current[quantity - 1];
      const dropdown = dropdownRef.current;
      if (el && dropdown) {
        dropdown.scrollTop = el.offsetTop;
      }
    }
  }, [quantity, isDropdownVisible]);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // 드롭다운, 인풋, 토글 버튼 모두에 포함 안되면 닫기
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setIsDropdownVisible(false);

        // 유효하지 않은 수량이면 value로 리셋
        if (quantity < 1 || quantity > 100 || isNaN(quantity)) {
          setQuantity(value);
        } else {
          onClick?.(quantity);
        }
      }
    }

    document.addEventListener("click", handleClickOutside, true); // 캡처링 단계에서 잡음
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [quantity, value, onClick]);

  return (
    <div className="relative w-[72px]">
      <div className="flex justify-end items-center h-[40px] pl-[20px] gap-[4px]">
        <input
          ref={inputRef}
          type="text"
          value={isNaN(quantity) ? "" : quantity}
          onChange={handleChange}
          onFocus={() => {
            if (!isDropdownVisible) setIsDropdownVisible(true);
            inputRef.current?.select(); // 전체 텍스트 선택
          }}
          className="w-full font-bold text-[14px]/[17px] text-right tracking-tight text-primary-950 outline-none select-all sm:text-[16px]/[20px]"
        />
        <div ref={toggleRef} onClick={handleDropdownToggle} className="cursor-pointer">
          <ArrowIconSvg direction="down" className="w-[20px] h-[20px] text-primary-950 sm:w-[24px] sm:h-[24px]" />
        </div>
      </div>

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute h-[80px] top-[40px] right-0 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-auto overflow-x-hidden bg-white scrollbar-hide cursor-pointer z-10"
        >
          {quantityOptions.map((qty, idx) => (
            <div
              key={qty}
              ref={(el) => {
                optionRefs.current[idx] = el;
              }}
              onMouseDown={(e) => {
                e.preventDefault(); // 포커스 잃는 문제 방지
                handleSelect(qty);
              }}
              className={`flex justify-end items-center h-[40px] px-[24px] font-bold text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px] cursor-pointer
                ${qty === quantity ? "bg-gray-200/80" : "hover:bg-gray-100"}`}
            >
              {qty}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
