import { useQuery } from '@tanstack/react-query';
import { getAdminOrders } from '@/lib/api/order.api';

interface UseAdminOrdersParams {
  status: 'pending' | 'approved';
  offset: number;
  limit: number;
  orderBy: string;
}

export const useAdminOrders = ({ status, offset, limit, orderBy }: UseAdminOrdersParams) => {
  return useQuery({
    queryKey: ['adminOrders', status, offset, limit, orderBy],
    queryFn: () => getAdminOrders({ status, offset, limit, orderBy }),
    staleTime: 1000 * 60, // 1분 캐싱
  });
};
