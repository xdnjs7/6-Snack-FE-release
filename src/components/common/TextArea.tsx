"use client";

import { useState, useEffect } from "react";
import { TTextAreaProps, TTextAreaVariant } from "@/types/textArea.types";
import { twMerge } from "tailwind-merge";

type TextAreaProps = TTextAreaProps & {
  variant?: TTextAreaVariant;
};

const TextArea = ({ placeholder, value, onChange, variant = "cart", className }: TextAreaProps) => {
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    setHasText((value ?? "").trim().length > 0);
  }, [value]);

  const sizeClasses = {
    cart: "w-[326px] h-[165px] sm:w-[696px] md:w-[1200px]",
    modal: "w-[327px] h-[140px] md:w-[480px]",
  };

  return (
    <textarea
      placeholder={placeholder || "메시지를 입력해주세요."}
      value={value}
      onChange={onChange}
      className={twMerge(
        sizeClasses[variant],
        hasText ? "border-primary-950" : "border-primary-200",
        "p-6 bg-white rounded-sm text-base text-primary-950 resize-none placeholder:text-primary-200 border outline-none",
        className,
      )}
    />
  );
};

export default TextArea;
