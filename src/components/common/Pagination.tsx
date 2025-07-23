"use client";

import { useState, useEffect } from "react";
import { TPaginationProps } from "../../types/pagination.types";
import ArrowIconSvg from "../svg/ArrowIconSvg";

/**
 * 페이지네이션 컴포넌트
 *
 * @description
 * - 반응형 컴포넌트: 744px 미만에서는 작은 크기, 744px 이상에서는 큰 크기
 * - 첫 페이지에서는 Prev 버튼이 비활성화됩니다
 * - 마지막 페이지에서는 Next 버튼이 비활성화됩니다
 * - onPrevPage, onNextPage가 제공되지 않으면 onPageChange를 사용합니다
 *
 * @example
 * ```tsx
 * import Pagination from "@/components/common/Pagination";
 *
 * const MyPage = () => {
 *   const [currentPage, setCurrentPage] = useState(1);
 *   const totalPages = 10;
 *
 *   const handlePageChange = (page: number) => {
 *     setCurrentPage(page);
 *     // 데이터 로딩 로직
 *   };
 *
 *   return (
 *     <Pagination
 *       currentPage={currentPage}
 *       totalPages={totalPages}
 *       onPageChange={handlePageChange}
 *     />
 *   );
 * };
 * ```
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage,
  className = "",
}: TPaginationProps) {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTablet(window.innerWidth >= 744);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevPage = () => {
    if (!isFirstPage) {
      onPrevPage?.() || onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      onNextPage?.() || onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`w-full h-10 relative ${className}`}>
      <div className="w-full h-10 inline-flex justify-between items-center py-[11.5px]">
        {/* Page Info */}
        <div
          className={`text-center justify-start text-gray-950 font-normal font-['SUIT'] ${isTablet ? "text-xl" : "text-lg"}`}
        >
          {currentPage} of {totalPages}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-start items-center gap-10">
          {/* Prev Button */}
          <div
            className={`flex justify-start items-center gap-1.5 ${
              isFirstPage ? "cursor-default opacity-50" : "cursor-pointer hover:opacity-80"
            }`}
            onClick={handlePrevPage}
          >
            <ArrowIconSvg 
              direction="left" 
              disabled={isFirstPage}
              className={isFirstPage ? "text-gray-500" : "text-gray-950"}
            />
            <div
              className={`text-center justify-start ${isFirstPage ? "text-gray-500" : "text-gray-950"} font-normal font-['SUIT'] ${isTablet ? "text-lg" : "text-base"}`}
            >
              Prev
            </div>
          </div>

          {/* Next Button */}
          <div
            className={`flex justify-start items-center gap-[5px] ${
              isLastPage ? "cursor-default opacity-50" : "cursor-pointer hover:opacity-80"
            }`}
            onClick={handleNextPage}
          >
            <div
              className={`text-center justify-start text-gray-950 font-normal font-['SUIT'] ${isTablet ? "text-lg" : "text-base"}`}
            >
              Next
            </div>
            <ArrowIconSvg 
              direction="right" 
              disabled={isLastPage}
              className={isLastPage ? "text-gray-500" : "text-gray-950"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
