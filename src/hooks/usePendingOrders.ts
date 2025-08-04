import { useQuery } from "@tanstack/react-query";
import { fetchPendingOrders } from "@/lib/api/orderManage.api";
import { TOrderSummary } from "@/types/order.types";

type TUsePendingOrdersParams = {
  offset: number;
  limit: number;
  orderBy: string;
};

type TPendingOrdersResponse = {
  orders: TOrderSummary[];
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
};

export const usePendingOrders = ({ offset, limit, orderBy }: TUsePendingOrdersParams) => {
  return useQuery<TPendingOrdersResponse>({
    queryKey: ["pendingOrders", offset, limit, orderBy],
    queryFn: () => fetchPendingOrders({ offset, limit, orderBy }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
