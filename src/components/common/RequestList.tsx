import React from "react";
import { useRouter } from "next/navigation";
import Mobile from "./Mobile";
import Button from "../ui/Button";
import { formatDate } from "@/lib/utils/formatDate.util";
import { formatPrice } from "@/lib/utils/formatPrice.util";
import { TOrderSummary } from "@/types/order.types";

type TRequestListProps = {
  orderRequests: TOrderSummary[];
  onClickReject: (order: TOrderSummary) => void;
  onClickApprove: (order: TOrderSummary) => void;
};

export default function RequestList({ orderRequests, onClickReject, onClickApprove }: TRequestListProps) {
  const router = useRouter();

  const handleProductNameClick = (orderId: string, status: string) => {
    router.push(`/order-manage/${orderId}?status=${status}`);
  };

  return (
    <section aria-label="주문 요청 목록" role="region">
      {/* PC 테이블 헤더 */}
      <header className="flex justify-center w-full" role="banner" aria-label="주문 요청 목록 헤더">
        <div
          className="hidden sm:flex justify-between items-center w-full max-w-[1352px] h-[100px] border-b border-neutral-200 md:px-[40px]"
          role="row"
          aria-label="테이블 헤더"
        >
          <div
            className="font-bold text-primary-500 text-base w-[100px] md:w-[142px]"
            role="columnheader"
            aria-label="구매 요청일"
          >
            구매 요청일
          </div>
          <div
            className="font-bold text-primary-500 text-base w-[140px] md:w-[360px]"
            role="columnheader"
            aria-label="상품 정보"
          >
            상품 정보
          </div>
          <div
            className="font-bold text-primary-500 text-base w-[100px] md:w-[142px]"
            role="columnheader"
            aria-label="주문 금액"
          >
            주문 금액
          </div>
          <div
            className="font-bold text-primary-500 text-base w-[108px] md:w-[134px]"
            role="columnheader"
            aria-label="요청인"
          >
            요청인
          </div>
          <div
            className="font-bold text-primary-500 text-base w-[168px] h-[40px] flex items-center"
            role="columnheader"
            aria-label="비고"
          >
            비고
          </div>
        </div>
      </header>

      <main role="main" aria-label="주문 요청 목록 본문">
        {orderRequests.map((request) => (
          <article
            key={request.id}
            className="border-b-[1px] border-primary-100"
            role="article"
            aria-label={`${request.productName} 주문 요청`}
          >
            {/* 모바일 뷰 */}
            <Mobile>
              <div className="border-b-[1px] border-primary-100">
                <div className="flex flex-col min-w-[327px] h-[144px] gap-[20px] my-[24px]">
                  <header className="flex flex-col justify-center gap-[10px]">
                    <div className="flex justify-between items-center pr-[4px]">
                      <time
                        className="font-bold text-[14px]/[17px] tracking-tight"
                        dateTime={request.createdAt}
                        aria-label="구매 요청일"
                      >
                        {formatDate(request.createdAt)}
                      </time>
                      <div className="flex gap-[6px] items-center">
                        <div
                          className="flex justify-center items-center w-[24px] h-[24px] rounded-full py-[6px] px-[5.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight"
                          role="img"
                          aria-label={`${request.requester}의 프로필 이미지`}
                        >
                          {request.requester.slice(0, 1)}
                        </div>
                        <span
                          className="font-normal text-[14px]/[17px] tracking-tight text-primary-950 truncate"
                          aria-label="요청인"
                        >
                          {request.requester}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                      <button
                        className="font-normal text-[14px]/[17px] tracking-tight text-blue-600 cursor-pointer hover:text-blue-800 truncate text-left inline-block w-fit"
                        onClick={() => handleProductNameClick(request.id, request.status.toLowerCase())}
                        aria-label={`${request.productName} 상품 상세보기`}
                      >
                        {request.productName}
                      </button>
                      <div
                        className="font-extrabold text-[20px]/[25px] tracking-tight text-primary-950"
                        aria-label="주문 금액"
                      >
                        {formatPrice(request.totalPrice)}원
                      </div>
                    </div>
                  </header>
                  <footer className="w-full justify-between flex gap-[8px]">
                    <Button
                      type="white"
                      label="반려"
                      onClick={() => onClickReject(request)}
                      className="w-full flex justify-center items-center border-[1px] border-primary-300 min-w-[160px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                      aria-label={`${request.productName} 주문 요청 반려`}
                    />
                    <Button
                      type="black"
                      label="승인"
                      onClick={() => onClickApprove(request)}
                      className="w-full flex justify-center items-center min-w-[160px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                      aria-label={`${request.productName} 주문 요청 승인`}
                    />
                  </footer>
                </div>
              </div>
            </Mobile>

            {/* 데스크톱 뷰 */}
            <div className="flex justify-center w-full">
              <div
                className="hidden sm:flex justify-between items-center w-full max-w-[1352px] h-24 md:px-[40px] border-b border-neutral-200"
                role="row"
                aria-label="주문 요청 행"
              >
                <div
                  className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[100px] md:w-[142px]"
                  role="cell"
                  aria-label="구매 요청일"
                >
                  {formatDate(request.createdAt)}
                </div>
                <button
                  className="font-normal flex text-[16px]/[20px] tracking-tight text-blue-600 underline w-[140px] md:w-[360px] truncate cursor-pointer hover:text-blue-800"
                  onClick={() => handleProductNameClick(request.id, request.status.toLowerCase())}
                  role="cell"
                  aria-label="상품 정보"
                >
                  {request.productName}
                </button>
                <div
                  className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[100px] md:w-[142px]"
                  role="cell"
                  aria-label="주문 금액"
                >
                  {formatPrice(request.totalPrice)}원
                </div>
                <div className="flex justify-center items-center gap-[12px]" role="cell" aria-label="요청인">
                  <div
                    className="flex justify-center items-center w-[32px] h-[32px] rounded-full py-[10px] px-[9.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight"
                    role="img"
                    aria-label={`${request.requester}의 프로필 이미지`}
                  >
                    {request.requester.slice(0, 1)}
                  </div>
                  <span className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[64px] md:w-[90px] truncate">
                    {request.requester}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-[8px]" role="cell" aria-label="비고">
                  <Button
                    type="white"
                    label="반려"
                    onClick={() => onClickReject(request)}
                    className="flex justify-center items-center border-[1px] border-primary-300 w-[80px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                    aria-label={`${request.productName} 주문 요청 반려`}
                  />
                  <Button
                    type="black"
                    label="승인"
                    onClick={() => onClickApprove(request)}
                    className="flex justify-center items-center w-[80px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                    aria-label={`${request.productName} 주문 요청 승인`}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </main>
    </section>
  );
}
