"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Dropdown from "@/components/common/DropDown";
import fileIcon from "@/assets/icons/ic_file.svg";
import Image from "next/image";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import ChevronLeftIcon from "@/assets/icons/ic_chevron_left.svg";
import ChevronRightIcon from "@/assets/icons/ic_chevron_right.svg";

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
    <>
      {/* Mobile Layout */}
      <div className="min-h-screen w-full max-w-sm mx-auto relative bg-white overflow-hidden sm:hidden">

        {/* Mobile Content */}
        <div className="w-full px-6 pt-6 inline-flex flex-col justify-start items-end gap-4">
          {/* Mobile Header + Sort */}
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-center text-neutral-800 text-lg font-bold font-['SUIT']">구매 내역 확인</div>
            <div className="relative custom-sort-dropdown w-auto">
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

          {/* Mobile Budget Cards */}
          <div className="self-stretch relative flex flex-col justify-center items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-4">
              <div className="flex-1 h-40 p-5 bg-neutral-100 rounded inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['SUIT']">이번 달 예산</div>
                  <div className="justify-center text-neutral-800 text-lg font-extrabold font-['SUIT']">
                    {budgetData ? formatNumber(budgetData.currentMonthBudget) : '1,000,000원'}
                  </div>
                </div>
                <div className="relative w-34 justify-center text-stone-500 text-sm font-normal font-['SUIT'] leading-snug">
                  지난 달 예산은 {budgetData ? formatNumber(budgetData.previousMonthBudget) : '2,000,000원'}이었어요
                </div>
              </div>
              <div
                className="flex-1 h-40 p-5 bg-neutral-100 rounded inline-flex flex-col justify-start items-start gap-3 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['SUIT']">이번 달 지출액</div>
                  <div className="justify-center text-neutral-800 text-lg font-extrabold font-['SUIT']">
                    {budgetData ? formatNumber(budgetData.currentMonthExpense) : '126,000원'}
                  </div>
                </div>
                <div className="justify-center text-stone-500 text-sm font-normal font-['SUIT']">
                  지난 달: {budgetData ? formatNumber(budgetData.previousMonthExpense) : '2,000,000원'}
                </div>
                <div className="self-stretch inline-flex justify-left items-center gap-1">
                  <div className="w-20 h-1.5 bg-neutral-300 rounded-md overflow-hidden">
                    <div
                      className="h-1.5 bg-blue-500 rounded-md"
                      style={{
                        width: `${budgetData && budgetData.currentMonthBudget > 0
                          ? Math.max(1, Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100))
                          : 0}%`,
                      }}
                    />
                  </div>
                  <div className="justify-center text-neutral-800 text-xs font-normal font-['SUIT']">
                    {budgetData && budgetData.currentMonthBudget > 0
                      ? `${Math.max(1, Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100))}%`
                      : '74%'}
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-40 p-5 bg-neutral-100 rounded flex flex-col justify-between items-start overflow-hidden">
              <div className="flex flex-col justify-start items-start gap-2.5">
                <div className="inline-flex justify-start items-center gap-3.5">
                  <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['SUIT']">올해 총 지출액</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-800 text-lg font-extrabold font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.currentYearTotalExpense) : '10,000,000원'}
                </div>
              </div>
              <div className="self-stretch justify-center text-stone-500 text-sm font-normal font-['SUIT'] leading-snug">
                작년보다 {budgetData ? Math.abs(budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense).toLocaleString() : '6,000,000'}원<br />
                {budgetData && budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense > 0 ? '더 지출했어요' : '덜 지출했어요'}
              </div>
            </div>

            {/* Mobile Budget Details Box */}
            {isHovered && (
              <div className="w-64 p-6 left-1/2 transform -translate-x-1/2 top-[141px] absolute bg-neutral-800 rounded flex flex-col justify-center items-start gap-2 overflow-hidden">
                <div className="inline-flex justify-start items-center gap-1">
                  <div className="justify-center text-white text-base font-extrabold font-['SUIT']">이번 달 남은 예산:</div>
                  <div className="justify-center text-white text-base font-extrabold font-['SUIT']">
                    {budgetData ? formatNumber(budgetData.currentMonthBudget - budgetData.currentMonthExpense) : '126,000원'}
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-1">
                  <div className="justify-center text-white text-sm font-normal font-['SUIT']">지난 달 남은 예산:</div>
                  <div className="justify-center text-white text-sm font-normal font-['SUIT']">
                    {budgetData ? formatNumber(budgetData.previousMonthBudget - budgetData.previousMonthExpense) : '150,000원'}
                  </div>
                </div>
                <div className="justify-center text-white text-sm font-normal font-['SUIT']">
                  지난 달보다 {budgetData ? Math.abs(budgetData.currentMonthExpense - budgetData.previousMonthExpense).toLocaleString() : '24,000'}원 {budgetData && budgetData.currentMonthExpense - budgetData.previousMonthExpense > 0 ? '더 사용했어요' : '덜 사용했어요'}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Purchase List */}
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div key={item.id} className="self-stretch pb-2.5 flex flex-col justify-start items-start">
                <div className="self-stretch py-3.5 border-b border-zinc-400 inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2">
                    <div className="text-center justify-center text-neutral-800 text-base font-bold font-['SUIT']">{item.item}</div>
                    <div className="text-center justify-center text-zinc-500 text-xs font-normal font-['SUIT']">총수량 4개</div>
                  </div>
                  <div className="text-center justify-center text-neutral-800 text-base font-extrabold font-['SUIT']">{item.amount}</div>
                </div>
                <div className="self-stretch flex flex-col justify-center items-start">
                  <div className="self-stretch inline-flex justify-start items-center">
                    <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="text-center justify-center text-neutral-800 text-sm font-normal font-['SUIT']">구매 요청일</div>
                    </div>
                    <div className="flex-1 h-12 px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="text-center justify-center text-zinc-800 text-sm font-bold font-['SUIT']">{item.requestDate}</div>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center">
                    <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="text-center justify-center text-neutral-800 text-sm font-normal font-['SUIT']">요청인</div>
                    </div>
                    <div className="flex-1 h-12 px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="text-center justify-center text-zinc-800 text-sm font-bold font-['SUIT']">{item.requester}</div>
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
                      <div className="text-center justify-center text-neutral-800 text-sm font-normal font-['SUIT']">구매 승인일</div>
                    </div>
                    <div className="flex-1 self-stretch p-4 border-b border-neutral-200 flex justify-start items-start gap-2">
                      <div className="text-center justify-center text-zinc-800 text-sm font-bold font-['SUIT']">{item.approvalDate}</div>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-start">
                    <div className="w-36 self-stretch px-2 py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
                      <div className="text-center justify-center text-neutral-800 text-sm font-normal font-['SUIT']">담당자</div>
                    </div>
                    <div className="flex-1 p-4 border-b border-neutral-200 flex justify-start items-center gap-2">
                      <div className="flex-1 justify-center text-zinc-800 text-sm font-bold font-['SUIT'] leading-snug">{item.manager}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="self-stretch pb-2.5 flex flex-col justify-start items-start">
              <div className="self-stretch py-3.5 border-b border-zinc-400 inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <div className="text-center justify-center text-neutral-800 text-base font-bold font-['SUIT']">구매 내역이 없어요</div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Pagination */}
          <div className="self-stretch h-10 inline-flex justify-between items-center">
            <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">{currentPage} of {totalPages}</div>
            <div className="flex justify-start items-center gap-7">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex justify-start items-center gap-1.5"
              >
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronLeftIcon} alt="Chevron Left" width={24} height={24} />
                </div>
                <div className="text-center justify-start text-zinc-500 text-base font-normal font-['SUIT']">Prev</div>
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex justify-start items-center gap-[5px]"
              >
                <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">Next</div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronRightIcon} alt="Chevron Right" width={24} height={24} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="min-h-screen w-full max-w-3xl mx-auto relative bg-white overflow-hidden hidden sm:block md:hidden">

        {/* Tablet Content */}
        <div className="w-full px-6 pt-6 inline-flex flex-col justify-start items-start gap-7">
          {/* Tablet Header + Sort */}
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-center text-neutral-800 text-lg font-bold font-['SUIT']">구매 내역 확인</div>
            <div className="relative custom-sort-dropdown w-auto">
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

          {/* Tablet Budget Cards */}
          <div className="self-stretch pb-5 inline-flex justify-start items-center gap-5">
            <div className="flex-1 self-stretch p-5 bg-neutral-100 rounded inline-flex flex-col justify-between items-start overflow-hidden">
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">이번 달 예산</div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.currentMonthBudget) : '1,000,000원'}
                </div>
              </div>
              <div className="justify-center text-stone-500 text-base font-normal font-['SUIT'] leading-relaxed">
                지난 달 예산은<br />{budgetData ? formatNumber(budgetData.previousMonthBudget) : '2,000,000원'}이었어요
              </div>
            </div>
            <div
              className="flex-1 p-5 bg-neutral-100 rounded inline-flex flex-col justify-start items-start gap-4 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">이번 달 지출액</div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.currentMonthExpense) : '126,000원'}
                </div>
              </div>
              <div className="justify-center text-stone-500 text-base font-normal font-['SUIT']">
                지난 달: {budgetData ? formatNumber(budgetData.previousMonthExpense) : '2,000,000원'}
              </div>
              <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                <div className="w-36 h-1.5 bg-neutral-300 rounded-md overflow-hidden">
                  <div
                    className="h-1.5 bg-blue-500 rounded-md"
                    style={{
                      width: `${budgetData && budgetData.currentMonthBudget > 0
                        ? Math.max(1, Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100))
                        : 0}%`,
                    }}
                  />
                </div>
                <div className="justify-center text-neutral-800 text-sm font-normal font-['SUIT']">
                  {budgetData && budgetData.currentMonthBudget > 0
                    ? `${Math.max(1, Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100))}%`
                    : '74%'}
                </div>
              </div>
            </div>
            <div className="flex-1 self-stretch p-5 bg-neutral-100 rounded inline-flex flex-col justify-between items-start overflow-hidden">
              <div className="flex flex-col justify-start items-start gap-2.5">
                <div className="inline-flex justify-start items-center gap-3.5">
                  <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">올해 총 지출액</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.currentYearTotalExpense) : '10,000,000원'}
                </div>
              </div>
              <div className="self-stretch justify-center text-stone-500 text-base font-normal font-['SUIT'] leading-relaxed">
                작년보다 {budgetData ? Math.abs(budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense).toLocaleString() : '6,000,000'}원<br />
                {budgetData && budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense > 0 ? '더 지출했어요' : '덜 지출했어요'}
              </div>
            </div>
          </div>

          {/* Tablet Purchase List */}
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div key={item.id} className="self-stretch pb-5 flex flex-col justify-start items-start">
                <div className="self-stretch py-3.5 border-b border-zinc-400 inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2">
                    <div className="text-center justify-center text-neutral-800 text-base font-bold font-['SUIT']">{item.item}</div>
                    <div className="text-center justify-center text-zinc-500 text-xs font-normal font-['SUIT']">총수량 4개</div>
                  </div>
                  <div className="text-center justify-center text-neutral-800 text-base font-extrabold font-['SUIT']">{item.amount}</div>
                </div>
                <div className="self-stretch flex flex-col justify-center items-start">
                  <div className="self-stretch inline-flex justify-start items-center">
                    <div className="flex-1 flex justify-start items-center">
                      <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">구매 요청일</div>
                      </div>
                      <div className="flex-1 h-12 px-5 py-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-zinc-800 text-base font-bold font-['SUIT']">{item.requestDate}</div>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-start items-center">
                      <div className="w-36 h-12 px-5 py-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">요청인</div>
                      </div>
                      <div className="flex-1 h-12 px-5 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="flex justify-start items-center gap-2">
                          <div className="text-center justify-center text-zinc-800 text-base font-bold font-['SUIT']">{item.requester}</div>
                          {item.adminMessage?.includes("즉시 구매") && (
                            <div className="px-1 py-1 bg-blue-50 rounded-[100px] flex justify-center items-center gap-1">
                              <div className="justify-center text-blue-500 text-xs font-bold font-['SUIT']">즉시 요청</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center">
                    <div className="flex-1 flex justify-start items-center">
                      <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">구매 승인일</div>
                      </div>
                      <div className="flex-1 h-12 px-5 py-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-zinc-800 text-base font-bold font-['SUIT']">{item.approvalDate}</div>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-start items-center">
                      <div className="w-36 h-12 px-5 py-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">담당자</div>
                      </div>
                      <div className="flex-1 h-12 px-5 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                        <div className="text-center justify-center text-zinc-800 text-base font-bold font-['SUIT']">{item.manager}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="self-stretch pb-5 flex flex-col justify-start items-start">
              <div className="self-stretch py-3.5 border-b border-zinc-400 inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <div className="text-center justify-center text-neutral-800 text-base font-bold font-['SUIT']">구매 내역이 없어요</div>
                </div>
              </div>
            </div>
          )}

          {/* Tablet Pagination */}
          <div className="self-stretch h-10 inline-flex justify-between items-center">
            <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">{currentPage} of {totalPages}</div>
            <div className="flex justify-start items-center gap-7">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex justify-start items-center gap-1.5"
              >
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronLeftIcon} alt="Chevron Left" width={24} height={24} />
                </div>
                <div className="text-center justify-start text-zinc-500 text-base font-normal font-['SUIT']">Prev</div>
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex justify-start items-center gap-[5px]"
              >
                <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">Next</div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronRightIcon} alt="Chevron Right" width={24} height={24} />
                </div>
              </button>
            </div>
          </div>

          {/* Tablet Budget Details Hover Box */}
          {isHovered && (
            <div className="w-64 p-6 absolute left-[55%] transform -translate-x-1/2 top-[264px] bg-neutral-800 rounded flex flex-col justify-center items-start gap-2 overflow-hidden">
              <div className="inline-flex justify-start items-center gap-1">
                <div className="justify-center text-white text-base font-extrabold font-['SUIT']">이번 달 남은 예산:</div>
                <div className="justify-center text-white text-base font-extrabold font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.currentMonthBudget - budgetData.currentMonthExpense) : '126,000원'}
                </div>
              </div>
              <div className="inline-flex justify-start items-center gap-1">
                <div className="justify-center text-white text-sm font-normal font-['SUIT']">지난 달 남은 예산:</div>
                <div className="justify-center text-white text-sm font-normal font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.previousMonthBudget - budgetData.previousMonthExpense) : '150,000원'}
                </div>
              </div>
              <div className="justify-center text-white text-sm font-normal font-['SUIT']">
                지난 달보다 {budgetData ? Math.abs(budgetData.currentMonthExpense - budgetData.previousMonthExpense).toLocaleString() : '24,000'}원 {budgetData && budgetData.currentMonthExpense - budgetData.previousMonthExpense > 0 ? '더 사용했어요' : '덜 사용했어요'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="min-h-screen w-full relative bg-white overflow-hidden hidden md:block">

        {/* Desktop Content */}
        <div className="w-full max-w-[1600px] mx-auto px-8 pt-[40px] pb-10 inline-flex flex-col justify-start items-start gap-10">
          {/* Desktop Header + Sort */}
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-center text-neutral-800 text-lg font-bold font-['SUIT']">구매 내역 확인</div>
            <div className="relative custom-sort-dropdown w-auto">
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

          {/* Desktop Budget Cards */}
          <div className="self-stretch inline-flex justify-start items-center gap-7">
            <div className="flex-1 self-stretch pl-7 pr-10 py-7 bg-neutral-100 rounded inline-flex flex-col justify-center items-start gap-2 overflow-hidden">
              <div className="self-stretch inline-flex justify-between items-start">
                <div className="justify-center text-neutral-800 text-lg font-bold font-['SUIT']">이번 달 예산</div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.currentMonthBudget) : '1,000,000원'}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="justify-center text-stone-500 text-base font-normal font-['SUIT'] leading-relaxed">
                  지난 달 예산은<br />{budgetData ? formatNumber(budgetData.previousMonthBudget) : '2,000,000원'}이었어요
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
                    <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">이번 달 지출액</div>
                    <div className="justify-center text-stone-500 text-base font-normal font-['SUIT']">
                      지난 달: {budgetData ? formatNumber(budgetData.previousMonthExpense) : '2,000,000원'}
                    </div>
                  </div>
                </div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.currentMonthExpense) : '126,000원'}
                </div>
              </div>
              <div className="self-stretch inline-flex justify-left items-center gap-2.5">
                <div className="w-90 h-1.5 bg-neutral-300 rounded-md overflow-hidden">
                  <div
                    className="h-1.5 bg-blue-500 rounded-md"
                    style={{
                      width: `${budgetData && budgetData.currentMonthBudget > 0
                        ? Math.max(1, Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100))
                        : 0}%`,
                    }}
                  />
                </div>
                <div className="justify-center text-neutral-800 text-sm font-normal font-['SUIT']">
                  {budgetData && budgetData.currentMonthBudget > 0
                    ? `${Math.max(1, Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100))}%`
                    : '74%'}
                </div>
              </div>
            </div>
            <div className="flex-1 self-stretch pl-7 pr-10 py-7 bg-neutral-100 rounded inline-flex flex-col justify-center items-start gap-2 overflow-hidden">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-3.5">
                  <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-center text-neutral-800 text-lg font-bold font-['SUIT']">올해 총 지출액</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.currentYearTotalExpense) : '10,000,000원'}
                </div>
              </div>
              <div className="justify-center text-stone-500 text-base font-normal font-['SUIT'] leading-relaxed">
                올해 작년보다<br />{budgetData ? Math.abs(budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense).toLocaleString() : '6,000,000'}원 {budgetData && budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense > 0 ? '더 지출했어요' : '덜 지출했어요'}
              </div>
            </div>
          </div>

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
                  <div key={item.id} className="self-stretch h-24 px-10 border-b border-neutral-200 inline-flex justify-between items-center">
                    <div className="w-32 justify-start text-neutral-800 text-base font-normal font-['SUIT']">{item.requestDate}</div>
                    <div className="relative w-32 flex justify-start items-center gap-2">
                      <div className="justify-start text-neutral-800 text-base font-normal font-['SUIT']">{item.requester}</div>
                      {item.adminMessage?.includes("즉시 구매") && (
                        <div className="px-1 py-1 bg-blue-50 rounded-[100px] flex justify-center items-center gap-1">
                          <div className="justify-center items-center text-center text-blue-500 text-xs font-bold font-['SUIT'] w-12">즉시 요청</div>
                        </div>
                      )}
                    </div>
                    <div className="w-44 inline-flex flex-col justify-center items-start gap-1">
                      <div className="justify-start text-neutral-800 text-base font-normal font-['SUIT']">{item.item}</div>
                      <div className="justify-start text-zinc-500 text-sm font-normal font-['SUIT']">총 수량 4개</div>
                    </div>
                    <div className="w-32 justify-start text-neutral-800 text-base font-normal font-['SUIT']">{item.amount}</div>
                    <div className="flex justify-start items-center gap-5">
                      <div className="w-32 justify-start text-neutral-800 text-base font-normal font-['SUIT']">{item.approvalDate}</div>
                    </div>
                    <div className="w-24 justify-start text-neutral-800 text-base font-normal font-['SUIT']">{item.manager}</div>
                  </div>
                ))
              ) : (
                <div className="self-stretch h-24 px-10 border-b border-neutral-200 inline-flex justify-center items-center">
                  <div className="text-center justify-center text-neutral-800 text-base font-normal font-['SUIT']">구매 내역이 없어요</div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Pagination */}
          <div className="self-stretch h-10 inline-flex justify-between items-center">
            <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">{currentPage} of {totalPages}</div>
            <div className="flex justify-start items-center gap-7">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex justify-start items-center gap-1.5"
              >
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronLeftIcon} alt="Chevron Left" width={24} height={24} />
                </div>
                <div className="text-center justify-start text-zinc-500 text-base font-normal font-['SUIT']">Prev</div>
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex justify-start items-center gap-[5px]"
              >
                <div className="text-center justify-start text-neutral-800 text-base font-normal font-['SUIT']">Next</div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <Image src={ChevronRightIcon} alt="Chevron Right" width={24} height={24} />
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Budget Details Hover Box */}
          {isHovered && (
            <div className="w-64 p-6 absolute left-1/2 transform -translate-x-1/2 top-[260px] bg-neutral-800 rounded flex flex-col justify-center items-start gap-2 overflow-hidden">
              <div className="inline-flex justify-start items-center gap-1">
                <div className="justify-center text-white text-base font-extrabold font-['SUIT']">이번 달 남은 예산:</div>
                <div className="justify-center text-white text-base font-extrabold font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.currentMonthBudget - budgetData.currentMonthExpense) : '126,000원'}
                </div>
              </div>
              <div className="inline-flex justify-start items-center gap-1">
                <div className="justify-center text-white text-sm font-normal font-['SUIT']">지난 달 남은 예산:</div>
                <div className="justify-center text-white text-sm font-normal font-['SUIT']">
                  {budgetData ? formatNumber(budgetData.previousMonthBudget - budgetData.previousMonthExpense) : '150,000원'}
                </div>
              </div>
              <div className="justify-center text-white text-sm font-normal font-['SUIT']">
                지난 달보다 {budgetData ? Math.abs(budgetData.currentMonthExpense - budgetData.previousMonthExpense).toLocaleString() : '24,000'}원 {budgetData && budgetData.currentMonthExpense - budgetData.previousMonthExpense > 0 ? '더 사용했어요' : '덜 사용했어요'}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderHistoryPage;
