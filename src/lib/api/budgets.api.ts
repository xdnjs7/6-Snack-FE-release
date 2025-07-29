import { cookieFetch } from "./fetchClient.api";

const companyId = 1; // TODO: 추후 동적으로 변경 예정

interface BudgetResponse {
  currentMonthBudget?: number;
  monthlyBudget?: number;
}

export const getBudgets = async (): Promise<BudgetResponse> => {
  return cookieFetch(`/admin/${companyId}/budgets`, {
    method: "GET",
  });
};

export const patchBudgets = async (data: { currentMonthBudget: number; monthlyBudget: number }) => {
  return cookieFetch(`/super-admin/${companyId}/budgets`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
