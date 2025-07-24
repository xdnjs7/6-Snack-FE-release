'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import clsx from 'clsx';
import ArrowIconSvg from '@/components/svg/ArrowIconSvg';
import { getMyOrderDetail, TMyOrderDetail } from '@/lib/api/orderHistory.api';

type TOrderConfirmedPageProps = {
  orderId?: string;
};

export default function OrderConfirmedPage({ orderId: propOrderId }: TOrderConfirmedPageProps) {
  const router = useRouter();
  const params = useParams();
  const [orderData, setOrderData] = useState<TMyOrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // orderId 우선순위: props > URL params
  const orderId = propOrderId || (params.orderId as string);

  useEffect(() => {
    const fetchOrderDetail = async (): Promise<void> => {
      if (!orderId) {
        setError('주문 ID가 없습니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log('Fetching order detail for:', orderId);
        const data: TMyOrderDetail = await getMyOrderDetail(orderId);
        console.log('Received order data:', data);
        setOrderData(data);
      } catch (err) {
        setError('주문 내역을 불러오는데 실패했습니다.');
        console.error('Error fetching order detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ko-KR');
  };

  const handleViewOrderHistory = () => {
    router.push('/my/order-list');
  };

  const handleBackToCart = () => {
    router.push('/cart');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-base sm:text-lg md:text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-base sm:text-lg md:text-xl text-red-600">{error || '주문 내역을 찾을 수 없습니다.'}</div>
      </div>
    );
  }

  // 배송비 계산 (고정값)
  const shippingFee = 3000;
  const totalAmount = orderData.totalPrice + shippingFee;

  return (
    <div className={clsx(
      "min-h-screen",
      "bg-white",
      "text-[--color-primary-950]",
      "font-[var(--font-suit)]",
      "flex",
      "flex-col",
    )}>
      {/* 메인 컨텐츠 */}
      <main className={clsx(
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
      )}>
        {/* 진행 단계 */}
        <div className="flex flex-col sm:flex-row sm:gap-5 md:gap-5 justify-center items-center gap-2.5 sm:gap-4">
          <div className="justify-center text-zinc-400 text-base sm:text-lg md:text-lg font-bold font-['SUIT']">1. Shopping Cart</div>
          <div className="hidden sm:block">
            <ArrowIconSvg direction="right" className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="justify-center text-zinc-400 text-base sm:text-lg md:text-lg font-bold font-['SUIT']">2. Order</div>
          <div className="hidden sm:block">
            <ArrowIconSvg direction="right" className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="justify-center text-neutral-800 text-base sm:text-lg md:text-lg font-bold font-['SUIT']">3. Order Confirmed</div>
        </div>

        {/* 주문 완료 메시지 */}
        <div className="self-stretch text-center justify-center text-neutral-800 text-2xl sm:text-3xl md:text-3xl font-bold font-['SUIT']">
          구매 요청이 완료되었습니다.
        </div>

        {/* 주문 상품 목록 */}
        <div className="self-stretch flex flex-col justify-start items-center gap-12 md:gap-14">
          <div className="self-stretch flex flex-col justify-start items-start gap-10">
            <div className="self-stretch flex flex-col justify-start items-start gap-5">
              {/* 요청 품목 헤더 */}
              <div className="inline-flex justify-start items-center gap-1.5">
                <div className="justify-center text-neutral-800 text-base font-bold font-['SUIT']">요청 품목</div>
                <div className="justify-center text-neutral-800 text-base font-normal font-['SUIT']">
                  총 {orderData.orderedItems.length}개
                </div>
              </div>

              {/* 상품 목록 카드 */}
              <div className="self-stretch px-5 md:px-14 pt-5 md:pt-10 pb-7 md:pb-10 bg-transparent sm:bg-white/10 rounded-sm shadow-[0px_0px_6px_0px_rgba(0,0,0,0.0)] sm:shadow-[0px_0px_6px_0px_rgba(0,0,0,0.10)] sm:outline sm:outline-1 sm:outline-neutral-200 flex flex-col justify-start items-start gap-5">
                {/* 상품 목록 */}
                <div className="self-stretch flex flex-col justify-start items-start">
                  {orderData.orderedItems.map((orderedItem, index) => (
                    <div 
                      key={orderedItem.id}
                      className="self-stretch pr-5 py-5 border-b border-neutral-200 inline-flex justify-between items-center"
                    >
                      <div className="flex justify-start items-center gap-5">
                        <div className="w-36 h-36 bg-white shadow-[4px_4px_20px_0px_rgba(250,247,243,0.25)] flex justify-center items-center gap-2.5">
                          <img 
                            className="w-14 h-24 relative" 
                            src={orderedItem.receipt.imageUrl} 
                            alt={orderedItem.receipt.productName}
                          />
                        </div>
                        <div className="inline-flex flex-col justify-center items-start gap-7">
                          <div className="flex flex-col justify-center items-start gap-2.5">
                            <div className="text-center justify-center text-zinc-800 text-base font-medium font-['SUIT']">
                              {orderedItem.receipt.productName}
                            </div>
                            <div className="justify-start text-zinc-800 text-base font-bold font-['SUIT']">
                              {formatPrice(orderedItem.receipt.price)}원
                            </div>
                          </div>
                          <div className="justify-center text-zinc-500 text-base font-bold font-['SUIT']">
                            수량 {orderedItem.receipt.quantity}개
                          </div>
                        </div>
                      </div>
                      <div className="text-center justify-center text-neutral-600 text-xl font-extrabold font-['SUIT'] leading-loose">
                        {formatPrice(orderedItem.receipt.price * orderedItem.receipt.quantity)}원
                      </div>
                    </div>
                  ))}
                </div>

                {/* 주문 금액 정보 */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="w-full px-5 flex justify-between items-center">
                    <div className="text-neutral-600 text-base font-bold font-['SUIT']">주문금액</div>
                    <div className="text-neutral-600 text-base font-bold font-['SUIT']">
                      {formatPrice(orderData.totalPrice)}원
                    </div>
                  </div>
                  <div className="w-full px-5 flex justify-between items-center">
                    <div className="text-neutral-600 text-base font-bold font-['SUIT']">배송비</div>
                    <div className="text-neutral-600 text-base font-bold font-['SUIT']">
                      {formatPrice(shippingFee)}원
                    </div>
                  </div>
                  <div className="w-full px-5 flex justify-between items-center">
                    <div className="text-neutral-800 text-lg font-bold font-['SUIT']">총 주문금액</div>
                    <div className="text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                      {formatPrice(totalAmount)}원
                    </div>
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
          <div className="self-stretch h-40 p-6 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-300 inline-flex justify-start items-start gap-2 overflow-hidden">
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
            className="flex-1 md:flex-none md:w-[260px] h-16 px-4 py-3 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-400 flex justify-center items-center text-lg font-semibold"
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
}
