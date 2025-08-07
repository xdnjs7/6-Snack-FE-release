"use client";

import React, { useState } from "react";
import clsx from "clsx";
import VisibilityOffIconSvg from "@/components/svg/VisibilityOffIconSvg";
import VisibilityOnIconSvg from "@/components/svg/VisibilityOnIconSvg";
import { TInputProps } from "@/types/input.types";

export default function Input({
  label,
  error,
  type = "text",
  showPasswordToggle = false,
  containerClassName,
  className,
  value,
  placeholder,
  isCompanyName = false,
  isBizNumber = false,
  ...props
}: TInputProps & { inputRef?: React.Ref<HTMLInputElement>; ref?: React.Ref<HTMLInputElement> }) {
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
    let newValue = e.target.value;

    // 회사명 입력 제한: 한글(가-힣, ㄱ-ㅎ, ㅏ-ㅣ), 영문, 숫자, (, ), ., ,, -, _만 허용, 20글자 제한
    if (isCompanyName) {
      newValue = newValue.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9().,_\-]/g, "").slice(0, 20);
      e.target.value = newValue;
    }

    // 사업자번호 입력 제한: 숫자만 허용, 10자리까지만 입력
    if (isBizNumber) {
      newValue = newValue.replace(/\D/g, "").slice(0, 10);
      e.target.value = newValue;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      props.onChange?.(e);
      return;
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    // react-hook-form의 onChange가 제대로 호출되도록
    props.onChange?.(e);
  };

  // 패스워드 타입일 때 실제 input type 결정
  const actualType = type === "password" && showPasswordToggle ? (isPasswordVisible ? "text" : "password") : type;

  return (
    <div className={clsx("flex flex-col w-full gap-[4px]", containerClassName)}>
      <div
        className={clsx(
          error ? "border-error-500" : "border-primary-600",
          hasValue ? "justify-end" : "justify-center",
          type === "password" && showPasswordToggle ? "justify-between" : "",
          "relative flex flex-col h-[56px] py-[8px] px-[4px] gap-[5px] border-b-1",
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
        <div
          className={clsx(
            type === "password" && showPasswordToggle
              ? "flex justify-between  gap-[4px]"
              : "flex flex-col justify-center",
            hasValue && type === "password" && showPasswordToggle
              ? "items-end"
              : type === "password" && showPasswordToggle
                ? "items-center"
                : "",
          )}
        >
          {/* Input */}
          <input
            {...props}
            ref={(props.inputRef as React.Ref<HTMLInputElement>) ?? props.ref ?? undefined}
            type={actualType}
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={clsx(
              actualType === "password" && !isPasswordVisible ? "tracking-[0.25em]" : "tracking-tight",
              "z-10 w-full font-normal text-[16px]/[20px] outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500",
              props.readOnly ? "text-primary-400" : "text-primary-950",
              className,
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
      {error && <p className="font-normal text-[12px]/[15px] tracking-tight text-error-500">{error}</p>}
    </div>
  );
}
