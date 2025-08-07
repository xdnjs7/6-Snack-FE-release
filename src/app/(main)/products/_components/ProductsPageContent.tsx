"use client";

import CategoryNavigation from "@/components/common/ProductDetail/CategoryNavigation";
import SubCategoryItem from "@/components/common/SubCategoryItem";
import ProductGrid from "@/components/common/ProductGrid";
import { CATEGORIES } from "@/lib/constants/categories";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { useModal } from "@/providers/ModalProvider";
import ProductRegistrationForm from "@/components/common/ProductRegistrationForm";
import { useProducts } from "@/hooks/useProductsInfinite";
import PlusToggleIconSvg from "@/components/svg/PlusToggleIconSvg";
import Dropdown from "@/components/common/DropDown";
import { useCategoryStore } from "@/stores/categoryStore";
import { useDeviceType } from "@/hooks/useDeviceType";
import SubCategoryTabs from "./SubCategoryTabs";
import DogSpinner from "@/components/common/DogSpinner";

type TCategoryData = {
  parentCategory: Array<{ id: number; name: string }>;
  childrenCategory: Record<string, Array<{ id: number; name: string }>>;
};

type TSortOptions = "latest" | "popular" | "low" | "high";

export default function ProductsPageContent() {
  const [categories] = useState<TCategoryData>(CATEGORIES);
  const [selectedSort, setSelectedSort] = useState<TSortOptions>("latest");
  // 전역 카테고리 상태 Zustand 사용
  const { selectedCategory, clearSelectedCategory, findCategoryPath } = useCategoryStore();

  // 정렬 옵션 매핑
  const sortOptions = [
    { label: "최신순", value: "latest" as const },
    { label: "판매순", value: "popular" as const },
    { label: "낮은 가격순", value: "low" as const },
    { label: "높은 가격순", value: "high" as const },
  ];

  const searchParams = useSearchParams();
  const { openModal, closeModal } = useModal();

  const { isMobile, isTablet, isDesktop } = useDeviceType();

  // 디바이스별 보여줄 상품갯수 계산
  const getLimit = () => {
    if (isMobile) return 4;
    if (isTablet) return 9;
    if (isDesktop) return 6;
    return 6;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } = useProducts({
    category: searchParams.get("category") ? parseInt(searchParams.get("category")!) : undefined,
    sort: selectedSort,
    limit: getLimit(),
  });

  const allProducts = data?.pages.flatMap((page) => page.items) ?? [];

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleSortChange = (selectedValue: string) => {
    const sortValueMap: Record<string, TSortOptions> = {
      최신순: "latest",
      판매순: "popular",
      "낮은 가격순": "low",
      "높은 가격순": "high",
    };

    const sortValue = sortValueMap[selectedValue];
    if (sortValue) {
      setSelectedSort(sortValue);
      // 정렬 변경 시 쿼리를 리셋하여 첫 페이지부터 다시 로드
      refetch();
    }
  };

  // 상품 등록 모달 열기
  const handleProductRegistration = () => {
    openModal(<ProductRegistrationForm onClose={closeModal} />);
  };

  // URL 파라미터에서 카테고리 정보 가져와서 전역 상태에 저장
  useEffect(() => {
    const categoryId = searchParams.get("category");
    if (categoryId) {
      findCategoryPath(parseInt(categoryId));
    } else {
      clearSelectedCategory();
    }
  }, [searchParams, findCategoryPath, clearSelectedCategory]);

  return (
    <main
      className="w-full flex items-start justify-center sm:gap-5 md:gap-10 md:mt-[80px]"
      role="main"
      aria-label="상품 목록 페이지"
    >
      {/* 카테고리 태블릿,데스크탑 */}
      <aside className="hidden sm:block" role="complementary" aria-label="카테고리 네비게이션">
        <SubCategoryItem categories={categories} />
      </aside>

      <div className="flex flex-col sm:h-16 w-full sm:border-b sm:border-primary-100">
        {/* TODO: 모바일 전용 하위 카테고리 TabMenu - 선택된 카테고리가 있을 때만 표시 */}
        <SubCategoryTabs />

        <div className="flex flex-col sm:flex-row sm:justify-between">
          {/* 모바일, 태블릿, 데스크탑에서 전부 보이는 상위/하위 카테고리 바 */}
          <nav role="navigation" aria-label="카테고리 탐색">
            <CategoryNavigation parentCategory={selectedCategory?.parent} childCategory={selectedCategory?.child} />
          </nav>

          {/* 정렬, 상품등록 버튼 wrapper */}
          <div
            className="flex items-center w-full justify-between sm:justify-end sm:gap-[30px] pb-5 border-b border-primary-100 sm:border-0"
            role="toolbar"
            aria-label="상품 정렬 및 등록 도구"
          >
            <Dropdown
              options={sortOptions.map((option) => option.label)}
              onChange={handleSortChange}
              aria-label="상품 정렬 옵션"
            />
            <Button
              type="black"
              label={
                <div className="flex gap-[6px]">
                  <PlusToggleIconSvg className="w-4 h-4 text-white" aria-hidden="true" />
                  <p className="text-primary-50 text-sm/[17px] font-semibold">상품 등록</p>
                </div>
              }
              onClick={handleProductRegistration}
              className="h-[44px] py-[10px] rounded"
              aria-label="새 상품 등록하기"
            />
          </div>
        </div>

        {/* 상품 목록 */}
        <section className="container mx-auto pt-[20px] sm:pt-[30px]" aria-labelledby="products-section-title">
          <h2 id="products-section-title" className="sr-only">
            {selectedCategory?.child || selectedCategory?.parent || "전체"} 상품 목록
          </h2>

          {isLoading ? (
            // 위치 개선필요
            <div className="flex justify-center items-center">
              <DogSpinner />
            </div>
          ) : (
            <>
              {/* 상품 그리드 */}
              <ProductGrid
                products={allProducts}
                currentCategoryId={selectedCategory?.id}
                aria-label={`${allProducts.length}개의 상품이 있습니다`}
              />

              {hasNextPage && (
                <div className="flex justify-center mt-8">
                  <Button
                    type="white"
                    label={
                      <div className="flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0">
                        <p>더보기</p>
                        <ArrowIconSvg direction="down" className="w-5 h-5 text-black" aria-hidden="true" />
                      </div>
                    }
                    onClick={handleLoadMore}
                    className="w-full h-[44px] sm:h-[64px] px-6 py-4 text-sm/[17px] font-medium tracking-tight"
                    disabled={isFetchingNextPage}
                    aria-label={isFetchingNextPage ? "더 많은 상품을 불러오는 중입니다" : "더 많은 상품 보기"}
                  />
                </div>
              )}
            </>
          )}

          {isError && (
            <div className="flex justify-center items-center py-16" role="alert" aria-live="assertive">
              <div className="text-error-500">에러가 발생했습니다: {error.message}</div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
