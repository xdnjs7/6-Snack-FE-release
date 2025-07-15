import React from "react";
import Mobile from "./Mobile";
import Tablet from "./Tablet";
import Desktop from "./Desktop";
import Image from "next/image";

import { useState } from "react";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import ic_like_normal from "@/assets/icons/ic_like_normal.svg";
import ic_menu from "@/assets/icons/ic_menu.svg";
import ArrowIcon from "../svg/ArrowIcon";
import QuantityDropdown from "./QuantityDropdown";

export default function ProductDetail() {
  const [selectedQuantity, setSelectedQuantity] = useState(16);
  return (
    <div>
      <Mobile>
        {/* 전체 wrapper */}
        <div className="w-full flex flex-col justify-center items-center px-6">
          {/* 카테고리 + 이미지 wrapper */}
          <div className="w-full flex flex-col justify-center items-start gap-7.5">
            {/* 카테고리 */}
            <div className="pt-3.5 pb-2.5 flex justify-start items-center gap-1">
              <p className="font-normal text-sm text-primary-300 tracking-tight">음료</p>
              <div>
                <ArrowIcon direction="right" className="w-3 h-3 text-primary-100" />
              </div>
              <p className="font-normal text-sm text-primary-950 tracking-tight">청량 ∙ 탄산 음료 </p>
            </div>
            {/* 이미지 */}
            {/* <div className="w-full flex justify-center">
              <div className="relative w-full max-w-[496px] aspect-square">
                <Image src={img_coke_zero} alt="코카콜라 제로" fill className="object-contain" />
              </div>
            </div> */}
          </div>

          {/* (상품 정보) (장바구니담기부터 아래 부분) wrapper  */}
          <div className="flex flex-col justify-center items-center w-full gap-8 pt-7.5">
            {/* 상품정보 wrapper */}
            <div className="self-stretch inline-flex justify-between items-start">
              {/* 타이틀, 구매횟수, 가격 */}
              <div className="inline-flex flex-col justify-start items-start gap-2">
                <div className="flex flex-col justify-center items-start gap-2">
                  <div className="text-black text-lg font-normal">코카콜라 제로</div>
                  <div className="text-secondary-500 text-sm font-bold">29회 구매</div>
                </div>
                <div className="text-black text-lg font-extrabold">2,000원</div>
              </div>

              {/* (상품수량, 드롭다운) 메뉴 */}
              <div className="flex items-start gap-3.5">
                <QuantityDropdown selectedQuantity={selectedQuantity} onQuantityChange={setSelectedQuantity} />
                {/* 메뉴 버튼 */}
                <div className="w-6 h-6 relative inline-flex flex-col justify-start items-start">
                  <Image src={ic_menu} alt="더보기 메뉴" fill className="object-contain" />
                </div>
              </div>
            </div>

            {/* (장바구니 담기 + 좋아요 버튼), 구매혜택, 배송방법, 배송비 wrapper*/}
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex gap-[14px] w-full">
                {/* 장바구니 */}
                <div className="h-16 w-full px-4 py-3 bg-primary-950 rounded-sm inline-flex justify-center items-center">
                  <div className="text-center justify-center text-primary-50 text-base font-bold">장바구니 담기</div>
                </div>
                {/* 좋아요버튼 */}
                <div className="h-16 w-16 px-4 py-3 bg-white rounded-sm border-1 border-gray-300 inline-flex justify-center items-center">
                  <div className="relative w-[25px] h-[22.5px]">
                    <Image src={ic_like_normal} alt="좋아요 버튼" fill className="object-contain" />
                  </div>
                </div>
              </div>
              {/* 구매혜택  + 토글 안했을때 */}
              <div className="self-stretch py-7 border-b border-neutral-200 inline-flex flex-col justify-center items-start gap-1.5">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-neutral-800 text-base font-bold font-['SUIT']">구매혜택</div>
                  {/* + Or - 버튼 */}

                  <p>5포인트 적립 예정</p>
                </div>
              </div>

              <div>
                <p></p>
              </div>

              <div className="border-t-primary-100">배송방법</div>
              <div className="border-t-primary-100">배송비</div>
            </div>
          </div>
        </div>
      </Mobile>
      // Tablet
      <Tablet>
        <div></div>
      </Tablet>
      // Desktop
      <Desktop>
        <div></div>
      </Desktop>
    </div>
  );
}
