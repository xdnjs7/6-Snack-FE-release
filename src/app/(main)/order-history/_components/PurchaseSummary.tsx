"use client";

import React, { useState } from "react";
import clsx from "clsx";

// 요약 카드 데이터 타입 정의
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
        "min-w-[280px]", // 최소 너비 설정 (모바일에서 너무 작아지지 않도록)
        "relative", // 툴팁 위치 지정을 위해
        "border", // 테두리 추가 (이미지에서 보임)
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
            "bottom-full", // 카드 위로 툴팁 표시
            "left-1/2",
            "-translate-x-1/2",
            "mb-2", // 카드와의 간격
            "p-2",
            "bg-[--color-primary-950]", // 툴팁 배경색
            "text-[--color-white]", // 툴팁 텍스트 색상
            "text-xs",
            "rounded-md",
            "whitespace-nowrap", // 텍스트 줄바꿈 방지
            "z-10", // 다른 요소 위로 표시
            "before:content-['']", // 툴팁 화살표
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

const PurchaseSummary: React.FC = () => {
  const summaryData: TSummaryCardProps[] = [
    {
      title: "이번 달 예산",
      value: "1,000,000원",
      description: "지난 달 예산은 2,000,000원이었어요",
    },
    {
      title: "이번 달 지출액",
      value: "126,000원",
      description: "지난 달 2,000,000원",
      progressBar: { current: 126000, total: 2000000 },
      tooltip: "이번 달 남은 예산: 1,874,000원\n지난 달보다 24,000원 더 사용했어요",
    },
    {
      title: "올해 총 지출액",
      value: "10,000,000원",
      description: "올해 작년보다 6,000,000원 더 지출했어요",
    },
  ];

  return (
    <div
      className={clsx(
        "grid",
        "grid-cols-1", // 모바일: 1열
        "sm:grid-cols-2", // 태블릿: 2열
        "lg:grid-cols-3", // PC: 3열
        "gap-4", // 카드 간 간격
        "w-full",
        "mb-8", // 아래 콘텐츠와의 여백
      )}
    >
      {summaryData.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
};

export default PurchaseSummary;
