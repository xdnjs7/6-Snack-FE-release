"use client";

import Image from "next/image";
import { TToastVariant } from "@/types/toast.types";

import exclamationIc from "@/assets/icons/ic_exclamation_mark_red.svg";
import checkIc from "@/assets/icons/ic_check_white.svg";
import xIc from "@/assets/icons/ic_x_gray.svg";
import { twMerge } from "tailwind-merge";
import { useEffect, useState, useRef } from "react";

type TToastProps = {
  text: string | React.ReactNode;
  budget?: number;
  onClose?: () => void;
  variant?: TToastVariant;
  isVisible?: boolean;
  className?: string;
};

const Toast = ({ text, budget, onClose, variant = "error", isVisible, className = "" }: TToastProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible && onClose) {
      // 기존 타이머가 있다면 클리어
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // 새로운 타이머 설정 (3초 후 자동 닫기)
      timerRef.current = setTimeout(() => {
        onClose();
      }, 3000);
    }

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isVisible, onClose]);

  const iconSrc = variant === "success" ? checkIc : exclamationIc;
  const iconAlt = variant === "success" ? "성공 아이콘" : "경고 아이콘";

  if (!isMounted) return null;

  return (
    <div
      className={twMerge(
        "fixed flex justify-between items-center max-w-[1200px] h-[64px] top-[76px] inset-x-6 mx-auto transition-all duration-500 px-4 py-4 text-[14px]/[22px] text-white tracking-tight bg-black/80 rounded shadow-[0px_10px_8px_0px_rgba(0,0,0,0.1)] backdrop-blur-[30px] font-bold sm:h-[80px] sm:top-[120px] sm:px-[40px] sm:text-[20px]/[25px] md:max-w-[1152px] md:px-[50px]",
        isVisible
          ? "z-1 opacity-100 translate-y-0 sm:translate-y-0 md:translate-y-0"
          : "-z-1 opacity-0 translate-y-1/4 sm:translate-y-1/4 md:translate-y-1/4",
        className,
      )}
    >
      {/* 좌측 아이콘 + 메시지 */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
          <Image src={iconSrc} alt={iconAlt} fill style={{ objectFit: "contain" }} />
        </div>
        <div className="flex flex-wrap">{text}</div>
      </div>

      {/* 예산 + 닫기 */}
      {budget && (
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-3">
            <span>남은 예산</span>
            <span>{budget.toLocaleString()}원</span>
          </div>

          {onClose && (
            <button onClick={onClose}>
              <Image src={xIc} alt="닫기 버튼" width={24} height={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Toast;
