"use client";

import Desktop from "@/components/common/Desktop";
import ProductDetail from "@/components/common/DesktopProductDetail";
import SubCategoryMenu from "@/components/common/SubCategoryMenu";

export default function ProductDetailPage() {
  return (
    <div className="max-w-screen-xl mx-auto flex gap-6 px-4 py-10">
      {/* 사이드 카테고리 메뉴 */}
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

      {/* 상품 상세 */}
      <ProductDetail />
    </div>
  );
}
