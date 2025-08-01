"use client";

import ProductGrid from "@/components/common/ProductGrid";
import { getFavorites } from "@/lib/api/favorite.api";
import { TGetFavoriteProductResponse } from "@/types/favorite.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function MyFavoritesPage() {
  const {
    data: products,
    isPending,
    error,
  } = useQuery<TGetFavoriteProductResponse, Error, TGetFavoriteProductResponse, [string]>({
    queryKey: ["favorite"],
    queryFn: () => getFavorites(),
  });

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (!products) {
    return (
      <div>
        <div>아직 상품을 찜하지 않았습니다.</div>
        <div>원하는 상품을 찜해보세요!</div>
      </div>
    );
  }

  if (error) {
    return <div>에러 발생 : {error.message}</div>;
  }

  return (
    <div>
      <p className="pt-[10px] pb-[20px] md:mt-[80px] font-bold text-[18px]/[22px] tracking-tight text-primary-950">
        나의 찜목록
      </p>
      <div className="mx-[-24px] outline-1 outline-[#e6e6e6] md:mx-0"></div>
      <div className="pt-[20px] sm:pt-[30px]">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
