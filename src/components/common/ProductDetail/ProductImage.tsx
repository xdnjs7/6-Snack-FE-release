import React from "react";
import Image from "next/image";

type TProductImageProps = {
  imageUrl: string;
};

export default function ProductImage({ imageUrl }: TProductImageProps) {
  return (
    <div className="self-center relative w-full max-w-[328px] sm:max-w-[496px] md:max-w-[540px] aspect-square">
      <Image src={imageUrl} alt="상품 이미지" fill className="object-contain" />
    </div>
  );
}
