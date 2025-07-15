import React from "react";
import clsx from "clsx";
import { TButtonStyle, TButtonType } from "@/types/button.types";

type TButtonProps = {
  type: TButtonType;
  label?: string;
  textClassName?: string;
  onClick?: () => void;
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
  lightDisabled: {
    bg: "bg-primary-300",
    textColor: "text-primary-400",
    padding: "px-4 py-3",
  },
  whiteOutline: {
    bg: "bg-white",
    padding: "px-4 py-3",
    outline: "outline outline-primary-400",
  },
  light: {
    bg: "bg-primary-300",
    padding: "px-4 py-3",
    outline: "outline outline-primary-400",
  },
  whiteDisabled: {
    bg: "bg-white",
    textColor: "text-primary-400",
    padding: "px-4 py-3",
    outline: "outline  outline-primary-300",
  },
};

function Button({ type, label = "label", onClick, textClassName = "" }: TButtonProps) {
  const style = buttonStyleMap[type];

  if (!style) {
    console.warn(`Unknown button type: ${type}`);
    return null;
  }

  const disabledTypes: TButtonType[] = ["whiteDisabled", "lightDisabled"];
  const isDisabled = disabledTypes.includes(type);

  const buttonClass = clsx(
    style.bg,
    style.textColor,
    style.padding ?? "",
    style.outline,
    style.font,
    "rounded-sm inline-flex justify-center items-center",
    isDisabled ? "cursor-not-allowed" : "cursor-pointer"
  );

  return (
    <button className={buttonClass} disabled={isDisabled} onClick={onClick}>
      <span className={clsx(textClassName)}>{label}</span>
    </button>
  );
}

export default Button;
