"use client";

import React, { useState, useRef, useEffect } from "react";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import debounce from "lodash.debounce";

type TQuantityDropdownProps = {
  value: number;
  onClick?: (value: number) => void;
  type?: "default" | "product";
};

export default function QuantityDropdown({ value, onClick: updateQuantity, type }: TQuantityDropdownProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [quantity, setQuantity] = useState<number>(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null); // 드롭다운 토글 버튼 ref
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const quantityOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  const handleDropdownToggle = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const changeQuantity = useRef(debounce((quantity: number) => updateQuantity?.(quantity), 500)).current;

  // 직접 수량 입력
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = Number(val);

    // 숫자가 아니거나 빈 값일 때는 quantity를 null로 세팅해서 빈 칸으로 유지
    if (val === "" || isNaN(num)) {
      setQuantity(NaN); // null 또는 NaN 등 빈 상태 표시용
      return;
    }

    if (num >= 1 && num <= 100) {
      setQuantity(num);
      changeQuantity(num); // ✅ 입력 디바운싱 처리
    }
  };

  // 드롭다운 수량 선택
  const handleSelect = (val: number) => {
    setQuantity(val);

    if (val !== value) {
      updateQuantity?.(val); // ✅ 값이 바뀐 경우만 요청
    }

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
        } else if (quantity !== value) {
          updateQuantity?.(quantity); // 값이 바뀌었을 때만 호출
        }
      }
    }

    document.addEventListener("click", handleClickOutside, true); // 캡처링 단계에서 잡음
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [quantity, value, updateQuantity]);

  return (
    <div className="relative w-[72px]">
      <div
        className={`
      flex justify-end items-center h-[40px] gap-[4px]
      ${type === "product" ? "border border-primary-200 rounded-none pl-[8px] pr-[8px]" : "pl-[20px] sm:pl-[16px]"}
    `}
      >
        <input
          ref={inputRef}
          type="text"
          value={isNaN(quantity) ? "" : quantity}
          onChange={handleChange}
          onFocus={() => {
            inputRef.current?.select(); // 전체 텍스트 선택
          }}
          onBlur={() => {
            if (isNaN(quantity)) {
              setQuantity(value);
            }
          }}
          className={`
            w-full font-bold text-[14px]/[17px] text-right tracking-tight text-primary-950 outline-none select-all sm:text-[16px]/[20px]
            ${type === "product" ? "border-none rounded-none" : ""}
          `}
        />
        <div ref={toggleRef} onClick={handleDropdownToggle} className="cursor-pointer">
          <ArrowIconSvg direction="down" className="w-[20px] h-[20px] text-primary-950 sm:w-[24px] sm:h-[24px]" />
        </div>
      </div>

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className={`
        absolute h-[80px] top-[40px] left-0 w-full z-10
        bg-white overflow-auto overflow-x-hidden shadow-[0_0_10px_0_rgba(0,0,0,0.1)] scrollbar-hide cursor-pointer
        ${type === "product" ? "border-l border-r border-b border-primary-200 rounded-none" : ""}
      `}
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
              className={`flex justify-end items-center h-[40px] pr-[24px] pl-[25px] font-bold text-[14px]/[17px] tracking-tight text-primary-950 cursor-pointer sm:text-[16px]/[20px] sm:pr-[28px] sm:pl-[18px] 
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
