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
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        {/* 이번 달 예산 */}
        <div className="flex-1 min-h-[140px] flex flex-col justify-between bg-neutral-100 rounded-[12px] p-5 gap-2.5">
          <div className="text-neutral-800 text-base sm:text-lg font-bold font-suit">이번 달 예산</div>
          <div className="text-neutral-800 text-lg sm:text-2xl font-extrabold font-suit">
            {formatNumber(data.currentMonthBudget)}
          </div>
          <div className="text-stone-500 text-sm sm:text-base font-normal font-suit leading-snug mt-auto">
            지난 달 예산은 {formatNumber(data.previousMonthBudget)}였어요
          </div>
        </div>
        {/* 이번 달 지출액 */}
        <div className="flex-1 min-h-[140px] flex flex-col justify-between bg-neutral-100 rounded-[12px] p-5 gap-2.5">
          <div className="text-neutral-800 text-base sm:text-lg font-bold font-suit">이번 달 지출액</div>
          <div className="text-neutral-800 text-lg sm:text-2xl font-extrabold font-suit">
            {formatNumber(data.currentMonthExpense)}
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
        <div className="flex-1 min-h-[140px] flex flex-col justify-between bg-neutral-100 rounded-[12px] p-5 gap-2.5">
          <div className="text-neutral-800 text-base sm:text-lg font-bold font-suit">올해 총 지출액</div>
          <div className="text-neutral-800 text-lg sm:text-2xl font-extrabold font-suit">
            {formatNumber(data.currentYearTotalExpense)}
          </div>
          <div className="text-stone-500 text-sm sm:text-base font-normal font-suit leading-snug mt-auto">{`작년보다 ${(data.currentYearTotalExpense - data.previousYearTotalExpense).toLocaleString()}원 ${data.currentYearTotalExpense - data.previousYearTotalExpense > 0 ? "더 지출했어요" : "덜 지출했어요"}`}</div>
        </div>
      </div>
      {/* 남은 예산 정보 박스 (모바일: 카드 아래, PC: 오른쪽) */}
      <div className="w-full sm:w-64 p-6 bg-neutral-800 rounded-[12px] flex flex-col justify-center items-start gap-2 mt-4 sm:mt-0 sm:absolute sm:right-8 sm:top-0">
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
