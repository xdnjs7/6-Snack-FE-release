import { cookieFetch } from "./fetchClient.api";

// 백엔드와 동일한 타입 정의
export type TOrderWithBudget = {
  id: number;
  userId: string;
  approver: string | null;
  adminMessage: string | null;
  requestMessage: string | null;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  requester: string;
  products: {
    id: number;
    quantity: number;
    price: number;
    imageUrl: string;
    productName: string;
  }[];
  budget: {
    currentMonthBudget: number | null;
    currentMonthExpense: number | null;
  };
};

// 주문 상세 조회 API 함수 (관리자용)
export const getOrderDetail = async (orderId: string): Promise<TOrderWithBudget> => {
  try {
    const response: TOrderWithBudget = await cookieFetch(`/admin/orders/${orderId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
