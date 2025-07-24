import React from "react";
import Image from "next/image";

type Props = {
  imageUrl: string;
};

export default function ProductImage({ imageUrl }: Props) {
  return (
    <div className="self-center relative w-full max-w-[328px] sm:max-w-[496px] md:max-w-[540px] aspect-square">
      <Image src={imageUrl} alt="상품 이미지" fill className="object-contain" />
    </div>
  );
}
