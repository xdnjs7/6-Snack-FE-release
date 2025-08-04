"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBudgets, patchBudgets } from "@/lib/api/budgets.api";
import BudgetFormUI from "./_components/BudgetFormUI";

const budgetSchema = z.object({
  currentMonthBudget: z.string().optional(),
  nextMonthBudget: z.string().optional(),
});

type BudgetInputs = z.infer<typeof budgetSchema>;

interface BudgetResponse {
  currentMonthBudget?: number;
  monthlyBudget?: number;
}

function ManageBudgetsPage() {
  const queryClient = useQueryClient();

  // 예산 데이터 패칭
  const { data, isLoading: isQueryLoading } = useQuery<BudgetResponse>({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  // 폼 세팅
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<BudgetInputs>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      currentMonthBudget: "",
      nextMonthBudget: "",
    },
  });

  // 쿼리 데이터로 폼 초기화
  useEffect(() => {
    if (data) {
      reset({
        currentMonthBudget: data.currentMonthBudget?.toString() ?? "",
        nextMonthBudget: data.monthlyBudget?.toString() ?? "",
      });
    }
  }, [data, reset]);

  // 예산 수정 뮤테이션
  const {
    mutate: updateBudgets,
    isPending: isMutating,
    isSuccess,
  } = useMutation({
    mutationFn: (formData: BudgetInputs) =>
      patchBudgets({
        currentMonthBudget: Number(formData.currentMonthBudget) || 0,
        monthlyBudget: Number(formData.nextMonthBudget) || 0,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  // BudgetFormUI에 맞는 핸들러
  const handleUIChange = (field: "currentMonthBudget" | "nextMonthBudget", value: string) => {
    setValue(field, value);
  };

  return (
    <main className="flex flex-1 flex-col justify-center" role="main" aria-labelledby="budget-management-heading">
      <header className="sr-only">
        <h1 id="budget-management-heading">예산 관리</h1>
      </header>
      <section aria-labelledby="budget-form-section" role="region">
        <h2 id="budget-form-section" className="sr-only">예산 설정 폼</h2>
        <BudgetFormUI
          currentMonthBudget={String((typeof watch === "function" ? watch("currentMonthBudget") : "") || "")}
          nextMonthBudget={String((typeof watch === "function" ? watch("nextMonthBudget") : "") || "")}
          onChange={handleUIChange}
          onSubmit={handleSubmit((formData) => updateBudgets(formData))}
          loading={isQueryLoading || isMutating}
          success={isSuccess}
          errors={{
            currentMonthBudget: errors.currentMonthBudget?.message,
            nextMonthBudget: errors.nextMonthBudget?.message,
          }}
        />
      </section>
    </main>
  );
}

export default ManageBudgetsPage;
