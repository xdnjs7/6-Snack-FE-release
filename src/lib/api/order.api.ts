import { TOrderRequestBody } from "@/types/order.types";
import { cookieFetch } from "./fetchClient.api";

// 관리자 구매내역 조회 API
export const getAdminOrders = async ({
  status,
  offset = 0,
  limit = 4,
  orderBy = "latest",
}: {
  status: "pending" | "approved";
  offset?: number;
  limit?: number;
  orderBy?: string;
}) => {
  const params = new URLSearchParams({
    status,
    offset: String(offset),
    limit: String(limit),
    orderBy,
  });
  return cookieFetch(`/admin/orders?${params.toString()}`);
};

// 구매 요청
export const createOrder = async (body: TOrderRequestBody) => {
  return await cookieFetch("/orders", {
    method: "POST",
    body: JSON.stringify(body),
  });
};
