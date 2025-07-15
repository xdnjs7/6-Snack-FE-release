import React, { useState } from "react";
import Image from "next/image";
import ArrowIcon from "@/components/svg/ArrowIcon";
import QuantityDropdown from "./QuantityDropdown";
import MenuDropdown from "./MenuDropdown";
import PlusToggleIconSvg from "@/components/svg/PlusToggleIconSvg";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import ic_like_normal from "@/assets/icons/ic_like_normal.svg";

export default function DesktopProductDetail() {
  const [selectedQuantity, setSelectedQuantity] = useState(16);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-12 py-8">
      <div className="grid grid-cols-2 gap-16">
        {/* 왼쪽: 이미지 영역 */}
        <div className="flex flex-col gap-6">
          {/* 카테고리 */}
          <div className="flex justify-start items-center gap-2">
            <p className="font-normal text-lg text-primary-300 tracking-tight">음료</p>
            <div>
              <ArrowIcon direction="right" className="w-5 h-5 text-primary-100" />
            </div>
            <p className="font-normal text-lg text-primary-950 tracking-tight">청량 ∙ 탄산 음료 </p>
          </div>

          {/* 이미지 */}
          <div className="relative w-full aspect-square">
            <Image src={img_coke_zero} alt="코카콜라 제로" fill className="object-contain" />
          </div>
        </div>

        {/* 오른쪽: 상품 정보 영역 */}
        <div className="flex flex-col gap-8">
          {/* 상품 기본 정보 */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-normal text-black">코카콜라 제로</h1>
              <div className="text-secondary-500 text-lg font-bold">29회 구매</div>
            </div>
            <div className="text-2xl font-extrabold text-black">2,000원</div>
          </div>

          {/* 수량 선택 및 메뉴 */}
          <div className="flex items-start gap-6">
            <QuantityDropdown selectedQuantity={selectedQuantity} onQuantityChange={setSelectedQuantity} />
            <MenuDropdown onEdit={() => console.log("상품 수정")} onDelete={() => console.log("상품 삭제")} />
          </div>

          {/* 장바구니 및 좋아요 버튼 */}
          <div className="flex gap-4">
            <div className="h-14 flex-1 px-8 py-4 bg-primary-950 rounded-sm inline-flex justify-center items-center">
              <div className="text-center justify-center text-primary-50 text-lg font-bold">장바구니 담기</div>
            </div>
            <div className="h-14 w-14 px-4 py-4 bg-white rounded-sm border border-gray-300 inline-flex justify-center items-center">
              <div className="relative w-[30px] h-[27px]">
                <Image src={ic_like_normal} alt="좋아요 버튼" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* 상품 상세 정보 */}
          <div className="flex flex-col gap-6">
            {/* 구매혜택 */}
            <div className="py-6 border-b border-primary-200">
              <div className="flex justify-between items-center mb-3">
                <div className="text-primary-950 text-xl font-bold">구매혜택</div>
                <PlusToggleIconSvg isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
              </div>
              {isOpen && <div className="text-primary-600 text-lg font-normal">5포인트 적립 예정</div>}
            </div>

            {/* 배송방법 */}
            <div className="py-6 border-b border-primary-200">
              <div className="flex justify-between items-center mb-3">
                <div className="text-primary-950 text-xl font-bold">배송 방법</div>
                <PlusToggleIconSvg isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
              </div>
              {isOpen && <div className="text-primary-600 text-lg font-normal">택배</div>}
            </div>

            {/* 배송비 */}
            <div className="py-6 border-b border-primary-200">
              <div className="flex justify-between items-center mb-3">
                <div className="text-primary-950 text-xl font-bold">배송비</div>
                <PlusToggleIconSvg isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
              </div>
              {isOpen && (
                <div className="space-y-2">
                  <div className="text-primary-600 text-lg font-normal">3,000원 (50,000원 이상 무료배송)</div>
                  <div className="text-primary-400 text-lg font-normal">도서산간 배송비 추가</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
