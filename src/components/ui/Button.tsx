import React from "react";
import clsx from "clsx";
import { TButtonStyle, TButtonType } from "@/types/button.types";

type TButtonProps = {
  type: TButtonType;
  label?: string;
  className?: string;
  onClick?: () => void;
};

const buttonStyleMap: Record<TButtonType, TButtonStyle> = {
  primary: {
    bg: "bg-primary-900",
    textColor: "text-white",
    padding: "px-4 py-3",
  },
  black: {
    bg: "bg-primary-950",
    textColor: "text-white",
    padding: "px-4 py-3",
  },
  grayDisabled: {
    bg: "bg-primary-100",
    textColor: "text-primary-300",
    padding: "px-4 py-3",
  },
  white: {
    bg: "bg-white",
    textColor: "text-primary-950",
    padding: "px-4 py-3",
    border: "outline-1 outline-primary-300",
  },
  gray: {
    bg: "bg-primary-200",
    textColor: "text-primary-950",
    padding: "px-4 py-3",
    border: "outline-1 outline-primary-300",
  },
  whiteDisabled: {
    bg: "bg-white",
    textColor: "text-primary-200",
    padding: "px-4 py-3",
    border: "outline-1 outline-primary-100",
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
    "rounded-[2px] inline-flex justify-center items-center text-base",
    isDisabled ? "cursor-default" : "cursor-pointer",
  );

  return (
    <button className={clsx(baseStyle, className)} disabled={isDisabled} onClick={onClick}>
      {label}
    </button>
  );
}