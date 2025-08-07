"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import Button from "@/components/ui/Button";
import clsx from "clsx";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { useMyOrderDetail } from "@/hooks/useOrderDetail";
import { useAuth } from "@/providers/AuthProvider";
import { formatPrice } from "@/lib/utils/formatPrice.util";

// 메모이제이션된 상품 아이템 컴포넌트
const ProductItem = React.memo(({ receipt }: { receipt: { price: number; quantity: number; imageUrl: string; productName: string } }) => {
  const totalPrice = useMemo(() => receipt.price * receipt.quantity, [receipt.price, receipt.quantity]);
  
  return (
    <div
      className="self-stretch border-b border-neutral-200 inline-flex justify-between items-center sm:py-5 sm:pr-5"
    >
      <div className="flex gap-5 flex-1 sm:flex sm:justify-start sm:items-center sm:gap-5">
        <div className="relative w-24 h-24 sm:w-[140px] sm:h-[140px] bg-[--color-white] shadow-[4px_4px_20px_0px_rgba(250,247,243,0.25)] flex justify-center items-center gap-2.5">
          <Image
            className="object-contain"
            src={receipt.imageUrl}
            alt={receipt.productName}
            fill
            sizes="(max-width: 640px) 96px, 140px"
            priority={false}
            loading="lazy"
          />
        </div>
        <div className="flex-1 inline-flex flex-col items-start gap-3 sm:justify-start sm:inline-flex sm:flex-col sm:justify-start sm:items-start sm:gap-7">
          <div className="flex flex-col justify-center items-start gap-1 sm:justify-start sm:gap-2.5">
            <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-medium font-['SUIT']">
              {receipt.productName}
            </div>
            <div className="justify-start text-gray-950 text-sm sm:text-base font-bold font-['SUIT']">
              {formatPrice(receipt.price)}원
            </div>
          </div>
          <div className="flex justify-between items-center w-full sm:justify-start sm:flex sm:justify-start">
            <div className="justify-center text-gray-500 text-[13px] sm:text-base font-bold font-['SUIT']">
              수량 {receipt.quantity}개
            </div>
            <div className="text-center justify-center text-gray-700 text-base font-bold font-['SUIT'] sm:hidden">
              {formatPrice(totalPrice)}원
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block text-center justify-center text-gray-700 text-[20px] font-extrabold font-['SUIT']">
        {formatPrice(totalPrice)}원
      </div>
    </div>
  );
});

ProductItem.displayName = 'ProductItem';

// 최적화된 로딩 스켈레톤 컴포넌트
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white">
    <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col items-center gap-10 sm:gap-12 md:gap-16 pt-10 sm:pt-12 md:pt-16 pb-24 sm:pb-28 md:pb-32">
      {/* 진행 단계 스켈레톤 */}
      <div className="flex flex-col sm:flex-row md:gap-5 justify-center items-center gap-2.5 sm:gap-4">
        <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-6 h-6 bg-gray-200 animate-pulse rounded hidden sm:block"></div>
        <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-6 h-6 bg-gray-200 animate-pulse rounded hidden sm:block"></div>
        <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* 주문 완료 메시지 스켈레톤 */}
      <div className="w-64 h-8 bg-gray-200 animate-pulse rounded"></div>

      {/* 상품 목록 스켈레톤 */}
      <div className="self-stretch flex flex-col justify-start items-start gap-10">
        <div className="self-stretch flex flex-col justify-start items-start gap-[15px]">
          <div className="inline-flex justify-start items-start gap-1.5">
            <div className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="self-stretch bg-white rounded-sm sm:shadow-[0px_0px_6px_0px_rgba(0,0,0,0.10)] sm:outline-1 sm:outline-neutral-200 flex flex-col justify-start items-start gap-5 sm:px-5 sm:pt-5 sm:pb-[30px] md:px-[60px] md:py-[40px]">
            <div className="self-stretch flex flex-col justify-start items-start gap-[16px] sm:gap-0">
              {[1, 2].map((i) => (
                <div key={i} className="self-stretch border-b border-neutral-200 inline-flex justify-between items-center sm:py-5 sm:pr-5">
                  <div className="flex gap-5 flex-1 sm:flex sm:justify-start sm:items-center sm:gap-5">
                    <div className="w-24 h-24 sm:w-[140px] sm:h-[140px] bg-gray-200 animate-pulse rounded"></div>
                    <div className="flex-1 inline-flex flex-col items-start gap-3 sm:justify-start sm:inline-flex sm:flex-col sm:justify-start sm:items-start sm:gap-7">
                      <div className="flex flex-col justify-center items-start gap-1 sm:justify-start sm:gap-2.5">
                        <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                      <div className="flex justify-between items-center w-full sm:justify-start sm:flex sm:justify-start">
                        <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded sm:hidden"></div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block w-24 h-6 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 스켈레톤 */}
      <div className="self-stretch h-16 inline-flex justify-start md:justify-center items-center gap-5">
        <div className="flex-1 md:flex-none md:w-[260px] h-16 bg-gray-200 animate-pulse rounded"></div>
        <div className="flex-1 md:flex-none md:w-[264px] h-16 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </main>
  </div>
);

// 최적화된 에러 컴포넌트
const ErrorComponent = ({ error }: { error: Error | null }) => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-base sm:text-lg md:text-xl text-red-600">
      {error?.message || "주문 내역을 찾을 수 없습니다."}
    </div>
  </div>
);

export default function OrderConfirmedPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  
  // orderId 우선순위: props > URL params
  const orderId = params.orderId as string;

  // useQuery를 사용한 데이터 페칭
  const { data: orderData, isLoading, error } = useMyOrderDetail(orderId);

  // 메모이제이션된 이벤트 핸들러
  const handleViewOrderHistory = useCallback(() => {
    router.push("/my/order-list");
  }, [router]);

  const handleBackToCart = useCallback(() => {
    router.push("/cart");
  }, [router]);

  // 메모이제이션된 계산값들
  const shippingFee = useMemo(() => 3000, []);
  const totalAmount = useMemo(() => 
    orderData ? orderData.totalPrice + shippingFee : 0, 
    [orderData, shippingFee]
  );

  // 페이지 제목 메모이제이션
  const pageTitle = useMemo(() => {
    if (orderData) {
      return `주문 완료 - ${orderData.receipts?.length || 0}개 상품`;
    }
    return "주문 완료";
  }, [orderData]);

  // 진행 단계 컴포넌트 메모이제이션
  const progressSteps = useMemo(() => {
    if (user?.role === "USER") {
      return (
        <>
          <div className="justify-center text-zinc-400 text-base sm:text-lg md:text-lg font-bold font-['SUIT']">
            1. Shopping Cart
          </div>
          <div className="hidden sm:block">
            <ArrowIconSvg direction="right" className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="justify-center text-zinc-400 text-base sm:text-lg md:text-lg font-bold font-['SUIT']">
            2. Order
          </div>
          <div className="hidden sm:block">
            <ArrowIconSvg direction="right" className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="justify-center text-neutral-800 text-base sm:text-lg md:text-lg font-bold font-['SUIT']">
            3. Order Confirmed
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="justify-center text-zinc-400 text-base sm:text-lg md:text-lg font-bold font-['SUIT']">
            1. Shopping Cart
          </div>
          <div className="hidden sm:block">
            <ArrowIconSvg direction="right" className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="justify-center text-neutral-800 text-base sm:text-lg md:text-lg font-bold font-['SUIT']">
            2. Order Confirmed
          </div>
        </>
      );
    }
  }, [user?.role]);

  // 완료 메시지 메모이제이션
  const completionMessage = useMemo(() => {
    return user?.role === "USER" ? "구매 요청이 완료되었습니다." : "구매가 완료되었습니다.";
  }, [user?.role]);

  // 메인 컨텐츠 메모이제이션
  const mainContent = useMemo(() => {
    if (!orderData) return null;
    
    return (
      <div
        className={clsx(
          "min-h-screen",
          "bg-white",
          "text-[--color-primary-950]",
          "font-[var(--font-suit)]",
          "flex",
          "flex-col",
        )}
      >
        <main
          className={clsx(
            "flex-1",
            "p-4",
            "sm:p-6",
            "md:p-8",
            "max-w-7xl",
            "mx-auto",
            "w-full",
            "flex",
            "flex-col",
            "items-center",
            "gap-10",
            "sm:gap-12",
            "md:gap-16",
            "pt-10",
            "sm:pt-12",
            "md:pt-16",
            "pb-24",
            "sm:pb-28",
            "md:pb-32",
          )}
        >
          {/* 진행 단계 */}
          <div className="flex flex-col sm:flex-row md:gap-5 justify-center items-center gap-2.5 sm:gap-4">
            {progressSteps}
          </div>

          {/* 주문 완료 메시지 */}
          <div className="self-stretch text-center justify-center text-neutral-800 text-2xl sm:text-3xl md:text-3xl font-bold font-['SUIT']">
            {completionMessage}
          </div>

          {/* 주문 상품 목록 */}
          <div className="self-stretch flex flex-col justify-start items-start gap-10">
            <div className="self-stretch flex flex-col justify-start items-start gap-[15px]">
              <div className="inline-flex justify-start items-start gap-1.5">
                <div className="justify-center text-gray-950 text-base font-bold font-['SUIT']">요청 품목</div>
                <div className="justify-center text-gray-950 text-base font-normal font-['SUIT']">
                  총 {orderData.receipts.length}개
                </div>
              </div>

              <div className="self-stretch bg-white rounded-sm sm:shadow-[0px_0px_6px_0px_rgba(0,0,0,0.10)] sm:outline-1 sm:outline-neutral-200 flex flex-col justify-start items-start gap-5 sm:px-5 sm:pt-5 sm:pb-[30px] md:px-[60px] md:py-[40px]">
                {/* 상품 목록 */}
                <div className="self-stretch flex flex-col justify-start items-start gap-[16px] sm:gap-0">
                  {orderData.receipts.map((receipt) => (
                    <ProductItem key={receipt.id} receipt={receipt} />
                  ))}
                </div>

                {/* 주문 금액 정보 */}
                <div className="self-stretch flex flex-col gap-3 sm:gap-[7px] sm:px-5">
                  <div className="flex justify-between items-center">
                    <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                      주문금액
                    </div>
                    <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                      {formatPrice(orderData.totalPrice)}원
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                      배송비
                    </div>
                    <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                      {formatPrice(shippingFee)}원
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center justify-center text-gray-950 text-lg sm:text-lg font-bold font-['SUIT']">
                      총 주문금액
                    </div>
                    <div className="text-center justify-center text-gray-950 text-lg sm:text-2xl font-bold sm:font-extrabold font-['SUIT']">
                      {formatPrice(totalAmount)}원
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 요청 메시지 */}
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['SUIT']">
              요청 메시지
            </div>
            <div className="self-stretch h-40 p-6 bg-white rounded-sm outline-1 outline-offset-[-1px] outline-neutral-300 inline-flex justify-start items-start gap-2 overflow-hidden">
              <div className="justify-center text-neutral-400 text-base font-normal font-['SUIT'] leading-relaxed">
                {orderData.requestMessage || "요청 메시지가 없습니다."}
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="self-stretch h-16 inline-flex justify-start md:justify-center items-center gap-5">
            <Button
              type="white"
              label="장바구니로 돌아가기"
              className="flex-1 md:flex-none md:w-[260px] h-16 px-4 py-3 bg-white rounded-sm outline-1 outline-offset-[-1px] outline-zinc-400 flex justify-center items-center text-lg font-semibold"
              onClick={handleBackToCart}
            />
            <Button
              type="black"
              label="요청내역 확인"
              className="flex-1 md:flex-none md:w-[264px] h-16 px-4 py-3 bg-neutral-800 rounded-sm flex justify-center items-center text-base font-bold"
              onClick={handleViewOrderHistory}
            />
          </div>
        </main>
      </div>
    );
  }, [orderData, progressSteps, completionMessage, shippingFee, totalAmount, handleBackToCart, handleViewOrderHistory]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>주문 완료 - 로딩 중</title>
          <meta name="description" content="주문 정보를 불러오는 중입니다." />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        </Head>
        <LoadingSkeleton />
      </>
    );
  }

  if (error || !orderData) {
    return (
      <>
        <Head>
          <title>주문 완료 - 오류</title>
          <meta name="description" content="주문 정보를 불러오는데 실패했습니다." />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
        <ErrorComponent error={error} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`주문이 완료되었습니다. ${orderData.receipts?.length || 0}개의 상품이 포함되어 있습니다.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preload" href="/fonts/suit.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      {mainContent}
    </>
  );
}
