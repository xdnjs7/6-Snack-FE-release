// components/ui/Input.tsx
import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hasValue: boolean;
  errorMessage?: string;
  isPassword?: boolean;
  onToggleVisibility?: () => void;
  VisibilityOnIcon?: React.ElementType;
  VisibilityOffIcon?: React.ElementType;
};

export default function Input({
  label,
  hasValue,
  errorMessage,
  isPassword = false,
  onToggleVisibility,
  VisibilityOnIcon,
  VisibilityOffIcon,
  ...rest
}: InputProps) {
  const isError = !!errorMessage;

  return (
    <div className="flex flex-col w-full max-w-[480px] gap-[4px]">
      <div
        className={clsx(
          isError ? "border-error-500" : "border-primary-600",
          hasValue && isPassword ? "items-end" : "justify-center",
          "relative flex",
          isPassword ? "justify-between" : "flex-col",
          "h-[56px] py-[8px] px-[4px] border-b-1",
        )}
      >
        <div
          className={clsx("flex flex-col justify-center w-full", {
            "gap-[5px]": isPassword,
          })}
        >
          <label
            htmlFor={rest.id}
            className={clsx(
              hasValue ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              "absolute left-[4px] top-[8px] font-normal text-[12px]/[15px] tracking-tight text-primary-600 transition-all duration-300",
            )}
          >
            {label}
          </label>

          <input
            {...rest}
            className={clsx(
              isPassword && !hasValue ? "tracking-tight" : rest.className,
              "w-full font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500",
              { "tracking-[0.25em]": isPassword && !hasValue },
            )}
          />
        </div>

        {isPassword && onToggleVisibility && (
          <div
            onClick={onToggleVisibility}
            className={clsx(
              hasValue ? "opacity-100" : "opacity-0",
              "mt-[24px] cursor-pointer transition-all duration-300",
            )}
          >
            {rest.type === "password"
              ? VisibilityOffIcon && <VisibilityOffIcon />
              : VisibilityOnIcon && <VisibilityOnIcon />}
          </div>
        )}
      </div>
      {/* Integrated Error Message */}
      {isError && <p className="font-normal text-[14px]/[17.5px] tracking-tight text-error-500">{errorMessage}</p>}
    </div>
  );
}
