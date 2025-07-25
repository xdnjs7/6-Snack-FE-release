import React from "react";
import ic_checkbox from "@/assets/icons/ic_checkbox.svg";
import ic_checkbox_active from "@/assets/icons/ic_checkbox_active.svg";
import Image from "next/image";
import Button from "@/components/ui/Button";
import QuantityDropdown from "@/components/common/QuantityDropdown";
import { TGetCartItemsResponse } from "@/types/cart.types";
import { deleteSelectedItems, foo, toggleCheckAllItems, toggleCheckItem } from "@/lib/api/cart.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";

/**
 * @De-cal TODO:
 * 1. 장바구니 전체 선택, 해제 API 만들어지면 연동
 * 2. 장바구니 수량 선택 API 만들어지면 연동
 */
type TCartItemProps = {
  cartItems: TGetCartItemsResponse | undefined;
  isPending: boolean;
};

export default function CartItem({ cartItems, isPending }: TCartItemProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const isAllChecked = cartItems?.length && cartItems?.every((item) => item.isChecked);
  const checkedCartItemIds = cartItems?.filter((item) => item.isChecked).map((item) => item.id) ?? [];

  // 장바구니 선택 - Optimistic Update
  const { mutate: toggleCheckCartItem } = useMutation<
    void,
    Error,
    { cartItemId: number; isChecked: boolean },
    { previousCartItems: TGetCartItemsResponse | undefined }
  >({
    mutationFn: ({ cartItemId, isChecked }) => toggleCheckItem(cartItemId, isChecked),
    onMutate: async ({ cartItemId, isChecked }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCartItems = queryClient.getQueryData<TGetCartItemsResponse>(["cart"]);

      queryClient.setQueryData<TGetCartItemsResponse>(["cart"], (old) =>
        old?.map((item) => (item.id === cartItemId ? { ...item, isChecked } : item)),
      );

      return { previousCartItems };
    },
    onError: (error, variables, context) => {
      if (context?.previousCartItems) {
        queryClient.setQueryData(["cart"], context.previousCartItems);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  // 장바구니 선택 삭제
  const { mutate: deleteCheckedCartItems } = useMutation<void, Error, number[]>({
    mutationFn: (cartItemIds) => deleteSelectedItems(cartItemIds),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  // 장바구니 수량 선택
  const { mutate: updateCartItemQuantity } = useMutation<void, Error, { cartItemId: number; quantity: number }>({
    mutationFn: ({ cartItemId, quantity }) => foo(cartItemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  // 장바구니 전체 선택 / 전체 해제
  const { mutate: toggleCheckAllCartItems } = useMutation<void, Error, boolean>({
    mutationFn: (isAllChecked) => toggleCheckAllItems(!isAllChecked),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return (
    <div className="flex flex-col sm:gap-[20px] sm:py-[20px] sm:px-[40px] sm:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] md:py-[40px] md:px-[50px]">
      <div className="flex justify-between items-center h-[40px]">
        <div className="flex justify-center items-center gap-[10px]">
          <button
            onClick={() => {
              if (isAllChecked === 0 || isAllChecked === undefined) return;
              toggleCheckAllCartItems(isAllChecked);
            }}
            className="relative w-[20px] h-[20px] cursor-pointer sm:w-[24px] sm:h-[24px]"
          >
            <Image
              src={isAllChecked ? ic_checkbox_active : ic_checkbox}
              alt="체크박스"
              fill
              className="object-contain"
            />
          </button>

          <p className="font-bold text-[16px]/[20px] tracking-tight text-black sm:text-[18px]/[22px]">
            전체 선택 ({cartItems?.length ?? 0}개)
          </p>
        </div>

        <button
          onClick={() => {
            if (checkedCartItemIds.length === 0) return;
            deleteCheckedCartItems(checkedCartItemIds);
          }}
          className="font-normal text-[14px]/[17px] tracking-tight underline text-primary-600 cursor-pointer sm:text-[16px]/[20px]"
        >
          선택 삭제
        </button>
      </div>

      {isPending ? (
        <div>로딩 중...</div>
      ) : !cartItems?.length ? (
        <div className="flex justify-center items-center h-[200px]">장바구니에 담은 상품이 없습니다.</div>
      ) : (
        cartItems.map((item, i) => (
          <div
            key={`${item}_${i}`}
            className="h-[121px] py-[20px] border-b-1 border-primary-100 sm:py-[30px] sm:h-[200px] sm:last:border-0"
          >
            <div className="flex justify-center items-center gap-[10px] sm:gap-[20px]">
              <button
                onClick={() => toggleCheckCartItem({ cartItemId: item.id, isChecked: !item.isChecked })}
                className="relative min-w-[20px] h-[20px] cursor-pointer sm:min-w-[24px] sm:h-[24px]"
              >
                <Image
                  src={item.isChecked ? ic_checkbox_active : ic_checkbox}
                  alt="체크박스"
                  fill
                  className="object-contain"
                />
              </button>

              <div className="w-full flex justify-center items-center gap-[12px] sm:gap-[20px]">
                <div className="flex justify-center items-center w-[81px] h-[81px] p-[24px] rounded-[2px] bg-primary-50 sm:w-[140px] sm:h-[140px] sm:bg-white">
                  <div className="relative w-[29px] h-[50px] sm:w-[59px] sm:h-[102px]">
                    <Image src={item.product.imageUrl} alt="상품" fill className="object-contain" />
                  </div>
                </div>

                <div className="w-full flex flex-col sm:gap-[20px]">
                  <div className="flex justify-between items-center sm:items-end">
                    <div className="flex flex-col justify-center items-start gap-[4px] sm:gap-[8px]">
                      <p className="font-normal text-[14px]/[17px] tracking-tight text-primary-950 sm:font-medium sm:text-[16px]/[20px] sm:text-[#1f1f1f]">
                        {item.product.name}
                      </p>
                      <p className="font-extrabold text-[14px]/[17px] tracking-tight text-primary-950 sm:font-bold sm:text-[16px]/[20px] sm:text-[#1f1f1f]">
                        {item.product.price.toLocaleString("ko-KR")}원
                      </p>
                    </div>

                    <div className="relative flex sm:flex-col sm:justify-center sm:items-end sm:gap-[4px]">
                      <QuantityDropdown
                        value={item.quantity}
                        onClick={(value: number) => updateCartItemQuantity({ cartItemId: item.id, quantity: value })}
                      />

                      <p className="hidden sm:block sm:font-extrabold sm:text-[24px]/[32px] sm:text-[#1f1f1f] md:tracking-tight md:leading-[30px]">
                        총 {(item.product.price * item.quantity).toLocaleString("ko-KR")}원
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center sm:items-start">
                    <p className="font-normal text-[13px]/[16px] tracking-tight text-[#6b6b6b] sm:hidden">
                      택배 3,000원
                    </p>
                    <p className="hidden sm:block sm:font-normal sm:text-[14px]/[17px] tracking-tight text-[#6b6b6b]">
                      택배 배송비 3,000원
                    </p>
                    <Link
                      href={
                        user?.role === "USER"
                          ? `/cart/order?cartItemId=${item.id}`
                          : `/cart/order-confirmed?cartItemId=${item.id}`
                      }
                    >
                      <Button
                        type="white"
                        label={user?.role === "USER" ? "바로 요청" : "즉시 구매"}
                        className="w-[88px] h-[40px] font-normal text-[13px]/[16px] tracking-tight sm:w-[99px] sm:h-[44px] sm:text-[16px]/[20px]"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
