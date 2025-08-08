"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetail } from "@/lib/api/orderManage.api";
import CheckIconSvg from "@/components/svg/CheckIconSvg";

type TSuccessPageContentProps = {
  orderId?: string;
  amount?: string;
  paymentKey?: string;
};

export default function SuccessPageContent({ orderId, amount, paymentKey }: TSuccessPageContentProps) {
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const { data: order, isPending } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderDetail(orderId ?? ""),
    enabled: !!orderId,
  });

  const hasConfirmed = useRef<boolean>(false);

  useEffect(() => {
    // 이미 요청을 보냈는지 판단하는 로직
    if (hasConfirmed.current) return;

    if (!order) return;

    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    if (String(order.totalPrice + 3000) !== amount) {
      router.push("/fail?message=가격 정보가 일치하지 않습니다.&code=400");
      return;
    }

    const requestData = {
      orderId,
      amount,
      paymentKey,
    };

    console.log("orderId", orderId);
    console.log("amount", amount);
    console.log("paymentKey", paymentKey);

    async function confirm() {
      hasConfirmed.current = true; // ✅ 중복 방지

      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? "https://api.5nack.site/payments/confirm"
          : "http://localhost:8080/payments/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
          credentials: "include",
          cache: "no-store",
        },
      );

      const json = await response.json();

      if (!response.ok) {
        // 결제 실패 비즈니스 로직을 구현하세요.
        router.replace(`/fail?message=${json.message}&code=${json.code}`);
        return;
      }

      // 결제 성공 비즈니스 로직을 구현하세요.
      setSuccess(true);
    }

    confirm();
  }, [order, amount, orderId, paymentKey, router]);

  if (isPending || !success) {
    return (
      <div role="status" aria-label="로딩 중" className="flex justify-center items-center h-screen -mb-[24px]">
        <div className="size-[20px] border-[3px] border-t-[3px] border-blue-500 border-t-primary-100 rounded-full animate-spin"></div>
      </div>
    );
  }

  /**
   * 주문 번호: searchParams.get("orderId")
   * 결제 금액: Number(searchParams.get("amount")).toLocaleString()
   * paymentKey: searchParams.get("paymentKey")
   */

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-[28px] -mb-[24px]">
      <CheckIconSvg stroke="white" bgColor="#3182F6" className="w-15 h-15 cursor-default sm:w-30 sm:h-30" />
      <section className="flex flex-col w-full gap-[38px] text-center justify-center items-center">
        <h2 className="font-bold text-[22px]/[30px] sm:text-[30px]/[36px]">결제를 완료했어요</h2>
        <button
          role="구매 완료 페이지로 이동"
          onClick={() => router.push(`/cart/order-confirmed/${order?.id}`)}
          className="outline-none bg-blue-500 text-white text-[18px]/[30px] w-full max-w-[285px] rounded-[12px] h-[56px] font-bold cursor-pointer sm:max-w-[360px] sm:h-[64px]"
        >
          닫기
        </button>
      </section>
    </div>
  );
}
