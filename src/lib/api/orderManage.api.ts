import { cookieFetch } from "./fetchClient.api";

export type TAdminOrder = {
  id: number;
  userId: string;
  approver: string | null;
  adminMessage: string | null;
  requestMessage: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requester: string;
  productName: string;
};

export const fetchPendingAdminOrders = async ({
  offset = 0,
  limit = 4,
  orderBy = "latest",
}: {
  offset?: number;
  limit?: number;
  orderBy?: string;
}): Promise<TAdminOrder[]> => {
  const query = `?status=pending&offset=${offset}&limit=${limit}&orderBy=${orderBy}`;
  const res = await cookieFetch(`/admin/orders${query}`);
  return res;
};