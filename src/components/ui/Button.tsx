import React from "react";
import clsx from "clsx";
import { TButtonStyle, TButtonType } from "@/types/button.types";
import { twMerge } from "tailwind-merge";

type TButtonProps = {
  type: TButtonType;
  label?: string;
  className?: string;
  onClick?: () => void;
   disabled?: boolean;
};

const buttonStyleMap: Record<TButtonType, TButtonStyle> = {
  primary: {
    bg: "bg-primary-900",
    textColor: "text-white",
    padding: "px-4 py-3",
  },
  black: {
    bg: "bg-black",
    textColor: "text-white",
    padding: "px-4 py-3",
  },
  grayDisabled: {
    bg: "bg-primary-300",
    textColor: "text-primary-100",
    padding: "px-4 py-3",
  },
  white: {
    bg: "bg-white",
    padding: "px-4 py-3",
    border: "border-1 border-primary-300",
  },
  gray: {
    bg: "bg-primary-200",
    padding: "px-4 py-3",
    border: "border-1 border-primary-300",
  },
  whiteDisabled: {
    bg: "bg-white",
    textColor: "text-primary-400",
    padding: "px-4 py-3",
    border: "border-1 border-primary-300",
  },
};

export default function Button({ type, label = "label", onClick, className = "" }: TButtonProps) {
  const style = buttonStyleMap[type];

  if (!style) {
    console.warn(`Unknown button type: ${type}`);
    return null;
  }

  const disabledTypes: TButtonType[] = ["whiteDisabled", "grayDisabled"];
  const isDisabled = disabledTypes.includes(type);

  const baseStyle = clsx(
    style.bg,
    style.textColor,
    style.padding ?? "",
    style.border,
    style.font,
    "rounded-[2px] inline-flex justify-center items-center text-base h-[40px]",
    isDisabled ? "cursor-default" : "cursor-pointer",
  );

  return (
    <button className={twMerge(baseStyle, className)} disabled={isDisabled} onClick={onClick}>
      {label}
    </button>
  );
}