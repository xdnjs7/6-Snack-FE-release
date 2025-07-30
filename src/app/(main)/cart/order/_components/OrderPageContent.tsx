"use client";

import React, { ChangeEvent, useState } from "react";
import TextArea from "@/components/common/TextArea";
import OrderItem from "./OrderItem";
import Button from "@/components/ui/Button";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/lib/api/cart.api";
import { TGetCartItemsParams, TGetCartItemsResponse } from "@/types/cart.types";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/api/order.api";
import clsx from "clsx";
import { TOrderResponse } from "@/types/order.types";
import { useAuth } from "@/providers/AuthProvider";

type TOrderPageContentProps = {
  cartItemId?: string;
};

export default function OrderPageContent({ cartItemId }: TOrderPageContentProps) {
  const { user } = useAuth();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<string>("");
  const router = useRouter();

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

  // 구매 요청
  const { mutate: orderRequest } = useMutation<
    TOrderResponse,
    Error,
    { requestMessage?: string; cartItemIds: number[] }
  >({
    mutationFn: ({ requestMessage, cartItemIds }) => createOrder({ requestMessage, cartItemIds }),
    onSuccess: (order) => router.push(`/cart/order-confirmed/${order.data.id}`),
    onError: () => setIsDisabled(true),
  });

  const cartItemIds = cartItems?.cart.map((item) => item.id) ?? [];

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRequestMessage(e.target.value);
  };

  if (user?.role !== "USER") {
    return <div className="flex h-[80vh] justify-center items-center">일반 유저만 이용가능한 페이지입니다.</div>;
  }

  if (error) {
    return <div>에러 발생 : {error.message}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-[1200px] md:px-[24px] sm:pb-[36px]">
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
          <TextArea
            value={requestMessage}
            onChange={handleValueChange}
            className="p-[16px] placeholder:text-[#929292] placeholder:text-[16px]/[26px] placeholder:tracking-tight placeholder:font-normal rounded-[2px] w-full sm:p-[24px] sm:w-full md:w-full"
          />
        </div>

        <div className="flex justify-center items-center mt-[24px] gap-[16px] sm:mt-[50px] sm:gap-[20px]">
          <Button
            onClick={() => router.push("/cart")}
            className="w-full max-w-[300px] h-[64px] font-bold text-[16px]/[20px] tracking-tight"
            type="white"
            label="취소"
          />
          <Button
            onClick={() => {
              setIsDisabled(true);
              orderRequest({ requestMessage, cartItemIds });
            }}
            disabled={isDisabled}
            type="black"
            label={isDisabled ? "잠시만 기다려주세요..." : "구매 요청"}
            className={clsx(
              isDisabled && "text-primary-300 bg-primary-100 cursor-default",
              "w-full max-w-[300px] h-[64px] font-bold text-[16px]/[20px] tracking-tight",
            )}
          />
        </div>
      </div>
    </div>
  );
}
