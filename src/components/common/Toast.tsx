"use client";

import Image from "next/image";
import { ToastVariant } from "@/types/toast.types";

import exclamationIc from "@/assets/icons/ic_exclamation_mark_red.svg";
import checkIc from "@/assets/icons/ic_check_white.svg";
import xIc from "@/assets/icons/ic_x_gray.svg";

type TToastProps = {
  text: string;
  budget: number;
  onClose?: () => void;
  variant?: ToastVariant;
};

const Toast = ({ text, budget, onClose, variant = "error" }: TToastProps) => {
  const iconSrc = variant === "success" ? checkIc : exclamationIc;
  const iconAlt = variant === "success" ? "성공 아이콘" : "경고 아이콘";

  return (
    <div className="w-full max-w-[1152px] h-20 md:h-24 px-4 md:px-8 lg:px-12 py-4 bg-black/80 rounded shadow-md backdrop-blur-md flex justify-between items-center mx-auto">
      {/* 좌측 아이콘 + 메시지 */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 md:w-6 md:h-6 relative">
          <Image src={iconSrc} alt={iconAlt} fill style={{ objectFit: "contain" }} />
        </div>
        <p className="text-white text-base md:text-xl font-bold">{text}</p>
      </div>

      {/* 예산 + 닫기 */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1.5 md:gap-3">
          <span className="text-white text-base md:text-xl font-bold">남은 예산</span>
          <span className="text-white text-base md:text-xl font-bold">{budget.toLocaleString()}원</span>
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
