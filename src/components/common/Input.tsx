import React, { FC } from "react"; // useState는 더 이상 필요 없으므로 제거
import clsx from "clsx";

type TInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  label?: string; // 이제 항상 상단에 표시될 레이블
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  unit?: string; // e.g., "원"
  linkIcon?: boolean; // Show link icon
  onIconClick?: () => void; // Callback for icon click
  readOnly?: boolean;
};

const Input: FC<TInputProps> = ({
  label,
  value,
  onChange,
  errorMessage,
  unit,
  linkIcon = false,
  onIconClick,
  readOnly = false,
  className, // Allow external className to be passed
  ...rest
}) => {
  // isFocused, showFloatingLabel 로직 제거

  const hasError = !!errorMessage; // Convert errorMessage to boolean for conditional styling

  // Combine default and conditional classes for the input wrapper
  const wrapperClasses = clsx(
    "relative w-full", // flex items-center group 제거 (레이블이 상단에 별도로 위치)
    { "mb-6": !hasError, "mb-1": hasError }, // Adjust margin based on error message
  );

  // Classes for the actual input field
  const inputClasses = clsx(
    "block w-full px-3 py-2 border rounded-md shadow-sm",
    "focus:outline-none focus:ring-2", // Focus ring
    "text-primary-950 font-suit text-base", // Default text style
    "bg-transparent", // Make the input background transparent
    {
      "border-primary-300": !hasError, // Default border color
      "focus:border-secondary-500 focus:ring-secondary-500": !hasError && !readOnly, // Focus styles for non-error, non-readonly
      "border-error-500": hasError, // Error border color
      "focus:border-error-500 focus:ring-error-500": hasError, // Error focus styles
      "text-primary-600 cursor-not-allowed": readOnly, // Read-only text color
    },
    // Adjust padding based on presence of unit or icon
    {
      "pr-10": unit || linkIcon, // Add right padding if unit or icon exists
    },
    className, // Apply external className last
  );

  // Classes for the fixed top label
  const labelClasses = clsx(
    "block mb-1 text-primary-500 font-suit text-sm", // 항상 상단에 고정, 작은 폰트, 아래 여백
    {
      "text-error-500": hasError, // 에러 시 레이블 색상 변경
    },
  );

  // Classes for the unit or icon container
  const suffixClasses = clsx(
    "absolute right-3 top-1/2 -translate-y-1/2", // 입력 필드 내부 오른쪽 정렬 유지
    "text-primary-600 font-suit text-base",
    "bg-transparent", // Ensure suffix background is transparent
    {
      "cursor-pointer hover:text-primary-800": linkIcon && !readOnly, // Hover for clickable icons
    },
  );

  return (
    <div className={wrapperClasses}>
      {label && ( // 레이블이 있을 경우에만 렌더링
        <label
          htmlFor={rest.id} // Associate label with input by id
          className={labelClasses}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {" "}
        {/* input과 suffix를 감싸는 div 추가 */}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          // onFocus, onBlur 이벤트 핸들러 제거
          className={inputClasses}
          readOnly={readOnly}
          {...rest} // Pass through other input props like id, name, type, placeholder
          // placeholder는 이제 label과 분리되어 일반적인 placeholder 역할 수행
        />
        {(unit || linkIcon) && (
          <span className={suffixClasses} onClick={onIconClick}>
            {unit && unit}
            {linkIcon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-.758l-.293.293m3.182 3.182l-.293.293m3.536-3.536l-1.414-1.414m2.121-2.121l-1.414-1.414m-7.071 7.071l-1.414-1.414M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </span>
        )}
      </div>

      {hasError && <p className="absolute -bottom-5 left-0 text-error-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default Input;
