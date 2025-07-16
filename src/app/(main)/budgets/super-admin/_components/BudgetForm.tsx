"use client"; // This directive MUST be at the very top of this file

import React, { useState, FormEvent, ChangeEvent } from "react";
import clsx from "clsx";

// Budget data type definition
interface BudgetData {
  monthlyBudget: number | "";
  expectedMinistry: number | "";
}

const BudgetForm = () => {
  // State to manage form input values
  const [budgetData, setBudgetData] = useState<BudgetData>({
    monthlyBudget: "",
    expectedMinistry: "",
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow only numbers or empty string
    const numericValue = value === "" ? "" : Number(value);

    setBudgetData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    console.log("Budget form submitted:", budgetData);

    // Basic validation
    if (budgetData.monthlyBudget === "" || budgetData.expectedMinistry === "") {
      alert("모든 예산 정보를 입력해주세요."); // Use custom modal in real app
      return;
    }

    // Here, you would typically send data to an API
    // For example:
    // fetch('/api/update-budget', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(budgetData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   alert('예산 정보가 성공적으로 수정되었습니다!'); // Use custom modal
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   alert('예산 정보 수정 중 오류가 발생했습니다.'); // Use custom modal
    // });
  };

  return (
    <div
      className={clsx(
        "flex-1", // Take remaining width in PC/Tablet layout
        "p-4", // Default mobile padding
        "sm:p-6", // Tablet padding
        "md:p-8", // PC padding
        "bg-[--color-white]", // Background color from global.css
        "rounded-lg", // Rounded corners
        "shadow-sm", // Subtle shadow
        "flex flex-col",
        "items-center", // Center content horizontally
        "md:items-start", // Align to start on PC
      )}
    >
      <h2
        className={clsx(
          "text-2xl", // Title font size
          "font-bold",
          "text-[--color-primary-950]",
          "mb-2",
          "text-center", // Center on mobile
          "md:text-left", // Align left on PC
        )}
      >
        예산 관리
      </h2>
      <p
        className={clsx(
          "text-sm",
          "text-[--color-primary-700]",
          "mb-8",
          "text-center", // Center on mobile
          "md:text-left", // Align left on PC
        )}
      >
        담당자별 예산 현황을 쉽게 관리할 수 있습니다.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {/* Monthly Budget Input */}
        <div className={clsx("mb-6", "flex flex-col", "md:flex-row", "md:items-center")}>
          <label
            htmlFor="monthlyBudget"
            className={clsx("text-lg", "font-semibold", "text-[--color-primary-900]", "mb-2", "md:mb-0", "md:w-1/3")}
          >
            이번 달
          </label>
          <div className={clsx("flex-1", "flex", "items-center", "border-b", "border-[--color-primary-300]", "pb-1")}>
            <input
              type="number" // Use number type for budget
              id="monthlyBudget"
              name="monthlyBudget"
              placeholder="예산을 입력해주세요"
              value={budgetData.monthlyBudget}
              onChange={handleChange}
              className={clsx(
                "flex-1",
                "bg-transparent", // Transparent background
                "outline-none",
                "text-lg",
                "text-[--color-primary-950]",
                "placeholder-[--color-primary-500]",
              )}
            />
            <span className="text-lg font-semibold text-[--color-primary-950] ml-2">원</span>
          </div>
          <p className="text-xs text-[--color-primary-500] mt-1 md:ml-auto md:w-1/3 md:text-right">0원</p>{" "}
          {/* Placeholder for current value */}
        </div>

        {/* Expected Ministry Input */}
        <div className={clsx("mb-8", "flex flex-col", "md:flex-row", "md:items-center")}>
          <label
            htmlFor="expectedMinistry"
            className={clsx("text-lg", "font-semibold", "text-[--color-primary-900]", "mb-2", "md:mb-0", "md:w-1/3")}
          >
            매달 시작
          </label>
          <div className={clsx("flex-1", "flex", "items-center", "border-b", "border-[--color-primary-300]", "pb-1")}>
            <input
              type="number" // Use number type
              id="expectedMinistry"
              name="expectedMinistry"
              placeholder="예산을 입력해주세요"
              value={budgetData.expectedMinistry}
              onChange={handleChange}
              className={clsx(
                "flex-1",
                "bg-transparent",
                "outline-none",
                "text-lg",
                "text-[--color-primary-950]",
                "placeholder-[--color-primary-500]",
              )}
            />
            <span className="text-lg font-semibold text-[--color-primary-950] ml-2">원</span>
          </div>
          <p className="text-xs text-[--color-primary-500] mt-1 md:ml-auto md:w-1/3 md:text-right">0원</p>{" "}
          {/* Placeholder for current value */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={clsx(
            "w-full",
            "py-3",
            "bg-[--color-primary-950]", // Dark button background
            "text-[--color-white]", // White text
            "font-semibold",
            "rounded-md",
            "hover:bg-[--color-primary-800]", // Slightly lighter on hover
            "transition-colors",
            "duration-200",
            "mt-4", // Space above button
          )}
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;
