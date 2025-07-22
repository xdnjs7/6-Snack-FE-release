"use client";

import { products } from "@/app/(preview)/components-preview/PreviewMockData";
import Desktop from "@/components/common/Desktop";
import Dropdown from "@/components/common/DropDown";
import Pagination from "@/components/common/Pagination";
import ProductList from "@/components/common/ProductList";
import React, { useState } from "react";

/**
 * @De-cal TODO:
 * 1. 총 등록한 상품 {}개 정해주기 - props
 * 2. 상품 정렬 기능 만들기 - API 확인 후 query로 붙여주면 될 것 같음.
 */

export default function MyProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = () => {
    return;
  };

  return (
    <div className="md:px-[24px]">
      <div className="flex justify-between items-center pb-[20px] md:mt-[80px] md:pb-[40px]">
        <p className="font-bold text-[18px]/[22px] tracking-tight text-primary-950">상품 등록 내역</p>
        <Dropdown value="정렬" onChange={handleSort} />
      </div>
      <div className="mx-[-24px] outline-1 outline-[#e6e6e6] md:hidden"></div>
      <Desktop>
        <div className="flex justify-center w-full">
          <div className="flex justify-start items-center w-full h-[60px] px-[40px] py-[20px] gap-[80px] border-y-[1px] border-[#e6e6e6]">
            <p className="ml-[60px] w-[260px] font-bold text-[16px]/[20px] tracking-tight text-primary-500">상품명 </p>
            <p className="w-[180px] font-bold text-[16px]/[20px] tracking-tight text-primary-500">등록일</p>
            <p className="w-[180px] font-bold text-[16px]/[20px] tracking-tight text-primary-500">카테고리</p>
            <p className="w-[160px] font-bold text-[16px]/[20px] tracking-tight text-primary-500">가격</p>
            <p className="w-[160px] font-bold text-[16px]/[20px] tracking-tight text-primary-500">제품 링크</p>
          </div>
        </div>
      </Desktop>
      <div className="flex flex-col gap-[10px] my-[20px] sm:mb-[30px] md:mt-0">
        <p className="font-bold text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px] md:hidden">
          총 등록한 상품 {15}개
        </p>
        <ProductList products={products} />
      </div>
      <Pagination currentPage={currentPage} totalPages={4} onPageChange={setCurrentPage} />
    </div>
  );
}
