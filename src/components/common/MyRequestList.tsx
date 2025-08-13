"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils/formatPrice.util";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useModal } from "@/providers/ModalProvider";
import Link from "next/link";

type TRequestListItemProps = {
  requestDate: string;
  productName: string;
  price: number;
  status: "대기중" | "요청반려" | "요청완료" | "요청취소";
  orderId: number;
  onRequestCancel?: () => void;
};

export default function RequestListItem({
  requestDate,
  productName,
  price,
  status,
  orderId,
  onRequestCancel,
}: TRequestListItemProps) {
  const { openModal, closeModal } = useModal();

  const getBadgeType = (): "pending" | "approved" | "rejected" => {
    switch (status) {
      case "대기중":
        return "pending";
      case "요청완료":
        return "approved";
      case "요청반려":
        return "rejected";
      default:
        return "pending";
    }
  };

  const showCancelButton = status === "대기중" && onRequestCancel;

  const handleCancelClick = () => {
    openModal(
      <ConfirmationModal
        isOpen={true}
        onCancel={closeModal}
        onDelete={() => {
          closeModal();
          onRequestCancel?.();
        }}
        productName={productName}
        modalTitle="요청을 취소하시겠어요?"
        modalDescription="구매 요청 취소 후에는 복구할 수 없습니다."
        confirmButtonText="요청 취소"
        cancelButtonText="더 생각해볼게요"
      />,
    );
  };

  return (
    <div className="w-full border-b border-primary-100">
      {/* 모바일 */}
      <div className="flex flex-col gap-5 py-7 sm:hidden">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm font-bold text-primary-950">{requestDate}</div>
          <div className="w-16">
            <Badge type={getBadgeType()} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Link href={`/my/order-list/${orderId}`} className="text-blue-600">
            {productName}
          </Link>
          <div className="text-sm text-primary-950">{formatPrice(price)}원</div>
        </div>

        {showCancelButton && (
          <button
            onClick={handleCancelClick}
            className="w-full px-5 py-3 text-xs text-primary-900 bg-white outline outline-1 outline-primary-300 hover:bg-primary-100 transition-colors duration-200 cursor-pointer"
          >
            요청 취소
          </button>
        )}
      </div>

      {/* 태블릿 & 데스크탑 */}
      <div className="hidden sm:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] items-center w-full h-24 md:gap-10 lg:gap-20 border-b border-primary-100">
        <div className="min-w-[90px] text-sm md:text-base text-primary-950">{requestDate}</div>
        <Link href={`/my/order-list/${orderId}`} className="text-blue-600">
          {productName}
        </Link>
        <div className="min-w-[90px] text-sm md:text-base text-primary-950">{formatPrice(price)}원</div>
        <div className="flex justify-center w-18">
          <Badge type={getBadgeType()} />
        </div>

        {showCancelButton ? (
          <div className="flex">
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 md:px-5 md:py-3 bg-white outline outline-1 outline-primary-300 text-primary-900 text-sm md:text-base hover:bg-primary-100 transition-colors duration-200 cursor-pointer"
            >
              요청 취소
            </button>
          </div>
        ) : (
          <div /> // 비고 영역 유지
        )}
      </div>
    </div>
  );
}
