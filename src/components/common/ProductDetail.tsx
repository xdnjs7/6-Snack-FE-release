import React from "react";
import Mobile from "./Mobile";
import Tablet from "./Tablet";
import Desktop from "./Desktop";
import Image from "next/image";
import ChevronIcon from "@/svg/ChevronIcon";

export default function ProductDetail() {
  return (
    <div>
      ProductDetail // Mobile
      <Mobile>
        {/* div wrapper */}
        <div className="flex flex-column justify-start items-center px-6 gap-7.5">
          {/* 음료 */}
          <div className="self-stretch pt-3.5 pb-2.5 inline-flex justify-start items-center gap-10">
            <div className="flex justify-start items-center gap-1">
              <p>음료</p>
              <div>
                <ChevronIcon direction="right" color="var(--color-primary-100)"></ChevronIcon>
              </div>
            </div>
          </div>

          {/* 상품컨텐츠 (이미지, 버튼 등) */}
          <div className="w-full"></div>
        </div>
      </Mobile>
      // Tablet
      <Tablet>
        <div></div>
      </Tablet>
      // Desktop
      <Desktop>
        <div></div>
      </Desktop>
    </div>
  );
}
