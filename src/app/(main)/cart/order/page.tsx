import React from "react";
import OrderItem from "./_components/OrderItem";
import ic_chevron_right_gray from "@/assets/icons/ic_chevron_right_gray.svg";
import Image from "next/image";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/ui/Button";

export default function OrderPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-[1200px] md:px-[24px]">
        <div className="flex flex-col gap-[40px] mt-[20px] sm:gap-[70px] sm:mt-[60px] md:mt-[80px]">
          <div className="flex flex-col justify-center items-center gap-[10px] font-bold text-[16px]/[20px] tracking-tight sm:flex-row sm:gap-[20px] sm:text-[18px]/[22px]">
            <p className="text-primary-300">1. Shopping Cart</p>
            <div className="hidden sm:block relative w-[24px] h-[24px]">
              <Image src={ic_chevron_right_gray} alt="화살표" fill className="object-cover" />
            </div>
            <p className="text-primary-950">2. Order</p>
            <div className="hidden sm:block relative w-[24px] h-[24px]">
              <Image src={ic_chevron_right_gray} alt="화살표" fill className="object-cover" />
            </div>
            <p className="text-primary-300">3. Order Confirmed</p>
          </div>
        </div>

        <OrderItem />

        <div className="flex flex-col justify-center items-start mt-[40px] gap-[14px] sm:gap-[20px]">
          <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">요청 메시지</p>
          <TextArea className="p-[16px] placeholder:text-[#929292] placeholder:text-[16px]/[26px] placeholder:tracking-tight placeholder:font-normal rounded-[2px] w-full sm:p-[24px] sm:w-full md:w-full" />
        </div>

        <div className="flex justify-center items-center mt-[24px] gap-[16px] sm:mt-[50px] sm:gap-[20px]">
          <Button
            className="w-full max-w-[300px] h-[64px] font-bold text-[16px]/[20px] tracking-tight"
            type="white"
            label="취소"
          />
          <Button
            className="w-full max-w-[300px] h-[64px] font-bold text-[16px]/[20px] tracking-tight"
            type="black"
            label="구매 요청"
          />
        </div>
      </div>
    </div>
  );
}
