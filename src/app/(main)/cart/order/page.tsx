"use client";

import React from "react";
import OrderItem from "./_components/OrderItem";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/ui/Button";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/lib/api/cart.api";
import { TGetCartItemsParams, TGetCartItemsResponse } from "@/types/cart.types";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * @De-cal TODO:
 * 1. 구매 요청 API 연동
 */

export default function OrderPage() {
  const router = useRouter();

  const queryString = useSearchParams();
  const cartItemId = queryString.get("cartItemId") ?? undefined;

  const params: TGetCartItemsParams = {
    ...(cartItemId ? { cartItemId } : { isChecked: "true" }),
  };

  const {
    data: cartItems,
    isPending,
    error,
  } = useQuery<TGetCartItemsResponse, Error, TGetCartItemsResponse, [string, string, string]>({
    queryKey: ["cart", "order", cartItemId ?? "isChecked"],
    queryFn: () => getCartItems(params),
  });

  // const {mutate: } = useMutation({
  //   mutationFn: () => {},
  //   onSuccess: () => {
  //     router.push('/cart/order-confirm')
  //   }
  // })

  if (error) {
    return <div>에러 발생 : {error.message}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-[1200px] md:px-[24px]">
        <div className="flex flex-col gap-[40px] mt-[20px] sm:gap-[70px] sm:mt-[60px] md:mt-[80px]">
          <div className="flex flex-col justify-center items-center gap-[10px] font-bold text-[16px]/[20px] tracking-tight sm:flex-row sm:gap-[20px] sm:text-[18px]/[22px]">
            <p className="text-primary-300">1. Shopping Cart</p>
            <ArrowIconSvg direction="right" className="hidden sm:block relative w-[24px] h-[24px] text-primary-300" />
            <p className="text-primary-950">2. Order</p>
            <ArrowIconSvg direction="right" className="hidden sm:block relative w-[24px] h-[24px] text-primary-300" />
            <p className="text-primary-300">3. Order Confirmed</p>
          </div>
        </div>

        <OrderItem isPending={isPending} cartItems={cartItems} />

        <div className="flex flex-col justify-center items-start mt-[40px] gap-[14px] sm:gap-[20px]">
          <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">요청 메시지</p>
          <TextArea className="p-[16px] placeholder:text-[#929292] placeholder:text-[16px]/[26px] placeholder:tracking-tight placeholder:font-normal rounded-[2px] w-full sm:p-[24px] sm:w-full md:w-full" />
        </div>

        <div className="flex justify-center items-center mt-[24px] gap-[16px] sm:mt-[50px] sm:gap-[20px]">
          <Button
            onClick={() => router.push("/cart")}
            className="w-full max-w-[300px] h-[64px] font-bold text-[16px]/[20px] tracking-tight"
            type="white"
            label="취소"
          />
          <Button
            onClick={() => {}}
            className="w-full max-w-[300px] h-[64px] font-bold text-[16px]/[20px] tracking-tight"
            type="black"
            label="구매 요청"
          />
        </div>
      </div>
    </div>
  );
}
