"use client";

import React, { useEffect, useState } from "react";
import { getBudgets } from "../../../../lib/api/budgets.api";

// 예산/지출/총액 API 응답 타입
interface BudgetSummaryApi {
  id: number;
  companyId: number;
  currentMonthExpense: number;
  currentMonthBudget: number;
  monthlyBudget: number;
  year: string;
  month: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  currentYearTotalExpense: number;
  previousMonthBudget: number;
  previousMonthExpense: number;
  previousYearTotalExpense: number;
}

const formatNumber = (num: number | undefined) => (typeof num === "number" ? num.toLocaleString() + "원" : "-");

const PurchaseSummary: React.FC = () => {
  const [data, setData] = useState<BudgetSummaryApi | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getBudgets();
        setData(res);
      } catch (e: unknown) {
        let msg = "데이터를 불러오지 못했습니다.";
        if (typeof e === "object" && e !== null && "message" in e) {
          const err = e as { message?: string };
          if (typeof err.message === "string") {
            msg = err.message;
          }
        }
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="py-8 text-center text-[--color-primary-700]">로딩 중...</div>;
  }
  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }
  if (!data) {
    return null;
  }

  // 시안의 카드 레이아웃 및 남은 예산 정보 박스 추가
  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      {/* 카드 3개 (모바일: 세로, 태블릿/PC: 가로) */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:gap-5">
        {/* 이번 달 예산 */}
        <div
          className="flex-1 flex flex-col justify-between"
          style={{
            width: "414.67px",
            height: "150px",
            padding: "30px 40px 30px 30px",
            gap: "8px",
            borderRadius: "4px",
            background: "#F5F5F5",
            opacity: 1,
          }}
        >
          <div className="flex flex-row items-center justify-between w-full mb-2">
            <div className="text-neutral-800 text-base sm:text-lg font-bold font-suit">이번 달 예산</div>
            <div className="text-neutral-800 text-lg sm:text-2xl font-extrabold font-suit">
              {formatNumber(data.currentMonthBudget)}
            </div>
          </div>
          <div className="text-stone-500 text-sm sm:text-base font-normal font-suit leading-snug mt-auto">
            지난 달 예산은 {formatNumber(data.previousMonthBudget)}였어요
          </div>
        </div>
        {/* 이번 달 지출액 */}
        <div
          className="flex-1 flex flex-col justify-between"
          style={{
            width: "414.67px",
            height: "150px",
            padding: "30px 40px 30px 30px",
            gap: "8px",
            borderRadius: "4px",
            background: "#F5F5F5",
            opacity: 1,
          }}
        >
          <div className="flex flex-row items-center justify-between w-full mb-2">
            <div className="text-neutral-800 text-base sm:text-lg font-bold font-suit">이번 달 지출액</div>
            <div className="text-neutral-800 text-lg sm:text-2xl font-extrabold font-suit">
              {formatNumber(data.currentMonthExpense)}
            </div>
          </div>
          <div className="text-stone-500 text-sm sm:text-base font-normal font-suit">
            지난 달: {formatNumber(data.previousMonthExpense)}
          </div>
          {/* 진행바 */}
          <div className="w-full flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-neutral-300 rounded-md overflow-hidden">
              <div
                className="h-1.5 bg-blue-500 rounded-md"
                style={{
                  width: `${Math.min(100, Math.round((data.currentMonthExpense / (data.currentMonthBudget || 1)) * 100))}%`,
                }}
              />
            </div>
            <div className="text-neutral-800 text-xs sm:text-sm font-normal font-suit min-w-[32px] text-right">
              {data.currentMonthBudget
                ? `${Math.round((data.currentMonthExpense / data.currentMonthBudget) * 100)}%`
                : "-"}
            </div>
          </div>
        </div>
        {/* 올해 총 지출액 */}
        <div
          className="flex-1 flex flex-col justify-between"
          style={{
            width: "414.67px",
            height: "150px",
            padding: "30px 40px 30px 30px",
            gap: "8px",
            borderRadius: "4px",
            background: "#F5F5F5",
            opacity: 1,
          }}
        >
          <div className="flex flex-row items-center justify-between w-full mb-2">
            <div className="text-neutral-800 text-base sm:text-lg font-bold font-suit">올해 총 지출액</div>
            <div className="text-neutral-800 text-lg sm:text-2xl font-extrabold font-suit">
              {formatNumber(data.currentYearTotalExpense)}
            </div>
          </div>
          <div className="text-stone-500 text-sm sm:text-base font-normal font-suit leading-snug mt-auto">{`작년보다 ${(data.currentYearTotalExpense - data.previousYearTotalExpense).toLocaleString()}원 ${data.currentYearTotalExpense - data.previousYearTotalExpense > 0 ? "더 지출했어요" : "덜 지출했어요"}`}</div>
        </div>
        {/* 남은 예산 정보 박스 */}
        <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 w-64 p-6 bg-neutral-800 rounded-[12px] flex-col justify-center items-start gap-2 z-10">
          <div className="inline-flex justify-start items-center gap-1">
            <div className="text-white text-base font-extrabold font-suit">이번 달 남은 예산:</div>
            <div className="text-white text-base font-extrabold font-suit">
              {formatNumber(data.currentMonthBudget - data.currentMonthExpense)}
            </div>
          </div>
          <div className="inline-flex justify-start items-center gap-1">
            <div className="text-white text-sm font-normal font-suit">지난 달 남은 예산:</div>
            <div className="text-white text-sm font-normal font-suit">
              {formatNumber(data.previousMonthBudget - data.previousMonthExpense)}
            </div>
          </div>
          <div className="text-white text-sm font-normal font-suit">
            {`지난 달보다 ${(data.currentMonthExpense - data.previousMonthExpense).toLocaleString()}원 ${data.currentMonthExpense - data.previousMonthExpense > 0 ? "더 사용했어요" : "덜 사용했어요"}`}
          </div>
        </div>
      </div>
      {/* 모바일용 남은 예산 정보 박스 */}
      <div className="flex sm:hidden w-full p-6 bg-neutral-800 rounded-[12px] flex-col justify-center items-start gap-2 mt-4">
        <div className="inline-flex justify-start items-center gap-1">
          <div className="text-white text-base font-extrabold font-suit">이번 달 남은 예산:</div>
          <div className="text-white text-base font-extrabold font-suit">
            {formatNumber(data.currentMonthBudget - data.currentMonthExpense)}
          </div>
        </div>
        <div className="inline-flex justify-start items-center gap-1">
          <div className="text-white text-sm font-normal font-suit">지난 달 남은 예산:</div>
          <div className="text-white text-sm font-normal font-suit">
            {formatNumber(data.previousMonthBudget - data.previousMonthExpense)}
          </div>
        </div>
        <div className="text-white text-sm font-normal font-suit">
          {`지난 달보다 ${(data.currentMonthExpense - data.previousMonthExpense).toLocaleString()}원 ${data.currentMonthExpense - data.previousMonthExpense > 0 ? "더 사용했어요" : "덜 사용했어요"}`}
        </div>
      </div>
    </div>
  );
};

export default PurchaseSummary;
