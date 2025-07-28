import { useQuery } from '@tanstack/react-query';
import { getBudgets } from '@/lib/api/budgets.api';

export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: getBudgets,
    staleTime: 1000 * 60, // 1분 캐싱
  });
};
