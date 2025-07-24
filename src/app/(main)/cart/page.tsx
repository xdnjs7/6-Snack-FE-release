"use client";

import React from "react";
import CartItem from "./_components/CartItem";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/lib/api/cart.api";
import { useAuth } from "@/providers/AuthProvider";

export default function CartPage() {
  const { user } = useAuth();

  const {
    data: cartItems,
    isPending,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  if (error) {
    return <div>에러 발생 : {error.message}</div>;
  }

  const selectedTotalPrice = cartItems
    ?.filter((item) => item.isChecked === true)
    .reduce((totalPrice, item) => totalPrice + item.product.price * item.quantity, 0);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-[1200px] md:px-[24px]">
        <div className="flex flex-col gap-[40px] mt-[20px] sm:gap-[70px] sm:mt-[60px] md:mt-[80px]">
          <div className="flex flex-col justify-center items-center gap-[10px] font-bold text-[16px]/[20px] tracking-tight sm:flex-row sm:gap-[20px] sm:text-[18px]/[22px]">
            <p className="text-primary-950">1. Shopping Cart</p>
            {user?.role === "USER" && (
              <>
                <ArrowIconSvg
                  direction="right"
                  className="hidden sm:block relative w-[24px] h-[24px] text-primary-300"
                />
                <p className="text-primary-300">2. Order</p>
              </>
            )}
            <ArrowIconSvg direction="right" className="hidden sm:block relative w-[24px] h-[24px] text-primary-300" />
            <p className="text-primary-300">{user?.role === "USER" ? "3. Order Confirmed" : "2. Order Confirmed"}</p>
          </div>

          <CartItem cartItems={cartItems} isPending={isPending} />

          <div className="flex flex-col justify-center items-start gap-[30px] sm:flex-row sm:justify-between sm:items-center">
            <div>
              <div className="flex justify-center items-center gap-[4px]">
                <p className="font-bold text-[24px]/[30px] tracking-tight text-primary-950 sm:text-[30px]/[37px]">
                  총 주문금액
                </p>
                <p className="font-extrabold text-[24px]/[30px] tracking-tight text-primary-950 sm:text-[30px]/[37px]">
                  {selectedTotalPrice ? (selectedTotalPrice + 3000).toLocaleString("ko-KR") : 0}원
                </p>
              </div>
              <p className="font-normal text-[16px]/[20px] tracking-tight text-[#6b6b6b] mt-[14px] mb-[6px]">
                주문 상품은 {selectedTotalPrice?.toLocaleString("ko-KR")}원
              </p>
              <p className="font-normal text-[16px]/[20px] tracking-tight text-[#6b6b6b] mb-[6px] sm:mb-[10px]">
                배송비는 3,000원입니다.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center w-full gap-[20px] sm:max-w-[300px]">
              <Link href="/products" className="w-full">
                <Button
                  type="white"
                  label="계속 쇼핑하기"
                  className="w-full h-[64px] font-bold tracking-tight text-primary-950"
                />
              </Link>
              <Link href="/cart/order" className="w-full">
                <Button type="black" label="구매 요청" className="w-full h-[64px] font-bold tracking-tight" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
