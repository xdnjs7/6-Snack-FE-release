import { useModal } from "@/providers/ModalProvider";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import Button from "../ui/Button";
import TextArea from "./TextArea";
import { twMerge } from "tailwind-merge";
import { TOrder } from "@/types/order.types";
import { updateOrderStatus } from "@/lib/api/orderManage.api";

type TOrderManageModalProps = {
  type: "reject" | "approve";
  order: TOrder;
  onClick: () => void;
};

export default function OrderManageModal({ type, order, onClick }: TOrderManageModalProps) {
  const { closeModal } = useModal();
  const [adminMessage, setAdminMessage] = useState("");

  return (
    <div
      className={twMerge(
        type === "approve" ? "sm:max-h-[976px]" : "sm:max-h-[882px]",
        "fixed inset-0 bg-white overflow-auto scrollbar-hide shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)] sm:w-[600px] sm:h-full sm:top-1/2 sm:left-1/2 sm:translate-[-50%] sm:py-[40px] sm:px-[60px]",
      )}
    >
      <div className="flex justify-center items-center h-[54px] py-[16px] px-[8px] sm:p-0 sm:h-auto">
        <p className="flex justify-center items-center w-[375px] font-bold text-[18px]/[22px] tracking-tight text-[#1f1f1f]">
          {type === "approve" ? "구매 요청 승인" : "구매 요청 반려"}
        </p>
      </div>

      <div className="flex flex-col items-center p-[24px] pt-[20px] sm:p-0 sm:pt-[32px]">
        <div className="flex flex-col w-full max-w-[480px] gap-[32px] mb-[20px]">
          <div className="flex justify-start items-center gap-[12px]">
            <p className="flex justify-center items-center w-[32px] h-[32px] rounded-full py-[10px] px-[9.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight text-black">
              {order.requester.slice(0, 1)}
            </p>
            <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">{order.requester}</p>
          </div>

          <div className="flex justify-start items-center gap-[6px]">
            <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">요청 품목</p>
            <p className="font-normal text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px]">
              총 {order.products.length}개
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full max-w-[480px] mb-[24px] gap-[32px] sm:mb-[36px]">
          <div className="flex flex-col justify-center items-center w-full p-[20px] pb-[30px] gap-[20px] rounded-[2px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]">
            <div className="flex flex-col items-center overflow-auto scrollbar w-full h-[160px] sm:h-[180px]">
              {order.products.map((product, i) => {
                return (
                  <div
                    key={`${product}_${i}`}
                    className="flex justify-between items-center w-full py-[20px] pr-[8px] border-b-1 border-primary-100"
                  >
                    <div className="flex justify-center items-center gap-[12px] sm:gap-[20px]">
                      <div className="flex justify-center items-center w-[40px] h-[40px]">
                        <div className="relative w-[20px] h-[34.71px]">
                          <Image src={product.imageUrl} alt="상품" fill className="object-contain" />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-start gap-[4px] sm:gap-[10px]">
                        <p className="font-normal text-[14px]/[17px] tracking-tight text-primary-900 sm:font-medium sm:text-[16px]/[20px]">
                          {product.productName}
                        </p>
                        <p className="font-bold text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px]">
                          {product.price.toLocaleString("ko-KR")}원
                        </p>
                      </div>
                    </div>

                    <p className="hidden sm:block sm:font-bold sm:text-[16px]/[20px] sm:tracking-normal text-primary-500">
                      수량 {product.quantity}개
                    </p>

                    <div className="flex flex-col justify-center items-start gap-[4px]">
                      <p className="font-bold text-[13px]/[16px] tracking-tight text-primary-500 sm:hidden">
                        수량 {product.quantity}개
                      </p>
                      <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700 sm:font-extrabold sm:text-[20px]/[32px] sm:tracking-normal">
                        {(product.price * product.quantity).toLocaleString("ko-KR")}원
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col justify-center items-center w-full gap-[10px]">
              <div className="flex justify-between items-center w-full px-[8px]">
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700">주문금액</p>
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700">
                  {order.totalPrice.toLocaleString("ko-KR")}원
                </p>
              </div>

              <div className="flex justify-between items-center w-full px-[8px]">
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700">배송비</p>
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700">3,000원</p>
              </div>

              <div className="flex justify-between items-center w-full px-[8px]">
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950 sm:text-[18px]/[22px]">
                  총 주문금액
                </p>
                <p className="font-extrabold text-[20px]/[25px] tracking-tight text-primary-950 sm:text-[24px]/[30px]">
                  {(order.totalPrice + 3000).toLocaleString("ko-KR")}원
                </p>
              </div>
            </div>
          </div>

          {type === "approve" && (
            <>
              <div className="w-full outline-1 outline-primary-100"></div>

              <div className="flex justify-between items-center w-full">
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950 sm:text-[18px]/[22px]">
                  남은 예산 금액
                </p>
                <p className="font-extrabold text-[20px]/[25px] tracking-tight text-primary-950 sm:text-[24px]/[30px]">
                  {(order.budget.currentMonthBudget - order.budget.currentMonthExpense).toLocaleString("ko-KR")}원
                </p>
              </div>
            </>
          )}

          <div className="flex flex-col justify-center items-start w-full gap-[12px]">
            <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">
              {type === "approve" ? "승인 메시지" : "반려 메시지"}
            </p>
            <TextArea
              className="w-full max-w-[480px] h-[140px] p-[24px] rounded-[2px] resize-none placeholder:font-normal placeholder:text-[16px]/[26px] placeholder:tracking-tight placeholder:text-[#929292]"
              placeholder={type === "approve" ? "승인 메시지를 입력해주세요" : "반려 메시지를 입력해주세요"}
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-full max-w-[480px] gap-[20px]">
          <Button
            onClick={() => closeModal()}
            type="white"
            label="취소"
            className="flex justify-center items-center w-full min-w-[153.5px] max-w-[230px] h-[64px] py-[12px] px-[16px] font-bold"
          />
          <Button
            onClick={async () => {
              try {
                await updateOrderStatus({
                  orderId: order.id,
                  status: type === "approve" ? "APPROVED" : "REJECTED",
                  adminMessage,
                });

                onClick();
                closeModal();
              } catch (error) {
                alert("실패!");
              }
            }}
            type="black"
            label={type === "approve" ? "승인하기" : "반려하기"}
            className="flex justify-center items-center w-full min-w-[153.5px] max-w-[230px] h-[64px] py-[12px] px-[16px] font-bold"
          />
        </div>
      </div>
    </div>
  );
}
