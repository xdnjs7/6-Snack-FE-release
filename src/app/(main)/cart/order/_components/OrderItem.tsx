import React from "react";
import Image from "next/image";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import img_fanta from "@/assets/images/img_fanta.webp";

const order = {
  id: 5,
  userId: "7f0332aa-15de-4fe0-a3ac-ca6c07fccf6a",
  approver: null,
  adminMessage: "관리자에게 남길 메시지",
  requestMessage: "요청 메시지",
  totalPrice: 4500,
  createdAt: "2025-07-15T07:43:16.993Z",
  updatedAt: "2025-07-15T07:43:16.993Z",
  status: "PENDING",
  requester: "관리자",
  products: [
    {
      id: 13,
      productName: "오리지널 포카칩",
      price: 1500,
      imageUrl: img_fanta,
      quantity: 2,
    },
    {
      id: 14,
      productName: "코카콜라 500ml",
      price: 1500,
      imageUrl: img_coke_zero,
      quantity: 1,
    },
  ],
  budget: {
    currentMonthBudget: 50000,
    currentMonthExpense: 30000,
  },
};

export default function OrderItem() {
  return (
    <>
      <div className="flex justify-start items-center gap-[6px] mt-[40px] sm:mt-[80px] sm:mb-[20px]">
        <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">요청 품목</p>
        <p className="font-normal text-[16px]/[20px] tracking-tight text-primary-950">총 {order.products.length}개</p>
      </div>

      <div className="flex flex-col justify-center items-center w-full gap-[20px] sm:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] sm:py-[40px] sm:px-[30px] sm:rounded-[2px] md:px-[60px]">
        <div className="flex flex-col items-center w-full">
          {order.products.map((product, i) => {
            return (
              <div
                key={`${product}_${i}`}
                className="flex justify-between items-center w-full py-[20px] pr-[8px] border-b-1 border-primary-100"
              >
                <div className="flex justify-start items-center w-full gap-[12px] sm:gap-[20px]">
                  <div className="flex justify-center items-center min-w-[72px] h-[72px] bg-primary-50 sm:min-w-[140px] sm:h-[140px] sm:bg-transparent">
                    <div className="relative w-[29px] h-[50px] sm:w-[59px] sm:h-[102px]">
                      <Image src={product.imageUrl} alt="상품" fill className="object-contain" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center w-full gap-[12px] sm:flex-row sm:justify-between">
                    <div className="flex flex-col justify-center items-start w-full gap-[4px] sm:gap-[10px] sm:w-auto">
                      <p className="font-normal text-[14px]/[17px] tracking-tight text-primary-900 sm:font-medium sm:text-[16px]/[20px]">
                        {product.productName}
                      </p>
                      <p className="font-bold text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px]">
                        {product.price.toLocaleString("ko-KR")}원
                      </p>
                      <p className="hidden sm:block sm:font-bold sm:text-[16px]/[20px] sm:tracking-normal sm:text-primary-500 sm:mt-[20px]">
                        수량 {product.quantity}개
                      </p>
                    </div>

                    <div className="flex justify-between items-center w-full gap-[4px] sm:w-auto">
                      <p className="font-normal text-[13px]/[16px] tracking-tight text-[#6b6b6b] sm:hidden">
                        수량 {product.quantity}개
                      </p>
                      <p className="font-extrabold text-[16px]/[20px] tracking-tight text-primary-700 sm:text-[20px]/[32px] sm:tracking-normal">
                        {(product.price * product.quantity).toLocaleString("ko-KR")}원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col justify-center items-center w-full gap-[10px]">
          <div className="flex justify-between items-center w-full">
            <p className="font-bold text-[14px]/[17px] tracking-tight text-primary-700 sm:text-[16px]/[20px]">
              주문금액
            </p>
            <p className="font-bold text-[14px]/[17px] tracking-tight text-primary-700 sm:text-[16px]/[20px]">
              {order.totalPrice.toLocaleString("ko-KR")}원
            </p>
          </div>

          <div className="flex justify-between items-center w-full">
            <p className="font-bold text-[14px]/[17px] tracking-tight text-primary-700 sm:text-[16px]/[20px]">배송비</p>
            <p className="font-bold text-[14px]/[17px] tracking-tight text-primary-700 sm:text-[16px]/[20px]">
              3,000원
            </p>
          </div>

          <div className="flex justify-between items-center w-full">
            <p className="font-bold text-[18px]/[22px] tracking-tight text-primary-950">총 주문금액</p>
            <p className="font-extrabold text-[18px]/[22px] tracking-tight text-primary-950 sm:text-[24px]/[30px]">
              {(order.totalPrice + 3000).toLocaleString("ko-KR")}원
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
