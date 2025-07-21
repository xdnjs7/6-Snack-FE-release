"use client";

import Desktop from "@/components/common/Desktop";
import Menu from "@/components/common/Menu";
import Mobile from "@/components/common/Mobile";
import TabMenu from "@/components/common/TabMenu";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

export default function ManagePageLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <div className="block md:hidden">
        <div className="flex items-center justify-center">
          <TabMenu
            isUserTabActive={pathname === "/manage/users"}
            onUserTabClick={() => handleMenuClick("/manage/users")}
            onBudgetTabClick={() => handleMenuClick("/manage/budgets")}
          />
        </div>
      </div>
      <Desktop>
        <div className="flex flex-col gap-1">
          <Menu
            icon="user"
            text="회원 관리"
            isActive={pathname === "/manage/users"}
            onClick={() => handleMenuClick("/manage/users")}
          />
          <Menu
            icon="budget"
            text="예산 관리"
            isActive={pathname === "/manage/budgets"}
            onClick={() => handleMenuClick("/manage/budgets")}
          />
        </div>
      </Desktop>
      <div>{children}</div>
    </div>
  );
}
