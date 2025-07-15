import React, { useState } from "react";
import Image from "next/image";
import ArrowIcon from "@/components/svg/ArrowIcon";
import QuantityDropdown from "./QuantityDropdown";
import MenuDropdown from "./MenuDropdown";
import PlusToggleIconSvg from "@/components/svg/PlusToggleIconSvg";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import ic_like_normal from "@/assets/icons/ic_like_normal.svg";

export default function TabletProductDetail() {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [isBenefitOpen, setIsBenefitOpen] = useState(false);
  const [isDeliveryMethodOpen, setIsDeliveryMethodOpen] = useState(false);
  const [isDeliveryFeeOpen, setIsDeliveryFeeOpen] = useState(false);

  return (
    <div className="max-w-[1180px] w-full flex flex-col justify-center items-center">
      {/* 카테고리 + 이미지 wrapper */}
      <div className="w-full flex flex-col justify-center items-start gap-7.5">
        {/* 카테고리 wrapper*/}
        <div className="flex h-16 w-full border-b border-primary-100">
          {/* 카테고리 컨텐트 */}
          <div className="flex items-center pb-5 gap-1.5">
            <p className="font-normal text-base/[20px] text-primary-200 tracking-tight">음료</p>
            <div>
              <ArrowIcon direction="right" className="w-4 h-4 text-primary-100" />
            </div>
            <p className="font-normal text-base/[20px] text-primary-950 tracking-tight">청량 ∙ 탄산 음료 </p>
          </div>
        </div>
        <div className="relative self-center w-full max-w-[496px] aspect-square">
          <Image src={img_coke_zero} alt="코카콜라 제로" fill className="object-contain" />
        </div>
      </div>

      {/* (상품 정보) (장바구니담기부터 아래 부분) wrapper  */}
      <div className="flex flex-col justify-center items-center w-full gap-10 pt-8">
        {/* 상품정보 wrapper */}
        <div className="self-stretch inline-flex justify-between items-start">
          {/* 타이틀, 구매횟수, 가격 */}
          <div className="inline-flex flex-col justify-start items-start gap-2">
            <div className="flex justify-center items-start gap-2">
              <div className="text-black text-lg/[22px] font-normal tracking-tight">코카콜라 제로</div>
              <div className="text-secondary-500 text-sm/[17px] font-bold tracking-tight">29회 구매</div>
            </div>
            <div className="text-black text-lg/[22px] font-extrabold tracking-tight">2,000원</div>
          </div>

          {/* (상품수량, 드롭다운) (메뉴) */}
          <div className="flex items-start gap-5">
            <QuantityDropdown selectedQuantity={selectedQuantity} onQuantityChange={setSelectedQuantity} />
            <MenuDropdown onEdit={() => console.log("상품 수정")} onDelete={() => console.log("상품 삭제")} />
          </div>
        </div>

        {/* (장바구니 담기 + 좋아요 버튼), 구매혜택, 배송방법, 배송비 wrapper*/}
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex gap-4 w-full">
            {/* 장바구니 */}
            <div className="h-18 w-full px-6 py-4 bg-primary-950 rounded-sm inline-flex justify-center items-center">
              <div className="text-center justify-center text-primary-50 text-lg font-bold">장바구니 담기</div>
            </div>
            {/* 좋아요버튼 */}
            <div className="h-18 w-18 px-4 py-4 bg-white rounded-sm border-1 border-gray-300 inline-flex justify-center items-center">
              <div className="relative w-[28px] h-[25px]">
                <Image src={ic_like_normal} alt="좋아요 버튼" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* 구매혜택 */}
          <div className="self-stretch py-10 border-b border-primary-200 inline-flex flex-col justify-center items-start gap-2">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="text-primary-950 text-lg/[22px] font-bold tracking-tight">구매혜택</div>
              <PlusToggleIconSvg isOpen={isBenefitOpen} onClick={() => setIsBenefitOpen(!isBenefitOpen)} />
            </div>
            {isBenefitOpen && <div className="text-primary-600 text-base/[22px] tracking-tight">5포인트 적립 예정</div>}
          </div>

          {/* 배송방법 */}
          <div className="self-stretch py-10 border-b border-primary-200 inline-flex flex-col justify-center items-start gap-2">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="text-primary-950 text-lg/[22px] font-bold tracking-tight">배송 방법</div>
              <PlusToggleIconSvg
                isOpen={isDeliveryMethodOpen}
                onClick={() => setIsDeliveryMethodOpen(!isDeliveryMethodOpen)}
              />
            </div>
            {isDeliveryMethodOpen && <div className="text-primary-600 text-base/[22px] tracking-tight">택배</div>}
          </div>

          {/* 배송비 */}
          <div className="self-stretch py-10 border-b border-primary-200 inline-flex flex-col justify-center items-start gap-2">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="text-primary-950 text-lg/[22px] font-bold tracking-tight">배송비</div>
              <PlusToggleIconSvg isOpen={isDeliveryFeeOpen} onClick={() => setIsDeliveryFeeOpen(!isDeliveryFeeOpen)} />
            </div>
            {isDeliveryFeeOpen && (
              <div className="text-primary-600 text-base/[20px] tracking-tight">
                3,000원 (50,000원 이상 무료배송) <span className="text-primary-400">도서산간 배송비 추가</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
