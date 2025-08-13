"use client";

import { twMerge } from "tailwind-merge";

type TCheckIconProps = {
  className?: string;
  onClick?: () => void;
  stroke?: string;
  strokeWidth?: number;
  bgColor?: string;
};

export default function CheckIconSvg({
  className = "",
  onClick,
  stroke = "black",
  strokeWidth = 2,
  bgColor = "transparent",
}: TCheckIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(`cursor-pointer ${className}`)}
      onClick={onClick}
    >
      <circle cx="12" cy="12" r="12" fill={bgColor} />

      <path
        d="M7 12.5L10 15.5L17 8.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
