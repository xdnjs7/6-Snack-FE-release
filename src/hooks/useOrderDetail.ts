import { useQuery } from "@tanstack/react-query";
import { getOrderDetail } from "@/lib/api/orderDetail.api";
import { TOrderBase } from "@/types/order.types";

// 주문 상세 조회 커스텀 훅
export const useOrderDetail = (orderId: string) => {
  return useQuery<TOrderBase>({
    queryKey: ["orderDetail", orderId],
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId, // orderId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};
