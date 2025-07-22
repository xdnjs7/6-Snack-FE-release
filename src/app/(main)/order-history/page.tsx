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
      {/* Main Content Area */}
      <main className={clsx("flex-1", "p-6 sm:p-8 md:p-10", "max-w-[1352px]", "mx-auto", "w-full", "relative")}>
        <div className="text-lg sm:text-2xl font-bold font-suit mb-6">구매 내역 확인</div>
        {/* 요약 카드 컴포넌트 */}
        <PurchaseSummary />
        {/* 구매 내역 리스트/테이블 컴포넌트 */}
        <PurchaseList />
      </main>
    </div>
  );
};

export default OrderHistoryPage;
