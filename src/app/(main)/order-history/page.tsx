"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Dropdown from "@/components/common/DropDown";
import fileIcon from "@/assets/icons/ic_file.svg";
import Image from "next/image";
import { useOrderHistory } from "@/hooks/useOrderHistory";

const OrderHistoryPage = () => {
  // 공통 로직 훅 사용
  const {
    budgetData,
    budgetLoading,
    budgetError,
    purchaseListLoading,
    purchaseListError,
    currentItems,
    totalPages,
    currentPage,
    handlePageChange,
    sortBy,
    setSortBy,
    dropdownOpen,
    setDropdownOpen,
    formatNumber,
  } = useOrderHistory();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsx(
        // 반응형 min-h, flex-col 유지
        "min-h-screen",
        "text-[color:var(--color-primary-950)]",
        "font-suit",
        "flex flex-col",
        // 배경색 및 패딩 반응형
        "bg-[color:var(--color-white)]",
        "px-4 py-4 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-0 lg:py-0"
      )}
    >
      {/* Main Content Area */}
      <main
        className={clsx(
          "flex-1",
          // 반응형 패딩 및 max-width
          "p-0 sm:p-6 md:p-10 lg:p-12 xl:p-16",
          "max-w-[1352px] w-full mx-auto",
          "relative"
        )}
        style={{ background: "var(--color-white)" }}
      >
        {/* 헤더 + 정렬 드롭다운 */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3 sm:gap-0">
          <div
            className="text-lg sm:text-2xl md:text-3xl font-bold font-suit text-[color:var(--color-primary-950)]"
          >
            구매 내역 확인
          </div>
          <div className="relative custom-sort-dropdown w-full sm:w-auto">
            <Dropdown
              options={["최신순", "낮은 가격순", "높은 가격순"]}
              onChange={(selectedOption: string) => {
                // 선택된 옵션에 따라 sortBy 상태 업데이트
                if (selectedOption === "최신순") {
                  setSortBy("latest"); // createdAt 내림차순
                } else if (selectedOption === "낮은 가격순") {
                  setSortBy("priceLow"); // totalPrice 오름차순
                } else if (selectedOption === "높은 가격순") {
                  setSortBy("priceHigh"); // totalPrice 내림차순
                }
              }}
            />
          </div>
        </div>
        {/* 예산/지출 카드 영역 */}
        {budgetLoading ? (
          <div className="py-8 text-center text-base sm:text-lg text-[color:var(--color-secondary-500)]">예산 정보 로딩 중...</div>
        ) : budgetError ? (
          <div className="py-8 text-center text-base sm:text-lg text-[color:var(--color-error-500)]">{budgetError}</div>
        ) : !budgetData ? null : (
          <div className="w-full flex flex-col gap-4 mb-8">
            {/* 카드 3개 (모바일: 세로, 태블릿/PC: 가로) */}
            <div className="relative flex flex-col gap-4 md:flex-row md:gap-6 xl:gap-8">
              {/* 이번 달 예산 */}
              <div className="flex-1 flex flex-col justify-between w-full md:w-[32%] h-[120px] sm:h-[150px] pt-5 sm:pt-[30px] pr-5 sm:pr-[40px] pb-5 sm:pb-[30px] pl-5 sm:pl-[30px] gap-2 rounded-[8px] bg-[color:var(--color-primary-50)]">
                <div className="flex flex-row items-center justify-between w-full mb-2">
                  <div className="text-base sm:text-lg md:text-xl font-bold font-suit text-[color:var(--color-primary-950)]">이번 달 예산</div>
                  <div className="text-lg sm:text-2xl md:text-3xl font-extrabold font-suit text-[color:var(--color-primary-950)]">
                    {formatNumber(budgetData.currentMonthBudget)}
                  </div>
                </div>
                <div className="text-[color:var(--color-primary-400)] text-xs sm:text-sm md:text-base font-normal font-suit leading-snug mt-0">
                  지난 달 예산은<br />{formatNumber(budgetData.previousMonthBudget)}였어요
                </div>
              </div>
              {/* 이번 달 지출액 */}
              <div
                className="flex-1 flex flex-col justify-between relative w-full md:w-[32%] h-[120px] sm:h-[150px] pt-5 sm:pt-[30px] pr-5 sm:pr-[40px] pb-5 sm:pb-[30px] pl-5 sm:pl-[30px] gap-0 rounded-[8px] bg-[color:var(--color-primary-50)] overflow-visible"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex flex-row items-center justify-between w-full mb-0">
                  <div className="text-base sm:text-lg md:text-xl font-bold font-suit text-[color:var(--color-primary-950)]">이번 달 지출액</div>
                  <div className="text-lg sm:text-2xl md:text-3xl font-extrabold font-suit text-[color:var(--color-primary-950)]">
                    {formatNumber(budgetData.currentMonthExpense)}
                  </div>
                </div>
                <div className="text-[color:var(--color-primary-400)] text-xs sm:text-sm md:text-base font-normal font-suit">
                  지난 달: {formatNumber(budgetData.previousMonthExpense)}
                </div>
                {/* 진행바 */}
                <div className="w-full flex items-center gap-0 mt-0">
                  <div className="flex-1 h-1.5 rounded-md overflow-hidden bg-[color:var(--color-primary-200]">
                    <div
                      className="h-1.5 rounded-md bg-[color:var(--color-secondary-500)]"
                      style={{
                        width: `${budgetData.currentMonthExpense > 0 && budgetData.currentMonthBudget > 0
                          ? Math.max(1, Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100))
                          : 0
                          }%`,
                      }}
                    />
                  </div>
                  <div className="text-xs sm:text-sm font-normal font-suit min-w-[32px] text-right text-[color:var(--color-primary-950)]">
                    {budgetData.currentMonthBudget > 0
                      ? `${budgetData.currentMonthExpense > 0 ? Math.max(1, Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100)) : 0}%`
                      : "-"}
                  </div>
                </div>
                {/* 남은 예산 정보 박스 (Hover 시 노출 - 데스크탑) */}
                {isHovered && (
                  <div
                    className={clsx(
                      "hidden md:flex",
                      "absolute left-1/2 top-[110%] -translate-x-1/2 mt-0 w-[90%] p-6 rounded-[12px] flex-col justify-center items-start gap-2 z-10 pointer-events-none bg-[color:var(--color-primary-950)]"
                    )}
                  >
                    <div className="inline-flex justify-start items-center gap-1">
                      <div className="text-white text-base font-extrabold font-suit">이번 달 남은 예산:</div>
                      <div className="text-white text-base font-extrabold font-suit">
                        {formatNumber(budgetData.currentMonthBudget - budgetData.currentMonthExpense)}
                      </div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-1">
                      <div className="text-white text-sm font-normal font-suit">지난 달 남은 예산:</div>
                      <div className="text-white text-sm font-normal font-suit">
                        {formatNumber(budgetData.previousMonthBudget - budgetData.previousMonthExpense)}
                      </div>
                    </div>
                    <div className="text-white text-sm font-normal font-suit">
                      {`지난 달보다 ${(budgetData.currentMonthExpense - budgetData.previousMonthExpense).toLocaleString()}원 ${budgetData.currentMonthExpense - budgetData.previousMonthExpense > 0 ? "더 사용했어요" : "덜 사용했어요"}`}
                    </div>
                  </div>
                )}
              </div>
              {/* 올해 총 지출액 */}
              <div className="flex-1 flex flex-col justify-between w-full md:w-[32%] h-[120px] sm:h-[150px] pt-5 sm:pt-[30px] pr-5 sm:pr-[40px] pb-5 sm:pb-[30px] pl-5 sm:pl-[30px] gap-2 rounded-[8px] bg-[color:var(--color-primary-50)]">
                <div className="flex flex-row items-center justify-between w-full mb-2">
                  <div className="text-base sm:text-lg md:text-xl font-bold font-suit text-[color:var(--color-primary-950)]">올해 총 지출액</div>
                  <div className="text-lg sm:text-2xl md:text-3xl font-extrabold font-suit text-[color:var(--color-primary-950)]">
                    {formatNumber(budgetData.currentYearTotalExpense)}
                  </div>
                </div>
                <div className="text-[color:var(--color-primary-400)] text-xs sm:text-sm md:text-base font-normal font-suit leading-snug mt-auto">
                  {`올해 작년보다`}<br />
                  {`${(budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense).toLocaleString()}원 ${budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense > 0 ? "더 지출했어요" : "덜 지출했어요"}`}
                </div>
              </div>
            </div>
            {/* 모바일용 남은 예산 정보 박스 (항상 노출 - 모바일) */}
            <div className="flex md:hidden w-full p-6 rounded-[12px] flex-col justify-center items-start gap-2 mt-4 bg-[color:var(--color-primary-950)]">
              <div className="inline-flex justify-start items-center gap-1">
                <div className="text-white text-base font-extrabold font-suit">이번 달 남은 예산:</div>
                <div className="text-white text-base font-extrabold font-suit">
                  {formatNumber(budgetData.currentMonthBudget - budgetData.currentMonthExpense)}
                </div>
              </div>
              <div className="inline-flex justify-start items-center gap-1">
                <div className="text-white text-sm font-normal font-suit">지난 달 남은 예산:</div>
                <div className="text-white text-sm font-normal font-suit">
                  {formatNumber(budgetData.previousMonthBudget - budgetData.previousMonthExpense)}
                </div>
              </div>
              <div className="text-white text-sm font-normal font-suit">
                {`지난 달보다 ${(budgetData.currentMonthExpense - budgetData.previousMonthExpense).toLocaleString()}원 ${budgetData.currentMonthExpense - budgetData.previousMonthExpense > 0 ? "더 사용했어요" : "덜 사용했어요"}`}
              </div>
            </div>
          </div>
        )}

        {/* PurchaseList 컴포넌트 내용 */}
        <div
          className={clsx(
            "bg-white",
            // 반응형 padding 및 border
            "p-0 md:p-4 xl:p-6",
            "rounded-lg",
            "shadow-sm",
            "w-full",
            "overflow-x-auto",
            "border border-neutral-200"
          )}
          style={{ boxShadow: "none", background: "white" }}
        >
          {/* 리스트/테이블 */}
          <div className="w-full px-0 md:px-6 pb-4">
            {purchaseListLoading ? (
              <div className="flex items-center justify-center py-16 text-blue-600 text-base md:text-lg">구매 내역 로딩 중...</div>
            ) : purchaseListError ? (
              <div className="flex items-center justify-center py-16 text-red-500 text-base md:text-lg">{purchaseListError}</div>
            ) : currentItems.length === 0 ? (
              <>
                {/* 모바일: 카드형 */}
                <div className="md:hidden w-full flex justify-center items-center py-16">
                  <div className="self-stretch inline-flex flex-col justify-start items-center gap-5 w-full">
                    <div className="w-24 h-24 relative bg-neutral-50 rounded-full overflow-hidden mb-2" />
                    <div className="self-stretch flex flex-col justify-start items-center gap-10 w-full">
                      <div className="w-72 flex flex-col justify-start items-center gap-2.5">
                        <div className="self-stretch text-center justify-center text-neutral-800 text-lg font-extrabold font-suit">
                          구매 내역이 없어요
                        </div>
                        <div className="self-stretch text-center justify-center text-neutral-700 text-sm font-normal font-suit leading-snug">
                          상품 리스트를 둘러보고<br />관리자에게 요청해보세요
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => console.log("구매 요청 내역으로 이동")}
                        className="self-stretch h-16 px-4 py-3 bg-neutral-800 rounded-md inline-flex justify-center items-center w-full"
                      >
                        <div className="text-center justify-center text-white text-base font-bold font-suit">
                          구매 요청 내역으로 이동
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                {/* 태블릿/데스크탑: 테이블형 */}
                <div className="hidden md:flex w-full justify-center items-center py-24">
                  <div className="w-80 inline-flex flex-col justify-start items-center gap-7">
                    <div className="flex justify-center w-24 h-24 relative bg-neutral-50 rounded-full overflow-hidden mb-2">
                      <Image src={fileIcon} alt="빈 문서 아이콘" width={36} height={43} priority />
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-center gap-12">
                      <div className="w-72 flex flex-col justify-start items-center gap-2.5">
                        <div className="self-stretch text-center justify-center text-neutral-800 text-2xl font-extrabold font-suit">
                          구매 내역이 없어요
                        </div>
                        <div className="self-stretch text-center justify-center text-neutral-700 text-base font-normal font-suit leading-relaxed">
                          구매 요청을 승인하고<br />상품을 주문해보세요
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => console.log("구매 요청 내역으로 이동")}
                        className="self-stretch h-16 px-4 py-3 bg-neutral-800 rounded-md inline-flex justify-center items-center"
                      >
                        <div className="text-center justify-center text-white text-base font-bold font-suit">
                          구매 요청 내역으로 이동
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 모바일: 카드형 */}
                <div className="block md:hidden">
                  <div className="flex flex-col gap-4">
                    {currentItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-neutral-100 rounded-xl p-5 flex flex-col gap-3 shadow-sm border border-neutral-200 w-full"
                      >
                        <div className="flex justify-between items-center border-b border-neutral-200 pb-3 mb-2">
                          <div className="text-neutral-800 text-base font-bold font-suit">{item.item}</div>
                          <div className="text-neutral-800 text-lg font-extrabold font-suit">{item.amount}</div>
                          {item.adminMessage?.includes("즉시 구매") ? (
                            <span className="ml-2 px-2 py-1 rounded-full text-xs font-bold font-suit bg-blue-50 text-blue-500">즉시 요청</span>
                          ) : null}
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-500 text-sm font-normal font-suit">구매 요청일</span>
                            <span className="text-neutral-800 text-sm font-bold font-suit">{item.requestDate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-500 text-sm font-normal font-suit">요청인</span>
                            <span className="flex items-center gap-2">
                              <span className="text-neutral-800 text-sm font-bold font-suit">{item.requester}</span>
                              {item.adminMessage?.includes("즉시 구매") ? (
                                <span className="ml-2 px-2 py-1 rounded-full text-xs font-bold font-suit bg-blue-50 text-blue-500">즉시 요청</span>
                              ) : (
                                <span
                                  className={clsx(
                                    "px-2 py-1 rounded-full text-xs font-bold font-suit",
                                    item.status === "요청"
                                      ? "bg-blue-50 text-blue-500"
                                      : "bg-neutral-200 text-neutral-600"
                                  )}
                                >
                                  {item.status}
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-500 text-sm font-normal font-suit">구매 승인일</span>
                            <span className="text-neutral-800 text-sm font-bold font-suit">{item.approvalDate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-500 text-sm font-normal font-suit">담당자</span>
                            <span className="text-neutral-800 text-sm font-bold font-suit">{item.manager}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 태블릿/PC: 테이블형 */}
                <div className="hidden md:block">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-white">
                      <tr className="border-t border-b border-neutral-200 w-full">
                        <th className="px-10 py-5 text-left text-base font-bold text-zinc-500 font-suit w-32">구매 요청일</th>
                        <th className="px-10 py-5 text-left text-base font-bold text-zinc-500 font-suit w-32">요청인</th>
                        <th className="px-10 py-5 text-left text-base font-bold text-zinc-500 font-suit w-44">상품 정보</th>
                        <th className="px-10 py-5 text-left text-base font-bold text-zinc-500 font-suit w-32">주문 금액</th>
                        <th className="px-10 py-5 text-left text-base font-bold text-zinc-500 font-suit w-32">구매 승인일</th>
                        <th className="px-10 py-5 text-left textbase font-bold text-zinc-500 font-suit w-24">담당자</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-100">
                      {currentItems.map((item) => (
                        <tr key={item.id} className="h-24 align-middle border-b border-neutral-200 w-full">
                          <td className="px-10 py-5 whitespace-nowrap text-base text-neutral-800 font-normal font-suit w-32">{item.requestDate}</td>
                          <td className="px-10 py-5 whitespace-nowrap text-base text-neutral-800 font-normal font-suit w-32">
                            <span className="flex items-center gap-2">
                              <span>{item.requester}</span>
                              {item.adminMessage?.includes("즉시 구매") ? (
                                <span className="ml-2 px-2 py-1 rounded-full text-xs font-bold font-suit bg-blue-50 text-blue-500">즉시 요청</span>
                              ) : (
                                <span
                                  className={clsx(
                                    "px-2 py-1 rounded-full text-xs font-bold font-suit",
                                    item.status === "요청"
                                      ? "bg-blue-50 text-blue-500"
                                      : "bg-neutral-200 text-neutral-600"
                                  )}
                                >
                                  {item.status}
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="px-10 py-5 whitespace-pre-wrap text-base text-neutral-800 font-normal font-suit w-44">{item.item}</td>
                          <td className="px-10 py-5 whitespace-nowrap text-base text-neutral-800 font-extrabold font-suit w-32">{item.amount}</td>
                          <td className="px-10 py-5 whitespace-nowrap text-base text-neutral-800 font-normal font-suit w-32">{item.approvalDate}</td>
                          <td className="px-10 py-5 whitespace-nowrap text-base text-neutral-800 font-normal font-suit w-24">{item.manager}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Pagination */}
        <nav
          className="px-0 md:px-6 py-6 flex items-center justify-between w-full"
          aria-label="Pagination"
        >
          <div className="text-neutral-800 text-base font-normal font-suit">
            {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-7">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-2 rounded-md",
                "text-zinc-500 text-base font-normal font-suit",
                "bg-white border border-neutral-200",
                "hover:bg-neutral-100",
                "transition-colors duration-200",
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto my-auto">
                  <path d="M7 13L1 7L7 1" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Prev
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-2 rounded-md",
                "text-neutral-800 text-base font-normal font-suit",
                "bg-white border border-neutral-200",
                "hover:bg-neutral-100",
                "transition-colors duration-200",
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              )}
            >
              Next
              <span className="w-6 h-6 flex items-center justify-center">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto my-auto">
                  <path d="M1 1L7 7L1 13" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default OrderHistoryPage;
