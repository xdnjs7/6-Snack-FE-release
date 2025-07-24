import React from "react";
import Image from "next/image";
import Button from "../../ui/Button";
import ic_like_normal from "@/assets/icons/ic_like_normal.svg";

type Props = {
  productId: number;
  selectedQuantity: number;
  onAddToCart: () => void;
};

export default function CartAndLikeButtons({ onAddToCart }: Props) {
  return (
    <div className="flex gap-4 w-full">
      <Button type="primary" label="장바구니 담기" className="w-full h-16 font-bold" onClick={onAddToCart} />
      {/* 좋아요 버튼은 이후 추가 */}
      <div className="w-16 h-16 border rounded flex items-center justify-center">
        <Image src={ic_like_normal} alt="좋아요" width={24} height={24} />
      </div>
    </div>
  );
}
