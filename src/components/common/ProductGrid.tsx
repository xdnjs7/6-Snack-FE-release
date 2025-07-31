"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/formatPrice.util";

type TProduct = {
  id: number;
  categoryId: number;
  creatorId: string;
  name: string;
  price: number;
  imageUrl: string;
  linkUrl: string;
  cumulativeSales: number;
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

type ProductGridProps = {
  products: TProduct[];
  currentCategoryId?: number; // 현재 선택된 카테고리 ID 추가
};

export default function ProductGrid({ products, currentCategoryId }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <div className="flex justify-center items-center py-16 text-primary-500">상품이 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-3.5 sm:gap-y-7.5 md:grid-cols-3 md:gap-x-10 md:gap-y-15 justify-items-center pb-[30px] sm:pb-[40px]">
      {products.map((product) => {
        // 상품 상세 페이지 URL 생성 (카테고리 파라미터 포함)
        // 현재 선택된 카테고리가 있으면 그것을 사용, 없으면 상품의 카테고리 ID 사용
        const categoryId = currentCategoryId || product.categoryId;
        const productDetailUrl = `/products/${product.id}?category=${categoryId}`;

        return (
          <Link
            key={product.id}
            href={productDetailUrl}
            className="flex flex-col justify-start items-center gap-[14px] md:gap-[20px] hover:opacity-80 transition-opacity w-full"
          >
            <div className="w-full flex justify-center items-center aspect-square min-w-[154.5px] min-h-[154.5px] max-h-[366.67px] max-w-[366.67px] round-xs bg-primary-50 overflow-hidden">
              <div className="relative w-[70%] h-[70%] md:w-[75%] md:h-[75%] min-w-[53.8px] min-h-[93.39px] ">
                <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div className="flex justify-center items-center md:gap-2 ">
                <div className=" text-stone-900 text-lg/[22px] font-normal">{product.name}</div>
                <div className=" text-blue-500 text-sm/[17px] font-bold hidden md:block">
                  {product.cumulativeSales}회 구매
                </div>
              </div>
              <div className="justify-start text-stone-900 text-lg/[22px]  font-extrabold">
                {formatPrice(product.price)}원
              </div>
              <div className="justify-center text-blue-500 text-sm/[17px] font-bold md:hidden">
                {product.cumulativeSales}회 구매
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
