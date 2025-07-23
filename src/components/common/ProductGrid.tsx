import React from "react";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";

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

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <div className="flex justify-center items-center py-16 text-primary-500">상품이 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:grid-rows-3 sm:gap-x-3.5 sm:gap-y-7.5 md:grid-cols-3 md:grid-rows-2 md:gap-x-10 md:gap-y-15">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col justify-start items-start gap-5">
          <div className="w-full h-[154.5px] px-[120px] py-[73px] round-xs relative bg-primary-50">
            <img src={img_coke_zero.src} alt={product.name} className="w-32 h-56 object-contain" />
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-start items-center gap-2">
              <div className="justify-start text-stone-900 text-lg font-normal font-['SUIT']">{product.name}</div>
              {/* 상품 팔린갯수 api 연동되면 가져와야함, 변경예정 */}
              <div className="justify-center text-blue-500 text-sm font-bold font-['SUIT']">29회 구매</div>
            </div>
            <div className="justify-start text-stone-900 text-lg font-extrabold font-['SUIT']">
              {product.price.toLocaleString("ko-KR")}원
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
