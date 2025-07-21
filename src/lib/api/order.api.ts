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
