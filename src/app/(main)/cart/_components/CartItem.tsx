import React from "react";
import ic_checkbox from "@/assets/icons/ic_checkbox.svg";
import ic_checkbox_active from "@/assets/icons/ic_checkbox_active.svg";
import Image from "next/image";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import img_fanta from "@/assets/images/img_fanta.webp";
import Button from "../../../../components/ui/Button";
import CartItemQuantityDropdown from "./CartItemQuantityDropdown";

const cartItems = [
  {
    id: 13,
    productName: "오리지널 포카칩",
    price: 1500,
    imageUrl: img_fanta,
    quantity: 2,
    isChecked: true,
  },
  {
    id: 14,
    productName: "코카콜라 500ml",
    price: 2000,
    imageUrl: img_coke_zero,
    quantity: 1,
    isChecked: true,
  },
];

export default function CartItem() {
  const handleQuantity = (quantity: number) => {
    // quantity 업데이트 하기
  };

  const handleItemCheck = () => {
    // isChecked 업데이트 하기
  };

  const handleItemCheckAll = () => {
    // isChecked 전체 업데이트 하기
  };

  return (
    <div className="flex flex-col sm:gap-[20px] sm:py-[20px] sm:px-[40px] sm:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] md:py-[40px] md:px-[50px]">
      <div className="flex justify-between items-center h-[40px]">
        <div className="flex justify-center items-center gap-[10px]">
          <button
            onClick={handleItemCheckAll}
            className="relative w-[20px] h-[20px] cursor-pointer sm:w-[24px] sm:h-[24px]"
          >
            <Image src={false ? ic_checkbox_active : ic_checkbox} alt="체크박스" fill className="object-contain" />
          </button>

          <p className="font-bold text-[16px]/[20px] tracking-tight text-black sm:text-[18px]/[22px]">
            전체 선택 (2개)
          </p>
        </div>

        <button className="font-normal text-[14px]/[17px] tracking-tight underline text-primary-600 cursor-pointer sm:text-[16px]/[20px]">
          선택 삭제
        </button>
      </div>
      {cartItems.map((item, i) => (
        <div
          key={`${item}_${i}`}
          className="h-[121px] py-[20px] border-b-1 border-primary-100 sm:py-[30px] sm:h-[200px] sm:last:border-0"
        >
          <div className="flex justify-center items-center gap-[10px] sm:gap-[20px]">
            <button
              onClick={handleItemCheck}
              className="relative min-w-[20px] h-[20px] cursor-pointer sm:min-w-[24px] sm:h-[24px]"
            >
              <Image src={false ? ic_checkbox_active : ic_checkbox} alt="체크박스" fill className="object-contain" />
            </button>

            <div className="w-full flex justify-center items-center gap-[12px] sm:gap-[20px]">
              <div className="flex justify-center items-center w-[81px] h-[81px] p-[24px] rounded-[2px] bg-primary-50 sm:w-[140px] sm:h-[140px] sm:bg-white">
                <div className="relative w-[29px] h-[50px] sm:w-[59px] sm:h-[102px]">
                  <Image src={item.imageUrl} alt="상품" fill className="object-contain" />
                </div>
              </div>

              <div className="w-full flex flex-col sm:gap-[20px]">
                <div className="flex justify-between items-center sm:items-end">
                  <div className="flex flex-col justify-center items-start gap-[4px] sm:gap-[8px]">
                    <p className="font-normal text-[14px]/[17px] tracking-tight text-primary-950 sm:font-medium sm:text-[16px]/[20px] sm:text-[#1f1f1f]">
                      {item.productName}
                    </p>
                    <p className="font-extrabold text-[14px]/[17px] tracking-tight text-primary-950 sm:font-bold sm:text-[16px]/[20px] sm:text-[#1f1f1f]">
                      {item.price.toLocaleString("ko-KR")}원
                    </p>
                  </div>

                  <div className="relative flex sm:flex-col sm:justify-center sm:items-end sm:gap-[4px]">
                    <CartItemQuantityDropdown value={item.quantity} onClick={handleQuantity} />

                    <p className="hidden sm:block sm:font-extrabold sm:text-[24px]/[32px] sm:text-[#1f1f1f] md:tracking-tight md:leading-[30px]">
                      총 {(item.price * item.quantity).toLocaleString("ko-KR")}원
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center sm:items-start">
                  <p className="font-normal text-[13px]/[16px] tracking-tight text-[#6b6b6b] sm:hidden">택배 3,000원</p>
                  <p className="hidden sm:block sm:font-normal sm:text-[14px]/[17px] tracking-tight text-[#6b6b6b]">
                    택배 배송비 3,000원
                  </p>
                  <Button
                    type="white"
                    label="즉시 구매"
                    className="w-[88px] h-[40px] font-normal text-[13px]/[16px] tracking-tight sm:w-[99px] sm:h-[44px] sm:text-[16px]/[20px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
