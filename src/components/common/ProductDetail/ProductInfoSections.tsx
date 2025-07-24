import React, { useState } from "react";
import InfoSection from "./InfoSection";
import type { Product } from "@/types/productDetail.types";

type TProps = {
  product: Product;
};

export default function ProductInfoSections({ product }: TProps) {
  const [isBenefitOpen, setIsBenefitOpen] = useState(false);
  const [isDeliveryMethodOpen, setIsDeliveryMethodOpen] = useState(false);
  const [isDeliveryFeeOpen, setIsDeliveryFeeOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <InfoSection title="구매혜택" isOpen={isBenefitOpen} onToggle={() => setIsBenefitOpen(!isBenefitOpen)}>
        5포인트 적립 예정
      </InfoSection>

      <InfoSection
        title="배송 방법"
        isOpen={isDeliveryMethodOpen}
        onToggle={() => setIsDeliveryMethodOpen(!isDeliveryMethodOpen)}
      >
        택배
      </InfoSection>

      <InfoSection title="배송비" isOpen={isDeliveryFeeOpen} onToggle={() => setIsDeliveryFeeOpen(!isDeliveryFeeOpen)}>
        3,000원 (50,000원 이상 무료배송) <span className="text-primary-400">도서산간 배송비 추가</span>
      </InfoSection>
    </div>
  );
}
