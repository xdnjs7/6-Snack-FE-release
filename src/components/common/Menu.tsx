import React from "react";
import BudgetIconSvg from "../svg/BudgetIconSvg";
import UserIconSvg from "../svg/UserIconSvg";

type TMenuProps = {
  icon: "user" | "budget";
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function Menu({ icon, text, isActive = false, onClick }: TMenuProps) {
  const renderIcon = () => {
    switch (icon) {
      case "user":
        return <UserIconSvg isActive={isActive} />;
      case "budget":
        return <BudgetIconSvg isActive={isActive} />;
      default:
        return <UserIconSvg isActive={isActive} />;
    }
  };

  return (
    <div
      className={`w-[180px] h-[50px] px-4.5 py-2.5 inline-flex justify-start items-center gap-2 cursor-pointer ${
        isActive ? "bg-primary-50" : ""
      }`}
      onClick={onClick}
    >
      {renderIcon()}
      <div
        className={`justify-center text-base ${
          isActive ? "text-primary-950" : "text-primary-500"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
