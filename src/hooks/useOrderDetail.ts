import { useQuery } from "@tanstack/react-query";
import { getOrderDetail, TOrderWithBudget } from "@/lib/api/orderDetail.api";
import { getMyOrderDetail, TMyOrderDetail } from "@/lib/api/orderHistory.api";

// 주문 상세 조회 커스텀 훅 (관리자용)
export const useOrderDetail = (orderId: string, status: "pending" | "approved" = "pending") => {
  return useQuery<TOrderWithBudget>({
    queryKey: ["orderDetail", orderId, status],
    queryFn: () => getOrderDetail(orderId, status),
    enabled: !!orderId, // orderId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};

// 내 주문 상세 조회 커스텀 훅 (사용자용)
export const useMyOrderDetail = (orderId: string) => {
  return useQuery<TMyOrderDetail>({
    queryKey: ["myOrderDetail", orderId],
    queryFn: () => getMyOrderDetail(orderId),
    enabled: !!orderId, // orderId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};
