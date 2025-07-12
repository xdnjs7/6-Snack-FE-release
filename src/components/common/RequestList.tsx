import React from "react";
import Mobile from "./Mobile";

const data = {
  createdAt: "2024. 07. 04",
  product: "코카콜라 제로 외 1건",
  price: "1,900원",
  requester: "김스낵",
};

export default function RequestList() {
  return (
    <>
      <Mobile>
        <div className="border-b-[1px] border-primary-100">
          <div className="flex flex-col w-[327px] h-[144px] gap-[20px] my-[24px]">
            <div className="flex flex-col justify-center gap-[10px]">
              <div className="flex justify-between items-center pr-[4px]">
                <div className="font-bold text-[14px]/[17px] tracking-tight">{data.createdAt}</div>
                <div className="flex gap-[6px] items-center">
                  <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full py-[6px] px-[5.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight">
                    {data.requester.slice(0, 1)}
                  </div>
                  <div className="font-normal text-[14px]/[17px] tracking-tight text-primary-950">{data.requester}</div>
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="font-normal text-[14px]/[17px] tracking-tight text-primary-950">{data.product}</div>
                <div className="font-extrabold text-[20px]/[25px] tracking-tight text-primary-950">{data.price}</div>
              </div>
            </div>
            <div className="flex gap-[8px]">
              {/* @De-cal TODO: 추후 Button 컴포넌트 완성되면 대체 */}
              <button className="flex justify-center items-center border-[1px] border-primary-300 w-[160px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight">
                반려
              </button>
              <button className="flex justify-center items-center bg-primary-950 text-white w-[160px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight ">
                승인
              </button>
            </div>
          </div>
        </div>
      </Mobile>
      <div className="flex justify-center w-full">
        <div className="hidden sm:flex justify-between items-center w-full max-w-[1352px] h-[100px] md:px-[40px]">
          <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[100px] md:w-[142px]">
            {data.createdAt}
          </div>
          <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[140px] md:w-[360px]">
            {data.product}
          </div>
          <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[100px] md:w-[142px]">
            {data.price}
          </div>
          <div className="flex justify-center items-center gap-[12px]">
            <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full py-[10px] px-[9.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight">
              {data.requester.slice(0, 1)}
            </div>
            <div className="font-normal text-[16px]/[20px] tracking-tight text-primary-950 w-[64px] md:w-[90px]">
              {data.requester}
            </div>
          </div>
          <div className="flex justify-center items-center gap-[8px]">
            {/* @De-cal TODO: 추후 Button 컴포넌트 완성되면 대체 */}
            <button className="flex justify-center items-center border-[1px] border-primary-300 w-[80px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight">
              반려
            </button>
            <button className="flex justify-center items-center bg-primary-950 text-white w-[80px] h-[40px] py-[10px] px-[20px] font-normal text-[16px]/[20px] tracking-tight ">
              승인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
