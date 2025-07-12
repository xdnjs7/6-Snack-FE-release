import React from "react";
import clsx from "clsx";

type TBadgeType = "request" | "pending" | "approved" | "rejected" | "admin" | "user";

type TBadgeProps = {
  type: TBadgeType;
};

const badgeStyleMap: Record<TBadgeType, { bg: string; text: string; textColor: string; iconColor?: string }> = {
  request: {
    bg: "bg-blue-50",
    text: "즉시 요청",
    textColor: "text-blue-500",
  },
  pending: {
    bg: "bg-primary-200",
    text: "대기 중",
    textColor: "text-primary-700",
    iconColor: "bg-primary-700",
  },
  approved: {
    bg: "bg-sky-100",
    text: "승인",
    textColor: "text-sky-500",
  },
  rejected: {
    bg: "bg-red-100",
    text: "거절",
    textColor: "text-red",
    iconColor: "bg-rose-400",
  },
  admin: {
    bg: "bg-primary-600",
    text: "관리자",
    textColor: "text-white",
  },
  user: {
    bg: "bg-primary-100",
    text: "일반",
    textColor: "text-primary-400",
  },
};

export const Badge = ({ type }: TBadgeProps) => {
  const { bg, text, textColor, iconColor } = badgeStyleMap[type];

  return (
    <div className={clsx("h-7 px-2 py-1.5 rounded-full inline-flex justify-center items-center gap-1", bg)}>
      {iconColor && <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: iconColor }} />}
      <span className={clsx("text-sm font-bold font-suit", textColor)}>{text}</span>
    </div>
  );
};

export default Badge;
