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
import DogSpinner from "@/components/common/DogSpinner";

export default function OrderManageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId: string = params.orderId as string;

  const { data: orderRequest, isLoading, error } = useOrderDetail(orderId);
  const updateOrderMutation = useOrderStatusUpdate();
  const { openModal } = useModal();

  const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(true);
  const [toastConfig, setToastConfig] = useState<{
    isVisible: boolean;
    text: string;
    variant: "success" | "error";
    budget?: number;
  }>({
    isVisible: false,
    text: "",
    variant: "success",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calculatedTotal: number =
    orderRequest?.products?.reduce((sum: number, item) => sum + item.price * item.quantity, 0) || 0;
  const shippingFee: number = 3000;
  const finalTotal: number = calculatedTotal + shippingFee;

  const currentMonthBudget = orderRequest?.budget?.currentMonthBudget || 0;
  const currentMonthExpense = orderRequest?.budget?.currentMonthExpense || 0;
  const remainingBudget = currentMonthBudget - currentMonthExpense;
  const budgetAfterPurchase = remainingBudget - finalTotal;

  // 타이머 언마운트 시 클린업
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // 데이터가 로딩되었고, 예산이 부족할 때만 토스트 표시
    if (!isLoading && budgetAfterPurchase < 0 && remainingBudget !== undefined) {
      showToast("예산이 부족합니다.", "error", remainingBudget);
    }
  }, [budgetAfterPurchase, remainingBudget, isLoading]);

  const showToast = (text: string, variant: "success" | "error" = "success", budget?: number) => {
    setToastConfig({
      isVisible: true,
      text,
      variant,
      budget,
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
      <main
        className="min-h-screen bg-white flex items-center justify-center"
        role="main"
        aria-live="polite"
        aria-label="페이지 로딩 중"
      >
        <DogSpinner />
      </main>
    );
  }

  if (error || !orderRequest) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center" role="main" aria-live="assertive">
        <div className="text-base sm:text-lg md:text-xl text-red-600">
          {error instanceof Error ? error.message : "주문 내역을 찾을 수 없습니다."}
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Toast
        text={toastConfig.text}
        variant={toastConfig.variant}
        isVisible={toastConfig.isVisible}
        budget={toastConfig.budget}
        onClose={() => setToastConfig((prev) => ({ ...prev, isVisible: false }))}
      />
      {/* Main Content */}
      <main
        className="w-full max-w-[1200px] mx-auto pt-[30px] md:pt-[60px] flex flex-col justify-start items-start gap-[30px]"
        role="main"
      >
        {/* 구매요청상세 헤더 */}
        <header>
          <h1 className="self-stretch justify-center text-primary-950 text-lg/[22px] font-bold">구매 요청 상세</h1>
        </header>

        {/* 요청품목 + 아이템 폴드 */}
        <section
          className="self-stretch flex flex-col justify-start items-start gap-5"
          aria-labelledby="items-section-title"
        >
          {/* 요청 품목 n개 */}
          <button
            className="inline-flex justify-start items-center gap-1.5 cursor-pointer"
            onClick={() => setIsItemsExpanded(!isItemsExpanded)}
            aria-expanded={isItemsExpanded}
            aria-controls="items-content"
            aria-label={`요청 품목 ${orderRequest.products?.length || 0}개 ${isItemsExpanded ? "접기" : "펼치기"}`}
          >
            <div className="justify-center text-primary-950 text-base/[20px] tracking-tight font-bold">요청 품목</div>
            <div className="justify-center  text-primary-950 text-base/[20px] tracking-tight  font-normal">
              총 {orderRequest.products?.length || 0}개
            </div>
            <ArrowIconSvg
              direction={isItemsExpanded ? "up" : "down"}
              className="w-5 h-5 text-primary-950"
              aria-hidden="true"
            />
          </button>
          {/* 아이템 리스트  */}
          <div
            id="items-content"
            aria-hidden={!isItemsExpanded}
            className="w-full rounded-sm sm:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]"
          >
            {isItemsExpanded && (
              <div className="flex flex-col gap-[20px]" role="list" aria-label="주문 상품 목록">
                {orderRequest.products?.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-full items-center gap-3 border-b pb-[20px] border-primary-100"
                    role="listitem"
                  >
                    {/* 상품이미지 */}
                    <div className="w-[72px] h-[72px] bg-primary-50 rounded-xs sm:bg-white flex justify-center items-center flex-shrink-0">
                      {typeof item.imageUrl === "string" && (
                        <div className="relative w-[75%] h-[75%]">
                          <Image
                            src={item.imageUrl}
                            alt={`${item.productName} 상품 이미지`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    {/* 아이템이름, 가격, 수량 */}
                    <div className="flex flex-col w-full justify-center items-start gap-[12px]">
                      {/* 이름+가격 */}
                      <div className="flex flex-col justify-center items-start gap-1">
                        <h3 className="text-primary-950 text-sm/[17px] tracking-tight sm:text-base/[20px] sm:font-medium">
                          {item.productName}
                        </h3>
                        <div className="text-primary-950 text-sm/[17px] tracking-tight sm:text-base/[20px] font-bold">
                          {formatPrice(item.price)}원
                        </div>
                      </div>

                      {/* 모바일:수량+가격 */}
                      <div className="flex w-full items-center justify-between">
                        <div className=" text-primary-500 text-[13px]/[16px] sm:text-base/[20px] tracking-tight font-bold">
                          수량 {item.quantity}개
                        </div>
                        <div className="sm:hidden text-center  text-primary-700 text-base/[20px] tracking-tight font-extrabold">
                          {formatPrice(item.price * item.quantity)}원
                        </div>
                      </div>
                    </div>
                    {/* 가격 */}
                    <div className="hidden sm:block text-center  text-primary-700 text-xl/[32px] tracking-tight font-extrabold">
                      {formatPrice(item.price * item.quantity)}원
                    </div>
                  </div>
                ))}

                {/* Order Amount Info */}
                <div className="self-stretch flex flex-col gap-2 sm:gap-3" role="region" aria-label="주문 금액 정보">
                  <div className="flex justify-between items-center">
                    <div className="text-center justify-center text-gray-700 text-xs sm:text-sm md:text-base font-bold">
                      주문금액
                    </div>
                    <div className="text-center justify-center text-gray-700 text-xs sm:text-sm md:text-base font-bold">
                      {formatPrice(calculatedTotal)}원
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center justify-center text-gray-700 text-xs sm:text-sm md:text-base font-bold">
                      배송비
                    </div>
                    <div className="text-center justify-center text-gray-700 text-xs sm:text-sm md:text-base font-bold">
                      {formatPrice(shippingFee)}원
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center justify-center text-[--color-primary-800] text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                      총 주문금액
                    </div>
                    <div className="text-center justify-center text-[--color-primary-800] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold">
                      {formatPrice(finalTotal)}원
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 요청 정보 섹션 */}
        <section className="self-stretch flex flex-col justify-start items-start" aria-labelledby="request-info-title">
          <div className="self-stretch px-2 py-3 sm:py-3.5 border-b border-neutral-800 inline-flex justify-start items-center gap-2">
            <h2
              id="request-info-title"
              className="text-center justify-center text-neutral-800 text-xs sm:text-sm md:text-base font-extrabold"
            >
              요청 정보
            </h2>
          </div>
          <div
            className="self-stretch flex flex-col justify-center items-start"
            role="region"
            aria-label="요청 상세 정보"
          >
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 h-10 sm:h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal">요청인</div>
              </div>
              <div className="flex-1 h-10 sm:h-12 px-2 sm:px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold">
                  {orderRequest.requester || "-"}
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 h-10 sm:h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal">
                  요청 날짜
                </div>
              </div>
              <div className="flex-1 h-10 sm:h-12 px-2 sm:px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold">
                  {orderRequest.createdAt ? formatDate(orderRequest.createdAt) : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start">
            <div className="w-24 sm:w-32 md:w-36 self-stretch px-2 py-3 sm:py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
              <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal">
                요청 메시지
              </div>
            </div>
            <div className="flex-1 p-3 sm:p-4 border-b border-neutral-200 flex justify-start items-center gap-2">
              <div className="flex-1 justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold leading-snug">
                {orderRequest.requestMessage || "요청 메시지가 없습니다."}
              </div>
            </div>
          </div>
        </section>

        {/* 예산 정보 */}
        <section className="self-stretch flex flex-col justify-start items-start" aria-labelledby="budget-info-title">
          <div className="self-stretch px-2 py-3 sm:py-3.5 border-b border-neutral-800 inline-flex justify-start items-center gap-2">
            <h2
              id="budget-info-title"
              className="text-center justify-center text-neutral-800 text-xs sm:text-sm md:text-base font-extrabold"
            >
              예산 정보
            </h2>
          </div>
          <div
            className="self-stretch flex flex-col justify-center items-start"
            role="region"
            aria-label="예산 상세 정보"
          >
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 h-10 sm:h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal">
                  이번 달 지출액
                </div>
              </div>
              <div className="flex-1 h-10 sm:h-12 px-2 sm:px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold">
                  {formatPrice(currentMonthExpense)}원
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 h-10 sm:h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal">
                  이번 달 남은 예산
                </div>
              </div>
              <div className="flex-1 h-10 sm:h-12 px-2 sm:px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold">
                  {formatPrice(remainingBudget)}원
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start">
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="w-24 sm:w-32 md:w-36 self-stretch px-2 py-3 sm:py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
                <div className="text-center justify-center text-neutral-800 text-xs sm:text-sm font-normal">
                  구매 후 예산
                </div>
              </div>
              <div className="flex-1 self-stretch p-3 sm:p-4 border-b border-neutral-200 flex justify-start items-start gap-2">
                <div className="text-center justify-center text-zinc-800 text-xs sm:text-sm md:text-base font-bold">
                  {formatPrice(budgetAfterPurchase)}원
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Action Buttons Section */}
      <section
        className="flex w-full justify-center gap-4 sm:gap-5 py-6 md:py-0 mt-[20px] md:mt-[70px] md:items-center"
        role="region"
        aria-label="주문 요청 처리 버튼"
      >
        <Button
          type="white"
          label={updateOrderMutation.isPending ? "처리중..." : "요청 반려"}
          className="w-full h-16 md:max-w-[300px]"
          onClick={handleReject}
          disabled={updateOrderMutation.isPending}
          aria-label={updateOrderMutation.isPending ? "처리 중입니다" : "구매 요청을 반려합니다"}
        />
        <Button
          type="primary"
          label={updateOrderMutation.isPending ? "처리중..." : "요청 승인"}
          className="w-full h-16 md:max-w-[300px]"
          onClick={handleApprove}
          disabled={updateOrderMutation.isPending}
          aria-label={updateOrderMutation.isPending ? "처리 중입니다" : "구매 요청을 승인합니다"}
        />
      </section>
    </div>
  );
}
