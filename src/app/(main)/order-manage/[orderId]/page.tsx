"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { useOrderDetail } from "@/hooks/useOrderDetail";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Toast from "@/components/common/Toast";
import { formatDate } from "@/lib/utils/formatDate.util";
import { formatPrice } from "@/lib/utils/formatPrice.util";
import { useOrderStatusUpdate } from "@/hooks/useOrderStatusUpdate";
import { useModal } from "@/providers/ModalProvider";
import OrderActionModal from "../_components/OrderActionModal";

export default function OrderManageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId: string = params.orderId as string;

  const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(true);
  const [toastConfig, setToastConfig] = useState<{
    isVisible: boolean;
    text: string;
    variant: "success" | "error";
  }>({
    isVisible: false,
    text: "",
    variant: "success",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 언마운트 시 클린업
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // React Query 훅 불러오기
  // 주문 상세 조회
  const { data: orderRequest, isLoading, error } = useOrderDetail(orderId);
  // 주문 상태 승인/거절
  const updateOrderMutation = useOrderStatusUpdate();
  const { openModal } = useModal();

  // 토스트 함수
  const showToast = (text: string, variant: "success" | "error" = "success") => {
    setToastConfig({
      isVisible: true,
      text,
      variant,
    });

    // 기존 타이머가 있다면 클리어
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 새 타이머 설정
    timerRef.current = setTimeout(() => {
      setToastConfig((prev) => ({ ...prev, isVisible: false }));
      timerRef.current = null;
    }, 3000);
  };

  const handleApprove = async () => {
    try {
      await updateOrderMutation.mutateAsync({
        orderId: orderId,
        status: "APPROVED",
        adminMessage: "승인되었습니다.",
      });

      openModal(
        <OrderActionModal
          modalTitle="승인 완료"
          modalDescription="승인이 완료되었어요!<br />구매 내역을 통해 배송 현황을 확인해보세요"
          leftButtonText="홈으로"
          rightButtonText="구매 내역 보기"
          onLeftClick={() => {
            router.push("/products");
          }}
          onRightClick={() => {
            router.push("/order-history");
          }}
        />,
      );
    } catch {
      showToast("승인 처리에 실패했습니다.", "error");
    }
  };

  const handleReject = async () => {
    try {
      await updateOrderMutation.mutateAsync({
        orderId: orderId,
        status: "REJECTED",
        adminMessage: "반려되었습니다.",
      });

      openModal(
        <OrderActionModal
          modalTitle="요청 반려"
          modalDescription="요청이 반려되었어요<br />목록에서 다른 요청을 확인해보세요"
          leftButtonText="홈으로"
          rightButtonText="구매 요청 내역 보기"
          onLeftClick={() => {
            router.push("/products");
          }}
          onRightClick={() => {
            router.push("/order-manage");
          }}
        />,
      );
    } catch {
      showToast("반려 처리에 실패했습니다.", "error");
    }
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
      <Toast text={toastConfig.text} variant={toastConfig.variant} isVisible={toastConfig.isVisible} />
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
                  {orderRequest.products?.map((item) => (
                    <div
                      key={item.id}
                      className="self-stretch py-3 sm:py-4 md:py-5 md:pr-5 border-b border-neutral-200 inline-flex justify-between items-center"
                    >
                      <div className="flex justify-start items-center gap-3 sm:gap-4 md:gap-5">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 bg-[--color-white] shadow-[4px_4px_20px_0px_rgba(250,247,243,0.25)] flex justify-center items-center gap-2.5">
                          {typeof item.imageUrl === "string" && (
                            <div className="w-7 h-12 sm:w-10 sm:h-16 md:w-14 md:h-24 relative">
                              <Image src={item.imageUrl} alt={item.productName} fill className="object-contain" />
                            </div>
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
                  {orderRequest.createdAt ? formatDate(orderRequest.createdAt) : "-"}
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
          <Button
            type="white"
            label={updateOrderMutation.isPending ? "처리중..." : "요청 반려"}
            className="w-full h-16 md:max-w-[300px]"
            onClick={handleReject}
            disabled={updateOrderMutation.isPending}
          />
          <Button
            type="primary"
            label={updateOrderMutation.isPending ? "처리중..." : "요청 승인"}
            className="w-full h-16 md:max-w-[300px]"
            onClick={handleApprove}
            disabled={updateOrderMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
