"use client";

import { useParams } from "next/navigation";
import ProductDetail from "@/components/common/ProductDetail";
import SubCategoryMenu from "@/components/common/SubCategoryMenu";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.productId);

  // productId가 없거나 숫자가 아닐 경우 fallback
  if (!productId || isNaN(productId)) {
    return <div className="px-6 py-10">잘못된 접근입니다.</div>;
  }

  return (
    <div className="w-full flex gap-6 px-6 py-10">
      <div className="hidden sm:block">
        <SubCategoryMenu
          categories={[
            {
              id: 1,
              name: "스낵",
              children: [
                { id: 11, name: "과자", parentId: 1, href: "/products/snack/cookies" },
                { id: 12, name: "쿠키", parentId: 1, href: "/products/snack/cookies" },
                { id: 13, name: "파이", parentId: 1, href: "/products/snack/pie" },
              ],
            },
            {
              id: 2,
              name: "음료",
              children: [
                { id: 21, name: "청량/탄산음료", parentId: 2, href: "/products/beverage/soda" },
                { id: 22, name: "과즙음료", parentId: 2, href: "/products/beverage/juice" },
              ],
            },
          ]}
          currentPath="/preview"
          onItemClick={(item) => console.log("Clicked:", item)}
        />
      </div>

      {/* 상품 상세 */}
      <ProductDetail productId={productId} />
    </div>
  );
}
