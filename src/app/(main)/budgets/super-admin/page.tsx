import React from "react";
import BudgetForm from "./_components/BudgetForm";

export const metadata = {
  title: "Snack - 예산 관리",
  description: "Snack 서비스의 예산 관리 페이지입니다.",
};

const BudgetManagementPage = () => {
  return (
    <div>
      <BudgetForm />
    </div>
  );
};

export default BudgetManagementPage;
