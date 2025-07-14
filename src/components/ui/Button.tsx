import { TButtonProps, TButtonStyle, TButtonType } from "@/types/button.types";
import React from "react";
import clsx from "clsx";

const buttonStyleMap: Record<TButtonType, TButtonStyle> = {
  primary: {
    bg: "bg-primary-900",
    textColor: "text-white",
    padding: "px-4 py-3",
    size: "w-20 h-auto sm:w-full sm:h-16",
  },
  dark: {
    bg: "bg-black",
    textColor: "text-white",
    padding: "px-4 py-3",
    size: "w-20 h-auto sm:w-full sm:h-16",
  },
  gray: {
    bg: "bg-primary-300",
    textColor: "text-primary-400",
    padding: "px-4 py-3",
    size: "w-20 h-auto sm:w-full sm:h-16",
  },

  secondary: {
    bg: "bg-white",
    padding: "px-4 py-3",
    size: "w-20 h-auto sm:w-full sm:h-16",
    outline: "outline outline-1 outline-offset-[-1px] outline-primary-400",
  },
  "light-outline": {
    bg: "bg-primary-300",
    padding: "px-4 py-3",
    size: "w-20 h-auto sm:w-full sm:h-16",
    outline: "outline outline-1 outline-offset-[-1px] outline-primary-400",
  },
  disabled: {
    bg: "bg-white",
    textColor: "text-primary-400",
    padding: "p-4",
    size: "w-20 h-auto sm:w-full sm:h-16",
    outline: "outline outline-1 outline-offset-[-1px] outline-primary-300",
  },
};

export default function Button({ type, label = "label", onClick }: TButtonProps) {
  const style = buttonStyleMap[type];

  if (!style) {
    console.warn(`Unknown button type: ${type}`);
    return null;
  }

  const buttonClass = clsx(
    style.size ?? "",
    style.bg,
    style.textColor,
    style.padding ?? "",
    style.outline,
    style.font,

    "rounded-sm inline-flex justify-center items-center",
  );

  return (
    <button className={buttonClass} disabled={type === "disabled"} onClick={onClick}>
      <span className="text-center text-base font-suit">{label}</span>
    </button>
  );
}
