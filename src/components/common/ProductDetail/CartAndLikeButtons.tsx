import React from "react";
import Image from "next/image";
import Button from "../../ui/Button";
import ic_like_normal from "@/assets/icons/ic_like_normal.svg";

export default function CartAndLikeButtons() {
  return (
    <div className="flex gap-[14px] sm:gap-4 w-full">
      {/* 장바구니 버튼 */}
      <Button
        type="primary"
        label="장바구니 담기"
        className="h-16 sm:h-18 w-full sm:px-6 sm:py-4 bg-primary-950 inline-flex sm:text-lg font-bold text-primary-50 text-center "
      />
      {/* 좋아요버튼 */}
      <div className="h-16 w-16 sm:h-18 sm:w-18 px-4 py-3 sm:py-4 bg-white rounded-sm border-1 border-gray-300 inline-flex justify-center items-center">
        <div className="relative w-[25px] h-[22.5px] sm:w-[28px] sm:h-[25px]">
          <Image src={ic_like_normal} alt="좋아요 버튼" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
