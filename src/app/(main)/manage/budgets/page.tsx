"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBudgets, patchBudgets } from "@/lib/api/budgets.api";
import BudgetFormUI from "./_components/BudgetFormUI";

const budgetSchema = z.object({
  currentMonthBudget: z.string().optional(),
  nextMonthBudget: z.string().optional(),
});

type BudgetInputs = z.infer<typeof budgetSchema>;

const ManageBudgetsPage: React.FC = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
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
      } catch {
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
    } catch {
      // 에러 처리 필요시 추가
    } finally {
      setLoading(false);
    }
  };

  // BudgetFormUI에 맞는 핸들러 및 상태 변환
  const handleUIChange = (field: "currentMonthBudget" | "nextMonthBudget", value: string) => {
    setValue(field, value);
  };

  return (
    <BudgetFormUI
      currentMonthBudget={String((typeof watch === "function" ? watch("currentMonthBudget") : "") || "")}
      nextMonthBudget={String((typeof watch === "function" ? watch("nextMonthBudget") : "") || "")}
      onChange={handleUIChange}
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      success={success}
      errors={{
        currentMonthBudget: errors.currentMonthBudget?.message,
        nextMonthBudget: errors.nextMonthBudget?.message,
      }}
    />
  );
};

export default ManageBudgetsPage;
