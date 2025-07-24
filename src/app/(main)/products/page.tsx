"use client";

import CategoryNavigation from "@/components/common/ProductDetail/CategoryNavigation";
import SubCategoryItem from "@/components/common/SubCategoryItem";
import ProductGrid from "@/components/common/ProductGrid";
import { CATEGORIES } from "@/lib/utils/categories.util";
import { getProducts } from "@/lib/api/product.api";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";

type CategoryData = {
  parentCategory: Array<{ id: number; name: string }>;
  childrenCategory: Record<string, Array<{ id: number; name: string }>>;
};

// 스키마 변경시 타입도 변경예정, cumulativeQuantity field 추가예정
type Product = {
  id: number;
  categoryId: number;
  creatorId: string;
  name: string;
  price: number;
  imageUrl: string;
  linkUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category: {
    id: number;
    name: string;
    parentId: number;
  };
  creator: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};

export default function ProductsPage() {
  const [categories] = useState<CategoryData>(CATEGORIES);

  // 상태변수 관리할것 -  상품들, 로딩중, 커서(더보기 페이지네이션), 선택된 카테고리
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    parent: string;
    child: string;
  } | null>(null);
  const searchParams = useSearchParams();

  // useMediaQuery로 화면 크기별 limit 결정
  const isMobile = useMediaQuery({ maxWidth: 743 });
  const isTablet = useMediaQuery({ minWidth: 744, maxWidth: 1399 });
  const isDesktop = useMediaQuery({ minWidth: 1400 });

  // 카테고리 ID로 부모-자식 경로 찾기
  const findCategoryPath = (categoryId: number) => {
    for (const [parentName, children] of Object.entries(categories.childrenCategory)) {
      const child = children.find((c) => c.id === categoryId);
      if (child) {
        setSelectedCategory({
          parent: parentName,
          child: child.name,
        });
        return;
      }
    }
  };

  // URL 파라미터에서 카테고리 정보 가져오기
  useEffect(() => {
    const categoryId = searchParams.get("category");
    if (categoryId) {
      // 카테고리 ID로 부모-자식 카테고리 찾기
      const categoryIdNum = parseInt(categoryId);
      findCategoryPath(categoryIdNum);
    } else {
      setSelectedCategory(null);
    }
    // searchParams 변경될때 cursor 초기화 시켜야함
    // /products?sort=popular&categoryId=1&cursor=7
    setCursor(null);
  }, [searchParams]);

  // 상품 목록 가져오기 - 현재 화면사이즈에 따라 limit, category, cursor 적용, sort적용예정
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const categoryId = searchParams.get("category");
      // 화면 크기에 따라 limit (backend에서 take) 값 결정
      let limit = 0;
      if (isMobile) limit = 4;
      else if (isTablet) limit = 9;
      else if (isDesktop) limit = 6;

      const response = await getProducts({
        category: categoryId ? parseInt(categoryId) : undefined,
        limit,
        cursor: isLoadMore && cursor ? parseInt(cursor) : undefined,
      });
      console.log("API Response:", response);
      if (isLoadMore) {
        // 더보기 페이지네이션을 유저가 클릭한경우
        setProducts((prev) => [...prev, ...(response.items || [])]);
      } else {
        // 첫 로딩일때
        setProducts(response.items || []);
      }

      // 응답에 nextCursor 값 없으면 null로 초기화
      setCursor(response.nextCursor || null);
    } catch (error) {
      console.error("상품 로딩 실패:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // fetchProducts 함수를 호출하는 useEffect
  useEffect(() => {
    // 화면 크기가 변경되면 더보기 상태 초기화
    setIsLoadMore(false);
    fetchProducts();
  }, [searchParams, isMobile, isTablet, isDesktop]);

  return (
    <div className="flex">
      {/* 카테고리 태블릿,데스크탑 */}
      <div className="hidden sm:block">
        <SubCategoryItem categories={categories} />
      </div>

      {/* 모바일 하위 카테고리 - 선택된 카테고리가 있을 때만 표시 */}
      {selectedCategory && (
        <CategoryNavigation parentCategory={selectedCategory.parent} childCategory={selectedCategory.child} />
      )}

      {/* 상품 목록 */}
      <div className="container mx-auto py-6">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-primary-500">로딩 중...</div>
          </div>
        ) : (
          <>
            {/* 상품 그리드 */}
            <ProductGrid products={products} />
          </>
        )}
      </div>
    </div>
  );
}
