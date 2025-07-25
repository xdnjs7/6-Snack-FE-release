import React from "react";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";

type TCategoryNavigationProps = {
  parentCategory?: string;
  childCategory?: string;
};

export default function CategoryNavigation({ parentCategory, childCategory }: TCategoryNavigationProps) {
  // 카테고리가 선택되지 않았으면 렌더링하지 않음
  if (!parentCategory || !childCategory) {
    return null;
  }

  return (
    <div className="pt-3.5 pb-2.5 sm:pt-0 sm:pb-5 flex justify-start items-center gap-1 sm:gap-1.5 sm:h-16 sm:w-full sm:border-b sm:border-primary-100">
      <p className="font-normal text-sm/[17px] sm:text-base/[20px] text-primary-200 tracking-tight">{parentCategory}</p>
      <div>
        <ArrowIconSvg direction="right" className="w-3 h-3 sm:w-4 sm:h-4 text-primary-100" />
      </div>
      <p className="font-normal text-sm/[17px] sm:text-base/[20px] text-primary-950 tracking-tight">{childCategory}</p>
    </div>
  );
}
