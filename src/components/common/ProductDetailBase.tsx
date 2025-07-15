import React, { useState } from "react";
import Image from "next/image";
import ArrowIcon from "@/components/svg/ArrowIcon";
import QuantityDropdown from "./QuantityDropdown";
import MenuDropdown from "./MenuDropdown";
import PlusToggleIconSvg from "@/components/svg/PlusToggleIconSvg";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import ic_like_normal from "@/assets/icons/ic_like_normal.svg";

type TProductDetailBaseProps = {
  variant: "mobile" | "tablet";
  className?: string;
};

export default function ProductDetailBase({ variant, className = "" }: TProductDetailBaseProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(16);
  const [isBenefitOpen, setIsBenefitOpen] = useState(false);
  const [isDeliveryMethodOpen, setIsDeliveryMethodOpen] = useState(false);
  const [isDeliveryFeeOpen, setIsDeliveryFeeOpen] = useState(false);

  // variant에 따른 스타일 설정
  const isMobile = variant === "mobile";

  const styles = {
    container: isMobile ? "px-6" : "px-8",
    gap: isMobile ? "gap-7.5" : "gap-8",
    pt: isMobile ? "pt-3.5 pb-2.5" : "pt-4 pb-3",
    arrowGap: isMobile ? "gap-1" : "gap-1.5",
    arrowSize: isMobile ? "w-3 h-3" : "w-4 h-4",
    textSize: isMobile ? "text-sm" : "text-base",
    maxWidth: isMobile ? "max-w-[496px]" : "max-w-[600px]",
    contentGap: isMobile ? "gap-8 pt-7.5" : "gap-10 pt-8",
    infoGap: isMobile ? "gap-2" : "gap-3",
    titleSize: isMobile ? "text-lg" : "text-xl",
    purchaseSize: isMobile ? "text-sm" : "text-base",
    priceSize: isMobile ? "text-lg" : "text-xl",
    buttonGap: isMobile ? "gap-3.5" : "gap-4",
    cartGap: isMobile ? "gap-[14px]" : "gap-4",
    cartHeight: isMobile ? "h-16" : "h-18",
    cartPadding: isMobile ? "px-4 py-3" : "px-6 py-4",
    cartText: isMobile ? "text-base" : "text-lg",
    likeSize: isMobile ? "w-16 h-16" : "w-18 h-18",
    likePadding: isMobile ? "px-4 py-3" : "px-4 py-4",
    likeIcon: isMobile ? "w-[25px] h-[22.5px]" : "w-[28px] h-[25px]",
    sectionPadding: isMobile ? "py-7" : "py-8",
    sectionGap: isMobile ? "gap-1.5" : "gap-2",
    sectionTitle: isMobile ? "text-base" : "text-lg",
    sectionContent: isMobile ? "text-sm" : "text-base",
  };

  return (
    <div className={`w-full flex flex-col justify-center items-center ${styles.container} ${className}`}>
      {/* 카테고리 + 이미지 wrapper */}
      <div className={`w-full flex flex-col justify-center items-start ${styles.gap}`}>
        {/* 카테고리 */}
        <div className={`${styles.pt} flex justify-start items-center ${styles.arrowGap}`}>
          <p className={`font-normal ${styles.textSize} text-primary-300 tracking-tight`}>음료</p>
          <div>
            <ArrowIcon direction="right" className={`${styles.arrowSize} text-primary-100`} />
          </div>
          <p className={`font-normal ${styles.textSize} text-primary-950 tracking-tight`}>청량 ∙ 탄산 음료 </p>
        </div>
        <div className="w-full flex justify-center">
          <div className={`relative w-full ${styles.maxWidth} aspect-square`}>
            <Image src={img_coke_zero} alt="코카콜라 제로" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* (상품 정보) (장바구니담기부터 아래 부분) wrapper  */}
      <div className={`flex flex-col justify-center items-center w-full ${styles.contentGap}`}>
        {/* 상품정보 wrapper */}
        <div className="self-stretch inline-flex justify-between items-start">
          {/* 타이틀, 구매횟수, 가격 */}
          <div className={`inline-flex flex-col justify-start items-start ${styles.infoGap}`}>
            <div className={`flex justify-center items-start ${styles.infoGap}`}>
              <div className={`text-black ${styles.titleSize} font-normal`}>코카콜라 제로</div>
              <div className={`text-secondary-500 ${styles.purchaseSize} font-bold`}>29회 구매</div>
            </div>
            <div className={`text-black ${styles.priceSize} font-extrabold`}>2,000원</div>
          </div>

          {/* (상품수량, 드롭다운) (메뉴) */}
          <div className={`flex items-start ${styles.buttonGap}`}>
            <QuantityDropdown selectedQuantity={selectedQuantity} onQuantityChange={setSelectedQuantity} />
            <MenuDropdown onEdit={() => console.log("상품 수정")} onDelete={() => console.log("상품 삭제")} />
          </div>
        </div>

        {/* (장바구니 담기 + 좋아요 버튼), 구매혜택, 배송방법, 배송비 wrapper*/}
        <div className="flex flex-col justify-center items-center w-full">
          <div className={`flex ${styles.cartGap} w-full`}>
            {/* 장바구니 */}
            <div
              className={`${styles.cartHeight} w-full ${styles.cartPadding} bg-primary-950 rounded-sm inline-flex justify-center items-center`}
            >
              <div className={`text-center justify-center text-primary-50 ${styles.cartText} font-bold`}>
                장바구니 담기
              </div>
            </div>
            {/* 좋아요버튼 */}
            <div
              className={`${styles.likeSize} ${styles.likePadding} bg-white rounded-sm border-1 border-gray-300 inline-flex justify-center items-center`}
            >
              <div className={`relative ${styles.likeIcon}`}>
                <Image src={ic_like_normal} alt="좋아요 버튼" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* 구매혜택 */}
          <div
            className={`self-stretch ${styles.sectionPadding} border-b border-primary-200 inline-flex flex-col justify-center items-start ${styles.sectionGap}`}
          >
            <div className="self-stretch inline-flex justify-between items-center">
              <div className={`text-primary-950 ${styles.sectionTitle} font-bold`}>구매혜택</div>
              <PlusToggleIconSvg isOpen={isBenefitOpen} onClick={() => setIsBenefitOpen(!isBenefitOpen)} />
            </div>
            {isBenefitOpen && (
              <div className={`text-primary-600 ${styles.sectionContent} font-normal tracking-tight`}>
                5포인트 적립 예정
              </div>
            )}
          </div>

          {/* 배송방법 */}
          <div
            className={`self-stretch ${styles.sectionPadding} border-b border-primary-200 inline-flex flex-col justify-center items-start ${styles.sectionGap}`}
          >
            <div className="self-stretch inline-flex justify-between items-center">
              <div className={`text-primary-950 ${styles.sectionTitle} font-bold`}>배송 방법</div>
              <PlusToggleIconSvg
                isOpen={isDeliveryMethodOpen}
                onClick={() => setIsDeliveryMethodOpen(!isDeliveryMethodOpen)}
              />
            </div>
            {isDeliveryMethodOpen && (
              <div className={`text-primary-600 ${styles.sectionContent} font-normal tracking-tight`}>택배</div>
            )}
          </div>

          {/* 배송비 */}
          <div
            className={`self-stretch ${styles.sectionPadding} border-b border-primary-200 inline-flex flex-col justify-center items-start ${styles.sectionGap}`}
          >
            <div className="self-stretch inline-flex justify-between items-center">
              <div className={`text-primary-950 ${styles.sectionTitle} font-bold`}>배송비</div>
              <PlusToggleIconSvg isOpen={isDeliveryFeeOpen} onClick={() => setIsDeliveryFeeOpen(!isDeliveryFeeOpen)} />
            </div>
            {isDeliveryFeeOpen && (
              <div className={`text-primary-600 ${styles.sectionContent} font-normal tracking-tight`}>
                3,000원 (50,000원 이상 무료배송)
              </div>
            )}
            {isDeliveryFeeOpen && (
              <div className={`text-primary-400 ${styles.sectionContent} font-normal tracking-tight`}>
                도서산간 배송비 추가
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
