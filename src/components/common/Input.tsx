"use client";

import React, { useState, forwardRef } from "react";
import clsx from "clsx";
import VisibilityOffIconSvg from "@/components/svg/VisibilityOffIconSvg";
import VisibilityOnIconSvg from "@/components/svg/VisibilityOnIconSvg";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  showPasswordToggle?: boolean;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type = "text",
      showPasswordToggle = false,
      containerClassName,
      className,
      value,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [internalValue, setInternalValue] = useState<string>("");

    // value가 제어되는지 확인
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;
    const hasValue = Boolean(inputValue);

    const handlePasswordToggle = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      props.onChange?.(e);
    };

    // 패스워드 타입일 때 실제 input type 결정
    const actualType = type === "password" && showPasswordToggle ?
      (isPasswordVisible ? "text" : "password") : type;

    return (
      <div className={clsx("flex flex-col w-full max-w-[480px] gap-[4px]", containerClassName)}>
        <div
          className={clsx(
            error ? "border-error-500" : "border-primary-600",
            hasValue ? "justify-end" : "justify-center",
            type === "password" && showPasswordToggle ? "justify-between" : "",
            "relative flex flex-col h-[56px] py-[8px] pr-[24px] px-[4px] gap-[5px] border-b-1",
          )}
        >
          {/* Label */}
          {label && (
            <label
              htmlFor={props.id}
              className={clsx(
                hasValue ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                "absolute left-[4px] top-[8px] font-normal text-[12px]/[15px] tracking-tight text-primary-600 transition-all duration-300",
              )}
            >
              {label}
            </label>
          )}

          {/* Input Field Container */}
          <div className={clsx(
            type === "password" && showPasswordToggle ? "flex justify-between items-end gap-[4px]" : "flex flex-col justify-center",
            hasValue && type === "password" && showPasswordToggle ? "items-end" : type === "password" && showPasswordToggle ? "items-center" : ""
          )}>
            {/* Input */}
            <input
              {...props}
              ref={ref}
              type={actualType}
              value={inputValue}
              onChange={handleChange}
              placeholder={placeholder}
              className={clsx(
                actualType === "password" && !isPasswordVisible ? "tracking-[0.25em]" : "tracking-tight",
                "z-10 w-full font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500",
                className
              )}
            />

            {/* Password Toggle */}
            {type === "password" && showPasswordToggle && (
              <div
                onClick={handlePasswordToggle}
                className={clsx(
                  hasValue ? "opacity-100" : "opacity-0",
                  "mt-[24px] cursor-pointer transition-all duration-300 flex-shrink-0",
                )}
              >
                {isPasswordVisible ? <VisibilityOnIconSvg /> : <VisibilityOffIconSvg />}
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="font-normal text-[12px]/[15px] tracking-tight text-error-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;