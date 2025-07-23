"use client";

import CategoryNavigation from "@/components/common/ProductDetail/CategoryNavigation";
import SubCategoryItem from "@/components/common/SubCategoryItem";
import ProductGrid from "@/components/common/ProductGrid";
import { CATEGORIES } from "@/lib/utils/categories.util";
import { getProducts } from "@/lib/api/product.api";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type CategoryData = {
  parentCategory: Array<{ id: number; name: string }>;
  childrenCategory: Record<string, Array<{ id: number; name: string }>>;
};

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    parent: string;
    child: string;
  } | null>(null);
  const searchParams = useSearchParams();

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
  }, [searchParams, categories]);

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

  // 상품 목록 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryId = searchParams.get("category");
        const response = await getProducts({
          category: categoryId ? parseInt(categoryId) : undefined,
          limit: 20,
        });
        setProducts(response.items || []);
      } catch (error) {
        console.error("상품 로딩 실패:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div className="">
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
