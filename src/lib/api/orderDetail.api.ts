import { cookieFetch } from "./fetchClient.api";
import { TOrderBase } from "@/types/order.types";

// 주문 상세 조회 응답 타입
type TOrderDetailResponse = {
  message: string;
  data: TOrderBase;
};

// 주문 상세 조회 API 함수
export const getOrderDetail = async (orderId: string): Promise<TOrderBase> => {
  try {
    const response: TOrderDetailResponse = await cookieFetch(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
