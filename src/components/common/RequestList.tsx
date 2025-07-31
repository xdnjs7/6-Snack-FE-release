import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import Mobile from "./Mobile";
import Button from "../ui/Button";
import { formatDate } from "@/lib/utils/formatDate.util";

type TRequestListProps = {
  orderRequests: {
    id: number;
    userId: string;
    approver: null;
    adminMessage: string;
    requestMessage: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    requester: string;
    productName: string;
  }[];
  onClickReject: (order: TRequestListProps["orderRequests"][0]) => void;
  onClickApprove: (order: TRequestListProps["orderRequests"][0]) => void;
  // 이번달 남은 예산 추가하기이잉
  remainingBudget?: number;
};

export default function RequestList({
  orderRequests,
  onClickReject,
  onClickApprove,
  remainingBudget,
}: TRequestListProps) {
  const router = useRouter();

  const handleProductNameClick = (orderId: number, status: string) => {
    router.push(`/order-manage/${orderId}?status=${status}`);
  };

  return (
    <>
      {/* PC 테이블 헤더 */}
      <div className="flex justify-center w-full ">
        <div className="hidden sm:flex justify-between items-center w-full max-w-[1352px] h-[100px] border-b border-neutral-200 md:px-[40px]">
          <div className="font-bold text-primary-500 text-base w-[100px] md:w-[142px]">구매 요청일</div>
          <div className="font-bold text-primary-500 text-base w-[140px] md:w-[360px]">상품 정보</div>
          <div className="font-bold text-primary-500 text-base w-[100px] md:w-[142px]">주문 금액</div>
          <div className="font-bold text-primary-500 text-base w-[108px] md:w-[134px]">요청인</div>
          <div className="font-bold text-primary-500 text-base w-[168px] h-[40px] flex items-center">비고</div>
        </div>
      </div>
      {orderRequests.map((request) => (
        <Fragment key={request.id}>
          <Mobile>
            <div className="border-b-[1px] border-primary-100">
              <div className="flex flex-col min-w-[327px] h-[144px] gap-[20px] my-[24px]">
                <div className="flex flex-col justify-center gap-[10px]">
                  <div className="flex justify-between items-center pr-[4px]">
                    <div className="font-bold text-[14px]/[17px] tracking-tight">{formatDate(request.createdAt)}</div>
                    <div className="flex gap-[6px] items-center">
                      <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full py-[6px] px-[5.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight">
                        {request.requester.slice(0, 1)}
                      </div>
                      <div className="font-normal text-[14px]/[17px] tracking-tight text-primary-950 truncate">
                        {request.requester}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <div
                      className="font-normal text-[14px]/[17px] tracking-tight text-blue-600 cursor-pointer hover:text-blue-800 truncate"
                      onClick={() => handleProductNameClick(request.id, request.status.toLowerCase())}
                    >
                      {request.productName}
                    </div>
                    <div className="font-extrabold text-[20px]/[25px] tracking-tight text-primary-950">
                      {request.totalPrice.toLocaleString("ko-KR")}원
                    </div>
                  </div>
                </div>
                <div className="w-full justify-between flex gap-[8px]">
                  <Button
                    type="white"
                    label="반려"
                    onClick={() => onClickReject(request)}
                    className="w-full flex justify-center items-center border-[1px] border-primary-300 min-w-[160px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                  />
                  <Button
                    type={
                      remainingBudget !== undefined && remainingBudget < request.totalPrice ? "whiteDisabled" : "black"
                    }
                    label="승인"
                    onClick={() => onClickApprove(request)}
                    className="w-full flex justify-center items-center min-w-[160px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                  />
                </div>
              </div>
            </div>
          </Mobile>
          <div className="flex justify-center w-full">
            <div className="hidden sm:flex justify-between items-center w-full max-w-[1352px] h-24 md:px-[40px] border-b border-neutral-200">
              <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[100px] md:w-[142px]">
                {formatDate(request.createdAt)}
              </div>
              <div
                className="font-normal text-[16px]/[20px] tracking-tight text-blue-600 underline w-[140px] md:w-[360px] truncate cursor-pointer hover:text-blue-800"
                onClick={() => handleProductNameClick(request.id, request.status.toLowerCase())}
              >
                {request.productName}
              </div>
              <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[100px] md:w-[142px]">
                {request.totalPrice.toLocaleString("ko-KR")}원
              </div>
              <div className="flex justify-center items-center gap-[12px]">
                <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full py-[10px] px-[9.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight">
                  {request.requester.slice(0, 1)}
                </div>
                <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[64px] md:w-[90px] truncate">
                  {request.requester}
                </div>
              </div>
              <div className="flex justify-center items-center gap-[8px]">
                <Button
                  type="white"
                  label="반려"
                  onClick={() => onClickReject(request)}
                  className="flex justify-center items-center border-[1px] border-primary-300 w-[80px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                />
                <Button
                  type={
                    remainingBudget !== undefined && remainingBudget < request.totalPrice ? "whiteDisabled" : "black"
                  }
                  label="승인"
                  onClick={() => onClickApprove(request)}
                  className="flex justify-center items-center w-[80px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                />
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}
