"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ExclamationMarkIconSvg from "@/components/svg/ExclamationMarkIconSvg";

export default function FailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * 에러 코드 : searchParams.get("code")
   * 실패 사유 : searchParams.get("message")
   */

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-[28px] -mb-[24px]">
      <ExclamationMarkIconSvg stroke="black" bgColor="#FFCA51" className="w-15 h-15 cursor-default sm:w-30 sm:h-30" />
      <div className="flex flex-col w-full gap-[38px] text-center justify-center items-center">
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-bold text-[22px]/[30px] sm:text-[30px]/[36px]">결제를 실패했어요</h2>
          <p className="font-medium text-[12px]/[14px] sm:text-[16px]/[20px] md:text-[20px]/[24px]">{`실패 사유 : ${searchParams.get("message")}`}</p>
        </div>
        <button
          onClick={() => router.push("/cart")}
          className="outline-none bg-blue-500 text-white text-[18px]/[30px] w-full max-w-[285px] rounded-[12px] h-[56px] font-bold cursor-pointer sm:max-w-[360px] sm:h-[64px]"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
