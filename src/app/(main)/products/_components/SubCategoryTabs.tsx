import { useCategoryStore } from "@/stores/categoryStore";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

export default function SubCategoryTabs() {
  // 우선 categoryStore로 children category 정보가져오기
  const { childrenCategories, selectedChild } = useCategoryStore();
  const router = useRouter();

  // children category 없는 현재 parent category이면 여기 아래아이템 모두 primary-400 으로 보여야함,
  return (
    <div className="max-w-full border-b border-primary-100 inline-flex justify-start items-center gap-2 sm:hidden category-tabs-scroll -mx-6 px-6">
      {childrenCategories.map((child) => (
        <button
          key={child.id}
          className="h-12 px-2 py-3.5 flex justify-center items-center gap-2.5 category-tab-btn"
          onClick={() => router.push(`/products?category=${child.id}`)}
        >
          <div
            className={clsx(
              selectedChild?.id === child.id ? "text-primary-950 font-bold" : "font-normal text-primary-400",
              "justify-center text-sm/[17px] tracking-tight",
            )}
          >
            {child.name}
          </div>
        </button>
      ))}
    </div>
  );
}
