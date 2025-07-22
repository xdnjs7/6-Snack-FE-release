import React from "react";
import clsx from "clsx";
import PurchaseSummary from "./_components/PurchaseSummary";
import PurchaseList from "./_components/PurchaseList";

export const metadata = {
  title: "Snack - 구매 내역 확인",
  description: "Snack 서비스의 구매 내역 확인 페이지입니다.",
};

const OrderHistoryPage = () => {
  return (
    <div
      className={clsx(
        "min-h-screen",
        "bg-white", // 시안: 전체 배경색 흰색
        "text-neutral-800", // 기본 텍스트 색상
        "font-suit", // 폰트 적용
        "flex",
        "flex-col",
      )}
    >
      {/* 상단 헤더 (시안: PC/태블릿/모바일 공통) */}
      <header className="w-full px-6 py-4 sm:px-6 sm:py-7 md:px-24 md:py-8 bg-white/90 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.02)] backdrop-blur-lg flex items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-4">
          <div className="w-24 h-11 relative overflow-hidden">
            <div className="w-16 h-5 left-[16px] top-[12px] absolute bg-neutral-800" />
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-lg sm:text-2xl font-bold font-suit">구매 내역 확인</div>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-6 h-6 relative overflow-hidden">
            <div className="w-4 h-3 left-[4.06px] top-[8.30px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-800" />
            <div className="w-2 h-1.5 left-[8.29px] top-[3px] absolute rounded-md border-[1.50px] border-neutral-800" />
            <div className="left-[9px] top-[9.15px] absolute justify-start text-neutral-800 text-[9px] font-bold font-suit">
              4
            </div>
          </div>
          <div className="w-6 h-6 relative overflow-hidden">
            <div className="w-3.5 h-3 left-[4.50px] top-[5.75px] absolute bg-neutral-400" />
          </div>
        </div>
      </header>
      {/* Main Content Area */}
      <main className={clsx("flex-1", "p-6 sm:p-8 md:p-10", "max-w-[1352px]", "mx-auto", "w-full")}>
        {/* 요약 카드 컴포넌트 */}
        <PurchaseSummary />
        {/* 구매 내역 리스트/테이블 컴포넌트 */}
        <PurchaseList />
      </main>
    </div>
  );
};

export default OrderHistoryPage;
