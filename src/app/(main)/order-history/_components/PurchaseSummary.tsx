"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { getBudgets } from "../../../../lib/api/budgets.api";

// 요약 카드 데이터 타입 정의
// (value, description 등은 동적으로 생성)
type TSummaryCardProps = {
  title: string;
  value: string;
  description: string;
  progressBar?: {
    current: number;
    total: number;
  };
  tooltip?: string;
};

// 개별 요약 카드 컴포넌트
const SummaryCard: React.FC<TSummaryCardProps> = ({ title, value, description, progressBar, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const progressPercentage = progressBar ? (progressBar.current / progressBar.total) * 100 : 0;

  return (
    <div
      className={clsx(
        "bg-[--color-white]",
        "p-4",
        "rounded-lg",
        "shadow-sm",
        "flex-1",
        "min-w-[280px]",
        "relative",
        "border",
        "border-[--color-primary-100]",
      )}
      onMouseEnter={() => tooltip && setShowTooltip(true)}
      onMouseLeave={() => tooltip && setShowTooltip(false)}
    >
      <h3 className="text-sm font-medium text-[--color-primary-700] mb-1">{title}</h3>
      <p className="text-2xl font-bold text-[--color-primary-950] mb-2">{value}</p>
      <p className="text-xs text-[--color-primary-500] mb-2">{description}</p>

      {progressBar && (
        <div className="w-full bg-[--color-primary-100] rounded-full h-2">
          <div
            className="bg-[--color-secondary-500] h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      )}

      {tooltip && showTooltip && (
        <div
          className={clsx(
            "absolute",
            "bottom-full",
            "left-1/2",
            "-translate-x-1/2",
            "mb-2",
            "p-2",
            "bg-[--color-primary-950]",
            "text-[--color-white]",
            "text-xs",
            "rounded-md",
            "whitespace-nowrap",
            "z-10",
            "before:content-['']",
            "before:absolute",
            "before:top-full",
            "before:left-1/2",
            "before:-translate-x-1/2",
            "before:border-8",
            "before:border-transparent",
            "before:border-t-[--color-primary-950]",
          )}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

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

  // 카드별 데이터 가공
  const summaryData: TSummaryCardProps[] = [
    {
      title: "이번 달 예산",
      value: formatNumber(data.currentMonthBudget),
      description: `지난 달 예산은 ${formatNumber(data.previousMonthBudget)}였어요`,
    },
    {
      title: "이번 달 지출액",
      value: formatNumber(data.currentMonthExpense),
      description: `지난 달 ${formatNumber(data.previousMonthExpense)}`,
      progressBar: { current: data.currentMonthExpense, total: data.currentMonthBudget },
      tooltip: `이번 달 남은 예산: ${formatNumber(data.currentMonthBudget - data.currentMonthExpense)}\n지난 달보다 ${(data.currentMonthExpense - data.previousMonthExpense).toLocaleString()}원 ${data.currentMonthExpense - data.previousMonthExpense > 0 ? "더 사용했어요" : "덜 사용했어요"}`,
    },
    {
      title: "올해 총 지출액",
      value: formatNumber(data.currentYearTotalExpense),
      description: `올해 작년보다 ${(data.currentYearTotalExpense - data.previousYearTotalExpense).toLocaleString()}원 ${data.currentYearTotalExpense - data.previousYearTotalExpense > 0 ? "더 지출했어요" : "덜 지출했어요"}`,
    },
  ];

  return (
    <div className={clsx("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-4", "w-full", "mb-8")}>
      {summaryData.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
};

export default PurchaseSummary;
