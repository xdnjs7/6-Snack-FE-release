"use client";

import Image from "next/image";

import toastIc from "@/assets/icons/ic_!_red.svg";
import xIc from "@/assets/icons/icon_X_gray.svg";

type TToastProps = {
  text: string;
  budget: number;
  onClose?: () => void;
};

const Toast = ({ text, budget, onClose }: TToastProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[1152px] px-12 py-4 bg-black/80 rounded shadow-md backdrop-blur-md flex justify-between items-center">
      {/* 좌측 아이콘 + 메시지 */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 relative">
          <Image src={toastIc} alt="알림 아이콘" fill style={{ objectFit: "contain" }} />
        </div>
        <p className="text-white text-xl font-bold">{text}</p>
      </div>

      {/* 예산 + 닫기 */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-white text-xl font-bold">남은 예산</span>
          <span className="text-white text-xl font-bold">{budget.toLocaleString()}원</span>
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
