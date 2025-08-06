import { useQuery } from '@tanstack/react-query';
import { getBudgets } from '@/lib/api/budgets.api';
import { useAuth } from '@/providers/AuthProvider';

export const useBudgets = () => {
  const { user } = useAuth();
  const companyId = user?.company?.id;

  return useQuery({
    queryKey: ['budgets', companyId],
    queryFn: () => getBudgets(),
    staleTime: 1000 * 60,
  });
};