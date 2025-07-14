"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SubCategoryMenu from "../SubCategoryMenu";
import { TCategoryItem } from "../../../types/subCategoryMenu.types";

/**
 * SubCategoryMenu 컴포넌트 사용 예시
 * 
 * @description
 * 서브카테고리 메뉴 컴포넌트의 기본적인 사용법을 보여주는 예시입니다.
 * 실제 상품 카테고리 데이터를 기반으로 한 예시입니다.
 */
export default function SubCategoryMenuExamples() {
  const pathname = usePathname();

  // 예시 카테고리 데이터 (Prisma 스키마 기반)
  const categories: TCategoryItem[] = [
    {
      id: 1,
      name: "스낵",
      children: [
        { id: 11, name: "과자", parentId: 1, href: "/products/snack/cookies" },
        { id: 12, name: "쿠키", parentId: 1, href: "/products/snack/cookies" },
        { id: 13, name: "파이", parentId: 1, href: "/products/snack/pie" },
        { id: 14, name: "초콜릿류", parentId: 1, href: "/products/snack/chocolate" },
        { id: 15, name: "캔디류", parentId: 1, href: "/products/snack/candy" },
        { id: 16, name: "껌류", parentId: 1, href: "/products/snack/gum" },
        { id: 17, name: "비스켓류", parentId: 1, href: "/products/snack/biscuit" },
        { id: 18, name: "씨리얼바", parentId: 1, href: "/products/snack/cereal-bar" },
        { id: 19, name: "젤리류", parentId: 1, href: "/products/snack/jelly" },
        { id: 110, name: "견과류", parentId: 1, href: "/products/snack/nuts" },
        { id: 111, name: "워터젤리", parentId: 1, href: "/products/snack/water-jelly" }
      ]
    },
    {
      id: 2,
      name: "음료",
      children: [
        { id: 21, name: "청량/탄산음료", parentId: 2, href: "/products/beverage/soda" },
        { id: 22, name: "과즙음료", parentId: 2, href: "/products/beverage/juice" },
        { id: 23, name: "에너지음료", parentId: 2, href: "/products/beverage/energy" },
        { id: 24, name: "이온음료", parentId: 2, href: "/products/beverage/ion" },
        { id: 25, name: "건강음료", parentId: 2, href: "/products/beverage/probiotic" },
        { id: 26, name: "비품품", parentId: 2, href: "/products/beverage/health" },
      ]
    },
    {
      id: 3,
      name: "생수",
      children: [
        { id: 31, name: "생수", parentId: 3, href: "/products/water/pure" },
        { id: 32, name: "스파클링", parentId: 3, href: "/products/water/sparkling" }
      ]
    },
    {
      id: 4,
      name: "간편식",
      children: [
        { id: 41, name: "봉지라면", parentId: 4, href: "/products/instant/bag-noodles" },
        { id: 42, name: "과일", parentId: 4, href: "/products/instant/fruits" },
        { id: 43, name: "컵라면", parentId: 4, href: "/products/instant/cup-noodles" },
        { id: 44, name: "핫도그 및 소시지", parentId: 4, href: "/products/instant/hotdog" },
        { id: 45, name: "계란", parentId: 4, href: "/products/instant/eggs" },
        { id: 46, name: "죽/스프류", parentId: 4, href: "/products/instant/porridge" },
        { id: 47, name: "컵밥류", parentId: 4, href: "/products/instant/cup-rice" },
        { id: 48, name: "시리얼", parentId: 4, href: "/products/instant/cereal" },
        { id: 49, name: "반찬류", parentId: 4, href: "/products/instant/side-dishes" },
        { id: 410, name: "면류", parentId: 4, href: "/products/instant/noodles" },
        { id: 411, name: "요거트류", parentId: 4, href: "/products/instant/yogurt" },
        { id: 412, name: "가공안주류", parentId: 4, href: "/products/instant/processed-snacks" },
        { id: 413, name: "유제품", parentId: 4, href: "/products/instant/dairy" }
      ]
    },
    {
      id: 5,
      name: "신선식품",
      children: [
        { id: 51, name: "샐러드", parentId: 5, href: "/products/fresh/salad" },
        { id: 52, name: "빵", parentId: 5, href: "/products/fresh/bread" },
        { id: 53, name: "햄버거/샌드위치", parentId: 5, href: "/products/fresh/burger" },
        { id: 54, name: "주먹밥/김밥", parentId: 5, href: "/products/fresh/rice-balls" },
        { id: 55, name: "도시락", parentId: 5, href: "/products/fresh/lunch-box" }
      ]
    },
    {
      id: 6,
      name: "원두커피",
      children: [
        { id: 61, name: "드립커피", parentId: 6, href: "/products/coffee/drip" },
        { id: 62, name: "원두", parentId: 6, href: "/products/coffee/beans" },
        { id: 63, name: "캡슐커피", parentId: 6, href: "/products/coffee/capsule" }
      ]
    },
    {
      id: 7,
      name: "비품",
      children: [
        { id: 71, name: "커피/차류", parentId: 7, href: "/products/supplies/coffee-tea" },
        { id: 72, name: "생활용품", parentId: 7, href: "/products/supplies/daily" },
        { id: 73, name: "일회용품", parentId: 7, href: "/products/supplies/disposable" },
        { id: 74, name: "사무용품", parentId: 7, href: "/products/supplies/office" },
        { id: 75, name: "카페용품", parentId: 7, href: "/products/supplies/cafe" },
        { id: 76, name: "일회용품(친환경)", parentId: 7, href: "/products/supplies/eco-friendly" }
      ]
    }
  ];

  const handleItemClick = (item: TCategoryItem) => {
    if (item.href) {
      console.log(`페이지 이동: ${item.href}`);
    }
  };



  return (
    <div className="p-6">
      {/* SubCategoryMenu 예시 */}
      <div className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">서브카테고리 메뉴</h3>
        </div>
        <p className="text-gray-600 mb-4">
          서브카테고리 메뉴입니다. 상품 리스트 페이지에 적합합니다.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">특징:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 사이드바 형태로 고정</li>
            <li>• 현재 페이지 하이라이트</li>
            <li>• 스크롤 가능한 메뉴</li>
            <li>• 상품 리스트 페이지에 적합</li>
            <li>• 다단계 카테고리 구조 지원</li>
          </ul>
        </div>
      </div>

      {/* 실제 사용 예시 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">실제 사용 예시</h3>
        <p className="text-gray-600 mb-4">
          실제 상품 리스트 페이지에서 SubCategoryMenu를 사용하는 예시입니다.
        </p>
        
        <div className="flex h-[48rem] border border-gray-200 rounded-lg overflow-hidden">
          {/* SubCategoryMenu */}
          <SubCategoryMenu
            categories={categories}
            currentPath={pathname}
            onItemClick={handleItemClick}
          />
        </div>
      </div>
    </div>
  );
} 