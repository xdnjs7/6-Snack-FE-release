"use client";

import React from "react";

type TChevronIconProps = {
  direction: "left" | "right" | "down" | "up";
  className?: string;
  color?: string;
};

export default function ChevronIcon({
  direction,
  className = "",
  color = "var(--color-primary-100)",
}: TChevronIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className}`}
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
        fill={color}
      />
    </svg>
  );
}
