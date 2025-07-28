"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { useOrderDetail } from "@/hooks/useOrderDetail";
import Button from "@/components/ui/Button";

type TOrderManageDetailPageProps = {
  // 현재는 props가 없지만 향후 확장성을 위해 타입 정의
};

export default function OrderManageDetailPage({}: TOrderManageDetailPageProps) {
  const params = useParams();
  const router = useRouter();
  const orderId: string = params.orderId as string;

  const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(true);

  // React Query를 사용한 주문 상세 조회
  const { data: orderRequest, isLoading, error } = useOrderDetail(orderId);
  // TODO 유틸함수로 분리예정
  const formatDate = (dateString: string | undefined | null): string => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "-";
    }
  };
  // TODO 유틸함수로 분리예정
  const formatPrice = (price: number | undefined | null): string => {
    if (price === undefined || price === null) return "0";
    return price.toLocaleString("ko-KR");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-base sm:text-lg md:text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error || !orderRequest) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-base sm:text-lg md:text-xl text-red-600">
          {error instanceof Error ? error.message : "주문 내역을 찾을 수 없습니다."}
        </div>
      </div>
    );
  }

  const calculatedTotal: number =
    orderRequest.products?.reduce((sum: number, item) => sum + item.price * item.quantity, 0) || 0;
  const shippingFee: number = 3000;
  const finalTotal: number = calculatedTotal + shippingFee;

  // 예산 관련 변수들
  const currentMonthBudget = orderRequest.budget.currentMonthBudget || 0;
  const currentMonthExpense = orderRequest.budget.currentMonthExpense || 0;
  const remainingBudget = currentMonthBudget - currentMonthExpense;
  const budgetAfterPurchase = remainingBudget - finalTotal;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 md:pt-8 flex flex-col justify-start items-start gap-5 sm:gap-6 md:gap-7">
        <div className="self-stretch justify-center text-[--color-primary-800] text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-['SUIT']">
          구매 요청 상세
        </div>

        {/* Items Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-4 sm:gap-5 md:gap-6 lg:gap-10">
          <div className="self-stretch flex flex-col justify-start items-start gap-4 sm:gap-5">
            <div
              className="inline-flex justify-start items-start gap-1.5 cursor-pointer"
              onClick={() => setIsItemsExpanded(!isItemsExpanded)}
            >
              <div className="justify-center text-[--color-primary-800] text-sm sm:text-base md:text-lg font-bold font-['SUIT']">
                요청 품목
              </div>
              <div className="justify-center text-[--color-primary-800] text-sm sm:text-base md:text-lg font-normal font-['SUIT']">
                총 {orderRequest.products?.length || 0}개
              </div>
              <ArrowIconSvg
                direction={isItemsExpanded ? "down" : "right"}
                className="w-4 h-4 sm:w-5 sm:h-5 text-[--color-primary-800]"
              />
            </div>

            {isItemsExpanded && (
              <div className="self-stretch px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 md:pt-5 pb-5 sm:pb-6 md:pb-7 bg-white rounded-sm shadow-[0px_0px_6px_0px_rgba(0,0,0,0.0)] sm:shadow-[0px_0px_6px_0px_rgba(0,0,0,0.10)] sm:outline sm:outline-1 sm:outline-neutral-200 flex flex-col justify-start items-start gap-4 sm:gap-5">
                {/* Items List */}
                <div className="self-stretch flex flex-col justify-start items-start">
                  {orderRequest.products?.map((item, index: number) => (
                    <div
                      key={item.id}
                      className="self-stretch py-3 sm:py-4 md:py-5 md:pr-5 border-b border-neutral-200 inline-flex justify-between items-center"
                    >
                      <div className="flex justify-start items-center gap-3 sm:gap-4 md:gap-5">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 bg-[--color-white] shadow-[4px_4px_20px_0px_rgba(250,247,243,0.25)] flex justify-center items-center gap-2.5">
                          {typeof item.imageUrl === "string" && (
                            <img
                              src={item.imageUrl}
                              alt={item.productName}
                              className="w-5 h-8 sm:w-7 sm:h-12 md:w-10 md:h-16 lg:w-14 lg:h-24 relative"
                            />
                          )}
                        </div>
                        <div className="inline-flex flex-col justify-center items-start gap-3 sm:gap-5 md:gap-7">
                          <div className="flex flex-col justify-center items-start gap-1.5 sm:gap-2 md:gap-2.5">
                            <div className="text-center justify-center text-[--color-primary-800] text-xs sm:text-sm md:text-base font-medium font-['SUIT']">
                              {item.productName}
                            </div>
                            <div className="justify-start text-[--color-primary-800] text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                              {formatPrice(item.price)}원
                            </div>
                          </div>
                          <div className="justify-center text-gray-500 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                            수량 {item.quantity}개
                          </div>
                        </div>
                      </div>
                      <div className="text-center justify-center text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-extrabold font-['SUIT'] leading-loose">
                        {formatPrice(item.price * item.quantity)}원
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Amount Info */}
                <div className="self-stretch flex flex-col gap-2 sm:gap-3">
                  <div className="flex justify-between items-center">
                    <div className="text-center justify-center text-gray-700 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                      주문금액
                    </div>
                    <div className="text-center justify-center text-gray-700 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                      {formatPrice(calculatedTotal)}원
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center justify-center text-gray-700 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                      배송비
                    </div>
                    <div className="text-center justify-center text-gray-700 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                      {formatPrice(shippingFee)}원
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center justify-center text-[--color-primary-800] text-sm sm:text-base md:text-lg lg:text-xl font-bold font-['SUIT']">
                      총 주문금액
                    </div>
                    <div className="text-center justify-center text-[--color-primary-800] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold font-['SUIT']">
                      {formatPrice(finalTotal)}원
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Request Info Section */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch px-2 py-3 sm:py-3.5 border-b border-neutral-800 inline-flex justify-start items-center gap-2">
            <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm md:text-base font-extrabold font-['SUIT']">
              요청 정보
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start">
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 h-10 sm:h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal font-['SUIT']">
                  요청인
                </div>
              </div>
              <div className="flex-1 h-10 sm:h-12 px-2 sm:px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                  {orderRequest.requester || "-"}
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 h-10 sm:h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal font-['SUIT']">
                  요청 날짜
                </div>
              </div>
              <div className="flex-1 h-10 sm:h-12 px-2 sm:px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                  {formatDate(orderRequest.createdAt)}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start">
            <div className="w-24 sm:w-32 md:w-36 self-stretch px-2 py-3 sm:py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
              <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal font-['SUIT']">
                요청 메시지
              </div>
            </div>
            <div className="flex-1 p-3 sm:p-4 border-b border-neutral-200 flex justify-start items-center gap-2">
              <div className="flex-1 justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold font-['SUIT'] leading-snug">
                {orderRequest.requestMessage || "요청 메시지가 없습니다."}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Info Section */}
        {/* TODO- api로 가져온 정보 활용해서 이번달 지출액, 남은 예산 보여주고 구매후 예산 계산해서 보여주기 */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch px-2 py-3 sm:py-3.5 border-b border-neutral-800 inline-flex justify-start items-center gap-2">
            <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm md:text-base font-extrabold font-['SUIT']">
              예산 정보
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start">
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 h-10 sm:h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal font-['SUIT']">
                  이번 달 지출액
                </div>
              </div>
              <div className="flex-1 h-10 sm:h-12 px-2 sm:px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                  {formatPrice(currentMonthExpense)}원
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 h-10 sm:h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal font-['SUIT']">
                  이번 달 남은 예산
                </div>
              </div>
              <div className="flex-1 h-10 sm:h-12 px-2 sm:px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                  {formatPrice(remainingBudget)}원
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start">
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 self-stretch px-2 py-3 sm:py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal font-['SUIT']">
                  구매 후 예산
                </div>
              </div>
              <div className="flex-1 self-stretch p-3 sm:p-4 border-b border-neutral-200 flex justify-start items-start gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold font-['SUIT']">
                  {formatPrice(budgetAfterPurchase)}원
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 요청 반려, 요청 승인 버튼 */}
        <div className="flex w-full justify-center gap-4 sm:gap-5">
          <Button type="white" label="요청 반려" className="w-full h-16 md:max-w-[300px]" />
          <Button type="primary" label="요청 승인" className="w-full h-16 md:max-w-[300px]" />
        </div>
      </div>
    </div>
  );
}
