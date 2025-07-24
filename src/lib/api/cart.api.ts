import { TGetCartItemsResponse } from "@/types/cart.types";
import { cookieFetch } from "./fetchClient.api";

// 장바구니 조회
export const getCartItems = async (): Promise<TGetCartItemsResponse> => {
  return await cookieFetch("/cart");
};

// 장바구니 상품 선택 / 해제
export const toggleCheckItem = async (cartItemId: number, isChecked: boolean) => {
  return await cookieFetch(`/cart/${cartItemId}/check`, {
    method: "PATCH",
    body: JSON.stringify({ isChecked }),
  });
};

// 장바구니 전체 선택 / 전체 해제
export const toggleCheckAllItems = async (isChecked: boolean) => {
  return await cookieFetch("/cart/check", {
    method: "PATCH",
    body: JSON.stringify({ isChecked }),
  });
};

// 장바구니 선택된 상품 삭제
export const deleteSelectedItems = async (cartItemIds: number[]) => {
  return await cookieFetch("/cart", {
    method: "DELETE",
    body: JSON.stringify({ itemIds: cartItemIds }),
  });
};

// 장바구니 수량 선택
export const foo = async (cartItemId: number, bar: number) => {
  return await cookieFetch(`/foo/${cartItemId}/quantity`, {
    method: "PATCH",
    body: JSON.stringify({ cartItemId, bar }),
  });
};
