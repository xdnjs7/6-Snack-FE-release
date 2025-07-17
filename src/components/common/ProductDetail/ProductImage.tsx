import React from "react";
import Image from "next/image";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";

export default function ProductImage() {
  return (
    <div className="self-center relative w-full max-w-[328px] sm:max-w-[496px] md:max-w-[540px] aspect-square">
      <Image src={img_coke_zero} alt="코카콜라 제로" fill className="object-contain" />
    </div>
  );
}
