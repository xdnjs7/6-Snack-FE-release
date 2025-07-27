"use client";

import React, { useEffect, useRef, useState } from "react";
import CartItem from "./_components/CartItem";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/lib/api/cart.api";
import { useAuth } from "@/providers/AuthProvider";
import { TGetCartItemsResponse } from "@/types/cart.types";
import { useRouter } from "next/navigation";
import Toast from "@/components/common/Toast";
import { orderNow } from "@/lib/api/order.api";
import { TOrderNowResponse } from "@/types/order.types";
import clsx from "clsx";
import { useDeviceType } from "@/hooks/useDeviceType";

/**
 * @De-cal TODO:
 * 1. 즉시 구매 API 연동 후 order-confirmed 페이지로 이동시키기
 * 2. alert 사용 중인 것 모달이나 토스트로 변경하기
 */

export default function CartPage() {
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const { isMobile } = useDeviceType();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  const {
    data: cartItems,
    isPending,
    error,
  } = useQuery<TGetCartItemsResponse, Error, TGetCartItemsResponse, [string]>({
    queryKey: ["cart"],
    queryFn: () => getCartItems(),
  });

  const { mutate: adminOrderNow } = useMutation<TOrderNowResponse, Error, number[]>({
    mutationFn: (cartItemIds) => orderNow(cartItemIds),
    onSuccess: () => router.push("/cart/order-confirmed"),
  });

  if (error) {
    return <div>에러 발생 : {error.message}</div>;
  }

  const { currentMonthBudget = 0, currentMonthExpense = 0 } = cartItems?.budget ?? {};
  const selectedTotalPrice = cartItems?.cart
    .filter((item) => item.isChecked === true)
    .reduce((totalPrice, item) => totalPrice + item.product.price * item.quantity, 0);
  const canPurchase =
    currentMonthBudget - currentMonthExpense - (selectedTotalPrice ? selectedTotalPrice + 3000 : 0) >= 0;
  const remainingBudget = cartItems?.budget ? currentMonthBudget - currentMonthExpense : 0;
  const checkedCartItemIds = cartItems?.cart.filter((item) => item.isChecked).map((item) => item.id) ?? [];

  // 타이머 언마운트 시 클린업
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleRequestOrder = () => {
    // 아무 상품도 선택하지 않았을 때
    if (checkedCartItemIds.length === 0) return alert("1개 이상의 상품을 선택하세요.");

    // USER일 때
    if (user?.role === "USER") router.push("/cart/order");

    // 예산 부족할 때
    if (!canPurchase) {
      setIsToastVisible(true);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setIsToastVisible(false);
        timerRef.current = null;
      }, 3000);

      return;
    }

    // 즉시 구매 API
    adminOrderNow(checkedCartItemIds);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-[1200px] md:px-[24px]">
        <div className="relative flex flex-col gap-[40px] mt-[20px] sm:gap-[70px] sm:mt-[60px] sm:pb-[36px] md:mt-[80px]">
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

          <Toast
            text={
              isMobile ? (
                "예산이 부족합니다."
              ) : (
                <>
                  <p>예산이 부족합니다.&nbsp;</p>
                  <p>수량을 줄이거나 항목을 제거해주세요.</p>
                </>
              )
            }
            budget={remainingBudget}
            className={clsx(
              isToastVisible
                ? "opacity-100 translate-y-0 sm:translate-y-[-25%] md:translate-y-[-50%]"
                : "opacity-0 translate-y-1/2 sm:translate-y-0 md:translate-y-[-25%]",
              "absolute max-w-[1200px] transition-all duration-500 md:max-w-[1152px]",
            )}
          />

          <CartItem
            cartItems={cartItems}
            isPending={isPending}
            canPurchase={canPurchase}
            checkedCartItemIds={checkedCartItemIds}
          />

          <div className="flex flex-col justify-center items-start gap-[30px] sm:flex-row sm:justify-between sm:items-center sm:gap-[40px] md:gap-[60px]">
            <div className="flex flex-col w-full gap-[14px]">
              <div className="flex justify-start items-center gap-[4px]">
                <p className="font-bold text-[24px]/[30px] tracking-tight text-primary-950 sm:text-[30px]/[37px]">
                  총 주문금액
                </p>
                <p className="font-extrabold text-[24px]/[30px] tracking-tight text-primary-950 sm:text-[30px]/[37px]">
                  {selectedTotalPrice ? (selectedTotalPrice + 3000).toLocaleString("ko-KR") : 0}원
                </p>
              </div>
              <div className="flex flex-col gap-[6px]">
                <p className="font-normal text-[16px]/[20px] tracking-tight text-[#6b6b6b]">
                  주문 상품은 {selectedTotalPrice?.toLocaleString("ko-KR") ?? 0}원
                </p>
                <p className="font-normal text-[16px]/[20px] tracking-tight text-[#6b6b6b] mb-[6px] sm:mb-[10px]">
                  배송비는 3,000원입니다.
                </p>
              </div>
              {user?.role !== "USER" && (
                <>
                  <div className="outline-1 outline-primary-100"></div>
                  <div className="flex justify-start items-center gap-[4px] mt-[2px] sm:mt-[6px]">
                    <p className="font-bold text-[18px]/[22px] tracking-tight text-primary-700">남은 예산 금액</p>
                    <p className="font-extrabold text-[18px]/[22px] tracking-tight text-primary-700">
                      {remainingBudget.toLocaleString("ko-KR")}원
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col justify-center items-center w-full gap-[20px] sm:max-w-[300px]">
              <Link href="/products" className="w-full">
                <Button
                  type="white"
                  label="계속 쇼핑하기"
                  className="w-full h-[64px] font-bold tracking-tight text-primary-950"
                />
              </Link>
              <Button
                onClick={handleRequestOrder}
                type="black"
                label="구매 요청"
                className="w-full h-[64px] font-bold tracking-tight"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
