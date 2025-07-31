"use client";

import { useState } from "react";
import Image from "next/image";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { formatPrice } from "@/lib/utils/formatPrice.util";

type TProduct = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

type TReceipt = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  productId: number;
};

type TOrderItemsSectionProps = {
  products?: TProduct[];
  receipts?: TReceipt[];
  title?: string;
  shippingFee?: number;
};

export default function OrderItemsSection({ 
  products, 
  receipts, 
  title = "구매 품목",
  shippingFee = 3000 
}: TOrderItemsSectionProps) {
  const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(true);

  // products 또는 receipts 중 존재하는 데이터 사용
  const items = products || receipts || [];
  
  const calculatedTotal: number = items.reduce((sum: number, item: TProduct | TReceipt) => 
    sum + item.price * item.quantity, 0
  );
  const finalTotal: number = calculatedTotal + shippingFee;

  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-10">
      <div className="self-stretch flex flex-col justify-start items-start gap-[15px]">
        <div
          className="inline-flex justify-start items-start gap-1.5 cursor-pointer"
          onClick={() => setIsItemsExpanded(!isItemsExpanded)}
        >
          <div className="justify-center text-gray-950 text-base font-bold font-['SUIT']">
            {title}
          </div>
          <div className="justify-center text-gray-950 text-base font-normal font-['SUIT']">
            총 {items.length}개
          </div>
          <ArrowIconSvg direction={isItemsExpanded ? "up" : "down"} className="w-5 h-5 text-gray-950" />
        </div>

        {isItemsExpanded && (
          <div className="self-stretch bg-white rounded-sm sm:shadow-[0px_0px_6px_0px_rgba(0,0,0,0.10)] sm:outline-1 sm:outline-neutral-200 flex flex-col justify-start items-start gap-5 sm:px-5 sm:pt-5 sm:pb-[30px] md:px-[60px] md:py-[40px]">
            {/* Items List */}
            <div className="self-stretch flex flex-col justify-start items-start gap-[16px] sm:gap-0">
              {items.map((item: TProduct | TReceipt) => (
                <div
                  key={item.id}
                  className="self-stretch border-b border-neutral-200 inline-flex justify-between items-center sm:py-5 sm:pr-5"
                >
                  <div className="flex gap-5 flex-1 sm:flex sm:justify-start sm:items-center sm:gap-5">
                    <div className="w-24 h-24 sm:w-[140px] sm:h-[140px] bg-[--color-white] shadow-[4px_4px_20px_0px_rgba(250,247,243,0.25)] flex justify-center items-center gap-2.5">
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          width={56}
                          height={96}
                          className="w-10 h-16 sm:w-14 sm:h-24 relative object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-1 inline-flex flex-col items-start gap-3 sm:justify-start sm:inline-flex sm:flex-col sm:justify-start sm:items-start sm:gap-7">
                      <div className="flex flex-col justify-center items-start gap-1 sm:justify-start sm:gap-2.5">
                        <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-medium font-['SUIT']">
                          {item.productName}
                        </div>
                        <div className="justify-start text-gray-950 text-sm sm:text-base font-bold font-['SUIT']">
                          {formatPrice(item.price)}원
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full sm:justify-start sm:flex sm:justify-start">
                        <div className="justify-center text-gray-500 text-[13px] sm:text-base font-bold font-['SUIT']">
                          수량 {item.quantity}개
                        </div>
                        <div className="text-center justify-center text-gray-700 text-base font-bold font-['SUIT'] sm:hidden">
                          {formatPrice(item.price * item.quantity)}원
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block text-center justify-center text-gray-700 text-[20px] font-extrabold font-['SUIT']">
                    {formatPrice(item.price * item.quantity)}원
                  </div>
                </div>
              ))}
            </div>

            {/* Order Amount Info */}
            <div className="self-stretch flex flex-col gap-3 sm:gap-[7px] sm:px-5">
              <div className="flex justify-between items-center">
                <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                  주문금액
                </div>
                <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                  {formatPrice(calculatedTotal)}원
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                  배송비
                </div>
                <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                  {formatPrice(shippingFee)}원
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-center justify-center text-gray-950 text-lg sm:text-lg font-bold font-['SUIT']">
                  총 주문금액
                </div>
                <div className="text-center justify-center text-gray-950 text-lg sm:text-2xl font-bold sm:font-extrabold font-['SUIT']">
                  {formatPrice(finalTotal)}원
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 