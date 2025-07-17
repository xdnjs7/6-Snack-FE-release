import React, { useState } from "react";
import CategoryNavigation from "./ProductDetail/CategoryNavigation";
import ProductImage from "./ProductDetail/ProductImage";
import ProductBasicInfo from "./ProductDetail/ProductBasicInfo";
import ProductActions from "./ProductDetail/ProductActions";
import CartAndLikeButtons from "./ProductDetail/CartAndLikeButtons";
import ProductInfoSections from "./ProductDetail/ProductInfoSections";

export default function ProductDetail() {
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  return (
    <div className="w-full flex flex-col justify-center items-center px-6 sm:px-0 sm:max-w-[1180px]">
      {/* 카테고리 + 이미지 wrapper */}
      <div className="w-full flex flex-col justify-center items-start gap-7.5">
        <CategoryNavigation />

        {/* 이미지 & 상품정보 wrapper - 데스크톱에서는 가로 배치 */}
        <div className="w-full flex flex-col md:flex-row md:gap-10">
          <ProductImage />

          {/* (상품 정보) (장바구니담기부터 아래 부분) wrapper  */}
          <div className="flex flex-col justify-center md:justify-start items-center w-full gap-8 sm:gap-10 md:gap-7.5 pt-7.5 sm:pt-8 md:pt-8">
            {/* 상품정보 wrapper */}
            <div className="self-stretch inline-flex justify-between items-start">
              <ProductBasicInfo />
              <ProductActions selectedQuantity={selectedQuantity} onQuantityChange={setSelectedQuantity} />
            </div>

            {/* (장바구니 담기 + 좋아요 버튼), 구매혜택, 배송방법, 배송비 wrapper*/}
            <div className="flex flex-col justify-center items-center w-full">
              <CartAndLikeButtons />
              <ProductInfoSections />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
