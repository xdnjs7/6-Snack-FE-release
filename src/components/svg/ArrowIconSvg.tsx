"use client";

import { twMerge } from "tailwind-merge";

type TArrowIconProps = {
  direction: "left" | "right" | "down" | "up";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function ArrowIconSvg({ direction, className = "", onClick, disabled = false }: TArrowIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("text-primary-300", disabled ? "opacity-50 cursor-default" : "cursor-pointer", className)}
      onClick={!disabled ? onClick : undefined}
      style={{
        transform:
          direction === "left"
            ? "rotate(180deg)"
            : direction === "down"
              ? "rotate(90deg)"
              : direction === "up"
                ? "rotate(-90deg)"
                : "none",
      }}
    >
      <path
        d="M9.08203 5.37109L15.9766 12.2646L9.08203 19.1592L8.02148 18.0986L13.8545 12.2656L8.02148 6.43164L9.08203 5.37109Z"
        fill={disabled ? "#9CA3AF" : "currentColor"}
      />
    </svg>
  );
}
