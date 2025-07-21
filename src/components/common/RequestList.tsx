import React, { Fragment } from "react";
import Mobile from "./Mobile";
import Button from "../ui/Button";
import DateFormat from "@/lib/utils/DateFormat.util";

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
  onClickReject: () => void;
  onClickApprove: () => void;
};

export default function RequestList({ orderRequests, onClickReject, onClickApprove }: TRequestListProps) {
  return (
    <>
      {orderRequests.map((request, i) => (
        <Fragment key={`${request}_${i}`}>
          <Mobile>
            <div className="border-b-[1px] border-primary-100">
              <div className="flex flex-col min-w-[327px] h-[144px] gap-[20px] my-[24px]">
                <div className="flex flex-col justify-center gap-[10px]">
                  <div className="flex justify-between items-center pr-[4px]">
                    <div className="font-bold text-[14px]/[17px] tracking-tight">{DateFormat(request.createdAt)}</div>
                    <div className="flex gap-[6px] items-center">
                      <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full py-[6px] px-[5.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight">
                        {request.requester.slice(0, 1)}
                      </div>
                      <div className="font-normal text-[14px]/[17px] tracking-tight text-primary-950">
                        {request.requester}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <div className="font-normal text-[14px]/[17px] tracking-tight text-primary-950">
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
                    onClick={onClickReject}
                    className="w-full flex justify-center items-center border-[1px] border-primary-300 min-w-[160px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                  />
                  <Button
                    type="black"
                    label="승인"
                    onClick={onClickApprove}
                    className="w-full flex justify-center items-center bg-primary-950 text-white min-w-[160px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                  />
                </div>
              </div>
            </div>
          </Mobile>
          <div className="flex justify-center w-full">
            <div className="hidden sm:flex justify-between items-center w-full max-w-[1352px] h-[100px] md:px-[40px]">
              <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[100px] md:w-[142px]">
                {request.createdAt}
              </div>
              <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[140px] md:w-[360px]">
                {request.productName}
              </div>
              <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[100px] md:w-[142px]">
                {request.totalPrice.toLocaleString("ko-KR")}원
              </div>
              <div className="flex justify-center items-center gap-[12px]">
                <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full py-[10px] px-[9.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight">
                  {request.requester.slice(0, 1)}
                </div>
                <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[64px] md:w-[90px]">
                  {request.requester}
                </div>
              </div>
              <div className="flex justify-center items-center gap-[8px]">
                <Button
                  type="white"
                  label="반려"
                  onClick={onClickReject}
                  className="flex justify-center items-center border-[1px] border-primary-300 w-[80px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                />
                <Button
                  type="black"
                  label="승인"
                  onClick={onClickApprove}
                  className="flex justify-center items-center bg-primary-950 text-white w-[80px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight"
                />
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}
