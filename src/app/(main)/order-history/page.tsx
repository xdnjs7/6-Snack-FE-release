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
        "bg-[--color-primary-25]", // 전체 배경색 (옅은 회색)
        "text-[--color-primary-950]", // 기본 텍스트 색상
        "font-[var(--font-suit)]", // 폰트 적용
        "flex", // Flexbox for main layout (header/sidebar + content)
        "flex-col", // Default to column for mobile (header on top)
      )}
    >
      {/* Main Content Area */}
      <main
        className={clsx(
          "flex-1", // Take remaining height
          "p-4", // Default mobile padding
          "sm:p-6", // Tablet padding
          "md:p-8", // PC padding
          "max-w-7xl", // 최대 너비 제한
          "mx-auto", // 중앙 정렬
          "w-full", // 너비 100%
        )}
      >
        <h2 className="text-2xl font-bold text-[--color-primary-950] mb-6">구매 내역 확인</h2>

        {/* 요약 카드 컴포넌트 */}
        <PurchaseSummary />

        {/* 구매 내역 리스트/테이블 컴포넌트 */}
        <PurchaseList />
      </main>
    </div>
  );
};

export default OrderHistoryPage;
