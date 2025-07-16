import React from "react";
import clsx from "clsx";
import BudgetForm from "./_components/BudgetForm"; // 클라이언트 컴포넌트 불러오기
import Link from "next/link"; // Next.js Link 컴포넌트 사용

export const metadata = {
  title: "Snack - 예산 관리",
  description: "Snack 서비스의 예산 관리 페이지입니다.",
};

const BudgetManagementPage = () => {
  return (
    <div
      className={clsx(
        "min-h-screen",
        "bg-[--color-primary-25]", // 전체 배경색 (옅은 회색)
        "text-[--color-primary-950]", // 기본 텍스트 색상
        "font-[var(--font-suit)]", // 폰트 적용
        "flex", // Flexbox for main layout (sidebar + content)
        "flex-col", // Default to column for mobile (header on top)
      )}
    >
      {/* Main Content Area */}
      <div
        className={clsx(
          "flex-1", // Take remaining height
          "flex", // Flex for sidebar + main content
          "flex-col", // Default to column for mobile (content below header)
          "md:flex-row", // Change to row for PC (sidebar next to content)
        )}
      >
        {/* Sidebar for PC */}
        <aside
          className={clsx(
            "hidden", // Hide on mobile/tablet
            "md:block", // Show on PC
            "w-64", // Fixed width for sidebar
            "bg-[--color-white]",
            "p-6",
            "shadow-md",
            "flex-shrink-0", // Prevent shrinking
          )}
        >
          <h1 className="text-xl font-bold text-[--color-primary-950] mb-8">Snack</h1>
          <nav className="space-y-4">
            <Link
              href="/budget-management"
              className={clsx(
                "flex items-center p-2 rounded-md",
                "bg-[--color-secondary-100]", // Active background color
                "text-[--color-secondary-500]", // Active text color
                "font-semibold",
              )}
            >
              <span className="mr-2">●</span> 예산 관리
            </Link>
            <Link
              href="/budget-status" // Assuming a budget status page
              className={clsx(
                "flex items-center p-2 rounded-md",
                "text-[--color-primary-700]",
                "hover:bg-[--color-primary-50]",
                "hover:text-[--color-primary-950]",
              )}
            >
              <span className="mr-2">○</span> 예산 현황
            </Link>
          </nav>
          <div className="mt-auto pt-8">
            {" "}
            {/* Push logout to bottom if sidebar is tall */}
            <Link href="#" className="text-[--color-primary-700] hover:text-[--color-primary-950] text-sm">
              로그아웃
            </Link>
          </div>
        </aside>

        {/* Main Content Area for BudgetForm */}
        <main
          className={clsx(
            "flex-1", // Take remaining width
            "p-4", // Default mobile padding
            "sm:p-6", // Tablet padding
            "md:p-8", // PC padding
            "flex",
            "justify-center", // Center content horizontally
            "items-start", // Align content to the top
          )}
        >
          {/* Render the Client Component for the Budget Form */}
          <BudgetForm />
        </main>
      </div>
    </div>
  );
};

export default BudgetManagementPage;
