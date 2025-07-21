import Image from "next/image";
import React, { Fragment, MouseEvent, useState } from "react";
import ic_chevron_down_gray from "@/assets/icons/ic_chevron_down_gray.svg";
import clsx from "clsx";

const parentCategory = ["스낵", "음료", "생수", "간편식", "신선식"] as const;

const childrenCategory = {
  스낵: ["과자", "쿠키", "파이", "초콜릿류", "캔디류", "껌류"],
  음료: ["청량/탄산음료", "과즙음료", "에너지음료", "이온음료", "유산균음료", "건강음료"],
  생수: ["생수", "스파클링"],
  간편식: ["봉지라면", "과일", "컵라면", "핫도그 및 소시지", "계란", "죽/스프류"],
  신선식: ["샐러드", "빵", "햄버거/샌드위치", "주먹밥/김밥", "도시락"],
};

export default function SubCategoryItem() {
  const [isActiveParentCategory, setIsActiveParentCategory] = useState<string>("");
  const [isActiveChildrenCategory, setIsActiveChildrenCategory] = useState<string>("");

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, category: string): void => {
    const id = e.currentTarget.id;

    if (id === "parent") {
      setIsActiveParentCategory((prev) => (prev === category ? "" : category));
      setIsActiveChildrenCategory("");
    }

    if (id === "children") {
      setIsActiveChildrenCategory(category);
    }
  };

  return (
    <>
      <div className="w-[180px] h-[42px] py-[10px] px-[14px] mb-[10px] font-bold text-[18px]/[22px] tracking-tight text-primary-950">
        카테고리
      </div>
      <div className="flex flex-col justify-start w-[180px] gap-[4px]">
        {parentCategory.map((parent, id) => (
          <Fragment key={`${parent}_${id}`}>
            <button
              id="parent"
              onClick={(e) => handleClick(e, parent)}
              className={clsx(
                isActiveParentCategory === parent && "border-t-2 border-primary-950",
                "group/parent hover:bg-primary-50/50 transition-colors duration-200 flex justify-between items-center w-[180px] h-[50px] p-[14px] cursor-pointer",
              )}
            >
              <p
                className={clsx(
                  isActiveParentCategory === parent ? "font-bold" : "font-normal",
                  "group-hover/parent:font-bold transition-all text-[16px]/[20px] tracking-tight text-primary-950",
                )}
              >
                {parent}
              </p>
              <div className="relative w-[16px] h-[16px]">
                <Image
                  src={ic_chevron_down_gray}
                  alt="드롭다운"
                  fill
                  className={clsx(
                    isActiveParentCategory === parent && "rotate-180",
                    "object-cover transition-transform duration-250",
                  )}
                />
              </div>
            </button>
            {isActiveParentCategory === parent &&
              childrenCategory[parent].map((children, id) => {
                return (
                  <button
                    id="children"
                    key={`${children}_${id}`}
                    onClick={(e) => handleClick(e, children)}
                    className="group/children hover:bg-primary-50/60 transition-all duration-200 flex justify-between items-center w-[180px] h-[50px] py-[10px] px-[30px] cursor-pointer"
                  >
                    <p
                      className={clsx(
                        isActiveChildrenCategory === children
                          ? "font-bold text-primary-950"
                          : "font-normal text-primary-500",
                        "group-hover/children:text-primary-950 transition-all text-[16px]/[20px] tracking-tight",
                      )}
                    >
                      {children}
                    </p>
                  </button>
                );
              })}
          </Fragment>
        ))}
      </div>
    </>
  );
}
