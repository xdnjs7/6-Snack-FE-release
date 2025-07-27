"use client";

import Image from "next/image";
import { ToastVariant } from "@/types/toast.types";

import exclamationIc from "@/assets/icons/ic_exclamation_mark_red.svg";
import checkIc from "@/assets/icons/ic_check_white.svg";
import xIc from "@/assets/icons/ic_x_gray.svg";
import { twMerge } from "tailwind-merge";

type TToastProps = {
  text: React.ReactNode;
  budget: number;
  onClose?: () => void;
  variant?: ToastVariant;
  className?: string;
};

const Toast = ({ text, budget, onClose, variant = "error", className = "" }: TToastProps) => {
  const iconSrc = variant === "success" ? checkIc : exclamationIc;
  const iconAlt = variant === "success" ? "성공 아이콘" : "경고 아이콘";

  return (
    <div
      className={twMerge(
        "flex justify-between items-center w-full h-[64px] px-4 py-4 text-[14px]/[22px] text-white tracking-tight bg-black/80 rounded shadow-[0px_10px_8px_0px_rgba(0,0,0,0.1)] backdrop-blur-md font-bold sm:h-[80px] sm:px-[40px] sm:text-[20px]/[25px] md:px-[50px]",
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
    </div>
  );
};

export default Toast;
