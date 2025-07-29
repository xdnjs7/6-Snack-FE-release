import { TOrderItem } from "@/types/myOrderList.types";
import { cookieFetch } from "@/lib/api/fetchClient.api";

export const fetchMyOrders = async (): Promise<TOrderItem[]> => {
  const result = await cookieFetch<{ data: TOrderItem[] }>("/orders");

  return result.data;
};
