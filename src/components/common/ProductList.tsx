import Image from "next/image";
import React from "react";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import Desktop from "./Desktop";

export default function ProductList() {
  return (
    <>
      <div className="border-b-[1px] border-primary-100 md:hidden">
        <div className="flex flex-col gap-[10px] w-[327px] h-[120px] mt-[20px] mb-[30px] sm:mt-[30px]">
          <p className="font-extrabold text-[16px]/[20px]">2024. 07. 04</p>
          <div className="flex gap-[20px]">
            <div className="flex justify-center items-center w-[90px] h-[90px] p-[24px] rounded-[2px] bg-primary-50">
              <div className="relative w-[29px] h-[50px]">
                <Image src={img_coke_zero} alt="상품" fill className="object-contain" />
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[6px] sm:gap-[4px]">
                <p className="font-normal text-[12px]/[15px] text-primary-500">청량 • 탄산음료</p>
                <p className="font-normal text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px]">
                  코카콜라 제로
                </p>
                <p className="font-extrabold text-[14px]/[17px] tracking-tight text-primary-950">2,000원</p>
              </div>
              <p className="font-normal text-[14px]/[17px] tracking-tight text-primary-600">www.codeit.kr</p>
            </div>
          </div>
        </div>
      </div>
      <Desktop>
        <div className="flex justify-center w-full">
          <div className="flex justify-start items-center w-full h-[100px] px-[40px] gap-[80px] border-b-[1px] border-[#e6e6e6]">
            <div className="flex justify-start items-center w-[320px] h-[40px] gap-[20px]">
              <div className="flex justify-center items-center w-[40px] h-[40px] px-[12px] rounded-[2px] bg-primary-50">
                <div className="relative w-[16px] h-[27.77px]">
                  <Image src={img_coke_zero} alt="상품" fill className="object-contain" />
                </div>
              </div>
              <p className="font-normal text-[16px]/[20px] tracking-tight text-primary-950">코카콜라 제로</p>
            </div>
            <p className="w-[180px] font-normal text-[16px]/[20px] tracking-tight text-primary-950">2024. 07. 04</p>
            <p className="w-[180px] font-normal text-[16px]/[20px] tracking-tight text-primary-950">청량 • 탄산음료</p>
            <p className="w-[160px] font-normal text-[16px]/[20px] tracking-tight text-primary-950">2,000원</p>
            <p className="w-[160px] font-normal text-[16px]/[20px] tracking-tight text-primary-950">www.codeit.kr</p>
          </div>
        </div>
      </Desktop>
    </>
  );
}
