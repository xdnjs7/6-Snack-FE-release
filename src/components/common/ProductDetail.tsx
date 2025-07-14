import React from "react";
import Mobile from "./Mobile";
import Tablet from "./Tablet";
import Desktop from "./Desktop";
import Image from "next/image";
import ChevronIcon from "@/svg/ChevronIcon";
import { useState } from "react";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import ic_like_normal from "@/assets/icons/ic_like_normal.svg";

export default function ProductDetail() {
  const [showQuantityDropdown, setShowQuantityDropdown] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(16);

  // 0-100까지의 숫자 배열 생성
  const quantityOptions = Array.from({ length: 101 }, (_, i) => i);
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
                <ChevronIcon direction="right" color="var(--color-primary-100)"></ChevronIcon>
              </div>
              <p className="font-normal text-sm text-primary-950 tracking-tight">청량 ∙ 탄산 음료 </p>
            </div>
            {/* 이미지 */}
            <div className="w-full flex justify-center">
              <div className="relative w-full max-w-[496px] aspect-square">
                <Image src={img_coke_zero} alt="코카콜라 제로" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* (상품 정보) (장바구니담기부터 아래 부분) wrapper  */}
          <div className="flex flex-col justify-center items-center w-full gap-8 pt-7.5">
            {/* 상품정보 -  */}
            <div className="self-stretch inline-flex justify-between items-start">
              <div className="inline-flex flex-col justify-start items-start gap-2">
                <div className="flex flex-col justify-center items-start gap-2">
                  <div className="text-black text-lg font-normal">코카콜라 제로</div>
                  <div className="text-secondary-500 text-sm font-bold">29회 구매</div>
                </div>
                <div className="text-black text-lg font-extrabold">2,000원</div>
              </div>

              {/* 상품수량, 드롭다운, 메뉴 */}
              <div className="flex items-start gap-3.5">
                <div className="flex justify-center items-center gap-3.5">
                  <div className=" text-primary-950 text-base font-normal">수량</div>
                  <div className="relative flex justify-start items-center w-25 p-3.5 bg-white rounded-sm border border-primary-300">
                    <div className="flex-1 self-stretch flex justify-end items-center gap-1 ">
                      <div className="justify-center text-neutral-800 text-base font-normal">{selectedQuantity}</div>
                      <ChevronIcon
                        direction="down"
                        color="var(--color-primary-950)"
                        className="w-6 h-6"
                        onClick={() => setShowQuantityDropdown(!showQuantityDropdown)}
                      />

                      {/* 드롭다운 */}
                      {showQuantityDropdown && (
                        <div className="absolute top-full right-0 mt-1 bg-white border border-primary-200 rounded-md shadow-lg z-10 w-25">
                          <div
                            className="overflow-y-auto py-2"
                            style={{
                              maxHeight: "128px",
                              scrollbarWidth: "thin",
                              scrollbarColor: "#d1d5db #f3f4f6",
                            }}
                          >
                            {quantityOptions.map((quantity) => (
                              <div
                                key={quantity}
                                className="px-3 py-1 hover:bg-primary-50 cursor-pointer text-center"
                                onClick={() => {
                                  setSelectedQuantity(quantity);
                                  setShowQuantityDropdown(false);
                                }}
                              >
                                {quantity}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <div className="w-[3px] h-4 left-[10.50px] top-[3.50px] absolute inline-flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch h-[3px] relative bg-neutral-800" />
                    <div className="self-stretch h-[3px] relative bg-neutral-800" />
                    <div className="self-stretch h-[3px] relative bg-neutral-800" />
                  </div>
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
                <div className="h-16 px-4 py-3 bg-white rounded-sm border-1 border-gray-300 inline-flex justify-center items-center">
                  <div className="relative w-4 h-4">
                    <Image src={ic_like_normal} alt="좋아요 버튼" fill className="object-contain" />
                  </div>
                </div>
              </div>
              <div>구매혜택</div>
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
