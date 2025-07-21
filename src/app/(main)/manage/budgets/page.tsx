"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { getBudgets, patchBudgets } from "@/lib/api/budgets.api";

const budgetSchema = z.object({
  currentMonthBudget: z.string().optional(),
  nextMonthBudget: z.string().optional(),
});

type BudgetInputs = z.infer<typeof budgetSchema>;

type BudgetManagementProps = {
  className?: string;
};

const ManageBudgetsPage: React.FC<BudgetManagementProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BudgetInputs>({
    resolver: zodResolver(budgetSchema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true);
      try {
        const data = await getBudgets();
        setValue("currentMonthBudget", data.currentMonthBudget?.toString() ?? "");
        setValue("nextMonthBudget", data.monthlyBudget?.toString() ?? "");
      } catch (e) {
        // 에러 처리 필요시 추가
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, [setValue]);

  const onSubmit = async (formData: BudgetInputs) => {
    setLoading(true);
    setSuccess(false);
    try {
      await patchBudgets({
        currentMonthBudget: Number(formData.currentMonthBudget) || 0,
        monthlyBudget: Number(formData.nextMonthBudget) || 0,
      });
      setSuccess(true);
    } catch (e) {
      // 에러 처리 필요시 추가
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={twMerge(clsx("bg-color-white p-6 rounded-md shadow-md", className))}>
      <h2 className="text-xl font-semibold text-color-primary-900 mb-2">예산 관리</h2>
      <p className="text-sm text-color-primary-700 mb-4">이번 달 예산을 정해서 지출을 관리해보세요.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="currentMonthBudget" className="block text-color-primary-700 text-sm font-bold mb-1">
            이번 달
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              id="currentMonthBudget"
              className="w-full pr-10 border-color-primary-300 text-color-primary-900 focus:ring-color-secondary-500 focus:border-color-secondary-500 block sm:text-sm rounded-md"
              placeholder="예산을 입력해주세요"
              {...register("currentMonthBudget")}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-color-primary-700">
              원
            </div>
          </div>
          {errors.currentMonthBudget && (
            <p className="mt-1 text-xs text-color-error-500">{errors.currentMonthBudget.message}</p>
          )}
          <p className="text-sm text-color-primary-500 mt-1">0원</p>
        </div>

        <div>
          <label htmlFor="nextMonthBudget" className="block text-color-primary-700 text-sm font-bold mb-1">
            다음 달 시작
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              id="nextMonthBudget"
              className="w-full pr-10 border-color-primary-300 text-color-primary-900 focus:ring-color-secondary-500 focus:border-color-secondary-500 block sm:text-sm rounded-md"
              placeholder="예산을 입력해주세요"
              {...register("nextMonthBudget")}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-color-primary-700">
              원
            </div>
          </div>
          {errors.nextMonthBudget && (
            <p className="mt-1 text-xs text-color-error-500">{errors.nextMonthBudget.message}</p>
          )}
          <p className="text-sm text-color-primary-500 mt-1">0원</p>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-color-primary-900 text-color-white font-semibold rounded-md py-2 hover:bg-color-primary-800 focus:outline-none focus:ring-2 focus:ring-color-secondary-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "저장 중..." : "수정하기"}
          </button>
          {success && <p className="text-green-600 mt-2">예산이 성공적으로 수정되었습니다.</p>}
        </div>
      </form>
    </div>
  );
};

export default ManageBudgetsPage;
