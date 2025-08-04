"use client";

import ChevronLeftIcon from "@/assets/icons/ic_chevron_left.svg";
import ChevronRightIcon from "@/assets/icons/ic_chevron_right.svg";
import Dropdown from "@/components/common/DropDown";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { formatPrice } from "@/lib/utils/formatPrice.util";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Budget 데이터 타입 정의
type TBudgetData = {
  currentMonthBudget: number;
  previousMonthBudget: number;
  currentMonthExpense: number;
  previousMonthExpense: number;
  currentYearTotalExpense: number;
  previousYearTotalExpense: number;
};

const OrderHistoryPage = () => {
  const router = useRouter();

  // 공통 로직 훅 사용
  const { budgetData, currentItems, totalPages, currentPage, handlePageChange, setSortBy, formatNumber } =
    useOrderHistory();
  const [isHovered, setIsHovered] = useState(false);

  // budgetData 타입 안전성을 위한 타입 가드
  const safeBudgetData = budgetData as TBudgetData | undefined;

  // 상품명 클릭 시 상세 페이지로 이동하는 함수
  const handleProductClick = (orderId: string) => {
    if (orderId) {
      router.push(`/order-history/${orderId}?status=approved`);
    }
  };

  return (
    <>
      {/* Mobile Layout */}
      <main className="min-h-screen w-full max-w-sm mx-auto relative bg-white overflow-hidden sm:hidden" aria-label="구매 내역 모바일 화면">
        <header className="self-stretch inline-flex justify-between items-center px-4 pt-4" role="banner">
          <h1 className="text-neutral-800 text-lg font-bold font-['SUIT']">구매 내역 확인</h1>
          <nav aria-label="정렬 옵션">
            <div className="relative custom-sort-dropdown w-auto" role="region">
              <Dropdown
                options={["최신순", "낮은 가격순", "높은 가격순"]}
                onChange={(selectedOption: string) => {
                  if (selectedOption === "최신순") setSortBy("latest");
                  else if (selectedOption === "낮은 가격순") setSortBy("priceLow");
                  else if (selectedOption === "높은 가격순") setSortBy("priceHigh");
                }}
              />
            </div>
          </nav>
        </header>
        <section className="w-full flex flex-col gap-4 px-4" aria-labelledby="budget-section-mobile">
          <h2 id="budget-section-mobile" className="sr-only">예산 현황</h2>
          {/* 예산 카드 */}
          <div className="self-stretch relative flex flex-col justify-center items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-4">
              <div className="flex-1 h-40 p-5 bg-neutral-100 rounded inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['SUIT']">
                    이번 달 예산
                  </div>
                  <div className="justify-center text-neutral-800 text-lg font-extrabold font-['SUIT']">
                    {safeBudgetData ? formatNumber(safeBudgetData.currentMonthBudget) : "0원"}
                  </div>
                </div>
                <div className="relative w-34 justify-center text-stone-500 text-sm font-normal font-['SUIT'] leading-snug">
                  지난 달 예산은 {safeBudgetData ? formatNumber(safeBudgetData.previousMonthBudget) : "0원"}이었어요
                </div>
              </div>
              <div
                className="flex-1 h-40 p-5 bg-neutral-100 rounded inline-flex flex-col justify-start items-start gap-3 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['SUIT']">
                    이번 달 지출액
                  </div>
                  <div className="justify-center text-neutral-800 text-lg font-extrabold font-['SUIT']">
                    {safeBudgetData ? formatNumber(safeBudgetData.currentMonthExpense) : "0원"}
                  </div>
                </div>
                <div className="justify-center text-stone-500 text-sm font-normal font-['SUIT']">
                  지난 달: {safeBudgetData ? formatNumber(safeBudgetData.previousMonthExpense) : "0원"}
                </div>
                <div className="self-stretch inline-flex justify-left items-center gap-1">
                  <div className="w-20 h-1.5 bg-neutral-300 rounded-md overflow-hidden">
                    <div
                      className="h-1.5 bg-blue-500 rounded-md"
                      style={{
                        width: `${safeBudgetData && safeBudgetData.currentMonthBudget > 0
                          ? Math.max(
                            1,
                            Math.round(
                              (safeBudgetData.currentMonthExpense / safeBudgetData.currentMonthBudget) * 100,
                            ),
                          )
                          : 0
                          }%`,
                      }}
                    />
                  </div>
                  <div className="justify-center text-neutral-800 text-xs font-normal font-['SUIT']">
                    {safeBudgetData && safeBudgetData.currentMonthBudget > 0
                      ? `${Math.max(1, Math.round((safeBudgetData.currentMonthExpense / safeBudgetData.currentMonthBudget) * 100))}%`
                      : "0%"}
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-40 p-5 bg-neutral-100 rounded flex flex-col justify-between items-start overflow-hidden">
              <div className="flex flex-col justify-start items-start gap-2.5">
                <div className="inline-flex justify-start items-center gap-3.5">
                  <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['SUIT']">
                      올해 총 지출액
                    </div>
                  </div>
                </div>
                <div className="justify-center text-neutral-800 text-lg font-extrabold font-['SUIT']">
                  {safeBudgetData ? formatNumber(safeBudgetData.currentYearTotalExpense) : "0원"}
                </div>
              </div>
              <div className="self-stretch justify-center text-stone-500 text-sm font-normal font-['SUIT'] leading-snug">
                작년보다{" "}
                {safeBudgetData
                  ? formatPrice(
                    Math.abs(safeBudgetData.currentYearTotalExpense - safeBudgetData.previousYearTotalExpense),
                  )
                  : "0"}
                원<br />
                {safeBudgetData && safeBudgetData.currentYearTotalExpense - safeBudgetData.previousYearTotalExpense > 0
                  ? "더 지출했어요"
                  : "덜 지출했어요"}
              </div>
            </div>

            {/* Mobile Budget Details Box */}
            {isHovered && (
              <div className="w-70 p-6 left-[42%] transform -translate-x-1/2 top-36.5 absolute bg-neutral-800 rounded flex flex-col justify-center items-start gap-2 overflow-hidden">
                <div className="inline-flex justify-start items-center gap-2">
                  <div className="justify-center text-white text-base font-extrabold font-['SUIT']">
                    이번 달 남은 예산:
                  </div>
                  <div className="justify-center text-white text-base font-extrabold font-['SUIT']">
                    {safeBudgetData
                      ? formatNumber(safeBudgetData.currentMonthBudget - safeBudgetData.currentMonthExpense)
                      : "0원"}
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-1">
                  <div className="justify-center text-white text-sm font-normal font-['SUIT']">지난 달 남은 예산:</div>
                  <div className="justify-center text-white text-sm font-normal font-['SUIT']">
                    {safeBudgetData
                      ? formatNumber(safeBudgetData.previousMonthBudget - safeBudgetData.previousMonthExpense)
                      : "0원"}
                  </div>
                </div>
                <div className="justify-center text-white text-sm font-normal font-['SUIT']">
                  지난 달보다{" "}
                  {safeBudgetData
                    ? formatPrice(Math.abs(safeBudgetData.currentMonthExpense - safeBudgetData.previousMonthExpense))
                    : "0"}
                  원{" "}
                  {safeBudgetData && safeBudgetData.currentMonthExpense - safeBudgetData.previousMonthExpense > 0
                    ? "더 사용했어요"
                    : "덜 사용했어요"}
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="w-full flex flex-col gap-2 px-4" aria-labelledby="purchase-list-mobile" role="list">
          <h2 id="purchase-list-mobile" className="sr-only">구매 내역 목록</h2>
          {/* Mobile Purchase List */}
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <article key={item.id} className="self-stretch pb-2.5 flex flex-col justify-start items-start" role="listitem">
                <div className="self-stretch py-3.5 border-b border-zinc-400 inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2">                      <button
                    onClick={() => handleProductClick(item.id)}
                    className="text-blue-600 cursor-pointer text-base font-bold font-['SUIT'] bg-transparent border-none p-0 focus:outline-none whitespace-nowrap overflow-hidden text-ellipsis max-w-32"
                    type="button"
                    aria-label={`${item.item} 상세보기로 이동`}
                  >
                    {item.item}
                  </button>
                    <div className="text-center justify-center text-zinc-500 text-xs font-normal font-['SUIT']">
                      총수량 4개
                    </div>
                  </div>
                  <div className="text-center justify-center text-neutral-800 text-base font-extrabold font-['SUIT']">
                    {(parseInt(item.amount.replace(/[^0-9]/g, '')) + 3000).toLocaleString()}원
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-center items-start">
                  <div className="self-stretch inline-flex justify-start items-center">
                    <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="text-center justify-center text-neutral-800 text-sm font-normal font-['SUIT']">
                        구매 요청일
                      </div>
                    </div>
                    <div className="flex-1 h-12 px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="text-center justify-center text-zinc-800 text-sm font-bold font-['SUIT']">
                        {item.requestDate}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center">
                    <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="text-center justify-center text-neutral-800 text-sm font-normal font-['SUIT']">
                        요청인
                      </div>
                    </div>
                    <div className="flex-1 h-12 px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="text-center justify-center text-zinc-800 text-sm font-bold font-['SUIT']">
                        {item.requester}
                      </div>
                      {item.adminMessage?.includes("즉시 구매") && (
                        <div className="px-1 py-1 bg-blue-50 rounded-[100px] flex justify-center items-center gap-1">
                          <div className="justify-center text-blue-500 text-xs font-bold font-['SUIT']">즉시 요청</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-center items-start">
                  <div className="self-stretch inline-flex justify-start items-center">
                    <div className="w-36 self-stretch px-2 py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
                      <div className="text-center justify-center text-neutral-800 text-sm font-normal font-['SUIT']">
                        구매 승인일
                      </div>
                    </div>
                    <div className="flex-1 self-stretch p-4 border-b border-neutral-200 flex justify-start items-start gap-2">
                      <div className="text-center justify-center text-zinc-800 text-sm font-bold font-['SUIT']">
                        {item.approvalDate}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-start">
                    <div className="w-36 self-stretch px-2 py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
                      <div className="text-center justify-center text-neutral-800 text-sm font-normal font-['SUIT']">
                        담당자
                      </div>
                    </div>
                    <div className="flex-1 p-4 border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="flex-1 justify-center text-zinc-800 text-sm font-bold font-['SUIT'] leading-snug">
                        {item.manager}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="self-stretch pb-2.5 flex flex-col justify-start items-start">
              <div className="self-stretch py-3.5 border-b border-zinc-400 inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <div className="text-center justify-center text-neutral-800 text-base font-bold font-['SUIT']">
                    구매 내역이 없어요
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <nav className="self-stretch h-10 inline-flex justify-between items-center px-4" aria-label="페이지 이동">
          {/* Mobile Pagination */}
          <div className="self-stretch h-10 inline-flex justify-between items-center">
            <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">
              {currentPage} of {totalPages}
            </div>
            <div className="flex justify-start items-center gap-7">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex justify-start items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronLeftIcon} alt="Chevron Left" width={24} height={24} />
                </div>
                <div className="text-center justify-start text-zinc-500 text-base font-normal font-['SUIT']">Prev</div>
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex justify-start items-center gap-[5px] cursor-pointer disabled:cursor-not-allowed"
              >
                <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">
                  Next
                </div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronRightIcon} alt="Chevron Right" width={24} height={24} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </main>

      {/* Tablet Layout */}
      <main className="min-h-screen w-full max-w-3xl mx-auto relative bg-white overflow-hidden hidden sm:block md:hidden" aria-label="구매 내역 태블릿 화면">
        <header className="self-stretch inline-flex justify-between items-center pt-8 px-8" role="banner">
          <h1 className="text-neutral-800 text-lg font-bold font-['SUIT']">구매 내역 확인</h1>
          <nav aria-label="정렬 옵션">
            <div className="relative custom-sort-dropdown w-auto" role="region">
              <Dropdown
                options={["최신순", "낮은 가격순", "높은 가격순"]}
                onChange={(selectedOption: string) => {
                  if (selectedOption === "최신순") setSortBy("latest");
                  else if (selectedOption === "낮은 가격순") setSortBy("priceLow");
                  else if (selectedOption === "높은 가격순") setSortBy("priceHigh");
                }}
              />
            </div>
          </nav>
        </header>
        <section className="w-full flex flex-col gap-5 px-8" aria-labelledby="budget-section-tablet">
          <h2 id="budget-section-tablet" className="sr-only">예산 현황</h2>
          {/* Tablet Budget Cards */}
          <div className="self-stretch pb-5 inline-flex justify-start items-center gap-5">
            <div className="flex-1 self-stretch p-5 bg-neutral-100 rounded inline-flex flex-col justify-between items-start overflow-hidden">
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">
                  이번 달 예산
                </div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {safeBudgetData ? formatNumber(safeBudgetData.currentMonthBudget) : "0원"}
                </div>
              </div>
              <div className="justify-center text-stone-500 text-base font-normal font-['SUIT'] leading-relaxed">
                지난 달 예산은
                <br />
                {safeBudgetData ? formatNumber(safeBudgetData.previousMonthBudget) : "0원"}이었어요
              </div>
            </div>
            <div
              className="flex-1 p-5 bg-neutral-100 rounded inline-flex flex-col justify-start items-start gap-4 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">
                  이번 달 지출액
                </div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {safeBudgetData ? formatNumber(safeBudgetData.currentMonthExpense) : "0원"}
                </div>
              </div>
              <div className="justify-center text-stone-500 text-base font-normal font-['SUIT']">
                지난 달: {safeBudgetData ? formatNumber(safeBudgetData.previousMonthExpense) : "0원"}
              </div>
              <div className="self-stretch inline-flex justify-left items-center gap-2.5">
                <div className="w-36 h-1.5 bg-neutral-300 rounded-md overflow-hidden">
                  <div
                    className="h-1.5 bg-blue-500 rounded-md"
                    style={{
                      width: `${safeBudgetData && safeBudgetData.currentMonthBudget > 0
                        ? Math.max(
                          1,
                          Math.round(
                            (safeBudgetData.currentMonthExpense / safeBudgetData.currentMonthBudget) * 100,
                          ),
                        )
                        : 0
                        }%`,
                    }}
                  />
                </div>
                <div className="justify-center text-neutral-800 text-sm font-normal font-['SUIT']">
                  {safeBudgetData && safeBudgetData.currentMonthBudget > 0
                    ? `${Math.max(1, Math.round((safeBudgetData.currentMonthExpense / safeBudgetData.currentMonthBudget) * 100))}%`
                    : "0%"}
                </div>
              </div>
            </div>
            <div className="flex-1 self-stretch p-5 bg-neutral-100 rounded inline-flex flex-col justify-between items-start overflow-hidden">
              <div className="flex flex-col justify-start items-start gap-2.5">
                <div className="inline-flex justify-start items-center gap-3.5">
                  <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">
                      올해 총 지출액
                    </div>
                  </div>
                </div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {safeBudgetData ? formatNumber(safeBudgetData.currentYearTotalExpense) : "0원"}
                </div>
              </div>
              <div className="self-stretch justify-center text-stone-500 text-base font-normal font-['SUIT'] leading-relaxed">
                작년보다{" "}
                {safeBudgetData
                  ? formatPrice(
                    Math.abs(safeBudgetData.currentYearTotalExpense - safeBudgetData.previousYearTotalExpense),
                  )
                  : "0"}
                원<br />
                {safeBudgetData && safeBudgetData.currentYearTotalExpense - safeBudgetData.previousYearTotalExpense > 0
                  ? "더 지출했어요"
                  : "덜 지출했어요"}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col gap-2 px-8" aria-labelledby="purchase-list-tablet" role="list">
          <h2 id="purchase-list-tablet" className="sr-only">구매 내역 목록</h2>
          {/* Tablet Purchase List */}
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <article key={item.id} className="self-stretch pb-5 flex flex-col justify-start items-start" role="listitem">
                <div className="self-stretch py-3.5 border-b border-zinc-400 inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2">
                    <button
                      onClick={() => handleProductClick(item.id)}
                      className="text-blue-600 cursor-pointer text-base font-bold font-['SUIT'] bg-transparent border-none p-0 focus:outline-none whitespace-nowrap overflow-hidden text-ellipsis max-w-48"
                      type="button"
                    >
                      {item.item}
                    </button>
                    <div className="text-center justify-center text-zinc-500 text-xs font-normal font-['SUIT']">
                      총수량 4개
                    </div>
                  </div>
                  <div className="text-center justify-center text-neutral-800 text-base font-extrabold font-['SUIT']">
                    {(parseInt(item.amount.replace(/[^0-9]/g, '')) + 3000).toLocaleString()}원
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-center items-start">
                  <div className="self-stretch inline-flex justify-start items-center">
                    <div className="flex-1 flex justify-start items-center">
                      <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">
                          구매 요청일
                        </div>
                      </div>
                      <div className="flex-1 h-12 px-5 py-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-zinc-800 text-base font-bold font-['SUIT']">
                          {item.requestDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-start items-center">
                      <div className="w-36 h-12 px-5 py-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">
                          요청인
                        </div>
                      </div>
                      <div className="flex-1 h-12 px-5 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="flex justify-start items-center gap-2">
                          <div className="text-center justify-center text-zinc-800 text-base font-bold font-['SUIT']">
                            {item.requester}
                          </div>
                          {item.adminMessage?.includes("즉시 구매") && (
                            <div className="px-1 py-1 bg-blue-50 rounded-[100px] flex justify-center items-center gap-1">
                              <div className="justify-center text-blue-500 text-xs font-bold font-['SUIT']">
                                즉시 요청
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center">
                    <div className="flex-1 flex justify-start items-center">
                      <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">
                          구매 승인일
                        </div>
                      </div>
                      <div className="flex-1 h-12 px-5 py-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-zinc-800 text-base font-bold font-['SUIT']">
                          {item.approvalDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-start items-center">
                      <div className="w-36 h-12 px-5 py-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">
                          담당자
                        </div>
                      </div>
                      <div className="flex-1 h-12 px-5 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-zinc-800 text-base font-bold font-['SUIT']">
                          {item.manager}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="self-stretch pb-5 flex flex-col justify-start items-start">
              <div className="self-stretch py-3.5 border-b border-zinc-400 inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <div className="text-center justify-center text-neutral-800 text-base font-bold font-['SUIT']">
                    구매 내역이 없어요
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <nav className="self-stretch h-10 inline-flex justify-between items-center px-8" aria-label="페이지 이동">
          {/* Tablet Pagination */}
          <div className="self-stretch h-10 inline-flex justify-between items-center">
            <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">
              {currentPage} of {totalPages}
            </div>
            <div className="flex justify-start items-center gap-7">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex justify-start items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronLeftIcon} alt="Chevron Left" width={24} height={24} />
                </div>
                <div className="text-center justify-start text-zinc-500 text-base font-normal font-['SUIT']">Prev</div>
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex justify-start items-center gap-[5px] cursor-pointer disabled:cursor-not-allowed"
              >
                <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">
                  Next
                </div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronRightIcon} alt="Chevron Right" width={24} height={24} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </main>

      {/* Desktop Layout */}
      <main className="min-h-screen w-full relative bg-white overflow-hidden hidden md:block" aria-label="구매 내역 데스크탑 화면">
        <header className="self-stretch inline-flex justify-between items-center pt-10 px-10" role="banner">
          <h1 className="text-neutral-800 text-lg font-bold font-['SUIT']">구매 내역 확인</h1>
          <nav aria-label="정렬 옵션">
            <div className="relative custom-sort-dropdown w-auto" role="region">
              <Dropdown
                options={["최신순", "낮은 가격순", "높은 가격순"]}
                onChange={(selectedOption: string) => {
                  if (selectedOption === "최신순") setSortBy("latest");
                  else if (selectedOption === "낮은 가격순") setSortBy("priceLow");
                  else if (selectedOption === "높은 가격순") setSortBy("priceHigh");
                }}
              />
            </div>
          </nav>
        </header>
        <section className="w-full flex flex-col gap-7 px-10" aria-labelledby="budget-section-desktop">
          <h2 id="budget-section-desktop" className="sr-only">예산 현황</h2>
          {/* Desktop Budget Cards */}
          <div className="self-stretch inline-flex justify-start items-center gap-7">
            <div className="flex-1 self-stretch pl-7 pr-10 py-7 bg-neutral-100 rounded inline-flex flex-col justify-center items-start gap-2 overflow-hidden">
              <div className="self-stretch inline-flex justify-between items-start">
                <div className="justify-center text-neutral-800 text-lg font-bold font-['SUIT']">이번 달 예산</div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {safeBudgetData ? formatNumber(safeBudgetData.currentMonthBudget) : "0원"}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="justify-center text-stone-500 text-base font-normal font-['SUIT'] leading-relaxed">
                  지난 달 예산은
                  <br />
                  {safeBudgetData ? formatNumber(safeBudgetData.previousMonthBudget) : "0원"}이었어요
                </div>
              </div>
            </div>
            <div
              className="flex-1 pl-7 pr-10 py-7 bg-neutral-100 rounded inline-flex flex-col justify-start items-start gap-5 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="self-stretch inline-flex justify-between items-start">
                <div className="flex justify-start items-center gap-3.5">
                  <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">
                      이번 달 지출액
                    </div>
                    <div className="justify-center text-stone-500 text-base font-normal font-['SUIT']">
                      지난 달: {safeBudgetData ? formatNumber(safeBudgetData.previousMonthExpense) : "0원"}
                    </div>
                  </div>
                </div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {safeBudgetData ? formatNumber(safeBudgetData.currentMonthExpense) : "0원"}
                </div>
              </div>
              <div className="self-stretch inline-flex justify-left items-center gap-2.5">
                <div className="w-90 h-1.5 bg-neutral-300 rounded-md overflow-hidden">
                  <div
                    className="h-1.5 bg-blue-500 rounded-md"
                    style={{
                      width: `${safeBudgetData && safeBudgetData.currentMonthBudget > 0
                        ? Math.max(
                          1,
                          Math.round(
                            (safeBudgetData.currentMonthExpense / safeBudgetData.currentMonthBudget) * 100,
                          ),
                        )
                        : 0
                        }%`,
                    }}
                  />
                </div>
                <div className="justify-center text-neutral-800 text-sm font-normal font-['SUIT']">
                  {safeBudgetData && safeBudgetData.currentMonthBudget > 0
                    ? `${Math.max(1, Math.round((safeBudgetData.currentMonthExpense / safeBudgetData.currentMonthBudget) * 100))}%`
                    : "0%"}
                </div>
              </div>
            </div>
            <div className="flex-1 self-stretch pl-7 pr-10 py-7 bg-neutral-100 rounded inline-flex flex-col justify-center items-start gap-2 overflow-hidden">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-3.5">
                  <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">
                      올해 총 지출액
                    </div>
                  </div>
                </div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {safeBudgetData ? formatNumber(safeBudgetData.currentYearTotalExpense) : "0원"}
                </div>
              </div>
              <div className="justify-center text-stone-500 text-base font-normal font-['SUIT'] leading-relaxed">
                올해 작년보다
                <br />
                {safeBudgetData
                  ? formatPrice(
                    Math.abs(safeBudgetData.currentYearTotalExpense - safeBudgetData.previousYearTotalExpense),
                  )
                  : "0"}
                원{" "}
                {safeBudgetData && safeBudgetData.currentYearTotalExpense - safeBudgetData.previousYearTotalExpense > 0
                  ? "더 지출했어요"
                  : "덜 지출했어요"}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col gap-2 px-10" aria-labelledby="purchase-list-desktop" role="list">
          <h2 id="purchase-list-desktop" className="sr-only">구매 내역 목록</h2>
          {/* Desktop Purchase List - Table Format */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch px-10 py-5 border-t border-b border-neutral-200 inline-flex justify-between items-center">
              <div className="w-32 justify-start text-zinc-500 text-base font-bold font-['SUIT']">구매 요청일</div>
              <div className="w-32 justify-start text-zinc-500 text-base font-bold font-['SUIT']">요청인</div>
              <div className="w-44 justify-start text-zinc-500 text-base font-bold font-['SUIT']">상품 정보</div>
              <div className="w-32 justify-start text-zinc-500 text-base font-bold font-['SUIT']">주문 금액</div>
              <div className="flex justify-start items-center gap-2">
                <div className="w-32 justify-start text-zinc-500 text-base font-bold font-['SUIT']">구매 승인일</div>
              </div>
              <div className="w-24 justify-start text-zinc-500 text-base font-bold font-['SUIT']">담당자</div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="self-stretch h-24 px-10 border-b border-neutral-200 inline-flex justify-between items-center"
                    role="listitem"
                  >
                    <div className="w-32 justify-start text-neutral-800 text-base font-normal font-['SUIT']">
                      {item.requestDate}
                    </div>
                    <div className="w-32 flex justify-start items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      <div className="justify-start text-neutral-800 text-base font-normal font-['SUIT'] whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.requester}
                      </div>
                      {item.adminMessage?.includes("즉시 구매") && (
                        <div className="px-2 py-1 bg-blue-50 rounded-[100px] flex justify-center items-center gap-1 whitespace-nowrap">
                          <div className="justify-center items-center text-center text-blue-500 text-xs font-bold font-['SUIT'] w-12 whitespace-nowrap overflow-hidden text-ellipsis">
                            즉시 요청
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-44 inline-flex flex-col justify-center items-start gap-1">
                      <button
                        onClick={() => handleProductClick(item.id)}
                        className="text-blue-600 cursor-pointer text-base font-normal font-['SUIT'] bg-transparent border-none p-0 focus:outline-none whitespace-nowrap overflow-hidden text-ellipsis max-w-44"
                        type="button"
                      >
                        {item.item}
                      </button>
                      <div className="justify-start text-zinc-500 text-sm font-normal font-['SUIT']">총 수량 4개</div>
                    </div>
                    <div className="w-32 justify-start text-neutral-800 text-base font-normal font-['SUIT']">
                      {(parseInt(item.amount.replace(/[^0-9]/g, '')) + 3000).toLocaleString()}원
                    </div>
                    <div className="flex justify-start items-center gap-5">
                      <div className="w-32 justify-start text-neutral-800 text-base font-normal font-['SUIT']">
                        {item.approvalDate}
                      </div>
                    </div>
                    <div className="w-24 justify-start text-neutral-800 text-base font-normal font-['SUIT']">
                      {item.manager}
                    </div>
                  </div>
                ))
              ) : (
                <div className="self-stretch h-24 px-10 border-b border-neutral-200 inline-flex justify-center items-center">
                  <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">
                    구매 내역이 없어요
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <nav className="self-stretch h-10 inline-flex justify-between items-center px-10" aria-label="페이지 이동">
          {/* Desktop Pagination */}
          <div className="self-stretch h-10 inline-flex justify-between items-center">
            <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">
              {currentPage} of {totalPages}
            </div>
            <div className="flex justify-start items-center gap-7">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex justify-start items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronLeftIcon} alt="Chevron Left" width={24} height={24} />
                </div>
                <div className="text-center justify-start text-zinc-500 text-base font-normal font-['SUIT']">Prev</div>
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex justify-start items-center gap-[5px] cursor-pointer disabled:cursor-not-allowed"
              >
                <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">
                  Next
                </div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronRightIcon} alt="Chevron Right" width={24} height={24} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </main>
    </>
  );
};

export default OrderHistoryPage;
