import React from "react";

export default function ProductBasicInfo() {
  return (
    <div className="inline-flex flex-col justify-start items-start gap-2">
      <div className="flex flex-col sm:flex-row justify-center items-start gap-2">
        <div className="text-black text-lg/[22px] font-normal tracking-tight">코카콜라 제로</div>
        <div className="text-secondary-500 text-sm/[17px] font-bold tracking-tight">29회 구매</div>
      </div>
      <div className="text-black text-lg/[22px] font-extrabold tracking-tight">2,000원</div>
    </div>
  );
}
